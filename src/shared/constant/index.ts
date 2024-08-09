/* eslint-disable quotes */

/* constants pool */
import { AddressType, Chain, NetworkType, RestoreWalletType } from '../types';

export const PASSWORD = '@unielon_PASSWORD';
export const WALLET = '@unielon_WALLET';
export enum CHAINS_ENUM {
  DOGE = 'DOGE'
}

export const CHAINS: Record<string, Chain> = {
  [CHAINS_ENUM.DOGE]: {
    name: 'DOGE',
    enum: CHAINS_ENUM.DOGE,
    logo: '',
    network: 'mainnet'
  }
};

export const ADDRESS_TYPES: {
  value: AddressType;
  label: string;
  name: string;
  hdPath: string;
  displayIndex: number;
  isUnielonLegacy?: boolean;
}[] = [
  {
    value: AddressType.P2PKH,
    label: 'P2PKH',
    name: 'Legacy (P2PKH)',
    hdPath: "m/44'/3'/0'/0",
    displayIndex: 0,
    isUnielonLegacy: false
  }
];

export const RESTORE_WALLETS: { value: RestoreWalletType; name: string; addressTypes: AddressType[] }[] = [
  {
    value: RestoreWalletType.UNIELON,
    name: 'Unielon',
    addressTypes: [AddressType.P2PKH]
  }
];

export const NETWORK_TYPES = [
  { value: NetworkType.MAINNET, label: 'LIVENET', name: 'livenet', validNames: [0, 'livenet', 'mainnet'] },
  { value: NetworkType.TESTNET, label: 'TESTNET', name: 'testnet', validNames: ['testnet'] }
];

export const OPENAPI_URL_MAINNET = 'https://unielon.com';
export const OPENAPI_URL_TESTNET = 'https://future-api.unielon.com';
export const GITHUB_URL = 'https://github.com/unielon-org/unielon-wallet';
export const DISCORD_URL = 'https://discord.gg/unielonwallet';
export const TWITTER_URL = 'https://twitter.com/unielonwallet';
export const CARDINALS_API_V3_URL = 'https://unielon.com/v3';  
export const CARDINALS_API_URL = 'https://utxo.unielon.com';
export const GATE_API_URL = 'https://data.gateapi.io';