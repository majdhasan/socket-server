const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer();
const morgan = require('morgan');

// initialize socket io server on port 5001
const io = socketIO(server);
const port = process.env.PORT || 5001;

server.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
