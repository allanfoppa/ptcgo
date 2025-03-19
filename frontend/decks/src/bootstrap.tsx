import React from 'react';
import ReactDOM from 'react-dom/client';
import DecksLogic from './Decks.logic';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <DecksLogic />
    </React.StrictMode>,
  );
}
