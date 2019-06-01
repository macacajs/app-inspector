# 获取设备 ID

## iOS

### 命令行方式

```bash
$ xcrun simctl list
```

这行命令会列出你的所以模拟器信息，里面有类似 XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX 的代码，就是模拟器 UDID。

### 从 Xcode 获取

打开模拟器，从菜单中打开 **Hardware - devices - manage devices**。 然后你会看到模拟器信息界面，里面有个 identifier，就是 UDID。

## Android

### 从命令行

先启动你的设备，然后使用 adb 命令查看设备信息：

```bash
$ adb devices

123ABCDEFG	device
192.168.0.100:5555	device
```

## iOS 真机问题

```bash
$ DEVELOPMENT_TEAM_ID=TEAM_ID npm i app-inspector -g
```

![](/app-inspector/assets/6d308bd9gy1fg7cnt9hf6j20t70h7782.jpg)
