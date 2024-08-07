import { AppState } from '..';
import { useAppSelector } from '../hooks';


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