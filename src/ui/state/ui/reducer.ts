import { createSlice } from '@reduxjs/toolkit';

export enum WalletTabScreenTabKey {
  // ALL,
  DRC20,
  NFTs,
  Files
}
export interface UIState {
  walletTabScreen: {
    tabKey: WalletTabScreenTabKey;
  };
}

export const initialState: UIState = {
  walletTabScreen: {
    tabKey: WalletTabScreenTabKey.DRC20
  }
};

const slice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
    updateWalletTabScreen(
      state,
      action: {
        payload: {
          tabKey: WalletTabScreenTabKey;
        };
      }
    ) {
      const { payload } = action;
      state.walletTabScreen = Object.assign({}, state.walletTabScreen, payload);
      return state;
    }
  }
});

export const uiActions = slice.actions;
export default slice.reducer;
