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
  pubkey: string;
  address: string;
  brandName?: string;
  alianName?: string;
  displayBrandName?: string;
  index?: number;
  balance?: number;
  key: string;
}