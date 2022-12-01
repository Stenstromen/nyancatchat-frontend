import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socketIO from "socket.io-client";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sidebar from "../components/chat/Sidebar";
import Body from "../components/chat/Body";
import Input from "../components/chat/Input";
import { useDefaultProvider } from "../contexts/default";

function Chat({ socket }) {
  const { username } = useDefaultProvider();
  const [recvMessages, setRecvMessages] = useState([]);
  const [roomUsers, setRoomUsers] = useState([]);
  const colwidth = 3;

  useEffect(() => {
    socket.on("chat message", (msg) => {
      //console.log(msg);
      return setRecvMessages((recvMessages) => [...recvMessages, msg]);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("user join", (msg) => {
      console.log("blah");
      console.log(msg);
      console.log(roomUsers)
      return setRoomUsers(msg);
    });
  }, [socket]);

  return (
    <div>
      <Container fluid>
        <Row>
          <Col
            sm={colwidth}
            md={colwidth}
            lg={colwidth}
            xl={colwidth}
            xs={colwidth}
            xxl={colwidth}
            style={{ border: "1px solid black" }}
          >
            <Sidebar socket={socket} roomUsers={roomUsers} />
          </Col>
          <Col>
            <Row>
              <div style={{ marginBottom: "12%" }}>
                <Body recvMessages={recvMessages} />
              </div>
            </Row>
            <Row>
              <Input socket={socket} />
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Chat;
