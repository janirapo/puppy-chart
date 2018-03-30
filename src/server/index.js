var express = require('express');
var app = express();

app.use(express.static(__dirname +'./../../')); //serves the index.html
app.listen(3001); //listens on port 3001 -> http://localhost:3001/
