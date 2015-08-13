var app = require('express')(),
    env = process.env.NODE_ENV || 'development',
    config = require('./server/config/config')[env],
    server = require('http').createServer(app),
    Session = require('express-session'),
    sessionStore = new Session.MemoryStore();

require('./server/config/express')(app,Session,sessionStore);
require('./server/config/mongoose')(config);
require('./server/config/passport')();
require('./server/config/route')(app);

server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
require('./server/config/sockets.js').initialize(server,Session, sessionStore);
//node-debug -p 9000 server.js 8080