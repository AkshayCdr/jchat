import { useState } from "react";
import Button from "./Button";
import Input from "./Input";

import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

const socket = io("http://localhost:3000");

export default function Chat() {
  socket.on("message", (arg) => console.log(arg));
  const [message, setMessage] = useState("");

  return (
    <div className="chat-container">
      <div className="chat-box"></div>
      <Input messageChange={(e) => setMessage(e.target.value)} />
      <Button />
    </div>
  );
}
