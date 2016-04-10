var socket = io(),
    newMessagesCount = 0,
    chatTitle = "Socket.IO chat";

$('#login form').submit(function () {
    $('#login').css('display','none');
    $('#chat').css('display','block');
    var pseudo = $('#pseudo').val();
    var user = {
        pseudo:pseudo,
        channel:"channel1"
    };
    socket.emit('connect user',user);
    return false;
});

$('#chat form').submit(function(){
    var msg = $('#m').val(),
        channel = "channel1",
        send = {
            channel:channel,
            msg:msg
        };
    socket.emit('chat message', send);
    $('#m').val('');
    return false;
});

$('#chat').focusin(function () {
    clearTitle();
});
$('#chat').click(function () {
    clearTitle();
})

socket.on('connect user', function(user){
    var msg = user.pseudo+" est connecté.";
    $('#messages').append($('<li class="connection">').text(msg));
    $('#list #userList').text('');
});

socket.on('user list', function(user){
    $('#list #userList').append($('<li>').text(user.pseudo));
});

socket.on('chat message', function(send){
    var msg = send.pseudo+" : "+send.msg;
    $('#messages').append($('<li>').text(msg));
    //Add 1 to the "lastMessages" and show it in the doc title
    newMessagesCount++;
    $(document).prop('title', '('+newMessagesCount+") - "+chatTitle);
});

socket.on('clear title', function(){
    clearTitle();
});

function clearTitle(){
    newMessagesCount=0;
    $(document).prop('title',chatTitle);
}

function showMessage(user,msg){

}