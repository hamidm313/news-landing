export function CardSkeleton() {
  return (
    <div className="card overflow-hidden">
      <div className="skeleton h-44 w-full rounded-none" />
      <div className="space-y-3 p-4">
        <div className="skeleton h-4 w-20" />
        <div className="skeleton h-5 w-full" />
        <div className="skeleton h-5 w-3/4" />
        <div className="skeleton h-3 w-1/2" />
      </div>
    </div>
  );
}

export function ListRowSkeleton() {
  return (
    <div className="flex gap-4 border-b border-black/5 py-4">
      <div className="skeleton h-28 w-44 shrink-0" />
      <div className="flex-1 space-y-3 py-1">
        <div className="skeleton h-4 w-24" />
        <div className="skeleton h-5 w-full" />
        <div className="skeleton h-4 w-2/3" />
        <div className="skeleton h-3 w-1/3" />
      </div>
    </div>
  );
}

export function CompactRowSkeleton() {
  return (
    <div className="flex gap-3">
      <div className="skeleton h-16 w-24 shrink-0" />
      <div className="flex-1 space-y-2 py-1">
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-1/2" />
      </div>
    </div>
  );
}

export function QueryError({
  message,
  onRetry,
  retryLabel,
}: {
  message: string;
  onRetry: () => void;
  retryLabel: string;
}) {
  return (
    <div className="card flex flex-col items-center gap-3 p-6 text-center text-sm">
      <p className="text-black/60">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-md bg-brand-600 px-4 py-1.5 font-semibold text-white transition hover:bg-brand-700"
      >
        {retryLabel}
      </button>
    </div>
  );
}
