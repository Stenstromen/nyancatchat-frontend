import { useNavigate } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";
import axios from "axios";

import { useDefaultProvider } from "../../contexts/default";

function Sidebar({ socket, roomUsers }) {
  const navigate = useNavigate();
  const { username, roomName, sideBar, isMobile } = useDefaultProvider();
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
        width: isMobile ? "50%" : "25%",
        backgroundColor: "#0e4d8f",
        zIndex: "999"
      }}
    >
      <Stack>
        <div
          className="d-grid gap-2"
          style={{ marginTop: "60px", backgroundColor: "#0e4d8f" }}
        >
          <img
            style={{ width: "90%", borderRadius: "50%" }}
            src="/nyanicon.png"
          />

          <Button
            variant="primary"
            size={isMobile ? "sm" : "md"}
            as="input"
            type="reset"
            value="Leave (Clear Data)"
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
        <Table striped bordered hover size="sm" variant="dark" style={{marginTop: "20px"}}>
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
