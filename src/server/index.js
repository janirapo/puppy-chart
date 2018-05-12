const express = require('express'),
    cors = require('cors'),
    errorhandler = require('errorhandler');
const app = express();
const localConfig = require('../../config/local.config');
const middleware = require('./middleware');
const compression = require('compression');
const helmet = require('helmet');

const isProduction = process.env.NODE_ENV === 'production';

app.use(compression());
app.use(helmet());

app.use(express.static(__dirname + './../../build/')); //serves the build/index.html

app.use(cors());
app.use(middleware.noCacheHeaders);
app.use(middleware.jsonHeader);
app.use(express.json());

if (!isProduction) {
    app.use(errorhandler());
}

require('./passport');

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

        res.json({
            errors: {
                message: err.message,
                error: err,
            },
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        errors: {
            message: err.message,
            error: {},
        },
    });
});

const server = app.listen(process.env.NODE_ENV || localConfig.port || 3000, function() {
    console.log('Listening on port ' + server.address().port);
}); //listens on port 3000 -> http://localhost:3000/
