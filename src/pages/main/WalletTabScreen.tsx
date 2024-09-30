import { useEffect, useRef, useState } from 'react';
import { Column, Content, Header, Layout, Row, Text, AddressBar, Button, Card, NavTabBar, Footer, TabBar, Icon, Empty, Input } from '@/components';
import { useNavigate } from 'react-router-dom';
import { getBalance, getDogePrice } from '@/shared/cardinals';
import { setLocalValue } from '@/ui/utils';
import { accountActions } from '@/ui/state/accounts/reducer';
import { useAppDispatch } from '@/ui/state/hooks';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { WalletTabScreenTabKey } from '@/ui/state/ui/reducer';
import { useWalletTabScreenState } from '@/ui/state/ui/hooks';
import { uiActions } from '@/ui/state/ui/reducer';
import { useTools } from '../../components/ActionComponent';
import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';
import { TokenBalance } from '../../shared/types';
import DRC20BalanceCard from '../../components/DRC20BalanceCard';
import { getAddressTokenBalances } from '../../shared/cardinals';

export default function WalletTabScreen() {
  const [totalPrice, setTotalPrice] = useState(0)
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const [balance, setBalance] = useState()
  const [address, setAddress] = useState()
  const currentAccount = useCurrentAccount()
  const getDecryptWallet = async () => {
    const { address } = currentAccount;
    setAddress(address)
  }
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
  const { tabKey } = useWalletTabScreenState();
  useEffect(() => {
    const password = localStorage.getItem('password')
    if(password) {
      setLocalValue({['AUTHENTICATED']: true})
    }
    getDecryptWallet()
  }, [])
  const tabItems = [
    {
      key: WalletTabScreenTabKey.DRC20,
      label: 'DRC-20',
      children: <DRC20List />
    }
  ]
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
              navigate('/account/switch-keyring');
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

          <Row justifyBetween style={{ marginTop: '16px' }}>
            <TabBar
              defaultActiveKey={tabKey}
              activeKey={tabKey}
              items={tabItems}
              key={tabKey}
              onTabClick={(key: any) => {
                dispatch(uiActions.updateWalletTabScreen({ tabKey: key }));
              }}
            />
            <Row style={{gap: 0}} justifyCenter>
              <Icon icon="transfer" color="white" size={16} />
              <Text text='DRC-20 Transfer History' size="sm" style={{textDecoration: 'underline'}} onClick={() => {
                navigate('/drc20/transfer-history');
              }}/>
            </Row>
          </Row>
          {tabItems[tabKey].children}
        </Column>
      </Content>
      <Footer px="zero" py="zero">
        <NavTabBar tab="home" />
      </Footer>
    </Layout>
  );
}

function DRC20List() {
  const navigate = useNavigate();
  const currentAccount = useCurrentAccount();
  const [tokens, setTokens] = useState<TokenBalance[]>([]);
  const [currentToken, setCurrentToken] = useState<TokenBalance[]>([]);
  const [ticker, setTicker] = useState('');
  const [total, setTotal] = useState(-1);
  const [pagination] = useState({ currentPage: 1, pageSize: 100 });
  const tools = useTools();
  const initialPage = useRef(pagination.currentPage);

  const fetchData = async () => {
    try {
      const { list, total } = await getAddressTokenBalances(
        currentAccount.address
      );
      console.log(list, 'list====,,,,,');
      setTokens(list);
      setCurrentToken(list);
      setTotal(total);
    } catch (e) {
      tools.toastError((e as Error).message);
    } finally {
      // tools.showLoading(false);
    }
  };

  const tickerChange = (e: any) => {
    const val = e.target.value;
    setTicker(val);
    const filterAction = {
      0: (item: any) => item,
      1: (item: { tick: string }) => item.tick.toUpperCase().indexOf(val?.toUpperCase()) !== -1,
    };
    const filterType = val ? 1 : 0;
    const filterList = currentToken?.filter(filterAction[filterType]);
    setTokens(filterList);
  };

  useEffect(() => {
    console.log('useEffect', pagination.currentPage, initialPage.current);
    fetchData();
  }, [pagination]);

  if (total === -1) {
    return (
      <Column style={{ minHeight: 150 }} itemsCenter justifyCenter>
        <Text text="Loading..." size="sm" color="gold" />
        <LoadingOutlined style={{color: 'gold', fontSize: 20}} />
      </Column>
    );
  }

  if (currentToken.length === 0) {
    return (
      <Column style={{ minHeight: 150 }} itemsCenter justifyCenter>
        <Empty text="Empty" />
      </Column>
    );
  }

  return (
    <Column>
      <Row itemsCenter style={{ position: 'relative', gap: 0, width: '100%' }}>
        <div style={{ position: 'absolute', left: '6px', top: '8px',fontSize: '22px'}}>
          <Icon icon="search" color="textDim" />
        </div>
        <Input
          preset="text"
          value={ticker}
          placeholder="Filter Token"
          onChange={tickerChange}
          style={{ textIndent: '16px'}}
        />
      </Row>
      <Row onClick={() => { navigate('/drc20/add-token', { state: { tokens } }) }} itemsCenter my="sm">
        <Icon icon="add" color="gold" size={20} />
        <Text text="Add Token" size="sm" color="gold" />
      </Row>
      {tokens.length > 0 && (
        <Row style={{ flexWrap: 'wrap' }} gap="sm">
          {tokens?.map((data, index) => (
            <React.Fragment key={index}>
              {!data.isHide && +data.amt > 0 && (
                <DRC20BalanceCard
                  key={index}
                  tokenBalance={data}
                  onClick={() => {
                    navigate('/drc20/token', { state : {tokenBalance: data.amt, ticker: data.tick }});
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </Row>
      )}
    </Column>
  );
}