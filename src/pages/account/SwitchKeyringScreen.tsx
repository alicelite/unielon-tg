import VirtualList from 'rc-virtual-list';
import { useMemo, useState, forwardRef } from 'react';

import { Card, Column, Content, Header, Icon, Layout, Row, Text, RemoveWalletPopover } from '@/components';
import {
  PlusCircleOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { shortAddress } from '@/ui/utils';
import { useAppDispatch } from '@/ui/state/hooks';
import { accountActions } from '@/ui/state/accounts/reducer';
import { colors } from '@/ui/theme/colors';
import { useAccounts, useCurrentAccount } from '@/ui/state/accounts/hooks';
import { keyringsActions } from '../../ui/state/keyrings/reducer';
export function MyItem(props: any, ref: any) {
  const { keyring } = props.items;
  const { address, alianName } = keyring;
  const displayAddress = useMemo(() => {
    return shortAddress(address);
  }, []);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [removeVisible, setRemoveVisible] = useState(false)
  return (
    <Card justifyBetween mt="md">
      <Row
        full
        ref={ref}
        onClick={async () => {
          if (address !== props.account) {
            if (keyring.accounts) {
              const list = keyring.accounts.find((v: any) => v.address === address);
              dispatch(keyringsActions.setCurrent(list));
            } else {
              dispatch(keyringsActions.setCurrent(keyring));
            }
            dispatch(accountActions.setCurrent(keyring));
          }
          navigate('/home')
        }}
      >
        <Column style={{ width: 20 }} selfItemsCenter>
          {address === props.account && (
            <Icon icon="checked">
            </Icon>
          )}
        </Column>

        <Column justifyCenter>
          <Text text={alianName} />
          <Text text={displayAddress} preset="sub" />
        </Column>
      </Row>

      <Column relative>
        {optionsVisible && (
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
              setOptionsVisible(false);
            }}
            onMouseDown={() => {
              setOptionsVisible(false);
            }}
          ></div>
        )}

        <Icon
          onClick={async () => {
            setOptionsVisible(!optionsVisible);
          }}
        >
          <SettingOutlined style={{ fontSize: 18 }} />
        </Icon>

        {optionsVisible && (
          <Column
            style={{
              backgroundColor: colors.black,
              width: 210,
              position: 'absolute',
              right: 0,
              borderRadius: 5,
              padding: 5,
              zIndex: 10
            }}
          >
            <Column>
              <Row
                onClick={() => {
                  navigate('/settings/edit-wallet-name', { state: {keyring} });
                }}
              >
                <Icon color="white" icon="edit" />
                <Text text="Edit Name" size="sm" />
              </Row>

              {keyring.type === 'HD Key Tree' ? (
                <Column>
                  <Row
                    onClick={() => {
                      navigate('/settings/export-mnemonics', { state:{ keyring }});
                    }}
                  >
                    <Icon icon="key" color="white" />
                    <Text text="Show Secret Recovery Phrase" size="sm" />
                  </Row>
                  {
                    keyring.newAccount && (
                      <Row
                        onClick={() => {
                          navigate('/settings/export-private-key', { state: { keyring } });
                        }}
                      >
                        <Icon icon="key" color="white" />
                        <Text text="Export WIF" size="sm" />
                      </Row>
                    )
                  }

                </Column>

              ) : (
                <Row
                  onClick={() => {
                    navigate('/settings/export-private-key', { state: { keyring } });
                  }}
                >
                  <Icon icon="key" color="white" />
                  <Text text="Export WIF" size="sm" />
                </Row>
              )}
              {
                props.accounts.length > 1 && 
                <Row
                  onClick={() => {
                    setRemoveVisible(true);
                    setOptionsVisible(false);
                  }}
                >
                  <Icon color="danger" icon="delete" />
                  <Text text="Remove Wallet" size="sm" color="danger" />
                </Row>
              }
             
            </Column>
          </Column>
        )}
      </Column>

      {removeVisible && (
        <RemoveWalletPopover
          keyring={keyring}
          onClose={() => {
            setRemoveVisible(false);
          }}
        />
      )}
    </Card>
  );
}

export default function SwitchKeyringScreen() {
  const navigate = useNavigate();
  const accounts = useAccounts()
  const currentAccount = useCurrentAccount();
  const { address } = currentAccount;
  const items = useMemo(() => {
    const _items = accounts.map((v: any, index: number) => {
      return {
        key: index,
        keyring: v
      };
    });
    return _items;
  }, [accounts]);
  const ForwardMyItem = forwardRef(MyItem);
  return (
    <Layout>
      <Header
        title="Switch Wallet"
        RightComponent={
          <Icon
            onClick={() => {
              navigate('/account/add-keyring');
            }}
          >
            <PlusCircleOutlined style={{ fontSize: 18 }} />
          </Icon>
        }
      />
      <Content>
        <VirtualList
          data={items}
          data-id="list"
          itemHeight={30}
          itemKey={(item) => item.key}
          style={{
            boxSizing: 'border-box'
          }}
        >
          {(item) => <ForwardMyItem items={item} account={address} accounts={accounts}/>}
        </VirtualList>
      </Content>
    </Layout>
  );
}
