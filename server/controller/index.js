//exports.index = function(req, res){
//    res.render('index', { title: 'Free Chat - demo' });
//};

var usersController = require('../controller/UsersController');
//var coursesController = require('../controllers/coursesController');

module.exports = {
    users: usersController
//    courses: coursesController
}