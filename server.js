const {addUser, removeUser, getUser, getUsersInRoom} = require('./Users.js');

const express = require('express'); 

const socketio = require('socket.io'); 

const http = require('http'); 

const app = express(); 

const server = http.createServer(app); 

//const io = socketio(server); 
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });

const router = require('./router'); 
const { callbackify } = require('util');

const PORT = process.env.PORT || 5000

io.on('connection', (socket) => {
    socket.on('join', ({ name, room }) => {
        const user = addUser({ id: socket.id, name, room });
        
        socket.join(user.room);
    
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
    
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    
        //callback();
    }); 

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id); 

        io.to(user.room).emit('message', {user: user.name, text: message}); 

        callback(); 
    })

    socket.on('change', (video)=>{
        console.log('change video');
        user = getUser(socket.id);  
        console.log(user.room); 
        socket.broadcast.to(user.room).emit('changeVideo', (video));
        console.log((video)); 
    }); 

    socket.on('pause', ()=>{
        console.log('user clicked pause'); 
        socket.broadcast.emit('pauseVideo', 'hello friends!');
    })
    socket.on('play', ()=>{
        console.log('user clicked play'); 
        socket.broadcast.emit('playVideo', 'hello friends!');
    })
    socket.on('disconnect', ()=>{
        const user = removeUser(socket.id); 

        if(user){
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left`})
        }
    })
}); 

app.use(router); 
server.listen(PORT, ()=>console.log('server has started on port! : ' + PORT))