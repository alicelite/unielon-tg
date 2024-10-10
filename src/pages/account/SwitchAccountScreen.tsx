import { forwardRef, useMemo, useState } from 'react';
import VirtualList from 'rc-virtual-list';
import { Card, Column, Content, Header, Icon, Layout, Row, Text } from '@/components';
import {
  CheckCircleFilled,
  CopyOutlined,
  EditOutlined,
  EllipsisOutlined,
  KeyOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';
import { copyToClipboard, shortAddress } from '@/ui/utils';
import { useNavigate } from 'react-router-dom';
import { colors } from '@/ui/theme/colors';
import { useAppDispatch } from '@/ui/state/hooks';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { Account } from '../../shared/types';
import { useTools } from '@/components/ActionComponent';
import { keyringsActions } from '../../ui/state/keyrings/reducer';
import { useCurrentKeyring } from '../../ui/state/keyrings/hooks';

export interface ItemData {
  key: string;
  account?: Account;
}

interface MyItemProps {
  account?: Account;
  autoNav?: boolean;
}

const MyItem = forwardRef<HTMLDivElement, MyItemProps>(({ account, autoNav }) => {
  const navigate = useNavigate();
  const currentAccount = useCurrentKeyring();
  const selected = currentAccount.address == account?.address;
  const dispatch = useAppDispatch();
  if (!account) {
    return <div />;
  }
  const [optionsVisible, setOptionsVisible] = useState(false);
  const path = account.hdPath + '/' + account.index;

  const tools = useTools();
  return (
    <Card justifyBetween mt="md">
      <Row>
        <Column style={{ width: 20 }} selfItemsCenter>
          {selected && (
            <Icon>
              <CheckCircleFilled />
            </Icon>
          )}
        </Column>
        <Column
          onClick={async () => {
            const keyring: any = Object.assign({}, account);
            dispatch(keyringsActions.setCurrent(keyring));
            if (autoNav) navigate('/home');
          }}
        >
          <Text text={account.alianName} />
          <Text text={`${shortAddress(account.address)} (${path})`} preset="sub" style={{fontFamily: 'normal'}} />
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
          <EllipsisOutlined />
        </Icon>

        {optionsVisible && (
          <Column
            style={{
              backgroundColor: colors.black,
              width: 140,
              position: 'absolute',
              right: 0,
              padding: 5,
              zIndex: 10
            }}
          >
            <Row
              onClick={() => {
                navigate('/settings/edit-account-name', { state: { account, selected } });
              }}
            >
              <EditOutlined />
              <Text text="Edit Name" size="sm" />
            </Row>
            <Row
              onClick={() => {
                copyToClipboard(account.address);
                tools.toastSuccess('copied');
                setOptionsVisible(false);
              }}
            >
              <CopyOutlined />
              <Text text="Copy address" size="sm" />
            </Row>
            <Row
              onClick={() => {
                navigate('ExportPrivateKeyScreen', {state: {account} });
              }}
            >
              <KeyOutlined />
              <Text text="Export WIF" size="sm" />
            </Row>
          </Column>
        )}
      </Column>
    </Card>
  );
});

export default function SwitchAccountScreen() {
  const navigate = useNavigate();
  const keyring = useCurrentAccount();
  const items = useMemo(() => {
    const _items: ItemData[] = keyring.accounts.map((v: any) => {
      return {
        key: v.address,
        account: v
      };
    });
    return _items;
  }, [keyring.accounts]);
  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Switch Account"
        RightComponent={
          <Icon
            onClick={() => {
              navigate('/account/create', { state: { keyring } });
            }}
          >
            <PlusCircleOutlined />
          </Icon>
        }
      />
      <Content>
        <VirtualList data={items} data-id="list" itemHeight={20} itemKey={(item) => item.key}>
          {(item) => <MyItem ref={null} account={item.account} autoNav={true} />}
        </VirtualList>
      </Content>
    </Layout>
  );
}