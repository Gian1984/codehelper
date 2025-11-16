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

const OG = 'https://codehelper.me/images/codehelper_OGIMAGE.webp'
const BRAND = 'CodeHelper'

export const tools: Record<string, Tool> = {
    'json-formatter': {
        title: 'JSON Formatter',
        description: 'Professional JSON formatter with tree view, diff compare, schema validation, and syntax highlighting.',
        category: 'formatter',
        component: () =>
            import('~/components/tools/formatter/JsonFormatter.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `JSON Formatter, Validator & Diff Tool (Free) – ${BRAND}`,
            description:
                'Advanced JSON formatter with syntax highlighting, tree view, diff comparison, and JSON Schema validation. Format, validate, compare, and minify JSON—all in your browser with complete privacy.',
            ogImage: OG,
            keywords:
                'json formatter, json validator, json schema validator, json diff, json compare, json tree view, pretty print json, json beautifier, json minify, format json online, jsonc support, json linter',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'JSON Formatter & Validator Pro',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: [
                    'Format & Beautify JSON',
                    'Syntax Highlighting',
                    'Tree View (Collapsible)',
                    'JSON Diff & Compare',
                    'JSON Schema Validation',
                    'Minify JSON',
                    'JSONC Support (Comments)',
                    'Deep Sort Keys',
                    'Enhanced Statistics',
                    'Copy & Download'
                ],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '142' }
            }
        }
    },

    'xml-formatter': {
        title: 'XML Formatter',
        description: 'Pretty-print and validate XML structures.',
        category: 'formatter',
        component: () => import('~/components/tools/formatter/XmlFormatter.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `XML Formatter & Validator (Pretty Print) – ${BRAND}`,
            description:
                'Beautify and validate XML online. Pretty print, highlight parsing errors, and export clean markup—client-side and private.',
            ogImage: OG,
            keywords:
                'xml formatter, xml validator online, pretty print xml, xml beautifier, format xml, xml lint, tidy xml',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'XML Formatter',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: ['Pretty Print XML', 'Validate XML', 'Error Highlighting', 'Copy & Download'],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '20' }
            }
        }
    },

    'json-yaml-converter': {
        title: 'JSON ↔ YAML Converter',
        description: 'Convert JSON to YAML and YAML to JSON seamlessly.',
        category: 'converter',
        component: () =>
            import('~/components/tools/converter/JsonYamlConverter.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `JSON to YAML & YAML to JSON (Converter) – ${BRAND}`,
            description:
                'Fast, accurate JSON ↔ YAML conversion in your browser. Preserve structure, validate input, and copy or download the result.',
            ogImage: OG,
            keywords:
                'json to yaml, yaml to json, convert yaml json, yaml converter, json converter, online converter, dev tools',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'JSON ↔ YAML Converter',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: ['JSON → YAML', 'YAML → JSON', 'Validation', 'Copy & Download'],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '16' }
            }
        }
    },

    'number-base-converter': {
        title: 'Number Base Converter',
        description: 'Convert numbers between Binary, Octal, Decimal, and Hex.',
        category: 'converter',
        component: () =>
            import('~/components/tools/converter/NumberBaseConverter.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Number Base Converter (Binary, Octal, Decimal, Hex) – ${BRAND}`,
            description:
                'Convert between decimal, binary, octal, and hexadecimal instantly. Supports copy, validation, and large values.',
            ogImage: OG,
            keywords:
                'base converter, decimal to binary, binary to hex, octal converter, hex converter, numeral system, number converter',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Number Base Converter',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: ['Dec ⇄ Bin', 'Dec ⇄ Oct', 'Dec ⇄ Hex', 'Copy & Paste'],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '26' }
            }
        }
    },

    'readme-generator': {
        title: 'README Generator',
        description: 'Generate GitHub README.md files with customizable sections.',
        category: 'generator',
        component: () =>
            import('~/components/tools/generator/ReadmeGenerator.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `README.md Generator for GitHub (Markdown) – ${BRAND}`,
            description:
                'Generate polished README.md files with Installation, Usage, Contributing, and License sections. Copy or download in seconds.',
            ogImage: OG,
            keywords:
                'readme generator, github readme template, markdown generator, project documentation, readme builder',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'README Generator',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: ['Markdown Output', 'Custom Sections', 'Copy & Download'],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '7' }
            }
        }
    },

    'byte-size-converter': {
        title: 'Byte Size Converter',
        description: 'Convert between Bytes, KB, MB, GB, and TB easily.',
        category: 'converter',
        component: () =>
            import('~/components/tools/converter/ByteSizeConverter.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Bytes to KB, MB, GB, TB (Converter) – ${BRAND}`,
            description:
                'Convert data sizes accurately between bytes, KB, MB, GB, and TB. Supports binary (1024) units and rounding.',
            ogImage: OG,
            keywords:
                'byte converter, bytes to kb, mb to gb, data size calculator, storage converter, kib mib gib, file size',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Byte Size Converter',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: ['Bytes ⇄ KB/MB/GB/TB', 'Binary Units', 'Rounding'],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '18' }
            }
        }
    },

    'clamp-generator': {
        title: 'Clamp Generator',
        description: 'Generate responsive font-size clamp() CSS.',
        category: 'css',
        component: () => import('~/components/tools/css/ClampGenerator.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `CSS clamp() Generator (Fluid Typography) – ${BRAND}`,
            description:
                'Generate responsive font-size with clamp(). Set min/max size and viewport range; copy CSS instantly.',
            ogImage: OG,
            keywords:
                'css clamp generator, fluid typography, responsive font size, clamp css, fluid type scale, css utilities',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'CSS Clamp Generator',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: ['Generate clamp()', 'Preview', 'Copy CSS'],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '22' }
            }
        }
    },

    'var-dump-formatter': {
        title: 'Var Dump Formatter',
        description: 'Beautify and format PHP var_dump() output.',
        category: 'formatter',
        component: () =>
            import('~/components/tools/formatter/VarDumpFormatter.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `PHP var_dump() Formatter (Pretty Print) – ${BRAND}`,
            description:
                'Clean up messy var_dump() output. Pretty print arrays/objects for quick debugging—no uploads or servers.',
            ogImage: OG,
            keywords:
                'php var_dump formatter, pretty print php arrays, dump viewer, format var_dump, php debug tool',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Var Dump Formatter',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: ['Format var_dump()', 'Readable Structure', 'Copy'],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '12' }
            }
        }
    },

    'html-minifier': {
        title: 'HTML Optimizer',
        description: 'Professional HTML optimizer with minify and beautify modes. Safe inline CSS/JS compression, formatting, and optimization.',
        category: 'formatter',
        component: () =>
            import('~/components/tools/formatter/HTMLMinifier.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `HTML Optimizer - Minify & Beautify (Free) – ${BRAND}`,
            description:
                'Professional HTML optimizer powered by html-minifier-terser. Minify or beautify HTML with inline scripts/styles. Advanced whitespace control, comment management, and attribute optimization. Format, compress, and optimize HTML—all in your browser.',
            ogImage: OG,
            keywords:
                'html optimizer, html minifier, html beautifier, compress html, format html, reduce html size, minify html online, beautify html, html formatter, remove comments, collapse whitespace, html-minifier-terser, minify inline css, minify inline javascript, html optimization, html prettifier',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'HTML Optimizer Pro',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: [
                    'Minify HTML with Professional Parser',
                    'Beautify & Format HTML with Indentation',
                    'Safe Inline CSS Minification',
                    'Safe Inline JS Minification',
                    'Remove or Preserve Comments',
                    'Collapse or Preserve Whitespace',
                    'Preserve Pre/Code/Textarea Content',
                    'Normalize Boolean Attributes',
                    'Remove Empty Attributes',
                    'Remove Optional End Tags',
                    'Show Size Statistics & Savings',
                    'Import & Export HTML Files',
                    'Auto-process on Paste',
                    'Loading States & Error Handling'
                ],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '11' }
            }
        }
    },

    'px-to-vh-converter': {
        title: 'PX to VH Converter',
        description: 'Convert pixel values to responsive vh units based on viewport height.',
        category: 'css',
        component: () =>
            import('~/components/tools/css/PxToVhConverter.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `PX to VH Converter (Viewport Height) – ${BRAND}`,
            description:
                'Convert px to vh for fluid layouts. Enter element height and viewport height to get accurate CSS values.',
            ogImage: OG,
            keywords:
                'px to vh, convert px vh, viewport height units, responsive css units, css vh calculator',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'PX to VH Converter',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: ['PX → VH', 'Copy CSS', 'Client-side'],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '17' }
            }
        }
    },

    'px-to-vw-converter': {
        title: 'PX to VW Converter',
        description: 'Convert pixel values to responsive vw units based on viewport width.',
        category: 'css',
        component: () =>
            import('~/components/tools/css/PxToVwConverter.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `PX to VW Converter (Viewport Width) – ${BRAND}`,
            description:
                'Convert px to vw for responsive widths. Precise calculations with copy-ready CSS output.',
            ogImage: OG,
            keywords:
                'px to vw, convert px vw, viewport width units, responsive css, css vw calculator',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'PX to VW Converter',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: ['PX → VW', 'Copy CSS', 'Client-side'],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '19' }
            }
        }
    },

    'svg-icon-generator': {
        title: 'SVG Icon Generator',
        description: 'Create and customize SVG icons for the web directly in your browser.',
        category: 'svg',
        component: () => import('~/components/tools/svg/IconGenerator.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `SVG Icon Generator & Editor – ${BRAND}`,
            description:
                'Design and customize SVG icons in-browser. Edit paths, export clean SVGs, and optimize for the web.',
            ogImage: OG,
            keywords:
                'svg icon generator, svg editor, create svg icons, web icon maker, vector icon tool, svg path editor',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'SVG Icon Generator',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: ['Edit/Preview', 'Export SVG', 'Optimize'],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '9' }
            }
        }
    },

    'wave-generator': {
        title: 'SVG Wave Generator',
        description: 'Create customizable SVG wave shapes easily.',
        category: 'svg',
        component: () => import('~/components/tools/svg/WaveGenerator.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `SVG Wave Generator (Hero Backgrounds) – ${BRAND}`,
            description:
                'Generate animated-ready SVG wave shapes for headers and backgrounds. Tweak amplitude, smoothness, and export.',
            ogImage: OG,
            keywords:
                'svg wave generator, wave svg, background wave, hero wave, svg shape generator, web design assets',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'SVG Wave Generator',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: ['Custom Waves', 'Preview', 'Export SVG'],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '8' }
            }
        }
    },

    'aspect-ratio-calculator': {
        title: 'Aspect Ratio Calculator',
        description: 'Calculate aspect ratios and pixel dimensions for media and screens.',
        category: 'css',
        component: () =>
            import('~/components/tools/css/AspectRatioCalculator.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Aspect Ratio Calculator (Pixels ⇄ Ratio) – ${BRAND}`,
            description:
                'Calculate aspect ratios from width/height or get missing side from ratio. Includes fit/cover sizing and copy-ready CSS.',
            ogImage: OG,
            keywords:
                'aspect ratio calculator, width height ratio, fit vs cover, responsive images, aspect-ratio css, video sizes',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Aspect Ratio Calculator',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: ['Pixels ⇄ Ratio', 'Solve Missing Side', 'Fit/Cover Preview', 'Copy CSS'],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '27' }
            }
        }
    },

    'aspect-frame-generator': {
        title: 'Aspect Frame Generator',
        description: 'Generate matte frames with custom aspect ratios and download them as images.',
        category: 'imaging',
        component: () => import('~/components/tools/imaging/FrameGenerator.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Aspect Frame (Matte) Generator – ${BRAND}`,
            description:
                'Create matte-style frames and overlays for images/video. Choose aspect ratio, resolution, and download PNG.',
            ogImage: OG,
            keywords:
                'matte frame generator, aspect frame, image overlay, letterbox, pillarbox, frame mask, video aspect tool',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Aspect Frame Generator',
                applicationCategory: 'GraphicsApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: ['Custom Aspect', 'Resolution Control', 'PNG Export'],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '15' }
            }
        }
    },

    'lorem-ipsum-generator': {
        title: 'Lorem Ipsum Generator',
        description: 'Generate customizable placeholder text (words, paragraphs, characters).',
        category: 'textes',
        component: () =>
            import('~/components/tools/textes/LoremIpsumGenerator.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Lorem Ipsum Generator (Words/Paragraphs) – ${BRAND}`,
            description:
                'Create dummy text by words, characters, or paragraphs. Copy or download—perfect for mocks and wireframes.',
            ogImage: OG,
            keywords:
                'lorem ipsum generator, dummy text, placeholder text, generate lorem, paragraphs words characters',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Lorem Ipsum Generator',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: ['By Words', 'By Characters', 'By Paragraphs', 'Copy & Download'],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '24' }
            }
        }
    },

    'text-case-converter': {
        title: 'Text Case Converter',
        description: 'Convert text to UPPERCASE, Capitalize Case, or Sentence case.',
        category: 'textes',
        component: () =>
            import('~/components/tools/textes/TextCaseConverter.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Text Case Converter (Uppercase, Sentence, Capitalize) – ${BRAND}`,
            description:
                'Convert text to UPPERCASE, lowercase, Capitalize, or Sentence case. Paste, transform, copy—fast and private.',
            ogImage: OG,
            keywords:
                'text case converter, uppercase lowercase, sentence case, capitalize text, change case online, format text',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Text Case Converter',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: ['Upper/Lower', 'Capitalize', 'Sentence Case', 'Copy'],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '21' }
            }
        }
    },

    'color-shades-generator': {
        title: 'Color Shades Generator',
        description: 'Create lighter and darker shades of a HEX color instantly.',
        category: 'colors',
        component: () =>
            import('~/components/tools/colors/ColorShadesGenerator.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Color Shades & Tints Generator – ${BRAND}`,
            description:
                'Generate smooth tints and shades from any HEX color. Copy values for design systems and Tailwind arbitrary colors.',
            ogImage: OG,
            keywords:
                'color shades generator, tints and shades, hex shades, color scale, palette generator, ui colors',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Color Shades Generator',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: ['Generate Tints/Shades', 'Copy HEX', 'Visual Scale'],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '11' }
            }
        }
    },

    'box-shadow-tester': {
        title: 'Box Shadow Tester',
        description: 'Visualize and fine-tune CSS box shadows easily.',
        category: 'css',
        component: () =>
            import('~/components/tools/css/BoxShadowTester.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `CSS Box-Shadow Generator & Preview – ${BRAND}`,
            description:
                'Design box-shadow with offsets, blur, spread, and color. Live preview and copy-ready CSS for UI components.',
            ogImage: OG,
            keywords:
                'css box-shadow generator, shadow editor, box shadow preview, material shadow, neumorphism shadow, web ui',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Box Shadow Tester',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: ['Interactive Controls', 'Preview', 'Copy CSS'],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '9' }
            }
        }
    },

    'color-converter': {
        title: 'Color Converter',
        description: 'Convert colors between HEX, RGB, and HSL formats instantly.',
        category: 'colors',
        component: () => import('~/components/tools/colors/ColorConverter.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `HEX ⇄ RGB ⇄ HSL (Color Converter) – ${BRAND}`,
            description:
                'Convert between HEX, RGB, and HSL (with alpha) instantly. Copy CSS color strings for design and development.',
            ogImage: OG,
            keywords:
                'hex to rgb, rgb to hex, rgb to hsl, hsl to rgb, color converter online, css color formats, color values',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Color Converter',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: ['HEX ⇄ RGB ⇄ HSL', 'Alpha Support', 'Copy CSS'],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '18' }
            }
        }
    },

    'color-palette-generator': {
        title: 'Color Palette Generator',
        description: 'Generate harmonious color palettes from any base HEX color.',
        category: 'colors',
        component: () =>
            import('~/components/tools/colors/ColorPaletteGenerator.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Color Palette Generator (Harmonies) – ${BRAND}`,
            description:
                'Build balanced palettes from a base HEX color—tints, shades, and random sets. Great for brand and UI kits.',
            ogImage: OG,
            keywords:
                'color palette generator, color harmonies, complementary colors, tints shades, palette maker, brand colors',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Color Palette Generator',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: ['Generate Palettes', 'Copy HEX', 'Randomize'],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '14' }
            }
        }
    },

    'image-color-picker': {
        title: 'Image Color Picker',
        description: 'Pick any color from an uploaded image and get HEX/RGB instantly.',
        category: 'colors',
        component: () =>
            import('~/components/tools/colors/ImageColorPicker.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Image Color Picker (HEX/RGB from Picture) – ${BRAND}`,
            description:
                'Upload an image and click to sample any pixel’s color. Get HEX/RGB/HSL with a zoomed magnifier—fully client-side.',
            ogImage: OG,
            keywords:
                'image color picker, pick color from image, hex from image, eyedropper online, rgb sampler, color from photo',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Image Color Picker',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: ['Pixel Sampling', 'Magnifier', 'HEX/RGB/HSL', 'Copy'],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '5' }
            }
        }
    },

    'dev-notepad': {
        title: 'Dev Notepad',
        description: 'A minimalist developer notepad with local storage and export to TXT.',
        category: 'textes',
        component: () => import('~/components/tools/textes/DevNotepad.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Developer Notepad (Local Only) – ${BRAND}`,
            description:
                'Lightweight in-browser notepad for developers. Autosave to localStorage and export notes as .txt—no login.',
            ogImage: OG,
            keywords:
                'developer notepad, code notes, online notepad, local storage notes, txt export, quick notes tool',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Dev Notepad',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: ['Local Autosave', 'TXT Export', 'Privacy-friendly'],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '4' }
            }
        }
    },

    'css-formatter': {
        title: 'CSS Minifier & Beautifier',
        description: 'Minify or beautify your CSS code instantly.',
        category: 'formatter',
        component: () => import('~/components/tools/formatter/CssFormatter.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `CSS Minifier & Beautifier – ${BRAND}`,
            description:
                'Minify CSS to reduce file size or beautify for readability. Remove comments/whitespace and copy the result.',
            ogImage: OG,
            keywords:
                'css minifier, format css, css beautifier, compress css online, tidy css, css formatter tool',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'CSS Minifier & Beautifier',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: ['Minify CSS', 'Beautify CSS', 'Copy & Download'],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '5' }
            }
        }
    },

    'clip-path-maker': {
        title: 'Clip Path Maker',
        description: 'Visually create CSS clip-path polygons on images.',
        category: 'imaging',
        component: () => import('~/components/tools/imaging/ClipPathMaker.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `CSS clip-path Generator (Polygon Editor) – ${BRAND}`,
            description:
                'Create complex clip-path polygons with draggable points. Preview on images and copy the CSS polygon() value.',
            ogImage: OG,
            keywords:
                'css clip-path generator, polygon editor, clip path maker, image clipping, css shapes, polygon points',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Clip Path Maker',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: ['Draggable Points', 'Live Preview', 'Copy CSS'],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '12' }
            }
        }
    },

    'image-compressor': {
        title: 'Image Compressor',
        description: 'Optimize PNG/JPEG images client-side.',
        category: 'imaging',
        component: () =>
            import('~/components/tools/imaging/ImageCompressor.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Image Compressor (PNG/JPEG/WebP) – ${BRAND}`,
            description:
                'Compress and resize images in-browser. Adjust quality, convert to WebP, and download optimized files—no upload to server.',
            ogImage: OG,
            keywords:
                'image compressor, compress png, compress jpeg, convert to webp, resize image online, optimize images',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Image Compressor',
                applicationCategory: 'MultimediaApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: ['Compress', 'Resize', 'WebP Export', 'Client-side'],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '6' }
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
            title: `Time & UNIX Timestamp Converter (Time Zones) – ${BRAND}`,
            description:
                'Convert UNIX timestamps to readable dates and back. View in UTC, local, or any time zone and copy ISO 8601.',
            ogImage: OG,
            keywords:
                'unix timestamp converter, epoch time, convert timestamp to date, timezone converter, iso 8601, utc time',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Time Converter',
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: ['UNIX ⇄ Date', 'Time Zones', 'ISO 8601'],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '3' }
            }
        }
    },

    'mini-image-editor': {
        title: 'Mini Image Editor',
        description:
            'Crop, resize, rotate, flip, and apply filters to images directly in your browser. No upload, everything stays local.',
        category: 'imaging',
        component: () =>
            import('~/components/tools/imaging/MiniImageEditor.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Mini Image Editor (Crop, Resize, Filters) – ${BRAND}`,
            description:
                'In-browser image editor for quick edits: crop, resize, rotate, flip, and apply filters. Local only, privacy-friendly.',
            ogImage: OG,
            keywords:
                'image editor, crop image, resize image, rotate image, flip image, add filters, local image tool, photo editor online',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Mini Image Editor',
                applicationCategory: 'MultimediaApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: [
                    'Crop Selector',
                    'Resize & Rotate',
                    'Flip Horizontal/Vertical',
                    'Image Filters',
                    'Local Processing'
                ],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '5' }
            }
        }
    },


    'unit-converter': {
        title: 'Unit Converter',
        description: 'Convert length, weight, temperature, speed, and CSS units (px ↔ em ↔ rem).',
        category: 'converter',
        component: () =>
            import('~/components/tools/converter/UnitConverter.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Unit Converter (Length, Weight, Temperature, Speed, CSS) – ${BRAND}`,
            description:
                'Convert SI and imperial units—including meters, miles, kg, lb, °C/°F/K, mph, km/h—and CSS px/rem/em values.',
            ogImage: OG,
            keywords:
                'unit converter, length converter, weight converter, temperature converter, speed converter, px to rem, px to em, metric to imperial',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Unit Converter',
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: ['Length', 'Weight', 'Temperature', 'Speed', 'CSS px/rem/em'],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '3' }
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
            title: `Regex Tester (JS RegExp with Flags, Groups) – ${BRAND}`,
            description:
                'Test JavaScript regular expressions. Toggle flags, highlight matches, inspect named groups, and preview replacements.',
            ogImage: OG,
            keywords:
                'regex tester, javascript regexp, named groups, regex replace, test regex online, regex flags g i m s u y',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Regex Tester',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: ['Flags', 'Matches/Groups', 'Replace Preview', 'Copy Results'],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '5' }
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
            title: `Border-Radius Generator (Elliptical & Per-Corner) – ${BRAND}`,
            description:
                'Design rounded corners and blob shapes with per-corner and elliptical controls. Live preview and copy CSS.',
            ogImage: OG,
            keywords:
                'border radius generator, elliptical border radius, rounded corners css, blob border-radius, css shapes',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Border Radius Generator',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: ['Per-corner', 'Elliptical', 'Preview', 'Copy CSS'],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '5' }
            }
        }
    }
}


