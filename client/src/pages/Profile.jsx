import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import { useState, useEffect } from "react";
const socket = io("http://localhost:3000");
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Profile() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const location = useLocation();

  socket.on("get-users", (users) => {
    console.log(users);
    const updateUsers = users.filter(
      (user) => user.userId !== location.state.username
    );
    console.log(updateUsers);
    setUsers(updateUsers);
  });

  const handleUserClick = (user) => {
    // Navigate to /chat with user.id as a parameter
    socket.emit("join", { email: "user1@example.com" });

    navigate("/chat", {
      state: {
        id: 1,
        username: location.state.username,
        senderName: user.userId,
      },
    });
  };

  return (
    <div>
      <div className="users">
        <ul>
          {users.map((user, index) => (
            <li onClick={() => handleUserClick(user)} key={index}>
              {user.userId}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
