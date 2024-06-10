import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SocketContext, socket } from "./context/socket";
import { LoginPage, HomePage, ChatPage } from "./pages/Index";
import { ProtectedRouter } from "./utils/ProtectedRouter";

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route index path="/" element={<HomePage />}></Route>
          <Route path="/chat" element={<ChatPage />}></Route>
        </Routes>
      </BrowserRouter>
    </SocketContext.Provider>
  );
}

export default App;
