import { useEffect, useMemo, useState } from 'react';
import { COIN_DUST } from '@/shared/constant';
import { Layout, Content, Button, Header, Icon, Text, Input, Column, Row, FeeRateBar } from '@/components';
import { useNavigate } from 'react-router-dom';
import { useAccountBalance } from '@/ui/state/accounts/hooks';
import {
  useCreateDogecoinTxCallback,
} from '@/ui/state/transactions/hooks';
import { amountToSaothis, isValidAddress, satoshisToAmount } from '@/ui/utils';
import { useTools } from '@/components/ActionComponent';
import { useAccountAddress } from '@/ui/state/accounts/hooks';
import { getUtoxsInfo } from '@/shared/cardinals';
import { UnspentOutputs } from '../../shared/types';
import { transactionsActions } from '@/ui/state/transactions/reducer';
import { useAppDispatch } from '@/ui/state/hooks';

export default function TxCreateScreen() {
  const accountBalance = useAccountBalance();
  console.log(accountBalance, 'accountBalance')
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [inputAmount, setInputAmount] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [toInfo, setToInfo] = useState<{
    address: string;
    domain: string;
  }>({
    address: '',
    domain: '',
  });
  const [feeRate, setFeeRate] = useState(5);
  const [error, setError] = useState('');
  const [autoAdjust, setAutoAdjust] = useState(false);
  const tools = useTools();
  const createDogecoinTx = useCreateDogecoinTxCallback();
  const safeBalance = useMemo(() => amountToSaothis(accountBalance.amount) - feeRate, [accountBalance.amount, feeRate]);
  const toSatoshis = useMemo(() => (inputAmount ? amountToSaothis(inputAmount) : 0), [inputAmount]);
  const dustAmount = useMemo(() => satoshisToAmount(COIN_DUST), []);

  const validateInputs = () => {
    setError('');
    setDisabled(true);
    if (!isValidAddress(toInfo.address)) return;
    if (!toSatoshis) return;
    if (toSatoshis < COIN_DUST) {
      setError(`Amount must be at least ${dustAmount} DOGE`);
      return;
    }
    if (feeRate <= 0) return;
    setDisabled(!inputAmount || !toInfo.address);
  };

  useEffect(validateInputs, [toInfo, inputAmount, autoAdjust, feeRate]);
  const address = useAccountAddress();

  const getUnspentOutputs = async () => {
    const mergAmount = amountToSaothis(inputAmount) + feeRate;
    const unspentOutputs = await getUtoxsInfo(address, mergAmount, '100000000') as UnspentOutputs;
    dispatch(transactionsActions.setUtxos(unspentOutputs.utxo));
    return unspentOutputs.utxo;
  };
  const showAvailableBalance = useMemo(() => {
    const isShowAvailableBalance = amountToSaothis(accountBalance.amount) < amountToSaothis(inputAmount) + feeRate
    return isShowAvailableBalance;
  } , [inputAmount, feeRate, accountBalance.amount]);
  useEffect(() => {
    setDisabled(showAvailableBalance)
  } ,[showAvailableBalance])
  const jumpConfirm = async () => {
    tools.showLoading(true);
    const unspentOutputs = await getUnspentOutputs();
    if (unspentOutputs?.length > 600) {
      tools.toastError('Please merge utox first');
      return;
    }
    try {
      const commitTx = await createDogecoinTx(toInfo, toSatoshis, feeRate);
      if(commitTx) {
        const rawTxInfo = { commitTx, toAddress: toInfo.address, spendAmount: inputAmount, feeRate };
        navigate('/tx-confirm', {state : { rawTxInfo } });
      }
      setDisabled(false);
    } catch (e: any) {
      setError(e.message);
    } finally {
      tools.showLoading(false);
    }
  };
  useEffect(() => {
    if (inputAmount > accountBalance.amount) {
      setError('Amount exceeds your available balance');
      return;
    }
  }, [inputAmount, accountBalance.amount])
  return (
    <Layout>
      <Header onBack={() => window.history.go(-1)} title="Send DOGE" />
      <Content>
        <Column full>
          <Row justifyCenter>
            <Icon icon="doge" size={50} />
          </Row>
          <Column mt="lg">
            <Text text="Recipient" preset="regular" color="textDim" />
            <Input
              preset="address"
              addressInputData={toInfo}
              onAddressInputChange={setToInfo}
              autoFocus
            />
          </Column>
          <Column mt="lg">
            <Row justifyBetween>
              <Text text="Balance" color="textDim" />
              <Row
                  itemsCenter
                  style={{ gap: 4 }}
                >
                  <Text text={`${accountBalance.amount} DOGE`} preset="bold" size="sm" />
                </Row>
            </Row>

            <Input
              preset="amount"
              placeholder="Amount"
              style={{ minHeight: '28px' }}
              defaultValue={inputAmount}
              onChange={(e: any)  => {
                if (autoAdjust) setAutoAdjust(false);
                setInputAmount(e.target.value);
              }}
            />
              {showAvailableBalance && (
              <Row justifyBetween>
                <Text text="Available (safe to send)" color="red" size="xs" />
                <Row
                  itemsCenter
                  style={{ gap: 4 }}
                >
                  <Text text="MAX" color={autoAdjust ? 'yellow' : 'textDim'} style={{ fontSize: '12px' }} />
                  <Text text={`${Number(satoshisToAmount(safeBalance)).toFixed(6)} DOGE`} preset="bold" size="sm" />
                </Row>
              </Row>
            )}
          </Column>

          <Column mt="lg">
            <Text text="Fee" color="textDim" />
            <FeeRateBar
              isPage={false}
              onChange={(val: any) => {
                setFeeRate(val);
              }}
            />
          </Column>
          {error && <Text text={error} color="error" />}
        </Column>
        <Button disabled={disabled} preset="primary" text="Next" onClick={jumpConfirm} />
      </Content>
    </Layout>
  );
}