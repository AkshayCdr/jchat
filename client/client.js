// import { io } from "socket.io-client";
// import { io } from "socket.io-client/dist/socket.io.js";

import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

const socket = io("http://localhost:3000");

socket.on("chat-message", (data) => {
  console.log(data);
});
