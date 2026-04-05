import { useMemo, useState } from 'react';
import LoadingSkeleton from '../components/LoadingSkeleton';
import TransactionFormModal from '../components/TransactionFormModal';
import TransactionsTable from '../components/TransactionsTable';
import { useFinance } from '../context/FinanceContext';
import { exportTransactionsToCsv } from '../utils/finance';

function TransactionsPage() {
  const { state, dispatch, filteredTransactions } = useFinance();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const transactionsCountText = useMemo(
    () => `${filteredTransactions.length} transaction${filteredTransactions.length === 1 ? '' : 's'} visible`,
    [filteredTransactions.length],
  );

  const openCreateModal = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const handleSave = (transaction) => {
    if (editingTransaction) {
      dispatch({ type: 'updateTransaction', payload: transaction });
    } else {
      dispatch({
        type: 'addTransaction',
        payload: {
          // Generate a stable id client-side because this dashboard uses local state instead of a backend.
          ...transaction,
          id: crypto.randomUUID(),
        },
      });
    }

    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleExport = () => {
    const csv = exportTransactionsToCsv(filteredTransactions);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'transactions.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  if (state.loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200/70 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-slate-950 dark:text-white">Transaction Manager</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{transactionsCountText}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Search
              <input
                type="text"
                value={state.filters.search}
                onChange={(event) => dispatch({ type: 'setFilters', payload: { search: event.target.value } })}
                placeholder="Search category, amount, or note"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-950 sm:w-64"
              />
            </label>

            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Type
              <select
                value={state.filters.type}
                onChange={(event) => dispatch({ type: 'setFilters', payload: { type: event.target.value } })}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-950 sm:w-40"
              >
                <option value="all">All</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </label>

            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Sort by
              <select
                value={state.filters.sortBy}
                onChange={(event) => dispatch({ type: 'setFilters', payload: { sortBy: event.target.value } })}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-950 sm:w-40"
              >
                <option value="date">Date</option>
                <option value="amount">Amount</option>
              </select>
            </label>

            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Direction
              <select
                value={state.filters.sortDirection}
                onChange={(event) => dispatch({ type: 'setFilters', payload: { sortDirection: event.target.value } })}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-950 sm:w-40"
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </label>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={openCreateModal}
            className="rounded-2xl bg-brand-500 px-4 py-3 font-medium text-white hover:bg-brand-600"
          >
            Add Transaction
          </button>
          <button
            type="button"
            onClick={handleExport}
            className="rounded-2xl border border-slate-200 px-4 py-3 font-medium text-slate-700 dark:border-slate-700 dark:text-slate-200"
          >
            Export CSV
          </button>
          <p className="self-center text-sm text-slate-500 dark:text-slate-400">
            Current role: <span className="font-semibold capitalize text-slate-700 dark:text-slate-200">{state.role}</span>
          </p>
        </div>
      </section>

      <TransactionsTable
        transactions={filteredTransactions}
        onEdit={handleEdit}
        onDelete={(id) => dispatch({ type: 'deleteTransaction', payload: id })}
      />

      <TransactionFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTransaction(null);
        }}
        onSave={handleSave}
        transaction={editingTransaction}
      />
    </div>
  );
}

export default TransactionsPage;
