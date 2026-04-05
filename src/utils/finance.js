const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export const formatCurrency = (value) => currencyFormatter.format(value || 0);

export const formatDate = (value) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));

export const getSummary = (transactions) => {
  const income = transactions
    .filter((item) => item.type === 'income')
    .reduce((total, item) => total + item.amount, 0);

  const expenses = transactions
    .filter((item) => item.type === 'expense')
    .reduce((total, item) => total + item.amount, 0);

  return {
    totalIncome: income,
    totalExpenses: expenses,
    totalBalance: income - expenses,
    savingsRate: income > 0 ? Math.round(((income - expenses) / income) * 100) : 0,
  };
};

export const getMonthlyTotals = (transactions, monthOffset = 0) => {
  const referenceDate = new Date();
  const targetDate = new Date(referenceDate.getFullYear(), referenceDate.getMonth() + monthOffset, 1);

  return transactions.reduce(
    (totals, item) => {
      const itemDate = new Date(item.date);
      if (itemDate.getMonth() !== targetDate.getMonth() || itemDate.getFullYear() !== targetDate.getFullYear()) {
        return totals;
      }

      if (item.type === 'income') {
        totals.income += item.amount;
      } else {
        totals.expenses += item.amount;
      }

      return totals;
    },
    { income: 0, expenses: 0 },
  );
};

export const getPercentageDelta = (currentValue, previousValue) => {
  if (previousValue === 0) {
    return currentValue > 0 ? 100 : 0;
  }

  return Math.round(((currentValue - previousValue) / previousValue) * 100);
};

export const getLineChartData = (transactions) => {
  const grouped = transactions
    .slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .reduce((accumulator, item) => {
      const key = item.date;
      const current = accumulator[key] || { date: key, income: 0, expenses: 0, balance: 0 };
      if (item.type === 'income') {
        current.income += item.amount;
        current.balance += item.amount;
      } else {
        current.expenses += item.amount;
        current.balance -= item.amount;
      }
      accumulator[key] = current;
      return accumulator;
    }, {});

  let runningBalance = 0;

  return Object.values(grouped).map((entry) => {
    runningBalance += entry.balance;
    return {
      ...entry,
      label: new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(entry.date)),
      runningBalance,
    };
  });
};

export const getCategoryBreakdown = (transactions) => {
  const totals = transactions
    .filter((item) => item.type === 'expense')
    .reduce((accumulator, item) => {
      accumulator[item.category] = (accumulator[item.category] || 0) + item.amount;
      return accumulator;
    }, {});

  return Object.entries(totals).map(([name, value]) => ({ name, value }));
};

export const getInsights = (transactions) => {
  const expenseTransactions = transactions.filter((item) => item.type === 'expense');
  const categoryBreakdown = getCategoryBreakdown(transactions).sort((a, b) => b.value - a.value);
  const highestSpendingCategory = categoryBreakdown[0];

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const previousMonthDate = new Date(currentYear, currentMonth - 1, 1);
  const previousMonth = previousMonthDate.getMonth();
  const previousMonthYear = previousMonthDate.getFullYear();

  const getMonthlyTotal = (month, year) =>
    expenseTransactions
      .filter((item) => {
        const date = new Date(item.date);
        return date.getMonth() === month && date.getFullYear() === year;
      })
      .reduce((sum, item) => sum + item.amount, 0);

  const currentMonthExpenses = getMonthlyTotal(currentMonth, currentYear);
  const previousMonthExpenses = getMonthlyTotal(previousMonth, previousMonthYear);

  const topCurrentCategory = expenseTransactions
    .filter((item) => {
      const date = new Date(item.date);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    })
    .reduce((accumulator, item) => {
      accumulator[item.category] = (accumulator[item.category] || 0) + item.amount;
      return accumulator;
    }, {});

  const topPreviousCategory = expenseTransactions
    .filter((item) => {
      const date = new Date(item.date);
      return date.getMonth() === previousMonth && date.getFullYear() === previousMonthYear;
    })
    .reduce((accumulator, item) => {
      accumulator[item.category] = (accumulator[item.category] || 0) + item.amount;
      return accumulator;
    }, {});

  const currentLeader = Object.entries(topCurrentCategory).sort((a, b) => b[1] - a[1])[0];
  const previousLeaderValue = currentLeader ? topPreviousCategory[currentLeader[0]] || 0 : 0;
  const growth =
    currentLeader && previousLeaderValue > 0
      ? Math.round(((currentLeader[1] - previousLeaderValue) / previousLeaderValue) * 100)
      : null;

  return {
    highestSpendingCategory,
    currentMonthExpenses,
    previousMonthExpenses,
    message: currentLeader
      ? previousLeaderValue > 0
        ? `You spent ${Math.abs(growth)}% ${growth >= 0 ? 'more' : 'less'} on ${currentLeader[0]} this month.`
        : `Your biggest spend this month is ${currentLeader[0]}.`
      : 'Add more transactions to unlock tailored spending insights.',
  };
};

export const filterAndSortTransactions = (transactions, filters) => {
  const term = filters.search.trim().toLowerCase();

  const filtered = transactions.filter((item) => {
    const matchesSearch =
      !term ||
      item.category.toLowerCase().includes(term) ||
      String(item.amount).includes(term) ||
      item.note.toLowerCase().includes(term);
    const matchesType = filters.type === 'all' || item.type === filters.type;
    return matchesSearch && matchesType;
  });

  return filtered.sort((a, b) => {
    if (filters.sortBy === 'amount') {
      return filters.sortDirection === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    }

    return filters.sortDirection === 'asc'
      ? new Date(a.date) - new Date(b.date)
      : new Date(b.date) - new Date(a.date);
  });
};

export const exportTransactionsToCsv = (transactions) => {
  const headers = ['Date', 'Amount', 'Category', 'Type', 'Note'];
  const rows = transactions.map((item) => [item.date, item.amount, item.category, item.type, item.note]);
  return [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(','))
    .join('\n');
};

export const getRecentTransactions = (transactions, limit = 5) =>
  transactions
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
