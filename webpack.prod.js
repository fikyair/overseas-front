/* eslint-disable import/no-extraneous-dependencies */
const {
    resolve,
} = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const merge = require('webpack-merge');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common.js');

// 定义nodejs环境变量，默认情况下使用 browserslist 用的是生产环境配置，如果想使用 开发环境的配置需要写以下一行
process.env.NODE_ENV = 'production';

// 复用 loader, 对 css 做兼容性处理
const commonCssLoader = [
    MiniCssExtractPlugin.loader, // 第四步：将css提取成单独文件
    'css-loader', // 第三步：将css加载到js文件中
    {
        // 第二步：对css文件做兼容性处理，修改 css-loader 的默认配置， postcss-preset-env 就是帮 postcss
        // 找到 browserslist 的配置
        // 还需要在 package.json中定义 browserslist
        loader: 'postcss-loader',
        options: {
            indent: 'postcss',
            plugins: () => [
                // eslint-disable-next-line global-require
                require('postcss-preset-env')(),
            ],
        },
    },
];

/**
 * tree-shaking: 去除未经引用的代码
 *      前提：必须使用 es6 module，开启 production，
 *      有暴露且被引用到了的 module，是树上的绿色叶子；有暴露但没有没引用到的 module，是树上的灰色叶子，
 *          通过树摇，去除没被用到的代码
 *      作用：减少代码体积
 *      有个问题：会将 css 文件当做未经引用的代码，给弃用
 *              在 package.json 配置：
 *                  "sideEffects": false, 所有代码都没有副作用，都可以 tree shaking，
 *                          可能会把 css /@babel/-polyfill 文件可能会 不构建
 *                  "sideEffects": ["*.css"] // 这样就不会将 css 文件不会被 tree shaking，否则会
 *                                 因为 webpack 版本的原因出现问题
 */

module.exports = merge(common, {
    devtool: 'source-map',
    module: {
        rules: [
            /**
             * 正常来讲一个文件只能被一个loader处理，当一个文件被多个loader处理时，
             * 一定要指定loader执行的先后顺序，先执行 eslint 再执行 babel
             */
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
                // 以下文件只会匹配一个，loader 处理性能更好
                // 不能两个配置处理同一类型文件，所以单独把 eslint 提出
                oneOf: [
                    // loader
                    {
                        test: /\.css$/,
                        use: [...commonCssLoader],
                    },
                    {
                        test: /\.less$/,
                        use: [
                            ...commonCssLoader,
                            'less-loader', // 第一步，将less文件编译成 css文件
                        ],
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
                            /**
                             * 开启 babel 缓存，第二次构建时读取缓存，没有改变的js代码不会重新构建
                             * 文件资源缓存：
                             *      hash：每次 webpack 构建时都会生成一个惟一的 hash 值
                             *          问题：因为 js 和 css 同时使用一个 hash 值，如果同时打包，得到的是一样的 hash 值
                             *              导致缓存失效（可能我只改动一个文件）
                             *      chunkhash：如果打包来源于同一个chunk，hash值就一样
                             *          问题：js 和 css hash 值还一样，因为 css 是在 js中被引用的，同属于一个 chunk
                             *          都是入口文件引进来的，入口文件打包后，生成一个 chunk
                             *      contenthash：根据文件内容生成 hash值，不同文件 hash 值不一样
                             *
                             */
                            cacheDirectory: true,
                        },
                    },
                    {
                        test: /\.(jpg|png|gif)/,
                        loader: 'url-loader',
                        options: {
                            limit: 8 * 1024, // 优化：小于这个的 base64显示
                            name: '[hash:10].[ext]',
                            output: 'static/imgs', // 指定图片输出路径
                            esModule: false,
                        },
                    },
                    {
                        test: /\.html$/, // html 中 img 图片
                        loader: 'html-loader',
                    },
                    {
                        exclude: /\.(js|jsx|css|less|html|jpg|png|gif|json)$/,
                        loader: 'file-loader',
                        options: {
                            name: 'static/media/[name].[hash:8].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    // plugins的配置
    plugins: [
        // 详细plugins的配置
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:10].css', // 可以解决修改的css文件因为缓存无法更新的问题, 每次构建的 hash 都不一样
            chunkFilename: 'static/css/[name].[contenthash:10].chunk.css',
        }),
        new OptimizeCssAssetsWebpackPlugin(), // 压缩css
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            minChunks: 1, // 要提取的 chunk 至少被引用 1 次
        },
        // 将当前模块的记录其他模块（a中引用了 b，c，a就会记录 b，c的 hash 值）的 hash 值单独打包为一个文件 runtime，
        // 作用：不会因为 b，c文件改变，使得 a 文件的浏览器的缓存不会失效
        runtimeChunk: {
            name: (entrypoint) => `runtime-${entrypoint.name}`,
        },
        // 配置生产环境的压缩方案：js和css
        minimizer: [
            new TerserWebpackPlugin({
                // 开启缓存
                cache: true,
                // 开启多进程打包
                parallel: true,
                // 启动source-map
                sourceMap: true,
            }),
        ],
    },
    // 模式
    mode: 'production', // 生产模式，js自动压缩
    externals: {
        // 想要忽略的库名，不去打包这个库，可以使用 cdn 代替引入此包，需要在 html 把这个库的 cdn 库引入，否则没法用
    },
});
