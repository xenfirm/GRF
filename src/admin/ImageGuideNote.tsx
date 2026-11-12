import { Info } from 'lucide-react';
import type { ImageGuide } from './imageGuidelines';

export default function ImageGuideNote({ guide }: { guide: ImageGuide }) {
  return (
    <div className="flex gap-3 rounded-lg border border-primary/15 bg-primary-50 px-4 py-3 text-xs text-gray-700">
      <Info size={16} className="mt-0.5 shrink-0 text-primary" />
      <div className="space-y-1">
        <div>
          <span className="font-semibold text-darktext">Ratio:</span> {guide.ratio}
          <span className="mx-2 text-gray-300">|</span>
          <span className="font-semibold text-darktext">Recommended size:</span> {guide.size}
        </div>
        <div className="text-gray-600">{guide.where}</div>
      </div>
    </div>
  );
}
