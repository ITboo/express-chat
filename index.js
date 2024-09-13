const http = require("http");
const express = require("express");
const { WebSocketServer } = require("ws");

const app = express();
const server = http.createServer(app);

app.get("/ping", (req, res) => {
  res.send("pong");
});

const wss = new WebSocketServer({ server });

const chat = [];

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    const message = data.toString();
    chat.push(message);
    for (const client of wss.clients) {
      client.send(JSON.stringify({ type: "message", message }));
    }
  });
  ws.send(JSON.stringify({ type: "chat", chat }));
});

const PORT = 3000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
