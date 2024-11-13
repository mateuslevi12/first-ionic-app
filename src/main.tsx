import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './global.css'
import { ThemedContextProvider } from './hooks/useTheme';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ThemedContextProvider>
      <App />
    </ThemedContextProvider>
  </React.StrictMode>
);