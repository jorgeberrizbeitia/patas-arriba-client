import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { BrowserRouter } from "react-router-dom"

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AuthWrapper } from './context/auth.context'

const theme = createTheme({
  palette: {
    // type: "light",
    primary: {
      main: '#EFB665', // Base color
      lighter: '#F4CC95', // Lighter tone
      darker: '#D99946', // Darker tone
      lighterSaturation: '#F7E4B0', // Lighter saturation
      darkerSaturation: '#D6A637', // Darker saturation
      contrast: '#856329', // Contrast tone
    },
    error: {
      main: '#E74C3C', // Danger color
    },
    info: {
      main: '#3498DB', // Info color
    },
    success: {
      main: '#2ECC71', // Success color
    },
    warning: {
      main: '#F39C12', // Warning color
    },
    gray: {
      main: '#95A5A6', // Neutral color
    },
  },
});

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <AuthWrapper>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </AuthWrapper>
  // </React.StrictMode>,
)
