var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');

module.exports = function(app) {
    app.set('port', process.env.PORT || 8080);
    app.set('view engine', 'jade');
    app.set('views', path.join(__dirname, '../view'));
    app.use(favicon(__dirname + '../../../public/img/wendy-favicon.png'));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '../../public')));
};