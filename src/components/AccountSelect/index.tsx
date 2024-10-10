
import { useNavigate } from 'react-router-dom';
import { Icon } from '../Icon';
import { Row } from '../Row';
import { Text } from '../Text';
import './index.less';
import { shortAddress } from '../../ui/utils';
import { useCurrentKeyring } from '../../ui/state/keyrings/hooks';

export function AccountSelect() {
  const navigate = useNavigate();
  const currentAccount = useCurrentKeyring()
  return (
    <Row
      justifyBetween
      px="md"
      py="md"
      bg="card"
      rounded
      onClick={() => {
        navigate('/account/switch-account');
      }}
    >
      <Icon icon="user" />
      <Text text={shortAddress(currentAccount?.alianName, 8)} />
      <Icon icon="down" />
    </Row>
  );
};