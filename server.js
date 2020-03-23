const express = require('express')
const app = express()
const bodyParser = require('body-parser');
var cors = require('cors');
const server = require('http').createServer(app);
const cookieParser = require('cookie-parser');
const io = require('socket.io')(server);
const hostname = '127.0.0.1';
const port = 5000;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

var router = express.Router()
let db = []
app.use('/',router)

router.post('/signup', function(req, res){
    console.log("Sign up")
    if(req.body.username){
        if(!db.includes(req.body.username)) {
            db.push(req.body.username)
            return res.status(200).send({success: true, msg:"Successful create new user"})
        }
        else{
            return res.status(200).send({success: false, msg:"User already exist"})
        }
    }
    return res.status(200).send({success: false, msg:"Bad request"})
});

router.post('/online', function(req, res) {
    console.log("Check online")
    return res.status(200).send({online:db})
})

io.on('connection', function(socket){

    socket.on('chat message', function(msg){
        console.log(msg)
        io.emit('chat message', msg);
    });
    console.log("One connecting")
    socket.on('disconnect', function() {
        console.log("Disconnecting")
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});