import { useEffect, useState } from "react";
import "./Profile.css";

import { useNavigate } from "react-router-dom";

import { getUsersApi } from "../api.js";

export default function Profile({ username }) {
  //to get details of current user
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const getCurrentUserDetails = (userData) =>
    userData.filter((user) => user.username === username)[0];

  const filterCurrentUserName = (userData) =>
    userData.filter((user) => user.username !== username);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsersApi();
        if (!response.ok) return navigate("/");
        const userData = await response.json();

        if (userData) {
          //get get Current user details - @id
          setCurrentUser(getCurrentUserDetails(userData));
          setUsers(filterCurrentUserName(userData));
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // const [rooms, setRooms] = useState(() =>
  //   localStorage.getItem("rooms")
  //     ? JSON.parse(localStorage.getItem("rooms"))
  //     : []
  // );

  // const [roomName, setRoomName] = useState("");

  // useEffect(() => {
  //   socket.on("get-users", (users) => {
  //     console.log(users);
  //     const updateUsers = users.filter((user) => user.userId !== username);
  //     console.log(updateUsers);
  //     setAvailableUsers(updateUsers);
  //     localStorage.setItem("users", JSON.stringify(users));
  //   });
  // }, []);

  // useEffect(() => {
  //   socket.on("available-rooms", (data) => {
  //     console.log(data);
  //     setRooms(data);
  //     localStorage.setItem("rooms", JSON.stringify(data));
  //   });
  // }, []);

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
        userId: currentUser.id,
        senderId: user.id,
        senderName: user.username,
      },
    });
  };

  // function joinRoom(e) {
  //   e.preventDefault();
  //   console.log("clicked");
  //   socket.emit("join-Room", roomName);
  //   navigate("/room", {
  //     state: {
  //       roomName: roomName,
  //     },
  //   });
  // }

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

        {/* <h1>Active Rooms</h1>
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
        <button onClick={joinRoom}>Join Room</button> */}
      </div>
    </div>
  );
}
