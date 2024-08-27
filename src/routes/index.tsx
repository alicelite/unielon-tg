import React from "react";
import { WALLET } from "../shared/constant";

interface Route {
  path: string;
  element?: React.LazyExoticComponent<React.FC>;
  children?: Route[];
}

const getRootElement = () => {
  const password = localStorage.getItem('password') && localStorage.getItem(WALLET);
  if (password) {
    return React.lazy(() => import("../pages/account/UnlockScreen"));
  } else {
    return React.lazy(() => import("../pages/main/WelcomeScreen"));
  }
};

const routes: Route[] = [
  {
    path: "/",
    element: getRootElement(),
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
      },
      {
        path: "unlock",
        element: React.lazy(() => import("../pages/account/UnlockScreen")),
      },
      {
        path: "switch-keyring",
        element: React.lazy(() => import("../pages/account/SwitchKeyringScreen")),
      }
    ]
  },
  {
    path: "/tx-create",
    element: React.lazy(() => import("../pages/wallet/TxCreateScreen")),
  },
  {
    path: "/tx-confirm",
    element: React.lazy(() => import("../pages/wallet/TxConfirmScreen")),
  },
  {
    path: "/tx-success",
    element: React.lazy(() => import("../pages/wallet/TxSuccessScreen")),
  },
  {
    path: "/receive",
    element: React.lazy(() => import("../pages/wallet/ReceiveScreen")),
  },
  {
    path: "/history",
    element: React.lazy(() => import("../pages/wallet/HistoryScreen")),
  }
];

export default routes;