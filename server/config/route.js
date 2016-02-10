var auth = require('./auth'),
    controllers = require('../controller');

module.exports = function(app)
{
    var index = require('../controller/index');

    app.post('/login', auth.login);
    app.post('/logout', auth.logout);
    app.get('/api/users', auth.isInRole('admin'), controllers.users.getAllUsers);
    app.post('/api/users', controllers.users.createUser);
    app.put('/api/users', auth.isAuthenticated, controllers.users.updateUser);

    app.get('*', function(req, res) {
        res.render('index', {currentUser: req.user});
    });
};