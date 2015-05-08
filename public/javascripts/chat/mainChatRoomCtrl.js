app.controller('mainChatRoomCtrl', function($scope, $rootScope, $location, auth, notifier) {
    $scope.menuOptions = [
        ['Update', function ($itemScope) {
//            $scope.player.gold -= $itemScope.item.cost;
        }],
        null,
        ['Log Out', function ($itemScope) {
            auth.logout().then(function() {
                notifier.success('Successful logout!');
                if ($scope.user) {
                    $scope.user.username = '';
                    $scope.user.password = '';
                }
                $location.path('/');
            })
        }]
    ];

    var socket = io().connect('http://localhost:8080'),
        participants=[];

    $('#MessageBtn').click(function () {
        var data = {
            id :  $rootScope.sessionId,
            message: $('#messageInput').val(),
            user:$rootScope.username
        };

        $('#messageInput').val('');
        $('#messages').append(
            '<div class="' + data.id +'"><span class="name">' + data.user + ":</span> " + data.message + '</div>');

        socket.emit('newMessage', data);
    });

    socket.on('newUser', function (data) {
        participants = data.participants;

        $('#participants').html('');
        for (var i = 0; i < participants.length; i++) {
            $('#participants').append('<a class="list-group-item"  id="' + participants[i].id + '">' +
                participants[i].name + ' ' + (participants[i].id === socket.id ? '(You)' : '') + '<br /></a>');
        }
    });

    socket.on('setMessage', function(data){
        $('#messages').append(
            '<div class="' + data.user +'"><span>' + data.user + ":</span> " + data.message + '</div>');
    });

    socket.on('disconnect', function () {
        if (addedUser) {
            delete usernames[socket.username];
            --numUsers;
            socket.broadcast.emit('user left', {
                username: socket.username,
                numUsers: numUsers
            });
        }
    });
});