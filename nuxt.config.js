import webpack from 'webpack'
export default {
  ssr: true,
  // Global page headers (https://go.nuxtjs.dev/config-head)

  head: {
    title: '세계최초 블록체인 개인지갑기반  분산형 탈중앙 거래소',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: '' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  dotenv: { filename: process.env.NODE_ENV === 'production' ? '.env' : '.env.' + process.env.NODE_ENV },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/css/design.css', '@/assets/css/design_h.css', '@/assets/css/layout.css', '@/assets/css/custom.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/vee-validate.js', mode: 'client' },
    { src: '~/plugins/bxslider.js', mode: 'client' },
    { src: '~/plugins/filter.js' },
    { src: '~/plugins/amcharts.js', mode: 'client' },
    { src: '~/plugins/vue-pikaday.js', mode: 'client' },
    { src: '~/plugins/vue-moment.js' },
    { src: '~/plugins/i18n.js' },
    { src: '~/plugins/vue-cookie.js' },
    { src: '~/plugins/persistedState.js', mode: 'client' }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],
  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],

  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      pathRewrite: {
        '^/api': '/'
      }
    }
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    vendor: ['vue-i18n'],
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      })
    ],
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    postcss: {
      plugins: {
        'postcss-preset-env': {
          autoprefixer: {
            grid: true
          }
        }
      }
    }
  }
}
