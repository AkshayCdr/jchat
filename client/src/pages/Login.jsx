import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import "./Login.css";
import socket from "../socket";
import { loginApi } from "../api.js";

export default function Login({ userName, setUsername, setIsClicked }) {
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const getSessionCookie = () => {
    return Cookies.get("sessionId");
  };

  async function handleClick(e) {
    if (!userName || !password) return;
    e.preventDefault();
    const response = await loginApi(userName, password);

    if (response.ok) {
      socket.emit("new-user", {
        username: userName,
        sessionId: getSessionCookie(),
      });
      setIsClicked(true);
      return navigate("/profile");
    }
    alert("invalid username and password");
    setUsername("");
    setPassword("");
  }

  return (
    <div className="login-container">
      <Input
        value={userName}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button name="Login" onClick={handleClick} />
    </div>
  );
}
