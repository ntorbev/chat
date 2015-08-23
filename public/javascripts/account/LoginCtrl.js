app.controller('LoginCtrl', function($scope, $location, notifier, identity, auth) {
    $scope.identity = identity;

    if(identity.currentUser){
        $location.path('/chat/mainChatRoom');
    }

    $scope.login = function(user) {
        auth.login(user).then(function(success) {
            if (success) {
                notifier.success('Successful login!');
                $location.path('/chat/mainChatRoom');
                var socket = io().connect('http://localhost:8080');
            }
            else {
                notifier.error('Username/Password combination is not valid!');
            }
        });
    };
});