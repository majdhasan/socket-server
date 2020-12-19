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
  const symbol = game.player1 === playerId ? 'X' : 'O';

  if (game.player2 && game.player1 && game.playerTurn == playerId) {
    game.playBoard[boxIndex] = symbol;
    switchTurn(gameIndex);
    return game;
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
};

module.exports = { createGame, updateGame, addPlayerToGame };
