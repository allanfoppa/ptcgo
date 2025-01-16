import React from 'react';
import ReactDOM from 'react-dom/client';
import { GlobalProvider } from 'core/GlobalContext'
import Dashboard from './Dashboard';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <GlobalProvider>
        <title>Dashboard MFE</title>
        <meta name="description" content="User dashboard view." />
        <Dashboard />
      </GlobalProvider>
    </React.StrictMode>,
  );
}
