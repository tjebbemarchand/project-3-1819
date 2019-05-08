const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const port = 8080;
const tags = [];

app.use(express.static(__dirname + '/static'));
app.set('views', path.join(__dirname, '/views'));

app.get('/tags', function(req, res) {
    res.sendFile(__dirname + '/views/tags.html');
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', function(socket) {
    const tagData = tags.map(function(tag) {
        return {
            name: tag.name,
            color: tag.color,
            total: tag.total
        }
    });

    io.emit('all tags', tagData);

    socket.on('new tag', function(data) {
        const foundTag = tags.find(function(tag) {
            return tag.name.toLowerCase() === data.name.toLowerCase();
        });

        if(!foundTag) {
            tags.push(data);
            io.emit('new tag', {
                name: data.name,
                color: data.color,
                total: data.total
            });
        } else {
            socket.emit('error message', 'Tag name already exists');
        }
    });
});

http.listen(port, function () {
    console.log(`Listening on port ${port}`);
});