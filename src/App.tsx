import AppRoutes from "./routes/router";
import "./assets/style/var.less"
import { AppStateProvider } from './context/AppStateContext';
function App() {
  return (
    <AppStateProvider>
      <div className="root" >
        <AppRoutes />
      </div>
    </AppStateProvider>
  );
}
export default App;