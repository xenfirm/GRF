interface ToastProps {
  message: string | null;
  type?: 'success' | 'error';
  onClose: () => void;
}

export default function Toast({ message, type = 'success', onClose }: ToastProps) {
  if (!message) return null;

  return (
    <div className={`fixed right-4 top-4 z-[90] max-w-sm rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-lg ${type === 'error' ? 'bg-red-600' : 'bg-primary'}`}>
      <div className="flex items-center gap-3">
        <span>{message}</span>
        <button type="button" onClick={onClose} className="text-white/80 hover:text-white">
          Close
        </button>
      </div>
    </div>
  );
}
