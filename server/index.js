import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();

app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

let users = [];

io.on("connection", (socket) => {
  socket.on("new-user", (userId) => {
    if (!users.some((user) => user.Id === userId))
      users.push({
        userId,
        socketId: socket.id,
      });
    console.log(users);
    io.emit("get-users", users);
  });

  socket.on("join", function (data) {
    socket.join(data.email);
    // We are using room of socket io
  });

  socket.on("send-message", (data) => {
    // const { message, userNameToSend } = data;
    // console.log(userNameToSend);
    const message = data.message;
    const userNameToSend = data.user;
    const user = users.find((user) => user.userId === userNameToSend);
    console.log(users.find((user) => user.userId === userNameToSend));
    console.log(user.socketId);
    console.log(message);
    // if (user) io.to(user.socketId).emit("receive-message", message);
    io.sockets.in("user1@example.com").emit("receive-message", message);
    // io.emit("receive-message", {name:message});
  });
  // socket.on("chat-message", (message) => {
  //   console.log(message);
  //   socket.broadcast.emit("message", { name: users[socket.id], message });
  // });

  socket.on("disconnect", () => {
    users = users.filter((user) => user.socketId !== socket.id);
    console.log("disoneected", users);
    io.emit("get-users", users);
  });
});

httpServer.listen(3000);
