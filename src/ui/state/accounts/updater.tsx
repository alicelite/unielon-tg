import { useCallback, useEffect, useRef } from 'react';

import eventBus from '@/shared/eventBus';

import { useAppDispatch } from '../hooks';
import { useAccountBalance, useCurrentAccount } from './hooks';
import { accountActions } from './reducer';
import { Account } from '../../../shared/types';

export default function AccountUpdater() {
  const dispatch = useAppDispatch();
  const currentAccount = useCurrentAccount();
  const balance = useAccountBalance();
  const selfRef = useRef({
    preAddress: '',
    loadingBalance: false,
    loadingHistory: false
  });
  const self = selfRef.current;

  const onCurrentChange = useCallback(async () => {
    if (currentAccount && currentAccount.address != self.preAddress) {
      self.preAddress = currentAccount.address;
      // const _accounts = await wallet.getAccounts();
      // dispatch(accountActions.setAccounts(_accounts));
      dispatch(accountActions.expireBalance());
    }
  }, [dispatch, currentAccount]);

  useEffect(() => {
    onCurrentChange();
  }, [currentAccount && currentAccount.address]);

  useEffect(() => {
    if (self.loadingBalance) {
      return;
    }
    if (!balance.expired) {
      return;
    }
  }, [ self]);

  useEffect(() => {
    const accountChangeHandler = (account: Account) => {
      if (account && account.address) {
        dispatch(accountActions.setCurrent(account));
      }
    };
    eventBus.addEventListener('accountsChanged', accountChangeHandler);
    return () => {
      eventBus.removeEventListener('accountsChanged', accountChangeHandler);
    };
  }, [dispatch]);

  return null;
}
