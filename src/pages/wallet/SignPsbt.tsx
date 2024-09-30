import React, { useEffect, useState } from 'react';
import { Button, Layout, Content, Footer, Text, Row, Card, Column, AddressText } from '@/components';
import { satoshisToAmount } from '../../ui/utils';
import logo from "@/assets/wallet-logo.png"

interface SignPsbtProps {
  rawTxInfo: any;
  handleCancel: () => void;
  handleConfirm: () => void;
}

const SignPsbt: React.FC<SignPsbtProps> = ({ rawTxInfo, handleCancel, handleConfirm }) => {
  const { feeRate, spendAmount, toAddress, transferType, ticker, receiver } = rawTxInfo;
  console.log('rawTxInfo---<<<-', rawTxInfo);
  const [transferAddressInfo, setTransferAddressInfo] = useState<any>()
  const [transferAddressLength, setTransferAddressLength] = useState(0)
  useEffect(() => {
    if(transferType) {
      const data: any = {}
      data.toAddressInfo = {
        address: receiver,
        domain: '',
        inscription: ''
      }

      const addressArray = data?.toAddressInfo.address.split(',').map((addr: string) => addr.trim()).filter((addr: string) => addr !== '');
      setTransferAddressLength(addressArray.length)
      setTransferAddressInfo(data)
    }
  }, [transferType])
  return (
    <Layout>
      <Column mt="xxl" style={{ flex: '1 1 0% ' }}>
      <Row justifyCenter itemsCenter>
        <img src={logo} style={{ width: '100px', height: 'inherit' }} alt="" />
      </Row>
        <Content>
          <Text text="Sign Transaction" preset="title-bold" textCenter mt="xl" mb="md" size="md" />
          <Column>
            <Row justifyCenter mt="md">
              <Card style={{ backgroundColor: '#272626', maxWidth: 320, width: 320, flexDirection: 'column' }}>
                <Column pt="md">
                  <Text text={'Send to'} textCenter color="textDim" />
                  <AddressText address={toAddress} />
                </Column>
                {
                  transferType &&
                  <AddressText addressInfo={transferAddressInfo?.toAddressInfo} textCenter />
                }
                <Column mb="md" mt="md">
                  <Text text={'Spend Amount'} textCenter color="textDim" />
                  <Text text={`${transferType ? spendAmount * transferAddressLength : spendAmount} ${transferType ? ticker : 'DOGE'}`} textCenter />
                </Column>
                <Column style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', margin: '0 50px' }} full />
                <Column mt='md'>
                  <Text text={'Network fee'} textCenter color="textDim" />
                  <Text text={`${satoshisToAmount(feeRate)} DOGE`} textCenter />
                </Column>
              </Card>
            </Row>
          </Column>
        </Content>

        <Footer>
          <Row justifyCenter mt="lg" full>
            <Button text="Reject" preset="default" onClick={handleCancel} full />
            <Button text="Sign & Send" preset="primary" onClick={handleConfirm} full />
          </Row>
        </Footer>
      </Column>
    </Layout>
  );
};

export default SignPsbt;