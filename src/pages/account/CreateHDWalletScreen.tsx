import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { KeyboardEvent, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { ADDRESS_TYPES, RESTORE_WALLETS } from '@/shared/constant';
import { AddressType, RestoreWalletType } from '../../shared/types';
import { Button, Card, Column, Content, Grid, Header, Input, Layout, Row, Text, Icon, TabBar } from '@/components';
import { useTools } from '@/components/ActionComponent';
import { AddressTypeCard } from '@/components/AddressTypeCard';
import { FooterButtonContainer } from '@/components/FooterButtonContainer';
import { fontSizes } from '@/ui/theme/font';
import { copyToClipboard } from '@/ui/utils';
import { CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom"
import { useGlobalState } from '../../Context';
import { generateAddress, generateChild, generateRoot, encrypt } from '@/ui/utils/wallet';
import { setLocalValue } from '@/ui/utils';
import { WALLET } from '@/shared/constant';
import { generatePhrase } from '../../ui/utils/wallet';

function Step0({
  updateContextData
}: {
  contextData: ContextData;
  updateContextData: (params: UpdateContextDataParams) => void;
}) {
  return (
    <Column gap="lg">
      <Text text="Choose a wallet you want to restore from" preset="title-bold" textCenter mt="xl" />
      {RESTORE_WALLETS.map(({ name, value }: { name: string; value: string }, index: any) => (
        <Button
          key={index}
          preset="default"
          onClick={() => updateContextData({ tabType: TabType.STEP2, restoreWalletType: value as unknown as RestoreWalletType })}
        >
          <Text text={name} />
        </Button>
      ))}
    </Column>
  );
}

function Step1_Create({
  updateContextData
}: {
  contextData: ContextData;
  updateContextData: (params: UpdateContextDataParams) => void;
}) {
  const [checked, setChecked] = useState(false);
  const tools = useTools();
  const [mnemonicWords, setMnemonicWords] = useState<string[]>([])
  const [normalMnemonic, setNormalMnemonic] = useState('')
  const { state, dispatch } = useGlobalState();
  const { password } = state;

  const onChange = (e: CheckboxChangeEvent) => {
    const val = e.target.checked;
    setChecked(val);
    updateContextData({ step1Completed: val });
  };

  function copy(str: string) {
    console.log(str, 'str==', typeof str)
    copyToClipboard(str).then(() => {
      console.log(tools, 'tools==')
      tools.toastSuccess('Copied');
    });
  }

  const btnClick = async () => {
    const root = generateRoot(normalMnemonic)
    const child = generateChild(root, 0)
    const address = generateAddress(child)
    dispatch({ type: 'SET_ADDRESS', payload: address });
    const wallet = {
      normalMnemonic,
      addresses: [address],
      nicknames: { [address]: 'Address 1' },
    };

    const encryptedWallet = encrypt({
      data: wallet,
      password: password,
    });

    await setLocalValue({ [WALLET]: encryptedWallet})
    updateContextData({
      address,
      tabType: TabType.STEP2
    });
  };

  const getMnemonic = () => {
    const mnemonicWords = 'divert toddler million border opera tuition october pulse weird mirror orchard absorb'//generatePhrase();
    console.log(mnemonicWords, 'mnemonicWords======')
    setNormalMnemonic(mnemonicWords)
    const result = mnemonicWords.split(' ')
    setMnemonicWords(result)
  }
  useEffect(() => {
    getMnemonic()
  }, [])

  return (
    <Column gap="xl">
      <Text text="Secret Recovery Phrase" preset="title-bold" textCenter />
      <Text
        text="This phrase is the ONLY way to recover your wallet. Do NOT share it with anyone!"
        color="warning"
        textCenter
      />

      <Row
        justifyCenter
        onClick={() => {
          copy(normalMnemonic);
        }}
      >
        <Icon icon="copy" color="textDim" />
        <Text text="Copy to clipboard" color="textDim" />
      </Row>

      <Row justifyCenter>
        <Grid columns={2}>
          {mnemonicWords?.map((v, index) => {
            return (
              <Row key={index}>
                <Text text={`${index + 1}. `} style={{ width: 40 }} />
                <Card preset="style2" style={{ width: 200 }}>
                  <Text text={v} selectText />
                </Card>
              </Row>
            );
          })}
        </Grid>
      </Row>

      <Row justifyCenter>
        <Checkbox onChange={onChange} checked={checked} style={{ fontSize: fontSizes.sm }} className="custom-checkbox">
          <Text text="I saved My Secret Recovery Phrase" />
        </Checkbox>
      </Row>

      <FooterButtonContainer>
        <Button disabled={!checked} text="Continue" preset="primary" onClick={btnClick} />
      </FooterButtonContainer>
    </Column>
  );
}

function Step1_Import({
  updateContextData
}: {
  contextData: ContextData;
  updateContextData: (params: UpdateContextDataParams) => void;
}) {
  const [keys, setKeys] = useState<Array<string>>(new Array(12).fill(''));
  const [curInputIndex] = useState(0);
  const [disabled, setDisabled] = useState(true);

  const handleEventPaste = (event: { clipboardData: { getData: (arg0: string) => any; }; preventDefault: () => void; }, index: number) => {
    const copyText = event.clipboardData?.getData('text/plain');
    const textArr = copyText.trim().split(' ');
    const newKeys = [...keys];
    if (textArr) {
      for (let i = 0; i < keys.length - index; i++) {
        if (textArr.length == i) {
          break;
        }
        newKeys[index + i] = textArr[i];
      }
      setKeys(newKeys);
    }

    event.preventDefault();
  };

  const onChange = (e: any, index: any) => {
    const newKeys = [...keys];
    newKeys.splice(index, 1, e.target.value);
    setKeys(newKeys);
  };

  useEffect(() => {
    setDisabled(true);

    const hasEmpty =
      keys.filter((key) => {
        return key == '';
      }).length > 0;
    if (hasEmpty) {
      return;
    }

    // const mnemonic = keys.join(' ');
    // if (!Mnemonic.isValid(mnemonic)) {
    //   return;
    // }

    setDisabled(false);
  }, [keys]);


  const onNext = () => {
    const mnemonics = keys.join(' ');
    updateContextData({ mnemonics, tabType: TabType.STEP3 });
  };
  const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!disabled && 'Enter' == e.key) {
      onNext();
    }
  };

  return (
    <Column gap="lg">
      <Text text="Secret Recovery Phrase" preset="title-bold" textCenter />
      <Text text="Import an existing wallet with your 12 word secret recovery phrase" preset="sub" textCenter />
      <Row justifyCenter>
        <Grid columns={2}>
          {keys.map((_, index) => {
            return (
              <Row key={index}>
                <Card gap="zero">
                  <Text text={`${index + 1}. `} style={{ width: 25 }} textEnd color="textDim" />
                  <Input
                    containerStyle={{ width: 80, minHeight: 25, height: 25, padding: 0 }}
                    style={{ width: 80 }}
                    value={_}
                    onPaste={(e: { clipboardData: { getData: (arg0: string) => any; }; preventDefault: () => void; }) => {
                      handleEventPaste(e, index);
                    }}
                    onChange={(e: any) => {
                      onChange(e, index);
                    }}
                    // onMouseOverCapture={(e) => {
                    //   setHover(index);
                    // }}
                    // onMouseLeave={(e) => {
                    //   setHover(999);
                    // }}
                    onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => handleOnKeyUp(e)}
                    autoFocus={index == curInputIndex}
                  />
                </Card>
              </Row>
            );
          })}
        </Grid>
      </Row>

      <FooterButtonContainer>
        <Button
          disabled={disabled}
          text="Continue"
          preset="primary"
          onClick={() => {
            onNext();
          }}
        />
      </FooterButtonContainer>
    </Column>
  );
}

function Step2({
  contextData,
  updateContextData
}: {
  contextData: ContextData;
  updateContextData: (params: UpdateContextDataParams) => void;
}) {
  // const wallet = useWallet();
  const tools = useTools();
  const hdPathOptions = useMemo(() => {
    console.log(contextData, 'contextData======<<<<')
    const restoreWallet = RESTORE_WALLETS[contextData.restoreWalletType];
    return ADDRESS_TYPES.filter((v: { displayIndex: number; value: any; }) => {
      if (v.displayIndex < 0) {
        return false;
      }
      if (!restoreWallet.addressTypes.includes(v.value)) {
        return false;
      }

      // if (!contextData.isRestore) {
      //   return false;
      // }

      // if (contextData.customHdPath) {
      //   return false;
      // }

      return true;
    })
      .sort((a: { displayIndex: number; }, b: { displayIndex: number; }) => a.displayIndex - b.displayIndex)
      .map((v: { name: any; hdPath: any; value: any; isUnielonLegacy: any; }) => {
        return {
          label: v.name,
          hdPath: v.hdPath,
          addressType: v.value,
          isUnielonLegacy: v.isUnielonLegacy
        };
      });
  }, [contextData]);

  const [previewAddresses] = useState<any[]>(hdPathOptions.map(() => ''));

  const [addressAssets] = useState<{
    [key: string]: { total_doge: string; satoshis: number; total_inscription: number };
  }>({});

  const [error, setError] = useState('');
  const [loading] = useState(false);

  const navigate = useNavigate();
  const [hdPathOptionsList, sethdPathOptionsList] = useState<any[]>()
  const [pathText, setPathText] = useState(contextData.customHdPath);

  useEffect(() => {
    console.log(hdPathOptions, contextData, 'contextData=====1111')
    const option = hdPathOptions[contextData.addressTypeIndex];
    updateContextData({ addressType: option.addressType });
  }, [contextData.addressTypeIndex]);

  const submitCustomHdPath = () => {
    if (contextData.customHdPath === pathText) return;
    updateContextData({
      customHdPath: pathText
    });
  };

  const resetCustomHdPath = () => {
    updateContextData({
      customHdPath: ''
    });
    setError('');
    setPathText('');
  };

  const onNext = async () => {
    try {
      // const option = hdPathOptions[contextData.addressTypeIndex];
      // const hdPath = contextData.customHdPath || option.hdPath;

      // const addressTypeInfo = ADDRESS_TYPES[contextData.addressType];
      // console.log(`hdPath: ${finalHdPath}, passphrase:${contextData.passphrase}, addressType:${addressTypeInfo.name}`);

      // await createAccount(contextData.mnemonics, hdPath, contextData.passphrase, contextData.addressType);
      navigate('/home');
    } catch (e) {
      tools.toastError((e as any).message);
    }
  };
  const addressTypeInfo = () => {
    if(hdPathOptions?.length > 0 && previewAddresses?.length > 0) {
      const outputArray = previewAddresses.some((item) => {
        return item.address && (item.address.startsWith('A') || item.address.startsWith('9')) && (+item.balance > 0 || item.drcList.length > 0);
      }) ? hdPathOptions : [hdPathOptions[0]];
      sethdPathOptionsList([...outputArray])
    }
  }
  useEffect(() => {
    addressTypeInfo()
  }, [hdPathOptions, previewAddresses])
  console.log(hdPathOptionsList, 'hdPathOptionsList===')
  return (
    <Column>
      <Text text="Address Type" preset="bold" />
      {hdPathOptionsList?.map((item, index) => {
        const assets = addressAssets[contextData.address] || {
          total_doge: '--',
          satoshis: 0,
          total_inscription: 0
        };
        const hasVault = contextData.isRestore && assets.satoshis > 0;
        if ((+previewAddresses[index]?.balance === 0 || previewAddresses[index]?.drcList?.length > 0) && !hasVault) {
          return null;
        }
        const hdPath = (contextData.customHdPath || item.hdPath) + '/0';
        return (
          <AddressTypeCard
            key={index}
            label={`${item.label} (${hdPath})`}
            address={contextData.address}
            assets={assets}
            checked={index == contextData.addressTypeIndex}
            onClick={() => {
              updateContextData({
                addressTypeIndex: index,
                addressType: item.addressType
              });
            }}
          />
        );
      })}

      <Text text="Custom HdPath (Optional)" preset="bold" mt="lg" />

      <Column>
        <Input
          placeholder={'Custom HD Wallet Derivation Path'}
          value={pathText}
          onChange={async (e: { target: { value: SetStateAction<string>; }; }) => {
            setError('');
            setPathText(e.target.value);
          }}
          onBlur={() => {
            submitCustomHdPath();
          }}
        />
        {contextData.customHdPath && (
          <Icon
            onClick={() => {
              resetCustomHdPath();
            }}
          >
            <CloseOutlined />
          </Icon>
        )}
      </Column>
      {error && <Text text={error} color="error" />}

      <Text text="Phrase (Optional)" preset="bold" mt="lg" />

      <Input
        placeholder={'Passphrase'}
        defaultValue={contextData.passphrase}
        onChange={async (e: { target: { value: any; }; }) => {
          updateContextData({
            passphrase: e.target.value
          });
        }}
      />

      <FooterButtonContainer>
        <Button text="Continue" preset="primary" onClick={onNext} />
      </FooterButtonContainer>

      {loading && (
        <Icon>
          <LoadingOutlined />
        </Icon>
      )}
    </Column>
  );
}

enum TabType {
  STEP1 = 'STEP1',
  STEP2 = 'STEP2',
  STEP3 = 'STEP3'
}

interface ContextData {
  address: any;
  mnemonics: string;
  hdPath: string;
  passphrase: string;
  addressType: AddressType;
  step1Completed: boolean;
  tabType: TabType;
  restoreWalletType: RestoreWalletType;
  isRestore?: boolean;
  isCustom: boolean;
  customHdPath: string;
  addressTypeIndex: number;
}

interface UpdateContextDataParams {
  mnemonics?: string;
  hdPath?: string;
  passphrase?: string;
  addressType?: AddressType;
  step1Completed?: boolean;
  tabType?: TabType;
  restoreWalletType?: RestoreWalletType;
  isCustom?: boolean;
  customHdPath?: string;
  addressTypeIndex?: number;
  address?: string;
}

export default function CreateHDWalletScreen() {

  const [contextData, setContextData] = useState<ContextData>({
    mnemonics: '',
    hdPath: '',
    passphrase: '',
    addressType: AddressType.P2PKH,
    step1Completed: false,
    tabType: TabType.STEP1,
    restoreWalletType: RestoreWalletType.UNIELON,
    isCustom: false,
    customHdPath: '',
    address: '',
    addressTypeIndex: 0
  });

  const updateContextData = useCallback(
    (params: UpdateContextDataParams) => {
      setContextData(Object.assign({}, contextData, params));
    },
    [contextData, setContextData]
  );

  const items = useMemo(() => {
    if (contextData.isRestore) {
      return [
        {
          key: TabType.STEP1,
          label: 'Step 1',
          children: <Step0 contextData={contextData} updateContextData={updateContextData} />
        },
        {
          key: TabType.STEP2,
          label: 'Step 2',
          children: <Step1_Import contextData={contextData} updateContextData={updateContextData} />
        },
        {
          key: TabType.STEP3,
          label: 'Step 3',
          children: <Step2 contextData={contextData} updateContextData={updateContextData} />
        }
      ];
    } else {
      return [
        {
          key: TabType.STEP1,
          label: 'Step 1',
          children: <Step1_Create contextData={contextData} updateContextData={updateContextData} />
        },
        {
          key: TabType.STEP2,
          label: 'Step 2',
          children: <Step2 contextData={contextData} updateContextData={updateContextData} />
        }
      ];
    }
  }, [contextData, updateContextData]);

  const currentChildren = useMemo(() => {
    const item = items.find((v) => v.key === contextData.tabType);
    return item?.children;
  }, [items, contextData.tabType]);

  return (
    <Layout>
      <Header
        onBack={() => {
          // if (fromUnlock) {
          //   navigate('WelcomeScreen');
          // } else {
          //   window.history.go(-1);
          // }
          window.history.go(-1);
        }}
        title={contextData.isRestore ? 'Restore from mnemonics' : 'Create a new HD Wallet'}
      />
      <Content>
        <Row justifyCenter>
          <TabBar
            progressEnabled
            defaultActiveKey={contextData.tabType}
            activeKey={contextData.tabType}
            items={items.map((v) => ({
              key: v.key,
              label: v.label
            }))}
            onTabClick={(key: TabType) => {
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

        {currentChildren}
      </Content>
    </Layout>
  );
}