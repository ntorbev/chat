$(function() {
    "use strict";

    var socket = io().connect('http://localhost:8080');//document.domain
    var $window = $(window);
    var user,
        sessionId;

    $('#setUserlogin').unbind("click").click(function(data) {
        $('#nameform').hide();
        $('#chatroom').show();

        user = $('#nickname').val();
        $('#messages').append('<div class="systemMessage">' + 'Hello ' + user  + '</div>');
        sessionId = socket.io.engine.id;
        socket.emit('newUser', {id: sessionId, name: user});
    });

    socket.on('newUser', function (data) {
        var participants = data.participants;

        $('#participants').html('');
        for (var i = 0; i < participants.length; i++) {
            $('#participants').append('<span id="' + participants[i].id + '">' +
                participants[i].name + ' ' + (participants[i].id === sessionId ? '(You)' : '') + '<br /></span>');
        }
    });

    $('#sendMessage').unbind("click").click(function () {
        var data = {
            id : sessionId,
            message: $('#message').val(),
            user:user
        };
        $('#message').val('');
        $('#messages').append(
                '<div class="' + data.id +'"><span class="name">' + data.user + ":</span> " + data.message + '</div>');

        socket.emit('newMessage', data);
    });

   socket.on('set Message', function(data){
       $('#messages').append(
               '<div class="' + data.user +'"><span class="name">' + data.user + ":</span> " + data.message + '</div>');
   });

});
