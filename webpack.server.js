require('dotenv').config();

const path = require('path');
const nodeExternals = require('webpack-node-externals');

const config = {
    entry: path.resolve(path.join(__dirname, 'src', 'server', 'index.ts')),
    target: 'node',
    externals: [nodeExternals()],
    resolve: {
        alias: {
            '@': path.resolve(path.join(__dirname, 'src')),
        },
        extensions: ['.js', '.ts', '.json'],
        
    },
    output: {
        path: path.resolve(path.join(__dirname)),
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
            },
            {
                test: /\.(png|jpg|svg)$/,
                loader: 'url-loader'
            },
        ]
    }
};

if(process.env.NODE_ENV === 'development' && process.argv[3] !== 'production') {
    config.mode = 'development';
    config.devtool = 'inline-source-map';
}

module.exports = config;