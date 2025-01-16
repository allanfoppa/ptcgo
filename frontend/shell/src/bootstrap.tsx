import React from 'react';
import ReactDOM from 'react-dom/client';
import { GlobalProvider } from 'core/GlobalContext'
import App from './App';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <GlobalProvider>
        <title>PTCGO</title>
        <App />
      </GlobalProvider>
    </React.StrictMode>,
  );
}
