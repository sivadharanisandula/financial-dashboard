import { formatCurrency } from '../utils/finance';

function SummaryCard({ title, value, tone, subtitle, badge, icon }) {
  const toneClasses = {
    balance: 'from-brand-500 to-brand-600 text-white',
    income: 'from-emerald-500 to-teal-500 text-white',
    expenses: 'from-rose-500 to-orange-500 text-white',
  };

  return (
    <article className={`rounded-3xl bg-gradient-to-br p-5 shadow-soft ${toneClasses[tone]}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-white/80">{title}</p>
          <p className="mt-4 text-3xl font-semibold">{formatCurrency(value)}</p>
        </div>
        <div className="rounded-2xl bg-white/15 p-3 text-white">{icon}</div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-sm text-white/75">{subtitle}</p>
        {badge ? (
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
            {badge}
          </span>
        ) : null}
      </div>
    </article>
  );
}

export default SummaryCard;
