[node版本管理器n的npm地址](https://www.npmjs.com/package/n)

#### 安装n（mac）

如果已经安装了node。可以使用npm安装n

```
npm install -g n
```

不建议使用该种办法

在带有Homebrew的macOS 上，使用brew可以安装n

```
brew install n
```

#### 安装node版本

n + 对应版本号就可以进行下载：例如

```
n 10.16.0
```

不确定版本的时候:使用n lsr 查看node版本号

```
n lsr
```

如果要查某个node版本里面的小版本： n lsr 10

```
n lsr 10 (可以查看node 10的小版本)
```

下载好版本之后。查看已下载的版本和切换版本的话。使用n命令

```
n
```

可查看已下载版本以及通过切换选择，切换当前版本

其余可看npm的文档
