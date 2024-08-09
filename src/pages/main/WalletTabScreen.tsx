import { useEffect, useMemo, useState } from 'react';
import { Column, Content, Header, Layout, Row, Text } from '../../components';
import { AddressBar } from '@/components/AddressBar';
import { Button } from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import { getBalance, getDogePrice } from '@/shared/cardinals';
export default function WalletTabScreen() {
  const [totalPrice, setTotalPrice] = useState(0)
  const navigate = useNavigate()
  const [balance, setBalance] = useState()
  
  const balanceValue = async () => {
    const res =  await getBalance('DH5RX8yrAS38VCKQyVuicmmf8VvvztZvJM');
    const balance = (res?.balance).toFixed(4) || 0
    getDogePriceInfo(balance)
    setBalance(balance)
  };
  useMemo(() => {
    balanceValue()
  }, []);

  const getDogePriceInfo = async (balance: any) => {
    const dogePrice = await getDogePrice()
    const totalPrice = Number(dogePrice?.last) * Number(balance)
    console.log(totalPrice, 'totalPrice===')
    setTotalPrice(totalPrice)
  }

  return (
    <Layout>
      <Header/>
      <Content>
        <Column style={{ marginTop: '16px', gap: '16px' }}>
          <AddressBar />
          <Row style={{gap: 0}} justifyCenter>
            <Text text={balance} textCenter size="xxxl" />
            <Text style={{paddingLeft: '4px'}} text="DOGE" textCenter size="xxxl" />
          </Row>
          
          {
            totalPrice > 0 &&
            <Text text={`≈ $${totalPrice.toFixed(2)} USD`} preset="regular" color="textDim" textCenter size="md" style={{marginTop: '-12px'}}/>
          }
          
          <Row justifyBetween style={{ marginTop: '16px' }}>
            <Button
              text="Receive"
              preset="default"
              icon="receive"
              onClick={(e) => {
                navigate('ReceiveScreen');
              }}
              full
            />
            <Button
              text="Send"
              preset="default"
              icon="send"
              onClick={(e) => {
                navigate('TxCreateScreen');
              }}
              full
            />
            <Button
              text="History"
              preset="default"
              icon="history"
              onClick={(e) => {
                navigate('HistoryScreen');
              }}
              full
            />
          </Row>
        </Column>
      </Content>
    </Layout>
  );
}
