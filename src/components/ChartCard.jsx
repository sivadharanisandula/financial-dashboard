function ChartCard({ title, subtitle, children }) {
  return (
    <section className="rounded-3xl border border-slate-200/70 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{title}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
      </div>
      <div className="h-80">{children}</div>
    </section>
  );
}

export default ChartCard;
