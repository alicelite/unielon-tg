import { createSlice } from '@reduxjs/toolkit';
import { Account } from '../../../shared/types';
export interface AccountsState {
  accounts: Account[];
  current: Account;
  loading: boolean;
  balanceMap: {
    [key: string]: {
      amount: string | number;
      expired: boolean;
    };
  };
}

const initialAccount = {
  type: '',
  address: '',
  index: 0,
  balance: 0,
  pubkey: '',
  key: '',
};

export const initialState: AccountsState = {
  accounts: [],
  current: initialAccount,
  loading: false,
  balanceMap: {}
};

const slice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    pendingLogin(state) {
      state.loading = true;
    },
    setCurrent(state, action: { payload: Account }) {
      const { payload } = action;
      state.current = payload || initialAccount;
    },
    setAccounts(state, action: { payload: Account[] }) {
      const { payload } = action;
      state.accounts = payload;
    },
    setBalance(
      state,
      action: {
        payload: {
          address: string;
          amount: string | number;
        };
      }
    ) {
      console.log(action, 'action----')
      const {
        payload: { address, amount }
      } = action;
      console.log(state.balanceMap[address], 'state.balanceMap[address]')
      state.balanceMap[address] = state.balanceMap[address] || {
        amount: '0',
        expired: true
      };
      state.current.balance = Number(amount);
      state.balanceMap[address].amount = amount;
      state.balanceMap[address].expired = false;
      console.log(state, '====state')
    },
    expireBalance(state) {
      const balance = state.balanceMap[state.current.address];
      if (balance) {
        balance.expired = true;
      }
    },
    setCurrentAccountName(state, action: { payload: string }) {
      const { payload } = action;
      state.current.alianName = payload;
      const account = state.accounts.find((v) => v.address === state.current.address);
      if (account) {
        account.alianName = payload;
      }
    },
    rejectLogin(state) {
      state.loading = false;
    },
    reset() {
      return initialState;
    },
    updateAccountName(
      state,
      action: {
        payload: Account;
      }
    ) {
      const account = action.payload;
      if (state.current.key === account.key) {
        state.current.alianName = account.alianName;
      }
      state.accounts.forEach((v) => {
        if (v.key === account.key) {
          v.alianName = account.alianName;
        }
      });
    }
  }
});

export const accountActions = slice.actions;
export default slice.reducer;
