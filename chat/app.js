var http = require("http");
var socketio = require("socket.io");
var fs = require("fs");

var server = http.createServer(function(req, res) {
     res.writeHead(200, {"Content-Type":"text/html"});
     var output = fs.readFileSync("./index.html", "utf-8");
     res.end(output);
}).listen(process.env.VMC_APP_PORT || 3000);

var io = socketio.listen(server);

io.sockets.on("connection", function (socket) {

  socket.on("user_message", function (data) {
    io.sockets.emit("server_message", {value:data.value});
  });

});