import { useEffect } from "react";
import { SyncLoader } from "react-spinners";
import ListGroup from "react-bootstrap/ListGroup";

import { useDefaultProvider } from "../../contexts/default";

function Body({ recvMessages, userLeaves, typingStatus }) {
  const { isMobile } = useDefaultProvider();
/*   const [userLeavesPop, setUserLeavesPop] = useState(false);

  useEffect(() => {
    setUserLeavesPop(true);
  }, [userLeaves]); */

  useEffect(() => {
    return window.scrollTo(0, document.body.scrollHeight);
  }, [recvMessages, typingStatus]);

  return (
    <div style={{ backgroundColor: "white", borderRadius: "5px" }}>
      <div style={{ backgroundColor: "white" }}>
        {recvMessages.map((item) => {
          return (
            <>
              {item.origin === "sender" ? (
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "right",
                    marginTop: isMobile ? "10px" : "2px",
                    marginBottom: isMobile ? "10px" : "2px",
                  }}
                >
                  <ListGroup
                    style={{
                      width: "200px",
                      marginRight: "10px",
                      overflowWrap: "break-word",
                    }}
                  >
                    <ListGroup.Item as="li" active>
                      {item.message}
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "left",
                    marginTop: isMobile ? "10px" : "2px",
                    marginBottom: isMobile ? "10px" : "2px",
                  }}
                >
                  <ListGroup
                    style={{
                      width: "200px",
                      marginRight: "10px",
                      overflowWrap: "break-word",
                    }}
                  >
                    <em style={{ fontSize: "smaller" }}>{item.user}</em>
                    <ListGroup.Item as="li" variant="dark">
                      {item.message}
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              )}
            </>
          );
        })}
        {typingStatus ? (
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "left",
              marginTop: isMobile ? "10px" : "2px",
              marginBottom: isMobile ? "10px" : "2px",
            }}
          >
            <ListGroup
              style={{
                width: "200px",
                marginRight: "10px",
                overflowWrap: "break-word",
              }}
            >
              <ListGroup.Item>
                <p style={{ display: "flex", flexDirection: "row" }}>
                  {typingStatus} is typing<SyncLoader size={4} />
                </p>
              </ListGroup.Item>
            </ListGroup>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Body;
