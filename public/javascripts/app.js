var app = angular.module('app', ['ngResource', 'ngRoute','ngCookies']).value('toastr', toastr);

app.config(function($routeProvider, $locationProvider) {
    // $locationProvider.html5Mode(true);

    var routeUserChecks = {
        adminRole: {
            authenticate: function(auth) {
                return auth.isAuthorizedForRole('admin');
            }
        },
        authenticated: {
            authenticate: function(auth) {
                return auth.isAuthenticated();
            }
        }
    };

    $routeProvider
        .when('/', {
            templateUrl: '/javascripts/account/login.html',
            controller: 'LoginCtrl'
        })
        .when('/signup', {
            templateUrl: '/javascripts/account/profile.html',
            controller: 'SignUpCtrl'
        })
        .when('/chat/mainChatRoom', {
            templateUrl: '/javascripts/chat/mainChatRoom.html',
            controller: 'mainChatRoomCtrl'
        })
});

app.run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    })
});