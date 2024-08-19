import { useEffect, useState } from 'react';
import { Column, Content, Header, Layout, Row, Text } from '../../components';
import { AddressBar } from '@/components/AddressBar';
import { Button } from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import { getBalance, getDogePrice } from '@/shared/cardinals';
import { getLocalValue, getSessionValue } from '../../ui/utils';
import { PASSWORD, WALLET } from '../../shared/constant';
import { decrypt } from '../../ui/utils/wallet';

export default function WalletTabScreen() {
  const [totalPrice, setTotalPrice] = useState(0)
  const navigate = useNavigate()
  const [balance, setBalance] = useState()
  const [address, setAddress] = useState()
  const balanceValue = async () => {
    const res =  await getBalance(address);
    const balance = res?.balance?.toFixed(4) ?? 0;
    getDogePriceInfo(balance)
    setBalance(balance)
  };
  useEffect(() => {
    if(address) {
      balanceValue()
    }
  }, [address]);

  const getDogePriceInfo = async (balance: any) => {
    const dogePrice = await getDogePrice()
    const totalPrice = Number(dogePrice?.last) * Number(balance)
    setTotalPrice(totalPrice)
  }
  useEffect(() => {
    Promise.all([getLocalValue(WALLET), getSessionValue(PASSWORD)]).then(
      ([wallet, password]) => {
        const decryptedWallet = decrypt({
          data: wallet,
          password,
        });
        setAddress(decryptedWallet?.addresses[0]);
        console.log('decryptedWallet', decryptedWallet, decryptedWallet?.addresses );
      })
  }, [])
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
              onClick={() => {
                navigate('ReceiveScreen');
              }}
              full
            />
            <Button
              text="Send"
              preset="default"
              icon="send"
              onClick={() => {
                navigate('TxCreateScreen');
              }}
              full
            />
            <Button
              text="History"
              preset="default"
              icon="history"
              onClick={() => {
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
