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
    "revision": "66859b7834f21614d5887b2d5b781865"
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
    "url": "assets/js/app.3e9a1ec4.js",
    "revision": "31c00078e9adc173a64f2e352bc6f9da"
  },
  {
    "url": "guide/get-device-id.html",
    "revision": "f13827310ba27e0a029a37290b070be3"
  },
  {
    "url": "guide/install.html",
    "revision": "da23ed6710641eadeae06c1f8e1d43e8"
  },
  {
    "url": "guide/quick-start.html",
    "revision": "e639fb5fd614232d0bf77f7eda017309"
  },
  {
    "url": "index.html",
    "revision": "0ffb185b3ddc4565d92d52289602efc2"
  },
  {
    "url": "zh/guide/get-device-id.html",
    "revision": "f6ff08ffec63084bcc16cb97b9e19647"
  },
  {
    "url": "zh/guide/install.html",
    "revision": "5c8c9869f45aed69a4dea7928c082095"
  },
  {
    "url": "zh/guide/quick-start.html",
    "revision": "04054f58de367344d961d3388d0830bf"
  },
  {
    "url": "zh/index.html",
    "revision": "481a5526c0c1dd1924831df943026df6"
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
