/* eslint-disable import/no-extraneous-dependencies */
const {
    resolve,
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: resolve(__dirname, 'build'),
        publicPath: '/', // 一般用于生产环境
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
            title: 'react-font',
        }),
        new CleanWebpackPlugin(),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },
};
