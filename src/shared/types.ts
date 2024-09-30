export enum AddressType {
  P2PKH
}

export enum NetworkType {
  MAINNET,
  TESTNET
}

export enum RestoreWalletType {
  UNIELON
}

export enum CHAINS_ENUM {
  DOGE = 'DOGE'
}
export interface Chain {
  name: string;
  logo: string;
  enum: CHAINS_ENUM;
  network: string;
}

export interface AddressAssets {
  total_doge: string;
  satoshis?: number;
  total_inscription: number;
}

export interface Inscription {
  inscriptionId: string;
  inscriptionNumber: number;
  address: string;
  outputValue: number;
  preview: string;
  content: string;
  contentType: string;
  contentLength: number;
  timestamp: number;
  genesisTransaction: string;
  location: string;
  output: string;
  offset: number;
  contentBody: string;
}
export interface TokenBalance {
  isdrc20: any;
  tick: string;
  amt: string;
  last_price: number;
  total_price: string | number
  isHide: boolean
}

export interface Account {
  type: string;
  pubkey?: string;
  address: string;
  brandName?: string;
  alianName?: string;
  displayBrandName?: string;
  index?: number;
  balance?: number;
  key?: string;
  phrase?: string;
  mnemonics?: string;
  wif?: string;
  newAccount?: boolean;
}

export interface Utxo {
  txid: string;
  address: string;
  vout: number;
  value: number;
  outputIndex?: number;
  satoshis?: number;
  script?: string;
  txId?: string;
}
export interface UnspentOutputs {
  utxo: Utxo[];
}
export interface ToAddressInfo {
  address: string;
  domain?: string;
}

export enum KeyringType {
  'HD Key Tree',
  'Simple Key Pair'
};

export type WalletKeyring = {
  address: string;
  alianName: string;
  phrase: string;
  newAccount: boolean;
  type: string;
  wif?: string;
};

export interface TokenBalance {
  isdrc20: any;
  tick: string;
  amt: string;
  last_price: number;
  total_price: string | number
  isHide: boolean
}

export interface DRC20TransferHistory {
  length: any;
  limit: number;
  receive_address: string
}
export interface AddressTokenSummary {
  max_amt: number;
  mint_amt: number;
  tick: string;
  lim: number
}

export interface RawTxInfo {
  opType: string;
  transferType: string | '';
  receiveAddressLength: number | 1;
  ticker: any;
  sendAmout: number | string;
  totalFee: string | number;
  _account: string;
  receiver: string;
  feeAmount: string | number
  rawtx: any;
  toAddressInfo?: ToAddressInfo;
  fee?: number;
  utxo: {
    txId: any;
    outputIndex: number;
    script: string;
    address: any;
    satoshis: number;
  };
  destinationAddress: string;
  amountToSend: number;
  changeAddress: string;
  privateKey: any;
  fromAddress: string
}
