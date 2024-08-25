import { blockcypher, cardinals, cardinalsV3 } from '../api';
import { satoshisToDOGE } from '../ui/utils';
export async function getBalance(address: string) {
  const formData = new FormData();
  formData.append('address', address);
  const response = await cardinals.url('/getBalance').post(formData);
  const res = await response.json();
  return res;
}

export async function getDogePrice() {
  const response = await fetch('/api/api2/1/ticker/doge_usdt');
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