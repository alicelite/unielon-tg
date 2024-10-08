import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import WebApp from '@twa-dev/sdk'
import { Buffer } from 'buffer';
import { ActionComponentProvider } from '@/components/ActionComponent';
import { GlobalStateProvider } from './Context.tsx';
import { Provider } from 'react-redux';
import { store, persistor } from './ui/state/index.ts';
import { PersistGate } from 'redux-persist/integration/react';
window.Buffer = Buffer;
window.global = window.globalThis;
WebApp.ready();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <GlobalStateProvider>
      <ActionComponentProvider>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
     </ActionComponentProvider>
    </GlobalStateProvider>
    </Provider>
  </React.StrictMode>,
)
