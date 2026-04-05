import { useFinance } from '../context/FinanceContext';

function Header({ title, onMenuClick }) {
  const { state, dispatch } = useFinance();

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200/70 bg-white/80 px-4 py-4 backdrop-blur sm:px-6 lg:px-8 dark:border-slate-800 dark:bg-slate-950/80">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-brand-500 hover:text-brand-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            aria-label="Open sidebar navigation"
          >
            <span className="flex flex-col gap-1.5">
              <span className="h-0.5 w-5 rounded-full bg-current" />
              <span className="h-0.5 w-5 rounded-full bg-current" />
              <span className="h-0.5 w-5 rounded-full bg-current" />
            </span>
          </button>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Financial Dashboard</p>
            <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">{title}</h2>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="flex items-center gap-2 rounded-2xl bg-slate-100 px-3 py-2 text-sm dark:bg-slate-800" htmlFor="role">
            <span className="text-slate-500 dark:text-slate-300">Role</span>
            <select
              id="role"
              className="rounded-xl bg-white px-2 py-1 font-medium text-slate-900 outline-none ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-100 dark:ring-slate-700"
              value={state.role}
              onChange={(event) => dispatch({ type: 'setRole', payload: event.target.value })}
            >
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>
          </label>
        </div>
      </div>
    </header>
  );
}

export default Header;
