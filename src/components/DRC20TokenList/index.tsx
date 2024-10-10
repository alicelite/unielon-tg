/* eslint-disable quotes */
import { Column, Icon, Input, Row, Text } from '@/components';
import { Checkbox } from 'antd';
import { useEffect, useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import { drcToDec } from '@/ui/utils';
import { getAddressTokenList } from '../../shared/cardinals';
import { useCurrentKeyring } from '../../ui/state/keyrings/hooks';

export default function TokenList(props: any) {
  const { addDrc20Token, selectedTicks, drcTokens, onTokenListChange, handleSelectAll } = props
  const style = {
    height: 50,
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    margin: 6,
    padding: 8
  }
  const [page, setPage] = useState(1)
  const [tokenList, setTokenList] = useState<any[]>([])
  const [currentToken, setCurrentToken] = useState<any[]>([]);
  const [ticker, setTicker] = useState('')
  const currentAccount: any = useCurrentKeyring();
  const { address } = currentAccount;
  const [hasMore, setHasMore] = useState(true)
  const [loaderText, setLoaderText] = useState('Loading...')
  const getTokenInfo = async () => {
    const { list } = await getAddressTokenList(address, page, 1000)
    const concatList = [...list]
    const result = tokenList.concat(...concatList)
    if(list?.length < 50) {
      setHasMore(false)
    }
    const storedData = localStorage.getItem('drc20TokenInfo');
    const res = storedData ? JSON.parse(storedData) : {};
    const localData = res?.drc20TokenInfo && res?.drc20TokenInfo[address] ? res?.drc20TokenInfo[address] : drcTokens;
    const hiddenTicks = localData
      .filter((item: { isHide: any; }) => !item.isHide)
      .map((item: { tick: any; }) => item.tick);
    const filteredData = result.filter(item => !hiddenTicks.includes(item.tick));
    if (!filteredData?.length) {
      setLoaderText('Empty');
    }
    setTokenList(filteredData);
    onTokenListChange(filteredData);
    setCurrentToken(filteredData);
  }
  const fetchMoreData = () => {
    setPage(page+1)
  }
  const tickerChange = (e: { target: { value: any; }; }) => {
    const val = e.target.value
    setTicker(val)
    const filterAction = {
      0: (item: any) => item,
      1: (item: { tick: string; }) => item.tick.toUpperCase().indexOf(val?.toUpperCase()) !== -1
    }
    const filterType = val ? 1 : 0
    const filterList = currentToken?.filter(filterAction[filterType])
    if(!filterList.length) {
      setLoaderText('Empty')
    }
    setTokenList(filterList)
  }
  useEffect(() => {
    getTokenInfo()
  }, [page])
  return (
    <>
      <Column full>
        <Row itemsCenter style={{ position: 'relative', gap: 0}} full>
          <div style={{ position: 'absolute', left: '6px', top: '8px',fontSize: '22px'}}>
            <Icon icon="search" color="textDim" />
          </div>
          <Input
            preset="text"
            value={ticker}
            placeholder='Filter Token'
            onChange={tickerChange}
            containerStyle={{ width: '100%' }}
            style={{textIndent: '16px', width: '100%'}}
          />
        </Row>
        {
          tokenList?.length > 0 &&
          <Row>
            <Checkbox onChange={handleSelectAll}>
              <Text color='white' text={'Check all'} textCenter size='md'/>
            </Checkbox>
          </Row>
        }
        <div className ="token-list-wrapper" id="scrollableDiv" style={{
          height: 400,
          overflow: 'auto',
          display: 'flex',
          background: 'rgb(42, 38, 38)',
          width: '100%',
        }}>
          <div style={{width: '100%'}}>
          <InfiniteScroll
            scrollableTarget="scrollableDiv"
            dataLength={tokenList.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<Text color='textDim' text={loaderText} textCenter />}
            style={{width: '100%', paddingTop: !tokenList.length ? '10px': '0'}}
            endMessage={
              <Text color='textDim' text={'no more'} textCenter my='xl'/>
            }
          >
            {tokenList.map((item, index) => (
              <Row style={style} key={index} itemsCenter justifyBetween onClick={() => {addDrc20Token(item)}}>
                <Text text={item.tick}/>
                <Row itemsCenter>
                  <Text text={drcToDec(item.amt)}/>
                  {
                    selectedTicks.includes(item.tick) && <Icon icon='check' size={14} color='gold'/>
                  }
                </Row>
              </Row>
            ))}
          </InfiniteScroll>
          </div>
        </div>
      </Column>
    </>
  );
}