import { Row } from '../Row';
import logo from "@/assets/wallet-logo.png"
export function Logo(props: { preset?: 'large' | 'small' }) {
  const { preset } = props;
  if (preset === 'large') {
    return (
      <Row justifyCenter itemsCenter>
        <img src={logo} style={{ width: '140px', height: 'inherit' }} alt="" />
      </Row>
    );
  } else {
    return (
      <Row justifyCenter itemsCenter>
        <img src={logo} style={{ width: '100px', height: 'inherit' }} alt="" />
      </Row>
    );
  }
}
