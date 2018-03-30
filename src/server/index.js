const express = require('express');
const app = express();

app.use(express.static(__dirname + './../../')); //serves the index.html

app.get('/api/get-user', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ userName: 'TEST USER' }));
});

app.listen(3000); //listens on port 3000 -> http://localhost:3000/
