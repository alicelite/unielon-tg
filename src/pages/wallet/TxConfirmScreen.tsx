import { useLocation } from 'react-router-dom';
import SignPsbt from './SignPsbt';
import { useTools } from '@/components/ActionComponent';
import { broadcastDogeTrade } from '@/shared/cardinals';
import { useNavigate } from 'react-router-dom';
import { setBroadcastInfo } from '@/ui/utils/hooks';
import { broadcastItem, createDrcInscription } from '../../ui/utils/hooks';
import { satoshisToAmount } from '../../ui/utils';
import { INSUFFICIENT_BALANCE_ERROR } from '../../shared/constant';
import { useAccountBalance } from '../../ui/state/accounts/hooks';
export default function TxConfirmScreen() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { rawTxInfo } = state;
  console.log('rawTxInfo----', rawTxInfo);
  const tools = useTools();
  const balance = useAccountBalance();
  const handleConfirm = async () => {
    tools.showLoading(true);
    if(rawTxInfo.transferType) {
      tools.showLoading(true);
      const { _account, feeRate, ticker, receiver, privateKey, amountToSend } = rawTxInfo
      const inscriptionParams = `{"p":"drc-20","op":"transfer","tick": "${ticker}" ,"amt": "${amountToSend}","receiveAddr": "${receiver}"}`
      console.log(inscriptionParams, 'inscriptionParams---------mmmmm')
      const utxoTotal = Number(feeRate) * 2
      console.log(balance, '===balance', utxoTotal)
      if(+balance.amount < +satoshisToAmount(utxoTotal)) {
        return INSUFFICIENT_BALANCE_ERROR
      }
      const res: any = await createDrcInscription(inscriptionParams, _account, privateKey, balance, utxoTotal, 1, 'transfer')
      console.log(res, 'res========createDrcInscription')
      const txid = res?.boardcastCallbackFee.data.tx_hash
      if(txid) {
        tools.showLoading(false);
        const result = broadcastItem(rawTxInfo, txid)
        setBroadcastInfo(rawTxInfo.currentAccount, result)
        navigate('/tx-success', { state: {txid} });
      } else {
        tools.toastError(res.msg);
        tools.showLoading(false);
      }
    } else {
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