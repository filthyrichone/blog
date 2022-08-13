export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'web',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'stylesheet',href: '//at.alicdn.com/t/font_3183235_djkqm8wssp.css' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
  },

  router: {
    extendRoutes(routes, resolve) {
      let targetRoutes = routes.find(v => v.name === 'index');
      targetRoutes = {
        ...targetRoutes,
        components: {
          default: targetRoutes.component,
          top: resolve(__dirname, 'components/top.vue'),
        },
        chunkNames: {
          top: 'components/top',
        }
      }
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['element-ui/lib/theme-chalk/index.css', '@/assets/scss/global.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/element-ui', '~/plugins/request', '@/plugins/routerGuard'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxt/content',
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'http://api.beta.blog.hyong1232.com:8084/',
    credentials: true,
  },

  server: {
    host: 'blog.hyong1232.com',
    port: 8080,
  },

  proxy: {
      '/web': {
          target: 'http://api.beta.blog.hyong1232.com:8084',
          changOrigin: true,
          pathRewrite: {
              '^/web':'/web'
          }
      },
      '/auth': {
          target: 'http://auth.hyong1232.com:8082',
          changeOrigin: true,
          pathRewrite: {
              '^/auth':'/'
          }
      }
  },
//   render: {
//     bundleRenderer: {
//         directives: {
//             eventListener: (el, binding) => {
//                 console.log('xixi');
//             }
//         }
//     }
//   },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  },
}
