const express = require('express');
const app = express();

const userService = require('./services/userService');

function nocache(req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
}

app.use(express.static(__dirname + './../../')); //serves the index.html

// TODO: Refactor to return all if no id is given
app.get('/api/user', nocache, function(req, res) {
    userService.getUser((dbResult) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ user: dbResult[0] }));
    });
});

//app.get('/api/pet', nocache, function(req, res) {
//    db.getPets((dbResult) => {
//        res.setHeader('Content-Type', 'application/json');
//        res.send(JSON.stringify({ pets: dbResult }));
//    });
//});

app.listen(3000); //listens on port 3000 -> http://localhost:3000/
