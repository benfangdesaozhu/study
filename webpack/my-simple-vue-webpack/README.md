    本文是webpack5+vue2的项目搭建

    npm i -y 初始化项目
    1、 npm i -y

    下载相关依赖 webpack、webpack-cli
    2、npm i webpack webpack-cli -D

    创建项目相关文件目录(具体可以参考项目的源码)
    3、src文件夹和webpack.config.js、和

    4、src目录中创建webpack的入口文件main.js和存放样式的style目录、公共资源public等目录

    以上是准备阶段

    接下来我们介绍配置阶段

    1、webpack.config.js中增加入口文件,出口文件，以及模式

    const path = require("path")

    modules.export = {
        entry: './src/main.js',
        output: {
            path: path.join(__dirname, 'dist'),
            filename: '[name].js'
        },
        mode: 'development',
    }
    
    这个时候一个最基本的 打包器已经生成，在package.json的script当中添加命令"build": "webpack --config webpack.config.js"，这个时候，我们运行npm run build就可以打包出一个dist文件。


    2、使用html-webpack-plugin插件将打包的js都引入到该html中。

    安装依赖：npm i --save-dev html-webpack-plugin

    在webpack.config.js中修改对应的配置
    