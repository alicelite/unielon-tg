import { useNavigate } from 'react-router-dom';
import { Card, Column, Content, Footer, Header, Layout, Row, Text, Button, Icon, NavTabBar } from '@/components';
import { RightOutlined } from '@ant-design/icons';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { spacing } from '@/ui/theme/spacing';
import { fontSizes } from '@/ui/theme/font';
import { DISCORD_URL, TWITTER_URL } from '../../shared/constant';

interface Setting {
  label?: string;
  value?: string;
  desc?: string;
  danger?: boolean;
  action: string;
  route: string;
  right: boolean;
}

const SettingList: Setting[] = [
  {
    label: 'Change Password',
    value: 'Change your lockscreen password',
    desc: '',
    action: 'password',
    route: '/settings/password',
    right: true
  }
];

export default function SettingsTabScreen() {
  const navigate = useNavigate();

  const currentAccount = useCurrentAccount();

  const toRenderSettings = SettingList.filter((v) => {
    if (v.action == 'manage-wallet') {
      v.value = currentAccount.alianName;
    }
    return true;
  });

  return (
    <Layout>
      <Header />
      <Content>
        <Column>
          <div>
            {toRenderSettings.map((item) => {
              if (!item.label) {
                return (
                  <Button
                    key={item.action}
                    style={{ marginTop: spacing.small, height: 50 }}
                    text={item.desc}
                    onClick={() => {
                      navigate(item.route);
                    }}
                  />
                );
              }
              return (
                <Card
                  style={{background: 'rgb(42, 38, 38)'}}
                  key={item.action}
                  mt="lg"
                  onClick={() => {
                    navigate(item.route);
                  }}
                >
                  <Row full justifyBetween>
                    <Column justifyCenter>
                      <Text text={item.label || item.desc} preset="regular-bold" />
                      <Text text={item.value} preset="sub" />
                    </Column>

                    <Column justifyCenter>
                      {item.right && <RightOutlined style={{ color: '#AAA' }} />}
                    </Column>
                  </Row>
                </Card>
              );
            })}
          </div>
          <Row justifyCenter gap="xl" mt="lg" style={{fontSize: '22px'}}>
            <Icon
              icon="discord"
              size={fontSizes.iconMiddle}
              color="textDim"
              onClick={() => {
                window.open(DISCORD_URL);
              }}
            />

            <Icon
              icon="twitter"
              size={fontSizes.iconMiddle}
              color="textDim"
              onClick={() => {
                window.open(TWITTER_URL);
              }}
            />
            {/* 
            <Icon
              icon="github"
              size={fontSizes.iconMiddle}
              color="textDim"
              onClick={() => {
                window.open(GITHUB_URL);
              }}
            /> */}
          </Row>
          {/* <Text text={process.env.version} preset="sub" textCenter /> */}
        </Column>
      </Content>
      <Footer px="zero" py="zero">
        <NavTabBar tab="settings" />
      </Footer>
    </Layout>
  );
}
