const socketio = require("socket.io");
const express = require("express");
const http = require("http");

const app = express();

// const PORT = process.env.PORT || 2023;
const PORT = 2023;

const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
  },
});

server.listen(PORT, () => {
  console.log(`Sunucu ${PORT} üzerinden sunulmaktadır...`);
  io.on("connection", (socket) => {
    console.log("Bir server...");
    console.log(socket.id);

    socket.on("NEW_BOOKMARK_EVENT", (bookmark) => {
      // io.emit("NEW_BOOKMARK_ADDED", bookmark);
      // !Gönderen hariç herkese bookmark bilgisini gönder...
      console.log(bookmark);
      socket.broadcast.emit("NEW_BOOKMARK_ADDED", bookmark);
    });

    // Mesaj gönder...
    // socket.emit("WELCOME_MESSAGE", `Selam ${socket.id}, hoşgeldin.`);

    //Mesaj alma
    // socket.on("SEND_MESSAGE", (data) => {
    //   console.log(`Mesaj: ${data}`);
    // });
  });
});
