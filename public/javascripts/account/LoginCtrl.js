'use strict';

app.controller('LoginCtrl', function($scope, $location, notifier, identity, auth,$rootScope) {
    $scope.identity = identity;
    $scope.login = function(user) {
        auth.login(user).then(function(success) {
            if (success) {
                notifier.success('Successful login!');

                var socket = io().connect('http://localhost:8080');
                $rootScope.sessionId = socket.io.engine.id;
                $rootScope.username = user.username;
//                $('#messages').append('<div class="systemMessage">' + 'Hello ' + user  + '</div>');
                socket.emit('newUser', {id: $rootScope.sessionId, name: user.username});


                $location.path('/chat/mainChatRoom');
            }
            else {
                notifier.error('Username/Password combination is not valid!');
            }
        });
    };

    $scope.logout = function() {
        auth.logout().then(function() {
            notifier.success('Successful logout!');
            if ($scope.user) {
                $scope.user.username = '';
                $scope.user.password = '';
            }
            $location.path('/');
        })
    }
});