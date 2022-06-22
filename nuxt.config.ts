import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: [
        '@pinia/nuxt',
        '@unocss/nuxt',
        '@vueuse/nuxt',
        '@kevinmarrec/nuxt-pwa'
    ],
    experimental: {
        reactivityTransform: true
    },

    unocss: {
        attributify: true,
        autoImport: true,
        theme: {
            colors: {
                primary: {
                    100: '#6895dd',
                    300: '#3672d2',
                    500: '#044fc7',
                    700: '#033f9f',
                    900: '#022f77',
                    DEFAULT: '#044fc7'
                }
            }
        },
        shortcuts: {
        }
    },
    pwa: {
        icon: {
            source: 'public/icon.png'
        },
        meta: {
            description: 'app pra dar aquela forcinha',
            ogTitle: 'ufrj.xyz',
            ogDescription: 'app pra dar aquela forcinha',
            ogSiteName: 'ufrj.xyz',
            appleStatusBarStyle: 'black-translucent' as any,
            theme_color: '#044fc7',
        },
        manifest: {
            name: 'ufrj.xyz',
            short_name: 'ufrj.xyz',
            description: 'app pra dar aquela forcinha',
            theme_color: '#044fc7',
            background_color: '#044fc7',
        }
    },
})
