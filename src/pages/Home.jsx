import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

import { useDefaultProvider } from "../contexts/default";

function Home({ socket }) {
  const navigate = useNavigate();
  const { username, setUsername, roomName, setRoomName, isMobile } = useDefaultProvider();

  const handleLogin = () => {
    const packet = {
      user: username,
      room: roomName,
    };
    socket.emit("join_room", packet);
    navigate("/chat");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          alt="nyanicon"
          src="/nyanicon.png"
          width={isMobile ? "80%" : "40%"}
          style={{ borderRadius: "50%" }}
        />
        <br />
        <Form.Label style={{ color: "white"}} htmlFor="basic-url">
          Display Name
        </Form.Label>
        <InputGroup style={{width: isMobile ? "" : "50%"}} className="mb-3" onKeyDown={handleKeyDown}>
          <Form.Control
            placeholder="Display Name"
            aria-label="Display Name"
            aria-describedby="basic-addon1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputGroup>
        <Form.Label style={{ color: "white" }} htmlFor="basic-url">
          Chat Room
        </Form.Label>
        <Form>
          <Form.Check
            style={{ color: "white", fontSize: "larger" }}
            type="radio"
            id="default-radio"
            label="Kitty Room"
            checked={roomName === "kittyroom"} 
            value="kittyroom"
            onClick={() => setRoomName("kittyroom")}
          />
          <Form.Check
            style={{ color: "white", fontSize: "larger" }}
            type="radio"
            id="default-radio"
            label="Nyan Room"
            checked={roomName === "nyanroom"} 
            value="nyanroom"
            onClick={() => setRoomName("nyanroom")}
          />
          <Form.Check
            style={{ color: "white", fontSize: "larger" }}
            type="radio"
            id="default-radio"
            label="Doge Room"
            checked={roomName === "dogeroom"} 
            value="dogeroom"
            onClick={() => setRoomName("dogeroom")}
          />
          <Form.Check
            style={{ color: "white", fontSize: "larger" }}
            type="radio"
            id="default-radio"
            label="Pusheen Room"
            checked={roomName === "pusheenroom"} 
            value="pusheenroom"
            onClick={() => setRoomName("pusheenroom")}
          />
        </Form>
        <br />
        <Button onClick={handleLogin} variant="dark">
          Join 😺
        </Button>
      </div>
    </div>
  );
}

export default Home;
