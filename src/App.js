import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar"
import Button from "react-bootstrap/Button";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import socketIO from "socket.io-client";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Join from "./pages/JoinChat";
import { useDefaultProvider } from "./contexts/default";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const socket = socketIO.connect(process.env.REACT_APP_BACKEND);
function App() {
  const { sideBar, setSideBar, isMobile, setIsMobile } = useDefaultProvider();
  const [sticky, setSticky] = useState(false);

  function handleResize() {
    window.innerWidth < 425 ? setIsMobile(true) : setIsMobile(false);
  }

  function stickNavbar() {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight ? setSticky(true) : setSticky(false);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
    return () => window.removeEventListener("scroll", stickNavbar);
  }, []);

  handleResize();
  return (
    <div>
      <Navbar
        bg="primary"
        variant="light"
        fixed={sticky ? "top" : ""}
        style={{ marginBottom: "5px" }}
      >
        
        <Container>
        {isMobile ? (
          <Button onClick={() => setSideBar(!sideBar)}>
            {sideBar ? (
              <AiOutlineMenuFold size={30} />
            ) : (
              <AiOutlineMenuUnfold size={30} />
            )}
          </Button>
        ) : null}
            <img
              alt="nyanicon"
              src="/nyanicon.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              style={{borderRadius: "50%"}}
            />
          <Navbar.Brand>Chat.NyanCat.se</Navbar.Brand>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home socket={socket} />} />
        <Route path="/chat" element={<Chat socket={socket} />} />
        <Route path="/join/:room" element={<Join socket={socket} />} />
      </Routes>
    </div>
  );
}

export default App;
