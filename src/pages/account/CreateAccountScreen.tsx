import { KeyboardEvent, useEffect, useState } from 'react';

import { Button, Column, Content, Header, Input, Layout } from '@/components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useTools } from '@/components/ActionComponent';
import { generateAddressFromPublicKey, generatePublicKey } from '../../ui/utils/hooks';
import { useAppDispatch } from '../../ui/state/hooks';
import { accountActions } from '../../ui/state/accounts/reducer';
import { useAccounts } from '../../ui/state/accounts/hooks';
import { keyringsActions } from '../../ui/state/keyrings/reducer';

export default function CreateAccountScreen() {
  const navigate = useNavigate();
  const tools = useTools();
  const [defaultName, setDefaultName] = useState('');
  const currentAccount = useCurrentAccount();
  const accounts = useAccounts();

  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const handleOnClick = async () => {
    const index = state.keyring.accounts.length;
    const pubkey = generatePublicKey(currentAccount.phrase, index);
    const address = generateAddressFromPublicKey(pubkey);
    const newAccount = {
      pubkey: pubkey,
      index: index,
      address,
      alianName: `Account ${index + 1}`,
      hdPath: "m/44'/3'/0'/0"
    };
  
    const newKeyring = {
      ...state.keyring,
      accounts: [...state.keyring.accounts, newAccount]
    };
    if(index < 1) {
      newKeyring.address = address
    }
    dispatch(keyringsActions.setCurrent(newAccount));
    const updatedAccounts = accounts.map((item: any) => {
      if (item.phrase === newKeyring.phrase) {
        return newKeyring;
      }
      return item;
    });
    dispatch(accountActions.setAccounts(updatedAccounts));
    dispatch(accountActions.setCurrent(newKeyring));
    tools.toastSuccess('Success');
    navigate('/home');
  };

  const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ('Enter' == e.key) {
      handleOnClick();
    }
  };

  const init = async () => {
    const index = state.keyring.accounts.length
    const accountName = `Account ${index + 1}`;
    setDefaultName(accountName);
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="New account"
      />
      <Content>
        <Column>
          <Input
            placeholder={defaultName}
            // onChange={(e: { target: { value: SetStateAction<string>; }; }) => {
            //   // setAlianName(e.target.value);
            // }}
            onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => handleOnKeyUp(e)}
            autoFocus={true}
          />
          <Button
            text="Create a Account"
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
