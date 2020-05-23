/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "a0d5fbb92d5a85492f62af10fa27cd70"
  },
  {
    "url": "assets/6d308bd9gy1fg7cnt9hf6j20t70h7782.jpg",
    "revision": "d1b909c93ce3b8478ca3cbe6c12b9e56"
  },
  {
    "url": "assets/7dfcf2f7gw1f77ev6csw5g20s50iwe81.gif",
    "revision": "f451c80694ab147dcd9b1dbf6eb1d5f4"
  },
  {
    "url": "assets/css/0.styles.1de9bb94.css",
    "revision": "8f760517119e6c64a72834cd48586c2c"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.fb8d7eed.js",
    "revision": "1f839e0a5d082626123ed4efa06afc1c"
  },
  {
    "url": "assets/js/11.5aa3c78f.js",
    "revision": "a5b13f92d1145ad037fc4670c5aaedab"
  },
  {
    "url": "assets/js/2.0dd64cdf.js",
    "revision": "ac3c07dd1687b332f8d66d63c115fd6c"
  },
  {
    "url": "assets/js/3.dd69bde0.js",
    "revision": "0f0280fb8f975c1aac256ca8dd18777d"
  },
  {
    "url": "assets/js/4.3e014228.js",
    "revision": "1b6bac80795f25659c1a9aa35c7a777e"
  },
  {
    "url": "assets/js/5.669c69d6.js",
    "revision": "acea13ddb5cbd708f9dbb1eb527a5639"
  },
  {
    "url": "assets/js/6.3a3e54bc.js",
    "revision": "a3364ff8ec51ede7b4dc7a8d4fadbaac"
  },
  {
    "url": "assets/js/7.f7fc3b82.js",
    "revision": "d606e03d6abfbc69770890080ef65bac"
  },
  {
    "url": "assets/js/8.b8b66b1f.js",
    "revision": "9f338986214e1203716e18b9f14d017b"
  },
  {
    "url": "assets/js/9.82fcd01f.js",
    "revision": "9d2a45575c28848eccab16679c86b1df"
  },
  {
    "url": "assets/js/app.1f371f8c.js",
    "revision": "7cdc21ddaef005f961ec120f3384d928"
  },
  {
    "url": "guide/get-device-id.html",
    "revision": "e9c0599c009c127e17b206bac3937713"
  },
  {
    "url": "guide/install.html",
    "revision": "1875ff1e88efc81c9f5ddef7db010e7a"
  },
  {
    "url": "guide/quick-start.html",
    "revision": "920242e1147a7e5bb3d11aaaddaa012e"
  },
  {
    "url": "index.html",
    "revision": "9a7010be027b5807557a59310e318c6f"
  },
  {
    "url": "zh/guide/get-device-id.html",
    "revision": "2cb558648b85800c6077c5edacc8f4b9"
  },
  {
    "url": "zh/guide/install.html",
    "revision": "8020890e7b7e791d62e64666efa99ff7"
  },
  {
    "url": "zh/guide/quick-start.html",
    "revision": "4c6ea3907616420dbc2423f48ea70042"
  },
  {
    "url": "zh/index.html",
    "revision": "a008998807dca813ba2962b82c25e422"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
