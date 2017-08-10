const webpack = require('webpack');
const path = require('path');
var loaders = require('./webpack.loaders');
var nodeExternals = require('webpack-node-externals');
var CopyWebpackPlugin = require('copy-webpack-plugin');

loaders.push(
);

module.exports = [
    {
        entry: './src/server.js',
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'server.bundle.js',
        },
        module: {
            loaders
        },
        target: 'node',
        externals: [nodeExternals()]
    },
    {
        entry: './src/views/index.js',
        output: {
            path: path.join(__dirname, 'dist', 'public'),
            filename: 'js/app.bundle.js',
        },
        module: {
            loaders
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                },
                output: {
                    comments: false,
                },
            }),
            new CopyWebpackPlugin([{from: 'src/public'}])
        ]
    }
]
