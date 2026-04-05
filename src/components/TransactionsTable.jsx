import { formatCurrency, formatDate } from '../utils/finance';
import EmptyState from './EmptyState';

function TransactionsTable({ transactions, onEdit, onDelete }) {
  if (!transactions.length) {
    return (
      <EmptyState
        title="No transactions found"
        description="Try adjusting your search or filters, or add a new transaction to repopulate the table."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white/95 shadow-soft backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
          <thead className="bg-slate-50 dark:bg-slate-950/60">
            <tr>
              {['Date', 'Amount', 'Category', 'Type', 'Note', 'Actions'].map((heading) => (
                <th
                  key={heading}
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-300">{formatDate(transaction.date)}</td>
                <td className="px-4 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                  {formatCurrency(transaction.amount)}
                </td>
                <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-300">{transaction.category}</td>
                <td className="px-4 py-4 text-sm">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      transaction.type === 'income'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300'
                    }`}
                  >
                    {transaction.type === 'income' ? 'Income' : 'Expense'}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-slate-500 dark:text-slate-400">{transaction.note}</td>
                <td className="px-4 py-4 text-sm">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(transaction)}
                      className="rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 font-medium text-slate-700 transition hover:border-brand-500 hover:bg-brand-50 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-white"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(transaction.id)}
                      className="rounded-xl bg-rose-500 px-3 py-2 font-medium text-white transition hover:bg-rose-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionsTable;
