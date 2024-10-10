import { useState } from 'react';
import { Button, Column, Content, Header, Icon, Layout, Row, Text, HideTokenPopover } from '@/components';

import { DeleteOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { drcToDec } from '../../ui/utils';
import { useCurrentKeyring } from '../../ui/state/keyrings/hooks';

export default function DRC20TokenScreen() {
  const { state } = useLocation();
  const { ticker, tokenBalance } = state;
  const account: any = useCurrentKeyring();

  const [showSetting, setShowSetting] = useState(false)
  const [removeVisible, setRemoveVisible] = useState(false)

  const navigate = useNavigate();
  const handleHideToken = () => {
    const storedData = localStorage.getItem('drc20TokenInfo');
    const info = storedData ? JSON.parse(storedData) : {};
    const result = info[account.address] || [];
    const filterResult = result.filter((item: any) => item.tick !== ticker);
    info[account.address] = [...filterResult];
    const drc20TokenInfo = JSON.stringify(info);
    localStorage.setItem('drc20TokenInfo', drc20TokenInfo);
    setRemoveVisible(false);
    navigate('/home');
  }
  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        RightComponent={
          <Icon
            size={20}
            style={{ transform: 'rotate(90deg)',fontSize: '22px',fontWeight: 'bold' }}
            onClick={async () => {
              setShowSetting(!showSetting)
            }}
          >
            <EllipsisOutlined />
          </Icon>
        }
      />
      {showSetting && (
        <div
          style={{
            position: 'fixed',
            zIndex: 10,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }}
          onTouchStart={() => {
            setShowSetting(false);
          }}
          onMouseDown={() => {
            setShowSetting(false);
          }}
        ></div>
      )}
      {
        showSetting && (
          <Column
            style={{
              backgroundColor: 'rgb(183, 160, 71)',
              position: 'absolute',
              padding: 5,
              zIndex: 10,
              width: '120px',
              right: '16px',
              top: '46px',
              borderRadius: '4px'
            }}
          >
            <Column>
              <Row
                itemsCenter
                justifyCenter
                onClick={() => {
                  setShowSetting(false)
                  setRemoveVisible(true)
                }}
              >
                <Icon color="black">
                  <DeleteOutlined />
                </Icon>
                <Text text={`Hide ${ticker}`} size="sm" color='black'/>
              </Row>
            </Column>
          </Column>
        )
      }
      
      <Content>
        <Column py="xl" style={{ borderBottomWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <Text text={`${drcToDec(tokenBalance)} ${ticker}`} preset="bold" textCenter size="xxl" />
          <Row justifyBetween mt="lg">
            <Button
              text="TRANSFER"
              preset="default"
              icon="send"
              onClick={() => {
                navigate('/drc20/send', {
                  state: {
                    tokenBalance: tokenBalance,
                    ticker: ticker,
                    account: account.address
                  }
                });
              }}
              full
            />
          </Row>
        </Column>


        <Column mt="lg">
          <Row justifyBetween>
            <Text text="Available" preset="bold" size="lg" />
            <Text text={`${drcToDec(tokenBalance)} ${ticker}`} preset="bold" size="lg" />
          </Row>
        </Column>
      </Content>
      {removeVisible && (
        <HideTokenPopover
          tick={ticker}
          handleHideToken={handleHideToken}
          onClose={() => {
            setRemoveVisible(false);
          }}
        />
      )}
    </Layout>
  );
}

