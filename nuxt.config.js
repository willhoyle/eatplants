const pkg = require('./package')


module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },

  /*
   ** Global CSS
   */
  css: ['~/assets/styles.css', '~/assets/custom.scss'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/roles.js'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    browserBaseURL: 'http://localhost:3333',
    baseURL: 'http://localhost:3333'
  },

  /* nuxt-buefy module configuration */
  'nuxt-buefy': {
    css: false
  },

  /*
   ** Build configuration
   */
  build: {

  }
}
