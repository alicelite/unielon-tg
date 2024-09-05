import { blockcypher, cardinals, cardinalsV3, cardinalsV4 } from '../api';
import { satoshisToDOGE } from '../ui/utils';

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
    const response = cardinalsV3.url('/tx/broadcast').post(params);
    const res = await response.json();
    return res;
  } catch (error: any) {
    const msg = JSON.parse(error?.message)
    return msg;
  }  
}