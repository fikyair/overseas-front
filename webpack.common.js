/* eslint-disable import/no-extraneous-dependencies */
const {
    resolve,
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'static/js/[name].js', // 生产环境需要 [chunkhash:10] 可以解决修改的文件因为缓存无法更新的问题，
        path: resolve(__dirname, 'build'),
        chunkFilename: 'static/js/[name]_chunk.js', // 生产环境需要 [chunkhash:10] 可以解决修改的文件因为缓存无法更新的问题，非入口 chunk 的名称
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
        }),
        new CleanWebpackPlugin(),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },
};
