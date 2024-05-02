import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import socket from "../socket";
import { useNavigate } from "react-router-dom";

export default function Room() {
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const [receiveMessage, setReceive] = useState([]);

  socket.on("receive-message-room", (data) => {
    console.log(data);
    setReceive([...receiveMessage, ...data]);
  });

  function onClick(e) {
    e.preventDefault();
    if (!message) return;
    socket.emit("send-message-room", {
      roomName: location.state.roomName,
      message,
    });
  }

  function returnBack(e) {
    e.preventDefault();
    navigate(
      "/profile",
      { state: { username: location.state.username } }
      // { replace: true }
    );
  }

  return (
    <div>
      <button onClick={returnBack}>go Back</button>
      <h1>{location.state.roomName}</h1>
      <ul>
        {receiveMessage.map((data, index) => (
          <li key={index}>{data.message}</li>
        ))}
      </ul>
      <div className="input">
        <Input
          placeholder="Type somethig...."
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={onClick} name="send" />
      </div>
    </div>
  );
}
