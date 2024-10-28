import { Outlet } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import { ThemeProvider } from "./components/theme-provider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { RecoilRoot } from "recoil";

function App() {
  return (
    <div className="relative">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RecoilRoot>
          <ToastContainer theme="dark" position="top-center" />
          <Navbar />
          <Outlet />
        </RecoilRoot>
      </ThemeProvider>
    </div>
  );
}

export default App;
