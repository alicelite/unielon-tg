import { createSlice } from '@reduxjs/toolkit';
import { Account, WalletKeyring } from '../../../shared/types';

export interface KeyringsState {
  keyrings: WalletKeyring[];
  current: WalletKeyring;
}

const initialKeyring: WalletKeyring = {
  key: '',
  index: 0,
  type: '',
  accounts: [],
  alianName: '',
  hdPath: ''
};

export const initialState: KeyringsState = {
  keyrings: [],
  current: initialKeyring
};

const slice = createSlice({
  name: 'keyrings',
  initialState,
  reducers: {
    setCurrent(state, action: { payload: WalletKeyring }) {
      const { payload } = action;
      state.current = payload || initialKeyring;
    },
    setKeyrings(state, action: { payload: WalletKeyring[] }) {
      const { payload } = action;
      state.keyrings = payload;
    },

    reset() {
      return initialState;
    },

    updateKeyringName(state, action: { payload: WalletKeyring }) {
      const keyring = action.payload;
      if (state.current.key === keyring.key) {
        state.current.alianName = keyring.alianName;
      }
      state.keyrings.forEach((v) => {
        if (v.key === keyring.key) {
          v.alianName = keyring.alianName;
        }
      });
    },

    updateAccountName(state: any, action: { payload: Account }) {
      const account = action.payload;

      state.current.accounts.forEach((v: any) => {
        if (v.key === account.key) {
          v.alianName = account.alianName;
        }
      });

      state.keyrings.forEach((v: any) => {
        v.accounts.forEach((w: any) => {
          if (w.key === account.key) {
            w.alianName = account.alianName;
          }
        });
      });
    }
  },
  extraReducers: () => {
  }
});

export const keyringsActions = slice.actions;
export default slice.reducer;
