import { useCallback } from 'react';
import { AppState } from '..';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Account } from '../../../shared/types';
import { accountActions } from './reducer';


export function useAccountsState(): AppState['accounts'] {
  return useAppSelector((state) => state.accounts);
}

export function useCurrentAccount() {
  const accountsState = useAccountsState();
  return accountsState.current;
}

export function useAccounts() {
  const accountsState = useAccountsState();
  return accountsState.accounts;
}

export function useAccountBalance() {
  const accountsState = useAccountsState();
  const currentAccount = useCurrentAccount();
  return accountsState.balanceMap[currentAccount.address] || { amount: '0', expired: true };
}

export function useAccountAddress() {
  const currentAccount = useCurrentAccount();
  return currentAccount.address;
}

export function useSetCurrentAccountCallback() {
  const dispatch = useAppDispatch();
  return useCallback(
    (account: Account) => {
      dispatch(accountActions.setCurrent(account));
    },
    [dispatch]
  );
}