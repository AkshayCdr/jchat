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
  const navigate = useNavigate();

  const [receiveMessage, setReceive] = useState([]);

  useEffect(() => {
    console.log(location.state);
    async function getMessages() {
      const response = await fetch(
        `http://localhost:5500/chat/${location.state.userId}/${location.state.senderId}`
      );
      if (!response.ok) return;
      const messages = await response.json();
      if (messages) setReceive(messages);
    }
    getMessages();
  }, []);

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
      userToSend: location.state.senderName,
    });
    async function sendMessage() {
      const response = await fetch(
        `http://localhost:5500/chat/${location.state.userId}/${location.state.senderId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: message }),
        }
      );
      if (!response.ok) return;
      console.log("sending success.");
    }
    sendMessage();
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
          <div
            key={index}
            className={`chat-message-container ${
              data.sender_username === username ? "float-right" : ""
            }`}
          >
            <li className="chat-username">{data.sender_username}</li>
            <li className="chat-message">{data.message}</li>
            <li className="chat-time">
              {new Date(data.timestamp).toLocaleTimeString()}
            </li>
          </div>
        ))}
      </div>
      <div className="input">
        <input
          type="text"
          placeholder="Type something..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={onClick} name="send" />
      </div>
    </div>
  );
}
