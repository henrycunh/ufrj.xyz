import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetTypography,
    presetUno,
    presetWebFonts,
    transformerDirectives,
    transformerVariantGroup,
} from 'unocss'

export default defineConfig({
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
            scale: 1.2,
        }),
        presetTypography(),
        presetWebFonts({
            fonts: {
                sans: 'Inter',
            },
        }),
    ],
    transformers: [
        transformerDirectives(),
        transformerVariantGroup(),
    ],
    shortcuts: {
        glass: 'bg-white/35 backdrop-blur-2px shadow-md shadow-black/5 b-1 b-white/20',
        'ux-button': 'glass py-2 px-3 rounded-2 flex items-center text-coolgray-500 hover:op80 transition cursor-pointer b-1 b-coolgray-200 hover:translate-y--2px active:translate-y-2px select-none'
        
    }
})