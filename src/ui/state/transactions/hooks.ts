import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { AppState } from '..';
import { getPrivateKey } from '../../utils/wallet';
import { amountToSaothis } from '../../utils';
import { dogeCoin, PrevOutput, transaction, TransactionTxs, TransactionData } from '@unielon/coin-dogecoin'
import { ToAddressInfo } from '../../../shared/types';
import { useCurrentKeyring } from '../keyrings/hooks';
export function useTransactionsState(): AppState['transactions'] {
  return useAppSelector((state) => state.transactions);
}

export function useDogecoinTx() {
  const transactionsState = useTransactionsState();
  return transactionsState.dogecoinTx;
}

export function useCreateDogecoinTxCallback() {
  const dispatch = useAppDispatch();
  const currentAccount = useCurrentKeyring();
  return useCallback(
    async (toAddressInfo: ToAddressInfo, toAmount: number, feeRate: number, utxos: any) => {
      console.log(toAddressInfo, 'toAddressInfo===')
      const { phrase, address, newAccount, wif } = currentAccount
      const yourPrivateKeyWIF = phrase && newAccount ? getPrivateKey(phrase) : wif
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
        const request: any = {
            commitTxPrevOutputList,
            commitFeeRate: 50000,
            revealFeeRate: 50000,
            transactionDataList,
            changeAddress: address,
            transactionFee: feeRate
        };
        console.log(request, ['request=====>>>>>>>>,,,,']);
        const txs: TransactionTxs = transaction(dogeCoin, request)
        console.log(txs, ['txs=====>>>>>>>>,,,,']);
        return txs.commitTx
    },
    [dispatch, currentAccount]
  );
}

export function useUtxos() {
  const transactionsState = useTransactionsState();
  return transactionsState.utxos;
}
