import { Server } from "socket.io";
import { createServer } from "http";

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5500",
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.emit("chat-message", "hello world");
});

httpServer.listen(3000, () => console.log("listening...."));
