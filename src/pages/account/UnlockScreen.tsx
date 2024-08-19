import React, { useEffect, useState } from 'react';

import { Column, Content, Layout, Row, Button, Input, Logo, Text } from '@/components';
import { useTools } from '@/components/ActionComponent';
// import { useUnlockCallback } from '@/ui/state/global/hooks';
// import { getUiType, useWallet } from '@/ui/utils';
import { useNavigate } from 'react-router-dom';
import { validatePassword } from '../../ui/utils/wallet';

export default function UnlockScreen() {
  // const wallet = useWallet();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  // const UIType = getUiType();
  // const isInNotification = UIType.isNotification;
  // const unlock = useUnlockCallback();
  const tools = useTools();
  const btnClick = async () => {
    // run(password);
    try {
      const isValidated = await validatePassword(password);
      if(!isValidated) {
        tools.toastError('PASSWORD ERROR');
      } else {
        navigate('/home');
      }
    } catch (e) {
      tools.toastError('PASSWORD ERROR');
    }
  };

  const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!disabled && 'Enter' == e.key) {
      btnClick();
    }
  };

  useEffect(() => {
    if (password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password]);
  return (
    <Layout>
      <Content preset="middle">
        <Column fullX>
          <Row justifyCenter>
            <Logo preset="large" />
          </Row>

          <Column gap="xl" mt="xxl">
            <Text preset="title-bold" text="Enter your password" textCenter />
            <Input
              preset="password"
              placeholder="Password"
              onChange={(e: any) => setPassword(e.target.value)}
              onKeyUp={(e: any) => handleOnKeyUp(e)}
              autoFocus={true}
            />
            <Button disabled={disabled} text="Unlock" preset="primary" onClick={btnClick} />
          </Column>
        </Column>
      </Content>
    </Layout>
  );
}
