/* eslint-disable quotes */
import { Button, Column, Content, Layout, Row, Text, Logo } from '@/components';

import { useNavigate } from "react-router-dom"
const WelcomeScreen = () => {
  const navigate = useNavigate()
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
                navigate('account/create-password')
                // const isBooted = await wallet.isBooted();
                // console.log(isBooted, 'isBooted=====')
                // if (isBooted) {
                //   navigate('CreateHDWalletScreen', { isImport: false });
                // } else {
                //   navigate('CreatePasswordScreen', { isNewAccount: true });
                // }
              }}
            />
            <Button
              text="I already have a wallet"
              preset="default_"
              onClick={async () => {
                // const isBooted = await wallet.isBooted();
                // if (isBooted) {
                //   navigate('CreateHDWalletScreen', { isImport: true });
                // } else {
                //   navigate('CreatePasswordScreen', { isNewAccount: false });
                // }
              }}
            />
          </Column>
        </Column>
      </Content>
    </Layout>
  );
};

export default WelcomeScreen;

