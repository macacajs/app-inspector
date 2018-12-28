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
    "revision": "9ceb988488329dcb58d78680d3a31945"
  },
  {
    "url": "assets/css/0.styles.097f5fb4.css",
    "revision": "f577c2d75e2bc0d52e164bdd1d9fd5ae"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.3f7b175a.js",
    "revision": "007d87aa453a9ef041bcb1eb891e685a"
  },
  {
    "url": "assets/js/11.cc2582dd.js",
    "revision": "22cf950f6d4aede90f7b8304e8206e23"
  },
  {
    "url": "assets/js/2.fec75338.js",
    "revision": "f2b60d0015e912b2683b74186bc821c6"
  },
  {
    "url": "assets/js/3.15404d34.js",
    "revision": "d670c0cd014bb40a911f6c46848b5d86"
  },
  {
    "url": "assets/js/4.438c3ce1.js",
    "revision": "01c839b8c8f56140cf28c600168836a5"
  },
  {
    "url": "assets/js/5.266ccb0f.js",
    "revision": "5d39f5758c000a0148e19cf32857f71f"
  },
  {
    "url": "assets/js/6.946d4ee6.js",
    "revision": "44f7c51c0bd48d75a01cd4c9280f42f9"
  },
  {
    "url": "assets/js/7.03de0a2d.js",
    "revision": "af94cf75dd6a8e98f5e667ea9c4ed5d7"
  },
  {
    "url": "assets/js/8.c473d93b.js",
    "revision": "5320d9364162cc8ac905d1a871e92ea6"
  },
  {
    "url": "assets/js/9.20d2eb78.js",
    "revision": "b682705a667f313da7ed7c763871d811"
  },
  {
    "url": "assets/js/app.3f2ef278.js",
    "revision": "69e3293fd4eece3e0c9dceeaf60adbaf"
  },
  {
    "url": "guide/get-device-id.html",
    "revision": "291f0c363c09bcf7101979e64c893881"
  },
  {
    "url": "guide/install.html",
    "revision": "b8e5ad7f184b562fc7a2f6bab2bd61c6"
  },
  {
    "url": "guide/quick-start.html",
    "revision": "f4d0e13b94614bbcf3f52bb97210de2e"
  },
  {
    "url": "index.html",
    "revision": "ca9d9a20456932d78a4b2d05b7674603"
  },
  {
    "url": "zh/guide/get-device-id.html",
    "revision": "47227faa4eed5aba332074fed06169e8"
  },
  {
    "url": "zh/guide/install.html",
    "revision": "e0de6bcf3f6b0eb20de63a50a195962b"
  },
  {
    "url": "zh/guide/quick-start.html",
    "revision": "c446eb98e7b8812b1ed3e62abfb2cf0c"
  },
  {
    "url": "zh/index.html",
    "revision": "b0763b064640827a63f9cc3465ac14fa"
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
