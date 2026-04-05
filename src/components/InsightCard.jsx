function InsightCard({ title, value, detail }) {
  return (
    <article className="rounded-3xl border border-slate-200/70 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
      <p className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">{value}</p>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{detail}</p>
    </article>
  );
}

export default InsightCard;
