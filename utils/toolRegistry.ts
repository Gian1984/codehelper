import type { DefineComponent } from 'vue'

type Tool = {
    title: string
    description: string
    component: () => Promise<{ default: DefineComponent }>
    category?: string
    seo?: {
        title?: string
        description?: string
        ogImage?: string
        keywords?: string
        structuredData?: Record<string, any>
    }
}

export const tools: Record<string, Tool> = {
    'json-formatter': {
        title: 'JSON Formatter',
        description: 'Beautify and validate your JSON.',
        category: 'formatter',
        component: () => import('~/components/tools/formatter/JsonFormatter.vue'),
        seo: {
            title: 'JSON Formatter – CodeHelper',
            description: 'Beautify, format, and validate JSON instantly in the browser.',
            ogImage: 'https://codehelper.me/images/codehelper_OGIMAGE.webp',
            keywords: 'json, formatter, beautify, validator, online tool',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "JSON Formatter",
                "operatingSystem": "All",
                "applicationCategory": "DeveloperApplication",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5",
                    "ratingCount": "38"
                }
            }
        }
    },

    'xml-formatter': {
        title: 'XML Formatter',
        description: 'Pretty-print and validate XML structures.',
        category: 'formatter',
        component: () => import('~/components/tools/formatter/XmlFormatter.vue'),
        seo: {
            title: 'XML Formatter & Validator – CodeHelper',
            description: 'Beautify and validate XML code directly in the browser. Indent, highlight errors, and clean your markup.',
            ogImage: 'https://codehelper.me/images/codehelper_OGIMAGE.webp',
            keywords: 'xml, formatter, beautifier, validator, pretty-print, xml validator online, code formatter',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "XML Formatter",
                "operatingSystem": "All",
                "applicationCategory": "DeveloperApplication",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5",
                    "ratingCount": "20"
                }
            }
        }
    },

    'json-yaml-converter': {
        title: 'JSON ↔ YAML Converter',
        description: 'Convert JSON to YAML and YAML to JSON seamlessly.',
        category: 'converter',
        component: () => import('~/components/tools/converter/JsonYamlConverter.vue'),
        seo: {
            title: 'JSON ↔ YAML Converter – CodeHelper',
            description: 'Convert JSON to YAML and vice versa easily in your browser. No installation, fast and reliable.',
            ogImage: 'https://codehelper.me/images/codehelper_OGIMAGE.webp',
            keywords: 'json to yaml, yaml to json, json converter, yaml converter, code conversion, online tool',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "JSON ↔ YAML Converter",
                "operatingSystem": "All",
                "applicationCategory": "DeveloperApplication",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5",
                    "ratingCount": "16"
                }
            }
        }
    },

    'number-base-converter': {
        title: 'Number Base Converter',
        description: 'Convert numbers between Binary, Octal, Decimal, and Hex.',
        category: 'converter',
        component: () => import('~/components/tools/converter/NumberBaseConverter.vue'),
        seo: {
            title: 'Number Base Converter – CodeHelper',
            description: 'Convert between decimal, binary, octal, and hexadecimal with this fast and easy online converter.',
            ogImage: 'https://codehelper.me/images/codehelper_OGIMAGE.webp',
            keywords: 'number converter, binary, octal, decimal, hexadecimal, base converter, online tool',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Number Base Converter",
                "operatingSystem": "All",
                "applicationCategory": "DeveloperApplication",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5",
                    "ratingCount": "26"
                }
            }
        }
    },

    'byte-size-converter': {
        title: 'Byte Size Converter',
        description: 'Convert between Bytes, KB, MB, GB, and TB easily.',
        category: 'converter',
        component: () => import('~/components/tools/converter/ByteSizeConverter.vue'),
        seo: {
            title: 'Byte Size Converter – CodeHelper',
            description: 'Convert bytes to KB, MB, GB, TB, and vice versa with this fast and accurate online converter.',
            ogImage: 'https://codehelper.me/images/codehelper_OGIMAGE.webp',
            keywords: 'byte converter, kb to mb, mb to gb, byte size converter, data size calculator, online tool',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Byte Size Converter",
                "operatingSystem": "All",
                "applicationCategory": "DeveloperApplication",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5",
                    "ratingCount": "18"
                }
            }
        }
    },

    'clamp-generator': {
        title: 'Clamp Generator',
        description: 'Generate responsive font-size clamp() CSS.',
        category: 'css',
        component: () => import('~/components/tools/css/ClampGenerator.vue'),
        seo: {
            title: 'CSS Clamp Generator – CodeHelper',
            description: 'Build fluid font-sizes with CSS clamp() utility.',
            ogImage: 'https://codehelper.me/images/codehelper_OGIMAGE.webp',
            keywords: 'clamp, css, font-size, generator, responsive design',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "CSS Clamp Generator",
                "operatingSystem": "All",
                "applicationCategory": "DeveloperApplication",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5",
                    "ratingCount": "22"
                }
            }
        }
    },
    'var-dump-formatter': {
        title: 'Var Dump Formatter',
        description: 'Beautify and format PHP var_dump() output.',
        category: 'formatter',
        component: () => import('~/components/tools/formatter/VarDumpFormatter.vue'),
        seo: {
            title: 'Var Dump Formatter – CodeHelper',
            description: 'Format messy var_dump() output into readable structure instantly.',
            ogImage: 'https://codehelper.me/images/codehelper_OGIMAGE.webp',
            keywords: 'php, var_dump, formatter, beautifier, code formatter, dump viewer',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Var Dump Formatter",
                "operatingSystem": "All",
                "applicationCategory": "DeveloperApplication",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5",
                    "ratingCount": "12"
                }
            }
        }
    },
    'html-minifier': {
        title: 'HTML Minifier',
        description: 'Minify your HTML files for optimized delivery.',
        category: 'formatter',
        component: () => import('~/components/tools/formatter/HtmlMinifier.vue'),
        seo: {
            title: 'HTML Minifier – CodeHelper',
            description: 'Minify and compress HTML code for faster loading and cleaner markup. Remove comments, collapse whitespace, and more.',
            ogImage: 'https://codehelper.me/images/codehelper_OGIMAGE.webp',
            keywords: 'html, minifier, html compressor, remove comments, collapse whitespace, optimize, clean html',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "HTML Minifier",
                "operatingSystem": "All",
                "applicationCategory": "DeveloperApplication",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5",
                    "ratingCount": "11"
                }
            }
        }
    },

    'px-to-vh-converter': {
        title: 'PX to VH Converter',
        description: 'Convert pixel values to responsive vh units based on viewport height.',
        category: 'css',
        component: () => import('~/components/tools/css/PxToVhConverter.vue'),
        seo: {
            title: 'PX to VH Converter – CodeHelper',
            description: 'Convert pixel (px) values into responsive viewport height (vh) units easily.',
            ogImage: 'https://codehelper.me/images/codehelper_OGIMAGE.webp',
            keywords: 'px, vh, converter, responsive, css, unit converter, viewport height',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "PX to VH Converter",
                "operatingSystem": "All",
                "applicationCategory": "DeveloperApplication",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5",
                    "ratingCount": "17"
                }
            }
        }
    },
    'px-to-vw-converter': {
        title: 'PX to VW Converter',
        description: 'Convert pixel values to responsive vw units based on viewport width.',
        category: 'css',
        component: () => import('~/components/tools/css/PxToVwConverter.vue'),
        seo: {
            title: 'PX to VW Converter – CodeHelper',
            description: 'Convert pixel (px) values into responsive viewport width (vw) units easily.',
            ogImage: 'https://codehelper.me/images/codehelper_OGIMAGE.webp',
            keywords: 'px, vw, converter, responsive, css, unit converter, viewport width',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "PX to VW Converter",
                "operatingSystem": "All",
                "applicationCategory": "DeveloperApplication",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5",
                    "ratingCount": "19"
                }
            }
        }
    },
    'svg-icon-generator': {
        title: 'SVG Icon Generator',
        description: 'Create and customize SVG icons for the web directly in your browser.',
        category: 'svg',
        component: () => import('~/components/tools/svg/IconGenerator.vue'),
        seo: {
            title: 'SVG Icon Generator – CodeHelper',
            description: 'Design, customize and export scalable vector icons directly in your browser.',
            ogImage: 'https://codehelper.me/images/codehelper_OGIMAGE.webp',
            keywords: 'svg, icon, generator, design, web icon, svg builder, icon editor',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "SVG Icon Generator",
                "operatingSystem": "All",
                "applicationCategory": "DeveloperApplication",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5",
                    "ratingCount": "9"
                }
            }
        }
    },
    'aspect-ratio-calculator': {
        title: 'Aspect Ratio Calculator',
        description: 'Calculate aspect ratios and pixel dimensions for media and screens.',
        category: 'css',
        component: () => import('~/components/tools/css/AspectRatioCalculator.vue'),
        seo: {
            title: 'Aspect Ratio Calculator – CodeHelper',
            description: 'Easily calculate aspect ratios from pixel dimensions (width and height).',
            ogImage: 'https://codehelper.me/images/codehelper_OGIMAGE.webp',
            keywords: 'aspect ratio, calculator, responsive, design, media, video, image, resolution',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Aspect Ratio Calculator",
                "operatingSystem": "All",
                "applicationCategory": "DeveloperApplication",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5",
                    "ratingCount": "27"
                }
            }
        }
    },
    'aspect-frame-generator': {
        title: 'Aspect Frame Generator',
        description: 'Generate matte frames with custom aspect ratios and download them as images.',
        category: 'imaging',
        component: () => import('~/components/tools/imaging/FrameGenerator.vue'),
        seo: {
            title: 'Aspect Frame Generator – CodeHelper',
            description: 'Create and download matte-style image overlays with custom aspect ratios and resolution.',
            ogImage: 'https://codehelper.me/images/codehelper_OGIMAGE.webp',
            keywords: 'aspect ratio, matte, frame, overlay, video, image, resolution, generator',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Aspect Frame Generator",
                "operatingSystem": "All",
                "applicationCategory": "GraphicsApplication",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5",
                    "ratingCount": "15"
                }
            }
        }
    },
    'lorem-ipsum-generator': {
        title: 'Lorem Ipsum Generator',
        description: 'Generate customizable placeholder text (words, paragraphs, characters).',
        category: 'textes',
        component: () => import('~/components/tools/textes/LoremIpsumGenerator.vue'),
        seo: {
            title: 'Lorem Ipsum Generator – CodeHelper',
            description: 'Create dummy placeholder text in various formats for design and development.',
            ogImage: 'https://codehelper.me/images/codehelper_OGIMAGE.webp',
            keywords: 'lorem ipsum, placeholder text, dummy text, generator, paragraphs, characters, web design',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Lorem Ipsum Generator",
                "operatingSystem": "All",
                "applicationCategory": "DeveloperApplication",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5",
                    "ratingCount": "24"
                }
            }
        }
    },
    'text-case-converter': {
        title: 'Text Case Converter',
        description: 'Convert text to UPPERCASE, Capitalize Case, or Sentence case.',
        category: 'textes',
        component: () => import('~/components/tools/textes/TextCaseConverter.vue'),
        seo: {
            title: 'Text Case Converter – CodeHelper',
            description: 'Easily convert any text to uppercase, capitalized case, or sentence case for formatting and readability.',
            ogImage: 'https://codehelper.me/images/codehelper_OGIMAGE.webp',
            keywords: 'text case, convert, uppercase, lowercase, capitalize, sentence case, formatter',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Text Case Converter",
                "operatingSystem": "All",
                "applicationCategory": "DeveloperApplication",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5",
                    "ratingCount": "21"
                }
            }
        }
    },
    'color-converter': {
        title: 'Color Converter',
        description: 'Convert colors between HEX, RGB, and HSL formats instantly.',
        category: 'colors',
        component: () => import('~/components/tools/colors/ColorConverter.vue'),
        seo: {
            title: 'Color Converter – CodeHelper',
            description: 'Easily convert HEX to RGB and HSL color values for design and development.',
            ogImage: 'https://codehelper.me/images/codehelper_OGIMAGE.webp',
            keywords: 'color converter, hex to rgb, rgb to hsl, color formats, design tools, web colors',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Color Converter",
                "operatingSystem": "All",
                "applicationCategory": "DeveloperApplication",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5",
                    "ratingCount": "18"
                }
            }
        }
    },
    'color-palette-generator': {
        title: 'Color Palette Generator',
        description: 'Generate harmonious color palettes from any base HEX color.',
        category: 'colors',
        component: () => import('~/components/tools/colors/ColorPaletteGenerator.vue'),
        seo: {
            title: 'Color Palette Generator – CodeHelper',
            description: 'Create visually balanced color palettes from a single base HEX color for design and UI use.',
            ogImage: 'https://codehelper.me/images/codehelper_OGIMAGE.webp',
            keywords: 'color palette, palette generator, hex colors, design tools, web colors, shades, tints',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Color Palette Generator",
                "operatingSystem": "All",
                "applicationCategory": "DeveloperApplication",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5",
                    "ratingCount": "14"
                }
            }
        }
    }



}


