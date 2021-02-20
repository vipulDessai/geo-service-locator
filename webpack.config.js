require('dotenv').config();

const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const configs = {
    entry: [
        path.resolve(path.join(__dirname, 'src', 'client')),
        path.resolve(path.join(__dirname, 'src', 'client', 'index.tsx'))
    ],
    resolve: {
        // in case of using tsconfig.json, the alias in webpack can be skipped
        // this is kept in case we decide to use the js files too for alias
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(s*)css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|svg)$/,
                loader: 'url-loader'
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebPackPlugin({
            template: path.resolve(path.join(__dirname, 'src', 'client', 'index.html')),
            favicon: path.resolve(path.join(__dirname, 'src', 'client', 'favicon.ico')),
        }),
    ],
    devServer: {
        historyApiFallback: true,
        hot: true,
    },
    output: {
        path: path.resolve(path.join(__dirname, 'build')),
        filename: 'bundle.js',
    },
};

if(process.env.NODE_ENV == 'development' && process.argv[3] != 'production') {
    configs.mode = 'development';
    configs.devtool = 'inline-source-map';
}

module.exports = configs;