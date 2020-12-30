// 不指定webpack的配置文件的名称 可以使用以下命令进行打包
// ./node_modules/.bin/webpack

// 如果需要配置对应的命令，则可以在package.json中的script配置对应的命令
// "build": "webpack"
// 这个时候，就可以使用npm run build来执行打包
const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 清理构建目录
const vueLoaderPlugin = require('vue-loader/lib/plugin') 
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugins = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")   //提取css
module.exports = {
    // entry: './src/index.js', // 入口文件
    // output: { // 输出文件
    //     path: path.join(__dirname, 'dist'),
    //     filename: 'bundle.js'
    // },
    // 模块打包器，把一切静态资源js、css、图片等等当作一个个模块，所有模块之间是存在一些依赖关系的，会根据入口文件，找到它的依赖文件，
    // 依赖文件如果存在依赖其他的，当前的依赖文件就会去找自己的依赖文件，这样就会形成一颗依赖树，在这个依赖树上，只要遇到依赖，webpack就会把依赖加入到依赖图去，
    // 最终遍历完之后，才会生成打包之后的资源。

    // 单入口文件 entry: './src/index.js', 是这个的简写 entry: {main: './path/to/my/entry/file.js'}

    // 多入口文件
    // entry: {
    //     app: './src/app.js',
    //     adminApp: './src/adminApp.js'
    // }

    // 在 webpack < 4 的版本中，通常将 vendor 作为单独的入口起点添加到 entry 选项中，以将其编译为单独的文件（与 CommonsChunkPlugin 结合使用）。
    // 而在 webpack 4 中不鼓励这样做。而是使用 optimization.splitChunks 选项，将 vendor 和 app(应用程序) 模块分开，并为其创建一个单独的文件。
    // 不要 为 vendor 或其他不是执行起点创建 entry。

    // 多入口
    // entry: {
    //     index: './src/index.js',
    //     search: './src/search.js'
    // },
    // 如果配置创建了多个单独的 "chunk"（例如，使用多个入口起点或使用像 CommonsChunkPlugin 这样的插件），
    // 则应该使用 占位符(substitutions) 来确保每个文件具有唯一的名称。
    output: { // 多入口 输出文件 配置
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    mode: 'development', // 模式（生产和开发），

    entry: {
        main: './src/main.js'
    },
    module: {
        // webpack只能理解js和json两种文件，用于对模块的源代码进行转换。loader 可以使你在 import 或"加载"模块时预处理文件
        // loader可以将文件从不同的语言转化为javascript或将内联图像转化为data url
        // loader允许你直接在javascript模块中import css文件。

        // 常用的loader 有以下几种：作用
        // babel-loader 转化es6、es7等新的特性语法
        // css-loader 支持css的加载和解析
        // less-loader 将less文件转化为css文件
        // ts-loader 将ts转化为js
        // file-loader 将图片，文字等的打包
        // raw-loader 将文件以字符串形式导入
        // thread-loader 多进程打包css和js

        // 用法
        rules: [ // loader 
            {
                test: /\.vue$/,
                use: [{
                  loader: 'vue-loader',
                  options: {
                    compilerOptions: {
                      preserveWhitespace: false
                    }
                  }
                }]
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
              }, {
                test: /\.ts$/, 
                use: 'ts-loader' 
            }, {
                test: /\.js$/,
                use: 'babel-loader'
            },{
              test: /\.css|less|scss$/,
              use: [
                  {
                      loader: MiniCssExtractPlugin.loader
                  },
                  {
                      loader: 'css-loader'
                  },
                  {
                      loader: 'postcss-loader',
                      options: {
                          postcssOptions: {
                              plugins:[['postcss-preset-env', {}]]
                          }
                      }
                  },
                  {
                      loader: 'less-loader'
                  }
              ]
          },
        ]
    },

    // plugins目的在于解决 loader 无法实现的其他事。

    // plugins 作用于整个webpack的构建过程

    // webpack 的plugins具有apply方法的javascript对象。apply方法会被 webpack compiler 调用，并且 compiler 对象可在整个编译生命周期访问。
    // const pluginName = 'ConsoleLogOnBuildWebpackPlugin';
    // class ConsoleLogOnBuildWebpackPlugin {
    //     apply(compiler) {
    //       compiler.hooks.run.tap(pluginName, compilation => {
    //         console.log('webpack 构建过程开始！');
    //       });
    //     }
    //   }

    // 常见的plugins和作用

    // CommonsChunkPlugin  提取 chunks 之间共享的通用模块
    // CleanWebpackPlugin  清理构建目录
    // ExtractTextWebpackPlugin 从 bundle 中提取文本（CSS）到单独的文件
    // CopyWebpackPlugins 将单个文件或整个文件复制到构建目录
    // DllPlugin 为了极大减少构建时间、进行分离打包
    // HtmlWebpackPlugin 创建 HTML 文件，去承载输出的bundle
    // UglifyjsWebpackPlugin 压缩js
    // ZipWebpackPlugins 将打包的资源生成一个zip包


    // 手写plugins：https://www.jianshu.com/p/8e92f36e52da
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html')
        }),
        new vueLoaderPlugin(),
        new CopyWebpackPlugins({
            patterns: [
              { from: path.join(__dirname, './src/public'), to: "assets" },
            ],
        }),
        new MiniCssExtractPlugin({
          filename: "css/[name].[hash:8].css",
          chunkFilename: "[id].css",
      }),
    ],
    resolve:{
        alias:{
            'vue$':'vue/dist/vue.runtime.esm.js',
            '@':path.join(__dirname,'src')
        },
        extensions: ['.js', '.vue', '.json'],
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        hot: true,
        open: true, // 自动打开浏览器  https://webpack.docschina.org/configuration/dev-server/#devserveropen
    }
}

// npm install * --save 或者 npm install * -S 是依赖到生产环境

// npm install * --save-dev 或者 npm install * -D 是依赖到开发环境

// 安装es6环境
// npm install @babel/core @babel/preset-env babel-loader -D


// webpack+vue搭建 https://github.com/biubiubiu01/webpack-vue  https://juejin.cn/post/6844904183150149639#heading-15
// webpack优化  https://github.com/biubiubiu01/vue-antd-admin/blob/main/vue.config.js