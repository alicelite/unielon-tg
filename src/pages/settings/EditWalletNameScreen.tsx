import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button, Column, Content, Header, Input, Layout } from '@/components';
import { WalletKeyring } from '../../shared/types';
import { useAppDispatch } from '@/ui/state/hooks';
import { accountActions } from '@/ui/state/accounts/reducer';
import { useAccounts } from '@/ui/state/accounts/hooks';

export default function EditWalletNameScreen() {
  const { state } = useLocation();
  const { keyring } = state as {
    keyring: WalletKeyring;
  };
  const accounts = useAccounts()
  const [alianName, setAlianName] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleOnClick = async () => {
    const accountInfo = JSON.parse(JSON.stringify(accounts))
    accountInfo.find((item: any) => {
      if(item.address == keyring.address) {
        item.alianName = alianName
      }
    })
    const newKeyring = JSON.parse(JSON.stringify(keyring));
    newKeyring.alianName = alianName
    dispatch(accountActions.setCurrent(newKeyring));
    dispatch(accountActions.setAccounts(accountInfo));
    navigate('/account/switch-keyring')
  };

  const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ('Enter' == e.key) {
      handleOnClick();
    }
  };

  const isValidName = useMemo(() => {
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
        title={keyring.alianName}
      />
      <Content>
        <Column gap="lg">
          <Input
            placeholder={keyring.alianName}
            onChange={(e: any) => {
              setAlianName(e.target.value);
            }}
            onKeyUp={(e: any) => handleOnKeyUp(e)}
            autoFocus={true}
          />
          <Button
            disabled={!isValidName}
            text="Change Wallet Name"
            preset="primary"
            onClick={() => {
              handleOnClick();
            }}
          />
        </Column>
      </Content>
    </Layout>
  );
}
