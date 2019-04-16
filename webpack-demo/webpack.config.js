const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        main: './src/index.js',
        // sub: './src/index.js',
    },
    output: {
        // publicPath: 'http://cdn.com',
        publicPath: '/',
        filename: '[name]-[hash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development', // 没有treeshaking
    devtool: 'inline-source-map',
    // 线上
    // devtool: 'cheap-module-source-map',
    module: {
        rules: [
            // {
            //     test: /\.(jpg|png|gif)$/,
            //     use: {
            //         loader: 'file-loader',
            //         options: {
            //             name: '[name]_[hash].[ext]',
            //             outputPath: 'images/',
            //         },
            //     },
            // },
            {
                test: /\.(jpg|png|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[hash]_[name].[ext]',
                        outputPath: 'images/',
                        limit: 2048,
                    },
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            modules: true,
                        },
                    },
                    'sass-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.(eot|ttf|svg)$/,
                use: {
                    loader: 'file-loader',
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                // options: {
                    // // presets: [
                    // //     [
                    // //         '@babel/preset-env',
                    // //         {
                    // //             targets: {
                    // //                 chrome: '75',
                    // //             },
                    // //             useBuildins: 'usage',
                    // //         },
                    // //     ],
                    // // ],
                    // plugins: [
                    //     [
                    //         '@babel/plugin-transform-runtime',
                    //         {
                    //             'corejs': 2,
                    //             'helper': true,
                    //             'regenerator': true,
                    //             'useESModules': false,
                    //         },
                    //     ]
                    // ],
                // },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        contentBase: './dist',
        open: true,
        port: 8081,
        proxy: {
            '/api': 'localhost:3000',
        },
        hot: true,
        hotOnly: true,
    },
    optimization: {
        usedExports: true, // 开发环境
    },
};