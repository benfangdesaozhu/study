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

        const HtmlWebpackPlugin = require('html-webpack-plugin')
        module.export = {
            ...
            plugins: [ // 添加对应插件
                new HtmlWebpackPlugin({
                    template: path.join(__dirname, './src/public/index.html')
                })
            ]
        }
    
        并且这时候修改入口文件。添加document.write('hello webpack'),

        添加完毕之后，运行打包命令。npm run build(每次运行之前先清掉之前的dist文件)，接着就能看到dist中有对应的html文件，打开文件，就能看到已经将打包之后的js引入到该文件中，页面上也能显示对应的hello webpack。

        因为每次打包的时候都需要清除当前的dist文件，因此为了减少手动操作，我们可以使用clean-webpack-plugin这个插件进行帮忙处理

            同样的安装依赖：npm install --save-dev clean-webpack-plugin
        
            并在webpack.config.js文件中配置对应插件

            const { CleanWebpackPlugin } = require('clean-webpack-plugin')
            module.export = {
                ...
                plugins: [ // 添加对应插件
                    new HtmlWebpackPlugin({
                        template: path.join(__dirname, './src/public/index.html')
                    }),
                    new CleanWebpackPlugin()
                ]
            }
        
        每次修改都需要进行打包，这样太麻烦。这个时候我们可以使用webpack-dev-server的HMR来解决

        在webpack.config.js
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 9001,
            hot: true,
            open: true, // 自动打开浏览器  https://webpack.docschina.org/configuration/dev-server/#devserveropen
        }

        并在package.josn增加命令："start": "webpack serve --config webpack.config.js"

        配置完之后，启动npm run start 之后，修改main文件的输出，即可不用刷新浏览器同步更新了。

        3、html和js搞定之后，就剩css了。css比较简单，只需要添加两个loader即可，并且在配置文件中配置下即可。
            npm i -D style-loader css-loader

            webpack.config.js中配置
            module.exports = {
                ...,
                module: {
                    rules: [
                        {
                            test: /\.css$/,
                            use: ['style-loader', 'css-loader']
                        }
                    ]
                },
            }
            
            配置完成之后，只需要在入口文件中main.js引入对应的css文件就可以了。
        
        4、安装配置并结合vue文件使用vue （参考：https://vue-loader.vuejs.org/zh/）

            要能像vue-cli一样使用vue的话。需要安装vue-loader vue-template-compiler以及vue
            vue-loader: 用于解析.vue文件
            vue-template-compiler： 用于编译模板

            npm i -D vue-loader vue-template-compiler
            npm i -S vue

            在使用模板编译的时候遇到问题。比如APP.vue中，使用<style></style>写对应样式，如果不写scoped的情况下，并且不指定对应css预处理器的时候，能正常编译对应样式，如果加上scoped,编译结束后，会出现<style scoped></style>内的样式不生效的情况（回退之后不管用了）。查看vue-loader的官方文档，发现，只需要添加postcss-loader即可

                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader','postcss-loader']
                },
            在加上预处理器之后，这里以less为介绍：

                npm i less less-loader -D

                {
                    test: /\.less$/,
                    use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                    ]
                },
            即可使用less文件和<style lang="less" scoped></style>

            在打包的时候，我们如果想将css分离出来，就需要使用到mini-css-extract-plugin 插件。
            npm install -D mini-css-extract-plugin

            //{ // 未分离css前
               // test: /\.css$/,
               // use: ['style-loader', 'css-loader','postcss-loader']
            //},
            { // 分离css后
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },
            { // 未分离css前
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
            },
            { // 分离css后
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
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
            对loader做对应修改，并且在plugins中增加

                new MiniCssExtractPlugin({
                    filename: "css/[name].[hash:8].css",
                    chunkFilename: "[id].css",
                })

            至此。一个vue的项目已经搭建完毕。

            接下来我们添加vue-router和xuex



引入postcss之后，会出现 You did not set any plugins, parser, or stringifier. Right now, PostCSS does nothing. Pick plugins for your case on https://www.postcss.parts/ and use them in postcss.config.js.

出现这个问题的原因是因为没有创建对应的postcss.config.js文件引起的。

接下来我们创建postcss.config.js并添加配置（postcss如果需要浏览器自动补全css兼容前缀，需要autoprefixer这个插件）
npm i autoprefixer -D
```
const autoprefixer = require('autoprefixer');
module.exports = {
    plugins: [
        autoprefixer({
            browsers:['>0%']
        })
    ]
};
```
这个时候重新启动项目。会出现 Replace Autoprefixer browsers option to Browserslist config.
  Use browserslist key in package.json or .browserslistrc file.这个错误

按照错误在package.json中加入配置后重启。
```
"browserslist": [
    "last 1 version",
    "> 1%",
    "IE 10"
  ]
```
还会出现上述错误。

Replace Autoprefixer browsers option to Browserslist config.
  Use browserslist key in package.json or .browserslistrc file.

  Using browsers option can cause errors. Browserslist config can
  be used for Babel, Autoprefixer, postcss-normalize and other tools.

  If you really need to use option, rename it to overrideBrowserslist.

需要将postcss.config.js中之前使用的browsers更改为overrideBrowserslist 即可。



```
const autoprefixer = require('autoprefixer');
module.exports = {
    plugins: [
        autoprefixer({
            overrideBrowserslist:['>0%']
        })
    ]
};
```

这个时候发现，热更新失效了。。。。（一个坑结束之后，另一个坑又起。查了下原因，发现这个https://github.com/webpack/webpack-dev-server/issues/2758）
因为webpack5的target默认配置为web
告知 webpack 为目标(target)指定一个环境。默认值为 "browserslist"，如果没有找到 browserslist 的配置，则默认为 "web"

解决办法：
1、将在package.json中配置的browserslist删除即可（显然不可能这么干，要不然上面的错误怎么解决呢）
2、在webpack.config.js文件中加入target: "web"即可

    这里根据当前环境来target: process.env.NODE_ENV === "development" ? "web" : "browserslist",

    1、配置环境变量。
    2、安装cross-env依赖（npm install cross-env -D）
    3、在package.json的启动修改为"start": "cross-env NODE_ENV=development webpack serve --config webpack.config.js"

    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || {})
    })