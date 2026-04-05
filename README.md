# Financial Dashboard

A modern, responsive financial dashboard built with React, Vite, Tailwind CSS, Recharts, and the Context API. The app helps track balances, monitor transaction history, switch between simulated roles, and surface quick spending insights.

## Project Overview

This project includes:

- An overview dashboard with summary cards and charts
- A searchable, filterable, sortable transactions section
- Frontend-only role simulation for `Viewer` and `Admin`
- Insight cards computed from transaction data
- Local storage persistence, dark mode, CSV export, and loading states

## Features

- Responsive layout with sidebar and topbar
- Summary cards for total balance, income, and expenses
- Line chart for balance and expense flow over time
- Donut chart for category-based spending breakdown
- Transaction table with search by amount, category, or note
- Filtering by type
- Sorting by date or amount
- Admin-only add, edit, and delete actions
- Viewer read-only mode with disabled action buttons
- Insight panel with highest spending category
- This month vs last month expense totals
- Trend message based on monthly category changes
- Empty states and loading placeholders
- Dark mode toggle
- CSV export for visible transactions
- Data persistence through `localStorage`

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Recharts
- Context API with `useReducer`

## Project Structure

```text
src/
  components/
  context/
  data/
  pages/
  utils/
  App.jsx
  main.jsx
```

## Setup Instructions

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```



## Notes

- Data is seeded from mock transactions and then persisted in browser storage.
- Role-based behavior is simulated entirely on the frontend.
- The design is optimized for mobile, tablet, and desktop layouts.
