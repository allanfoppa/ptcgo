import React from 'react';
import ReactDOM from 'react-dom/client';
import Register from './Register';
import { RouterProvider } from 'core/RouterContext';


const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <title>Register</title>
      <RouterProvider>
        <Register />
      </RouterProvider>
    </React.StrictMode>,
  );
}
