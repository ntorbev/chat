
exports.initialize = function(server) {
    var participants = [];

    io = require('socket.io')(server);

    io.on("connection", function(socket){
        socket.on("newUser", function(data) {
            participants.push({id: data.id, name: data.name});
            socket.emit("newUser", {participants: participants});
        });

        socket.on('newMessage', function(data){
            socket.broadcast.emit('set Message', {
                message:data.message,
                user:data.user
            });

        });
    });
};