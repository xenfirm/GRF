export default function LoadingState({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className="flex min-h-40 items-center justify-center text-sm text-gray-500">
      <span className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
      {label}
    </div>
  );
}
