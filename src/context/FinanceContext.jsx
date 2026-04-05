import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { mockTransactions } from '../data/mockTransactions';
import { filterAndSortTransactions, getCategoryBreakdown, getInsights, getLineChartData, getSummary } from '../utils/finance';

const FinanceContext = createContext(null);
const STORAGE_KEY = 'financial-dashboard-state';
const getPreferredTheme = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const initialState = {
  transactions: mockTransactions,
  filters: {
    search: '',
    type: 'all',
    sortBy: 'date',
    sortDirection: 'desc',
  },
  role: 'admin',
  theme: getPreferredTheme(),
  loading: true,
};

function financeReducer(state, action) {
  switch (action.type) {
    case 'hydrate':
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case 'finishLoading':
      return {
        ...state,
        loading: false,
      };
    case 'setTheme':
      return {
        ...state,
        theme: action.payload,
      };
    case 'setRole':
      return {
        ...state,
        role: action.payload,
      };
    case 'toggleTheme':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
    case 'setFilters':
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };
    case 'addTransaction':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    case 'updateTransaction':
      return {
        ...state,
        transactions: state.transactions.map((item) => (item.id === action.payload.id ? action.payload : item)),
      };
    case 'deleteTransaction':
      return {
        ...state,
        transactions: state.transactions.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
}

export function FinanceProvider({ children }) {
  const [state, dispatch] = useReducer(financeReducer, initialState);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      const parsedState = JSON.parse(saved);
      dispatch({
        type: 'hydrate',
        payload: {
          ...parsedState,
          theme: getPreferredTheme(),
        },
      });
    } else {
      const timer = window.setTimeout(() => dispatch({ type: 'finishLoading' }), 700);
      return () => window.clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const syncTheme = (event) => {
      dispatch({ type: 'setTheme', payload: event.matches ? 'dark' : 'light' });
    };

    dispatch({ type: 'setTheme', payload: mediaQuery.matches ? 'dark' : 'light' });

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', syncTheme);
      return () => mediaQuery.removeEventListener('change', syncTheme);
    }

    mediaQuery.addListener(syncTheme);
    return () => mediaQuery.removeListener(syncTheme);
  }, []);

  useEffect(() => {
    if (state.loading) {
      return;
    }

    // Persist only the user-controlled parts of state so derived values stay computed in one place.
    const persistedState = {
      transactions: state.transactions,
      filters: state.filters,
      role: state.role,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(persistedState));
  }, [state]);

  const derivedData = useMemo(() => {
    const filteredTransactions = filterAndSortTransactions(state.transactions, state.filters);
    return {
      summary: getSummary(state.transactions),
      lineChartData: getLineChartData(state.transactions),
      categoryBreakdown: getCategoryBreakdown(state.transactions),
      insights: getInsights(state.transactions),
      filteredTransactions,
    };
  }, [state.transactions, state.filters]);

  const value = {
    state,
    dispatch,
    ...derivedData,
  };

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
}
