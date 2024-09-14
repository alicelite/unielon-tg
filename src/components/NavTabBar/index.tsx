import { Column } from '../Column';
import { Grid } from '../Grid';
import { Icon, IconTypes } from '../Icon';
import { useNavigate } from 'react-router-dom';
import { colors } from '@/ui/theme/colors';

type TabOption = 'home' | 'app' | 'settings';
export function NavTabBar({ tab }: { tab: TabOption }) {
  return (
    <Grid columns={3} style={{ width: '100%', height: '67.5px', backgroundColor: colors.bg2 }}>
      <TabButton tabName="home" icon="wallet" isActive={tab === 'home'} />
      <TabButton tabName="app" icon="grid" isActive={tab === 'app'} />
      <TabButton tabName="settings" icon="settings" isActive={tab === 'settings'} />
    </Grid>
  );
}

function TabButton({ tabName, icon, isActive }: { tabName: TabOption; icon: IconTypes; isActive: boolean }) {
  const navigate = useNavigate();
  return (
    <Column
      justifyCenter
      itemsCenter
      style={{fontSize: '24px'}}
      onClick={() => {
        if (tabName === 'home') {
          navigate('/home');
        } else if (tabName === 'app') {
          navigate('/app');
        } else if (tabName === 'settings') {
          navigate('/settings');
        }
      }}
    >
      <Icon icon={icon} color={isActive ? 'white' : 'white_muted'} />
    </Column>
  );
}
