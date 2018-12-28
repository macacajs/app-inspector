# 安装

## 环境需要

要安装 app-inspector, 你需要首先安装 [Node.js](https://nodejs.org)。 国内用户可以安装 [cnpm](https://npm.taobao.org/) 加快 NPM 模块安装速度。

另外，推荐安装 [macaca-cli](https://macacajs.github.io/cli-usage.html).

```base
$ npm install macaca-cli -g
```

你需要准备好你需要进行查看的移动平台的环境。Android 请安装 Android SDK，iOS 安装 Xcode.
然后使用 macaca 命令行工具检测环境是否准备好。

```bash
$ macaca doctor
```

如果你看到一堆绿色的文字输出了，说明你的这个环境是 OK 的。然后你就可以安装使用 app-inspector。

## 安装

```base
$ npm install app-inspector -g
```