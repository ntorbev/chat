exports.initialize = function(server) {
    var participants = {};
    io = require('socket.io')(server);

    io.on("connection", function(socket){
        socket.on("newUser", function(data) {
            participants[socket.id]={id: socket.id, name: data.name};
            io.sockets.emit("newUser", {participants: participants});
        });

        socket.on('newMessage', function(data){
            socket.broadcast.emit('setMessage', {
                message:data.message,
                user:data.user
            });
        });
        socket.on('disconnect', function () {
            delete participants[socket.id];
            io.sockets.emit('disconnected',{ id: socket.id });
        });
    });
};