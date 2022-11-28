import { Routes, Route } from "react-router-dom";
import socketIO from "socket.io-client";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


const socket = socketIO.connect("http://localhost:8080");
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home socket={socket} />} />
        <Route path="/chat" element={<Chat socket={socket} />} />
      </Routes>
    </div>
  );
}

export default App;
