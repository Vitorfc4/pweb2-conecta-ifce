import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import { ensureMockDb } from '@/mocks/db';
import { AppProviders } from '@/providers/app-providers';
import { reportWebVitals } from '@/lib/report-web-vitals';
import { isRestMode } from '@/lib/api-config';
import '@/index.css';

if (!isRestMode()) {
  ensureMockDb();
}

reportWebVitals();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
);
