
module.exports = function(app)
{
    var index = require('../controller/index');

    app.get('/',  index.index);
};