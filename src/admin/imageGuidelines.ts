export interface AspectOption {
  label: string;
  /** width / height, or null for a free-form crop */
  value: number | null;
}

export const ASPECTS = {
  square: { label: '1:1 Square', value: 1 },
  portrait: { label: '4:5 Portrait', value: 4 / 5 },
  landscape: { label: '4:3 Landscape', value: 4 / 3 },
  wide: { label: '16:9 Wide', value: 16 / 9 },
  free: { label: 'Free', value: null },
} satisfies Record<string, AspectOption>;

export interface ImageGuide {
  ratio: string;
  size: string;
  where: string;
  aspects: AspectOption[];
  defaultAspect: number | null;
  /** Below this output width the cropper shows a low-resolution warning. */
  minWidth: number;
}

export const IMAGE_GUIDES: Record<'birds' | 'gallery', ImageGuide> = {
  birds: {
    ratio: '1:1 (square)',
    size: '1200 × 1200 px',
    where: 'Bird photos are shown as square cards on the Home and Aseel Lines pages. Anything outside the square is cut off, so crop to 1:1.',
    aspects: [ASPECTS.square, ASPECTS.free],
    defaultAspect: 1,
    minWidth: 800,
  },
  gallery: {
    ratio: 'Any — 4:5 portrait, 1:1 or 4:3 look best',
    size: 'at least 1200 px wide',
    where: 'The gallery shows every photo at its own shape in a masonry grid, so nothing is cut off. Crop only to frame the bird or remove clutter.',
    aspects: [ASPECTS.free, ASPECTS.square, ASPECTS.portrait, ASPECTS.landscape, ASPECTS.wide],
    defaultAspect: null,
    minWidth: 800,
  },
};

export function describeRatio(width: number, height: number) {
  const r = width / height;
  const match = Object.values(ASPECTS).find((a) => a.value && Math.abs(a.value - r) < 0.02);
  return match ? match.label.split(' ')[0] : `${r.toFixed(2)}:1`;
}
