const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer();
const morgan = require('morgan');
const { createId } = require('./utils/helpers');
const {
  createGame,
  updateGame,
  addPlayerToGame,
  leaveGame,
} = require('./data/games');
const { createPlayer } = require('./data/players');

// initialize dotenv
require('dotenv').config();

// initialize socket io server on port 5001
const io = socketIO(server);
const port = process.env.PORT || 5001;

// Handle incoming Websocket connections
io.on('connection', (socket) => {
  console.log('New connection has been established with the socket.io server');

  socket.on('createGame', (data) => {
    const gameId = createId();
    const player = createPlayer(socket.id, data.name, gameId, 'X');
    const game = createGame(gameId, player.id, null);
    socket.emit('playerCreated', { player });
    socket.emit('gameCreated', { game });
  });

  socket.on('joinGame', (data) => {
    const player = createPlayer(socket.id, data.name, data.gameId, 'O');
    const game = addPlayerToGame(socket.id, data.gameId);
    socket.emit('playerCreated', { player });
    socket.emit('gameJoined', { game });
    io.emit('gameUpdated', { game });
  });

  socket.on('updateGame', (data) => {
    const { gameId, playerId, box } = data;
    console.log('box', box);
    const game = updateGame(gameId, parseInt(box), playerId);
    if (game) {
      io.emit('gameUpdated', { game });
    }
  });

  socket.on('disconnect', () => {
    console.log('Player left');
  });
});

server.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
