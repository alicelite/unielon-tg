import BigNumber from 'bignumber.js';
export const copyToClipboard = (textToCopy: string | number) => {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(textToCopy.toString());
  } else {
    const textArea = document.createElement('textarea');
    textArea.value = textToCopy.toString();
    textArea.style.position = 'absolute';
    textArea.style.opacity = '0';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise<void>((res, rej) => {
      document.execCommand('copy') ? res() : rej();
      textArea.remove();
    });
  }
};

export function shortAddress(address?: string, len = 5) {
  if (!address) return '';
  if (address.length <= len * 2) return address;
  return address.slice(0, len) + '...' + address.slice(address.length - len);
}

export const setLocalValue = (keyValues: any) => {
  Object.keys(keyValues).forEach((key) => {
    localStorage.setItem(key, JSON.stringify(keyValues[key]));
  });
  return Promise.resolve();
};

export const getLocalValue = (key: string) => {
  const value = JSON.parse(localStorage.getItem(key) as string);
  return Promise.resolve(value)
};

export const setSessionValue = (keyValues: any) => {
  Object.keys(keyValues).forEach((key) => {
    sessionStorage.setItem(key, JSON.stringify(keyValues[key]));
  });
  return Promise.resolve();
};

export const getSessionValue = (key: any) => {
  const value = JSON.parse(sessionStorage.getItem(key) as string);
  return Promise.resolve(value);
};

export function satoshisToAmount(val: any) {
  const num = new BigNumber(val);
  return num.dividedBy(100000000).toFixed(8);
}

export function amountToSaothis(val: any) {
  const num = new BigNumber(val);
  return num.multipliedBy(100000000).toNumber();
}

export function satoshisToDOGE(val: any): BigNumber {
  const num = new BigNumber(val);
  return num.dividedBy(100000000);
}

export function isValidAddress(address: string) {
  if (!address) return false;
  return true;
}

export const drcToDec = (val: BigNumber.Value) => {
  if(!val) return '' 
  return new BigNumber(val).dividedBy(new BigNumber(10).pow(8)).toFormat()
}

export const formatNumberDecimal = (num: number, decimals: number) => {
  if (isNaN(num)) {
    throw new Error('Invalid number.');
  }

  if (isNaN(decimals) || decimals < 0) {
    throw new Error('Invalid number of decimals.');
  }

  const factor = Math.pow(10, decimals);
  return Math.floor(num * factor) / factor;
}

export const priceFormat = (number: string | number) => {
  const num = +number < 0.000001 ? Number(number).toFixed(10) : Number(number).toFixed(8)
  const value =  +num < 0.001 && +num > 0 
    ?  num.replace(num.split('.')[1],num.split('.')[1].replace(/0+/g, (match) => match.length > 3 ? `0{${match.length}}` : match)) 
    : Number(num).toFixed(8);
  return value;
}

export const amountToBn = (val: BigNumber.Value) => {
  if(!val) return ''
  return new BigNumber(val).times(new BigNumber(10).pow(8)).integerValue().toString()
}

export const formatAccountAddress = (address: string) => {
  const result = address.substr(0, 4) + '...' + address.substr(-4)
  return result
}

export const amountToDec = (val: BigNumber.Value) => {
  if(!val) return '' 
  return new BigNumber(val).dividedBy(new BigNumber(10).pow(8))
}

export const generateOperationRecords = (data: any, repeat: number) => {
  const { currentTicker, currentAmout } = data;
  const operationRecord = {
    p: 'drc-20',
    op: 'mint',
    tick: currentTicker,
    amt: currentAmout?.toString(),
  };

  const operationRecords = Array(repeat).fill(operationRecord);
  return operationRecords
}