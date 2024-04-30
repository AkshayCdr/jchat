// import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import { useState } from "react";

import "./Profile.css";

import socket from "../socket";
// const socket = io("http://localhost:3000");
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Profile() {
  const [users, setUsers] = useState([]);

  const [roomName, setRoomName] = useState("");
  const navigate = useNavigate();

  const location = useLocation();

  socket.on("get-users", (users) => {
    console.log(users);
    const updateUsers = users.filter(
      (user) => user.userId !== location.state.username
    );
    setUsers(updateUsers);
    // setUsers(users);
  });

  const handleUserClick = (user) => {
    // Navigate to /chat with user.id as a parameter
    // socket.emit("join", { email: "user1@example.com" });

    navigate("/chat", {
      state: {
        id: 1,
        username: location.state.username,
        senderName: user.userId,
      },
    });
  };

  function joinRoom(e) {
    e.preventDefault();
    console.log("clicked");
    socket.emit("join-Room", roomName);
    navigate("/room", {
      state: {
        roomName: roomName,
      },
    });
  }

  return (
    <div>
      <div className="users">
        <h1>Active users</h1>
        <ul>
          {users.map((user, index) => (
            <li onClick={() => handleUserClick(user)} key={index}>
              {user.userId}
            </li>
          ))}
        </ul>

        <input
          type="text"
          onChange={(e) => setRoomName(e.target.value)}
          name="roomName"
          placeholder=" Enter Room Name"
        />
        <button onClick={joinRoom}>Join Room</button>
      </div>
    </div>
  );
}
