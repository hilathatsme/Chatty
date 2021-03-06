var express = require('express');
var app = express();
var socket = require('socket.io');

app.set('port', (process.env.PORT || 8080))
server = app.listen(app.get('port'), function(){
    console.log(`server is running on port ${app.get('port')}`)
});

io = socket(server);

io.on('connection', (socket) => {
    console.log(socket.id);
    
    socket.on('SEND_MESSAGE', function(data){
        io.emit('RECEIVE_MESSAGE', data);
    })
});

const path = require('path')// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
})