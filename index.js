const express = require("express");
const { Server } = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    allowedHeaders: ["*"],
  },
});

let currentPrice = {
  price: 0.0,
  editedAt: new Date(),
};

app.use("/", (req, res) => {
  res.send("Hello from PR1CE server!");
});

io.on("connection", (socket) => {
  console.log(`Client-${socket.id} connected!`);

  socket.on("test", () => {
    const data = {
      price: 12.5,
      editedAt: new Date(),
    };
    socket.emit("test", data);
  });

  socket.on("setNewPrice", (data) => {
    // @TODO - db connection
    currentPrice = data; // act like DB, gonna implement db connection later on

    socket.emit("priceChanged");
  });

  socket.on("getCurrentPrice", () => {
    socket.emit("currentPrice", currentPrice);
  });

  socket.on("disconnect", () => {
    console.log(`Client-${socket.id} disconnected`);
  });
});

const PORT = process.env.PORT || 5500;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
