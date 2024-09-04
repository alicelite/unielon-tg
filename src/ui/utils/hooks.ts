import { amountToSaothis, getLocalValue, satoshisToDOGE, setLocalValue } from ".";
import { WALLET } from "../../shared/constant";
import { accountActions } from "../state/accounts/reducer";
import { decrypt, encrypt, generateAddress, generateChild, generateRoot } from "./wallet";

export const decryptWallet = () => {
  return new Promise((resolve, reject) => {
    Promise.all([getLocalValue(WALLET)])
      .then(([wallet]) => {
        const password = localStorage.getItem('password') || sessionStorage.getItem('password');
        console.log('Wallet:', wallet);
        console.log('password:', password);
        if(!password) return
        const decryptedWallet = decrypt({
          data: wallet,
          password: password,
        });
        console.log('Decrypted Wallet:', decryptedWallet);
        resolve(decryptedWallet);
      })
      .catch(error => {
        console.error('Error during decryption:', error);
        reject(error);
      });
  });
};
export const createAndStoreWallet = async (phrase: any, password: any, isImport: boolean, dispatch: any) => {
  const root = generateRoot(phrase);
  const child = generateChild(root, 0);
  const address = generateAddress(child);
  const localWallet = await decryptWallet();
  const walletList: any = localWallet ? localWallet : [];
  console.log(walletList, 'walletList.length=====', localWallet)
  const isExist = walletList.findIndex((item: { address: any; }) => item.address === address) > -1
  console.log(isImport, 'isImport==1111', isExist)
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
  walletList.push(wallet)
 
  dispatch(accountActions.setAccounts(walletList));
  const encryptedWallet = encrypt({
    data: walletList,
    password: password,
  });
  console.log('WALLET====1', walletList)
  console.log('WALLET====1', wallet)
  await setLocalValue({ [WALLET]: encryptedWallet });
  return true
}

export const privateKeyStoreWallet = async (address: string, password: any, dispatch: any) => {
  const localWallet = await decryptWallet();
  const walletList: any = localWallet ? localWallet : [];
  console.log(walletList, 'privateKeyStoreWallet=====', localWallet)
  const isExist = walletList.findIndex((item: { address: any; }) => item.address === address) > -1
  console.log(address, 'address==', isExist)
  const wallet = {
    address,
    type: 'Simple Key Pair',
    alianName: `Simple Wallet #${walletList.length + 1}`
  };
  dispatch(accountActions.setCurrent(wallet));
  walletList.push(wallet)
 
  dispatch(accountActions.setAccounts(walletList));
  const encryptedWallet = encrypt({
    data: walletList,
    password: password,
  });
  console.log('WALLET====2', walletList)
  console.log('WALLET====2', wallet)
  await setLocalValue({ [WALLET]: encryptedWallet });
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