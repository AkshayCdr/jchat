import { Server } from "socket.io";
import { createServer } from "http";

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const users = {};

io.on("connection", (socket) => {
  // console.log(socket.id);

  socket.on("chat-message", (message) => {
    socket.broadcast.emit("chat-message", { name: users[socket.id], message });
  });

  socket.on("new-user", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
  });
});

httpServer.listen(3000, () => console.log("listening...."));
