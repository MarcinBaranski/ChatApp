const app = require ('express')();
const http = require ('http').createServer(app)
const jwt = require ('jsonwebtoken')
const io = require('socket.io')(http,{
    cors: {
        origins: ['http://localhost:4200']
    }
});

const secretKey = '';

//default msg
app.get('/',(req,res) => {
    res.send('<h1>Hi From Node Socket.io</h1>');
});


io.on('connection',(socket) => {
    console.log('a user connected');

    socket.on('disconnect', () =>{
        console.log('user disconnected');
    })

    socket.on('my message', (msg) => {
        const decoded = jwt.verify(msg.token,secretKey);
        const messageObject = {...msg, ...decoded};
        io.emit('my broadcast', '${JSON.stringify(messageObject)}');
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});
