import { Route, BrowserRouter, Routes } from "react-router-dom";
import routesConfig from "./routes/index";
import "./assets/style/var.less";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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

export type DisplayDataRow = { title: string } & (
  | { type: "link"; value?: string }
  | { value: React.ReactNode }
);
const RedirectHandler = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const startParam = undefined
  console.log("startParam", startParam);
  useEffect(() => {
    console.log("checked", checked)
    if (!checked) {
      const password = localStorage.getItem("password");
      if (startParam) {
        console.log("startParam---", startParam);
        if(password) {
          navigate(`/app_connect/${startParam}`, {
            replace: true,
          });
        } else {
          console.log("welcome---1");
          navigate("/welcome");
        }
      } else {
        if (password) {
          console.log("account/unlock");
          navigate("/account/unlock");
        } else {
          console.log("welcome---2");
          navigate("/welcome");
        }
      }
      setChecked(true);
    }
  }, [navigate, checked, startParam]);

  return null;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <RedirectHandler />
        <Routes>{generateRoutes(routesConfig)}</Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
