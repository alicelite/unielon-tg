import { useIntegration } from '@telegram-apps/react-router-integration';
import { initNavigator } from '@telegram-apps/sdk-react';
import { useEffect, useMemo, useState } from 'react';
import {
  Route,
  Router,
  Routes,
  useNavigate,
} from 'react-router-dom';
import { initViewport } from '@telegram-apps/sdk';
import routesConfig from './routes/index';
import "./assets/style/var.less";
import React from "react";
const [viewport] = initViewport();
const vp = await viewport;

if (!vp.isExpanded) {
    vp.expand();
}
const generateRoutes = (routes: any[]) => {
  return routes.map((route) => {
    const { path, element: Element, children } = route;
    return (
      <Route
        key={path}
        path={path}
        element={
          <React.Suspense fallback={<div>Loading...</div>}>
            {Element ? <Element /> : null}
          </React.Suspense>
        }
      >
        {children && generateRoutes(children)}
      </Route>
    );
  });
};

const RedirectHandler = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!checked) {
      const password = localStorage.getItem('password');
      if (password) {
        navigate('/account/unlock');
      } else {
        navigate('/');
      }
      setChecked(true);
    }
  }, [navigate, checked]);

  return null;
};

function App() {
  const navigator = useMemo(() => initNavigator('app-navigation-state'), []);
  const [location, reactNavigator] = useIntegration(navigator);
  useEffect(() => {
    navigator.attach();
    return () => navigator.detach();
  }, [navigator]);

  return (
    <Router location={location} navigator={reactNavigator}>
      <RedirectHandler />
      <Routes>
        {generateRoutes(routesConfig)}
      </Routes>
    </Router>
  );
}

export default App;