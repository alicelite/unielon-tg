import { useEffect, useMemo } from 'react';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from '../Button';
import { Card } from '../Card';
import { Column } from '../Column';
import { Popover } from '../Popover';
import { Row } from '../Row';
import { Text } from '../Text';
import { WalletKeyring } from '../../shared/types';
import { useAppDispatch } from '@/ui/state/hooks';
import { shortAddress } from '@/ui/utils';
import { useAccounts } from '@/ui/state/accounts/hooks';
import { accountActions } from '@/ui/state/accounts/reducer';
import { setLocalValue } from '../../ui/utils';
import { WALLET } from '../../shared/constant';
import { encrypt } from '../../ui/utils/wallet';
import { keyringsActions } from '../../ui/state/keyrings/reducer';

export const RemoveWalletPopover = ({ keyring, onClose }: { keyring: WalletKeyring; onClose: () => void }) => {
  const accounts = useAccounts();
  const dispatch = useAppDispatch();
  const displayAddress = useMemo(() => {
    const address = keyring.address;
    return shortAddress(address);
  }, [keyring]);
  useEffect
  return (
    <Popover onClose={onClose}>
      <Column justifyCenter itemsCenter>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: '1.5rem',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: '#CC3333',
            justifyContent: 'center'
          }}
        >
          <FontAwesomeIcon icon={faTrashCan} style={{ height: '1rem' }} />
        </div>

        <Card preset="style2" style={{ width: 200 }}>
          <Column>
            <Text text={keyring.alianName} textCenter />
            <Text text={displayAddress} preset="sub" textCenter />
          </Column>
        </Card>
        <Text
          text="Please pay attention to whether you have backed up the mnemonic/private key to prevent asset loss"
          textCenter
        />

        <Text text="This action is not reversible." color="danger" />
        <Row full>
          <Button
            text="Cancel"
            full
            onClick={() => {
              if (onClose) {
                onClose();
              }
            }}
          />
          <Button
            text="Remove"
            preset="danger"
            full
            onClick={async () => {
              const newAccounts = accounts.filter((item: any) => item.address !== keyring.address);
              const password: any = localStorage.getItem('password');
              const encryptedWallet = encrypt(newAccounts, password);
              setLocalValue({ [WALLET]: encryptedWallet });
              dispatch(keyringsActions.setCurrent(newAccounts[newAccounts.length - 1]))
              dispatch(accountActions.setCurrent(newAccounts[newAccounts.length - 1]));
              dispatch(accountActions.setAccounts(newAccounts));
              onClose();
            }}
          />
        </Row>
      </Column>
    </Popover>
  );
};
