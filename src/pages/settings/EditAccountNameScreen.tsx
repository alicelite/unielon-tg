import { KeyboardEvent, SetStateAction, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Button, Content, Header, Input, Layout } from '@/components';
import { useAppDispatch } from '@/ui/state/hooks';
import { Account } from '../../shared/types';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { accountActions } from '../../ui/state/accounts/reducer';
import { useAccounts } from '../../ui/state/accounts/hooks';
import { keyringsActions } from '../../ui/state/keyrings/reducer';

export default function EditAccountNameScreen() {

  const { state } = useLocation();
  const { account } = state as {
    account: Account;
  };
  const accounts = useAccounts();
  const [alianName, setAlianName] = useState('');
  const dispatch = useAppDispatch();
  const currentAccount = useCurrentAccount();
  const handleOnClick = async () => {
    let currentKeyring: any = {}
    const updatedCurrentAccounts = currentAccount.accounts.map((item: any) => {
      if (item.address === account.address) {
        currentKeyring = {
          ...item,
          alianName: alianName,
          address: account.address
        }
        return {
          ...item,
          alianName: alianName,
          address: account.address
        };
      }
      return item;
    });
    
    const updatedCurrentAccount = {
      ...currentAccount,
      accounts: updatedCurrentAccounts,
    };
    const updatedAccounts = accounts.map((item: any) => {
      if (item.phrase === updatedCurrentAccount.phrase) {
        return updatedCurrentAccount;
      }
      return item;
    });
    dispatch(keyringsActions.setCurrent(currentKeyring));
    dispatch(accountActions.setCurrent(updatedCurrentAccount));
    dispatch(accountActions.setAccounts(updatedAccounts));
    window.history.go(-1);
  };

  const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ('Enter' == e.key) {
      handleOnClick();
    }
  };

  const validName = useMemo(() => {
    if (alianName.length == 0) {
      return false;
    }
    return true;
  }, [alianName]);
  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title={account.alianName}
      />
      <Content>
        <Input
          placeholder={account.alianName}
          onChange={(e: { target: { value: SetStateAction<string>; }; }) => {
            setAlianName(e.target.value);
          }}
          onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => handleOnKeyUp(e)}
          autoFocus={true}
        />
        <Button
          disabled={!validName}
          text="Change Account Name"
          preset="primary"
          onClick={() => {
            handleOnClick();
          }}
        />
      </Content>
    </Layout>
  );
}
