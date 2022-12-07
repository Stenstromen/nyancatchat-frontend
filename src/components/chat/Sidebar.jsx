import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import { useDefaultProvider } from "../../contexts/default";

function Sidebar({ socket, roomUsers }) {
  const [shareClicked, setShareClicked] = useState(false);
  const [copyClicked, setCopyClicked] = useState(false);

  const navigate = useNavigate();
  const { username, setUsername, roomName, setRoomName, isMobile } = useDefaultProvider();

  const simulateNetworkRequest = () => {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  };

  const handleLeave = () => {
    socket.emit("leave_room", {
      user: username,
      room: roomName,
    });
    setUsername(null)
    setRoomName(null)
    navigate("/");
  };

  const shareLink = async () => {
    setShareClicked(true);
    try {
      await navigator.share({
        title: "Plz Join my NyanCatChatRoom 😸",
        text: `Plz Join my NyanCatChat-${roomName} 😸`,
        url: window.location.origin + "/join/" + roomName,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const copyLink = () => {
    setCopyClicked(true);
    navigator.clipboard.writeText(window.location.origin + "/join/" + roomName);
  };

  useEffect(() => {
    if (shareClicked) {
      simulateNetworkRequest().then(() => {
        setShareClicked(false);
      });
    }
  }, [shareClicked]);

  useEffect(() => {
    if (copyClicked) {
      simulateNetworkRequest().then(() => {
        setCopyClicked(false);
      });
    }
  }, [copyClicked]);

  return (
    <div
      style={{
        display: "border-box",
        position: "fixed",
        height: "100%",
        width: isMobile ? "50%" : "25%",
        backgroundColor: "#0e4d8f",
        zIndex: "999",
      }}
    >
      <Stack>
        <div
          className="d-grid gap-2"
          style={{ marginTop: "60px", backgroundColor: "#0e4d8f" }}
        >
          <img
            style={{ width: "90%", borderRadius: "50%" }}
            alt="nyanicon"
            src="/nyanicon.png"
          />

          <Button
            variant="primary"
            size={isMobile ? "sm" : "md"}
            as="input"
            type="reset"
            value="😿 Leave (Clear Data) 😾"
            onClick={handleLeave}
          />
          <Button
            variant="primary"
            size={isMobile ? "sm" : "md"}
            as="input"
            type="reset"
            value={shareClicked ? "✅ Share Link ✅" : "😻 Share Link 📲"}
            onClick={shareLink}
          />
          <Button
            variant="primary"
            size={isMobile ? "sm" : "md"}
            as="input"
            type="reset"
            value={
              copyClicked ? "✅ Copy 2 Clipboard ✅" : "☝️ Copy 2 Clipboard 😸"
            }
            onClick={copyLink}
          />
        </div>
        <Table
          striped
          bordered
          hover
          size="sm"
          variant="dark"
          style={{ marginTop: "20px" }}
        >
          <thead>
            <tr>
              <th>{roomName} Users</th>
            </tr>
          </thead>
          <tbody>
            {roomUsers.map((item) => {
              return (
                <>
                  <tr>
                    <td>{item.user}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
      </Stack>
    </div>
  );
}

export default Sidebar;
