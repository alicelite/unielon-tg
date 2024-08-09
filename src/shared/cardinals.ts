import { cardinals } from '../api';
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