var app = require('express')(),
    server = require('http').createServer(app);

require('./server/config/express')(app);

require('./server/config/route')(app);

server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
require('./server/config/sockets.js').initialize(server);
