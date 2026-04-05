import {
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import ChartCard from '../components/ChartCard';
import EmptyState from '../components/EmptyState';
import InsightCard from '../components/InsightCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import SummaryCard from '../components/SummaryCard';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency, formatDate, getMonthlyTotals, getPercentageDelta, getRecentTransactions } from '../utils/finance';

const chartPalette = ['#335cff', '#2dd4bf', '#fb7185', '#f59e0b', '#8b5cf6', '#14b8a6'];

function BalanceIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 7.5h16v9H4z" />
      <path d="M15 12h.01" strokeLinecap="round" />
      <path d="M4 9h16" strokeLinecap="round" />
    </svg>
  );
}

function IncomeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 19V5" strokeLinecap="round" />
      <path d="M7 10l5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExpenseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 5v14" strokeLinecap="round" />
      <path d="M17 14l-5 5-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FinanceHeroArtwork() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-[1.75rem] bg-gradient-to-br from-brand-500 to-brand-600 p-4 text-white shadow-soft">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-white/75">Portfolio</span>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M4 17l5-5 3 3 8-8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="mt-6 space-y-2">
          <div className="h-2 rounded-full bg-white/20" />
          <div className="h-2 w-4/5 rounded-full bg-white/30" />
          <div className="mt-4 flex items-end gap-2">
            <span className="h-10 w-3 rounded-full bg-white/30" />
            <span className="h-16 w-3 rounded-full bg-white/40" />
            <span className="h-12 w-3 rounded-full bg-white/50" />
            <span className="h-20 w-3 rounded-full bg-white/70" />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/60">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Revenue</span>
            <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
              +18%
            </span>
          </div>
          <div className="mt-4 flex items-end gap-2">
            <span className="h-8 w-3 rounded-full bg-emerald-200 dark:bg-emerald-500/25" />
            <span className="h-12 w-3 rounded-full bg-emerald-300 dark:bg-emerald-500/35" />
            <span className="h-16 w-3 rounded-full bg-emerald-400 dark:bg-emerald-500/50" />
            <span className="h-20 w-3 rounded-full bg-emerald-500" />
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-amber-100 p-3 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M12 3v18M8 7.5c0-1.7 1.8-3 4-3s4 1.3 4 3-1.8 3-4 3-4 1.3-4 3 1.8 3 4 3 4-1.3 4-3" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Smart budgeting</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Track trends and spending signals in one place.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardPage() {
  const { state, summary, lineChartData, categoryBreakdown, insights } = useFinance();
  const thisMonth = getMonthlyTotals(state.transactions, 0);
  const lastMonth = getMonthlyTotals(state.transactions, -1);
  const expenseDelta = getPercentageDelta(thisMonth.expenses, lastMonth.expenses);
  const incomeDelta = getPercentageDelta(thisMonth.income, lastMonth.income);
  const recentTransactions = getRecentTransactions(state.transactions, 5);
  const topCategories = categoryBreakdown.slice().sort((a, b) => b.value - a.value).slice(0, 4);

  if (state.loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white px-6 py-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-6 xl:grid-cols-[1.4fr,0.9fr]">
          <div>
            <h3 className="max-w-2xl text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
              A clearer snapshot of cash flow, spend concentration, and momentum.
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
              Stay on top of balances, income, expenses, and category performance with a cleaner finance-focused workspace.
            </p>
          </div>
          <FinanceHeroArtwork />
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-950/60">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Savings rate</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">{summary.savingsRate}%</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Share of total income still available after expenses.</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-950/60">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Expense delta</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">{expenseDelta > 0 ? '+' : ''}{expenseDelta}%</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Compared with last month's expense run-rate.</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-950/60">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Income delta</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">{incomeDelta > 0 ? '+' : ''}{incomeDelta}%</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Month-over-month income movement.</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <SummaryCard
          title="Total Balance"
          value={summary.totalBalance}
          tone="balance"
          subtitle="Net position across all transactions"
          badge={`${summary.savingsRate}% saved`}
          icon={<BalanceIcon />}
        />
        <SummaryCard
          title="Total Income"
          value={summary.totalIncome}
          tone="income"
          subtitle="All incoming funds recorded"
          badge={`${incomeDelta > 0 ? '+' : ''}${incomeDelta}% MoM`}
          icon={<IncomeIcon />}
        />
        <SummaryCard
          title="Total Expenses"
          value={summary.totalExpenses}
          tone="expenses"
          subtitle="All outgoing payments tracked"
          badge={`${expenseDelta > 0 ? '+' : ''}${expenseDelta}% MoM`}
          icon={<ExpenseIcon />}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.5fr,1fr]">
        <ChartCard title="Balance Flow" subtitle="Running balance and expense trend over time">
          {lineChartData.length ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData}>
                <XAxis dataKey="label" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{ borderRadius: '16px', border: '1px solid #e2e8f0' }}
                />
                <Line type="monotone" dataKey="runningBalance" stroke="#335cff" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="expenses" stroke="#fb7185" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState title="No chart data yet" description="Add transactions to start seeing your financial trends." />
          )}
        </ChartCard>

        <ChartCard title="Spending Breakdown" subtitle="Where your expense budget is going">
          {categoryBreakdown.length ? (
            <div className="grid h-full gap-4 lg:grid-cols-[1fr,0.9fr]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryBreakdown}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={4}
                  >
                    {categoryBreakdown.map((entry, index) => (
                      <Cell key={entry.name} fill={chartPalette[index % chartPalette.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3">
                {topCategories.map((category, index) => (
                  <div key={category.name} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-950/60">
                    <div className="flex items-center gap-3">
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: chartPalette[index % chartPalette.length] }}
                      />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{category.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">{formatCurrency(category.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <EmptyState title="No expenses yet" description="Expense categories will appear here once spending is recorded." />
          )}
        </ChartCard>
      </section>

      <section>
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-slate-950 dark:text-white">Insights</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            A quick snapshot of what stands out in your spending behavior.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <InsightCard
            title="Highest Spending Category"
            value={insights.highestSpendingCategory?.name || 'Not enough data'}
            detail={
              insights.highestSpendingCategory
                ? `${formatCurrency(insights.highestSpendingCategory.value)} spent in this category`
                : 'Track a few expenses to reveal your top category.'
            }
          />
          <InsightCard
            title="This Month vs Last Month"
            value={`${formatCurrency(insights.currentMonthExpenses)} / ${formatCurrency(insights.previousMonthExpenses)}`}
            detail="Current month expenses compared with the previous month."
          />
          <InsightCard title="Spending Signal" value="Trend Note" detail={insights.message} />
        </div>
      </section>

            <section>
        <div className="rounded-3xl border border-slate-200/70 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-slate-950 dark:text-white">Recent Activity</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Latest transactions impacting your dashboard snapshot.</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:bg-slate-800 dark:text-slate-300">
              Live preview
            </span>
          </div>
          <div className="mt-5 space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-950/60">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">{transaction.category}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{transaction.note || 'No note added'} • {formatDate(transaction.date)}</p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${transaction.type === 'income' ? 'text-emerald-600 dark:text-emerald-300' : 'text-rose-600 dark:text-rose-300'}`}>
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </p>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{transaction.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;

