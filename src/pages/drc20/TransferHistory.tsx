import moment from 'moment';
import { useEffect, useState, useCallback } from 'react';
import { Layout, Content, Icon, Header, Text, Row, Column, Card, Button, RefreshButton } from '@/components';
import { ClockCircleFilled } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useNavigate } from 'react-router-dom';
import { amountToDec, formatAccountAddress, shortAddress } from '@/ui/utils';
import { blockstreamUrl } from '../../shared/constant';
import { getDRC20TransferHistory } from '../../shared/cardinals';

interface HistoryItem {
  address: string;
  amount: number;
  symbol: string;
}

interface GroupItem {
  order_id: string;
  create_date: string;
  to_address: string;
  amt: string | number;
  tick: any;
  receive_address: any;
  block_hash: any;
  fee_tx_hash: any;
  transfer_status: any;
  date: string;
  historyItems: HistoryItem[];
  index: number;
  op: string;
  drc20_tx_hash: string;
}

interface MyItemProps {
  group: GroupItem;
  index: number;
  account: string;
}

const MyItem: React.FC<MyItemProps> = ({ group, index, account }) => {
  const navigate = useNavigate();
  console.log('group', group);
  return (
    <>
      {group?.op === 'transfer' && (
        <Column key={index} style={{ padding: 0 }}>
          <Text text={group.date} color="textDim" />
          <Card key={`item_${index}`} style={{ background: 'rgb(42, 38, 38)', position: 'relative' }}>
            <Row justifyBetween full>
              <Column selfItemsCenter>
                <Column justifyCenter>
                  <Row style={{ cursor: 'pointer' }}>
                    <Icon icon="right-arrow" color={'white'} size={12} />
                    <Text
                      text="View Detail"
                      size="xxs"
                      onClick={() => {
                        navigate('TransferDetailScreen', { state: { group } });
                      }}
                    />
                  </Row>
                  {group?.drc20_tx_hash && (
                    <Text
                      style={{ cursor: 'pointer' }}
                      text={`Hash: ${shortAddress(group?.drc20_tx_hash)}`}
                      color="textDim"
                      onClick={() => {
                        window.open(`${blockstreamUrl}/transaction/${group?.drc20_tx_hash}`);
                      }}
                    />
                  )}
                </Column>
                <Text text={`OrderId: ${shortAddress(group?.order_id, 8)}`} color="textDim" />
                <Text text={`${moment.unix(Number(group.create_date)).format('YYYY-MM-DD HH:mm:ss')}`} color="textDim" />
                {account === group?.to_address ? (
                  <Row style={{ flexWrap: 'wrap' }} itemsCenter>
                    <Text text="Received" color="textDim" />
                    <Text text={`${amountToDec(group?.amt)} ${group?.tick}`} preset="bold" color="gold" />
                    <Text text="from" color="textDim" />
                    {group?.to_address.split(',').map((address: any, index: any) => (
                      <Text key={index} text={formatAccountAddress(address)} color="textDim" />
                    ))}
                  </Row>
                ) : (
                  <Row style={{ flexWrap: 'wrap', gap: 4 }} itemsCenter>
                    <Text text="Transfer" color="textDim" />
                    <Text text={`${amountToDec(Number(group?.amt) * (group?.to_address?.split(',')?.length ?? 0))} ${group?.tick}`} preset="bold" color="gold" />
                    <Text text="To" color="textDim" />
                    {group?.to_address.split(',')?.slice(0, 3)?.map((address, index) => (
                      <Text key={index} text={formatAccountAddress(address)} color="textDim" />
                    ))}
                    {group?.to_address.split(',').length > 3 && <Text text="..." color="textDim" />}
                  </Row>
                )}
              </Column>
              <Row selfItemsCenter style={{ position: 'absolute', right: '10px' }}>
                {!group?.block_hash && !group?.fee_tx_hash && (
                  <Button
                    text={group?.transfer_status}
                    preset={group?.transfer_status === 'Pending' ? 'primary' : 'failed'}
                    style={{ height: '30px', minHeight: '32px' }}
                    textStyle={{ fontSize: '12px' }}
                  />
                )}
                {group?.block_hash && (group?.fee_tx_hash || group?.drc20_tx_hash) && (
                  <Button
                    text={group?.transfer_status}
                    preset="success"
                    style={{ height: '30px', minHeight: '32px', paddingLeft: '8px', paddingRight: '8px' }}
                    textStyle={{ fontSize: '12px' }}
                  />
                )}
                {!group?.block_hash && (group?.fee_tx_hash || group?.drc20_tx_hash) && (
                  <Button
                    text={group?.transfer_status}
                    preset={group?.transfer_status === 'Failed' ? 'failed' : 'primary'}
                    style={{ height: '30px', minHeight: '32px' }}
                    textStyle={{ fontSize: '12px' }}
                  />
                )}
              </Row>
            </Row>
          </Card>
        </Column>
      )}
    </>
  );
};

export default function TransferHistory() {
  const currentAccount = useCurrentAccount();
  const [page, setPage] = useState(1);
  const [historyGroups, setHistoryGroups] = useState([]);
  const [showNodata, setShowNodata] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [loaderText] = useState('Loading...');

  const getStatus = useCallback((history: any) => {
    return history.map((item: any) => {
      const { drc20_tx_hash, block_hash, order_status } = item;
      item.transfer_status = 'Pending';
      if (drc20_tx_hash) {
        item.transfer_status = 'In-Progress';
        if (block_hash) {
          item.transfer_status = 'Completed';
        }
        if (order_status === 1) {
          item.transfer_status = 'Failed';
        }
      } else {
        const currentTime = new Date().getTime();
        const oneHourAgo = new Date(item?.create_date * 1000);
        oneHourAgo.setHours(oneHourAgo.getHours() + 1);
        const oneHourAgoTime = oneHourAgo.getTime();
        item.transfer_status = currentTime > oneHourAgoTime ? 'NotPaid' : 'Pending';
      }
      return item;
    });
  }, []);

  const loadingHistory = async () => {
    console.log('loadingHistory');
    const history = await getDRC20TransferHistory(50, currentAccount.address, page);
    if (!history?.length) {
      setShowNodata(true);
    }
    if (history?.length < 20) {
      setHasMore(false);
    }
    const historyArray = Array.isArray(history) ? history : Object.values(history);
    const concatList = historyArray.length ? [...historyArray] : [];
    const result = historyGroups.concat(...concatList);
    setHistoryGroups(result);
    getStatus(historyArray);
  };

  const fetchMoreData = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  useEffect(() => {
    if(page) {
      loadingHistory();
    }
  }, [page]);

  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Transfer History"
      />
      <Row style={{ justifyContent: 'flex-end', marginRight: '30px' }}>
        <RefreshButton
          onClick={() => {
            loadingHistory();
          }}
        />
      </Row>
      {showNodata ? (
        <Content preset="middle">
          <Column gap="lg">
            <Row justifyCenter>
              <Icon color="textDim">
                <ClockCircleFilled />
              </Icon>
            </Row>
            <Text text="This account has no transactions" color="textDim" textCenter />
          </Column>
        </Content>
      ) : (
        <Content>
          <div
            id="scrollableDiv"
            style={{
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <InfiniteScroll
              scrollableTarget="scrollableDiv"
              dataLength={historyGroups?.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<Text color="textDim" text={loaderText} textCenter />}
              style={{ width: '100%', paddingTop: !historyGroups?.length ? '10px' : '0' }}
              endMessage={<Text color="textDim" text="no more" textCenter my="xl" />}
            >
              {historyGroups?.map((data, index) => (
                <MyItem key={index} group={data} index={index} account={currentAccount.address} />
              ))}
            </InfiniteScroll>
          </div>
          <Column></Column>
        </Content>
      )}
    </Layout>
  );
}