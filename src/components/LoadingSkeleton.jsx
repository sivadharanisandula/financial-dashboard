function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="h-32 rounded-3xl bg-slate-200 dark:bg-slate-800" />
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.5fr,1fr]">
        <div className="h-96 rounded-3xl bg-slate-200 dark:bg-slate-800" />
        <div className="h-96 rounded-3xl bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  );
}

export default LoadingSkeleton;
