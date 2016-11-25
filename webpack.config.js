const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    devtool: isProd ? false : 'source-map',
    entry: {
        app: isProd
            ? './src/app'
            : ['webpack-dev-server/client?http://localhost:8080', './src/app.js']
    },
    output: {
        filename: '[name].js',
        publicPath: '/dist/',
        path: './dist',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader'
            },
            { test: /\.json$/, loader: 'json-loader'}
        ]
    },
    resolve: {
        alias: {
            'react': 'preact-compat',
            app: path.resolve(__dirname, './src')
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new HtmlWebpackPlugin({
            title: 'Now & Then'
        })
    ]
};
