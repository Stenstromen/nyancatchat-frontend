import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

import { useDefaultProvider } from "../contexts/default";

function Home({ socket }) {
  const navigate = useNavigate();
  const { username, setUsername } = useDefaultProvider();
  const room = "sampleroom";

  const handleLogin = () => {
    const packet = {
      user: username,
      room: room,
    };
    socket.emit("join_room", packet);
    navigate("/chat")
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div>
      <InputGroup className="mb-3" onKeyDown={handleKeyDown}>
        <Form.Control
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button onClick={handleLogin} variant="dark">
          Submit
        </Button>
      </InputGroup>
    </div>
  );
}

export default Home;
