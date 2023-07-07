export default {
    mode: 'spa',
    srcDir: __dirname,
    target: 'server',

    env: {
        appUrl: process.env.APP_URL,

        apiUrl: 'http://admin.decor-retro.ru/api',
        apiWebUrl: 'http://193.169.179.233/api',
    },

    server: {
        port: 8040,
        host: '0.0.0.0',
    },

    /*
     ** Headers of the page
     */
    head: {
        //title: process.env.npm_package_name || 'Декор Ретро Админ',
        title: 'Декор Ретро Админ',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700' }
        ],
        script: [
            { src: '/assets/plugins/global/plugins.bundle.js'},
            { src: '/assets/js/scripts.bundle.js'},
            //src: 'http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js', type: "text/javascript"},
             //{ src: 'https://cdn.rawgit.com/igorlino/elevatezoom-plus/1.1.6/src/jquery.ez-plus.js', type: "text/javascript"},
        ]
    },

/*
 ** Customize the progress-bar color
 */
    loading: { color: '#fff' },
    /*
     ** Global CSS
     */
    css: [
        '~/static/assets/plugins/global/plugins.bundle.css',
        '~/static/assets/css/style.bundle.css',
        '~/static/assets/css/skins/header/base/light.css',
        '~/static/assets/css/skins/header/menu/light.css',
        '~/static/assets/css/skins/brand/navy.css',
        '~/static/assets/css/skins/aside/navy.css',
        'element-ui/lib/theme-chalk/index.css'
    ],
    script: [
        // { src: 'https://decor-retro.ninja-tips.com/plugins.bundle.js', body: true},
        // { src: 'https://decor-retro.ninja-tips.com/scripts.bundle.js',  body: true}
    ],
    /*
    ** Auto import components
    ** See https://nuxtjs.org/api/configuration-components
    */
    components: true,
    
    router: {
        middleware: ['check-auth']
    },
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        '@/plugins/element-ui',
        '~plugins/axios',
        '~/plugins/vue-observe-visibility.client.js',
        '~plugins/permission',
        '~plugins/role',
        '~plugins/filters.js',
        '~plugins/vue-google-maps.js',
         '~/plugins/vue-product-zoomer.js',
        '~plugins/vue-h-zoom.js',
        //'~plugins/vue-zoomer.js', 
        '~plugins/nuxt-client-init', // Comment this for SSR
        //'~plugins/vform',
    ],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        '@nuxtjs/moment',
        //'@nuxtjs/dotenv',
        // Doc: https://github.com/nuxt-community/eslint-module
        //'@nuxtjs/eslint-module'
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
    ],
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {
        baseURL: 'http://admin.decor-retro.ru/api',
    },
    /*
     ** Build configuration
     */
    build: {
        transpile: [/^element-ui/],
        generate:{
            done(generator){
                // Copy dist files to public/_nuxt
                if (generator.nuxt.options.dev === false && generator.nuxt.options.mode === 'spa') {
                    const publicDir = join(generator.nuxt.options.rootDir, 'public', '_nuxt')
                    removeSync(publicDir) //Clear content from previous builds
                    copySync(join(generator.nuxt.options.generate.dir, '_nuxt'), publicDir)
                    copySync(join(generator.nuxt.options.generate.dir, '200.html'), join(publicDir, 'index.html'))
                    removeSync(generator.nuxt.options.generate.dir) //Delete 'Dist' folder from Laravel root
                }
                console.log("After generate dist folder");
            }
        },
        /*
         ** You can extend webpack config here
         */
         extend(config, ctx) {
            const vueLoader = config.module.rules.find((loader) => loader.loader === 'vue-loader')
      vueLoader.options.transformToRequire = {
        'vue-h-zoom': ['image', 'image-full']
      }
         }
    }
}
