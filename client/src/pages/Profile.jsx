import { useEffect, useRef, useState } from "react";
import "./Profile.css";

import { useNavigate } from "react-router-dom";

import { getUsersApi, getRoomsApi, getRoomsByUserId } from "../api.js";

export default function Profile({ username }) {
  //to get details of current user
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const getCurrentUserDetails = (userData) =>
    userData.filter((user) => user.username === username)[0];

  const filterCurrentUserName = (userData) =>
    userData.filter((user) => user.username !== username);

  async function getUsers() {
    const response = await getUsersApi();
    if (!response.ok) return navigate("/");
    return response.json();
  }

  function setAllUsers(userData) {
    //get get Current user details - @id
    setCurrentUser(getCurrentUserDetails(userData));
    setUsers(filterCurrentUserName(userData));
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getUsers();
        if (userData) {
          setAllUsers(userData);
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        // const response = await getRoomsApi();
        const user = getCurrentUserDetails(await getUsers());
        console.log(user);
        const response = await getRoomsByUserId(user.id);
        if (!response.ok) return navigate("/");
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRooms();
  }, []);

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
        userId: currentUser.id,
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

  return (
    <div className="profile">
      <div className="profile-container">
        <div className="users">
          <h1>Users</h1>
          <ul className="profile-user">
            {users.map((user, index) => (
              <li
                className="profile-username"
                onClick={() => handleUserClick(user)}
                key={index}
              >
                {user.username}
              </li>
            ))}
          </ul>
        </div>

        <div className="rooms">
          <h1>Rooms</h1>
          <ul>
            {rooms.map((room) => (
              <li
                className="profile-classname"
                onClick={() => handleRoomClick(room)}
                key={room.id}
              >
                {room.room_name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="profile-addroom">
        <input
          className="addroom-input"
          type="text"
          ref={addRoomRef}
          placeholder="Add room..."
        />
        <button className="addroom-btn" onClick={addRoom}>
          Add Room +
        </button>
      </div>
    </div>
  );
}
