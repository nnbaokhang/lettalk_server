const app = require('express')()
const server = require('http').createServer(app);
const cookieParser = require('cookie-parser');
const io = require('socket.io')(server);
const hostname = '127.0.0.1';
const port = 3000;
app.use(cookieParser());

app.get('/name', function(req, res){
    res.sendFile(__dirname + '/name.html');
});


app.get('/', function(req, res){
    res.sendFile(__dirname + '/chat.html');
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});