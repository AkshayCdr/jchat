import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { addRoomApi } from "../api.js";

export default function SelectUsers() {
  const location = useLocation();
  const [selectedUsers, setSelectedUsers] = useState([location.state.userId]);

  const navigate = useNavigate();

  const roomName = location.state.roomName;

  const users = location.state.users;

  function handleUserSelection(userId) {
    const newSelectedUsers = [...selectedUsers];
    const userIndex = newSelectedUsers.indexOf(userId);

    if (userIndex === -1) {
      newSelectedUsers.push(userId);
    } else {
      newSelectedUsers.splice(userIndex, 1);
    }

    setSelectedUsers(newSelectedUsers);
  }

  async function addRoom() {
    //get roomname - set roomname
    const response = await addRoomApi(roomName, selectedUsers);
    if (!response.ok) return navigate("/");
    return navigate("/profile");
    //get users - set users
    //navigate to profile
  }

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {" "}
            <input
              type="checkbox"
              id={user.id}
              checked={selectedUsers.includes(user.id)}
              onChange={() => handleUserSelection(user.id)}
            />
            <label htmlFor={user.id}>{user.username}</label>
          </li>
        ))}
      </ul>
      <button onClick={addRoom}>Add users</button>
    </div>
  );
}
