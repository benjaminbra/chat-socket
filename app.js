var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bot = require('./bot');
var allClients = [];

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('new connection');

    socket.on('connect user', function(user){
        console.log('a user connected');
        socket.user = user;
        allClients.push(socket);
        io.emit('connect user', user);
        allClients.forEach(function(element,index,array){
            io.emit('user list',element.user);
        });
    });
    socket.on('disconnect', function(){
        console.log('a user disconnected');
        if(socket.user!=null){
            var i = allClients.indexOf(socket);
            allClients.splice(i,1);
            io.emit('disconnect user', socket.user);
            allClients.forEach(function(element,index,array){
                io.emit('user list',element.user);
            });
        }
    });
    socket.on('chat message', function(send){        
        console.log(send.user+": "+send.msg);
        io.emit('chat message', send);
        if(bot.command(send)){
            io.emit('chat message',bot.botMessage(send));
            console.log(send.user+": "+send.msg);
        }
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});