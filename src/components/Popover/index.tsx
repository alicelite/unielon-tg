import React from 'react';

import { Row } from '../Row';
import { Icon } from '../Icon';

export const Popover = ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => {
  return (
    <div
      className="popover-container"
      style={{
        backgroundColor: 'rgba(255,255,255,0.1)'
      }}
    >
      <div style={{ backgroundColor: '#1C1919', width: 340, padding: 20, borderRadius: 5 }}>
        <Row
          justifyEnd
          onClick={() => {
            onClose();
          }}
        >
          <Icon icon="close" color="white" style={{fontSize: '30px'}} />
        </Row>
        {children}
      </div>
    </div>
  );
};
