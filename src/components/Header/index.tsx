import { useMemo } from 'react';

import { Column } from '../Column';
import { Logo } from '../Logo';
import { Row } from '../Row';
import { Text } from '../Text';
import './index.module.less';

interface HeaderProps {
  title?: string;
  LeftComponent?: React.ReactNode;
  RightComponent?: React.ReactNode;
  children?: React.ReactNode;
}

export function Header(props: HeaderProps) {
  const { title, LeftComponent, RightComponent, children } = props;

  const CenterComponent = useMemo(() => {
    if (children) {
      return children;
    } else if (title) {
      return <Text text={title} preset="regular-bold" />;
    } else {
      return <Logo preset="small" />;
    }
  }, [title]);
  return (
    <div style={{ display: 'block' }}>
      <Row
        justifyBetween
        itemsCenter
        style={{
          height: '67.5px',
          padding: 15
        }}
      >
        <Row full>
          <Column selfItemsCenter>
            {LeftComponent}
          </Column>
        </Row>

        <Row itemsCenter>{CenterComponent}</Row>

        <Row full justifyEnd>
          <Column selfItemsCenter>{RightComponent}</Column>
        </Row>
      </Row>
    </div>
  );
}
