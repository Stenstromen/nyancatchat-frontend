import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import { useDefaultProvider } from "../contexts/default";

function Chat({ socket }) {
  const { username } = useDefaultProvider();
  const [message, setMessage] = useState("");
  const [recvMessages, setRecvMessages] = useState([]);

  useEffect(() => {
    socket.on("chat message", (msg) => {
      //console.log(msg);
      //setRecvMessages([...recvMessages, msg])
      //setRecvMessages(recvMessages.concat(msg))
      /* let message = []
      message.push(msg) */
      console.log(recvMessages)
      return setRecvMessages(recvMessages => [...recvMessages, msg])
      //recvMessages.appendChild(msg)
    });

    //socket.on('chat message', (data) => setRecvMessages([...recvMessages, data]));
    //console.log("running")
  }, [socket]);

  const sendMessage = () => {
    let packet = {
      origin: "sender",
      user: username,
      message: message,
      room: "sampleroom",
    };

    socket.emit("chat message", packet);

    /* if (input.value) {
          socket.emit('chat message', packet);
          input.value = '';
          socket.emit("typing", {user: "<%= username %>", room: "<%= room %>", typing: false})
        }
        messageBox.scrollTop = messageBox.scrollHeight; */
  };

  return (
    <div>
      <div>
        <Card style={{ width: "18rem" }}>
          <ListGroup variant="flush">
            {
                recvMessages.map((item) => {
                    <ListGroup.Item>{item.message}</ListGroup.Item>
                })
            }

            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
      <div>
        <InputGroup
          className="mb-3"
          style={{ position: "absolute", bottom: "0" }}
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

export default Chat;
