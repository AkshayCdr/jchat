import { useState, useEffect } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { useLocation } from "react-router-dom";
import "./Chat.css";
import socket from "../socket";
import { useNavigate } from "react-router-dom";

export default function Chat({ username }) {
  const [message, setMessage] = useState("");
  const location = useLocation();

  const [receiveMessage, setReceive] = useState([]);
  const navigate = useNavigate();

  socket.on("receive-message", (data) => {
    console.log(data);
    setReceive([...receiveMessage, ...data]);
  });

  function onClick(e) {
    e.preventDefault();
    if (!message) return;
    socket.emit("send-message", {
      username: username,
      message,
      user: location.state.senderName,
    });
  }

  function returnBack(e) {
    e.preventDefault();
    navigate("/profile");
  }

  return (
    <div className="chat-container">
      <h1>{location.state.senderName}</h1>
      <div className="chat-box">
        <button onClick={returnBack}>go back</button>
        {receiveMessage.map((data, index) => (
          <li key={index}>
            {(data.username === username ? "you" : data.username) +
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
