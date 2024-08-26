import { getLocalValue, setLocalValue, setSessionValue } from ".";
import { PASSWORD, WALLET } from "../../shared/constant";
import { accountActions } from "../state/accounts/reducer";
import { decrypt, encrypt, generateAddress, generateChild, generateRoot } from "./wallet";

export const decryptWallet = () => {
  return new Promise((resolve, reject) => {
    Promise.all([getLocalValue(WALLET), getLocalValue('password')])
      .then(([wallet, password]) => {
        const decryptedWallet = decrypt({
          data: wallet,
          password: password.toString(),
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
  const walletList = Array.isArray(localWallet) ? localWallet : [];
  const wallet = {
    phrase,
    addresses: address,
    nicknames: { [address as string]: 'Address 1' },
    type: isImport ? 'Simple Key Pair' : 'HD Key Tree'
  };
  walletList.push(wallet)
 
  dispatch(accountActions.setAccounts(walletList));
  const encryptedWallet = encrypt({
    data: wallet,
    password: password,
  });

  setSessionValue({ [PASSWORD]: password });
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
  console.log(historyItems, broadcastInfo, 'getNewTransferList=======')
  const updatedBroadcastInfo = broadcastInfo.filter(broadcastItem =>
    !historyItems.find(historyItem => historyItem.txid === broadcastItem.txid)
  );
  console.log('Updated broadcastInfo:', updatedBroadcastInfo)
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
  console.log(infoArray, 'infoArray====<<<<<<');
  
  if (!infos?.length) {
    setLocalValue({ broadcastInfo: {}});
    console.log('broadcastInfo cleared');
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

  console.log(broadcastInfo, 'broadcastInfo====');
  setLocalValue({ broadcastInfo });
  console.log('Data stored successfully');
};

export const getBroadcastInfo = (address: string) => {
  return new Promise((resolve) => {
    const storedData = localStorage.getItem('broadcastInfo');
    console.log(storedData, 'storedData====', typeof storedData);
    const broadcastInfo = storedData ? JSON.parse(storedData) : {};
    console.log(broadcastInfo, 'broadcastInfo===')
    const data = broadcastInfo[address] || {};
    if (data && data.broadcastItem) {
      resolve(data.broadcastItem);
    } else {
      resolve([]);
    }
  });
};