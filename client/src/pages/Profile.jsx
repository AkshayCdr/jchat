import { useEffect, useState } from "react";
import "./Profile.css";
import socket from "../socket";

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Profile({ username }) {
  const location = useLocation();

  const [availableUsers, setAvailableUsers] = useState([]);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5500/users");
        const userData = await response.json();
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

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
      const updateUsers = users.filter((user) => user.userId !== username);
      console.log(updateUsers);
      setAvailableUsers(updateUsers);
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

  // const handleUserClick = (user) => {
  //   navigate("/chat", {
  //     state: {
  //       id: 1,
  //       senderName: user.userId,
  //     },
  //   });
  // };
  const handleUserClick = (user) => {
    navigate("/chat", {
      state: {
        id: 1,
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
        <h1>Users</h1>
        <ul>
          {users.map((user, index) => (
            <li onClick={() => handleUserClick(user)} key={index}>
              {user.username}
            </li>
          ))}
        </ul>

        {/* 
        <h1>Active users</h1>
        <ul>
          {availableUsers.map((user, index) => (
            <li onClick={() => handleUserClick(user)} key={index}>
              {user.userId}
            </li>
          ))}
        </ul> */}

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
