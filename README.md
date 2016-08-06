# app-inspector

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/app-inspector.svg?style=flat-square
[npm-url]: https://npmjs.org/package/app-inspector
[travis-image]: https://img.shields.io/travis/xudafeng/app-inspector.svg?style=flat-square
[travis-url]: https://travis-ci.org/xudafeng/app-inspector
[coveralls-image]: https://img.shields.io/coveralls/xudafeng/app-inspector.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/xudafeng/app-inspector?branch=master
[node-image]: https://img.shields.io/badge/node.js-%3E=_4-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/app-inspector.svg?style=flat-square
[download-url]: https://npmjs.org/package/app-inspector

> app inspector

## Android

![](http://ww4.sinaimg.cn/large/6d308bd9gw1f6jev6p7eog20uo0k0npk.gif)

## iOS

![](http://ww2.sinaimg.cn/large/6d308bd9gw1f6jevlycr4g20uo0k0u13.gif)

## Installment

```shell
$ npm i app-inspector -g
```

## Usage

```shell
app-inspector -u xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

### iOS

List available devices, device types, runtimes, or device pairs.

```shell
# Then get the UDID of your simulator.
$ xcrun simctl list
# Other commands
$ xcrun simctl boot "${this.deviceId}"
$ open -a Simulator --args -CurrentDeviceUDID "${this.deviceId}"
$ xcrun simctl shutdown "${this.deviceId}"
```

Find UDID of real iPhone or iPad by single tap with iTunes, supports sending HTTP requests via USB in cases when your devices have restricted access to Wifi.

### Android

```shell
# launch an emulator
$ android list avd
$ emulator -avd xxx
```

Or you can connect your real device with USB.

```shell
# Then get the UDID of your Android devices.
$ adb devices
```

Further help: [native-in-practice](http://xudafeng.github.io/slide/archives/native-in-practice/)

## License

The MIT License (MIT)

Copyright (c) 2015 xdf
