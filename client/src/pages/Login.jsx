import { useEffect, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

const socket = io("http://localhost:3000");

export default function Login() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleClick(e) {
    if (!userName || !password) return;
    e.preventDefault();
    socket.emit("new-user", userName);
    navigate("/chat", { replace: true });
  }

  return (
    <div>
      <Input
        placeholder="Username"
        q
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button name="Login" onClick={handleClick} />
    </div>
  );
}
