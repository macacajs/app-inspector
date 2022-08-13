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
    "revision": "94e1324d1367a8103abba7d9910867c7"
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
    "url": "assets/css/0.styles.7ab8c9ec.css",
    "revision": "52ed72c3d64ca601e1cb8f25f79f6fae"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.3ca8a0f7.js",
    "revision": "ae19a6e34257c0c2f51645d700dbb632"
  },
  {
    "url": "assets/js/11.b1f8b61b.js",
    "revision": "16af23e75a95791dbf144e4e9d0c6147"
  },
  {
    "url": "assets/js/2.8ad0b0fa.js",
    "revision": "372c517143124a5f014ccf8d0d5218ee"
  },
  {
    "url": "assets/js/3.bb0c4f02.js",
    "revision": "128310eb19b78486256087f4d642edad"
  },
  {
    "url": "assets/js/4.8fbc3fbf.js",
    "revision": "0d8fe22136df5b71c66648e960bdc3f4"
  },
  {
    "url": "assets/js/5.bc73aaa7.js",
    "revision": "9eac7eb20409f6d9595f4d0f5cb91cb6"
  },
  {
    "url": "assets/js/6.554377f8.js",
    "revision": "9a99a885c671b94711bd033dd003d67b"
  },
  {
    "url": "assets/js/7.a449ba44.js",
    "revision": "a2a445ef73534e64c1ed5fc5703728bf"
  },
  {
    "url": "assets/js/8.cf22e92e.js",
    "revision": "bccfffa15accacf0cbd39355fa6bb5e8"
  },
  {
    "url": "assets/js/9.85d777d0.js",
    "revision": "50671be9fbd7bb8808c433bc23f4fc1d"
  },
  {
    "url": "assets/js/app.c721d733.js",
    "revision": "92bb19d2ba5fefafb976acf75ed9b489"
  },
  {
    "url": "guide/get-device-id.html",
    "revision": "87214c408f87d3b36ee55d3c2eec36f6"
  },
  {
    "url": "guide/install.html",
    "revision": "cdf31a3c91e1f81d56f78c4cf5def40b"
  },
  {
    "url": "guide/quick-start.html",
    "revision": "21b7b01da0b92afe533c19916b662e2b"
  },
  {
    "url": "index.html",
    "revision": "a1271bd50b8b06137252ac31a4d36b30"
  },
  {
    "url": "zh/guide/get-device-id.html",
    "revision": "a9daaefeac37870bb939285edb50e606"
  },
  {
    "url": "zh/guide/install.html",
    "revision": "64142ea27f27e6c3015fb2b648ff9540"
  },
  {
    "url": "zh/guide/quick-start.html",
    "revision": "04c55f6064a72b08259e5b2147ebc316"
  },
  {
    "url": "zh/index.html",
    "revision": "fd0937e495ff5c294295c33dcbdb0986"
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
