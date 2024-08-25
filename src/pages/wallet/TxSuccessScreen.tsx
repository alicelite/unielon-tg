import { Layout, Header, Content, Icon, Text, Column, Footer, Button, Row } from '@/components';
import { blockstreamUrl } from '@/shared/constant';
import { spacing } from '@/ui/theme/spacing';
import { useLocation, useNavigate } from 'react-router-dom';

export default function TxSuccessScreen() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { txid } = state;
  return (
    <Layout>
      <Header />

      <Content style={{ gap: spacing.small }}>
        <Column justifyCenter mt="xxl" gap="xl">
          <Row justifyCenter>
            <Icon icon="success" size={50} style={{ alignSelf: 'center' }} />
          </Row>

          <Text preset="title" text="Payment Sent" textCenter />
          <Text preset="sub" text="Your transaction has been succesfully sent" color="textDim" textCenter />

          <Row
            justifyCenter
            onClick={() => {
              window.open(`${blockstreamUrl}/transaction/${txid}`);
            }}
          >
            <Icon icon="eye" color="textDim" />
            <Text preset="regular-bold" text="View on Block Explorer" color="textDim" />
          </Row>
        </Column>
      </Content>
      <Footer>
        <Button
          full
          text="Done"
          onClick={() => {
            navigate('/home');
          }}
        />
      </Footer>
    </Layout>
  );
}
