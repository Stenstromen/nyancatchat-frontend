import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import socketIO from "socket.io-client";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import { useDefaultProvider } from "./contexts/default";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const socket = socketIO.connect("http://localhost:8080");
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
        {isMobile ? (
          <Button onClick={() => setSideBar(!sideBar)}>lol</Button>
        ) : null}
        <Container>
          <Navbar.Brand>Chat.NyanCat.se</Navbar.Brand>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home socket={socket} />} />
        <Route path="/chat" element={<Chat socket={socket} />} />
      </Routes>
    </div>
  );
}

export default App;
