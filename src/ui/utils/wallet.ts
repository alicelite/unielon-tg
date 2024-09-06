import BIP32Factory from 'bip32';
import * as bip39 from 'bip39';
import * as bitcoin from 'bitcoinjs-lib';
import * as ecc from 'tiny-secp256k1';
import * as CryptoJS from 'crypto-js';
import ECPairFactory from 'ecpair';
import * as wif from 'wif';

const bip32 = BIP32Factory(ecc);
const ECPair = ECPairFactory(ecc);

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
  wif: 0x9e,
};

interface WIF {
  version: number;
  privateKey: Buffer;
  compressed: boolean;
}

// const JSONFormatter = {
//   stringify(cipherParams: { ciphertext: { toString: (arg0: any) => any; }; iv: { toString: () => any; }; salt: { toString: () => any; }; }) {
//     // create json object with ciphertext
//     const jsonObj: { ct: any; iv?: any; s?: any } = {
//       ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64),
//     };
//     // optionally add iv or salt
//     if (cipherParams.iv) {
//       jsonObj.iv = cipherParams.iv.toString();
//     }
//     if (cipherParams.salt) {
//       jsonObj.s = cipherParams.salt.toString();
//     }
//     // stringify json object
//     return JSON.stringify(jsonObj);
//   },
//   parse(jsonStr: string) {
//     // parse json string
//     const jsonObj = JSON.parse(jsonStr);
//     // extract ciphertext from json object, and create cipher params object
//     const cipherParams = CryptoJS.lib.CipherParams.create({
//       ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ct),
//     });
//     // optionally extract iv or salt
//     if (jsonObj.iv) {
//       cipherParams.iv = CryptoJS.enc.Hex.parse(jsonObj.iv);
//     }
//     if (jsonObj.s) {
//       cipherParams.salt = CryptoJS.enc.Hex.parse(jsonObj.s);
//     }

//     return cipherParams;
//   },
// };

export const generatePhrase = () => {
  return bip39.generateMnemonic(128);
}

export const generateRoot = (phrase: any) => {
  return bip32.fromSeed(bip39.mnemonicToSeedSync(phrase));
}

export function generateChild(root: any, idx: any) {
  return root.derivePath(`m/44'/${network.bip44}'/0'/0/${idx}`);
}

export function generatePrivateKey(child: any) {
  const privateKeyBuffer = child.privateKey;
  const wifObject: WIF = {
    version: network.wif,
    privateKey: privateKeyBuffer,
    compressed: true,
  };
  const wifKey = wif.encode(wifObject);
  return wifKey;
}

export function getPrivateKey(mnemonics: any) {
  const root = generateRoot(mnemonics);
  const child = generateChild(root, 0);
  const privateKeyBuffer = child.privateKey;
  const wifObject: WIF = {
    version: network.wif,
    privateKey: privateKeyBuffer,
    compressed: true,
  };
  const privateKey = wif.encode(wifObject);
  return privateKey;
}

export function generateAddressFromPrivateKey(privateKey: string): string {
  const decoded = wif.decode(privateKey);
  const privateKeyBuffer = Buffer.from(decoded.privateKey);
  const keyPair = ECPair.fromPrivateKey(privateKeyBuffer, { network });
  const { address } = bitcoin.payments.p2pkh({
    pubkey: keyPair.publicKey,
    network,
  });
  return address!;
}

export function generateAddress(child: any) {
  return bitcoin.payments.p2pkh({
    pubkey: child.publicKey,
    network,
  }).address;
}

// export const encrypt = ({data, password}: { data: any, password: string }) => {
//   const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), password, {
//     format: JSONFormatter,
//   });
//   return encrypted.toString();
// };

// export const decrypt = ({ data, password }: { data: any, password: string }) => {
//   try {
//     const decrypted = CryptoJS.AES.decrypt(data, password, {
//       format: JSONFormatter,
//     });
//     return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
//   } catch (error) {
//     console.log('Error decrypting:', error);
//     return null;
//   }
// };

export const encrypt = (data: any, secretKey: string) =>{
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
}

export const decrypt = (ciphertext: any, secretKey: string) => {
  console.log('Ciphertext:', ciphertext);
  console.log('secretKey:', secretKey);
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

export const hash = (password: any) => {
  return CryptoJS.SHA256(password).toString();
};

export const validatePassword = async (password: any): Promise<boolean> => {
  try {
    const value = localStorage.getItem('password');
    return value !== null && value == password;
  } catch (error) {
    console.error('Error fetching session value:', error);
    return false;
  }
};