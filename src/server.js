const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer();
const morgan = require('morgan');
const { createId } = require('./utils/helpers');

// initialize dotenv
require('dotenv').config();

// initialize socket io server on port 5001
const io = socketIO(server);
const port = process.env.PORT || 5001;

io.on('connection', (socket) => {
  console.log('New connection has been established with the socket.io server');
  socket.on('createGame', (data) => {
    console.log(data);
  });

  socket.on('joinGame', (data) => {});

  socket.on('disconnect', () => {
    console.log('Client has disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
