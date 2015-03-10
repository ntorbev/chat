$(function() {
    "use strict";

    var socket = io().connect('http://localhost:8080');//document.domain
//    var $window = $(window);
    var user,
        sessionId;

    $('#nickname').keypress(function(e){
        if (e.keyCode==13 && $('#nickname').val()!='')
            $('#setUserlogin').trigger("click")
    });

    $('#setUserlogin').click(function(data) {
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

    $('#message').keypress(function(e){
        if(e.keyCode==13 && $('#message').val()!='')
            $('#sendMessage').trigger('click')
    });

    $('#sendMessage').click(function () {
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

   socket.on('setMessage', function(data){
       $('#messages').append(
               '<div class="' + data.user +'"><span class=data.user>' + data.user + ":</span> " + data.message + '</div>');
   });

});
