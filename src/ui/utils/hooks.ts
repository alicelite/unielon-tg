import { inscribeDrc, dogeCoin, DrcInscriptionData, PrevOutput } from "@unielon/coin-dogecoin";
import { amountToSaothis, getLocalValue, satoshisToDOGE, setLocalValue } from ".";
import { broadcastDogeTrade, getUtoxsInfo } from "../../shared/cardinals";
import { CONFIRMATION_ERROR, WALLET } from "../../shared/constant";
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

export const getUtxoList = (address: string | number) => {
  return new Promise((resolve) => {
    const storedData = localStorage.getItem('utxoList');
    const utxoList = storedData ? JSON.parse(storedData) : {};
    console.log(utxoList, '----res------');
    const result = utxoList[address] || {};

    if (result.utxoTxid) {
      resolve(result.utxoTxid);
    } else {
      resolve([]);
    }
  });
}

export const collectUtxosUntilBalance = async (targetBalance: number, address: string, initialTotalValue: number, type?: string) => {
  const storedTxids: any = await getUtxoList(address)
  console.log(storedTxids, 'storedTxids------')
  let accumulatedAmount = 0;
  let collectedUtxos = [];
  let total = 0
  console.log(initialTotalValue, 'initialTotalValue------', accumulatedAmount, amountToSaothis(targetBalance))
  while (accumulatedAmount < amountToSaothis(targetBalance)) {
    const apiResponse: any = await getUtoxsInfo(address, Number(initialTotalValue) + Number(accumulatedAmount), '10000000');
    // Extract txid values
    console.log(apiResponse, 'apiResponse------')
    const filteredArr = apiResponse?.utxos?.filter((item: { satoshis: number; }) => item.satoshis > 0.005);
    const newTxids = filteredArr?.map((txId: any) => txId);
    console.log(newTxids, 'newTxids-----', apiResponse?.utxos)
    // Find common txids between the API response and stored txids
    const commonTxids = storedTxids?.filter((txid: any) => newTxids?.includes(txid));
    console.log(commonTxids, 'commonTxids------')
    // Check for duplicates and accumulated value
    const uniqueUtxos = type === 'sendFile' ? filteredArr : filteredArr?.filter(( txId: any) => !commonTxids?.includes(txId));
    console.log(uniqueUtxos, 'uniqueUtxos-----')
    const accumulatedValue = uniqueUtxos?.reduce((sum: number, entry: { satoshis: any; }) => {
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
export const getUnspendUtxos = async(unspentOutputs: { address: any; vout: any; value: any; txid: any; amount: any; }[], privateKey: any) => {
  console.log(unspentOutputs, 'unspentOutputs===33==')
  const utoxs = unspentOutputs?.map(({ address, vout, value, txid }) => ({
    address,
    vOut: vout,
    amount: amountToSaothis(value),
    txId: txid,
    privateKey
  }));
  return utoxs
}

export const createDrcInscription = async(inscriptionParams: string, account: any, privateKey: any, balance: { amount: string | number; }, utxoTotal: any, repeat?: any, type?: string) => {
  // const unspentOutputs = await collectUtxosUntilBalance(+balance.amount, account, utxoTotal)
  const apiResponse: any = await getUtoxsInfo(account, utxoTotal, '10000000');
  // Extract txid values
  console.log(apiResponse, 'apiResponse------')
  const unspentOutputs = apiResponse?.utxo
  console.log(balance, 'balance------', unspentOutputs)
  const utxos = await getUnspendUtxos(unspentOutputs, privateKey)
  const commitTxPrevOutputList: PrevOutput[] = [];
  commitTxPrevOutputList.push(...utxos);
  console.log(utxos, 'utxos-----<<<<<')
  if(!utxos.length) {
    return { ...CONFIRMATION_ERROR }
  }
  const parseParams = JSON.parse(inscriptionParams)
  const inscriptionDataList: DrcInscriptionData[] = [];
  if(type === 'transfer') {
    const { p, op, tick, amt } = parseParams
    const params = {
      p, op, tick, amt
    }
    const inscriptionParams = JSON.stringify(params)
    inscriptionDataList.push({
      contentType: 'text/plain;charset=utf-8',
      body: `${inscriptionParams}`,
      revealAddr: account,
      repeat: repeat || 1,
      receiveAddr: parseParams.receiveAddr
    });
  } else {
    inscriptionDataList.push({
      contentType: 'text/plain;charset=utf-8',
      body: `${inscriptionParams}`,
      revealAddr: account,
      repeat: repeat || 1
    });
  }
  
  const request = {
    commitTxPrevOutputList,
    commitFeeRate: 50000,
    revealFeeRate: 50000,
    inscriptionDataList,
    changeAddress: account,
  };
  console.log(request, 'request-------<<<')
  const inscribeDrcInfo =  inscribeDrc(dogeCoin, request)
  console.log(inscribeDrcInfo, 'inscribeDrcInfo========')
  let boardcastCallback
  let boardcastCallbackFee
  if(inscribeDrcInfo?.commitTx) {
    boardcastCallback = await broadcastDogeTrade(inscribeDrcInfo?.commitTx)
    console.log(boardcastCallback, 'boardcastCallback------<<<<sss')
    boardcastCallbackFee = await broadcastDogeTrade(inscribeDrcInfo?.revealTxs[0])
    return {
      inscribeDrcInfo,
      boardcastCallback,
      boardcastCallbackFee,
      utxos
    }
  }
  return {
    inscribeDrcInfo,
    boardcastCallback,
    utxos
  }
}