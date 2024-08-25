import { createSlice } from '@reduxjs/toolkit';
import { Utxo } from '../../../shared/types';
export interface DogecoinTx {
  fromAddress: string;
  toAddress: string;
  toSatoshis: number;
  rawtx: string;
  txid: string;
  fee: number;
  autoAdjust: boolean;
  feeRate: number;
  toDomain: string;
}

export interface TransactionsState {
  dogecoinTx: DogecoinTx;
  utxos: Utxo[];
}

export const initialState: TransactionsState = {
  dogecoinTx: {
    fromAddress: '',
    toAddress: '',
    toSatoshis: 0,
    rawtx: '',
    txid: '',
    fee: 0,
    autoAdjust: false,
    feeRate: 5,
    toDomain: ''
  },
  utxos: []
};

const slice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    updateDogecoinTx(
      state,
      action: {
        payload: {
          fromAddress?: string;
          toAddress?: string;
          toSatoshis?: number;
          changeSatoshis?: number;
          rawtx?: string;
          txid?: string;
          fee?: number;
          autoAdjust?: boolean;
          feeRate?: number;
          toDomain?: string;
        };
      }
    ) {
      const { payload } = action;
      state.dogecoinTx = Object.assign({}, state.dogecoinTx, payload);
    },
    setUtxos(state, action: { payload: Utxo[] }) {
      state.utxos = action.payload;
    },
    reset() {
      return initialState;
    }
  }
});

export const transactionsActions = slice.actions;
export default slice.reducer;
