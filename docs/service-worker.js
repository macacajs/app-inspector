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

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    'url': '404.html',
    'revision': 'a9602ce1f0d7510e52560823b32737b6'
  },
  {
    'url': 'assets/css/0.styles.49751657.css',
    'revision': '8d12ae6a3b8dc558f55384484ca34d25'
  },
  {
    'url': 'assets/img/search.83621669.svg',
    'revision': '83621669651b9a3d4bf64d1a670ad856'
  },
  {
    'url': 'assets/js/10.25d5417e.js',
    'revision': '146e6a05d0344088c1fcb2ed252787c7'
  },
  {
    'url': 'assets/js/2.126dbf9d.js',
    'revision': '55e90988c268d61e89cf93b145e07b3b'
  },
  {
    'url': 'assets/js/3.2e901a1a.js',
    'revision': '7673e44b00c3f77e9b7c314efc547a52'
  },
  {
    'url': 'assets/js/4.2181027c.js',
    'revision': '27918945473758ee773c1851b53e6f06'
  },
  {
    'url': 'assets/js/5.c94fd65b.js',
    'revision': 'ad525df18935231d921ef7648c03009a'
  },
  {
    'url': 'assets/js/6.cea2bfc6.js',
    'revision': 'caed48e41abd456fcbceb0c68ff53f50'
  },
  {
    'url': 'assets/js/7.9af08320.js',
    'revision': '9044ec4d259d09e4bc2513aa23ad4cee'
  },
  {
    'url': 'assets/js/8.e063e059.js',
    'revision': '094d929852e5d6d285ef7e0f477ef7d7'
  },
  {
    'url': 'assets/js/9.8742df48.js',
    'revision': '9bd7ee3626fb81c26256964311a8b5d9'
  },
  {
    'url': 'assets/js/app.45cd10d6.js',
    'revision': 'd31dedd82fc83498c10210806232e072'
  },
  {
    'url': 'guide/configuration.html',
    'revision': '22c9521ad45763188c88413346cc9642'
  },
  {
    'url': 'guide/index.html',
    'revision': '7b9cef75b90c240cb299d05fc3b3d451'
  },
  {
    'url': 'guide/quick-start.html',
    'revision': 'b3c11f9cb5508e6d9617a625970b7f0b'
  },
  {
    'url': 'index.html',
    'revision': '13c8b186e5c35c5facfe9b808139d66d'
  },
  {
    'url': 'zh/guide/configuration.html',
    'revision': 'f49507eaa4b6c5af1459abaa2a61c5eb'
  },
  {
    'url': 'zh/guide/quick-start.html',
    'revision': '37d32b23171da4dd13f7b900cdd22818'
  },
  {
    'url': 'zh/index.html',
    'revision': '7c80325840600684968c8d0e06a75de8'
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0];
  const message = event.data;
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    );
  }
});
