const createId = (length = 5) => {
  return Math.random().toString(36).substr(2, length);
};

module.exports = { createId };
