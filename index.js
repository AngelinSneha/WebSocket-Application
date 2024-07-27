const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));
// io.emit - sends messgaes to all clients but socket.emit sends message to that particular client only
// .broadcast.emit - sends messages to all client except the sender's client 
io.on('connection', (socket) => {
  console.log('a user connected');
  // receives messages from client
  socket.on('msg_send', (data) => {
    console.log('Event from client', data)
    // sends messages to client
    io.emit('msg_received', data)
  })
  setInterval(() => {
    // sends messages to client every 2 sec
    socket.emit("from_server");
  }, 2000)
});
server.listen(3000, () => {
  console.log('listening on *:3000');
});
