import { useEffect, useState } from 'react';

import { Button, Input, Layout, Content, Icon, Header, Text, Column, Row, Card, Grid } from '@/components';
import { useLocation } from 'react-router-dom';
import { copyToClipboard } from '@/ui/utils';
import { WalletKeyring } from '../../shared/types';
import { useTools } from '../../components/ActionComponent';

export default function ExportMnemonicsScreen() {
  
  const { state } = useLocation();
  const { keyring } = state as {
    keyring: WalletKeyring;
  };

  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  const [mnemonic, setMnemonic] = useState('');
  const [error, setError] = useState('');
  const tools = useTools();
  const btnClick = async () => {
    try {
      const rightPassword = localStorage.getItem('password');
      if(rightPassword == password) {
        const mnemonic: any = keyring.phrase
        setMnemonic(mnemonic);
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
  const words = mnemonic.split(' ');
  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Secret Recovery Phrase"
      />

      <Content>
        {mnemonic == '' ? (
          <Column>
            <Text text="Type your password" preset="title" color="warning" textCenter mt="xl" mb="xl" />

            <Input
              preset="password"
              onChange={(e: any) => {
                setPassword(e.target.value);
              }}
              onKeyUp={(e: any) => handleOnKeyUp(e)}
              autoFocus={true}
            />
            {error && <Text text={error} preset="regular" color="error" />}

            <Button disabled={disabled} text="Show Secret Recovery Phrase" preset="primary" onClick={btnClick} />
          </Column>
        ) : (
          <Column>
            <Text
              text="This phrase is the ONLY way to recover your wallet. Do NOT share it with anyone! (click to copy)"
              color="warning"
              textCenter
              mt="xl"
              mb="xl"
            />

            <Row
              justifyCenter
              onClick={() => {
                copy(mnemonic);
              }}
            >
              <Icon icon="copy" color="textDim" />
              <Text text="Copy to clipboard" color="textDim" />
            </Row>

            <Row justifyCenter>
              <Grid columns={2}>
                {words.map((v, index) => {
                  return (
                    <Row key={index}>
                      <Text text={`${index + 1}. `} style={{ width: 40 }} />
                      <Card preset="style2" style={{ width: 200 }}>
                        <Text text={v} selectText />
                      </Card>
                    </Row>
                  );
                })}
              </Grid>
            </Row>
          </Column>
        )}
      </Content>
    </Layout>
  );
}

