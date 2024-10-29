import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import { ThemeProvider } from "./components/theme-provider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { RecoilRoot } from "recoil";
import Home from "./components/common/Home";
import Auth from "./pages/Auth";
import AgoraRTC, { AgoraRTCProvider, useRTCClient } from 'agora-rtc-react'
import Conference from "./pages/Conference";

function App() {
  const agoraClient = useRTCClient(
    AgoraRTC.createClient({
      mode: 'rtc',
      codec: 'vp8',
    })
  )
  return (
    <div className="relative">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RecoilRoot>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/conference" element={<AgoraRTCProvider client={agoraClient}><Conference /></AgoraRTCProvider>} />
          </Routes>
          <ToastContainer theme="dark" position="top-center" />
        </RecoilRoot>
      </ThemeProvider>
    </div>
  );
}

export default App;
