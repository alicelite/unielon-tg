import { useEffect, useState } from 'react';

import { Button, Content, Header, Layout, Row } from '@/components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAccountAddress } from '@/ui/state/accounts/hooks';
import TokenList from '../../components/DRC20TokenList';

export default function AddDRC20Token() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [drcTokens, setDrcTokens] = useState(state?.tokens)
  const address = useAccountAddress();
  const [canClick, setCanClick] = useState(true)
  const [allTokenList, setAllTokenList] = useState([])
  const handleLocalStorage = (result: any) => {
    const storedData = localStorage.getItem('drc20TokenInfo');
    const info = storedData ? JSON.parse(storedData) : {};
    info[address] = [...result];
    const drc20TokenInfo = JSON.stringify(info);
    localStorage.setItem('drc20TokenInfo', drc20TokenInfo);
  };
  const [selectedTicks, setSelectedTicks] = useState<any[]>([]);
  const handleAddDrc20Token = async (item: { selected: boolean; tick: any; amt: any; isdrc20: any; }) => {
    item.selected = !item.selected
    const tickIndex = selectedTicks.indexOf(item.tick);
    let data = {
      amt: item.amt,
      isdrc20: item.isdrc20,
      isHide: false,
      tick: item.tick,
    }
    if(item.isdrc20) {
      data = {
        ...data
      }
    } else {
      data.tick = item.tick
    }
    if (tickIndex === -1) {
      setSelectedTicks([...selectedTicks, item.tick]);
      drcTokens.push(data)
      setDrcTokens(drcTokens)
    } else {
      setSelectedTicks(selectedTicks.filter(tick => tick !== item.tick));
      drcTokens.push(data)
      const filteredArray = drcTokens.filter((info: any) => info.tick !== item.tick)
      setDrcTokens(filteredArray)
    }
  }
  const handleTokenListChange = (newTokenList: any) => {
    setAllTokenList(newTokenList)
  }
  const handleSelectAll = (e: { target: { checked: any; }; }) => {
    if(e.target.checked) {
      const result = [...allTokenList]
      result.map(async (item: any) => {
        const newItem: any = { ...item, selected: true }
        await handleAddDrc20Token(newItem);
        return newItem;
      })
      const tickArray: any = result?.map((item: any) => item.tick)
      setSelectedTicks(tickArray)
    } else {
      setSelectedTicks([])
    }
  }
  useEffect(() => {
    setCanClick(!(selectedTicks?.length))
  }, [selectedTicks])
  return (
    <Layout>
      <Header
        title="Add Token"
      />
      <Content>
        <Row>
          <TokenList drcTokens={drcTokens} addDrc20Token={(item: { selected: boolean; tick: any; amt: any; isdrc20: any; }) => {handleAddDrc20Token(item)}} selectedTicks={selectedTicks} onTokenListChange={handleTokenListChange} handleSelectAll={handleSelectAll} />
        </Row>
        <Row>
          <Button
            text="Add Token"
            preset="primary"
            disabled={canClick}
            icon="add"
            onClick={() => {
              handleLocalStorage(drcTokens)
              navigate('/home')
            }}
            iconStyle={{width: '24px', height: '24px', marginRight: 0}}
            full
          />
        </Row>
      </Content>
    </Layout>
  );
}

