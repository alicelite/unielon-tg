// import AppRoutes from "./routes/index";
// import "./assets/style/var.less"
// function App() {
//   return (
//     <AppRoutes />
//   );
// }
// export default App;
import { Route, Routes } from "react-router-dom";
import Home from "./pages/main/WelcomeScreen";
import "./assets/style/var.less"
function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
    </Routes>
  );
}
export default App;