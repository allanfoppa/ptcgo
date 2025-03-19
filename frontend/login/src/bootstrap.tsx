import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './App';
import { RouterProvider } from 'core/RouterContext';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <title>Login</title>
      <RouterProvider>
        <Login />
      </RouterProvider>
    </React.StrictMode>,
  );
}
