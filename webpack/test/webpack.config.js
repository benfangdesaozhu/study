const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const CONFIG = require('./CONFIG') // 这里可以配置对应的测试或者正式的域名之类的
console.warn(process.env.NODE_ENV === "development", process.env.NODE_ENV)
// console.warn(process.env.NODE_ENV === "development", process.env.NODE_ENV, CONFIG)

// 性能分析部分 

// 1、日志美化 文档地址https://www.npmjs.com/package/friendly-errors-webpack-plugin
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const notifier = require('node-notifier');
const ICON = path.join(__dirname, 'icon.jpg');
// 2、打包速度分析（speed-measure-webpack5-plugin） 文档地址 
// 暂时没用。会报错 不论是5还是原版的
// 5的报错是vue-loader说我没引用
// const SpeedMeasureWebpack5Plugin = require('speed-measure-webpack5-plugin')
// const smp = new SpeedMeasureWebpack5Plugin()

// 2、文件体积监控 webpack-bundle-analyzer https://www.npmjs.com/package/webpack-bundle-analyzer
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    // entry: './src/main.jss', // 测试日志美化错误
    entry: './src/main.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[hash].js'
    },
    mode: 'development',
    module: {
        rules: [
            // { // 未分离css前
            //     test: /\.css$/,
            //     use: ['style-loader', 'css-loader', 'postcss-loader']
            // },
            { // 分离css后
                test: /\.css$/,
                use: [
                    process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    // {
                    //     loader: MiniCssExtractPlugin.loader
                    // },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },
            // { // 未分离css前
            //     test: /\.less$/,
            //     use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
            // },
            { // 分离css后
                test: /\.less$/,
                use: [
                    process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    // {
                    //     loader: MiniCssExtractPlugin.loader
                    // },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            },
            {
                test: /\.vue$/,
                use: [
                        {
                            loader: 'vue-loader',
                            options: {
                                compilerOptions: {
                                    preserveWhitespace: false
                                }
                            }
                        }
                    ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(jpe?g|png|gif)$/i, //图片文件
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'img/[name].[hash:8].[ext]',
                                    publicPath: '../'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            fallback: {
                            loader: 'file-loader',
                            options: {
                                name: 'media/[name].[hash:8].[ext]',
                                publicPath: '../'
                            }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                name: 'font/[name].[hash:8].[ext]',
                                publicPath: '../'
                                }
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './src/public/index.html')
        }),
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].[hash:8].css",
            chunkFilename: "[id].css",
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || {})
        }),
        // 日志美化
        new FriendlyErrorsWebpackPlugin({
            onErrors: (severity, errors) => {
              if (severity !== 'error') {
                return;
              }
              const error = errors[0];
              notifier.notify({
                title: "Webpack error",
                // message: severity + ': ' + error.name,
                message: error.name,
                subtitle: error.file || '',
                icon: ICON
              });
            }
        }),
        // 2、文件体积监控
        new BundleAnalyzerPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9001,
        hot: true,
        open: true, // 自动打开浏览器  https://webpack.docschina.org/configuration/dev-server/#devserveropen
        historyApiFallback: true // 如果vue是使用history，需要这么配置。否则会出现Cannot GET /page1的情况
            
    },
    resolve:{
        alias:{
            'vue$':'vue/dist/vue.runtime.esm.js',
            '@':path.join(__dirname,'src')
        },
        extensions: ['.js', '.vue', '.json'],
    },
    
    target: process.env.NODE_ENV === "development" ? "web" : "browserslist",
    externals: {
        echarts: 'echarts'
    }
}