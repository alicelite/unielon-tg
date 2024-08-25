import { useEffect, useState } from 'react';
import { shortAddress } from '@/ui/utils';

import { AddressDetailPopover } from '../AddressDetailPopover';
import { Column } from '../Column';
import { Row } from '../Row';
import { Text } from '../Text';
import { ToAddressInfo } from '../../shared/types';
import { ColorTypes } from '../../ui/theme/colors';

export const AddressText = (props: {
  address?: string;
  type?: string;
  addressInfo?: ToAddressInfo;
  receiveAddressLength?: number;
  textCenter?: boolean;
  color?: ColorTypes;
  removeReceiverAddress?: (newValue: string) => void; 
}) => {
  const [popoverVisible, setPopoverVisible] = useState(false);
  const rowStyle = {
    justifyContent: 'space-between'
  }
  const [addresses, setAddresses] = useState<string[]>([]);
  const { address, addressInfo } = props
  useEffect(() => {
    if (address) {
      setAddresses(address?.split(','));
    } else if (addressInfo && addressInfo?.address) {
      setAddresses(addressInfo.address.split(','))
    } else {
      setAddresses([]);
    }
  }, [address, addressInfo]);

  const handleRemove = (addr: string) =>{
    const updatedAddresses = addresses?.filter(address => address !== addr);
    setAddresses(updatedAddresses);
  }

  return (
    <Column>
      {addresses.map((addr, index) => (
        <Column
          key={index}
        >
          <Row itemsCenter style={props?.type === 'batch' ? rowStyle : {}}>
            <Text text={shortAddress(addr)} color={props.color || 'white'} />
            {
              props?.type === 'batch' && (props?.receiveAddressLength ?? 0) > 1 && <Text text='remove' color='gold' size='xs' onClick={() =>handleRemove(addr)}/>
            }
            
          </Row>
          {popoverVisible && (
            <AddressDetailPopover
              address={addr}
              onClose={() => {
                setPopoverVisible(false);
              }}
            />
          )}
        </Column>
      ))}
    </Column>
  );
};
