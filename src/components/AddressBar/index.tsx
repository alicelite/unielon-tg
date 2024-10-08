import { copyToClipboard, shortAddress } from '@/ui/utils';
import { useTools } from '../ActionComponent';
import { Icon } from '../Icon';
import { Row } from '../Row';
import { Text } from '../Text';
import { useCurrentKeyring } from '../../ui/state/keyrings/hooks';

export function AddressBar() {
  const tools = useTools();
  const currentAccount = useCurrentKeyring();
  const { address } = currentAccount;
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
