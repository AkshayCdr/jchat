import { useEffect, useRef, useState } from "react";
import "./Profile.css";

import { useNavigate } from "react-router-dom";

import { getUsersApi, getRoomsApi } from "../api.js";

export default function Profile({ username }) {
  //to get details of current user
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await getRoomsApi();
        if (!response.ok) return navigate("/");
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRooms();
  }, []);

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

  const handleRoomClick = (room) => {
    console.log(room);
    navigate("/room", {
      state: {
        roomId: room.id,
        roomName: room.room_name,
      },
    });
  };

  const addRoomRef = useRef(null);

  function addRoom() {
    const roomName = addRoomRef.current.value;
    navigate("/selectUsers", {
      state: {
        userId: currentUser.id,
        roomName,
        users,
      },
    });
  }

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
        <div className="rooms">
          <h1>Rooms</h1>
          <ul>
            {rooms.map((room) => (
              <li onClick={() => handleRoomClick(room)} key={room.id}>
                {room.room_name}
              </li>
            ))}
          </ul>
          <input type="text" ref={addRoomRef} placeholder="Add room..." />
          <button onClick={addRoom}>Add Room +</button>
        </div>
      </div>
    </div>
  );
}
