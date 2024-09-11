import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Button, Input, Layout, Icon, Content, Header, Text, Column, Card, Row } from '@/components';
import { useTools } from '@/components/ActionComponent';
import { WalletKeyring } from '../../shared/types';
import { copyToClipboard } from '@/ui/utils';

export default function ExportPrivateKeyScreen() {

  const { state } = useLocation();
  const { keyring } = state as {
    keyring: WalletKeyring;
  };
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  const [privateKey, setPrivateKey] = useState('');
  const [error, setError] = useState('');
  const tools = useTools();

  const btnClick = async () => {
    try {
      const rightPassword = localStorage.getItem('password');
      if(rightPassword == password) {
        const wif: any = keyring.wif
        setPrivateKey(wif);
      } else {
        setError('Incorrect password');
      }
    } catch (e) {
      setError((e as any).message);
    }
  };
  
  const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ('Enter' == e.key) {
      btnClick();
    }
  };

  useEffect(() => {
    setDisabled(true);
    if (password) {
      setDisabled(false);
      setError('');
    }
  }, [password]);

  function copy(str: string) {
    copyToClipboard(str);
    tools.toastSuccess('Copied');
  }

  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Export Private Key"
      />
      <Content>
        {privateKey == '' ? (
          <Column gap="lg">
            <Text text="Type your password" preset="title" color="warning" textCenter my="xl" />
            <Input
              preset="password"
              onChange={(e: any) => {
                setPassword(e.target.value);
              }}
              onKeyUp={(e: any) => handleOnKeyUp(e)}
              autoFocus={true}
            />
            {error && <Text text={error} preset="regular" color="error" />}

            <Button text="Show Private Key" preset="primary" disabled={disabled} onClick={btnClick} />
          </Column>
        ) : (
          <Column>
            <Text
              text="If you ever change browsers or move computers, you will need this Private Key to access this account. Save it somewhere safe and secret"
              preset="sub"
              size="sm"
              textCenter
            />

            <Card
              onClick={() => {
                copy(privateKey);
              }}
            >
              <Row>
                <Icon icon="copy" color="textDim" />
                <Text
                  text={privateKey}
                  color="textDim"
                  style={{
                    overflowWrap: 'anywhere'
                  }}
                />
              </Row>
            </Card>
          </Column>
        )}
      </Content>
    </Layout>
  );
}
