import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import { useDefaultProvider } from "../../contexts/default";

function Body({ socket, recvMessages }) {
  useEffect(() => {
    console.log(recvMessages);
    return window.scrollTo(0, document.body.scrollHeight);
  }, [recvMessages]);

  return (
    <div>
      <div>
        {recvMessages.map((item) => {
          return (
            <>
              {item.origin === "sender" ? (
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "right",
                    marginTop: "2px",
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
                    marginTop: "2px",
                  }}
                >
                  <ListGroup
                    style={{
                      width: "200px",
                      marginRight: "10px",
                      overflowWrap: "break-word",
                    }}
                  >
                    <ListGroup.Item as="li" variant="dark">
                      {item.message}
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Body;
