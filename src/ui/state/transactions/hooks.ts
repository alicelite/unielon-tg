import { useCallback } from 'react';
import { useCurrentAccount } from '../accounts/hooks';
import { useAppDispatch, useAppSelector } from '../hooks';
import { AppState } from '..';
import { getPrivateKey } from '../../utils/wallet';
import { amountToSaothis } from '../../utils';
import { dogeCoin, PrevOutput, transaction, TransactionTxs, TransactionData } from '@unielon/coin-dogecoin'
import { ToAddressInfo } from '../../../shared/types';
export function useTransactionsState(): AppState['transactions'] {
  return useAppSelector((state) => state.transactions);
}

export function useDogecoinTx() {
  const transactionsState = useTransactionsState();
  return transactionsState.dogecoinTx;
}

export function useCreateDogecoinTxCallback() {
  const dispatch = useAppDispatch();
  const currentAccount = useCurrentAccount();
  return useCallback(
    async (toAddressInfo: ToAddressInfo, toAmount: number, feeRate: number, utxos: any) => {
      const { phrase, address } = currentAccount
      const yourPrivateKeyWIF = getPrivateKey(phrase)
      const unspentOutputs = utxos.map((item: any) => {
        return {
          txId: item.txid,
          vOut: item.vout,
          amount: amountToSaothis(item.value),
          address: item.address,
          privateKey: yourPrivateKeyWIF
        }
      })
      const commitTxPrevOutputList: PrevOutput[] = [];
      commitTxPrevOutputList.push(...unspentOutputs);

        const transactionDataList: TransactionData[] = [];
        transactionDataList.push({
            revealAddr: toAddressInfo.address,
            amount: toAmount
        });
        console.log(commitTxPrevOutputList, 'commitTxPrevOutputList----')
        console.log(transactionDataList, 'transactionDataList----')
        console.log(address, 'address----')
        console.log(feeRate, 'feeRate----')
        const request = {
            commitTxPrevOutputList,
            commitFeeRate: 50000,
            revealFeeRate: 50000,
            transactionDataList,
            changeAddress: address,
            transactionFee: feeRate
        };
        const txs: TransactionTxs = transaction(dogeCoin, request)
        return txs.commitTx
    },
    [dispatch, currentAccount]
  );
}

export function useUtxos() {
  const transactionsState = useTransactionsState();
  return transactionsState.utxos;
}
