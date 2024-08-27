import { useLocation } from 'react-router-dom';
import SignPsbt from './SignPsbt';
import { useTools } from '@/components/ActionComponent';
import { broadcastDogeTrade } from '@/shared/cardinals';
import { useNavigate } from 'react-router-dom';
import { setBroadcastInfo } from '@/ui/utils/hooks';
import { broadcastItem } from '../../ui/utils/hooks';
export default function TxConfirmScreen() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { rawTxInfo } = state;
  const tools = useTools();

  const handleConfirm = async () => {
    tools.showLoading(true);
    const res = await broadcastDogeTrade(rawTxInfo.commitTx)
    
    const txid = (res as { data: { tx_hash: string } })?.data?.tx_hash;
    if(txid) {
      tools.showLoading(false);
      const result = broadcastItem(rawTxInfo, txid)
      setBroadcastInfo(rawTxInfo.currentAccount, result)
      navigate('/tx-success', { state: {txid} });
    } else {
      tools.toastError(res.msg);
      tools.showLoading(false);
    }
  };

  const handleCancel = () => {
    window.history.go(-1);
  };

  return (
    <SignPsbt
      rawTxInfo={rawTxInfo}
      handleCancel={handleCancel}
      handleConfirm={handleConfirm}
    />
  );
}