const express = require('express');
const app = express();

const userService = require('./services/userService');
const petService = require('./services/petService');

const middleWare = require('./middleware');

app.use(express.static(__dirname + './../../build/')); //serves the build/index.html

app.get('/api/user', middleWare.noCache, middleWare.jsonContent, function(req, res) {
    userService.getAllUsers(dbResult => {
        res.send(JSON.stringify({ users: dbResult }));
    });
});

app.get('/api/user/:userId', function(req, res) {
    userService.getUser(req.params.userId, dbResult => {
        res.send(JSON.stringify({ user: dbResult }));
    });
});

app.get('/api/pet/get-all-by-user/:userId', middleWare.noCache, middleWare.jsonContent, function(req, res) {
    petService.getAllByUser(req.params.userId, dbResult => {
        res.send(JSON.stringify({ pets: dbResult }));
    });
});

app.listen(3000); //listens on port 3000 -> http://localhost:3000/
