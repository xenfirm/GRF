import { PointerEvent as ReactPointerEvent, useCallback, useEffect, useRef, useState } from 'react';
import { AlertTriangle, Check, Maximize, X } from 'lucide-react';
import type { AspectOption } from './imageGuidelines';
import { describeRatio } from './imageGuidelines';

interface ImageCropperProps {
  file: File;
  aspects: AspectOption[];
  initialAspect: number | null;
  minOutputWidth?: number;
  onCancel: () => void;
  onConfirm: (cropped: File) => void;
}

interface Box { x: number; y: number; w: number; h: number }
type Handle = 'move' | 'nw' | 'ne' | 'sw' | 'se';
interface Drag { mode: Handle; startX: number; startY: number; box: Box }

const MIN_BOX = 40;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

function fitBox(aspect: number | null, width: number, height: number): Box {
  if (!aspect) return { x: 0, y: 0, w: width, h: height };
  let w = width;
  let h = width / aspect;
  if (h > height) {
    h = height;
    w = height * aspect;
  }
  return { x: (width - w) / 2, y: (height - h) / 2, w, h };
}

export default function ImageCropper({ file, aspects, initialAspect, minOutputWidth = 0, onCancel, onConfirm }: ImageCropperProps) {
  const [src] = useState(() => URL.createObjectURL(file));
  const imgRef = useRef<HTMLImageElement>(null);
  const dragRef = useRef<Drag | null>(null);
  const [aspect, setAspect] = useState<number | null>(initialAspect);
  const [display, setDisplay] = useState<{ w: number; h: number } | null>(null);
  const [box, setBox] = useState<Box | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => () => URL.revokeObjectURL(src), [src]);

  const displayRef = useRef<{ w: number; h: number } | null>(null);

  const measure = useCallback(() => {
    const img = imgRef.current;
    if (!img || !img.clientWidth) return;
    const next = { w: img.clientWidth, h: img.clientHeight };
    const prev = displayRef.current;
    if (prev && prev.w === next.w && prev.h === next.h) return;
    displayRef.current = next;
    setDisplay(next);
    setBox((current) => {
      if (!current || !prev) return fitBox(aspect, next.w, next.h);
      const s = next.w / prev.w;
      return { x: current.x * s, y: current.y * s, w: current.w * s, h: current.h * s };
    });
  }, [aspect]);

  useEffect(() => {
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onCancel(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onCancel]);

  function chooseAspect(value: number | null) {
    setAspect(value);
    if (display) setBox(fitBox(value, display.w, display.h));
  }

  function startDrag(mode: Handle) {
    return (event: ReactPointerEvent) => {
      if (!box) return;
      event.preventDefault();
      event.stopPropagation();
      (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
      dragRef.current = { mode, startX: event.clientX, startY: event.clientY, box };
    };
  }

  function onPointerMove(event: ReactPointerEvent) {
    const drag = dragRef.current;
    if (!drag || !display) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    const b = drag.box;
    const W = display.w;
    const H = display.h;

    if (drag.mode === 'move') {
      setBox({ ...b, x: clamp(b.x + dx, 0, W - b.w), y: clamp(b.y + dy, 0, H - b.h) });
      return;
    }

    const left = drag.mode === 'nw' || drag.mode === 'sw';
    const top = drag.mode === 'nw' || drag.mode === 'ne';
    const anchorX = left ? b.x + b.w : b.x;
    const anchorY = top ? b.y + b.h : b.y;
    const maxW = left ? anchorX : W - anchorX;
    const maxH = top ? anchorY : H - anchorY;
    let w = left ? b.w - dx : b.w + dx;
    let h = top ? b.h - dy : b.h + dy;

    if (aspect) {
      if (w / aspect < h) w = h * aspect;
      const minW = Math.max(MIN_BOX, MIN_BOX * aspect);
      w = clamp(w, Math.min(minW, maxW, maxH * aspect), Math.min(maxW, maxH * aspect));
      h = w / aspect;
    } else {
      w = clamp(w, Math.min(MIN_BOX, maxW), maxW);
      h = clamp(h, Math.min(MIN_BOX, maxH), maxH);
    }

    setBox({ x: left ? anchorX - w : anchorX, y: top ? anchorY - h : anchorY, w, h });
  }

  function endDrag() {
    dragRef.current = null;
  }

  const img = imgRef.current;
  const scale = img && display ? img.naturalWidth / display.w : 1;
  const outW = box ? Math.round(box.w * scale) : 0;
  const outH = box ? Math.round(box.h * scale) : 0;
  const lowRes = minOutputWidth > 0 && outW > 0 && outW < minOutputWidth;

  async function confirm() {
    if (!img || !box || !display) return;
    setSaving(true);
    try {
      const canvas = document.createElement('canvas');
      canvas.width = outW;
      canvas.height = outH;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas not supported');
      ctx.drawImage(img, box.x * scale, box.y * scale, box.w * scale, box.h * scale, 0, 0, outW, outH);
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.92));
      if (!blob) throw new Error('Unable to crop image');
      const name = file.name.replace(/\.[^/.]+$/, '') + '.jpg';
      onConfirm(new File([blob], name, { type: 'image/jpeg' }));
    } finally {
      setSaving(false);
    }
  }

  const handles: Handle[] = ['nw', 'ne', 'sw', 'se'];
  const handlePos: Record<string, string> = {
    nw: 'cursor-nwse-resize',
    ne: 'cursor-nesw-resize',
    sw: 'cursor-nesw-resize',
    se: 'cursor-nwse-resize',
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-3" role="dialog" aria-modal="true" aria-label="Crop image">
      <div className="flex max-h-[96vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b px-5 py-3">
          <h2 className="font-bold text-darktext">Crop image</h2>
          <button type="button" onClick={onCancel} className="rounded-lg p-1 text-gray-500 hover:bg-gray-100" aria-label="Close"><X size={18} /></button>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-b px-5 py-3">
          <span className="mr-1 text-xs font-semibold uppercase tracking-wide text-gray-500">Ratio</span>
          {aspects.map((option) => (
            <button
              key={option.label}
              type="button"
              onClick={() => chooseAspect(option.value)}
              className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${aspect === option.value ? 'border-primary bg-primary text-white' : 'border-gray-200 text-gray-700 hover:border-primary'}`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto bg-gray-900 p-4">
          <div className="relative select-none" onPointerMove={onPointerMove} onPointerUp={endDrag} onPointerCancel={endDrag}>
            <img
              ref={imgRef}
              src={src}
              alt="Image to crop"
              onLoad={measure}
              draggable={false}
              className="block max-h-[60vh] max-w-full"
            />
            {box && (
              <div className="absolute inset-0 overflow-hidden">
                <div
                  className="absolute cursor-move touch-none border-2 border-white"
                  style={{ left: box.x, top: box.y, width: box.w, height: box.h, boxShadow: '0 0 0 9999px rgba(0,0,0,0.55)' }}
                  onPointerDown={startDrag('move')}
                >
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-1/3 top-0 h-full w-px bg-white/40" />
                    <div className="absolute left-2/3 top-0 h-full w-px bg-white/40" />
                    <div className="absolute left-0 top-1/3 h-px w-full bg-white/40" />
                    <div className="absolute left-0 top-2/3 h-px w-full bg-white/40" />
                  </div>
                </div>
              </div>
            )}
            {box && handles.map((handle) => (
              <div
                key={handle}
                onPointerDown={startDrag(handle)}
                className={`absolute h-4 w-4 touch-none rounded-sm border-2 border-primary bg-white ${handlePos[handle]}`}
                style={{
                  left: handle.endsWith('w') ? box.x - 8 : box.x + box.w - 8,
                  top: handle.startsWith('n') ? box.y - 8 : box.y + box.h - 8,
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t px-5 py-3">
          <div className="text-xs text-gray-600">
            Output: <span className="font-semibold text-darktext">{outW} × {outH} px</span>
            {outW > 0 && <> · {describeRatio(outW, outH)}</>}
            {lowRes && (
              <div className="mt-1 flex items-center gap-1 text-amber-600">
                <AlertTriangle size={13} /> Small crop — may look blurry (aim for {minOutputWidth}px+ wide).
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => onConfirm(file)} className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 hover:border-primary">
              <Maximize size={14} /> Use original
            </button>
            <button type="button" onClick={confirm} disabled={!box || saving} className="inline-flex items-center gap-1 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
              <Check size={15} /> {saving ? 'Cropping...' : 'Apply crop'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
