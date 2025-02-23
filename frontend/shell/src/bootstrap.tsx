import React from 'react';
import ReactDOM from 'react-dom/client';
import { GlobalProvider } from 'core/GlobalContext'
import { RouterProvider } from 'core/RouterContext';
import { pageRoutes } from './constants/routes';
import './bootstrap.css';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <GlobalProvider>
        <title>PTCGO</title>
        <RouterProvider routes={pageRoutes} />
      </GlobalProvider>
    </React.StrictMode>,
  );
}
