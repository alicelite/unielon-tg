import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routesConfig from "./routes";

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

const AppRoutes = () => {
  return (
    <Router>
      <Routes>{generateRoutes(routesConfig)}</Routes>
    </Router>
  );
};

export default AppRoutes;