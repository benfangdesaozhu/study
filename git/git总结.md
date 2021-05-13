#### 打标签

创建标签：标签分为两种:轻量标签（lightweight）与附注标签（annotated）

轻量标签：像一个不会改变的分支--它只是某个特定提交的引用

附注标签：是存储再git数据库中的完整的一个对象，他们可以被校验的，其中包含打标签者的名字、电子邮箱、日期，此外还有一个标签信息。

###### 附注标签：

创建：git tag -a v1.4 -m 'test' 
//解释：git tag -a 创建一个附注标签
v1.4标签名称 
-m 选项指定了一条将会存储在标签中的信息
'test': 提交的信息

###### 轻量标签
创建：git tag v1.4-li

给过去提交的打标签

```
输入log 查看提交日志
git log --pretty=oneline

617a5de18096b52386f25b218d06276b183a2e37 (HEAD -> master, tag: v1.4, tag: show, origin/master, origin/HEAD) 修改
d6e07b933152fafc5c557265c4619b81d5a4d711 Merge branch 'master' of github.com:benfangdesaozhu/study
baa98cc9ee45a0b4608b369fab79b46d8eb9bca7 数据结构h和s算法
3bd8a5f0ba66af73d6059c645c89c28293f21036 webpack
36ef2e96aafcc9049b5e654a7fe78d8bf3662c64 总结
22bd3f968dc0eef455116085f97ae6d72d909b45 xiugai
8e4560547d09b8c4b3e1262a9541006a7ffb0d46 '修改'
4eb0f67a3faa2c1779800452a112530c7e66efa0 前端安全
ae96622c6ec313c76d528f641f8bc5173a775305 添加来源
```
假如。我们给webpack加上对应标签

git tag -a v1.5 3bd8a5f0ba（末尾指定提交的校验和（或部分校验和））

这样就再webpack部分打上对应tag

###### 共享标签（同步到远程）

上述的命令都是再本地上创建对应的tag.创建完标签后你必须显式地推送标签到共享服务器上
这个过程就像共享远程分支一样——你可以运行 ***git push origin <tagname>###***

###### 删掉标签(git tag -d <tagname>)

删除本地的tag: git tag -d show
删除远程的tag：git push origin --delete <tagname>




### git分支

#### 分支创建

命令：git branch <branchName>

#### 分支切换
命令：**git checkout <branchName>**