经典问题：输入 url 会发生什么。从详细的说

1、DNS（应用层协议）的域名解析；DNS 是将主机名解析为 ip 地址：

    DNS解析的查询步骤：（DNS服务器是小明；根域名叫根;顶级域名服务器叫顶级；权威域名服务器叫权威）
        1、当输入www.test.con并点击回车，DNS解析器开始解析
        2、先向host文件查询，看是否由缓存，由缓存的直接取，没有，则会向根域名发起查询请求
        3、小明去找根（根是固定的14个）、说test.com（顶级）的IP地址是哪个呀。根查了以下，会把对应的地址给到小明
        4、小明拿到根给的顶级的地址，找到顶级说。权威的地址在哪你知道吗？顶级查了下说，我知道，就把顶级的地址给到小明
        5、小明拿到顶级给的权威的地址，找到权威，说，你知道目标地址是哪个吗？权威查了下说，给你。
        6、小明拿到权威给的地址，便把地址给到客户端。

2、建立连接 TCP（三次握手、四次挥手）

    1、三次握手

        1）：客户端把SYN=1(同步序列号)；seq=x 给到服务端

        2）：服务端收到SYN=1;seq=x，然后发送SYN=1;ACK(确认字符)=1;ack=x+a;seq=y给客户端

        3）：客户端收到服务端给的SYN=1;ACK=1;ack=x+a;seq=y校验之后，给客户端发送ACK=1;seq=x+1;ack=y+

    2、四次挥手

        1）：客户端FIN=1,seq=x发送给服务端
        2）：服务端收到终端请求后，先给客户端发送ACK=1,seq=y,ack=x+1
        3）：接着再发送FIN=1,ACK=1,seq=w,ack=u+1给客户端
        4）：客户端接收到后，ACK=1,ack=w+1,seq=x+1给服务端停止

    为什么连接要三次、断开要四次；可以用两个工人，中间隔了一堵墙，要同步干一些事（客户端:工人A,服务端：工人B）因为看不见，所以需要对话来实现同步

    三次握手：

    A:B你准备好了
    B:听到A了之后，B回应到，A我也准备好了
    A:那开始吧

    如果是二次（第一第二步骤），就会导致，不确定A有没有准备好，B行动，导致A没同步

    如果是四次（第二部拆分：我听到了，我准备好了）；tcp每一次连一次连接都是耗时的。没必要多耗一步

    四次挥手：

    A: B你准备好了吗？我要结束了
    B: 我听到了,我这还有点没整好
    B: 我整好了A
    A: 好的。

    如果B不分两部，B事情有点多，一直闷不做声的做，导致A很懵逼，就会一直说，B好了没好了没

3、发起 http 请求

    http: 超文本传输协议（点于点之间传输文本、图片、视频等的应用层协议）

    http特点： 无状态、简单、可扩展

    http组成：请求报文和响应报文（不论是请求报文还是响应报文都由起始行、首部、实体组成）

    请求报文：
        请求行： 请求方法(get、post、put、delete等)；请求地址url;请求版本号（HTTP1.0、http1.1、http2、https）
        响应行： 响应状态码、http版本

        get和post的区别（）

            get（获取数据）：有对数据长度限制、直接展示在链接上，以?分割，&拼接数据，不安全；
            post（提交数据）: 对数据没限制限制（请求数据放在body里）、安全

            在不设置 Accept
                    Accept-Language
                    Content-Language
                    Content-Type （需要注意额外的限制）
                        Content-Type 的值仅限于下列三者之一：
                        text/plain
                        multipart/form-data
                        application/x-www-form-urlencoded
                    其实都是简单请求。没啥本质的区别

                Access-Control-Allow-Origin: *

        HTTP1.0、http1.1、http2、https

            HTTP1.0、http1.1的区别：

                缓存的添加。
                http1.0有expries和pragma
                http1.1添加了cache-control和ETag

                http1.1增加了长连接（默认开启）：1.0每一个资源都需要建立链接和断开连接，才能进行下一个请求
                1.1

            http1.1、http2的区别：

                传输方式：1.1是文本； 2 是二进制。

                http2的多路复用：多路复用相当于。建立一个tcp连接，可以同时收发多个资源。这个数据的安全基于，每一个数据帧都有对应的流的id。

                服务端push

            http和https的区别：

                https协议需要CA证书，一般是收费的。
                http是明文传递；https是http+ssl/Tls具有安全性的加密传输协议
                http和https的默认端口不一样；http是80；https是443

                    https采用对称加密和非对称加密结合的方式来保证通信的安全。

                    对称加密算法加密数据+非对称加密算法交互密钥+数字证书验证安全 = 安全

                        https的请求中，经过三次握手建立连接之后
                        1、客户端发起服务端数据请求
                        2、服务端（有CA证书。CA证书包括了公钥和私钥）会将CA证书的私钥给到客户端
                        3、客户端拿到CA证书之后，进行验证证书是否有效，有效的话，则生成一个随机数，并用公钥加密这个随机数，然后将加密后的密钥发送给服务端
                        4、服务端使用私钥解密密钥，然后用公钥加密数据发送给客户端
                        5、客户端使用公钥解密数据。

            基于TCP实现的http2遗留下3个问题：
            1、有序字节流引出的队头阻塞，使得http2的多路复用能力大打折扣
            2、TCP与TLS叠加了握手时延，建链时长还有一倍的下降空间
            3、基于TCP四元组确定一个连接，这种诞生于有线网络的设计，并不适合移动状态下的无线网络，这意味着IP地址的频繁变动会导致TCP连接、TLS会话反复握手，成本高昂。

            HTTP3协议解决了这些问题：

                1、HTTP3基于UDP协议重新定义了连接，在QUIC层实现了无序、并发字节流的传输，解决了队头阻塞问题（包括基于QPACK解决了动态表的队头阻塞）；
                2、HTTP3重新定义了TLS协议加密QUIC头部的方式，既提高了网络攻击成本，又降低了建立连接的速度（仅需1个RTT就可以同时完成建链与密钥协商）；
                3、HTTP3 将Packet、QUIC Frame、HTTP3 Frame分离，实现了连接迁移功能，降低了5G环境下高速移动设备的连接维护成本。

            响应状态码：

                1**
                2**：成功
                    200：成功
                    206：部分成功
                3**：重定向
                    301： 永久重定向
                    302： 临时重定向
                    304： 从缓存服务器中取资源
                4**：客户端的一些错误
                    403：拒绝或者禁止访问
                    404：没有找到对应的url
                5**: 服务端的一些错误
                    502：网关或代理服务器出错

            浏览器缓存：

                http1.0 存在pargma、exprise
                http1 增加：cache-control、ETag

                如果存在pargma:no-cache则直接从服务器重新拉取资源

                然后看cache-control和exprise是否在缓存时间内（cache-control优先级大于exprise）存在：200

                不存在则取看客户端发送的首部if-none-match/if-match是否和ETag一致，如果一致304.

                也可以看客户端发送的首部if-modified-sice的时间是否在last-modified的时间内：如果存在，则304

4、渲染
1、dom 树构建（js 阻塞解析：解析构建 DOM 时，遇到 script 时，会暂停解析先加载 js 并执行 js 内部的代码）
2、css 规则树
3、将 dom 树和 css 规则树合并成渲染树
4、根据渲染树绘制出对应页面

重绘和重排（回流）

重排会引起重绘，重绘不会引起重排

引起重排的改变元素大小，位置，添加删除元素等
引起重绘的改变字体颜色、背景色等

优化：（可以使用 lightHouse 来进行分析）
白屏优化（是首屏优化的子集）：白屏时间=页面开始展示的时间-开始请求的时间点（用户开始请求页面时开始计算到开始显示内容结束）

    1、DNS查询
    2、建立TCP连接
    3、发送首个HTTP请求、返回HTML文档、HTML文档head解析完毕

    白屏优化方式：服务端渲染；预渲染和骨架屏

首屏优化：首屏时间= 首屏内容渲染结束时间点 - 开始请求的时间点 （开始请求时间点和首屏内容渲染结束时间点）

    1、减少http请求
    2、升级http，使用http2
    3、服务端渲染
    4、静态资源使用CDN
    5、css放在头部、js放在尾部
    6、http缓存
    7、压缩文件，减少文件体积大小
        webpack：
            js：uglifyPlugin
            css： miniCssExtractplugin
            html: htmlwebpackplugin
            开启gzip: compressionWebpackPlugin
    8、图片优化（图片懒加载）
    9、减少重绘重排


    webpack当中的优化：

        编译时间的优化(构建速度)：
            1、使用高版本webpack
            2、缩小打包作用域
                1、extensions
                2、alias
                3、noParse
            3、多线程 thread-loader
            4、开启缓存
            5、ddl
        编译体积的优化：
            压缩代码
                通过minicssExtractplugin提取css文件，然后通过optimize-css-assets-webpack-plugin
                uglifyplugin
            提取公共资源：
                1、externals不打包进bundle中
                2、splitChunksplugin进行分离（webpack4内置了）

            externals

            tree-shaking

            scope-hoisting

    webpack5新特性预览：https://github.com/HolyZheng/holyZheng-blog/issues/48

    打包原理：

        webpack
            从配置文件webpack.config.js的参数初始化compiler对象，加载所以配置的插件，然后开始编译
            根据配置中找到入口文件，
            从入口文件出发，调用所有的loader对模块进行编译，再找到该模块依赖的模块，递归进行此步骤。
            当loader翻译完所有模块后，得到每个模块最终的内容和他们之间的依赖关系。
            在根据入口和模块之间的关系，组成一个个包含多个模块的chunk,再把每个chunk转换成一个单独的文件加到输入列表
            根据确定好的内容，根据配置确定输入的路径和文件名，把文件内容写入到文件中

            在以上过程中，webpack会根据特定的钩子函数来执行特定的事情。


            plugins是可以用自身原型方法apply来实例化的对象。apply只在安装插件被Webpack compiler执行一次。apply方法传入一个webpck compiler的引用，来访问编译器回调。

            class vconsolePlugin {
                constructor(options) {
                    this.options = Object.assign({
                        enable: false
                    }, options)
                }
                apply(compiler) {
                    const vConsolePath = path.join('./src/vconsole.js')
                    compiler.hooks.entryOption.tap('vconsolePlugin', (compilation, entry) => {
                        // console.log(vConsolePath, entry, this.options)
                        if(this.options.enable){
                            entry.main.import.push(`./${vConsolePath}`)
                        }
                    })
                }
            }


        常见的loader
            url-loader
            file-loader
            css-loader
            style-loader
            sass、less-loader
            postcss-loader
            vue-loader
            babel-loader
        常见的plugins
            cleanWebpackPlugin
            MiniCssExtractPlugin
            uglifyWebpackplugin
            htmlwebpackplugin
            copywebpackplugin
            VueLoaderPlugin
    webpack插件怎么实现的：
        本质上是一种事件流，核心模块：tapable Hooks构建出=》compiler（编译）+ compilation(创建出bundles)

    webpack的热更新原理：
        1、启动阶段
            使用webpack-dev-server去启动本地服务，内部实现了webpack、express、websocket，
            用express启动本地服务，当浏览器访问资源时对此作出响应
            服务端和客户端使用socket连接

        2、更新阶段
            webpack监听文件变化，修改后 触发compiler 重新编译，
            编译完成后通过socket向客户端推送当前修改的的。
            客户端的socket监听到文件修改后，进行局部刷新

<<<<<<< Updated upstream
=======

webpack 面试题： <https://juejin.cn/post/7066807280557096974>
>>>>>>> Stashed changes
