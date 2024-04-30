import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
// import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

// const socket = io("http://localhost:3000");

import socket from "../socket";

export default function Room() {
  const [message, setMessage] = useState("");
  const location = useLocation();

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

  return (
    <div>
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
