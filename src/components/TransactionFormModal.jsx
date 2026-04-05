import { useEffect, useState } from 'react';

const initialForm = {
  date: new Date().toISOString().slice(0, 10),
  amount: '',
  category: '',
  type: 'expense',
  note: '',
};

function TransactionFormModal({ isOpen, onClose, onSave, transaction }) {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (transaction) {
      setFormData({ ...transaction, amount: String(transaction.amount) });
      return;
    }

    setFormData(initialForm);
  }, [transaction, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    onSave({
      ...transaction,
      ...formData,
      amount: Number(formData.amount),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-soft dark:bg-slate-900">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-slate-950 dark:text-white">
              {transaction ? 'Edit transaction' : 'Add transaction'}
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Keep records accurate so your insights remain useful.
            </p>
          </div>
          <button type="button" onClick={onClose} className="text-sm text-slate-500">
            Close
          </button>
        </div>

        <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Date
            <input
              required
              type="date"
              value={formData.date}
              onChange={(event) => setFormData((prev) => ({ ...prev, date: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-950"
            />
          </label>

          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Amount
            <input
              required
              min="1"
              type="number"
              value={formData.amount}
              onChange={(event) => setFormData((prev) => ({ ...prev, amount: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-950"
            />
          </label>

          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Category
            <input
              required
              type="text"
              value={formData.category}
              onChange={(event) => setFormData((prev) => ({ ...prev, category: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-950"
              placeholder="Food, Salary, Utilities..."
            />
          </label>

          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Type
            <select
              value={formData.type}
              onChange={(event) => setFormData((prev) => ({ ...prev, type: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-950"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </label>

          <label className="sm:col-span-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            Note
            <textarea
              rows="4"
              value={formData.note}
              onChange={(event) => setFormData((prev) => ({ ...prev, note: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-950"
              placeholder="Optional description"
            />
          </label>

          <div className="sm:col-span-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-slate-200 px-4 py-2 font-medium text-slate-600 dark:border-slate-700 dark:text-slate-300"
            >
              Cancel
            </button>
            <button type="submit" className="rounded-2xl bg-brand-500 px-4 py-2 font-medium text-white hover:bg-brand-600">
              Save transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TransactionFormModal;
