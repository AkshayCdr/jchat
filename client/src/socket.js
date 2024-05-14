import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

const socket = io("http://" + window.location.hostname + ":3000", {
  withCredentials: true,
});

export default socket;
