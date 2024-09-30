import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from '../Button';
import { Column } from '../Column';
import { Popover } from '../Popover';
import { Row } from '../Row';
import { Text } from '../Text';

export const HideTokenPopover = ({ onClose, tick, handleHideToken }: { onClose: () => void, tick: string, handleHideToken: () => void }) => {
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
        <Text text={tick} size='xl' preset='regular-bold'/>
        <Text
          my='lg'
          text="In the future, you can also add this token through add token"
          textCenter
        />

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
            text="Hide"
            preset="danger"
            full
            onClick={handleHideToken}
          />
        </Row>
      </Column>
    </Popover>
  );
};
