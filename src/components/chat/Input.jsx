import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { useDefaultProvider } from "../../contexts/default";

function Input({ socket }) {
  const { username } = useDefaultProvider();
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (!message) return;

/*    let packet = {
      origin: "sender",
      user: username,
      message: message,
      room: "sampleroom",
    }; */

    //socket.emit("chat message", packet);
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
    <div>
      <div style={{ marginTop: "60px", zIndex: "999" }}>
        <InputGroup
          className="mb-3"
          onKeyDown={handleKeyDown}
          style={{
            display: "flex",
            /* position: "fixed", */
            bottom: 0,
            /* left: 0, */
            right: 0,
          }}
        >
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
    </div>
  );
}

export default Input;
