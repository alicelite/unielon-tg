import { useAccountAddress } from '@/ui/state/accounts/hooks';
import { copyToClipboard, shortAddress } from '@/ui/utils';

import { useTools } from '../ActionComponent';
import { Icon } from '../Icon';
import { Row } from '../Row';
import { Text } from '../Text';

export function AddressBar() {
  const tools = useTools();
  const address = useAccountAddress();
  return (
    <Row
      selfItemsCenter
      itemsCenter
      style={{
        background: 'rgb(42, 38, 38)',
        padding: '8px 16px',
        borderRadius: '5px'
      }}
      onClick={() => {
        copyToClipboard(address).then(() => {
          tools.toastSuccess('Copied');
        });
      }}
    >
      <Text text={shortAddress(address)} color="gold"/>
      <Icon icon="copy" color="gold" />
    </Row>
  );
}
