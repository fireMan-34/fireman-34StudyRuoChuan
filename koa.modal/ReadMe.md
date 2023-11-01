# 前言
koa 是我日常接触最多的服务框架。简单易上手，比起 express 、 nest 这些框架，它没有太多的概念，它是带我入门 node 服务的入门导师。

# git Subtree

git Subtree 是用于共享子仓库的功能。
我一直过去拉代码都是用拉完清 .git 目录。つ﹏⊂
上一次源码也是碰到丢失 .git 的文件夹后无法构建，此法甚好。

过去清掉 .git  文件，我就无法找到 .git 信息，只能看源码，但不能看源码记录。

## shell

这是我根据大佬文章的代码写的 powershell 脚本。因为我是 window 系统的开发者。只是我的水平比较拉跨。献丑了各位，🤡。

```powershell 
# git clone https://github.com/lxchuan12/koa-compose-analysis.git

Set-Location ..\

# git subtree add --prefix=koa.modal/compsose https://github.com/ruochuan12/koa-compose-analysis.git main

$Project_Path = Get-Location

# 和前面位置对应

Set-Location -Path "$Project_Path\koa.modal\compsose\compose"

npm i
```

# 参考
- [50行代码串行Promise，koa洋葱模型原来是这么实现](https://juejin.cn/post/7005375860509245471)