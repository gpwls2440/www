const webpack = require('webpack')
export default {
  ssr: true,
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'www',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: '' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/css/base.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/vee-validate.js', mode: 'client' },
    { src: '~/plugins/bxslider.js', mode: 'client' },
    { src: '~/plugins/highcharts-vue.js', mode: 'client' },
    { src: '~/plugins/filter.js' },
    { src: '~/plugins/chartjs-plugin-datalabels.js', mode: 'client' },
    { src: '~/plugins/trading-vue-js.js', mode: 'client' },
    { src: '~/plugins/amcharts.js', mode: 'client' },
    { src: '~/plugins/anychart.js', mode: 'client' },
    { src: '~/plugins/pikaday.js', mode: 'client' },
    { src: '~/plugins/vue-moment.js' },
    { src: '~/plugins/vue-fusioncharts.js', mode: 'client' }
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
    '@nuxtjs/axios'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
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
