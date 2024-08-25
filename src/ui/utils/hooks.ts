import { getLocalValue, setLocalValue, setSessionValue } from ".";
import { PASSWORD, WALLET } from "../../shared/constant";
import { accountActions } from "../state/accounts/reducer";
import { decrypt, encrypt, generateAddress, generateChild, generateRoot } from "./wallet";

export const decryptWallet = () => {
  return new Promise((resolve, reject) => {
    Promise.all([getLocalValue(WALLET), getLocalValue('password')])
      .then(([wallet, password]) => {
        const decryptedWallet = decrypt({
          data: wallet,
          password: password.toString(),
        });
        console.log('Decrypted Wallet:', decryptedWallet);
        resolve(decryptedWallet);
      })
      .catch(error => {
        console.error('Error during decryption:', error);
        reject(error);
      });
  });
};
export const createAndStoreWallet = async (phrase: any, password: any, isImport: boolean, dispatch: any) => {
  const root = generateRoot(phrase);
  const child = generateChild(root, 0);
  const address = generateAddress(child);
  const localWallet = await decryptWallet();
  const walletList = Array.isArray(localWallet) ? localWallet : [];
  const wallet = {
    phrase,
    addresses: address,
    nicknames: { [address as string]: 'Address 1' },
    type: isImport ? 'Simple Key Pair' : 'HD Key Tree'
  };
  walletList.push(wallet)
 
  dispatch(accountActions.setAccounts(walletList));
  const encryptedWallet = encrypt({
    data: wallet,
    password: password,
  });

  setSessionValue({ [PASSWORD]: password });
  await setLocalValue({ [WALLET]: encryptedWallet });
}
export const generateAccount = async (phrase: any, dispatch: any) => {
  const root = generateRoot(phrase);
  const child = generateChild(root, 0);
  const address = generateAddress(child);
  dispatch({ type: 'SET_ADDRESS', payload: address });
  return address;
};
