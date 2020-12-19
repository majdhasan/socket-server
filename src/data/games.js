const games = [];

const createGame = (id, player1, player2) => {
  const game = {
    id,
    player1,
    player2,
    playerTurn: player1,
    playBoard: Array(9).fill(null),
    status: 'waiting',
    winner: null,
  };

  games.push(game);
  return game;
};

const getGameIndex = (gameId) => {
  return games.findIndex((game) => {
    return game.id == gameId;
  });
};

const updateGame = (gameId, boxIndex, playerId) => {
  const gameIndex = getGameIndex(gameId);
  const game = games[gameIndex];
  const symbol = games[gameIndex].player1 === playerId ? 'X' : 'O';

  if (
    games[gameIndex].player2 &&
    games[gameIndex].player1 &&
    games[gameIndex].playerTurn == playerId
  ) {
    console.log('entered');
    games[gameIndex].playBoard[boxIndex] = symbol;
    switchTurn(gameIndex);
    console.log(games[gameIndex]);
    return games[gameIndex];
  }
  return false;
};

const switchTurn = (gameIndex) => {
  const game = games[gameIndex];
  game.playerTurn =
    game.playerTurn === game.player1 ? game.player2 : game.player1;
};

const addPlayerToGame = (playerId, gameId) => {
  const gameIndex = getGameIndex(gameId);
  games[gameIndex].player2 = playerId;
  games[gameIndex].status = 'started';

  return games[gameIndex];
};

const leaveGame = (playerId, gameId) => {
  const gameIndex = getGameIndex(gameId);
  games[gameIndex].status = 'left';
  return games[gameIndex];
};

module.exports = { createGame, updateGame, addPlayerToGame, leaveGame };
