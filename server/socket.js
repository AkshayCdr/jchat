import { Console, timeStamp } from "console";
import { createServer } from "http";
import { Server } from "socket.io";
const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

let users = [];

const rooms = [];

io.on("connection", (socket) => {
  socket.on("new-user", (userName) => {
    if (!users.some((user) => user.Id === userName))
      users.push({
        username: userName,
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
