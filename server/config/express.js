var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport');

module.exports = function(app) {
    app.set('port', process.env.PORT || 8080);
    app.set('view engine', 'jade');
    app.set('views', path.join(__dirname, '../view'));
    app.use(favicon(__dirname + '../../../public/img/wendy-favicon.png'));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(session({ secret: 'privacy', resave: true, saveUninitialized: true}));
    app.use(logger('dev'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(path.join(__dirname, '../../public')));
};