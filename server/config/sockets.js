exports.initialize = function( server,  Session, sessionStore ) {
    var participants = {},
        io = require('socket.io')(server),
        cookieParser = require('socket.io-cookie-parser');

    io.use(cookieParser());
    io.use(function(socket, next) {
        socket.cookie = socket.request.cookies;
        socket.sessionID = socket.request.cookies['express.sid'].split(".")[0].split(':')[1];
        socket.sessionStore = sessionStore;
        sessionStore.get(socket.sessionID, function (err, session) {
            socket.session = new Session(socket, session);
        });
        participants[socket.id.replace(/\/#/i, '')]={
            socketId: socket.id.replace(/\/#/i, ''),
            userName: socket.request.cookies.username,
            sessionId:socket.sessionID,
            leftRoom:false
        };
        socket.emit("newUser", {participants: participants});
        io.emit("newUser", {participants: participants});

        next();
    });
    io.on("connection", function(socket){
        socket.on("newUser", function(data) {
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