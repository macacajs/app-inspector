'use strict';

const macacaEcosystem = require('macaca-ecosystem');

const name = 'app-inspector';

module.exports = {
  dest: 'docs_dist',
  base: `/${name}/`,

  locales: {
    '/': {
      lang: 'en-US',
      title: 'App Inspector',
      description: 'Mobile UI viewer in browser, view the UI in a tree view, and generate XPath automatically',
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'App Inspector',
      description: '浏览器端的移动设备 UI 查看器，使用树状态结构查看 UI 布局，自动生成 XPath',
    },
  },
  head: [
    ['script', {
      async: true,
      src: 'https://www.googletagmanager.com/gtag/js?id=UA-49226133-2',
    }, ''],
    ['script', {}, `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'UA-49226133-2');
    `]
  ],
  serviceWorker: true,
  themeConfig: {
    repo: `macacajs/${name}`,
    editLinks: true,
    docsDir: 'docs',
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        serviceWorker: {
          updatePopup: {
            message: 'New content is available.',
            buttonText: 'Refresh',
          },
        },
        nav: [
          {
            text: 'Guide',
            link: '/guide/install.html'
          },
          macacaEcosystem.en,
        ],
        sidebar: {
          '/guide/': genSidebarConfig('Guide')
        }
      },
      '/zh/': {
        label: '简体中文',
        selectText: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        serviceWorker: {
          updatePopup: {
            message: '发现新内容可用',
            buttonText: '刷新',
          },
        },
        nav: [
          {
            text: '指南',
            link: '/zh/guide/install.html'
          },
          macacaEcosystem.zh,
        ],
        sidebar: {
          '/zh/guide/': genSidebarConfig('指南')
        }
      },
    },
  },
};

function genSidebarConfig(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        'install',
        'quick-start',
        'get-device-id'
      ],
    },
  ];
}
