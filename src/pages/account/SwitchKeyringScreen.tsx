import VirtualList from 'rc-virtual-list';
import { useMemo, useState, forwardRef } from 'react';

import { Card, Column, Content, Header, Icon, Layout, Row, Text } from '@/components';
import {
  EditOutlined,
  PlusCircleOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { colors } from '../../ui/theme/colors';
import { useAccounts } from '../../ui/state/accounts/hooks';
import { shortAddress } from '../../ui/utils';

export function MyItem(props: any) {
  const [index] = useState(0);
  const { keyring, key } = props.items;
  const { address, alianName } = keyring;
  const selected = index === key
  const displayAddress = useMemo(() => {
    return shortAddress(address);
  }, []);

  const [optionsVisible, setOptionsVisible] = useState(false);
  return (
    <Card justifyBetween mt="md">
      <Row
        full
        onClick={async () => {
        }}
      >
        <Column style={{ width: 20 }} selfItemsCenter>
          {selected && (
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
          <SettingOutlined />
        </Icon>

        {optionsVisible && (
          <Column
            style={{
              backgroundColor: colors.black,
              width: 180,
              position: 'absolute',
              right: 0,
              padding: 5,
              zIndex: 10
            }}
          >
            <Column>
              <Row
                onClick={() => {
                  // navigate('EditWalletNameScreen', { keyring });
                }}
              >
                <EditOutlined />
                <Text text="Edit Name" size="sm" />
              </Row>

              {/* {keyring.type === KEYRING_TYPE.HdKeyring ? (
                <Row
                  onClick={() => {
                    // navigate('ExportMnemonicsScreen', { keyring });
                  }}
                >
                  <KeyOutlined />
                  <Text text="Show Secret Recovery Phrase" size="sm" />
                </Row>
              ) : (
                <Row
                  onClick={() => {
                    // navigate('ExportPrivateKeyScreen', { account: keyring.accounts[0] });
                  }}
                >
                  <KeyOutlined />
                  <Text text="Export WIF" size="sm" />
                </Row>
              )} */}
              {/* <Row
                onClick={() => {
                  if (keyrings.length == 1) {
                    tools.toastError('Removing the last wallet is not allowed');
                    return;
                  }
                  setRemoveVisible(true);
                  setOptionsVisible(false);
                }}
              >
                <Icon color="danger">
                  <DeleteOutlined />
                </Icon>

                <Text text="Remove Wallet" size="sm" color="danger" />
              </Row> */}
            </Column>
          </Column>
        )}
      </Column>

      {/* {removeVisible && (
        <RemoveWalletPopover
          keyring={keyring}
          onClose={() => {
            setRemoveVisible(false);
          }}
        />
      )} */}
    </Card>
  );
}

export default function SwitchKeyringScreen() {
  const navigate = useNavigate();
  const accounts = useAccounts()
  console.log(accounts, 'accounts=====')

  const items = useMemo(() => {
    const _items = accounts.map((v, index) => {
      return {
        key: index,
        keyring: v
      };
    });
    return _items;
  }, []);
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
            <PlusCircleOutlined />
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
          {(item) => <ForwardMyItem items={item}/>}
        </VirtualList>
      </Content>
    </Layout>
  );
}
