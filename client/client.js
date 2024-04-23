import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

const socket = io("http://localhost:3000");

const form = document.querySelector(".message-form");
const chat = document.querySelector(".message-container");

const name = prompt("what is your name");
appendMessage("Joined ");
socket.emit("new-user", name);

socket.on("chat-message", (data) => {
  console.log(data);
  appendMessage(data.name + " : " + data.message);
});

socket.on("user-connected", (name) => {
  appendMessage(`${name} connected`);
});

socket.on("user-connected", () => {});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = new FormData(form).get("message");
  appendMessage(`You : ${message}`);
  socket.emit("chat-message", message);
  form.reset();
});

function appendMessage(data) {
  const li = document.createElement("li");
  li.innerHTML = data;
  chat.append(li);
}
