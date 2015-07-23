app.controller('mainChatRoomCtrl', function($scope, $rootScope, $location, auth, notifier){
    $scope.menuOptions = [
        ['Update', function () {
            $location.path('/signup');
        }],
        null,
        ['Log Out', function () {
            auth.logout().then(function(user) {
                notifier.success('Successful logout!');
                $location.path('/');
                socket.disconnect();
            })
        }]
    ];

    var socket = io().connect('http://localhost:8080'),
        participants = {};

    $('#MessageBtn').click(function () {
        var data = {
            message: $('#messageInput').val(),
            user:participants[socket.id].name
        };

        $('#messageInput').val('');
        $('#messages').append(
            '<div class="' + data.id +'"><span class="name">' + data.user + ":</span> " + data.message + '</div>');

        socket.emit('newMessage', data);
    });

    socket.on('newUser', function (data) {
        participants = data.participants;
        renderParticipants(participants);
    });

    socket.on('setMessage', function(data){
        $('#messages').append(
            '<div class="' + data.user +'"><span>' + data.user + ":</span> " + data.message + '</div>');
    });

    socket.on('disconnected', function (id) {
        delete participants[id.id];
        renderParticipants(participants);
    });

    function renderParticipants(participants){
        $('#participants').html('');
        $scope.socketId=socket.id;
        for (var i in participants){
            $('#participants').append('<a class="list-group-item"  id="' + participants[i].id + '">' +
                participants[i].name + ' ' + (participants[i].id === socket.id ? '(You)' : '') + '<br /></a>');
        }
    }
});