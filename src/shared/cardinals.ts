import { blockcypher, cardinals, cardinalsV3, cardinalsV4 } from '../api';
import { amountToBn, satoshisToDOGE } from '../ui/utils';
import { DRC20TransferHistory } from './types';

export async function getBalance(address: string) {
  const formData = new FormData();
  formData.append('address', address);
  const response = await cardinals.url('/getBalance').post(formData);
  const res: any = await response.json();
  return res;
}

export async function getAddressRecentHistory(address: string, offset: number, limit: number) {
  const formData = new FormData();
  formData.append('address', address);
  formData.append('limit', limit.toString());
  formData.append('offset', ((offset - 1) * limit).toString());
  const response = await cardinals.url('/getTxByAddress').post(formData);
  const fetchData = async (): Promise<any> => {
    const res: any = await response.json();
    if (res.state === 1) {
      await new Promise(resolve => setTimeout(resolve, 3000));
      return fetchData();
    } else if (res.state === 2 && res.tx === null) {
      return [];
    } else {
      const data = res.tx;
      const result = data.map((item: any) => {
        const { txid, vins, vouts } = item;
        const inputsResult: any[] = [];
        const outputsResult: any[] = [];
        let amount = 0;
        let fee = 0;
        vins.forEach((input: { address: string; value: string; }) => {
          if(input.address === address) {
            amount += parseFloat(input.value);
          }
          if (!inputsResult.includes(input.address)) {
            inputsResult.push(input.address);
          }
          fee += parseFloat(input.value);
        });
        vouts.forEach((output: { address: string; value: string; }) => {
          if(output.address === address) {
            amount -= parseFloat(output.value);
          }
          fee -= parseFloat(output.value);
          if (!outputsResult.includes(output.address)) {
            outputsResult.push(output.address);
          }
        });
        const sendAddress = inputsResult.join(', ');
        const receiveAddress = outputsResult.join(', ');
        return { amount: (amount >= 0 ? '-' : '+') + Math.abs(amount).toFixed(8), txid, fee: fee.toFixed(8), sendAddress, receiveAddress, ...item };
      });
      return result;
    }
  }
  return fetchData();
}

export async function getDogePrice() {
  const response = await cardinalsV4.url('/info/dogeprice').post();
  const res = await response.json();
  return res;
}

export async function getUtoxsInfo(address: string, amount: number, count: string) {
  const formData = new FormData();
  formData.append('address', address);
  formData.append('amount', satoshisToDOGE(amount).toString());
  formData.append('count', count);
  const response = await cardinals.url('/utxo').post(formData);
  const res = await response.json();
  return res;
}

export async function getFeeSummary() {
  const response = await blockcypher.get('/doge/main').json();
  return response;
}

export async function broadcastDogeTrade(tx_hex: string) {
  const params = { tx_hex: tx_hex };
  try {
    const response = cardinals.url('/broadcast').post(params);
    const res = await response.json();
    return res;
  } catch (error: any) {
    const msg = JSON.parse(error?.message)
    return msg;
  }  
}
export async function getAllSummary(): Promise<any> {
  try {
    const response = await cardinalsV4.url('/swap/price').post();
    const res: any = await response.json();
    return res?.data;
  } catch (error: any) {
    const msg = JSON.parse(error?.message)
    return msg;
  }
}
export async function getPopularTokenList(address: string): Promise<any> {
  const params = { receive_address: address };
  try {
    const response = await cardinalsV3.url('/drc20/popular').post(params);
    const res: any = await response.json();
    const drc20Lists = res.data || []
    const newData = drc20Lists?.map((item: any) => ({ ...item, isdrc20: true }))
    return newData
  } catch (error: any) {
    const msg = JSON.parse(error?.message)
    return msg;
  }
}

export async function getAddressTokenList(address: string, cursor: number, size: number): Promise<any> {
  const response: any = await cardinalsV3.url('/drc20/address').post({ receive_address: address, limit: size, offset: cursor })
  const res: any = await response.json();
  const drc20Lists = res.data || []
  const newData = drc20Lists?.map((item: any) => ({ ...item, isdrc20: true }))
  const list = {
    list: [...newData],
    total: res?.total,
  }
  if (res.code !== 200) {
    throw new Error('server exception');
  }
  return list
}

export async function getDRC20TransferHistory(limit: number,receive_address: string, offset?: number): Promise<DRC20TransferHistory> {
  const params: any = {
    limit: limit,
    receive_address: receive_address
  }
  if(offset === 0 || offset) {
    params.offset = offset
  }
  const response: any = await cardinalsV3.url('/orders/address').post(params)
  const res: any = await response.json();
  const orderInfo = res.data || []
  if (res.code !== 200) {
    throw new Error('server exception');
  }
  return orderInfo
}

export async function getAddressTokenBalances(address: string): Promise<any> {
  try {
    console.log('getAddressTokenBalances');
    let allSummary = [];
    try {
      allSummary = await getAllSummary();
    } catch (error) {
      console.log('Error in getAllSummary:', error);
    }
    const dogePriceInfo: any = await getDogePrice();
    const popularTokenList = await getPopularTokenList(address);
    
    const localData = (await new Promise((resolve) => {
      const storedData = localStorage.getItem('drc20TokenInfo');
      const parsedData = storedData ? JSON.parse(storedData) : {};
      const result = parsedData[address] ? parsedData[address] : [];
      resolve(result);
    })) as Array<any>;
    
    let page = 0;
    const perPage = 1000;
    const myDrc20s = await getAddressTokenList(address, page, perPage);

    if (myDrc20s?.list?.length === perPage) {
      page++;
      const nextPageDrc20s = await getAddressTokenList(address, page * perPage, perPage);
      myDrc20s.list = myDrc20s.list.concat(nextPageDrc20s.list);
    }
    const swapDrc20 = myDrc20s.list.filter((item: any) => item.tick.length >= 10);
    let drc20s = popularTokenList.concat(swapDrc20);
    
    if (localData?.length) {
      localData?.forEach(data => {
        const dataItem = myDrc20s?.list?.find((dataEntry: { tick: any; }) => dataEntry.tick === data.tick);
        if (dataItem) {
          data.amt = dataItem.amt;
        } else {
          data.amt = 0;
        }
      });
    }
    
    console.log(allSummary, 'allSummary=====');
    drc20s.forEach((inputEntry: { tick: any; amt: any; }) => {
      const existingEntryIndex = localData?.findIndex(dataEntry => dataEntry.tick === inputEntry.tick);
      if (existingEntryIndex !== -1) {
        localData[existingEntryIndex].amt = inputEntry.amt;
      } else {
        localData.push(inputEntry);
      }
    });
    
    const outputArray = localData.map(entry => ({ 'amt': entry.amt, 'tick': entry.tick, 'isHide': entry.isHide, 'isdrc20': entry.isdrc20 }));
    drc20s = [...outputArray];
    
    const allListInfo =
      drc20s?.length > 0 && allSummary?.length > 0
        ? drc20s.map((item: { tick: string | any[]; isdrc20: any; }) => {
          const tickItem = allSummary.find((i: { tick: string | any[]; }) => i.tick === item.tick);
          const total_price = item.tick.length > 10 && item.tick === 'WDOGE(WRAPPED-DOGE)'
            ? dogePriceInfo.last
            : (dogePriceInfo.last * (tickItem?.last_price || 0));
          const last_price = amountToBn(tickItem?.last_price);
          return { ...item, ...tickItem, last_price, total_price, isdrc20: item.isdrc20 };
        })
        : drc20s;
    
    const allList = Array.from(new Set(allListInfo.map((item: { tick: any; }) => item.tick))).map(tick => {
      return allListInfo.find((item: { tick: unknown; }) => item.tick === tick);
    });
    
    const list = {
      list: [...allList],
      total: allList?.length,
    };
    
    const info: any = {};
    info[address] = [...allList];
    const drc20TokenInfo = info;
    localStorage.setItem('drc20TokenInfo', JSON.stringify(drc20TokenInfo));
    
    console.log(list, '----list');
    return list;
  } catch (error) {
    console.log(error);
    throw new Error('server exception');
  }
}