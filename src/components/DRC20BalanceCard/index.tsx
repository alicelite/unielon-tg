import { TokenBalance } from '../../shared/types';
import { drcToDec, formatNumberDecimal, priceFormat, satoshisToAmount } from '@/ui/utils';
import { Card } from '../Card';
import { Column } from '../Column';
import { Row } from '../Row';
import { Text } from '../Text';

export interface DRC20BalanceCard {
  tokenBalance: TokenBalance;
  onClick?: () => void;
}

export default function DRC20BalanceCard(props: DRC20BalanceCard) {
  const {
    tokenBalance: { tick, amt, last_price, total_price },
    onClick
  } = props;
  return (
    <Card
      style={{
        backgroundColor: '#141414',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        width: '100%',
        minWidth: 150,
        minHeight: 100
      }}
      onClick={onClick}
    >
      <Column full>
        <Row justifyBetween itemsCenter>
          <Text text={tick} color="gold" preset='regular-bold'/>
          <Text text={drcToDec(amt)} color="gold" preset='regular-bold' />
        </Row>
        <Row style={{ borderTopWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }} />
        {
          tick?.length > 10 && tick === 'WDOGE(WRAPPED-DOGE)'
            ? <Row justifyBetween itemsCenter mt='sm'>
              <Text text='Ð1' color='white' />
              <Text text={`Ð${formatNumberDecimal((+satoshisToAmount(amt)), 4)}`} color='white' />
            </Row>
            : <Row justifyBetween itemsCenter mt='sm'>
              <Text text={`Ð${last_price > 0 ? priceFormat(satoshisToAmount(last_price)) : '0.0'}`} color='white' />
              <Text text={`Ð${last_price > 0 ? formatNumberDecimal(+satoshisToAmount(last_price * (+satoshisToAmount(amt))), 4): '0.0'}`} color='white' />
            </Row>
        }
        
        {
          <Row justifyBetween itemsCenter pb='md'>
            <Text text={`≈ $${+total_price > 0 ? priceFormat(total_price): '0.0'}`} color='textDim' />
            <Text text={`≈ $${+total_price > 0 ? formatNumberDecimal((Number(total_price) * (+satoshisToAmount(amt))), 4) : '0.0'}`} color='textDim' />
          </Row>
        }
      </Column>
    </Card>
  );
}
