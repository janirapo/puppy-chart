const webpack = require('webpack');
const path = require('path');
const localConfig = require('./config/local.config');

const OpenrecordCache = require('openrecord/webpack');
const myStore = require('./src/server/dbStore');

const BUILD_DIR = path.resolve(__dirname, './build');
const APP_DIR = path.resolve(__dirname, './src/client');

const config = {
    mode: localConfig.environment,
    entry: {
        main: APP_DIR + '/index.js',
    },
    output: {
        filename: 'bundle.js',
        path: BUILD_DIR,
    },
    module: {
        rules: [
            {
                test: /(\.css|.scss)$/,
                use: [
                    {
                        loader: 'style-loader', // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                    },
                    {
                        loader: 'sass-loader', // compiles Sass to CSS
                    },
                ],
            },
            {
                test: /\.(jsx|js)?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            presets: ['react', 'es2015', 'stage-2'], // Transpiles JSX and ES6
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new OpenrecordCache(myStore),
    ]
};

module.exports = config;
