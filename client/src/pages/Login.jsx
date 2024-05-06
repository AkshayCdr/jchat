import { useEffect, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./Login.css";
import socket from "../socket";

export default function Login({ userName, setUsername, setIsClicked }) {
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleClick(e) {
    if (!userName || !password) return;
    e.preventDefault();
    const response = await fetch("http://localhost:5500/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        password,
      }),
      credentials: "include",
    });
    //check for new user
    console.log(response);
    //if the user exist then sign in
    socket.emit("new-user", userName);
    if (response.ok) {
      // setIsClicked(true);
      navigate("/profile");
    } else {
      alert("invalid username and password");
      setUsername("");
      setPassword("");
    }
  }

  return (
    <div className="login-container">
      <Input
        // value={userName}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        // value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button name="Login" onClick={handleClick} />
    </div>
  );
}
