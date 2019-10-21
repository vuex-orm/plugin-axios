const sidebars = {
  guide: [
    {
      title: 'Guide',
      collapsable: false,
      children: [
        '/guide/installation',
        '/guide/setup',
        '/guide/usage',
        '/guide/configurations',
        '/guide/custom-actions',
        '/guide/sponsors'
      ]
    },
  ],

  api: [
    {
      title: 'API',
      collapsable: false,
      children: [
        '/api/model',
        '/api/request'
      ]
    }
  ]
}

module.exports = {
  title: 'Vuex ORM Axios',
  description: 'Vuex ORM persistence plugin to sync the store against a RESTful API.',

  base: '/plugin-axios/',

  themeConfig: {
    repo: 'vuex-orm/plugin-axios',
    docsDir: 'docs',

    nav: [
      {
        text: 'Guide',
        link: '/guide/'
      },
      {
        text: 'API Reference',
        link: '/api/model'
      },
      {
        text: 'Release Notes',
        link: 'https://github.com/vuex-orm/plugin-axios/releases'
      }
    ],

    sidebar: {
      '/guide/': sidebars.guide,
      '/api/': sidebars.api,
      '/': sidebars.guide
    }
  }
}
