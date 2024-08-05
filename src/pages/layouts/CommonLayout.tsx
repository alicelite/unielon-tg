import React from 'react';
import { Outlet } from 'react-router-dom';

const CommonLayout: React.FC = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default CommonLayout;