# Cloud Cost & Inventory Dashboard

A React + Ant Design dashboard that showcases:
- Authentication (mock users)
- Inventory table with search/filter/sort/pagination
- Cost trend chart per service
- Theme (Dark/Light)
- Context API, Reducers, Custom Hooks, ErrorBoundary, Code Splitting

## Quickstart

1. Ensure you have Node 18+ installed.
2. Install deps:

```bash
npm install
```

3. Start dev server:

```bash
npm start
```

Open http://localhost:3000

### Login
Use any of:
- **admin / admin123**
- **user1 / pass123**

### Notes
- Mock JSON is served from `public/mock-data`.
- Routing is protected; accessing `/` redirects to `/login` if unauthenticated.
- Chart is lazy-loaded with `React.lazy`.
- Filters use `useReducer` and `Set` for multi-select states.





