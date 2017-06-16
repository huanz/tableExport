const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
/**
 * @desc 获取需要剔除的模块
 */
let blocks = [];
let modules = ['json', 'txt', 'csv', 'xml', 'doc', 'xls', 'image', 'pdf'];
if (process.env['MODULES']) {
    process.env['MODULES'].split(' ').forEach(m => {
        let index = modules.indexOf(m);
        if (index !== -1) {
            modules.splice(index, 1);
        }
    });
    blocks = modules;
}

module.exports = {
    entry: './src/index.js',
    output: {
        libraryTarget: 'umd',
        library: 'tableExport',
        path: path.join(__dirname, 'dist'),
        filename: 'tableExport.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            enforce: 'pre',
            exclude: /(node_modules|bower_components|\.spec\.js)/,
            use: [{
                loader: 'webpack-strip-block',
                options: {
                    blocks: blocks
                }
            }]
        }],
    },
    devServer: {
        contentBase: path.join(__dirname, 'demo'),
        compress: true,
        port: 3000
    }
};