import { useNavigate } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";

import { useDefaultProvider } from "../../contexts/default";

function Sidebar({ socket, roomUsers }) {
  const navigate = useNavigate();
  const { username, sideBar, isMobile } = useDefaultProvider();
  const room = "sampleroom";

  const handleLeave = () => {
    socket.emit("leave_room", {
      user: username,
      room: room,
    });
    navigate("/");
  };
  return (
    <div
      style={{
        display: "border-box",
        position: "fixed",
        height: "100%",
        width: "24%",
        backgroundColor: "#0e4d8f",
      }}
    >
      <Stack>
        <div className="d-grid gap-2" style={{ marginTop: "60px" }}>
          <img
            style={{ width: "90%", borderRadius: "50%" }}
            src="/nyanicon.png"
          />

          <Button
            variant="primary"
            size={isMobile ? "sm" : "md"}
            as="input"
            type="reset"
            value="Leave"
            onClick={handleLeave}
          />
          <Button
            variant="primary"
            size={isMobile ? "sm" : "md"}
            as="input"
            type="reset"
            value="Share"
          />
        </div>
        <h1>Users</h1>
        <ListGroup>
          {roomUsers.map((item) => {
            return (
              <>
                <ListGroup.Item>{item.user}</ListGroup.Item>
              </>
            );
          })}
        </ListGroup>
      </Stack>
    </div>
  );
}

export default Sidebar;
