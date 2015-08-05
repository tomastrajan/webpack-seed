var _ = require('lodash');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var paramsDefault = {
    debug: true,
    devtool: 'source-map',
    output: {
        path: './build',
        filename: '[name].[hash].js'
    },
    server: {
        port: 8081
    },
    plugins: [
        new CleanWebpackPlugin(['dist', 'build'])
    ]
};
var paramsPerTarget = {
    DEV: {
        //devtool: 'eval-source-map',
        output: {
            filename: '[name].js'
        },
        plugins: []
    },
    BUILD: {
        output: {
        }
    },
    PROD: {
        output: {
            path: './dist'
        }
    }
};
var TARGET = process.env.TARGET || 'BUILD';
var params = _.merge(paramsDefault, paramsPerTarget[TARGET]);
printBuildInfo();

module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: params.output.path,
        filename: params.output.filename
    },
    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel?optional[]=runtime&stage=0', exclude: /node_modules/},
            {test: /\.css$/, loader: 'style!css'}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body'
        })
    ].concat(params.plugins),
    progress: true,
    colors: true,
    devtool: 'eval-source-map',
    devServer: {
        port: params.server.port
    }
};

function printBuildInfo() {
    console.log('\nStarting "' + TARGET + '" build');
    if (TARGET === 'DEV') {
        console.log('Dev server: http://localhost:' + params.server.port +
            '/webpack-dev-server/index.html\n\n');
    } else {
        console.log('\n\n');
    }
}
