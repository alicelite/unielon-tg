import { CHAINS_ENUM } from './constant';

export enum AddressType {
  P2PKH,
  P2SH
}

export enum NetworkType {
  MAINNET,
  TESTNET
}

export enum RestoreWalletType {
  UNIELON
}

export interface Chain {
  name: string;
  logo: string;
  enum: CHAINS_ENUM;
  network: string;
}

export interface DogecoinBalance {
  confirm_amount: number;
  pending_amount: string;
  amount: number;
  usd_value: string;
  // incoming: string;
  // incomingPending: string
}

export interface AddressAssets {
  total_doge: string;
  satoshis?: number;
  total_inscription: number;
}

export interface TxHistoryItem {
  symbol: string;
  address: string;
  blockNumber: null;
  amount: any;
  value_sent: any;
  value_received: any;
  block: number,
  hash: string,
  price: string
  time: number
  value: string
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

export interface InscriptionMintedItem {
  title: string;
  desc: string;
  inscriptions: Inscription[];
}

export interface InscriptionSummary {
  mintedList: InscriptionMintedItem[];
}

export interface AppInfo {
  logo: string;
  title: string;
  desc: string;
  url: string;
}

export interface AppSummary {
  apps: {
    tag: string;
    list: AppInfo[];
  }[];
}

export interface FeeSummary {
  high_fee_per_kb: any;
  low_fee_per_kb: any;
  medium_fee_per_kb: any;
  list: {
    title: string;
    desc: string;
    feeRate: number;
  }[];
}
export interface getFeeList {
  feeTypes: any[];
  hight: number;
  inscribeFee: string;  
  low: number;
  medium: number;
  rateFee: string;
  usdtPrice: string;
}
export interface UTXO {
  index: number;
  hash: string;
  address: string;
  tx_hex: any;
  txId: string;
  outputIndex: number;
  satoshis: number;
  script: string;
  addressType: AddressType;
  inscriptions: {
    id: string;
    num: number;
    offset: number;
  }[];
}

export enum TxType {
  SIGN_TX,
  SEND_DOGECOIN,
  SEND_INSCRIPTION
}

export interface ToSignInput {
  index: number;
  publicKey: string;
  sighashTypes?: number[];
}
export type WalletKeyring = {
  key: string;
  index: number;
  type: string;
  addressType: AddressType;
  accounts: Account[];
  alianName: string;
  hdPath: string;
};

export interface DRC20New {
  order_id: any;
  fee_address: any;
  amt: string;
  op: string;
  p: string;
  rate_fee: string;
  receive_address: string;
  repeat: number,
  tick: string;
}
export interface Account {
  type: string;
  pubkey: string;
  address: string;
  brandName?: string;
  alianName?: string;
  displayBrandName?: string;
  index?: number;
  balance?: number;
  key: string;
}

export interface InscribeOrder {
  orderId: string;
  payAddress: string;
  totalFee: number;
  minerFee: number;
  originServiceFee: number;
  serviceFee: number;
  outputValue: number;
}

export interface NFTsInfo {
  tick: string;
  tick_id: string;
  image: string;
  holder_address: string;
  transactions: string | number;
  update_date: string | number;
  create_date: string | number;
  image_path: string;
}

export interface FilesInfo {
  tick: string;
  file_id: string;
  image: string;
  holder_address: string;
  transactions: string | number;
  update_date: string | number;
  create_date: string | number;
  file_path: string;
}

export interface TokenBalance {
  isdrc20: any;
  tick: string;
  amt: string;
  last_price: number;
  total_price: string | number
  isHide: boolean
}
export interface DRC20OrdersInfo {
  limit: number;
  receive_address: string
}

export interface DRC20TransferHistory {
  limit: number;
  receive_address: string
}

export interface NFTsTransferHistory {
  limit: number;
  holder_address: string;
  offset: string | number
}
export interface FilesTransferHistory {
  limit: number;
  holder_address: string;
  offset: string | number
}
export interface DRC20TokenPrice {
  last_price: number;
  tick: string
}
export interface TokenInfo {
  totalSupply: string;
  totalMinted: string;
}

export enum TokenInscriptionType {
  INSCRIBE_TRANSFER,
  INSCRIBE_MINT
}
export interface TokenTransfer {
  ticker: string;
  amount: string;
  inscriptionId: string;
  inscriptionNumber: number;
  timestamp: number;
}

export interface AddressTokenSummary {
  max_amt: number;
  mint_amt: number;
  tick: string;
  lim: number
}
export interface Drc20NewList {
  amt: string;
  receive_address: string;
  rate_fee: string;
  repeat: number;
  tick: string;
}
export interface Drc20OrderAddress {
  amt: number;
  tick: string;
  lim: number
}

export interface DecodedPsbt {
  inputInfos: {
    txid: string;
    vout: number;
    address: string;
    value: number;
    inscriptions: Inscription[];
    sighashType: number;
  }[];
  outputInfos: {
    address: string;
    value: number;
    inscriptions: Inscription[];
  }[];
  feeRate: number;
  fee: number;
}

export interface ToAddressInfo {
  address: string;
  domain?: string;
  inscription?: Inscription;
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
