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
    "revision": "c402ab33c613cebe4ed54cfc50a8edff"
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
    "url": "assets/css/0.styles.72d44caf.css",
    "revision": "52ed72c3d64ca601e1cb8f25f79f6fae"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.244fdb66.js",
    "revision": "9ec3c9848469c68b28fe4693dc967cda"
  },
  {
    "url": "assets/js/11.7c6e80d7.js",
    "revision": "a5b13f92d1145ad037fc4670c5aaedab"
  },
  {
    "url": "assets/js/2.3ca346c0.js",
    "revision": "59b9e09855a16d382db7d8ff58d74b0d"
  },
  {
    "url": "assets/js/3.96279ca7.js",
    "revision": "fb088b2b474039f4c0386f54271d2f2a"
  },
  {
    "url": "assets/js/4.5448e9df.js",
    "revision": "2bcfe6b62bb83aeb8ed2f11b956bcd93"
  },
  {
    "url": "assets/js/5.132a7e72.js",
    "revision": "161818c5c24162bc2dadd63353c63d1d"
  },
  {
    "url": "assets/js/6.6c828235.js",
    "revision": "db600e5c4b8d5f2b37a2ac8d467b4d79"
  },
  {
    "url": "assets/js/7.4310b8b3.js",
    "revision": "862dda23cc6e935a4c2cdfee87754efc"
  },
  {
    "url": "assets/js/8.9004f3bf.js",
    "revision": "b070f4125ab1d48a7c059c7a94a4df5a"
  },
  {
    "url": "assets/js/9.bbf82958.js",
    "revision": "b2adc575cc0a94b70b67c0ef28f4e23f"
  },
  {
    "url": "assets/js/app.6691a1eb.js",
    "revision": "b5612f50201228dc87ece74a5543213e"
  },
  {
    "url": "guide/get-device-id.html",
    "revision": "5915d1d2241513b6c0dccf620dcee205"
  },
  {
    "url": "guide/install.html",
    "revision": "a0f1721eb3c8eadd231373707e43b400"
  },
  {
    "url": "guide/quick-start.html",
    "revision": "63910c3ac205f416819deaba728d5fe8"
  },
  {
    "url": "index.html",
    "revision": "db09a1a5bd19453d651ec65d4859671a"
  },
  {
    "url": "zh/guide/get-device-id.html",
    "revision": "e6cb999c5828713c40e6f5048ae01ef2"
  },
  {
    "url": "zh/guide/install.html",
    "revision": "7c155f4143d287e5b28d9d20a1e13b58"
  },
  {
    "url": "zh/guide/quick-start.html",
    "revision": "81a58e36fd4701d7f56a204fd9010181"
  },
  {
    "url": "zh/index.html",
    "revision": "9724c1ffad370c9ed20f1950a3b00a87"
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
