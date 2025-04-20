const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const server = http.createServer(app); // Server create karte hain
const io = socketio(server); // Socket.IO ko server se bind karte hain

// EJS Setup
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Socket.IO Connection
io.on('connection', (socket) => {
    socket.on("send-location",function(data){
        io.emit("resive-location",{id:socket.id,...data})
    })

    socket.on('disconnect', () => {
        io.emit('user-disconnected', socket.id );
    });

    
});

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

// Server ko listen karte hain
server.listen(3000);
