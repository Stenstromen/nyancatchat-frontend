import {useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button"

import { useDefaultProvider } from "../../contexts/default";

function Sidebar({ socket, roomUsers }) {

  const navigate = useNavigate();
  const { username } = useDefaultProvider();
  const room = "sampleroom"

  const handleLeave = () => {
    socket.emit("leave_room", {
      user: username,
      room: room,
    });
    navigate("/")
  };
  return (
      <div
        style={{
          display: "border-box",
          position: "fixed",
          height: "95%",
          width: "24%",
          border: "1px solid black",
          backgroundColor: "green"
        }}
      >
        <Button as="input" type="reset" value="Leave" onClick={handleLeave} />
        <Button as="input" type="reset" value="Share" />
        {roomUsers.map((item) => {
          return (
            <>
            <p>{item.user}</p>
            </>
          )
        })}
      </div>
  );
}

export default Sidebar;
