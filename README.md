# app-inspector

---

[![NPM version][npm-image]][npm-url]
[![Package quality][quality-image]][quality-url]
[![CI][CI-image]][CI-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/app-inspector.svg
[npm-url]: https://npmjs.org/package/app-inspector
[quality-image]: https://packagequality.com/shield/app-inspector.svg
[quality-url]: https://packagequality.com/#?package=app-inspector
[CI-image]: https://github.com/macacajs/app-inspector/actions/workflows/ci.yml/badge.svg
[CI-url]: https://github.com/macacajs/app-inspector/actions/workflows/ci.yml
[coveralls-image]: https://img.shields.io/coveralls/macacajs/app-inspector.svg
[coveralls-url]: https://coveralls.io/r/macacajs/app-inspector?branch=master
[node-image]: https://img.shields.io/badge/node.js-%3E=_8-green.svg
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/app-inspector.svg
[download-url]: https://npmjs.org/package/app-inspector

[App-inspector](//macacajs.github.io/app-inspector/) is a mobile UI viewer in browser.

<!-- GITCONTRIBUTOR_START -->

## Contributors

|[<img src="https://avatars.githubusercontent.com/u/1011681?v=4" width="100px;"/><br/><sub><b>xudafeng</b></sub>](https://github.com/xudafeng)<br/>|[<img src="https://avatars.githubusercontent.com/u/4006436?v=4" width="100px;"/><br/><sub><b>meowtec</b></sub>](https://github.com/meowtec)<br/>|[<img src="https://avatars.githubusercontent.com/u/1209810?v=4" width="100px;"/><br/><sub><b>paradite</b></sub>](https://github.com/paradite)<br/>|[<img src="https://avatars.githubusercontent.com/u/11460601?v=4" width="100px;"/><br/><sub><b>zivyangll</b></sub>](https://github.com/zivyangll)<br/>|[<img src="https://avatars.githubusercontent.com/u/1044425?v=4" width="100px;"/><br/><sub><b>ziczhu</b></sub>](https://github.com/ziczhu)<br/>|[<img src="https://avatars.githubusercontent.com/u/4576123?v=4" width="100px;"/><br/><sub><b>CodeToSurvive1</b></sub>](https://github.com/CodeToSurvive1)<br/>|
| :---: | :---: | :---: | :---: | :---: | :---: |
[<img src="https://avatars.githubusercontent.com/u/410850?v=4" width="100px;"/><br/><sub><b>qichuan</b></sub>](https://github.com/qichuan)<br/>|[<img src="https://avatars.githubusercontent.com/u/52845048?v=4" width="100px;"/><br/><sub><b>snapre</b></sub>](https://github.com/snapre)<br/>|[<img src="https://avatars.githubusercontent.com/u/12913557?v=4" width="100px;"/><br/><sub><b>risinek</b></sub>](https://github.com/risinek)<br/>|[<img src="https://avatars.githubusercontent.com/u/18494563?v=4" width="100px;"/><br/><sub><b>mahalo777</b></sub>](https://github.com/mahalo777)<br/>|[<img src="https://avatars.githubusercontent.com/u/15025212?v=4" width="100px;"/><br/><sub><b>zhuyali</b></sub>](https://github.com/zhuyali)<br/>

This project follows the git-contributor [spec](https://github.com/xudafeng/git-contributor), auto updated at `Thu Apr 21 2022 00:04:00 GMT+0800`.

<!-- GITCONTRIBUTOR_END -->

![](https://macacajs.github.io/app-inspector/assets/7dfcf2f7gw1f77ev6csw5g20s50iwe81.gif)

## Installation

App-inspector is distibuted through npm. To install it, run the following command line:

```bash
$ npm i app-inspector -g
```

Note: If you are going to use app-inspector on real iOS device, see [iOS Real Device section](#ios-real-device)

## Usage

```bash
$ app-inspector -u xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

## Home Page

Visit https://macacajs.github.io/app-inspector/ for more information.

### iOS Real Device

First, find the Development Team ID as shown on image below.

![](https://macacajs.github.io/app-inspector/assets/6d308bd9gy1fg7cnt9hf6j20t70h7782.jpg)

Run this command where TEAM_ID is your ID from the first step.

```bash
$ DEVELOPMENT_TEAM_ID=TEAM_ID npm i app-inspector -g
```

## License

The MIT License (MIT)
