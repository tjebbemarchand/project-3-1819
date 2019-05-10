const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const uuidv4 = require('uuidv4');
const port = 8080;
const tags = [{
    id: '1',
    name: 'Other',
    value: 'other',
    total: 0,
    color: '#1abc9c',
    createdAt: 0,
    editedAt: false,
    createdBy: 'T. Marchand',
    delete: false
}];

app.use(express.static(__dirname + '/static'));
app.set('views', path.join(__dirname, '/views'));

app.get('/tags', function (req, res) {
    res.sendFile(__dirname + '/views/tags.html');
});

app.get('/run', function (req, res) {
    res.sendFile(__dirname + '/views/run.html');
});

app.get('/runs', function (req, res) {
    res.sendFile(__dirname + '/views/runs.html');
});

io.on('connection', function(socket) {
    function getTags() {
        return tags.map(function(tag) {
            return {
                id: tag.id,
                name: tag.name,
                color: tag.color
            }
        });
    }

    socket.emit('all tags', getTags());

    socket.on('new tag', function(tagData) {
        tagData.id = uuidv4();
        tags.push(tagData);

        const filteredTag = {
            id: tagData.id,
            name: tagData.name,
            color: tagData.color
        }
        io.emit('new tag', filteredTag);
    });

    socket.on('delete tag', function(id) {
        const foundTag = tags.findIndex(function(tag) {
            return tag.id === id;
        });

        if(foundTag > -1) {
            if(tags[foundTag].delete !== false) {
                tags.splice(foundTag, 1);
                io.emit('all tags', getTags());
            }
        }
    });
});

/* io.on('connection', function (socket) {
    function getTags() {
        return tags.map(function (tag) {
            return {
                id: tag.id,
                name: tag.name,
                color: tag.color,
                total: tag.total
            }
        });
    }
    
    socket.on('tags tag page', function() {
        const tagData = getTags();
        io.emit('tags tag page', tagData);
    });
    
    socket.on('tags run page', function() {
        const tagData = getTags();
        io.emit('tags run page', tagData);
    });

    socket.on('new tag', function (data) {
        const foundTag = tags.find(function (tag) {
            return tag.name.toLowerCase() === data.name.toLowerCase();
        });

        if (!foundTag) {
            data.id = uuidv4();
            tags.push(data);

            const tag = {
                id: data.id,
                name: data.name,
                color: data.color,
                total: data.total
            }

            io.emit('new tag tag page', tag);
            io.emit('new tag run page', tag);
        } else {
            socket.emit('error message', 'Tag name already exists');
        }
    });

    socket.on('delete tag', function(id) {
        const foundTag = tags.findIndex(function(tag) {
            return tag.id === id;
        });

        if(foundTag > -1) {
            if(tags[foundTag].delete !== false) {
                tags.splice(foundTag, 1);
                socket.emit('tags tag page', getTags());
            }
        }
    });
}); */

http.listen(port, function () {
    console.log(`Listening on port ${port}`);
});