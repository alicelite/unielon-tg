import { setLocalValue, setSessionValue } from ".";
import { PASSWORD, WALLET } from "../../shared/constant";
import { encrypt, generateAddress, generateChild, generateRoot } from "./wallet";

export const createAndStoreWallet = async (phrase: any, password: any, dispatch: any) => {
  const root = generateRoot(phrase);
  const child = generateChild(root, 0);
  const address = generateAddress(child);
  dispatch({ type: 'SET_ADDRESS', payload: address });

  const wallet = {
    phrase,
    addresses: [address],
    nicknames: { [address as string]: 'Address 1' },
  };

  const encryptedWallet = encrypt({
    data: wallet,
    password: password,
  });

  setSessionValue({ [PASSWORD]: password });
  await setLocalValue({ [WALLET]: encryptedWallet });

  return address;
};