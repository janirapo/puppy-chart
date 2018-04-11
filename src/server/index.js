const express = require('express'),
    cors = require('cors'),
    errorhandler = require('errorhandler');
const app = express();
const localConfig = require('../../config/local.config');
const middleWare = require('./middleware');

const isProduction = process.env.NODE_ENV === 'production';

app.use(express.static(__dirname + './../../build/')); //serves the build/index.html

app.use(cors());
app.use(middleWare.noCacheHeaders);
app.use(middleWare.jsonHeader);
app.use(express.json());

if (!isProduction) {
    app.use(errorhandler());
}

app.use(require('./routes'));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
    app.use(function(err, req, res, next) {
        console.log(err.stack);

        res.status(err.status || 500);

        res.json({'errors': {
                message: err.message,
                error: err,
            }});
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({'errors': {
            message: err.message,
            error: {}
        }});
});

const server = app.listen(localConfig.port || 3000, function() {
    console.log('Listening on port ' + server.address().port);
}); //listens on port 3000 -> http://localhost:3000/
