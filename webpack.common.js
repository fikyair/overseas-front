/* eslint-disable import/no-extraneous-dependencies */
const {
    resolve,
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'static/js/bundle.js',
        path: resolve(__dirname, 'build'),
        chunkFilename: 'static/js/[name].chunk.js',
        publicPath: '/',
    },
    plugins: [
        // plugins的配置
        // 以指定的 html 文件为模板，打包后创建新的 html 文件
        new HtmlWebpackPlugin({
            template: './public/index.html',
            minify: { // 压缩html内容
                collapseWhitespace: true,
                removeComments: true,
            },
            favicon: './public/favicon.ico', // 新增
        }),
        new CleanWebpackPlugin(),
    ],
    resolve: {
        extensions: ['.js', '.jsx', 'json'],
    },
};
