import { useState } from "react";
import { useDefaultProvider } from "../contexts/default";

function JoinChat() {
  const {
    username,
    setUsername,
    roomName,
    setRoomName,
    isMobile,
    sideBar,
    setSideBar,
  } = useDefaultProvider();

  const handleLogin = () => {
    const packet = {
      user: username,
      room: roomName,
    };
    socket.emit("join_room", packet);
    navigate("/chat");
  };

  return (
    <div>
      <h1>lol</h1>
      <h1>lol</h1>
      <h1>lol</h1>
      <h1>lol</h1>
    </div>
  );
}

export default JoinChat;
