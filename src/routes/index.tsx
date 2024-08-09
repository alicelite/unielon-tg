import React from "react";

interface Route {
  path: string;
  element?: React.LazyExoticComponent<React.FC>;
  children?: Route[];
}

const routes: Route[] = [
  {
    path: "/",
    element: React.lazy(() => import("../pages/main/WelcomeScreen")),
  },
  {
    path: "/home",
    element: React.lazy(() => import("../pages/main/WalletTabScreen")),
  },
  {
    path: "/account",
    element: React.lazy(() => import("../pages/layouts/CommonLayout")),
    children: [
      {
        path: "create-password",
        element: React.lazy(() => import("../pages/account/CreatePasswordScreen")),
      },
      {
        path: "create-hd-wallet",
        element: React.lazy(() => import("../pages/account/CreateHDWalletScreen")),
      }
    ]
  }
];

export default routes;