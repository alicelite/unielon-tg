import { NFTsInfo } from '@/shared/types';
import { Card } from '../Card';
import { Column } from '../Column';
import { Text } from '../Text';
import Base64Image from '../Base64Image';
import moment from 'moment';

export interface NFTsCardProps {
  NFTsInfo: NFTsInfo;
  onClick?: () => void;
}

export default function NFTsCard(props: NFTsCardProps) {
  const {
    NFTsInfo: { tick, tick_id, image, holder_address, transactions, update_date, image_path, create_date },
    onClick
  } = props;
  const $imageStyle = {
    objectFit: 'cover',
    width: '100%',
    borderRadius: 0,
  };
  return (
    <Card
      style={{
        backgroundColor: '#141414',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        width: 150,
        minWidth: 150,
        padding: 0,
        minHeight: 180,
        gap: 0,
        flexDirection: 'column'
      }}
      onClick={onClick}
    >
      <Column justifyBetween itemsCenter full style={{backgroundColor: 'rgb(42, 38, 38)'}}>
        {
          image_path && <img src={image_path} alt="" style={$imageStyle} />
        }
      </Column>
      <Column>
        <Text text={tick} color="gold" preset='regular-bold' style={{textAlign: 'right', fontWeight: 'bold', padding: '8px'}}/>
      </Column>
      <Column full style={{backgroundColor: 'rgb(42, 38, 38)',  padding: '8px'}}>
        <Text text={`# ${tick_id}`} color="gold" preset='regular-bold'/>
        <Text text={`${moment.unix(create_date).format('YYYY-MM-DD')}`} color="textDim" />
      </Column>
    </Card>
  );
}
