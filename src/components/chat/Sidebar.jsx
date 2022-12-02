import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";

import { useDefaultProvider } from "../../contexts/default";

function Sidebar({ socket, roomUsers }) {
  const navigate = useNavigate();
  const { username } = useDefaultProvider();
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
        border: "1px solid blue",
        backgroundColor: "green",
      }}
    >
      <div className="d-grid gap-2">
        <Button variant="primary" size="md" as="input" type="reset" value="Leave" onClick={handleLeave} />
        <Button variant="primary" size="md" as="input" type="reset" value="Share" />
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
    </div>
  );
}

export default Sidebar;
