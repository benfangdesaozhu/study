<https://github.com/LeonWuV/FE-blog-repository/blob/master/linux/Mac%E5%A6%82%E4%BD%95%E7%94%9F%E6%88%90%E5%B9%B6%E9%85%8D%E7%BD%AE%E5%A4%9A%E4%B8%AAssh%E7%A7%98%E9%92%A5.md>

#### 配置多个ssh (mac电脑)

  在公司、有可能使用gitlab和自己github的账号。如果都是用ssh来提交代码，则需要生成多个密钥，分别配置gitlib、github等多个代码托管网站

#### 如何生成多个密钥

  生成自定义密钥命令：

  ```
  ssh-keygen -t rsa -f ~/.ssh/id_rsa.别名 -C "邮箱地址"
  ```

  例如：要分别生成gitlab、github的密钥：

  ```
ssh-keygen -t rsa -f ~/.ssh/id_rsa.github -C "邮箱地址"
ssh-keygen -t rsa -f ~/.ssh/id_rsa.gitlab -C "邮箱地址"
  ```

  这时候在~/.ssh/ 。 文件夹中可以看到对应的文件
  id_rsa.github  id_rsa.github.pub id_rsa.gitlab id_rsa.gitlab.pub

  在终端中。先进入  ~/.ssh/ 当前文件夹中

  然后使用如下命令，查看公钥文件，将内容全部复制

  ```
  cat id_rsa.github.pub

  cat id_rsa.gitlab.pub
  ```

  复制对应的公钥，放入对应网站设置中的 ssh key的配置，将公钥放进去即可

到这里还没有完成，我们需要将秘钥注册到ssh-agent中，因为ssh默认去找的id_rsa秘钥，不会识别我们自定义生成的秘钥。

注册秘钥

```
ssh-add -K ~/.ssh/id_rsa.github
ssh-add -K ~/.ssh/id_rsa.gitlab
```

查看添加结果：

```
ssh-add -l
```

接下来还需要在~/.ssh/中创建config文件

```
touch config

# vim编辑config文件(也可以直接到文件夹中找到config文件直接修改)
vim config
```

内容如下：

```
Host git@gitlab.xxx.com  #平台访问地址
HostName gitlab #随便起
User xxx #随便起
IdentityFile ~/.ssh/id_rsa.gitlab  #秘钥的地址

Host git@github.com
HostName github
User xxx
IdentityFile ~/.ssh/id_rsa.github
```

测试联通性：

```
#这里跟的是我们在config配置中Host字段对应的名字
ssh -T git@github.com
```

如果返回：

> Hi xxxxx! You've successfully authenticated, but GitHub does not provide shell access.

> 则表示链接成功

```
ssh-add -D 也可以删除 添加的ssh的缓存
```
