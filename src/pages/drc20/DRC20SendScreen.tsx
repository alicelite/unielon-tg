import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button, Column, Content, Header, Input, Layout, Row, Text, TextArea, FeeRateBar } from '@/components';
import { useTools } from '@/components/ActionComponent';
import { Select } from 'antd';
import { amountToBn, amountToDec, amountToSaothis, isValidAddress } from '../../ui/utils';
import { useCurrentAccount } from '../../ui/state/accounts/hooks';

import * as bitcoin from 'bitcoinjs-lib';
import { getPrivateKey, network } from '../../ui/utils/wallet';
import { RawTxInfo } from '../../shared/types';

function Step1({
  contextData,
  updateContextData
}: {
  contextData: ContextData;
  updateContextData: (params: UpdateContextDataParams) => void;
}) {
  const [disabled, setDisabled] = useState(true);
  const [amountError, setAmountError] = useState('');
  const [sendAmout, setSendAmout] = useState<string>('')
  const [transferType, setTransferType] = useState('normal')
  const [receiverAddresses, setReceiverAddresses] = useState<any>('')
  const [formatError, setFormatError] = useState('')
  const currentAccount = useCurrentAccount();
 
  useEffect(() => {
    console.log(receiverAddresses, 'sendAmout=====', sendAmout)
    const resultArray = typeof receiverAddresses === 'string' ? receiverAddresses?.split(',') : [...receiverAddresses]
    console.log(resultArray, 'resultArray====', contextData.tokenBalance)
    if(amountToSaothis(+resultArray?.length * (+sendAmout)) >  +contextData.tokenBalance) {
      setExceedsError('The amount of tokens exceeds the balance')
    } else {
      setExceedsError('')
    }
  }, [receiverAddresses, sendAmout])
  const tools = useTools();
  const navigate = useNavigate();
  const onClickNext = async () => {
    try {
      tools.showLoading(true);
      const { phrase, newAccount, wif } = currentAccount
      const yourPrivateKeyWIF = phrase && newAccount ? getPrivateKey(phrase) : wif
      const _account = contextData.account
      if(!_account || !contextData?.feeRate || !contextData?.receiver) return
      console.log(sendAmout, 'sendAmout=====kkk', amountToBn(sendAmout))
      const receiverList = contextData?.receiver?.split(',');
      const rawTxInfo = {
        transferType: transferType,
        spendAmount: +sendAmout,
        amountToSend: amountToBn(sendAmout),
        toAddressInfo: {
          address: contextData?.receiver,
          domain: '',
          inscription: ''
        },
        privateKey: yourPrivateKeyWIF,
        receiveAddressLength: receiverList?.length,
        ticker: contextData?.ticker,
        feeRate: contextData?.feeRate,
        _account: contextData?.account,
        receiver: contextData?.receiver,
      }
      console.log(rawTxInfo, 'rawTxInfo=======<<<<,')
      navigate('/tx-confirm', { state: { rawTxInfo } })
    } catch (error) {
      const dataError = (error as any).message;
      tools.toastError(dataError);
    } finally {
      tools.showLoading(false);
    }
  };
  const handleChange = (value: string) => {
    setTransferType(value)
    console.log(`selected ${value}`);
  }
  const receiverAddresPlaceholder = 'Please enter addresses separated by commas'
  const [exceedsError, setExceedsError] = useState('')

  const handleDeleteInvalidAddresses = () => {
    const addressArray = typeof receiverAddresses === 'string' ? receiverAddresses.split(',') : [...receiverAddresses];
    const validAddresses = [];

    for (const address of addressArray) {
      const trimmedAddress = address.trim();
  
      try {
        const outputScript = bitcoin.address.toOutputScript(trimmedAddress, network)
        if (outputScript) {
          validAddresses.push(trimmedAddress);
        }
      } catch (err) {
        console.log(err)
      }
    }
  
    setReceiverAddresses(validAddresses.join(','));
    updateContextData({ receiver: validAddresses.join(',') })
    setFormatError('')
  }
  
  const handleTextAreaChange = (newValue: string) => {
    const newValueWithCommas = newValue.replace(/，/g, ',');
    const addressArray = newValueWithCommas.split(',');
    let isValid = true;
    const validAddresses = [];

    try {
      for (const address of addressArray) {
        const trimmedAddress = address.trim();
        validAddresses.push(trimmedAddress)
        try {
          const outputScript = bitcoin.address.toOutputScript(trimmedAddress, network);
          const validAddressString = validAddresses.join(',');
          setReceiverAddresses(validAddressString);
          updateContextData({ receiver: validAddressString })
          if (!outputScript) {
            isValid = false;
          }
        } catch (err) {
          setReceiverAddresses(addressArray);
          console.error(err);
          isValid = false;
        }
      }
    } catch (err) {
      console.error(err);
      isValid = false;
    }

    if (!isValid && newValue) {
      setFormatError('Please enter the correct format, the addresses are separated by commas');
    } else {
      setFormatError('');
    }
  };
  useEffect(() => {
    if(contextData?.receiver && isValidAddress(contextData?.receiver) && sendAmout) {
      setDisabled(false)
    }
    if (contextData?.receiver && !isValidAddress(contextData?.receiver)) {
      setDisabled(true)
    }
    if(exceedsError) {
      setDisabled(true)
    }
  }, [contextData, sendAmout, exceedsError])
  return (
    <Content mt="lg">
      <Column full>
        <Column>
          <Row justifyBetween>
            <Text text="Transfer type" color="textDim" />
          </Row>
          <Select
            className='transfer-type-select'
            defaultValue="Normal transfer"
            style={{ 
              width: '100%', 
              fontSize: '14px',
              padding: '7.5px 0',
              borderRadius: '4px',
              background: 'rgb(42, 38, 38)',
              marginBottom: '10px',
              height: '50px'
            }}
            onChange={handleChange}
            options={[
              { value: 'normal', label: 'Normal transfer' },
              { value: 'batch', label: 'Batch transfer' },
            ]}
          />
        </Column>
        <Column>
          <Row justifyBetween>
            <Text text="Available" color="textDim" />
            <Text text={`${(amountToDec(contextData.tokenBalance))} ${contextData.ticker}`} color="textDim" />
          </Row>
          <Input
            preset="amount"
            placeholder={`${transferType === 'batch' ? 'Average amount sent per address' : 'Amount'}`}
            value={sendAmout}
            autoFocus={true}
            style={{ minHeight: '28px' }}
            onChange={(e: any) => {
              const amount = e.target.value
              if(+amount > +amountToDec(contextData.tokenBalance)) {
                setAmountError('amount cannot be greater than the vailable')
              } else {
                setAmountError('')
              }
              
              setSendAmout(amount);
            }}
          />
          <Text text={amountError} preset="regular" color="error" />
        </Column>
        
        <Column>
          <Row justifyBetween>
            <Text text="Receiver" color="textDim" />
            {
              formatError &&
              <Row onClick={handleDeleteInvalidAddresses}>
                <Text text="Delete illegal addresses" color="red" size='xs'/>
              </Row>
            }
          </Row>
          
          {
            transferType === 'batch' 
              ? <Column>
                <TextArea  
                  text={receiverAddresses}
                  placeholder={receiverAddresPlaceholder}
                  onChange={handleTextAreaChange}
                  onBlur={() => {
                    setReceiverAddresses(receiverAddresses);
                  }}
                  height="172px"/>
                <Text text={formatError} preset="regular" color="error" size='xs'/>
              </Column>
              : <Input
                preset="address"
                addressInputData={{
                  address: '',
                  domain: ''
                }}
                onAddressInputChange={(val: any) => {
                  updateContextData({ receiver: val.address });
                }}
              />
          }
        </Column>
        <Column>
          <Text text="Fee Rate" color="textDim" />
          <FeeRateBar
            isPage={true}
            onChange={(val: any) => {
              updateContextData({ feeRate: val });
            }}
          />
        </Column>
      </Column>
      {
        exceedsError && <Text text={exceedsError} preset="regular" color="error" />
      }
      <Button text="Next" preset="primary" onClick={onClickNext} disabled={disabled} />
    </Content>
  );
}

enum TabKey {
  STEP1
}

interface ContextData {
  feeRate?: string;
  receiver?: string;
  tabKey: TabKey;
  tokenBalance: number | string;
  ticker: string;
  privateKey: string;
  account: string
}

interface UpdateContextDataParams {
  tabKey?: TabKey;
  transferAmount?: number;
  inscriptionIdSet?: Set<string>;
  feeRate?: number | string;
  receiver?: string;
  rawTxInfo?: RawTxInfo;
}

export default function DRC20SendScreen() {
  const { state } = useLocation();
  const props = state as {
    tokenBalance: string | number;
    ticker: string,
    lim: number,
    account: string,
    privateKey: string
  };

  const tokenBalance = props.tokenBalance;
  const currentTicker = props.ticker

  const [contextData, setContextData] = useState<ContextData>({
    tabKey: TabKey.STEP1,
    tokenBalance,
    ticker: currentTicker,
    account: props.account,
    privateKey: props.privateKey
  });

  const updateContextData = useCallback(
    (params: UpdateContextDataParams) => {
      setContextData(Object.assign({}, contextData, params));
    },
    [contextData, setContextData]
  );

  const component = useMemo(() => {
    if (contextData.tabKey === TabKey.STEP1) {
      return <Step1 contextData={contextData} updateContextData={updateContextData} />;
    }
  }, [contextData]);

  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
      />
      <Row mt="lg" />
      {component}
    </Layout>
  );
}

