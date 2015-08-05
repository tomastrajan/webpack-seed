var _ = require('lodash');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
    server: {
        port: 8081
    }
};
var configTargetSpecific = {
    DEV: {
        output: {
            filename: '[name].js'
        }
    },
    BUILD: {
        output: {
            filename: '[name].[hash].js'
        }
    }
};
var TARGET = process.env.TARGET || 'BUILD';
config = _.merge(config, configTargetSpecific[TARGET]);
printBuildInfo();

module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: './build',
        filename: config.output.filename
    },
    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
            {test: /\.css$/, loader: 'style!css'}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body'
        })
    ],
    progress: true,
    colors: true,
    devtool: 'eval',
    devServer: {
        port: config.server.port
    }
};

function printBuildInfo() {
    console.log('\nStarting "' + TARGET + '" build');
    if (TARGET === 'DEV') {
        console.log('Dev server: http://localhost:' + config.server.port +
            '/webpack-dev-server/app\n\n');
    } else {

    }
}
