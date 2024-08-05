// import wallet from '@/background/controller/wallet';
// import BigNumber from 'bignumber.js';
import { useLocation } from 'react-router-dom';
// import Mnemonic from 'bitcore-mnemonic';
// import dogecoin from 'uni-doge'
export * from './hooks';
export * from './WalletContext';
const UI_TYPE = {
  Tab: 'index',
  Pop: 'popup',
  Notification: 'notification'
};

type UiTypeCheck = {
  isTab: boolean;
  isNotification: boolean;
  isPop: boolean;
};
export const baseFee = {
  mint: 0.5 * 100000000,
  sell: 0.5 * 100000000,
  buy: 0.5 * 100000000,
  transfer: 0.01 * 100000000,
  deploy: 100 * 100000000,
  add:  0.5 * 100000000
};

export const CONFIRMATION_ERROR = {
  data: null,
  code: 500,
  msg: 'There are other unfinished operations at the current address. Please wait for completion before submitting.'
};

export const DOGECOIN_NETWORK = {
  messagePrefix: '\x19Dogecoin Signed Message:\n',
  bech32: 'D',
  bip32: {
    public: 0x02facafd,
    private: 0x02fac398
  },
  pubKeyHash: 0x1e,
  scriptHash: 0x16,
  wif: 0x9e
};

export const INSUFFICIENT_BALANCE_ERROR = {
  code: 500,
  msg: 'The balance is insufficient to complete this transaction',
  data: null
}

export const getUiType = (): UiTypeCheck => {
  const { pathname } = window.location;
  return Object.entries(UI_TYPE).reduce((m, [key, value]) => {
    m[`is${key}`] = pathname === `/${value}.html`;

    return m;
  }, {} as UiTypeCheck);
};

export const hex2Text = (hex: string) => {
  try {
    return hex.startsWith('0x') ? decodeURIComponent(hex.replace(/^0x/, '').replace(/[0-9a-f]{2}/g, '%$&')) : hex;
  } catch {
    return hex;
  }
};

export const getUITypeName = (): string => {
  // need to refact
  const UIType = getUiType();

  if (UIType.isPop) return 'popup';
  if (UIType.isNotification) return 'notification';
  if (UIType.isTab) return 'tab';

  return '';
};

/**
 *
 * @param origin (exchange.pancakeswap.finance)
 * @returns (pancakeswap)
 */
export const getOriginName = (origin: string) => {
  const matches = origin.replace(/https?:\/\//, '').match(/^([^.]+\.)?(\S+)\./);

  return matches ? matches[2] || origin : origin;
};

export const hashCode = (str: string) => {
  if (!str) return 0;
  let hash = 0,
    i,
    chr,
    len;
  if (str.length === 0) return hash;
  for (i = 0, len = str.length; i < len; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

export const ellipsisOverflowedText = (str: string, length = 5, removeLastComma = false) => {
  if (str.length <= length) return str;
  let cut = str.substring(0, length);
  if (removeLastComma) {
    if (cut.endsWith(',')) {
      cut = cut.substring(0, length - 1);
    }
  }
  return `${cut}...`;
};

export const titleCase = (str) => {  
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());  
}  

export const satoshisToDOGE = (amount: number) => {
  return amount / 100000000;
};

export function shortAddress(address?: string, len = 5) {
  if (!address) return '';
  if (address.length <= len * 2) return address;
  return address.slice(0, len) + '...' + address.slice(address.length - len);
}

export function shortDesc(desc?: string, len = 50) {
  if (!desc) return '';
  if (desc.length <= len) return desc;
  return desc.slice(0, len) + '...';
}

export async function sleep(timeSec: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, timeSec * 1000);
  });
}

export function isValidAddress(address: string) {
  if (!address) return false;
  return true;
}

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

export function formatDate(date: Date, fmt = 'yyyy-MM-dd hh:mm:ss') {
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length));
  for (const k in o)
    if (new RegExp(`(${k})`).test(fmt))
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length));
  return fmt;
}

export function satoshisToAmount(val: any) {
  const num = new BigNumber(val);
  return num.dividedBy(100000000).toFixed(8);
}

export function amountToSaothis(val: any) {
  const num = new BigNumber(val);
  return num.multipliedBy(100000000).toNumber();
}

export function useLocationState<T>() {
  const { state } = useLocation();
  return state as T;
}

export function calculateByteCount(hexString) {
  const byteArray = hexStringToByteArray(hexString);
  const byteCount = byteArray.length;
  return byteCount;
}

function hexStringToByteArray(hexString: string): number[] {
  const byteArray: number[] = [];
  for (let i = 0; i < hexString.length; i += 2) {
    byteArray.push(parseInt(hexString.substring(i, i + 2), 16) as number);
  }
  return byteArray;
}

export function generateOperationRecords(data, repeat) {
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

export function addNumbers(...numbers) {
  if (numbers) {
    const bigNumbers = numbers.map((n) => new BigNumber(n));
    const sum = bigNumbers.reduce(
      (prev, cur) => prev.plus(cur),
      new BigNumber(0)
    );
    return sum.toString();
  }
}

export const multiply = (...numbers) => {
  if (numbers) {
    return numbers
      .reduce(
        (accumulator, currentValue) =>
          new BigNumber(accumulator).multipliedBy(currentValue),
        1
      )
      .toString();
  }
};
export const getfileData = (json) => {
  const data = Object.assign({}, json)
  data.tick = encodeURIComponent(json.tick)
  const jsonString = JSON.stringify(data);
  const base64String = btoa(jsonString);

  const byteArray = atob(base64String);
  const byteNumbers = new Array(byteArray.length);
  for (let i = 0; i < byteArray.length; i++) {
    byteNumbers[i] = byteArray.charCodeAt(i);
  }
  const uint8Array = new Uint8Array(byteNumbers);
  const blob = new Blob([uint8Array], { type: 'application/octet-stream' });
  // const url = URL.createObjectURL(blob);

  const size = Math.round((blob.size / 1024) * 100) / 100;
  return {
    // dataURL: url,
    filename: jsonString,
    name:jsonString,
    size,
  };
};
export function getFee(order, fileList, isTransfer){
  console.log(order, fileList, 'order, fileList=====')
  const { op, transferType, rate_fee, rateFee, inscribeFee = '1000000', feeRate } = order;
  const RATE_FEE = rate_fee || rateFee || feeRate || 100000000;
  const files = fileList?.map((item) => getfileData(item));
  console.log(files, 'files======')
  const size = addNumbers(...files.map((item) => item.size));
  const baseSize = addNumbers(size, '0.462');
  const seruiceFee = op ? baseFee[op]?.toString() : baseFee[transferType]?.toString()
  console.log(seruiceFee, '=seruiceFeeseruiceFeeseruiceFee')
  const payment = {
    inscription: multiply(files.length, inscribeFee),
    networkFee: multiply(baseSize, RATE_FEE?.toString()),
    baseFee: op ? multiply(baseFee[op], files.length) : multiply(baseFee[transferType],files.length),
    sizeFee: multiply(baseSize, RATE_FEE?.toString(), 0.05),
    rateFee: RATE_FEE?.toString(),
    seruiceFee,
  };
  const total = addNumbers(
    payment.inscription,
    payment.networkFee,
    payment.baseFee,
    payment.sizeFee
  );
  console.log(payment, 'payment====')
  return {
    ...payment,
    inscribeFee,
    total,
  };
};

export function setPayment(arg, recordsList) {
  if(!recordsList.length) return
  const files = recordsList?.map((item) => getfileData(item));
  const { inscribeFee, hight, rateFee } = arg;
  const mintState = {op: 'mint', repeat: '1'} 
  const baseFee = {
    mint: 0.5 * 100000000,
    deploy: 100 * 100000000,
  }
  const params = { rateFee, inscribeFee, files};
  const inscribeSize = addNumbers(...(files?.map((item) => item.size) || []));
  const baseSize = addNumbers(inscribeSize, '0.462');
  const payment = {
    inscription: multiply(params.files.length, params.inscribeFee),
    networkFee: multiply(baseSize, params.rateFee),
    baseFee: multiply(baseFee[mintState.op], params.files.length),
    sizeFee: multiply(baseSize, params.rateFee, 0.05),
  };
  const totalFee = addNumbers(
    payment.inscription,
    payment.networkFee,
    payment.baseFee,
    payment.sizeFee
  );
  const result = {
    totalFee,
    inscribeSize,
    payment
  }
  return result
}
const trunc = (value, dec = 1000) => Math.trunc(value * dec) / dec;
export const strToDec = (bn, decimals = 8, decimal = 8) => {
  const value = new BigNumber(bn)
    .dividedBy(new BigNumber(10).pow(decimals))
    .toString();
  const NumValue = Number(trunc(value, new BigNumber(10).pow(decimal).toNumber()));
  return Number(NumValue).toString();
};

export const formatAccountAddress = (address) => {
  const result = address.substr(0, 4) + '...' + address.substr(-4)
  return result
}

const preciseAdd = (a, b) => {
  const x = Math.pow(10, Math.max(getDecimalLength(a), getDecimalLength(b)));
  return (Math.round(a * x) + Math.round(b * x)) / x;
}

const getDecimalLength = (value) => {
  const str = value.toString();
  return (str.indexOf('.') !== -1) ? (str.length - str.indexOf('.') - 1) : 0;
}

export const mergeUtxos = (transactions, sendAmount) => {
  let sum = 0;
  const result: any = [];

  for (const item of transactions) {
    if (+item.satoshis >= +sendAmount) {
      return [item];
    }

    sum = preciseAdd(sum, item.satoshis);
    result.push(item); 

    if (+sum >= +sendAmount) {
      return result;
    }
  }
  return transactions;
}

export const getWebsiteInfo = (data) => {
  const files = {'currentTicker': data.tick || '', 'currentAmout': data.drc_amt || '', 'repeat': 1}
  const operationRecords = generateOperationRecords(files, data?.repeat || 1)
  const payInfo = getFee(data, operationRecords, true)
  return payInfo
}

export const priceFormat = (number) => {
  const num = +number < 0.000001 ? Number(number).toFixed(10) : Number(number).toFixed(8)
  const value =  +num < 0.001 && +num > 0 
    ?  num.replace(num.split('.')[1],num.split('.')[1].replace(/0+/g, (match) => match.length > 3 ? `0{${match.length}}` : match)) 
    : Number(num).toFixed(8);
  return value;
}

export const formatNumberWithCommas = (num) => {
  return num.toLocaleString('en-US');
}

export const formatNumberDecimal = (num, decimals) => {
  if (isNaN(num)) {
    throw new Error('Invalid number.');
  }

  if (isNaN(decimals) || decimals < 0) {
    throw new Error('Invalid number of decimals.');
  }

  const factor = Math.pow(10, decimals);
  return Math.floor(num * factor) / factor;
}

export const drcToDec = (val) => {
  if(!val) return '' 
  return new BigNumber(val).dividedBy(new BigNumber(10).pow(8)).toFormat()
}
export const drcToBn = (val) => {
  if(!val) return ''
  return new BigNumber(val).times(new BigNumber(10).pow(8)).integerValue().toString()
}

export const amountToDec = (val) => {
  if(!val) return '' 
  return new BigNumber(val).dividedBy(new BigNumber(10).pow(8))
}

export const amountToBn = (val) => {
  if(!val) return ''
  return new BigNumber(val).times(new BigNumber(10).pow(8)).integerValue().toString()
}

export const isIntegerOrDecimal = (num) =>{
  const numericValue = Number(num)
  if (Number.isInteger(num)) {
    return numericValue
  } else {
    return numericValue.toFixed(8)
  }
}

export const wdogeFee = (amt) => {
  if(amt * 0.003 < 0.5) {
    return 0.5
  } else {
    return Number(amt*0.003).toFixed(2)
  }
}

export const setTranstionInfo = (address, confirmations) => {
  chrome.storage.local.get(['dogeTransferConfirmations'], function(res) {
    const info = res?.dogeTransferConfirmations || {};
    const result = info[address] || {};
    result.confirmations = confirmations;
    info[address] = result;
    console.log(info, 'setTranstionInfo=')
    chrome.storage.local.set({ dogeTransferConfirmations: info }, function() {
      console.log('Data stored successfully');
    });
  });
};


export const getDogeFeeRate = () => {
  return new Promise((resolve) => {
    chrome.storage.local.get('feeRate', async (result) => {
      if (result) {
        resolve(result);
      } else {
        resolve(100000000);
      }
    });
  });
}

export const getDogeTransaction = (fromAddress) => {
  return new Promise((resolve) => {
    chrome.storage.local.get('dogeTransferConfirmations', async (res) => {
      const info = res?.dogeTransferConfirmations || {};
      const result = info[fromAddress] || {};
      if (result.confirmations) {
        resolve(result.confirmations);
      } else {
        resolve(0)
      }
    });
  });
}

export const setUtxoList = (address, list) => {
  chrome.storage.local.get(['utxoList'], function(res) {
    const utxoList = res?.utxoList || {};
    if (utxoList[address]) {
      utxoList[address].utxoTxid = [...utxoList[address].utxoTxid, ...list];
    } else {
      utxoList[address] = { utxoTxid: [...list] };
    }

    chrome.storage.local.set({ utxoList }, function() {
      console.log('Data stored successfully');
    });
  });
}

export const getUtxoList = (address) => {
  return new Promise((resolve) => {
    chrome.storage.local.get(['utxoList'], (res) => {
      console.log(res, '----res------')
      const utxoList = res.utxoList || {};
      const result = utxoList[address] || {};

      if (result.utxoTxid) {
        resolve(result.utxoTxid);
      } else {
        resolve([]);
      }
    });
  });
}

export const getUnspendUtxo = (utxoArray, targetValue) => {
  const findCombination = (remainingUtxos, currentSelection, remainingValue) => {
    if (remainingValue <= 0) {
      return [currentSelection];
    }

    if (remainingUtxos.length === 0) {
      return [];
    }

    const firstUtxo = remainingUtxos[0];
    const withoutFirst = findCombination(remainingUtxos.slice(1), currentSelection, remainingValue);
    const withFirst = findCombination(remainingUtxos.slice(1), [...currentSelection, firstUtxo], remainingValue - firstUtxo.satoshis);

    return [...withoutFirst, ...withFirst];
  };

  const allCombinations = findCombination(utxoArray, [], targetValue);

  return allCombinations.find(combination => combination.reduce((sum, utxo) => sum + utxo.satoshis, 0) >= targetValue) || null;
};

export const collectUtxosUntilBalance = async (targetBalance, address, initialTotalValue, type?: string) => {
  const storedTxids = await getUtxoList(address)
  console.log(storedTxids, 'storedTxids------')
  let accumulatedAmount = 0;
  let collectedUtxos = [];
  let total = 0
  console.log(initialTotalValue, 'initialTotalValue------', accumulatedAmount, amountToSaothis(targetBalance))
  while (accumulatedAmount < amountToSaothis(targetBalance)) {
    const apiResponse = await wallet.getAddressUtxo(address, Number(initialTotalValue) + Number(accumulatedAmount));
    // Extract txid values
    console.log(apiResponse, 'apiResponse------')
    const filteredArr = apiResponse?.utxos?.filter(item => item.satoshis > 0.005);
    const newTxids = filteredArr?.map(({ txId }) => txId);
    console.log(newTxids, 'newTxids-----', apiResponse?.utxos)
    // Find common txids between the API response and stored txids
    const commonTxids = storedTxids?.filter(txid => newTxids?.includes(txid));
    console.log(commonTxids, 'commonTxids------')
    // Check for duplicates and accumulated value
    const uniqueUtxos = filteredArr?.filter(({ txId }) => !commonTxids?.includes(txId));
    console.log(uniqueUtxos, 'uniqueUtxos-----')
    const accumulatedValue = uniqueUtxos.reduce((sum, entry) => {
      const satoshis = amountToSaothis(entry.satoshis);
      return sum + satoshis;
    }, 0);
    total = accumulatedValue
    if(accumulatedValue === 0 && apiResponse?.amount === targetBalance) break;
    console.log(accumulatedValue, 'accumulatedValue-----', targetBalance)
    console.log(initialTotalValue, 'initialTotalValue-----')
    // Check if the accumulated value meets or exceeds the target balance
    if (accumulatedValue >= initialTotalValue) {
      collectedUtxos = uniqueUtxos;
      break;
    }
    console.log(apiResponse?.amount, 'amount-----')
    const apiAmount = amountToSaothis(apiResponse?.amount);
    console.log(apiAmount, 'apiAmount------', accumulatedAmount)
    accumulatedAmount = +accumulatedValue === 0 ? Number(apiAmount) + (+initialTotalValue) : accumulatedValue + apiAmount
    console.log(accumulatedAmount, 'accumulatedAmount-----')
  }
  console.log(collectedUtxos, 'collectedUtxos====', total)
  collectedUtxos = collectedUtxos.length === 0 ? [] : collectedUtxos;
  if(type === 'sendDoge' && !collectedUtxos?.length) {
    return {
      total: total
    }
  }
  return collectedUtxos;
}

export const setBroadcastInfo = (address, infoArray) => {
  const infos = Array.isArray(infoArray) ? infoArray : [infoArray]
  console.log(infoArray, 'infoArray====<<<<<<')
  if(!infos?.length) {
    chrome.storage.local.set({ broadcastInfo: null }, () => {
      console.log('broadcastInfo cleared');
    });
    return
  }
  chrome.storage.local.get(['broadcastInfo'], function(res) {
    const broadcastInfo = res?.broadcastInfo || {};
    
    if (!broadcastInfo[address]) {
      broadcastInfo[address] = { broadcastItem: [] };
    }

    infos.forEach(info => {
      const existingIndex = broadcastInfo[address].broadcastItem.findIndex(item => item.hash === info.hash);
      if (existingIndex === -1) {
        broadcastInfo[address].broadcastItem.unshift(info);
      }
    });

    console.log(broadcastInfo, 'broadcastInfo====38338444')
    chrome.storage.local.set({ broadcastInfo }, function() {
      console.log('Data stored successfully');
    });
  });
};

export const filterBroadcastInfo = async (address) => {
  try {
    const broadcastInfo = await getBroadcastInfo(address);
    const hashList = broadcastInfo?.map(item => item.hash);
    console.log('localBalance======', broadcastInfo, hashList);
    const updatedBroadcastInfo = [];

    for (const item of broadcastInfo) {
      console.log(item, '===item');
      try {
        const result = await wallet.fetchTransactionInfo(item.hash);
        console.log(result, 'result======...');
        if (result.success === 1 && result.transaction.confirmations >= 2) {
          const index = broadcastInfo?.findIndex((element) => element.hash === result.transaction.hash);
          if (index !== -1) {
            broadcastInfo.splice(index, 1);
          }
        } else {
          updatedBroadcastInfo.push(item);
        }
      } catch (error) {
        console.log('error=======');
      }
    }
    console.log(updatedBroadcastInfo, 'updatedBroadcastInfo==8383383838');
    await setBroadcastInfo(address, updatedBroadcastInfo);
    return updatedBroadcastInfo
  } catch (error) {
    console.error('Error while fetching balance:', error);
  }
}

export const getBroadcastInfo = (address) => {
  return new Promise((resolve) => {
    chrome.storage.local.get(['broadcastInfo'], (res) => {
      const broadcastInfo = res.broadcastInfo || {};
      const data = broadcastInfo[address] || {};
      if (data?.broadcastItem) {
        resolve(data?.broadcastItem);
      } else {
        resolve([]);
      }
    });
  });
};

export const getNewTransferList = async (historyItems, broadcastInfo, address) => {
  console.log(historyItems, broadcastInfo, 'getNewTransferList=======')
  const updatedBroadcastInfo = broadcastInfo.filter(broadcastItem =>
    !historyItems.find(historyItem => historyItem.hash === broadcastItem.hash)
  );
  console.log('Updated broadcastInfo:', updatedBroadcastInfo)
  const data = [
    {
      date: '',
      historyItems: [...updatedBroadcastInfo],
      index: 0
    }
  ]
  return data
}

export const broadcastItem = (data, txid) => {
  console.log(data, 'broadcastItem====')
  const {destinationAddress, currentaddress, feeRate, totalSpend, rawtx, feeAmount } = data
  const result = {
    receiveAddress: destinationAddress,
    sendAddress: currentaddress,
    symbol: 'DOGE',
    time: Math.floor(new Date().getTime() / 1000),
    hash: txid,
    address: txid,
    fee: Number(feeRate) / 100000000 || Number(feeAmount) / 100000000,
    amount: -satoshisToAmount(totalSpend),
    broadcastHex: rawtx,
  }
  console.log(result, '===broadcastItem')
  return {
    ...result
  }
}

export const setAccounBalance = (address, balance) => {
  console.log(address, balance, 'setAccounBalance===')
  chrome.storage.local.get(['accounBalance'], function (res) {
    const accounBalance = res?.accounBalance || {};
    const addressInfo = accounBalance[address] || { balance: [] };

    if (addressInfo.balance.length === 0 || balance !== addressInfo.balance[0]) {
      addressInfo.balance.unshift(balance);

      if (addressInfo.balance.length > 2) {
        addressInfo.balance.pop();
      }

      accounBalance[address] = addressInfo;
      console.log(accounBalance, 'accounBalance=====')
      chrome.storage.local.set({ accounBalance }, function () {
        console.log('Data stored successfully');
      });
    }
  });
};

export const getAccounBalance = (address) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['accounBalance'], function (res) {
      const accounBalance = res?.accounBalance || {};
      const addressInfo = accounBalance[address] || { balance: [] };
      resolve(addressInfo);
    });
  });
};


export const getAccountInfo = async () => {
  const _account = await wallet.getCurrentAccount();
  if(!_account) return
  const dogeFeeRate = await getDogeFeeRate()
  console.log(dogeFeeRate, 'dogeFeeRate=====')
  const balance = await wallet.getAddressBalance(_account.address)
  const dogeFee = Number(dogeFeeRate?.feeRate) < 10000000 ? 100000000 : Number(dogeFeeRate?.feeRate)
  const info = {
    address: _account.address,
    pubkey: _account.pubkey,
    type: _account.type
  }
  const yourPrivateKeyWIF = await wallet.getPrivateKeys(info)
  const privateKey = new dogecoin.PrivateKey(yourPrivateKeyWIF);
  return {
    balance,
    dogeFee,
    _account,
    privateKey
  }
}

export const getTransactionUtxos = async (balance, _account, utxoTotal, transferType) => {
  const unspentOutputs = await collectUtxosUntilBalance(+balance.confirm_amount, _account.address, utxoTotal)
  let utxos = transferType === 'mint' ? (unspentOutputs?.length ? [...unspentOutputs] : []) : (unspentOutputs?.utxos || [])
  console.log(unspentOutputs, 'unspentOutputs====9999292')
  utxos = unspentOutputs?.map(({ address, outputIndex, satoshis, script, txId }) => ({
    address,
    outputIndex,
    satoshis: amountToSaothis(satoshis),
    script,
    txId
  }))
  return utxos
}

export const getBroadcastDetail = async (utxos, destinationAddress, amountToFeeAddress, tradeFee, _account, privateKey) => {
  const transaction = new dogecoin.Transaction()
    .from(utxos)
    .to(destinationAddress, Math.round(amountToFeeAddress))
    .fee(Math.round(tradeFee))
    .change(_account.address)
    .sign(privateKey);
  const verifyResult = transaction.verify();
  console.log('Transaction verification result:', verifyResult);
  const rawtx = transaction.toString()
  console.log(rawtx, utxos, destinationAddress, tradeFee, 'sign=====')
  const boardcastCallback = await wallet.pushTx(rawtx, 'trade')
  console.log(boardcastCallback, 'boardcastCallback=====')
  const tx_hash = boardcastCallback?.data?.tx_hash || boardcastCallback.txId
  return {
    boardcastCallback,
    tx_hash,
    rawtx
  }
}

export const getNftBroadcastDetail = async(utxos, destinationAddress, amountToFeeAddress, tradeFee, _account, privateKey) => {
  const toAddress = destinationAddress.split(',')
  const transaction = new dogecoin.Transaction();

  transaction.to(toAddress[0], Math.round(amountToFeeAddress));

  for (let i = 1; i < toAddress.length; i++) {
    transaction.to(toAddress[i], Math.round(1000000))
  }

  transaction.fee(Math.round(tradeFee))
  transaction.from(utxos)
    .change(_account.address)
    .sign(privateKey)

  const verifyResult = transaction.verify();
  console.log('Transaction verification result:', verifyResult);
  const rawtx = transaction.toString()
  console.log(rawtx, utxos, destinationAddress, tradeFee, 'sign=====')
  const boardcastCallback = await wallet.pushTx(rawtx, 'trade')
  console.log(boardcastCallback, 'boardcastCallback=====')
  const tx_hash = boardcastCallback?.data?.tx_hash || boardcastCallback.txId
  return {
    boardcastCallback,
    tx_hash,
    rawtx
  }
}

export const setLocalBroadcastInfo = (utxos, _account, destinationAddress, tx_hash, tradeFee, utxoTotal, rawtx) => {
  const txIds = utxos.map(item => item.txId)
  console.log(txIds, 'txIds======,e,,e')
  setUtxoList(_account.address, txIds)
  const item = {
    destinationAddress,
    currentaddress: _account.address,
    tx_hash,
    feeAmount: tradeFee,
    totalSpend: utxoTotal,
    rawtx,
  }
  const result = broadcastItem(item, tx_hash)
  setBroadcastInfo(_account.address, result)
}

export const getPrivateKey = async(account) => {
  const info = {
    address: account.address,
    pubkey: account.pubkey,
    type: account.type
  }
  const yourPrivateKeyWIF = await wallet.getPrivateKeys(info)
  return yourPrivateKeyWIF
}

export const base64Url = (base64Str) => {
  if (!base64Str) return ''
  let mimeType
  if (base64Str.startsWith('/9j/')) {
    mimeType = 'image/jpeg'
  } else if (base64Str.startsWith('iVBORw0K')) {
    mimeType = 'image/png'
  } else if (base64Str.startsWith('R0lGODdh') || base64Str.startsWith('R0lGODlh')) {
    mimeType = 'image/gif'
  } else {
    mimeType = 'application/octet-stream'
  }
  return `data:${mimeType};base64,${base64Str}`
}

export const getBase64Size = (base64String) => {
  const padding = (base64String.match(/=*$/)[0] || '').length
  const size = (base64String.length * 3) / 4 - padding
  return size
}

export const fileFee = (s) => {
  const size = new BigNumber(s).div(1000).toNumber()
  // 0.5 DOGE per KB
  const fee = size < 1 ? 0 : new BigNumber(size).times(50000000).toNumber()
  return fee
} 

export const findUtxosForFile = (unspentOutputs, singleCost, privateKey) => {
  console.log(unspentOutputs, 'unspentOutputs====', singleCost)
  let accumulated = 0;
  const utxos = [];

  for (const output of unspentOutputs) {
    utxos.push(output);
    accumulated += output.satoshis;
    if (accumulated >= singleCost) {
      break;
    }
  }

  if (accumulated < singleCost) {
    return [];
  }

  const formattedUtxos = utxos.map(output => ({
    txId: output.txId,
    vOut: output.outputIndex,
    amount: amountToSaothis(output.satoshis),
    address: output.address,
    privateKey: privateKey
  }));

  return formattedUtxos;
};

export const shortenHash = (hash: string) =>  {
  if (hash.length > 10) {
    return `${hash.slice(0, 5)}...${hash.slice(-5)}`;
  }
  return hash;
}

// export const generateMnemonic = () => {
//   return new Mnemonic().toString();
// };