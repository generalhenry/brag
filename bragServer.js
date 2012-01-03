/**
 * Module dependencies.
 */
var express = require('express');
//var stylus = require('stylus');
var fs = require('fs');
var io = require('socket.io');

var app = express.createServer();

/**
*  config
*/

var PORT = 84;

/*function compileMethod(str) {
  return stylus(str)
    .set('compress', true)
    .set('paths', [__dirname + '/public/stylesheets']);
};*/

app.configure( function () {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  //app.use( stylus.middleware(__dirname + '/public') );
});
app.configure('development', function () {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});
app.configure('production', function () {
  app.use(express.errorHandler()); 
});

// Routes
app.get('/', function (req, res, next) {
  res.render('index', {
    title: 'My Brag Page'
  });
});


// Only listen on $ node app.js
if (!module.parent) {
  app.listen( PORT );
  console.log("Express server listening on port %d", app.address().port);
}
var socket = io.listen(app); 
socket.on('connection', function(client){ 
  client.on('message', function ( message ) {
    console.log( message );
  });
}); 

/*var style = __dirname + '/public/stylesheets/style.styl';
fs.watchFile(style, function (curr, prev) {
  refreshCSS( function (css) {
    socket.broadcast({update: 'style',contents:css});
    console.log({update: 'style'});
  });
});
function refreshCSS (mycallback) {
  fs.readFile(style, function (err, data) {
    compileMethod(String(data)).render(function(err, css){
      fs.writeFile(__dirname + '/public/stylesheets/style.css', css, function (err) {
        mycallback(css);
      });
    });
  });
}

setTimeout(process.exit, 1 * 60 * 60 * 1000);
*/
