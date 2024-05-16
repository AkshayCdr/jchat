import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import socket from "../socket";
import { useNavigate } from "react-router-dom";
import {
  getRoomMessagesApi,
  sendMessageToRoomApi,
  getRoomMembers,
} from "../api";

export default function Room({ username }) {
  //chats
  const [messages, setMessages] = useState([]);

  const [members, setMemebers] = useState([]);

  const location = useLocation();

  const navigate = useNavigate();

  const chatBoxRef = useRef(null);

  useEffect(() => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await getRoomMessagesApi(location.state.roomId);
      if (!response.ok) navigate("/");
      const data = await response.json();
      console.log(data);
      setMessages(data);
    };
    fetchMessages();
  }, []);

  useEffect(() => {
    const fetchMembers = async () => {
      const response = await getRoomMembers(location.state.roomId);
      if (!response.ok) return navigate("/");
      const data = await response.json();
      setMemebers(data);
    };
    fetchMembers();
  }, []);

  const messageRef = useRef(null);

  useEffect(() => {
    const handleMessageRoom = (data) => {
      console.log(data);
      setMessages((prevMessages) => [...prevMessages, ...data]);
    };

    socket.on("receive-messageRoom", handleMessageRoom);

    return () => {
      socket.off("receive-messageRoom", handleMessageRoom);
    };
  }, []);

  async function sendMessage() {
    if (!messageRef.current.value) return;
    const response = await sendMessageToRoomApi(
      location.state.userId,
      location.state.roomId,
      messageRef.current.value
    );
    if (!response.ok) navigate("/");

    socket.emit("send-messageRoom", {
      username,
      roomName: location.state.roomName,
      users: members,
      message: messageRef.current.value,
    });
  }
  //users

  return (
    <div className="chat-container">
      <button className="go-back" onClick={() => navigate("/profile")}>
        go back
      </button>
      <h1>{location.state.roomName}</h1>
      <div ref={chatBoxRef} className="chat-box">
        <ul>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat-message-container ${
                message.username === username ? "float-right" : ""
              }`}
            >
              <li className="chat-username">{message.username}</li>
              <li className="chat-message">{message.message}</li>
              <li className="chat-time">
                {new Date(message.timestamp).toLocaleTimeString()}
              </li>
            </div>
          ))}
        </ul>
      </div>
      <input type="text" ref={messageRef} placeholder="Type something" />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
