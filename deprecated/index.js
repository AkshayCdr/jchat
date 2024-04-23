const webSocketServer = require("websocket").server;
const http = require("http");
let connection = null;
const httpServer = http.createServer((req, res) => {
  console.log("we have a request");
});

const websocket = new webSocketServer({
  httpServer: httpServer,
});

websocket.on("request", (req) => {
  connection = req.accept(null, req.origin);
  connection.on("open", () => {
    console.log("connection opened..");
  });
  connection.on("message", (message) => {
    console.log(`message is ${message}`);
  });
  connection.on("close", () => {
    console.log("conn closed");
  });
});

httpServer.listen(8080, () => console.log("listenting.."));
