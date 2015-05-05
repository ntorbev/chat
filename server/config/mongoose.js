var mongoose = require('mongoose'),
    User = require('../models/User');

module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;

    db.once('open', function(err) {
        if (err) {
            console.log('Database could not be opened: ' + err);
            return;
        }
    });

    db.on('error', function(err){
        console.log('Database error: ' + err);
    });

    User.seedInitialUsers();
};