/* eslint-disable quotes */
import { Button, Column, Content, Layout, Row, Text, Logo } from '@/components';
import { NavigateOptions, useNavigate } from "react-router-dom"
import { useGlobalState } from '../../Context';
const WelcomeScreen = () => {
  const navigate = useNavigate()
  const { state } = useGlobalState();
  const { isBooted } = state;
  return (
    <Layout>
      <Content justifyContent>
        <Column fullX>
          <Row justifyCenter>
            <Logo preset="large" />
          </Row>
          <Column gap="xl" mt="xxl">
            <Text
              text={
                "Open Source Chrome Extension Wallet for Dogecoin, Cardinals & DRC-20"
              }
              preset="sub"
              textCenter
            />
            <Button
              text="Create new wallet"
              preset="primary"
              onClick={async () => {
                if (isBooted) {
                  navigate('account/create-hd-wallet', { isImport: false } as NavigateOptions);
                } else {
                  navigate('account/create-password', { isNewAccount: true } as NavigateOptions & { isNewAccount: boolean });
                }
              }}
            />
            <Button
              text="I already have a wallet"
              preset="default_"
              onClick={async () => {
                if (isBooted) {
                  navigate('account/create-hd-wallet', { isImport: true } as NavigateOptions);
                } else {
                  navigate('account/create-password', { isNewAccount: false } as NavigateOptions & { isNewAccount: boolean });
                }
              }}
            />
          </Column>
        </Column>
      </Content>
    </Layout>
  );
};

export default WelcomeScreen;

