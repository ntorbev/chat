var auth = require('./auth'),
    controllers = require('../controller');    ;

module.exports = function(app)
{
    var index = require('../controller/index');

    app.post('/login', auth.login);
    app.get('/api/users', auth.isInRole('admin'), controllers.users.getAllUsers);
    app.post('/api/users', controllers.users.createUser);

    app.get('*', function(req, res) {
        res.render('index', {currentUser: req.user});
    });
};