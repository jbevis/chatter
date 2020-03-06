const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
let users = 0;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/v1/chat', (req, res) => {
  database('chat').select()
    .then(chat => {
      if (chat.length) {
        res.status(200).json(chat);
      } else {
        res.status(404).json({
          error: 'No chat was found'
        });
      }
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

app.post('/api/v1/chat', (req, res) => {
  const message = req.body;

  for (let requiredParameter of ['user', 'message']) {
    if (!message[requiredParameter]) {
      return res.status(422).json({
        error: `Expected format: { user: <String>, message: <String> }. You are missing the ${requiredParameter} property.`
      });
    }
  }

  database('chat').insert(message, 'id')
    .then(message => {
      res.status(201).json({ id: message[0] })
    })
    .catch(error => {
      res.status(500).json({ error })
    })
});

io.on('connection', function (socket) {
  io.emit('user connection', 'someone joined the chat.');
  users++;
  io.emit('user count', users);

  socket.on('disconnect', () => {
    users--;
    io.emit('user count', users);
    io.emit('user disconnect', 'someone left the chat.');
  });

  socket.on('chat message', function (post) {
    socket.broadcast.emit('chat message', post);
  });
});

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

module.exports = server;