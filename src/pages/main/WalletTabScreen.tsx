import { useEffect, useState } from 'react';
import { Column, Content, Header, Layout, Row, Text, AddressBar, Button, Card } from '@/components';
import { useNavigate } from 'react-router-dom';
import { getBalance, getDogePrice } from '@/shared/cardinals';
import { setLocalValue } from '@/ui/utils';
import { decryptWallet } from '@/ui/utils/hooks';
import { accountActions } from '@/ui/state/accounts/reducer';
import { useAppDispatch } from '@/ui/state/hooks';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
export default function WalletTabScreen() {
  const [totalPrice, setTotalPrice] = useState(0)
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const [balance, setBalance] = useState()
  const [address, setAddress] = useState()
  const currentAccount = useCurrentAccount()
  const balanceValue = async () => {
    const res =  await getBalance(address);
    const balance = res?.balance?.toFixed(4) ?? 0;
    getDogePriceInfo(balance)
    setBalance(balance)
    if(!address) return
    dispatch(accountActions.setBalance({
        address: address,
        amount: balance
    }));
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
  const getDecryptWallet = async () => {
    const wallet: any = await decryptWallet()
    setAddress(wallet.address)
  }
  useEffect(() => {
    const password = localStorage.getItem('password')
    if(password) {
      setLocalValue({['AUTHENTICATED']: true})
    }
    getDecryptWallet()
  }, [])
  return (
    <Layout>
      <Header RightComponent={
          <Card
            style={{
              paddingLeft: '8px',
              paddingRight: '8px'
            }}
            preset="style2"
            onClick={() => {
              // navigate('/account/switch-keyring');
            }}
          >
            <Text text={currentAccount.alianName} size="xxs" />
          </Card>
        }/>
      <Content>
        <Column style={{ gap: '16px' }}>
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
                navigate('/receive');
              }}
              full
            />
            <Button
              text="Send"
              preset="default"
              icon="send"
              onClick={() => {
                navigate('/tx-create');
              }}
              full
            />
            <Button
              text="History"
              preset="default"
              icon="history"
              onClick={() => {
                navigate('/history');
              }}
              full
            />
          </Row>
        </Column>
      </Content>
    </Layout>
  );
}

