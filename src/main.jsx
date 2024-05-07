import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { BrowserRouter } from "react-router-dom"

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AuthWrapper } from './context/auth.context'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const theme = createTheme({
  typography: {
    h1: {
      fontSize: '2rem', 
    },
    h2: {
      fontSize: '1.8rem', 
    },
    h3: {
      fontSize: '1.6rem', 
    },
    h4: {
      fontSize: '1.4rem', 
    },
    h5: {
      fontSize: '1.2rem', 
    },
    h6: {
      fontSize: '1rem', 
    },
    subtitle1: {
      fontSize: '1rem', 
    },
    subtitle2: {
      fontSize: '0.875rem', 
    },
    body1: {
      fontSize: '1rem', 
    },
    body2: {
      fontSize: '0.875rem', 
    },
    caption: {
      fontSize: '0.75rem', 
    },
    overline: {
      fontSize: '0.625rem', 
    },
    // button: {
    //   fontSize: '0.625rem',
    // },
    icon: {
      fontSize: '0.5rem', 
    },
  },
  palette: {
    primary: {
      main: '#EFB665', // Base color
      lighter: '#F4CC95', // Lighter tone
      darker: '#D99946', // Darker tone
      lighterSaturation: '#F7E4B0', // Lighter saturation
      darkerSaturation: '#D6A637', // Darker saturation
      contrast: '#856329', // Contrast tone
      transparent: 'rgba(239, 182, 101, 0.1)'
    },
    text: {
      primary: '#173A5E',
      secondary: '#46505A',
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
      lighter: '#CED7D9', // Lighter tone
      transparent: 'rgba(149, 165, 166, 0.1)'
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthWrapper>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthWrapper>
    </ThemeProvider>
  // </React.StrictMode>,
)
