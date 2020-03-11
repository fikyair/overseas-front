/* eslint-disable import/no-extraneous-dependencies */
/*
  开发环境配置：能让代码运行
    运行项目指令：
      webpack 会将打包结果输出出去
      npx webpack-dev-server 只会在内存中编译打包，没有输出
*/
const {
    resolve,
} = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

process.env.NODE_ENV = 'development';

module.exports = merge(common, {
    entry: ['./src/index.js', './public/index.html'],
    output: {
        filename: 'static/js/bundle.js',
        path: resolve(__dirname, 'build'),
        chunkFilename: 'static/js/[name].chunk.js',
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            // loader的配置
            {
                // 处理less资源
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
            {
                // 处理css资源
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                // 在package.json中eslintConfig --> airbnb
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                // 优先执行
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    fix: true,
                },
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    // 预设：指示babel做怎么样的兼容性处理
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                // 按需加载
                                useBuiltIns: 'usage',
                                // 指定core-js版本
                                corejs: {
                                    version: 3,
                                },
                                // 指定兼容性做到哪个版本浏览器
                                targets: {
                                    chrome: '60',
                                    firefox: '60',
                                    ie: '9',
                                    safari: '10',
                                    edge: '17',
                                },
                            },
                        ],
                        '@babel/preset-react',
                    ],
                    plugins: [
                        '@babel/plugin-syntax-dynamic-import',
                        '@babel/plugin-proposal-class-properties',
                    ],
                },
            },
            {
                // 处理图片资源
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    name: '[hash:10].[ext]',
                    // 关闭es6模块化
                    esModule: false,
                    output: 'static/imgs', // 指定图片输出路径
                },
            },
            {
                // 处理html中img资源
                test: /\.html$/,
                loader: 'html-loader',
            },
            {
                // 处理其他资源
                exclude: /\.(html|js|css|less|jpg|png|gif)/,
                loader: 'file-loader',
                options: {
                    name: 'static/media/[name].[hash:10].[ext]',
                },
            },
        ],
    },
    plugins: [
    ],
    mode: 'development',

    // 开发服务器 devServer：用来自动化（自动编译，自动打开浏览器，自动刷新浏览器~~）
    // 特点：只会在内存中编译打包，不会有任何输出
    // 启动devServer指令为：npx webpack-dev-server
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        port: 3000,
        open: true,
        /**
         * 开启 HMR 功能: 
         * HMR: hot module replacement 模块热替换
         * 作用：一个模块发生变化，只会打包这一个模块（不是所有模块）
         * 极大提升构建速度
         * 1、css 文件：style-loader 内部实现了 HMR 功能，所以在开发环境使用的是 style-loader 可以使项目性能更好，
         *    打包速度更快，但生产环境考虑到代码性能优化，提取成了单独文件。
         * 2、js 文件：没有 HMR 功能，eg：
         *    if(module.hot){ module.hot.accept('./xx.js', function(){
         *     // 方法会监听 xx.js 变化，一旦发生变化，如果其他模块未改变，那么其他模块不会重新打包，那么只会改变xx.js会执行后面回调函数。 
         *    })}；
         *    HMR 功能只能作用于非入口 js 文件的其他文件
         * 3、html 文件：没有 HMR 功能，同时会导致 html 文件不能热更新了~
         *    解决：修改 entry 入口，将 html 引入
         */
        hot: true,
    },
});
