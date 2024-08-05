import BIP32Factory from 'bip32';
import * as bip39 from 'bip39';
import * as bitcoin from 'bitcoinjs-lib';
import * as ecc from 'tiny-secp256k1';
const bip32 = BIP32Factory(ecc);
export const network = {
  messagePrefix: '\x19Dogecoin Signed Message:\n',
  bech32: 'dc',
  bip44: 3,
  bip32: {
    public: 0x02facafd,
    private: 0x02fac398,
  },
  pubKeyHash: 0x1e,
  scriptHash: 0x16,
  wif: 0x80,
};

export const generatePhrase = () => {
  return bip39.generateMnemonic(128);
}

export const generateRoot = (phrase: string) => {
  console.log(phrase, 'phrase====')
  
  return bip32.fromSeed(bip39.mnemonicToSeedSync(phrase));
}

export const generateChild = (root: any, idx: any) => {
  console.log(root, idx, '----ed')
  return root.derivePath(`m/44'/${network.bip44}'/0'/0/${idx}`);
}

export const generateAddress = (child: { publicKey: any; }) => {
  try {
    const address = bitcoin.payments.p2pkh({
      pubkey: child.publicKey,
      network,
    }).address;
  
    console.log('Generated address:', address);
    return address;
  } catch (error) {
    console.error('Error generating address:', error);
    throw error;
  }
}