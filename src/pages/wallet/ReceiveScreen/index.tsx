import QRCode from 'qrcode.react';
import { useAccountAddress, useCurrentAccount } from '@/ui/state/accounts/hooks';
import { Content, Header, Text, AddressBar, Icon, Layout, Column, Row } from '@/components';
import { sizes } from '@/ui/theme/spacing';

import './index.less';

export default function ReceiveScreen() {
  const currentAccount = useCurrentAccount();
  console.log(currentAccount.balance, 'currentAccount===')
  const address = useAccountAddress();

  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Receive Address"
      />
      <Content>
        <Column gap="xl" >
          <Column
            justifyCenter
            rounded
            style={{ backgroundColor: 'white', alignSelf: 'center', alignItems: 'center', padding: 10 }}
          >
            <QRCode value={address || ''} renderAs="svg" size={sizes.qrcode}></QRCode>
          </Column>

          <Row justifyCenter>
            <Icon icon="user" />
            <Text preset="regular-bold" text={currentAccount?.alianName} />
          </Row>
          <AddressBar />
        </Column>
      </Content>
    </Layout>
  );
}
