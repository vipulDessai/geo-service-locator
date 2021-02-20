require('dotenv').config();

const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const configs = {
    entry: path.resolve(path.join(__dirname, 'src', 'client', 'index.tsx')),
    resolve: {
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
        proxy: {
            ['/' + process.env.NODE_ENV]: 'http://localhost:' + process.env.PORT
        }
    },
    output: {
        path: path.resolve(path.join(__dirname, 'build')),
        filename: 'bundle.js',
    },
};

if(process.env.NODE_ENV == 'development' && process.argv[3] != 'production') {
    configs.mode = 'development';
    configs.devtool = 'inline-source-map';

    const globalEnvInBuildReplacer = {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    };

    configs.plugins.push(new webpack.DefinePlugin(globalEnvInBuildReplacer));
}
else {
    configs.plugins.push(new webpack.DefinePlugin({NODE_ENV: JSON.stringify('production')}));
}

module.exports = configs;