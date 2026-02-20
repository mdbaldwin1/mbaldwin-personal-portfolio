import { Analytics } from '@vercel/analytics/react';
import '@fontsource/barlow-condensed/300.css';
import '@fontsource/barlow-condensed/400.css';
import '@fontsource/barlow-condensed/500.css';
import '@fontsource/barlow-condensed/700.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>,
);
