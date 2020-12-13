const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer();
const morgan = require('morgan');
const { createId } = require('./utils/helpers');
const { createGame } = require('./data/games');
const { createPlayer } = require('./data/players');

// initialize dotenv
require('dotenv').config();

// initialize socket io server on port 5001
const io = socketIO(server);
const port = process.env.PORT || 5001;

io.on('connection', (socket) => {
  console.log('New connection has been established with the socket.io server');
  socket.on('createGame', (data) => {
    console.log(data);
    const gameId = createId();
    const player = createPlayer(socket.id, data.name, gameId, 'X');
    const game = createGame(gameId, player.id, null);
  });

  socket.on('joinGame', (data) => {});

  socket.on('disconnect', () => {
    console.log('Client has disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
