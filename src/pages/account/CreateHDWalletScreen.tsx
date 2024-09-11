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
import { useLocation, useNavigate } from "react-router-dom"
import { useGlobalState } from '../../Context';
import { generatePhrase } from '../../ui/utils/wallet';
import { createAndStoreWallet, generateAccount } from '../../ui/utils/hooks';
import { useAppDispatch } from '../../ui/state/hooks';
import { useAccounts } from '../../ui/state/accounts/hooks';
// import { accountActions } from '../../ui/state/accounts/reducer';
function Step1_Create({
  updateContextData
}: {
  contextData: ContextData;
  updateContextData: (params: UpdateContextDataParams) => void;
}) {
  const [checked, setChecked] = useState(false);
  const tools = useTools();
  const [mnemonicWords, setMnemonicWords] = useState<string[]>([])
  const [phrase, setPhrase] = useState('')
  const { dispatch } = useGlobalState();
  const onChange = (e: CheckboxChangeEvent) => {
    const val = e.target.checked;
    setChecked(val);
    updateContextData({ step1Completed: val });
  };

  function copy(str: string) {
    copyToClipboard(str).then(() => {
      tools.toastSuccess('Copied');
    });
  }

  const btnClick = async () => {
    const address = await generateAccount(phrase, dispatch);
    updateContextData({
      mnemonics: phrase,
      address,
      tabType: TabType.STEP2
    });
  };

  const getMnemonic = () => {
    const mnemonicWords = generatePhrase();
    setPhrase(mnemonicWords)
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
          copy(phrase);
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
  const { dispatch } = useGlobalState();
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
    setDisabled(false);
  }, [keys]);


  const onNext = async () => {
    const mnemonics = keys.join(' ');
    const address = await generateAccount(mnemonics, dispatch);
    updateContextData({ mnemonics, address, tabType: TabType.STEP2 });
  };
  const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!disabled && 'Enter' == e.key) {
      onNext();
    }
  };

  return (
    <Column gap="lg">
      <Text text="Secret Recovery Phrase" preset="title-bold" textCenter size="md" />
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
  const tools = useTools();
  const { state } = useGlobalState();
  const { password } = state;
  const hdPathOptions = useMemo(() => {
    const restoreWallet = RESTORE_WALLETS[contextData.restoreWalletType];
    return ADDRESS_TYPES.filter((v: { displayIndex: number; value: any; }) => {
      if (v.displayIndex < 0) {
        return false;
      }
      if (!restoreWallet.addressTypes.includes(v.value)) {
        return false;
      }
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

  const [error, setError] = useState('');
  const [loading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [hdPathOptionsList, sethdPathOptionsList] = useState<any[]>()
  const [pathText, setPathText] = useState(contextData.customHdPath);

  useEffect(() => {
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
  const [formatError, setFormatError] = useState('')
  const accounts = useAccounts()
  const onNext = async () => {
    const { mnemonics, isImport = false } = contextData;
    const canCreate = await createAndStoreWallet(mnemonics, password, isImport, accounts, dispatch);
    if (!canCreate) {
      setFormatError('Wallet existed')
      return
    }
    try {
      const password = sessionStorage.getItem('password');
      if (password) {
        localStorage.setItem('password', password);
      }
      navigate('/home');
    } catch (e) {
      tools.toastError((e as any).message);
    }
  };
  const addressTypeInfo = () => {
    if (hdPathOptions?.length > 0 && previewAddresses?.length > 0) {
      const outputArray = previewAddresses.some((item) => {
        return item.address && (item.address.startsWith('A') || item.address.startsWith('9')) && (+item.balance > 0 || item.drcList.length > 0);
      }) ? hdPathOptions : [hdPathOptions[0]];
      sethdPathOptionsList([...outputArray])
    }
  }
  useEffect(() => {
    addressTypeInfo()
  }, [hdPathOptions, previewAddresses])
  return (
    <Column>
      <Text text="Address Type" preset="bold" />
      {hdPathOptionsList?.map((item, index) => {
        const hdPath = (contextData.customHdPath || item.hdPath) + '/0';
        return (
          <AddressTypeCard
            key={index}
            label={`${item.label} (${hdPath})`}
            address={contextData.address}
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
      <Text text={formatError} preset="regular" color="error" />

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
  isImport?: boolean;
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
  const { state } = useLocation();
  const { isImport = false, isNewAccount, isAddAccount } = state as { isImport?: boolean, isNewAccount?: boolean, isAddAccount?: boolean } || {};
  const [showImportInfo, setShowImportInfo] = useState(false);
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
    isImport: isImport,
    addressTypeIndex: 0
  });

  const updateContextData = useCallback(
    (params: UpdateContextDataParams) => {
      setContextData(Object.assign({}, contextData, params));
    },
    [contextData, setContextData]
  );
  useEffect(() => {
    if ((!isImport && isNewAccount) || isAddAccount) {
      setShowImportInfo(true);
    }
  }, [isImport, isNewAccount]);
  const items = useMemo(() => {
    if (isImport) {
      return [
        {
          key: TabType.STEP1,
          label: 'Step 1',
          children: <Step1_Import contextData={contextData} updateContextData={updateContextData} />
        },
        {
          key: TabType.STEP2,
          label: 'Step 2',
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
  const navigate = useNavigate();

  return (
    <Layout>
      <Header
        title={contextData.isRestore ? 'Restore from mnemonics' : 'Create a new HD Wallet'}
      />
      <Content>
        {
          showImportInfo ? (
            <Column justifyCenter >
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
              {currentChildren}
            </Column>
          ) :
            <Column>
              <Card
                justifyCenter
                onClick={() => {
                  setShowImportInfo(true)
                }}
              >
                <Column full justifyCenter>
                  <Text text="Restore from mnemonics (12-words)" size="sm" />
                </Column>
              </Card>

              <Card
                justifyCenter
                onClick={() => {
                  navigate('/account/create-simple-wallet')
                }}
              >
                <Column full justifyCenter>
                  <Text text="Restore from single private key" size="sm" />
                </Column>
              </Card>
            </Column>
        }
      </Content>
    </Layout>
  );
}