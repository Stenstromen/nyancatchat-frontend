import { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { useDefaultProvider } from "../../contexts/default";

function Input({ socket, userLeaves, userLeavesPop }) {
  const { username, isMobile, sideBar } = useDefaultProvider();
  const [message, setMessage] = useState("");
  

  const sendMessage = () => {
    if (!message) return;
    socket.emit("chat message", {
      origin: "sender",
      user: username,
      message: message,
      room: "sampleroom",
    });
    setMessage("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };


  return (
    <div
      style={{
        zIndex: "999",
        position: "fixed",
        display: "flex",
        width: isMobile ? "100%" : "75%",
        flexDirection: "column",
        bottom: 0,
      }}
    >
      <Alert
        show={userLeavesPop}
        variant="info"
      >
        <p>{userLeaves}</p>
      </Alert>
      <InputGroup className="mb-3" onKeyDown={handleKeyDown}>
        <Form.Control
          placeholder="Message"
          aria-label="Message"
          aria-describedby="basic-addon1"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={sendMessage} variant="dark">
          Submit
        </Button>
      </InputGroup>
    </div>
  );
}

export default Input;
