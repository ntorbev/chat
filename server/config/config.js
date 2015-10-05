var path = require('path'),
    rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/chat'
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://admin:admin131619@ds043329.mongolab.com:43329/chat'
    }
};