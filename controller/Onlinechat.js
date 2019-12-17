
var request = require('request');
var cheerio = require('cheerio');
var request = require('request');
var loginJar = request.jar();
var chat = require('./../model/Chat');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
module.exports = (io) => {

  io.on("connection", socket => {
    socket.on('join', async ({ name, room }, callback) => {   // Joim room 
      const { error, user } = await addUser({ id: socket.id, name, room });
      if (error) return callback(error);
      socket.join(user.room);
      socket.emit('message', { user: 'Chào mừng' + " ", text: `${user.name} đã tham gia phòng chat ${user.room}.` }); // Welcome to room
      socket.broadcast.to(user.room).emit('message', { user: " ", text: `${user.name} vừa tham gia phòng chat` });
      let userinroom = await getUsersInRoom(user.room); //get userinroom
      // io.to(user.room).emit('roomData', { room: user.room, users: userinroom.name });

      callback();
    });
    socket.on('sendMessage', async msg => {
      const user = await getUser(socket.id);
      io.to(user.room).emit('sendMessage', { user: user.name, text: msg });
      // callback();
    });
    socket.on('Disco', async () => {
      const user = await removeUser(socket.id);

      if (user) {
        io.to(user.room).emit('message', { user: ' ', text: `${user.name} đã rời khỏi phòng.` });
        // io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
      }
    })
  })
}
