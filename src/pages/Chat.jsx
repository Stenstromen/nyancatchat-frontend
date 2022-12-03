import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socketIO from "socket.io-client";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sidebar from "../components/chat/Sidebar";
import Body from "../components/chat/Body";
import Input from "../components/chat/Input";
import axios from "axios";
import { useDefaultProvider } from "../contexts/default";

function Chat({ socket }) {
  const { username, isMobile, sideBar, setSideBar } = useDefaultProvider();
  const [recvMessages, setRecvMessages] = useState([]);
  const [roomUsers, setRoomUsers] = useState([]);
  const [userLeaves, setUserLeaves] = useState("");
  const [userLeavesPop, setUserLeavesPop] = useState(false);
  const colwidth = 3;

  useEffect(() => {
    if (isMobile) {
      console.log("sidebar false");
      setSideBar(false);
    } else {
      console.log("sidebar true");
      setSideBar(true);
    }
  }, [socket]);

  useEffect(() => {
    socket.on("chat message", (msg) => {
      return setRecvMessages((recvMessages) => [...recvMessages, msg]);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("user join", (msg) => {
      console.log("blah");
      console.log(msg);
      console.log(roomUsers);
      return setRoomUsers(msg);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("user joines", (msg) => {
      console.log("running the thing");
      setUserLeavesPop(true);
      setUserLeaves(msg.message);
      setTimeout(() => {
        console.log("done with the thing");
        setUserLeavesPop(false);
        setUserLeaves("");
      }, 3000);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("user leaves", (msg) => {
      console.log("running the thing");
      setUserLeavesPop(true);
      setUserLeaves(msg.message);
      setTimeout(() => {
        console.log("done with the thing");
        setUserLeavesPop(false);
        setUserLeaves("");
      }, 3000);
    });
  }, [socket]);

  useEffect(() => {
    axios.get("http://localhost:8080/getusers/sampleroom").then((response) => {
      return setRoomUsers(response.data);
    });
  }, [socket]);

  return (
    <div>
      <Container fluid>
        <Row>
          {sideBar ? (
            <Col
              sm={colwidth}
              md={colwidth}
              lg={colwidth}
              xl={colwidth}
              xs={colwidth}
              xxl={colwidth}
              style={{ border: "1px solid black", backgroundColor: "#0e4d8f" }}
            >
              <Sidebar socket={socket} roomUsers={roomUsers} />
            </Col>
          ) : null}
          {isMobile ? null : (
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
          )}
          <Col>
            <Row>
              <div style={{ marginBottom: "12%" }}>
                <Body recvMessages={recvMessages} userLeaves={userLeaves} />
              </div>
            </Row>
            <Row>
              <Input
                socket={socket}
                userLeaves={userLeaves}
                userLeavesPop={userLeavesPop}
              />
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Chat;
