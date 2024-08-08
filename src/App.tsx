import { useIntegration } from '@telegram-apps/react-router-integration';
import { initNavigator } from '@telegram-apps/sdk-react';
import { useEffect, useMemo } from 'react';
import {
  BrowserRouter,
  Route,
  Router,
  Routes,
} from 'react-router-dom';
import routesConfig from './routes/index';
import "./assets/style/var.less";
import React from "react";
import { isTelegramEnvironment } from "@/ui/utils";
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

function App() {
  const navigator = useMemo(() => initNavigator('app-navigation-state'), []);
  const [location, reactNavigator] = useIntegration(navigator);
  useEffect(() => {
    navigator.attach();
    return () => navigator.detach();
  }, [navigator]);

  if (!isTelegramEnvironment()) {
    return (
      <BrowserRouter>
       <Routes>
        {generateRoutes(routesConfig)}
       </Routes>
      </BrowserRouter>
    )
  }
  return (
    <Router location={location} navigator={reactNavigator}>
      <Routes>
        {generateRoutes(routesConfig)}
      </Routes>
    </Router>
  );
}

export default App;