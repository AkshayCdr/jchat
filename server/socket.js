import { Console, timeStamp } from "console";
import { createServer } from "http";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { serialize, parse } from "cookie";

import { getUsersUsingId } from "./model/login.js";

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

// const io = new Server(httpServer, {
//   cookie: true,
//   cors: {
//     origin: "http://192.168.0.111:5173",
//   },
// });

// const io = new Server(httpServer, {
//   cookie: true,
//   cors: {
//     origin: "http://localhost:5173",
//   },
// });

let users = [];

const rooms = [];

io.on("connection", (socket) => {
  console.log("connected");

  socket.on("new-user", (data) => {
    if (!data.sessionId) io.close();
    console.log(data.sessionId);
    if (!users.some((user) => user.Id === data.username))
      users.push({
        username: data.username,
        socketId: socket.id,
      });

    io.emit("get-users", users);
  });

  socket.on("send-message", (data) => {
    // const message = data.message;
    // const username = data.username;
    // const userNameToSend = data.user;
    console.log(data);
    console.log(users);
    const { username, message, userToSend } = data;
    console.log(username);
    console.log(message);
    console.log(userToSend);

    const user = users.find((user) => user.username === username);
    const sender = users.find((user) => user.username === userToSend);

    console.log(user);
    console.log(sender);

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
