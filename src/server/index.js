import express from 'express';
import { noCacheHeaders, jsonHeader } from './middleware';
import cors from 'cors';
import errorhandler from 'errorhandler';
import compression from 'compression';
import helmet from 'helmet';
import routes from './routes';

const isProduction = process.env.NODE_ENV === 'production';

const app = express();
app.use(compression());
app.use(helmet());

app.use(express.static(__dirname + './../../build/')); //serves the build/index.html

app.use(cors());
app.use(noCacheHeaders);
app.use(jsonHeader);
app.use(express.json());

if (!isProduction) {
    app.use(errorhandler());
}

require('./passport');

app.use(routes);

/// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
    app.use((err, req, res, next) => {
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
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        errors: {
            message: err.message,
            error: {},
        },
    });
});

const server = app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port ' + server.address().port);
});
