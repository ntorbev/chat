
exports.initialize = function(server) {
    var participants = [];

    io = require('socket.io').listen(server);

    io.sockets.on("connection", function(socket){

        socket.on("newUser", function(data) {
            participants.push({id: data.id, name: data.name});
            io.sockets.emit("newUser", {participants: participants});
        });

        socket.on('newMessage', function(data){
            socket.broadcast.emit('setMessage', {
                message:data.message,
                user:data.user});
        });
    });
};