import { KeyboardEvent, SetStateAction, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Button, Column, Content, Input, Layout, Text } from '@/components';
import { useTools } from '@/components/ActionComponent';
import { useNavigate } from "react-router-dom"

const CreatePasswordScreen = () => {
  const navigate = useNavigate()
  const { state } = useLocation();
  const { isNewAccount = false } = state as { isNewAccount?: boolean } || {};
  console.log(isNewAccount, 'isNewAccount====')
  const [password, setPassword] = useState('');

  const [password2, setPassword2] = useState('');

  const [disabled, setDisabled] = useState(true);

  const tools = useTools();
  const run = () => {
    if (isNewAccount) {
      navigate('/account/create-hd-wallet');
    } else {
      navigate('/account/create-hd-wallet');
    }
  }

  const btnClick = () => {
    run();
  };

  const verify = (pwd2: string) => {
    if (pwd2 && pwd2 !== password) {
      tools.toastWarning('Entered passwords differ');
    }
  };

  useEffect(() => {
    setDisabled(true);

    if (password) {
      if (password.length < 5) {
        tools.toastWarning('Password must contain at least 5 characters');
        return;
      }

      if (password2) {
        if (password === password2) {
          setDisabled(false);
          return;
        }
      }
    }
  }, [password, password2]);

  const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!disabled && 'Enter' == e.key) {
      btnClick();
    }
  };

  return (
    <Layout>
      <Content justifyContent>
        <Column fullX>
          <Column gap="xl" mt="xxl">
            <Text text="Create a password" preset="title-bold" textCenter />
            <Text text="You will use this to unlock your wallet" preset="sub" textCenter />
            <Input
              preset="password"
              onBlur={(e: { target: { value: SetStateAction<string>; }; }) => {
                setPassword(e.target.value);
              }}
              autoFocus={true}
            />
            <Input
              preset="password"
              placeholder="Confirm Password"
              onChange={(e: { target: { value: SetStateAction<string>; }; }) => {
                setPassword2(e.target.value);
              }}
              onBlur={(e: { target: { value: string; }; }) => {
                verify(e.target.value);
              }}
              onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => handleOnKeyUp(e)}
            />
            <Button disabled={disabled} text="Continue" preset="primary" onClick={btnClick} />
          </Column>
        </Column>
      </Content>
    </Layout>
  );
}

export default CreatePasswordScreen;