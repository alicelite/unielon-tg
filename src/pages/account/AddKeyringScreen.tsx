import { Card, Column, Content, Header, Layout, Text } from '@/components';
import { NavigateOptions, useNavigate } from 'react-router-dom';

export default function AddKeyringScreen() {
  const navigate = useNavigate();
  return (
    <Layout>
      <Header
        title="Create a new wallet"
      />
      <Content>
        <Column>
          <Text text="Create Wallet" preset="regular-bold" />

          <Card
            justifyCenter
            onClick={() => {
              navigate('/account/create-hd-wallet', { state: { isNewAccount: true } } as NavigateOptions);
            }}
          >
            <Column full justifyCenter>
              <Text text="Create with mnemonics (12-words)" size="sm" />
            </Column>
          </Card>

          <Text text="Restore Wallet" preset="regular-bold" mt="lg" />

          <Card
            justifyCenter
            onClick={() => {
              navigate('/account/create-hd-wallet', { state: { isImport: true, isAddAccount: true } } as NavigateOptions);
            }}
          >
            <Column full justifyCenter>
              <Text text="Restore from mnemonics (12-words)" size="sm" />
            </Column>
          </Card>

          <Card
            justifyCenter
            onClick={() => {
              navigate('/account/create-simple-wallet')
            }}
          >
            <Column full justifyCenter>
              <Text text="Restore from single private key" size="sm" />
            </Column>
          </Card>
        </Column>
      </Content>
    </Layout>
  );
}
