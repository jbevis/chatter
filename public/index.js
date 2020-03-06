$(function () {
  const socket = io();
  getChat();

  socket.on('user connection', function () {
    $('#messages').append($('<li>').text('someone connected'));
  });

  socket.on('user disconnect', function () {
    $('#messages').append($('<li>').text('someone disconnected'));
  });

  socket.on('user count', function (num) {
    $('#users').html(`users online ${num}`);
  });

  $('#set-alias').on('click', function () {
    let name = $('#alias').val();

    $('#chat').html(name);
  });

  $('form').submit(function (e) {
    e.preventDefault();
    let alias = $('#chat').html();
    let message = $('#msg').val();

    alias === "" ? alias = 'Anonymous User' :
    addMessage({ user: alias, message: message });
    socket.emit('chat message', { message: message, alias: alias });
    $('#messages').append($('<li>').text(`${alias}: ${message}`));
    $('#msg').val('');
    return false;
  });

  socket.on('chat message', function (post) {
    const { message, alias } = post;
    $('#messages').append($('<li>').text(`${alias}: ${message}`));
  });

});