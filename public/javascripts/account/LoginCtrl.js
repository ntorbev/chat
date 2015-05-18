'use strict';

app.controller('LoginCtrl', function($scope, $location, notifier, identity, auth) {
    $scope.identity = identity;

    if(identity.currentUser){
        $location.path('/chat/mainChatRoom');
    }

    $scope.login = function(user) {
        auth.login(user).then(function(success) {
            if (success) {
                notifier.success('Successful login!');

                var socket = io().connect('http://localhost:8080');
                socket.emit('newUser', {name: user.username});
                $location.path('/chat/mainChatRoom');
            }
            else {
                notifier.error('Username/Password combination is not valid!');
            }
        });
    };
});