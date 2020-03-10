const {
    resolve,
// eslint-disable-next-line import/no-extraneous-dependencies
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

// 定义nodejs环境变量，默认情况下， browserslist 用的是生产环境配置，如果想使用 开发环境的配置需要写以下一行
process.env.NODE_ENV = 'development';

// 复用 loader, 对 css 做兼容性处理
const commonCssLoader = [
    MiniCssExtractPlugin.loader, // 第四步：将css提取成单独文件
    'css-loader', // 第三步：将css加载到js文件中
    { // 第二步：对css文件做兼容性处理，修改 css-loader 的默认配置， postcss-preset-env 就是帮 postcss
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

module.exports = {
    entry: './src/index.js',
    output: {
        // 输出文件名
        filename: 'static/js/bundle.js',
        // 输出路径
        path: resolve(__dirname, 'build'),
        chunkFilename: 'static/js/[name].chunk.js',
        publicPath: '/',
    },
    // loader的配置
    module: {
        rules: [{
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
            test: /\.(jpg|png|gif)/,
            loader: 'url-loader',
            options: {
                limit: 8 * 1024, // 优化：小于这个的 base64显示
                name: '[hash:10].[ext]',
                output: 'imgs', // 指定图片输出路径
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
    // plugins的配置
    plugins: [
        // 详细plugins的配置
        // 以指定的 html 文件为模板，打包后创建新的 html 文件
        new HtmlWebpackPlugin({
            template: './public/index.html',
            minify: { // 压缩html内容
                collapseWhitespace: true,
                removeComments: true,
            },
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css',
            chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
        }),
        new OptimizeCssAssetsWebpackPlugin(), // 压缩js
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },

    // 模式
    // mode: 'development', // 开发模式，
    mode: 'production', // 生产模式，js自动压缩


    // 开发服务器 devServer：用来自动化（自动编译，自动打开浏览器，自动刷新浏览器~~）
    // 特点：只会在内存中编译打包，不会有任何输出
    // 启动devServer指令为：npx webpack-dev-server
    devServer: {
        // 项目构建后路径
        contentBase: resolve(__dirname, 'build'),
        // 启动gzip压缩
        compress: true,
        // 端口号
        port: 3000,
        // 自动打开浏览器
        open: true,
    },
};
