const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

mongoose.connect('mongodb://localhost:27017/studybuddy', { useNewUrlParser: true, useUnifiedTopology: true });

let waitingUser = null;

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('search-study-mate', () => {
    if (waitingUser) {
      // Pair users
      socket.emit('connected-with-mate', { name: 'Study Mate' });
      socket.to(waitingUser.socketId).emit('connected-with-mate', { name: 'Study Mate' });

      // Reset waiting user
      waitingUser = null;
    } else {
      waitingUser = { socketId: socket.id, name: 'Study Mate' };
    }
  });

  // WebRTC signaling events
  socket.on('offer', (offer) => {
    socket.broadcast.emit('offer', offer);
  });

  socket.on('answer', (answer) => {
    socket.broadcast.emit('answer', answer);
  });

  socket.on('ice-candidate', (candidate) => {
    socket.broadcast.emit('ice-candidate', candidate);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    if (waitingUser?.socketId === socket.id) {
      waitingUser = null;
    }
  });
});

server.listen(5000, () => {
  console.log('listening on *:5000');
});
