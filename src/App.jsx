import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';
import { useFinance } from './context/FinanceContext';

const PAGES = {
  overview: 'Overview',
  transactions: 'Transactions',
};

function App() {
  const [activePage, setActivePage] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { state } = useFinance();

  const pageTitle = useMemo(() => PAGES[activePage] ?? 'Overview', [activePage]);

  useEffect(() => {
    const isDark = state.theme === 'dark';
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');

    document.documentElement.classList.toggle('dark', isDark);
    document.body.classList.toggle('dark', isDark);
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
    document.body.style.colorScheme = isDark ? 'dark' : 'light';

    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', isDark ? '#020617' : '#f1f5f9');
    }
  }, [state.theme]);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  return (
    <div>
      <div className="min-h-screen bg-slate-100 bg-mesh text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-50">
        <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col lg:flex-row">
          <Sidebar
            activePage={activePage}
            onPageChange={setActivePage}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          <div className="flex min-h-screen flex-1 flex-col">
            <Header title={pageTitle} onMenuClick={() => setSidebarOpen(true)} />
            <main className="flex-1 px-4 pb-8 pt-4 sm:px-6 lg:px-8">
              {activePage === 'overview' ? <DashboardPage /> : <TransactionsPage />}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
