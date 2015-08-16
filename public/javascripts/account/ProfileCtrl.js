app.controller('profileCtrl', function($scope, $location, auth, notifier, identity) {
    $scope.identity = identity;

    if(identity.currentUser){
        $scope.user={
            firstName:identity.currentUser.firstName,
            lastName:identity.currentUser.lastName,
            username:identity.currentUser.username,
            password:identity.currentUser.password
        };
    }

    $scope.signup = function(user) {
        auth.signup(user).then(function() {
            notifier.success('Registration successful!');
            $location.path('/');
        })
    };
    $scope.update = function(user) {
        auth.update(user).then(function() {
            $location.path('/');
        });
    }
});