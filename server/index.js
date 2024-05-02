import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import cookieParser from "cookie-parser";
import { posthandler } from "./controller/posthandler.js";

import bodyParser from "body-parser";
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(cookieParser());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.post("/login", posthandler);
// app.get("/users", getUsers);

let users = [];

const rooms = [];

io.on("connection", (socket) => {
  socket.on("new-user", (userId) => {
    if (!users.some((user) => user.Id === userId))
      users.push({
        userId,
        socketId: socket.id,
      });

    io.emit("get-users", users);
  });

  socket.on("send-message", (data) => {
    const message = data.message;
    const username = data.username;
    const userNameToSend = data.user;
    const user = users.find((user) => user.userId === userNameToSend);

    console.log({ data, users, user });

    if (user)
      io.to(user.socketId).emit("receive-message", [{ username, message }]);
  });

  socket.on("join-Room", (roomName) => {
    console.log(roomName);
    socket.join(roomName);

    if (isRoomExist(rooms, roomName)) {
      const existingRoomIndex = rooms.findIndex(
        (room) => room.roomName === roomName
      );
      // rooms[existingRoomIndex].socketIds.push(socket.id);
      console.log(rooms[existingRoomIndex]);
      rooms.forEach((room) => {
        if (room.roomName === roomName) {
          room["roomName"].push(socket.id);
        }
      });
    } else {
      rooms.push({ roomName: [socket.id] });
    }

    io.emit("available-rooms", rooms);
  });

  socket.on("send-message-room", (data) => {
    console.log(data);
    io.to(data.roomName).emit("receive-message-room", [data]);
    // io.emit("receive-message-room", [data]);
  });

  socket.on("disconnect", () => {
    users = users.filter((user) => user.socketId !== socket.id);

    io.emit("get-users", users);
  });
});

function isRoomExist(rooms, roomName) {
  return rooms.hasOwnProperty(roomName);
}

httpServer.listen(3000);
