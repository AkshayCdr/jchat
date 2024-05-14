import { Console, timeStamp } from "console";
import { createServer } from "http";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { serialize, parse } from "cookie";

import { getUserInfoBySession } from "./model/login.js";

const httpServer = createServer();

const whitelist = ["http://localhost:5173", "http://192.168.0.111:5173"];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  sameSite: "none",
  credentials: true,
};

const io = new Server(httpServer, {
  cookie: true,
  cors: corsOptions,
});

let users = [];

const rooms = [];

io.use(async (socket, next) => {
  if (socket.request.headers.cookie) {
    const { sessionId } = parseCookie(socket.request.headers.cookie);
    const user = await getUserInfoBySession(sessionId);
    if (user) {
      socket.user = user;
      return next();
    }
  }
  next(new Error("authenrication error"));
});

const parseCookie = (str) =>
  str
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});

io.on("connection", (socket) => {
  console.log("connected");

  socket.on("new-user", (data) => {
    // console.log(socket.user);
    if (!users.some((user) => user.Id === data.username))
      users.push({
        username: data.username,
        socketId: socket.id,
      });

    io.emit("get-users", users);
  });

  socket.on("send-message", (data) => {
    const { username, message, userToSend } = data;
    console.log(users);
    const user = users.find((user) => user.username === username);
    const sender = users.find((user) => user.username === userToSend);

    if (userToSend && user)
      io.to(sender.socketId)
        .to(user.socketId)
        .emit("receive-message", [
          { sender_username: username, message, timestamp: new Date() },
        ]);
  });

  // socket.on("join-Room", (roomName) => {
  //   console.log(roomName);
  //   socket.join(roomName);

  //   if (isRoomExist(rooms, roomName)) {
  //     const existingRoomIndex = rooms.findIndex(
  //       (room) => room.roomName === roomName
  //     );

  //     console.log(rooms[existingRoomIndex]);
  //     rooms.forEach((room) => {
  //       if (room.roomName === roomName) {
  //         room["roomName"].push(socket.id);
  //       }
  //     });
  //   } else {
  //     rooms.push({ roomName: [socket.id] });
  //   }

  //   io.emit("available-rooms", rooms);
  // });

  // socket.on("send-message-room", (data) => {
  //   console.log(data);
  //   io.to(data.roomName).emit("receive-message-room", [data]);
  // });

  socket.on("disconnect", () => {
    users = users.filter((user) => user.socketId !== socket.id);
    io.emit("get-users", users);
  });
});

// function isRoomExist(rooms, roomName) {
//   return rooms.hasOwnProperty(roomName);
// }

httpServer.listen(3000, () => console.log("listening to 3000"));
