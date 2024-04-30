import { useState, useEffect } from "react";
import Button from "../components/Button";
import Input from "../components/Input";

import { useLocation } from "react-router-dom";

import "./Chat.css";

import socket from "../socket";
// import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

// const socket = io("http://localhost:3000");

export default function Chat() {
  const [message, setMessage] = useState("");
  const location = useLocation();

  // useEffect(() => {
  //   // socket.emit("join", {
  //   //   username: location.state.username,
  //   //   senderName: location.state.senderName,
  //   // });
  //   socket.emit("join", { email: "user1@example.com" });
  // });

  const [receiveMessage, setReceive] = useState([]);

  socket.on("receive-message", (data) => {
    console.log(data);
    setReceive([...receiveMessage, ...data]);
  });

  function onClick(e) {
    e.preventDefault();
    if (!message) return;
    socket.emit("send-message", {
      username: location.state.username,
      message,
      user: location.state.senderName,
    });
  }

  return (
    <div className="chat-container">
      <h1>{location.state.senderName}</h1>
      <div className="chat-box">
        {receiveMessage.map((data, index) => (
          <li key={index}>
            {(data.username === location.state.username
              ? "you"
              : data.username) +
              " " +
              data.message}
          </li>
        ))}
      </div>
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
