import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socketIO from "socket.io-client";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Sidebar from "../components/chat/Sidebar";
import Body from "../components/chat/Body";
import Input from "../components/chat/Input";
import { useDefaultProvider } from "../contexts/default";

function Chat({ socket }) {
  //const socket = socketIO.connect("http://localhost:8080");
  const { username } = useDefaultProvider();
  /* const [message, setMessage] = useState(""); */
  const [recvMessages, setRecvMessages] = useState([]);

  useEffect(() => {
    socket.on("chat message", (msg) => {
      console.log(msg);
      return setRecvMessages((recvMessages) => [...recvMessages, msg]);
    });
  }, [socket]);

  return (
    <div>
      <Sidebar socket={socket} />
      <Body recvMessages={recvMessages} />
      <Input socket={socket} />
    </div>
  );
}

export default Chat;
