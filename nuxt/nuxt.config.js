export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'vr-website-frontend',
    htmlAttrs: {
      lang: 'zh',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  target: 'server',
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/styles/index.less'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // {
    //   src: '~/plugins/axios',
    //   ssr: true,
    // },
    {
      src: '~/plugins/rem.js',
      ssr: false,
    },
    {
      src: '~/plugins/i18n.js',
      // ssr: false,
    },
    // {
    //   src: '~/plugins/sentry.js',
    //   ssr: false,
    // },
    {
      src: '~plugins/components.js',
      ssr: true,
    },
  ],
  i18n: {
    locales: [
      { name: '简体中文', code: 'zh', iso: 'zh-cn', file: 'zh.js' },
      { name: 'English', code: 'en', iso: 'en-US', file: 'en.js' },
      { name: 'de', code: 'de', iso: 'de-DE', file: 'de.js' },
    ],
    lazy: true,
    langDir: '~/lang/',
    defaultLocale: 'zh',
    strategy: 'no_prefix',
    // baseUrl: 'http://192.168.1.7:3002'
  },
  buildModules: [
    '@nuxtjs/eslint-module',
    [
      '@nuxtjs/vuetify',
      {
        treeShake: true,
      },
    ],
    'nuxt-gsap',
  ],
  vuetify: {
    optionsPath: '~/plugins/vuetify.options.js',
  },
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  // buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', '@nuxtjs/i18n'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    /*
     ** Run ESLint on save
     */
    // extend(config, { isDev, isClient }) {
    //   if (isDev && isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/,
    //     })
    //   }
    // },
  },
  router: {
    middleware: ['device'],
    // scrollBehavior: function (to, from, savedPosition) {
    //   return { x: 0, y: 0 }
    // },
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'home',
        path: '*',
        component: resolve(__dirname, 'pages/index.vue'),
      })
    },
  },
  // axios: {
  //   baseURL: `http://${process.env.HOST || 'localhost'}:${
  //     process.env.PORT || 4001
  //   }`,
  //   // browserBaseURL: '/',
  //   proxy: true,
  //   // ,
  //   // https: true
  // },
}
