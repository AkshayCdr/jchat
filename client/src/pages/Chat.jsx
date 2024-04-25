import { useState, useEffect } from "react";
import Button from "../components/Button";
import Input from "../components/Input";

import { useLocation } from "react-router-dom";

import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

const socket = io("http://localhost:3000");

export default function Chat() {
  const [message, setMessage] = useState("");
  const location = useLocation();

  useEffect(() => {
    // socket.emit("join", {
    //   username: location.state.username,
    //   senderName: location.state.senderName,
    // });
    socket.emit("join", { email: "user1@example.com" });
  });

  const [receiveMessage, setReceive] = useState([]);

  socket.on("receive-message", (data) => {
    console.log(data);
    setReceive([...receiveMessage, data]);
  });

  function onClick(e) {
    e.preventDefault();
    if (!message) return;
    socket.emit("send-message", {
      message,
      user: location.state.senderName,
    });
  }

  return (
    <div className="chat-container">
      <div className="chat-box">
        {receiveMessage.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </div>
      <Input
        placeholder="Type somethig...."
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button onClick={onClick} name="send" />
    </div>
  );
}
