const pkg = require('./package')

const path = require('path')

const webpack = require('webpack')

module.exports = {
    target: 'server',

    /*
     ** Headers of the page
     */
    head: {
        title: 'eat plants',
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
            },
            {
                rel: 'stylesheet',
                type: 'image/x-icon',
                href: 'https://fonts.googleapis.com/css?family=Open+Sans&display=swap'
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
    plugins: [
        '~/plugins/roles.js',
        '~/plugins/global.js'
    ],

    components: true,

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
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
            config.resolve.alias['~models'] = path.join(__dirname, "./vuex-orm/models") // doesn't work
            config.module.rules.push({
                test: /\.(graphql|gql)$/,
                exclude: /node_modules/,
                loader: 'graphql-tag/loader',
            })

            config.plugins.push(
                new webpack.IgnorePlugin(/(fs|child_process)/)
            )
        }
    }
}
