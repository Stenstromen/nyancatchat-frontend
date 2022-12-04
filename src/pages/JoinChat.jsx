import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useDefaultProvider } from "../contexts/default";

function JoinChat({ socket }) {
  const { room } = useParams();
  const navigate = useNavigate();
  const {
    username,
    setUsername,
    roomName,
    setRoomName,
    isMobile,
  } = useDefaultProvider();

  const handleLogin = () => {
    socket.emit("join_room", { user: username, room: roomName });
    navigate("/chat");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  useEffect(() => {
    setRoomName(room);
  }, [socket, roomName, room, setRoomName])

  return (
    <div>
      <Modal show={true} style={{marginTop: isMobile ? "90px" : "100px"}}>
        <Modal.Header>
          <Modal.Title>Plz Join</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You have been asked to join{" "}
          <strong>
            <em>{room}</em>
          </strong>
          , please chose a username below
        </Modal.Body>
        <InputGroup className="mb-3" onKeyDown={handleKeyDown}>
          <InputGroup.Text id="basic-addon1">Username</InputGroup.Text>
          <Form.Control
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputGroup>
        <Modal.Footer>
          <Button onClick={handleLogin} variant="primary">
            Enter Chat
          </Button>
        </Modal.Footer>
      </Modal>
      <h1>😸😸😸😸</h1>
    </div>
  );
}

export default JoinChat;
