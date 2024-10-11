import moment from 'moment';
import { useEffect, useState } from 'react';

import { Layout, Content, Icon, Header, Text, Row, Column, Card, RefreshButton } from '@/components';
import { ClockCircleFilled } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component'
import { blockstreamUrl } from '@/shared/constant';
import { shortAddress } from '../../../ui/utils';
import { getBroadcastInfo, getNewTransferList } from '../../../ui/utils/hooks';
import { getAddressRecentHistory } from '../../../shared/cardinals';
import { useCurrentKeyring } from '../../../ui/state/keyrings/hooks';
interface HistoryItem {
  hash: any;
  receiveAddress: any;
  sendAddress?: string;
  height: any;
  address: string;
  amount: number;
  symbol: string;
  txid: string;
}

interface GroupItem {
  date: string;
  historyItems: HistoryItem[];
  index: number;
}

interface MyItemProps {
  group: GroupItem;
  index: number;
}
const MyItem: React.ForwardRefRenderFunction<any, MyItemProps> = ({ group, index }) => {
  const currentAccount = useCurrentKeyring();
  const { address } = currentAccount;
  console.log('group', group);
  // const navigate = useNavigate();
  if (group.index == -1) {
    return (
      <Column>
        <Text text="Latest Transactions" preset="title-bold" textCenter />
        <Row
          justifyCenter
          onClick={() => {
            window.open(`${blockstreamUrl}/address/${address}`);
          }}
        >
          <Icon icon="eye" color="textDim" />
          <Text preset="regular-bold" text="View on Block Explorer" color="textDim" />
        </Row>
      </Column>
    );
  }

  return (
    <Column key={index} mt="lg">
      <Text text={group.date} color="textDim" />
      {group.historyItems.map((item, index) => {
        console.log(item, 'item===', address)
        const isReceived = item.amount > 0 && item.sendAddress != address;
        return (
          <Card key={`item_${index}`} style={{background: 'rgb(42, 38, 38)', flexDirection: 'column', alignItems: 'flex-start'}}>
            <Row justifyBetween full itemsCenter mb='lg'>
              <Row itemsCenter style={{ gap: 4 }}>
                <svg width="20" height="20" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10.5" cy="10.5" r="10" transform="rotate(90 10.5 10.5)" fill={isReceived ? 'rgb(99, 179, 70)' : 'rgb(237, 51, 75)'}></circle>
                  <path d="M6.5 10.5H14.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"></path>
                  {
                    isReceived &&
                    <path d="M10.5 14.5V6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"></path>
                  }
                </svg>
                <Text text={isReceived ? 'Received' : 'Sent'} />
              </Row>
              <Text
                text={`${Number(Math.abs(item.amount)).toLocaleString('en', { minimumFractionDigits: 8 })} ${
                  item.symbol
                }`}
                preset="regular-bold"
              />
                
            </Row>
            <Row full itemsCenter mb='md' style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.2)', paddingBottom: '12px'}}>
              <Text text="Transaction hash"/>
              <Text style={{cursor: 'pointer'}} text={`${shortAddress(item.txid, 8)}`} preset="sub" onClick={() => {
                window.open(`${blockstreamUrl}/transaction/${item.txid}`);
              }}/>
            </Row>
            <Row full justifyBetween itemsCenter >
              <Row style={{ gap: 4 } } itemsCenter>
                {
                  item?.height
                    ? <Icon icon="success" size={18} style={{ alignSelf: 'center' }} />
                    : <Icon icon="pending" size={18} style={{ alignSelf: 'center' }} color="yellow_dark" />
                }
                <Text text={item?.height ? 'Confirmed' : 'Pending'} color={item?.height ? 'green' : 'yellow_dark'}></Text>
              </Row>
              <Row style={{cursor: 'pointer', gap: 4}} >
                <Icon icon="right-arrow" color={'white'} />
                <Text text="View Detail" size="xxs" 
                  onClick={() => {
                    if(item?.receiveAddress) {
                      // navigate('HistoryDetailScreen', { item });
                    } else {
                      window.open(`${blockstreamUrl}/tx/${item?.hash}`);
                    }
                  }}
                />
              </Row>

            </Row>
          </Card>
        );
      })}
    </Column>
  );
};

export default function HistoryScreen() {
  const [page, setPage] = useState(1)
  const [showNodata, setShowNodata] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [loaderText] = useState('Loading...')
  const currentAccount: any = useCurrentKeyring();
  const { address } = currentAccount;
  const [historyGroups, setHistoryGroups] = useState<GroupItem[]>([])
  // const _historyGroups: GroupItem[] = [];
  type GroupItem = {
    date: string;
    historyItems: HistoryItem[];
    index: number;
  };
  const getHistory = async () => {
    const broadcastInfo = await getBroadcastInfo(address) as any;
    const _accountHistory: HistoryItem[] = await getAddressRecentHistory(address, page, 30) as HistoryItem[];
    if (!_accountHistory?.length && page === 1) {
      setShowNodata(true);
    }
    if (_accountHistory?.length < 10) {
      setHasMore(false);
    }
    const _historyGroups: GroupItem[] = [];
    _accountHistory.forEach((item: any) => {
      const date = moment(item?.time.toString()?.length > 10 ? item.time : item.time * 1000).format('MMMM DD, YYYY');
      const existingGroup = _historyGroups.find((group) => group.date === date);
      item.symbol = 'DOGE';
      item.address = item.hash;
      if (existingGroup) {
        existingGroup.historyItems.push(item);
      } else {
        _historyGroups.push({
          date,
          historyItems: [item],
          index: _historyGroups.length
        });
      }
    });
  
    const concatList: any[] = _historyGroups?.length ? [..._historyGroups] : [];
    const result: GroupItem[] = page === 1 ? [].concat(...concatList) : historyGroups?.concat(...concatList) || [];
  
    const mergedHistoryItems = result?.reduce((acc, entry) => {
      return acc.concat(entry.historyItems);
    }, [] as HistoryItem[]);
  
    const compareList = await getNewTransferList(mergedHistoryItems, broadcastInfo, address);
    if (compareList?.length) {
      setHistoryGroups(compareList.concat(...result));
    } else {
      setHistoryGroups([...result]);
    }
  };
  
  useEffect(() => {
    getHistory()
  }, [page]);

  const fetchMoreData = () => {
    setPage(page+1)
  }
  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="History"
      />
      <Row
        justifyCenter
        onClick={() => {
          window.open(`${blockstreamUrl}/address/${address}`);
        }}
      >
        <Icon icon="eye" color="textDim" />
        <Text preset="regular-bold" text="View on Block Explorer" color="textDim" />
      </Row>
      <Row style={{justifyContent: 'flex-end',margin: '10px 30px 0 0'}}>
        <RefreshButton
          onClick={() => {
            setPage(1)
            setHistoryGroups([])
            getHistory();
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
          {
            <div id="scrollableDiv" style={{
              height: '100vh',
              overflow: 'auto'
            }}>
              <InfiniteScroll
                scrollableTarget="scrollableDiv"
                dataLength={historyGroups?.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<Text color='textDim' text={loaderText} textCenter />}
                style={{width: '100%', paddingTop: !historyGroups?.length ? '10px': '0'}}
                endMessage={
                  <Text color='textDim' text={'no more'} textCenter my='xl'/>
                }
              >
                {historyGroups?.map((data, index) => (
                  <MyItem key={index} group={data} index={index} />
                ))}
              </InfiniteScroll>
            </div>
          }
          <Column>
          </Column>{' '}
        </Content>
      )}
    </Layout>
  )
}
