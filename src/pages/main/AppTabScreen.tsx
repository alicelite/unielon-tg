import { Card, Column, Content, Footer, Header, Icon, Layout, Row, Text, NavTabBar } from '@/components';
import { useState } from 'react';
import { useTools } from '../../components/ActionComponent';
import { amountToSaothis } from '@/ui/utils';
import { useAccountBalance } from '@/ui/state/accounts/hooks';
import { broadcastDogeTrade, getUtoxsInfo } from '../../shared/cardinals';
import { useCreateDogecoinTxCallback } from '@/ui/state/transactions/hooks';
import { useCurrentKeyring } from '../../ui/state/keyrings/hooks';

export default function AppTabScrren() {
  const tools = useTools();
  // @ts-ignore
  const [canClick, setCanClick] = useState(false)
  const accountBalance = useAccountBalance();
  const currentAccount: any = useCurrentKeyring();
  const createDogecoinTx = useCreateDogecoinTxCallback();

  const handleMergeUtxos = async () => {
    tools.showLoading(true);
    setCanClick(true);
    const { address }= currentAccount
    const mergAmount = amountToSaothis(accountBalance?.amount) - 50000000 - 100000;
    const unspentOutputs: any = await getUtoxsInfo(address, amountToSaothis(accountBalance?.amount), '100000000');
    let unspentUtxo = [];
    // @ts-ignore
    let sendAmount = 0;
    const processUtxos = async (utxos: any) => {
      const amount = utxos.reduce((sum: number, entry: any) => {
        const satoshis = amountToSaothis(entry.satoshis);
        return sum + satoshis;
      }, 0);
      sendAmount = amount / 100000000;
      const toInfo = {
        address: address,
      }
      const commitTx = await createDogecoinTx(toInfo, mergAmount, 50000000, unspentOutputs.utxo);
      const res = await broadcastDogeTrade(commitTx)
      const txid = (res as { data: { tx_hash: string } })?.data?.tx_hash;
      if(txid) {
        tools.showLoading(false);
        setCanClick(false);
        tools.toastSuccess('The merge is successful, and it needs to wait a few minutes for broadcasting.');
      } else {
        tools.toastError(res.msg);
        tools.showLoading(false);
      }
    };

    if (unspentOutputs?.utxos?.length > 600) {
      for (let i = 0; i < unspentOutputs.utxos.length; i += 600) {
        const unspentUtxoBatch = unspentOutputs.utxos.slice(i, i + 600);
        await processUtxos(unspentUtxoBatch);
      }
    } else {
      unspentUtxo = unspentOutputs?.utxos?.length > 0 ? [...unspentOutputs.utxos] : [];
      sendAmount = parseFloat(unspentOutputs?.amount.toFixed(8));
      await processUtxos(unspentUtxo);
    }
  };
  return (
    <Layout>
      <Header />
      <Content>
        <Text mt='xl' text="Inscription Services" preset="regular-bold" />
        <Card preset="style1" style={{background: 'rgb(42, 38, 38)', height: '60px'}}>
          <Row full>
            <Column justifyCenter style={{fontSize: '20px'}}>
              <Icon icon='merge' />
            </Column>

            <Column justifyCenter gap="zero">
              <Text text="Merge Utxos" onClick={handleMergeUtxos} />
            </Column>
          </Row>
        </Card>
      </Content>
      <Footer px="zero" py="zero">
        <NavTabBar tab="app" />
      </Footer>
    </Layout>
  );
}
