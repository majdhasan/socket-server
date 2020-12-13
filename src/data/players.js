const players = [];

const createPlayer = (id, name, gameId, symbol) => {
  const player = {
    id,
    name,
    gameId,
    symbol,
  };

  players.push(player);
  return player;
};

module.exports = { createPlayer };
