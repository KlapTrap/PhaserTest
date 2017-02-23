var path = require('path');
var webpack = require('webpack');

var phaserModule = path.join(__dirname, '/node_modules/phaser/')
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js')
var pixi = path.join(phaserModule, 'build/custom/pixi.js')
var p2 = path.join(phaserModule, 'build/custom/p2.js')

module.exports = {
    entry: {
        app: './src/Game.ts',
        vendor: ['pixi', 'p2', 'phaser']
    },
    output: {
        path: path.join(__dirname + "/bin/js/"),
        filename: 'bundle.js'
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                use: "source-map-loader"
            },
            { test: /pixi\.js/, use: ['expose-loader?PIXI'] },
            { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
            { test: /p2\.js/, use: ['expose-loader?p2'] }
        ]
        // ,
        // loaders: [
        //     { test: /pixi\.js/, use: ['expose-loader?PIXI'] },
        //     { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
        //     { test: /p2\.js/, use: ['expose-loader?p2'] }
        // ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            'phaser': phaser,
            'pixi': pixi,
            'p2': p2,
        }
    },
    devtool: 'inline-source-map',
};