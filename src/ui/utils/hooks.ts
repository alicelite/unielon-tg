// import { useEffect, useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { CONFIRMATION_ERROR, amountToSaothis, collectUtxosUntilBalance, findUtxosForFile, satoshisToAmount } from '@/ui/utils';
// import { getUiType } from '.';
import { useEffect, useRef, useState } from 'react';
import Wallet from './WalletContext';
// // import wallet from '@/background/controller/wallet';
// // import dogecoin from 'uni-doge'
// import { dogeCoin, inscribeDrc, DrcInscriptionData, PrevOutput, inscribeFile, transaction } from '@unielon/coin-dogecoin'
// export const useApproval = () => {
//   const wallet = useWallet();
//   const navigate = useNavigate();
//   const getApproval = wallet.getApproval;

//   const resolveApproval = async (data?: any, stay = false, forceReject = false) => {
//     const approval = await getApproval();

//     if (approval) {
//       wallet.resolveApproval(data, forceReject);
//     }
//     if (stay) {
//       return;
//     }
//     setTimeout(() => {
//       navigate('/');
//     });
//   };

//   const rejectApproval = async (err?, stay = false, isInternal = false) => {
//     const approval = await getApproval();
//     if (approval) {
//       await wallet.rejectApproval(err, stay, isInternal);
//     }
//     if (!stay) {
//       navigate('/');
//     }
//   };

//   useEffect(() => {
//     if (!getUiType().isNotification) {
//       return;
//     }
//     window.addEventListener('beforeunload', rejectApproval);

//     return () => window.removeEventListener('beforeunload', rejectApproval);
//   }, []);

//   return [getApproval, resolveApproval, rejectApproval] as const;
// };

// export const useSelectOption = <T>({
//   options,
//   defaultValue = [],
//   onChange,
//   value
// }: {
//   options: T[];
//   defaultValue?: T[];
//   onChange?: (arg: T[]) => void;
//   value?: T[];
// }) => {
//   const isControlled = useRef(typeof value !== 'undefined').current;
//   const [idxs, setChoosedIdxs] = useState((isControlled ? value! : defaultValue).map((x) => options.indexOf(x)));

//   useEffect(() => {
//     if (!isControlled) {
//       return;
//     }

//     // shallow compare
//     if (value && idxs.some((x, i) => options[x] != value[i])) {
//       setChoosedIdxs(value.map((x) => options.indexOf(x)));
//     }
//   }, [value]);

//   const changeValue = (idxs: number[]) => {
//     setChoosedIdxs([...idxs]);
//     onChange && onChange(idxs.map((o) => options[o]));
//   };

//   const handleRemove = (i: number) => {
//     idxs.splice(i, 1);
//     changeValue(idxs);
//   };

//   const handleChoose = (i: number) => {
//     if (idxs.includes(i)) {
//       return;
//     }

//     idxs.push(i);
//     changeValue(idxs);
//   };

//   const handleToggle = (i: number) => {
//     const inIdxs = idxs.indexOf(i);
//     if (inIdxs !== -1) {
//       handleRemove(inIdxs);
//     } else {
//       handleChoose(i);
//     }
//   };

//   const handleClear = () => {
//     changeValue([]);
//   };

//   return [idxs.map((o) => options[o]), handleRemove, handleChoose, handleToggle, handleClear, idxs] as const;
// };

export const useWalletRequest = (
  requestFn,
  {
    onSuccess,
    onError
  }: {
    onSuccess?(arg: any): void;
    onError?(arg: any): void;
  }
) => {
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);
  const [loading, setLoading] = useState<boolean>(false);
  const [res, setRes] = useState<any>();
  const [err, setErr] = useState<any>();

  const run = async (...args) => {
    setLoading(true);
    try {
      const _res = await Promise.resolve(requestFn(...args));
      if (!mounted.current) {
        return;
      }
      setRes(_res);
      onSuccess && onSuccess(_res);
    } catch (err) {
      if (!mounted.current) {
        return;
      }
      setErr(err);
      onError && onError(err);
    } finally {
      if (mounted.current) {
        setLoading(false);
      }
    }
  };

  return [run, loading, res, err] as const;
};

export function useCreateAccountCallback() {
  const dispatch = useAppDispatch();
  const wallet = useWallet();
  return useCallback(
    async (mnemonics: string, hdPath: string, passphrase: string, addressType: AddressType) => {
      await wallet.createKeyringWithMnemonics(mnemonics, hdPath, passphrase, addressType);
      dispatch(globalActions.update({ isUnlocked: true }));
    },
    [dispatch, wallet]
  );
}
// export interface UseHoverOptions {
//   mouseEnterDelayMS?: number;
//   mouseLeaveDelayMS?: number;
// }

// export type HoverProps = Pick<React.HTMLAttributes<HTMLElement>, 'onMouseEnter' | 'onMouseLeave'>;

// export const useHover = ({ mouseEnterDelayMS = 0, mouseLeaveDelayMS = 0 }: UseHoverOptions = {}): [
//   boolean,
//   HoverProps
// ] => {
//   const [isHovering, setIsHovering] = useState(false);
//   let mouseEnterTimer: number | undefined;
//   let mouseOutTimer: number | undefined;
//   return [
//     isHovering,
//     {
//       onMouseEnter: () => {
//         clearTimeout(mouseOutTimer);
//         mouseEnterTimer = window.setTimeout(() => setIsHovering(true), mouseEnterDelayMS);
//       },
//       onMouseLeave: () => {
//         clearTimeout(mouseEnterTimer);
//         mouseOutTimer = window.setTimeout(() => setIsHovering(false), mouseLeaveDelayMS);
//       }
//     }
//   ];
// };

// export const getUnspendUtxos = async(unspentOutputs, privateKey) => {
//   console.log(unspentOutputs, 'unspentOutputs===33==')
//   const utoxs = unspentOutputs?.map(({ address, outputIndex, satoshis, txId, amount }) => ({
//     address,
//     vOut: outputIndex,
//     amount: satoshis ? amountToSaothis(satoshis) : amountToSaothis(amount),
//     txId,
//     privateKey
//   }));
//   return utoxs
// }

// export const createDrcInscription = async(inscriptionParams, account, privateKey, balance, utxoTotal, repeat?, type?) => {
//   const unspentOutputs = await collectUtxosUntilBalance(+balance.confirm_amount, account, utxoTotal)
//   console.log(balance, 'balance------', unspentOutputs)
//   const utxos = await getUnspendUtxos(unspentOutputs, privateKey)
//   const commitTxPrevOutputList: PrevOutput[] = [];
//   commitTxPrevOutputList.push(...utxos);
//   console.log(utxos, 'utxos-----<<<<<')
//   if(!utxos.length) {
//     return { ...CONFIRMATION_ERROR }
//   }
//   const parseParams = JSON.parse(inscriptionParams)
//   const inscriptionDataList: DrcInscriptionData[] = [];
//   if(type === 'transfer') {
//     inscriptionDataList.push({
//       contentType: 'text/plain;charset=utf-8',
//       body: `${inscriptionParams}`,
//       revealAddr: account,
//       repeat: repeat || 1,
//       receiveAddr: parseParams.receiveAddr
//     });
//   } else {
//     inscriptionDataList.push({
//       contentType: 'text/plain;charset=utf-8',
//       body: `${inscriptionParams}`,
//       revealAddr: account,
//       repeat: repeat || 1
//     });
//   }
  
//   const request = {
//     commitTxPrevOutputList,
//     commitFeeRate: 50000,
//     revealFeeRate: 50000,
//     inscriptionDataList,
//     changeAddress: account,
//   };
//   console.log(request, 'request-------<<<')
//   const inscribeDrcInfo =  inscribeDrc(dogeCoin, request)
//   console.log(inscribeDrcInfo, 'inscribeDrcInfo========')
//   let boardcastCallback
//   let boardcastCallbackFee
//   if(inscribeDrcInfo?.commitTx) {
//     boardcastCallback = await wallet.pushTx(inscribeDrcInfo?.commitTx)
//     console.log(boardcastCallback, 'boardcastCallback------<<<<sss')
//     boardcastCallbackFee = await wallet.pushTx(inscribeDrcInfo?.revealTxs[0])
//     return {
//       inscribeDrcInfo,
//       boardcastCallback,
//       boardcastCallbackFee,
//       utxos
//     }
//   }
//   return {
//     inscribeDrcInfo,
//     boardcastCallback,
//     utxos
//   }
// }

// export const createFileInscription = async(account, privateKey, unspentOutputs, fileList, arrType?) => {
//   console.log('balance------', unspentOutputs)
//   const requests = await Promise.all(fileList.map(async (file, index) => {
//     console.log(unspentOutputs[index], '---index')
//     const utxos = arrType === 'nested' ?  unspentOutputs[index] : [unspentOutputs[index]]
//     const commitTxPrevOutputList = utxos
//     const inscriptionDataList = [file]
//     console.log(utxos,commitTxPrevOutputList, 'commitTxPrevOutputList====' )
//     const request = {
//       commitTxPrevOutputList,
//       commitFeeRate: 50000,
//       revealFeeRate: 50000,
//       inscriptionDataList,
//       changeAddress: account,
//     };

//     console.log(request, `request for file ${index} -------<<<`);

//     return inscribeFile(dogeCoin, request);
//   }));


//   const inscribeDrcInfos = await Promise.all(requests);
//   console.log(inscribeDrcInfos, 'inscribeDrcInfos-------<<<');
//   const results = [];

//   for (let i = 0; i < inscribeDrcInfos.length; i++) {
//     const inscribeDrcInfo = inscribeDrcInfos[i];
//     console.log(inscribeDrcInfo, 'inscribeDrcInfo======');
//     if (inscribeDrcInfo?.commitTx) {
//       console.log(inscribeDrcInfo?.commitTx, 'inscribeDrcInfo?.commitTx');
//       const boardcastCallback = await wallet.pushTx(inscribeDrcInfo?.commitTx);
//       console.log(boardcastCallback, 'boardcastCallback------<<<<sss');
//       console.log(inscribeDrcInfo?.revealTxs[0], 'inscribeDrcInfo?.inscribeDrcInfo?.revealTxs[0]');
//       const boardcastCallbackFee = await wallet.pushTx(inscribeDrcInfo?.revealTxs[0]);
//       results.push({
//         inscribeDrcInfo,
//         boardcastCallback,
//         boardcastCallbackFee,
//         utxos: unspentOutputs
//       });
//     }
//   }
//   return results
// }

// export const sendDogecoin = async (toAddress, satoshis, feeRate, _account, yourPrivateKeyWIF, type) => {
//   try {
//     if(!_account) return
//     const amountToSend = type === 'mint' ? Number(amountToSaothis(satoshis)) : +satoshis
//     const feeAmount = feeRate
//     const totalValue = Number(amountToSend) + Number(feeAmount)
//     const unspentOutputs = await wallet.getAddressUtxo(_account, Number(totalValue));
//     const utxos = unspentOutputs?.utxos?.map(({ address, outputIndex, satoshis, script, txId }) => ({
//       address,
//       outputIndex,
//       satoshis: amountToSaothis(satoshis),
//       script,
//       txId
//     }));
//     const destinationAddress = toAddress
//     const privateKey = new dogecoin.PrivateKey(yourPrivateKeyWIF);
//     console.log(utxos, 'utxos===')
//     console.log(destinationAddress, 'destinationAddress===')
//     console.log(amountToSend, 'amountToSend===', Math.round(amountToSend))
//     console.log(feeAmount, 'sendFee===')
//     console.log(_account, '_account======')
//     console.log(privateKey, 'privateKey======')
//     const transaction = new dogecoin.Transaction()
//       .from(utxos)
//       .to(destinationAddress, Math.round(amountToSend))
//       .fee(Math.round(feeAmount))
//       .change(_account)
//       .sign(privateKey);
//     const verifyResult = transaction.verify();
//     console.log('Transaction verification result=====:', verifyResult);
//     const rawtx = transaction.toString()
//     console.log(utxos, destinationAddress, Math.round(amountToSend), feeAmount, 'transactionInfo=======')
//     const transactionInfo = {
//       unspentOutputs,
//       destinationAddress,
//       amountToSend,
//       _account,
//       privateKey,
//       rawtx,
//       feeAmount
//     }
//     return transactionInfo
//   } catch(error) {
//     console.log(error, '======>')
//     return error
//   }
// };


// export const sendDogecoinTrade = async(unspentOutputs, dogeAmount, tradeFeeRate, _account, yourPrivateKeyWIF) => {
//   const utxos = unspentOutputs.map(({ address, outputIndex, satoshis, script, txId }) => ({
//     address,
//     outputIndex,
//     satoshis: amountToSaothis(satoshis),
//     script,
//     txId
//   }));
//   const destinationAddress = _account.address
//   const amountToSend = dogeAmount;
//   const privateKey = new dogecoin.PrivateKey(yourPrivateKeyWIF);
//   console.log(privateKey, yourPrivateKeyWIF, '====,,,==')
//   const sendFee = tradeFeeRate
//   const toAmount = Number(amountToSend) - Number(sendFee)
//   const transaction = new dogecoin.Transaction()
//     .from(utxos)
//     .to(destinationAddress, Math.round(toAmount))
//     .fee(Math.round(sendFee))
//     .change(destinationAddress)
//     .sign(privateKey);
//   const verifyResult = transaction.verify();
//   console.log('Transaction verification result:', verifyResult);
//   const rawtx = transaction.toString()
//   console.log(amountToSend, sendFee, destinationAddress, utxos, rawtx, toAmount, tradeFeeRate, 'transaction==3333==>>')
//   return rawtx
// }

// export const useFileInscription = () => {
//   const handleFileInscription = async (unspentOutputs, accumulated, files, amountToFeeAddress, privateKey, _account, fileList) => {
//     let remainingUnspentOutputs = [...unspentOutputs];
//     const inputsForFiles = files.map(() => {
//       const utxosForFile = findUtxosForFile(remainingUnspentOutputs, satoshisToAmount(amountToFeeAddress), privateKey);
//       remainingUnspentOutputs = remainingUnspentOutputs.filter(output => !utxosForFile.some(utxo => utxo.txId === output.txId && utxo.vOut === output.outputIndex));
//       return utxosForFile;
//     });

//     if (inputsForFiles.some(subArray => subArray.length === 0)) {
//       console.log('utxo >= files, The current utxo is not enough to split----<<Scenes1')
//       console.log(privateKey, 'privateKey====')
//       return await createAndPushTransaction(unspentOutputs, accumulated, 10000000, _account, privateKey, fileList);
//     }

//     console.log('utxo >= files, The current utxo is enough to split----<<Scenes2')
//     const res = await createFileInscription(_account.address, privateKey, inputsForFiles, fileList, 'nested');
//     console.log(res, 'res====1')
//     return res.map(item => item.boardcastCallback.data);
//   };

//   const handleInsufficientUtxos = async (amountToFeeAddress, unspentOutputs, accumulated, files, privateKey, _account, fileList) => {
//     if (unspentOutputs.length > 1) {
//       console.log('utxo < files && utxo > 1, The current utxo is not enough to split----<<Scenes3')
//       return await createAndPushTransaction(unspentOutputs, accumulated, 10000000, _account, privateKey, fileList);
//     } else {
//       console.log('utxo < files && utxo === 1----<<Scenes4')
//       const commitTxPrevOutputList = await getUnspendUtxos(unspentOutputs, privateKey);
//       const totalSpend = accumulated - 10000000;
//       const singleAmount = parseInt((totalSpend - 20000000) / files.length);
//       const transactionDataList = files.map(() => ({
//         revealAddr: _account.address,
//         amount: singleAmount,
//       }));

//       const request = {
//         commitTxPrevOutputList,
//         commitFeeRate: 50000,
//         revealFeeRate: 50000,
//         transactionDataList,
//         changeAddress: _account.address,
//       };
//       console.log('split first=------')
//       const transactionInfo = transaction(dogeCoin, request);
//       const rawtx = transactionInfo.commitTx;
//       const txid = await wallet.pushTx(rawtx);
//       const commitrevOutputList = files.map((_, i) => ({
//         txId: txid.data,
//         vOut: i,
//         amount: amountToFeeAddress,
//         address: _account.address,
//         privateKey,
//       }));

//       const res = await createFileInscription(_account.address, privateKey, commitrevOutputList, fileList);
//       console.log(res, 'res====2')
//       return res.map(item => item.boardcastCallback.data);
//     }
//   };

//   const createAndPushTransaction = async (unspentOutputs, accumulated, fee, _account, privateKey, fileList) => {
//     console.log('merge first------')
//     const rawtx = await sendDogecoinTrade(unspentOutputs, accumulated, fee, _account, privateKey);
//     const txid = await wallet.pushTx(rawtx);
//     const totalSpend = accumulated - fee;
//     const singleAmount = parseInt((totalSpend - 20000000) / fileList.length);
//     const commitPrevOutputList = [{
//       txId: txid.data,
//       vOut: 0,
//       amount: totalSpend,
//       address: _account.address,
//       privateKey,
//     }];
//     const transactionDataList = fileList.map(() => ({
//       revealAddr: _account.address,
//       amount: singleAmount,
//     }));

//     const request = {
//       commitTxPrevOutputList: commitPrevOutputList,
//       commitFeeRate: 50000,
//       revealFeeRate: 50000,
//       transactionDataList,
//       changeAddress: _account.address,
//     };

//     const transactionInfo = transaction(dogeCoin, request);
//     const rawtx_ = transactionInfo.commitTx;
//     const txid_ = await wallet.pushTx(rawtx_);
//     const commitTxPrevOutputList = fileList.map((_, i) => ({
//       txId: txid_.data,
//       vOut: i,
//       amount: singleAmount,
//       address: _account.address,
//       privateKey,
//     }));

//     const res = await createFileInscription(_account.address, privateKey, commitTxPrevOutputList, fileList);
//     console.log(res, 'res====3')
//     return res.map(item => item.boardcastCallback.data);
//   };

//   return {
//     handleFileInscription,
//     handleInsufficientUtxos,
//     createAndPushTransaction,
//   };
// }