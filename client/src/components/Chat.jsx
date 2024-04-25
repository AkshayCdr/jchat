// import { useState, useEffect } from "react";
// import Button from "./Button";
// import Input from "./Input";

// import "./Chat.css";

// import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

// const socket = io("http://localhost:3000");

// export default function Chat() {

//   const [message, setMessage] = useState("");

//   const [receiveMessage, setReceive] = useState([]);

//   socket.on("receive-message", (data) => {
//     console.log(data);
//     setReceive([...receiveMessage, data]);
//   });

//   function onClick(e) {
//     e.preventDefault();
//     if (!message && !selected) return;
//     socket.emit("send-message", {
//       message,
//       user: selected,
//     });
//   }

//   return (
//     <div className="chat-container">
//       <div className="chat-box">
//         {receiveMessage.map((message, index) => (
//           <li key={index}>{message}</li>
//         ))}
//       </div>
//       <Input
//         placeholder="Type somethig...."
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <Button onClick={onClick} name="send" />
//     </div>
//   );
// }
