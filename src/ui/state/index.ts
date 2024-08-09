import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import ui from './ui/reducer';
import accounts from './accounts/reducer';
const store = configureStore({
  reducer: {
    ui,
    accounts
  }
});

setupListeners(store.dispatch);

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
