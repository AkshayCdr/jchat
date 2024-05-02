import { useEffect, useState } from "react";
import "./Profile.css";
import socket from "../socket";

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Profile() {
  const location = useLocation();
  const [users, setUsers] = useState(() =>
    localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users")).filter(
          (user) => user.userId !== location.state.username
        )
      : []
  );

  const [rooms, setRooms] = useState(() =>
    localStorage.getItem("rooms")
      ? JSON.parse(localStorage.getItem("rooms"))
      : []
  );

  const [roomName, setRoomName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("get-users", (users) => {
      console.log(users);
      const updateUsers = users.filter(
        (user) => user.userId !== location.state.username
      );
      console.log(updateUsers);
      setUsers(updateUsers);
      localStorage.setItem("users", JSON.stringify(users));
    });
  }, []);

  useEffect(() => {
    socket.on("available-rooms", (data) => {
      console.log(data);
      setRooms(data);
      localStorage.setItem("rooms", JSON.stringify(data));
    });
  }, []);

  const handleUserClick = (user) => {
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
        username: location.state.username,
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

        <h1>Active Rooms</h1>
        <ul>
          {rooms.map((room, index) => (
            <li key={index}>{room.roomName}</li>
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
