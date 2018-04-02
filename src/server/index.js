const express = require('express');
const app = express();

const userService = require('./services/userService');
const middleWare = require('./middleware');

app.use(express.static(__dirname + './../../')); //serves the index.html

app.get('/api/user', middleWare.noCache, middleWare.jsonContent, function(req, res) {
    userService.getAllUsers(dbResult => {
        res.send(JSON.stringify({ users: dbResult }));
    });
});

app.get('/api/user/:userId', middleWare.noCache, middleWare.jsonContent, function(req, res) {
    userService.getUser(req.params.userId, dbResult => {
        res.send(JSON.stringify({ user: dbResult }));
    });
});

//app.get('/api/pet', nocache, function(req, res) {
//    db.getPets((dbResult) => {
//        res.setHeader('Content-Type', 'application/json');
//        res.send(JSON.stringify({ pets: dbResult }));
//    });
//});

app.listen(3000); //listens on port 3000 -> http://localhost:3000/
