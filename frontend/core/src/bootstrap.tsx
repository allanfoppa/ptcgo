import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <title>Core MFE</title>
      <meta name="description" content="Shared layout components and reusable UI elements for use across the application." />
      <App />
    </React.StrictMode>,
  );
}
