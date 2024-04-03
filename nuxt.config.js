import colors from 'vuetify/es5/util/colors'

const auth = {
  persistence: 'local', // default
  initialize: {
    onAuthStateChangedAction: 'auth/onAuthStateChangedAction',
    subscribeManually: false
  },
  ssr: false
}

if (process.env.NODE_ENV === 'development') {
  auth.emulatorPort = 9099
  auth.emulatorHost = 'http://localhost'
}

export default {
  // disable SSR rendering
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - WasteNotMarketplace',
    title: 'WasteNotMarketplace',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap', crossorigin: true }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/api.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // router: {
  //   middleware: ['auth']
  // },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyCr7b5iXtkghyyZgwWCGh62cxLBCaVM8Jo',
          authDomain: 'wastenot-c13cd.firebaseapp.com',
          projectId: 'wastenot-c13cd',
          storageBucket: 'wastenot-c13cd.appspot.com',
          messagingSenderId: '881650790886',
          appId: '1:881650790886:web:1b4b6d02fad949829d6627',
          measurementId: 'G-EFZW7R00SD'
        },
        services: { auth }
      }
    ]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/'
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      dark: false,
      light: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          'custom-primary': '#00A699',
          'custom-secondary': '#003E39'
        }
      }
    },
    defaultAssets: {
      font: false // Menonaktifkan font bawaan Vuetify
    },
    fonts: {
      family: 'Montserrat'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
