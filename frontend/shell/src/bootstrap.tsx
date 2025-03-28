import React from 'react';
import ReactDOM from 'react-dom/client';
import { GlobalProvider } from 'core/GlobalContext'
import { RouterProvider } from 'core/RouterContext';
import { UserProvider } from 'core/UserContext';
import './bootstrap.css';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <GlobalProvider>
        <UserProvider>
          <title>PTCGO</title>
          <RouterProvider />
        </UserProvider>
      </GlobalProvider>
    </React.StrictMode>,
  );
}
