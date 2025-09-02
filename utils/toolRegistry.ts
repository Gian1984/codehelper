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
        component: () =>
            import('~/components/tools/formatter/JsonFormatter.vue') as Promise<{
                default: DefineComponent
            }>,
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
        component: () => import('~/components/tools/formatter/XmlFormatter.vue') as Promise<{
            default: DefineComponent
        }>,
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
        component: () => import('~/components/tools/converter/JsonYamlConverter.vue')as Promise<{
            default: DefineComponent
        }>,
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
        component: () => import('~/components/tools/converter/NumberBaseConverter.vue') as Promise<{
            default: DefineComponent
        }>,
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

    'readme-generator': {
        title: 'README Generator',
        description: 'Generate GitHub README.md files with customizable sections.',
        category: 'generator',
        component: () => import('~/components/tools/generator/ReadmeGenerator.vue') as Promise<{
            default: DefineComponent
        }>,
        seo: {
            title: 'README Generator – CodeHelper',
            description: 'Quickly generate structured README.md markdown files for your GitHub projects with customizable sections like Installation, Usage, and License.',
            ogImage: 'https://codehelper.me/images/codehelper_OGIMAGE.webp',
            keywords: 'readme generator, markdown, github readme, markdown template, project documentation, generator',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "README Generator",
                "operatingSystem": "All",
                "applicationCategory": "DeveloperApplication",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5",
                    "ratingCount": "7"
                }
            }
        }
    },


    'byte-size-converter': {
        title: 'Byte Size Converter',
        description: 'Convert between Bytes, KB, MB, GB, and TB easily.',
        category: 'converter',
        component: () => import('~/components/tools/converter/ByteSizeConverter.vue') as Promise<{
            default: DefineComponent
        }>,
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
        component: () => import('~/components/tools/css/ClampGenerator.vue') as Promise<{
            default: DefineComponent
        }>,
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
        component: () => import('~/components/tools/formatter/VarDumpFormatter.vue') as Promise<{
            default: DefineComponent
        }>,
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
        component: () => import('~/components/tools/formatter/HTMLMinifier.vue') as Promise<{
            default: DefineComponent
        }>,
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
        component: () => import('~/components/tools/css/PxToVhConverter.vue') as Promise<{
            default: DefineComponent
        }>,
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
        component: () => import('~/components/tools/css/PxToVwConverter.vue') as Promise<{
            default: DefineComponent
        }>,
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
        component: () => import('~/components/tools/svg/IconGenerator.vue') as Promise<{
            default: DefineComponent
        }>,
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

    'wave-generator': {
        title: 'SVG Wave Generator',
        description: 'Create customizable SVG wave shapes easily.',
        category: 'svg',
        component: () => import('~/components/tools/svg/WaveGenerator.vue') as Promise<{
            default: DefineComponent
        }>,
        seo: {
            title: 'SVG Wave Generator – CodeHelper',
            description: 'Generate customizable SVG wave shapes for your web projects.',
            ogImage: 'https://codehelper.me/images/codehelper_OGIMAGE.webp',
            keywords: 'svg, wave, generator, customizable, web design, graphic tool',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "SVG Wave Generator",
                "operatingSystem": "All",
                "applicationCategory": "DeveloperApplication",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5",
                    "ratingCount": "8"
                }
            }
        }
    },

    'aspect-ratio-calculator': {
        title: 'Aspect Ratio Calculator',
        description: 'Calculate aspect ratios and pixel dimensions for media and screens.',
        category: 'css',
        component: () => import('~/components/tools/css/AspectRatioCalculator.vue') as Promise<{
            default: DefineComponent
        }>,
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
        component: () => import('~/components/tools/imaging/FrameGenerator.vue') as Promise<{
            default: DefineComponent
        }>,
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
        component: () => import('~/components/tools/textes/LoremIpsumGenerator.vue') as Promise<{
            default: DefineComponent
        }>,
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
        component: () => import('~/components/tools/textes/TextCaseConverter.vue') as Promise<{
            default: DefineComponent
        }>,
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

    'color-shades-generator': {
        title: 'Color Shades Generator',
        description: 'Create lighter and darker shades of a HEX color instantly.',
        category: 'colors',
        component: () => import('~/components/tools/colors/ColorShadesGenerator.vue') as Promise<{
            default: DefineComponent
        }>,
        seo: {
            title: 'Color Shades Generator – CodeHelper',
            description: 'Generate smooth tints and shades of a HEX color for web design and UI development.',
            ogImage: 'https://codehelper.me/images/codehelper_OGIMAGE.webp',
            keywords: 'color shades, color palette, hex shades, lighter color, darker color, design tools',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Color Shades Generator",
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

    'box-shadow-tester': {
        title: 'Box Shadow Tester',
        description: 'Visualize and fine-tune CSS box shadows easily.',
        category: 'css',
        component: () => import('~/components/tools/css/BoxShadowTester.vue') as Promise<{
            default: DefineComponent
        }>,
        seo: {
            title: 'Box Shadow Tester – CodeHelper',
            description: 'Generate and preview CSS box-shadow values in real time with offset, blur, color, and spread settings.',
            ogImage: 'https://codehelper.me/images/codehelper_OGIMAGE.webp',
            keywords: 'css, box shadow, shadow generator, visual css tool, web design, ui design, css box-shadow editor',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Box Shadow Tester",
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


    'color-converter': {
        title: 'Color Converter',
        description: 'Convert colors between HEX, RGB, and HSL formats instantly.',
        category: 'colors',
        component: () => import('~/components/tools/colors/ColorConverter.vue') as Promise<{
            default: DefineComponent
        }>,
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
        component: () => import('~/components/tools/colors/ColorPaletteGenerator.vue') as Promise<{
            default: DefineComponent
        }>,
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
    },
    'image-color-picker': {
        title: 'Image Color Picker',
        description: 'Pick any color from an uploaded image and get HEX/RGB instantly.',
        category: 'colors',
        component: () => import('~/components/tools/colors/ImageColorPicker.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: 'Image Color Picker – CodeHelper',
            description: 'Upload an image and pick any color to get the HEX and RGB value instantly. All in your browser.',
            ogImage: 'https://codehelper.me/images/codehelper_OGIMAGE.webp',
            keywords: 'color picker, image color picker, hex from image, get color from image, rgb, design tool',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Image Color Picker",
                "operatingSystem": "All",
                "applicationCategory": "DeveloperApplication",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5",
                    "ratingCount": "5"
                }
            }
        }
    },
    'dev-notepad': {
        title: 'Dev Notepad',
        description: 'A minimalist developer notepad with local storage and export to TXT.',
        category: 'textes',
        component: () => import('~/components/tools/textes/DevNotepad.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: 'Dev Notepad – CodeHelper',
            description: 'A simple browser-based notepad for developers. Save notes in localStorage or export as .txt.',
            ogImage: 'https://codehelper.me/images/codehelper_OGIMAGE.webp',
            keywords: 'developer notepad, code notes, browser notepad, txt export, localStorage notes',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Dev Notepad",
                "operatingSystem": "All",
                "applicationCategory": "DeveloperApplication",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5",
                    "ratingCount": "4"
                }
            }
        }
    },
    'css-formatter': {
        title: 'CSS Minifier & Beautifier',
        description: 'Minify or beautify your CSS code instantly.',
        category: 'formatter',
        component: () => import('~/components/tools/formatter/CssFormatter.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: 'CSS Minifier & Beautifier – CodeHelper',
            description: 'Minify or format your CSS code online. Remove whitespace and comments, or pretty-print for readability.',
            ogImage: 'https://codehelper.me/images/codehelper_OGIMAGE.webp',
            keywords: 'css, minifier, beautifier, css formatter, compress css, format css, online css tool',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "CSS Minifier & Beautifier",
                "operatingSystem": "All",
                "applicationCategory": "DeveloperApplication",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5",
                    "ratingCount": "5"
                }
            }
        }
    },
    'clip-path-maker': {
        title: 'Clip Path Maker',
        description: 'Visually create CSS clip-path polygons on images.',
        category: 'imaging',
        component: () => import('~/components/tools/imaging/ClipPathMaker.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: 'CSS Clip Path Maker – CodeHelper',
            description: 'Create and visualize complex CSS clip-path polygons with draggable points. Perfect for clipping images and shapes.',
            ogImage: 'https://codehelper.me/images/codehelper_OGIMAGE.webp',
            keywords: 'css clip-path, polygon, visual tool, clipping image, clip path generator, css tools',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Clip Path Maker",
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
    'image-compressor': {
        title: 'Image Compressor',
        description: 'Optimize PNG/JPEG images client-side.',
        category: 'imaging',
        component: () =>
            import('~/components/tools/imaging/ImageCompressor.vue') as Promise<{
                default: DefineComponent
            }>,
        seo: {
            title: 'Image Compressor – CodeHelper',
            description:
                'Compress and resize PNG/JPEG images directly in the browser. Adjust quality, dimensions, and download the optimized result.',
            ogImage: 'https://codehelper.me/images/codehelper_OGIMAGE.webp',
            keywords:
                'image compressor, compress image, png compressor, jpeg compressor, webp converter, resize image, optimize image',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Image Compressor",
                "operatingSystem": "All",
                "applicationCategory": "MultimediaApplication",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5",
                    "ratingCount": "6"
                }
            }
        }
    },
    'time-converter': {
        title: 'Time Converter',
        description: 'Convert between time zones, UNIX timestamps, and human-readable dates.',
        category: 'converter',
        component: () =>
            import('~/components/tools/converter/TimeConverter.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: 'Time Converter – CodeHelper',
            description:
                'Convert UNIX timestamps to human-readable dates and back. Format across time zones directly in your browser.',
            ogImage: 'https://codehelper.me/images/codehelper_OGIMAGE.webp',
            keywords:
                'time converter, timezone converter, unix timestamp, epoch time, convert date, convert timezones, utc',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Time Converter",
                "operatingSystem": "All",
                "applicationCategory": "UtilityApplication",
                "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5", "ratingCount": "3" }
            }
        }
    },'unit-converter': {
        title: 'Unit Converter',
        description: 'Convert length, weight, temperature, speed, and CSS units (px ↔ em ↔ rem).',
        category: 'converter',
        component: () =>
            import('~/components/tools/converter/UnitConverter.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: 'Unit Converter – CodeHelper',
            description:
                'Convert between length, weight, temperature, speed, and CSS units like px, em, rem directly in your browser.',
            ogImage: 'https://codehelper.me/images/codehelper_OGIMAGE.webp',
            keywords:
                'unit converter, length converter, weight converter, temperature converter, speed converter, px to rem, px to em',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Unit Converter",
                "operatingSystem": "All",
                "applicationCategory": "UtilityApplication",
                "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5", "ratingCount": "3" }
            }
        }
    },
    'regex-tester': {
        title: 'Regex Tester',
        description: 'Write and test regex patterns with sample input, flags, matches, groups, and replace.',
        category: 'dev',
        component: () =>
            import('~/components/tools/dev/RegexTester.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: 'Regex Tester – CodeHelper',
            description:
                'Test regular expressions in the browser. Try flags, inspect matches and groups (named groups), highlight results, and run replacements.',
            ogImage: 'https://codehelper.me/images/codehelper_OGIMAGE.webp',
            keywords:
                'regex tester, regular expression, match groups, named groups, regex replace, online regex',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Regex Tester",
                "operatingSystem": "All",
                "applicationCategory": "DeveloperApplication",
                "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5", "ratingCount": "5" }
            }
        }
    },
    'border-radius-generator': {
        title: 'Border Radius Generator',
        description: 'Visualize and create fancy border-radius shapes.',
        category: 'css',
        component: () =>
            import('~/components/tools/css/BorderRadiusGenerator.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: 'Border Radius Generator – CodeHelper',
            description:
                'Design rounded and blob-like shapes with CSS border-radius, including elliptical radii and per-corner control.',
            ogImage: 'https://codehelper.me/images/codehelper_OGIMAGE.webp',
            keywords:
                'border radius generator, css border-radius, rounded corners, blob shapes, elliptical radius',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Border Radius Generator",
                "operatingSystem": "All",
                "applicationCategory": "DeveloperApplication",
                "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5", "ratingCount": "5" }
            }
        }
    },

}


