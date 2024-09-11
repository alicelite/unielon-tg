import { useCallback, useEffect, useState } from 'react';

import { Button, Column, Content, Header, Input, Layout, Row, Text, TabBar, AddressTypeCard, FooterButtonContainer } from '@/components';
import { AddressType } from '../../shared/types';
import { generateAddressFromPrivateKey } from '../../ui/utils/wallet';
import { privateKeyStoreWallet } from '../../ui/utils/hooks';
import { useAppDispatch } from '../../ui/state/hooks';
import { useNavigate } from 'react-router-dom';
import { useAccounts } from '../../ui/state/accounts/hooks';
import { useTools } from '../../components/ActionComponent';

function Step1({
  updateContextData
}: {
  contextData: ContextData;
  updateContextData: (params: UpdateContextDataParams) => void;
}) {
  const [wif, setWif] = useState('');
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    setDisabled(true);

    if (!wif) {
      return;
    }

    setDisabled(false);
  }, [wif]);

  const onChange = (e: any) => {
    const val = e.target.value;
    setWif(val);
    updateContextData({ step1Completed: val });
  };

  const btnClick = async () => {
    updateContextData({
      wif,
      tabType: TabType.STEP2
    });
  };

  return (
    <Column gap="lg">
      <Text text="Private Key (WIF)" textCenter preset="bold" />

      <Input
        placeholder={'Private Key (WIF)'}
        onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if ('Enter' == e.key) {
            btnClick();
          }
        }}
        onChange={onChange}
        autoFocus={true}
      />
      <FooterButtonContainer>
        <Button disabled={disabled} text="Continue" preset="primary" onClick={btnClick} />
      </FooterButtonContainer>
    </Column>
  );
}

function Step2({
  contextData,
}: {
  contextData: ContextData;
  updateContextData: (params: UpdateContextDataParams) => void;
}) {
  const tools = useTools();
  const [address, setAddress] = useState('');
  const accounts = useAccounts()
  const run = async () => {
    const address = generateAddressFromPrivateKey(contextData.wif)
    setAddress(address)
  };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formatError, setFormatError] = useState('')
  useEffect(() => {
    run();
  }, [contextData.wif]);
  const onNext = async () => {
    try {
      const password = localStorage.getItem('password') || sessionStorage.getItem('password');
      const isExist = accounts.findIndex((v: any) => v.address === address) > -1;
      if(isExist) {
        setFormatError('Wallet existed')
        return
      }
      privateKeyStoreWallet(address, password, contextData.wif, accounts, dispatch)
      if(!password) return
      localStorage.setItem('password', password);
      navigate('/home');
    } catch (e) {
      tools.toastError((e as any).message);
    }
  };
  return (
    <Column gap="lg">
      <Text text="Address Type" preset="bold" />
      <AddressTypeCard
            label={`Legacy (P2PKH)`}
            address={address}
            checked={true}
          />
      <Text text={formatError} preset="regular" color="error" />
      <FooterButtonContainer>
        <Button text="Coninue" preset="primary" onClick={onNext} />
      </FooterButtonContainer>
    </Column>
  );
}
enum TabType {
  STEP1 = 'STEP1',
  STEP2 = 'STEP2'
}

interface ContextData {
  wif: string;
  addressType: AddressType;
  step1Completed: any;
  tabType: TabType;
}

interface UpdateContextDataParams {
  wif?: string;
  addressType?: AddressType;
  step1Completed?: any;
  tabType?: TabType;
}

export default function CreateSimpleWalletScreen() {
  const [contextData, setContextData] = useState<ContextData>({
    wif: '',
    addressType: AddressType.P2PKH,
    step1Completed: false,
    tabType: TabType.STEP1
  });

  const updateContextData = useCallback(
    (params: UpdateContextDataParams) => {
      setContextData(Object.assign({}, contextData, params));
    },
    [contextData, setContextData]
  );

  const items = [
    {
      key: TabType.STEP1,
      label: 'Step 1',
      children: <Step1 contextData={contextData} updateContextData={updateContextData} />
    },
    {
      key: TabType.STEP2,
      label: 'Step 2',
      children: <Step2 contextData={contextData} updateContextData={updateContextData} />
    }
  ];

  const renderChildren = items.find((v) => v.key == contextData.tabType)?.children;

  return (
    <Layout>
      <Header
        title="Create Single Wallet"
      />
      <Content>
        <Row justifyCenter>
          <TabBar
            progressEnabled
            defaultActiveKey={TabType.STEP1}
            items={items}
            activeKey={contextData.tabType}
            onTabClick={(key: any) => {
              const toTabType = key as TabType;
              if (toTabType === TabType.STEP2) {
                if (!contextData.step1Completed) {
                  setTimeout(() => {
                    updateContextData({ tabType: contextData.tabType });
                  }, 200);
                  return;
                }
              }
              updateContextData({ tabType: toTabType });
            }}
          />
        </Row>
        {renderChildren}
      </Content>
    </Layout>
  );
}
