const navItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'transactions', label: 'Transactions' },
];

function OverviewIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 13.5h6.5V20H4zM13.5 4H20v16h-6.5zM4 4h6.5v6.5H4z" />
    </svg>
  );
}

function TransactionsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 6.5h16M4 12h16M4 17.5h10" strokeLinecap="round" />
      <path d="M17 15.5l3 2-3 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const navIcons = {
  overview: OverviewIcon,
  transactions: TransactionsIcon,
};

function Sidebar({ activePage, onPageChange, isOpen, onClose }) {
  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-slate-950/45 backdrop-blur-sm transition duration-300 ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-200/70 bg-white/95 p-4 backdrop-blur transition-transform duration-300 dark:border-slate-800 dark:bg-slate-900/95 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">Finance OS</p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">PulseBoard</h1>
            <p className="mt-2 max-w-xs text-sm text-slate-500 dark:text-slate-400">
              Keep your cash flow, transactions, and insights in one focused workspace.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 text-slate-600 transition hover:border-brand-500 hover:text-brand-500 dark:border-slate-700 dark:text-slate-300"
            aria-label="Close sidebar navigation"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className="mt-6 flex flex-col gap-2 overflow-x-auto" aria-label="Primary">
          {navItems.map((item) => {
            const active = item.id === activePage;
            const Icon = navIcons[item.id];
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onPageChange(item.id);
                  onClose();
                }}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                  active
                    ? 'bg-brand-500 text-white shadow-soft'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                <Icon />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-8 rounded-3xl bg-slate-950 p-5 text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Focus</p>
          <p className="mt-3 text-lg font-semibold">Better money decisions start with better visibility.</p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
