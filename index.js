const http = require("http");
const express = require("express");
const { WebSocketServer } = require("ws");

const app = express();
const server = http.createServer(app);

app.get("/ping", (req, res) => {
  res.send("pong");
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  ws.send("WebSocket server is started");
});

const PORT = 3000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
