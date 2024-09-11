import { amountToSaothis, getLocalValue, satoshisToDOGE, setLocalValue } from ".";
import { WALLET } from "../../shared/constant";
import { accountActions } from "../state/accounts/reducer";
import { decrypt, encrypt, generateAddress, generateChild, generateRoot } from "./wallet";
export const decryptWallet = () => {
  return new Promise((resolve, reject) => {
    Promise.all([getLocalValue(WALLET)])
      .then(([wallet]) => {
        const password = localStorage.getItem('password') || sessionStorage.getItem('password');
        if(!password) return
        if(!wallet) return resolve([])
        const decryptedWallet = decrypt(wallet, password)
        resolve(decryptedWallet);
      })
      .catch(error => {
        console.error('Error during decryption:', error);
        reject(error);
      });
  });
};
export const createAndStoreWallet = async (phrase: any, password: any, isImport: boolean, accounts: any, dispatch: any) => {
  const root = generateRoot(phrase);
  const child = generateChild(root, 0);
  const address = generateAddress(child);
  const localWallet = await decryptWallet();
  let walletList: any = localWallet ? localWallet : accounts ? accounts : [];
  const isExist = walletList.findIndex((item: { address: any; }) => item.address === address) > -1
  if(isExist) {
    return false
  }
  if(!address) return
  const wallet = {
    phrase,
    address,
    type: phrase ? 'HD Key Tree' : 'Simple Key Pair',
    newAccount: !isImport ? true : false,
    alianName: phrase? `HD Wallet #${walletList.length + 1}` : `Simple Wallet #${walletList.length + 1}`
  };
  dispatch(accountActions.setCurrent(wallet));
  walletList = [...walletList, wallet]
 
  dispatch(accountActions.setAccounts(walletList));
  const encryptedWallet = encrypt(walletList, password);
  await setLocalValue({ [WALLET]: encryptedWallet });
  return true
}

export const privateKeyStoreWallet = async (address: string, password: any, wif: string, accounts: any, dispatch: any) => {
  const localWallet = await decryptWallet();
  let walletList: any = localWallet ? localWallet : accounts ? accounts : [];
  const isExist = walletList.findIndex((item: { address: any; }) => item.address === address) > -1
  if(isExist) {
    return false
  }
  const wallet = {
    wif,
    address,
    type: 'Simple Key Pair',
    alianName: `Simple Wallet #${walletList.length + 1}`
  };
  dispatch(accountActions.setCurrent(wallet));
  walletList = [...walletList, wallet]
 
  dispatch(accountActions.setAccounts(walletList));
  const encryptedWallet = encrypt(walletList, password);
  await setLocalValue({ [WALLET]: encryptedWallet });
  return true
}

export const generateAccount = async (phrase: any, dispatch: any) => {
  const root = generateRoot(phrase);
  const child = generateChild(root, 0);
  const address = generateAddress(child);
  dispatch({ type: 'SET_ADDRESS', payload: address });
  return address;
};

export const getNewTransferList = async (historyItems: any[], broadcastInfo: any[], address: string | number) => {
  const updatedBroadcastInfo = broadcastInfo.filter(broadcastItem =>
    !historyItems.find(historyItem => historyItem.txid === broadcastItem.txid)
  );
  setBroadcastInfo(address, updatedBroadcastInfo)
  const data = [
    {
      date: '',
      historyItems: [...updatedBroadcastInfo],
      index: 0
    }
  ]
  return data
}

export const setBroadcastInfo = (address: string | number, infoArray: any) => {
  const infos = Array.isArray(infoArray) ? infoArray : [infoArray];
  
  if (!infos?.length) {
    setLocalValue({ broadcastInfo: {}});
    return;
  }

  const storedData = localStorage.getItem('broadcastInfo');
  const broadcastInfo = storedData ? JSON.parse(storedData) : {};

  if (!broadcastInfo[address]) {
    broadcastInfo[address] = { broadcastItem: [] };
  }

  infos.forEach(info => {
    const existingIndex = broadcastInfo[address].broadcastItem.findIndex((item: { txid: string; }) => item.txid === info.txid);
    if (existingIndex === -1) {
      broadcastInfo[address].broadcastItem.unshift(info);
    }
  });

  setLocalValue({ broadcastInfo });
};

export const broadcastItem = (data: any, txid: string) => {
  const { currentAccount, feeRate, spendAmount, toAddress } = data
  const totalSpend = amountToSaothis(spendAmount) + feeRate
  const result = {
    receiveAddress: toAddress,
    sendAddress: currentAccount,
    symbol: 'DOGE',
    time: Math.floor(new Date().getTime() / 1000),
    txid: txid,
    address: txid,
    fee: Number(feeRate) / 100000000,
    amount: satoshisToDOGE(totalSpend)
  }
  return {
    ...result
  }
}

export const getBroadcastInfo = (address: string) => {
  return new Promise((resolve) => {
    const storedData = localStorage.getItem('broadcastInfo');
    const broadcastInfo = storedData ? JSON.parse(storedData) : {};
    const data = broadcastInfo[address] || {};
    if (data && data.broadcastItem) {
      resolve(data.broadcastItem);
    } else {
      resolve([]);
    }
  });
};