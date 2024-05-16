import { Console, timeStamp } from "console";
import { createServer } from "http";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { serialize, parse } from "cookie";

import { getUserInfoBySession } from "./model/login.js";

import {
  getUserNamesUsingId,
  getRooms,
} from "./controller/socketController.js";

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

const rooms = {};

// io.use(async (socket, next) => {
//   if (socket.request.headers.cookie) {
//     const { sessionId } = parseCookie(socket.request.headers.cookie);
//     const user = await getUserInfoBySession(sessionId);
//     if (user) {
//       socket.user = user;
//       return next();
//     }
//   }
//   next(new Error("authenrication error"));
// });

// io.use(async (socket, next) => {
//   if (!socket.user) return next(new Error("authentiaction error"));
//   //get roomnames using user id
//   console.log(socket.user.user_id);
//   console.log(socket.user);
//   const rooms = await getRooms(socket.user.user_id);
//   console.log(rooms);
//   return next();
// });

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

  // if (!socket.user) {
  //   console.log("User authentication failed");
  //   socket.disconnect();
  //   return;
  // }

  socket.on("new-user", (data) => {
    // console.log(socket.user);
    // if (socket.user) {
    if (!users.some((user) => user.Id === data.username))
      users.push({
        username: data.username,
        socketId: socket.id,
        socket,
      });

    io.emit(
      "get-users",
      users.map((user) => {
        return user.username, user.socketId;
      })
    );
    // }
  });

  socket.on("send-message", (data) => {
    // console.log(socket.user);
    // if (socket.user) {
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
    // }
  });

  socket.on("room-create", async (data) => {
    //get username from data base
    const usernames = await getUserNamesUsingId(data.users);
    console.log(usernames);

    const userInRoom = users.filter((user) =>
      usernames.some((username) => username.username === user.username)
    );

    console.log(userInRoom);

    rooms[data.roomName] = [];
    usernames.forEach((username) => {
      rooms[data.roomName].push(username.username);
    });
    console.log(rooms);
    // users.username -> usernames.username
    //roomname:users
    //add users to room

    if (socket.user) {
      console.log("authenticatoin workd");
      return;
    }
    console.log("auth not working");
    return;
  });

  socket.on("send-messageRoom", async (data) => {
    console.log("inside room");
    const { username, roomName, users: roomMembers, message } = data;
    rooms[roomName] = roomMembers.map((user) => user.username);
    rooms[roomName].forEach((roomUsername) => {
      const user = users.find((u) => u.username === roomUsername);
      if (user) {
        const socket = user.socket;
        socket.join(roomName);
      } else {
        console.log(`User ${roomUsername} not found in users array`);
      }
    });
    io.to(roomName).emit("receive-messageRoom", [
      { username, message, timestamp: new Date() },
    ]);
  });

  socket.on("disconnect", () => {
    users = users.filter((user) => user.socketId !== socket.id);
    io.emit("get-users", users);
  });
});

// function isRoomExist(rooms, roomName) {
//   return rooms.hasOwnProperty(roomName);
// }

httpServer.listen(3000, () => console.log("listening to 3000"));
