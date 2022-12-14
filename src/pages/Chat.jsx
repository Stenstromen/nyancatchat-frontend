import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sidebar from "../components/chat/Sidebar";
import Body from "../components/chat/Body";
import Input from "../components/chat/Input";
import axios from "axios";
import { useDefaultProvider } from "../contexts/default";

function Chat({ socket }) {
  const { username, roomName, isMobile, sideBar, setSideBar } =
    useDefaultProvider();
  const [recvMessages, setRecvMessages] = useState([]);
  const [roomUsers, setRoomUsers] = useState([]);
  const [userLeaves, setUserLeaves] = useState("");
  const [userLeavesPop, setUserLeavesPop] = useState(false);
  const [typingStatus, setTypingStatus] = useState("");
  const colwidth = 3;

  const notifyUser = (user, msg) => {
    if (!("Notification" in window)) return;
    if (Notification.permission === "granted") {
      const notification = new Notification("NyanCatChat Message", {
        icon: "https://chat.nyancat.se/nyanicon.png",
        body: user + " - " + msg,
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          const notification = new Notification("NyanCatChat Message", {
            icon: "https://chat.nyancat.se/nyanicon.png",
            body: user + " - " + msg,
          });
        }
      });
    }
  };

  useEffect(() => {
    if (isMobile) return setSideBar(false);
  }, [socket, isMobile, setSideBar]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND}/getmessages/${roomName}/${username}`,
        {
          headers: {
            authorization: process.env.REACT_APP_AUTHORIZATION,
          },
        }
      )
      .then((response) => {
        setRecvMessages(response.data);
      });
  }, [roomName, username]);

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setTypingStatus("");
      if (msg.origin === "server") notifyUser(msg.user, msg.message);
      return setRecvMessages((recvMessages) => [...recvMessages, msg]);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("user join", (msg) => {
      return setRoomUsers(msg);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("user joines", (msg) => {
      setUserLeavesPop(true);
      setUserLeaves(msg.message);
      notifyUser(msg.room, msg.message);
      setTimeout(() => {
        setUserLeavesPop(false);
        setUserLeaves("");
      }, 3000);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("user leaves", (msg) => {
      setUserLeavesPop(true);
      setUserLeaves(msg.message);
      notifyUser(msg.room, msg.message);
      setTimeout(() => {
        setUserLeavesPop(false);
        setUserLeaves("");
      }, 3000);
    });
  }, [socket]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/getusers/${roomName}`, {
        headers: {
          authorization: process.env.REACT_APP_AUTHORIZATION,
        },
      })
      .then((response) => {
        return setRoomUsers(response.data);
      });
  }, [socket, roomName]);

  useEffect(() => {
    socket.on("typing Response", (msg) => {
      setTypingStatus(msg.user);
      if (msg.user) {
        setTypingStatus(msg.user);
      } else {
        setTimeout(() => {
          setTypingStatus("");
        }, 2000);
      }
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
              style={{ backgroundColor: "#0e4d8f", zIndex: "999" }}
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
              style={{ backgroundColor: "#0e4d8f", zIndex: "999" }}
            >
              <Sidebar socket={socket} roomUsers={roomUsers} />
            </Col>
          )}
          <Col>
            <Row>
              <div style={{ marginBottom: "8%" }}>
                <Body
                  recvMessages={recvMessages}
                  userLeaves={userLeaves}
                  typingStatus={typingStatus}
                />
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
