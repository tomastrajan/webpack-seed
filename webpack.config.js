var _ = require('lodash');
var minimist = require('minimist');
var chalk = require('chalk');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var paramsDefault = {
    output: {
        path: './build',
        filename: '[name].[hash].js',
        sourceMapFilename: '[name].[hash].map'
    },
    server: {
        port: 8081
    }
};
var paramsPerTarget = {
    DEV: {
        debug: true,
        devtool: 'inline-source-map',
        output: {
            filename: '[name].js'
        }
    },
    BUILD: {
        debug: true,
        devtool: 'source-map',
        plugins: [
            new CleanWebpackPlugin(['build'])
        ]
    },
    PROD: {
        debug: false,
        output: {
            path: './dist'
        },
        plugins: [
            new CleanWebpackPlugin(['dist'])
        ]
    }
};
var TARGET = minimist(process.argv.slice(2)).TARGET || 'BUILD';
var params = _.merge(paramsDefault, paramsPerTarget[TARGET]);
printBuildInfo();

module.exports = {
    resolve: {
        extensions: ['', '.ts', '.js']
    },
    entry: {
        app: './src/app.ts'
    },
    output: {
        path: params.output.path,
        filename: params.output.filename,
        sourceMapFilename: params.output.sourceMapFilename
    },
    module: {
        loaders: [
            {test: /\.ts$/, loader: 'awesome-typescript', exclude: /node_modules/},
            {test: /\.css$/, loader: 'style!css'}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body'
        })
    ].concat(params.plugins || []),
    devServer: {
        port: params.server.port
    },
    debug: params.debug,
    devtool: params.devtool,
    progress: true,
    colors: true
};

function printBuildInfo() {
    console.log('\nStarting ' + chalk.bold.green('"' + TARGET + '"') + ' build');
    if (TARGET === 'DEV') {
        console.log('Dev server: ' +
            chalk.bold.yellow('http://localhost:' + params.server.port + '/webpack-dev-server/index.html') + '\n\n');
    } else {
        console.log('\n\n');
    }
}
