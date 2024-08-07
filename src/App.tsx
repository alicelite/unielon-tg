// import AppRoutes from "./routes/index";
// import "./assets/style/var.less"
// function App() {
//   return (
//     <AppRoutes />
//   );
// }
// export default App;
import { useIntegration } from '@telegram-apps/react-router-integration';
import { initNavigator } from '@telegram-apps/sdk-react';
import { useEffect, useMemo } from 'react';
import {
  Route,
  Router,
  Routes,
} from 'react-router-dom';
import Home from "./pages/main/WelcomeScreen";
import "./assets/style/var.less"
function App() {
  const navigator = useMemo(() => initNavigator('app-navigation-state'), []);
  const [location, reactNavigator] = useIntegration(navigator);
  useEffect(() => {
    navigator.attach();
    return () => navigator.detach();
  }, [navigator]);
  return (
    <Router location={location} navigator={reactNavigator}>
      <Routes>
        <Route path={'/'} element={<Home />}/>
      </Routes>
    </Router>
  );
}
export default App;