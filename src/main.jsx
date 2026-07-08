// App entry point: mounts React, registers the PWA service worker, and wires
// the provider stack (theme → auth → router). It owns no visual or business
// decisions — the theme lives in src/theme.js so components and tests can
// import design tokens without executing this file's side effects.

import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { BrowserRouter } from "react-router-dom"

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthWrapper } from './context/auth.context'
import theme from './theme'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// The brand display face — h1/h2 and the wordmark only (see theme.js).
import '@fontsource/staatliches/400.css';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js?v=1.0.6')
        .then(registration => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch(error => {
          console.log('ServiceWorker registration failed: ', error);
        });
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <ThemeProvider theme={theme}>
      {/* CssBaseline paints background.default on the body — without it the
          warm off-white canvas never shows. */}
      <CssBaseline />
      <AuthWrapper>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthWrapper>
    </ThemeProvider>
  // </React.StrictMode>,
)
