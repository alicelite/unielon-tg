import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import WebApp from '@twa-dev/sdk'
import { Buffer } from 'buffer';
import { ActionComponentProvider } from '@/components/ActionComponent';
window.Buffer = Buffer;
window.global = window.globalThis;
WebApp.ready();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <ActionComponentProvider>
      <App />
     </ActionComponentProvider>
  </React.StrictMode>,
)
