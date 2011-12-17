var send, receive = $.noop;
(function (undefined) {
  var socket = new io.Socket()
  socket.connect()
  setTimeout(reconnect,500);
  socket.on('message', function(data){ 
    console.log(data)
    if( data.update === 'style' ) {
      $('#style').remove();
      $('head').append('<style id="style">' + data.contents + '</style>');
    } else {
      receive(data);
    }
  })
  socket.on('disconnect', reconnect) 
  function reconnect () {
    if(socket.connected) {
      return false;
    } else if(socket.connecting) {
      setTimeout( reconnect, 2000 );
    } else {
      socket.connect();
      setTimeout( reconnect, 500 );
    }
  }
  send = function (arg) {
    socket.send(arg);
  }
})()