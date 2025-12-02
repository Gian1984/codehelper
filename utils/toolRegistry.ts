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
                'Advanced JSON formatter with syntax highlighting, tree view, and diff comparison. Format, validate, and compare JSON files instantly in your browser.',
            ogImage: OG,
            keywords:
                'JSON formatter, JSON validator, JSON schema, JSON diff, JSON compare, tree view, pretty print, beautifier, minify, JSONC support, linter',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'JSON Formatter & Validator',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: [
                    'Format and beautify JSON',
                    'Syntax highlighting',
                    'Collapsible tree view',
                    'Compare two JSON documents',
                    'JSON Schema validation',
                    'Minify and compress',
                    'JSONC with comments',
                    'Sort keys recursively',
                    'Statistics and metrics'
                ],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '142' }
            }
        }
    },

    'xml-formatter': {
        title: 'XML Formatter',
        description: 'Professional XML formatter with syntax highlighting, statistics, XML to JSON conversion, and XPath query tester.',
        category: 'formatter',
        component: () => import('~/components/tools/formatter/XmlFormatter.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `XML Formatter with JSON Converter & XPath Tester – ${BRAND}`,
            description:
                'Advanced XML formatter with syntax highlighting and XPath testing. Convert XML to JSON, validate structure, and analyze your documents.',
            ogImage: OG,
            keywords:
                'XML formatter, XML to JSON, XPath tester, XML validator, pretty print, beautifier, lint, tidy, statistics, minify, parser',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'XML Formatter & Converter',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: [
                    'Format and beautify XML',
                    'Syntax highlighting',
                    'Convert XML to JSON',
                    'Test XPath queries',
                    'Document statistics',
                    'Minify XML files',
                    'Validate structure',
                    'Custom indentation',
                    'Auto-format on paste'
                ],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '20' }
            }
        }
    },

    'json-yaml-converter': {
        title: 'JSON ↔ YAML Converter',
        description: 'Convert JSON to YAML and YAML to JSON with auto-detection, syntax highlighting, and format indicators.',
        category: 'converter',
        component: () =>
            import('~/components/tools/converter/JsonYamlConverter.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `JSON to YAML & YAML to JSON Converter with Auto-Detection – ${BRAND}`,
            description:
                'Fast bidirectional converter between JSON and YAML formats. Auto-detects input format, highlights syntax, and prettifies output.',
            ogImage: OG,
            keywords:
                'JSON to YAML, YAML to JSON, convert YAML, JSON converter, auto detect, syntax highlighting, prettify, sort keys',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'JSON ↔ YAML Converter',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: [
                    'Auto-detect input format',
                    'Convert JSON to YAML',
                    'Convert YAML to JSON',
                    'Syntax highlighting',
                    'Prettify and format',
                    'Sort keys alphabetically',
                    'Error validation'
                ],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '16' }
            }
        }
    },

    'number-base-converter': {
        title: 'Number Base Converter',
        description: 'Convert numbers between Binary, Octal, Decimal, and Hex with visual binary representation.',
        category: 'converter',
        component: () =>
            import('~/components/tools/converter/NumberBaseConverter.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Number Base Converter (Binary, Octal, Decimal, Hex) – ${BRAND}`,
            description:
                'Convert between decimal, binary, octal, and hexadecimal. Visual binary display with byte grouping, BigInt support, and negative number handling.',
            ogImage: OG,
            keywords:
                'base converter, decimal to binary, binary to hex, octal, hexadecimal, numeral system, BigInt, byte grouping, negative numbers, visual binary',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Number Base Converter',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: [
                    'Binary, Octal, Decimal, Hex conversion',
                    'Visual binary with byte grouping',
                    'BigInt support for large numbers',
                    'Negative number handling',
                    'Bit width padding options',
                    'Quick example values'
                ],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '26' }
            }
        }
    },

    'readme-generator': {
        title: 'README Generator',
        description: 'Professional README.md generator with templates, badge builder, and live preview. Create GitHub documentation with customizable sections, Shields.io badges, and markdown rendering.',
        category: 'generator',
        component: () =>
            import('~/components/tools/generator/ReadmeGenerator.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `README.md Generator with Templates & Badge Builder – ${BRAND}`,
            description:
                'Generate professional GitHub README.md files with 5 project templates (Frontend, Backend, CLI, Library, Full-Stack), custom badge builder, and live markdown preview. Create complete documentation in seconds—all in your browser.',
            ogImage: OG,
            keywords:
                'readme generator, github readme template, markdown generator, project documentation, readme builder, shields.io badges, npm badge generator, github stars badge, readme preview, readme template frontend, readme template backend, open source documentation',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'README Generator Pro',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: [
                    '5 Quick Templates (Frontend, Backend, CLI, Library, Full-Stack)',
                    'Shields.io Badge Builder (Stars, Forks, Issues, Version, Build)',
                    'Live Markdown Preview (Rendered & Raw)',
                    '13 Customizable Sections',
                    'Auto-fill from Project Type',
                    'GitHub-styled Preview',
                    'Features & Prerequisites Lists',
                    'Environment Variables Table',
                    'NPM Scripts Table',
                    'Screenshots & Roadmap',
                    'Changelog & FAQ Support',
                    'Copy & Download README.md',
                    'Reset to Defaults'
                ],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '12' }
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
            title: `Bytes to KB, MB, GB, TB Converter – ${BRAND}`,
            description:
                'Convert data sizes between bytes, KB, MB, GB, and TB. Supports both binary and decimal units with accurate calculations.',
            ogImage: OG,
            keywords:
                'byte converter, bytes to KB, MB to GB, data size, storage converter, KiB MiB GiB, file size calculator',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Byte Size Converter',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: ['Convert between all byte units', 'Binary and decimal units', 'Precision rounding'],
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
            title: `CSS clamp() Generator for Fluid Typography – ${BRAND}`,
            description:
                'Generate responsive font-size with CSS clamp() function. Set minimum and maximum sizes with viewport ranges for fluid typography.',
            ogImage: OG,
            keywords:
                'CSS clamp, fluid typography, responsive font size, clamp generator, fluid type scale, viewport units',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'CSS Clamp Generator',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: ['Generate clamp() values', 'Live preview', 'Copy CSS code'],
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
            title: `PHP var_dump() Formatter and Pretty Printer – ${BRAND}`,
            description:
                'Clean up messy var_dump() output from PHP. Format arrays and objects into readable structures for easier debugging.',
            ogImage: OG,
            keywords:
                'PHP var_dump, formatter, pretty print, PHP arrays, dump viewer, debug tool, PHP debugging',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Var Dump Formatter',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: ['Format var_dump() output', 'Readable structure', 'Copy formatted text'],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '12' }
            }
        }
    },

    'html-minifier': {
        title: 'HTML Optimizer',
        description: 'Professional HTML optimizer with minify and beautify modes. Compress, format, and optimize HTML with advanced whitespace control.',
        category: 'formatter',
        component: () =>
            import('~/components/tools/formatter/HTMLMinifier.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `HTML Optimizer - Minify & Beautify (Free) – ${BRAND}`,
            description:
                'Professional HTML optimizer powered by html-minifier-terser. Minify or beautify HTML code with advanced options. Remove comments, collapse whitespace, normalize attributes, and format HTML—all in your browser with complete privacy.',
            ogImage: OG,
            keywords:
                'html optimizer, html minifier, html beautifier, compress html, format html, reduce html size, minify html online, beautify html, html formatter, remove comments, collapse whitespace, html-minifier-terser, html optimization, html prettifier, optimize html',
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
                    'Remove or Preserve Comments',
                    'Collapse or Preserve Whitespace',
                    'Remove Whitespace Between Tags',
                    'Preserve Pre/Code/Textarea Content',
                    'Preserve Script/Style Content',
                    'Normalize Boolean Attributes',
                    'Remove Empty Attributes',
                    'Remove Optional End Tags',
                    'Remove Default Type Attributes',
                    'Show Size Statistics & Savings',
                    'Import & Export HTML Files',
                    'Auto-process on Paste',
                    'Loading States & Error Handling'
                ],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '11' }
            }
        }
    },

    'viewport-unit-converter': {
        title: 'Viewport Unit Converter',
        description: 'Convert between px and viewport units (vw, vh, vmin, vmax, dvh, svh, lvh, container query units). Includes batch conversion and fluid clamp() generator.',
        category: 'css',
        component: () =>
            import('~/components/tools/css/ViewportUnitConverter.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Viewport Unit Converter – PX to VW, VH, VMIN, VMAX, DVH, CQ Units – ${BRAND}`,
            description:
                'Convert px to viewport units (vw, vh, vmin, vmax) and modern units (dvh, svh, lvh, container queries). Includes batch conversion, fluid clamp() generator, and 18 device presets. All conversions happen client-side.',
            ogImage: OG,
            keywords:
                'px to vw, px to vh, viewport units, dvh converter, svh lvh, container query units, cqw cqh, responsive css, fluid clamp, viewport calculator, vmin vmax converter',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Viewport Unit Converter',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: [
                    'PX ↔ Viewport Units (vw, vh, vmin, vmax)',
                    'Modern Units (dvh, svh, lvh, dvw, svw, lvw)',
                    'Container Query Units (cqw, cqh, cqi, cqb, cqmin, cqmax)',
                    'Batch Conversion',
                    'Fluid clamp() Generator',
                    '18 Device Presets (iPhone, iPad, MacBook, Desktop)',
                    'Bidirectional Conversion',
                    'Copy CSS Output',
                    'Client-side Processing'
                ],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '36' }
            }
        }
    },

    'svg-icon-generator': {
        title: 'SVG Icon Generator',
        description: 'Create and customize SVG icons with 33+ pre-made shapes, color presets, and export to multiple formats. Import SVG, edit paths, export icon packs.',
        category: 'svg',
        component: () => import('~/components/tools/svg/IconGenerator.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `SVG Icon Generator & Editor – Export Icon Packs – ${BRAND}`,
            description:
                'Professional SVG icon generator with 33+ shapes (stars, hearts, arrows, UI icons). Create custom icons, import SVG for editing, export multi-size icon packs (16-512px). Free online tool with grid snapping, color presets, and undo/redo.',
            ogImage: OG,
            keywords:
                'svg icon generator, svg editor, create svg icons, web icon maker, vector icon tool, svg path editor, icon pack export, export multiple sizes, star icon, heart icon, arrow icon, ui icon generator, import svg editor, svg icon builder, custom icon creator, free icon tool, favicon generator, app icon maker',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'SVG Icon Generator',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: [
                    '33+ Pre-made Shapes (Stars, Hearts, Triangles, Arrows)',
                    'Import SVG for Editing',
                    'Export Icon Pack (Multiple Sizes: 16-512px)',
                    'SVG and PNG Export',
                    'Grid Snapping (1-8px)',
                    'Color Presets and Recent Colors',
                    'Undo/Redo History',
                    'Drag and Transform Shapes',
                    'Alignment Tools (Center H/V, Front/Back)',
                    'Fill and Stroke Customization',
                    'Keyboard Shortcuts',
                    'Live Preview',
                    'localStorage Persistence',
                    'Clean SVG Output',
                    'Professional UI with Dark Theme'
                ],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '12' }
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
        description: 'Professional Lorem Ipsum generator with multiple variants and formats. Generate placeholder text by words, paragraphs, characters with harmonized UI.',
        category: 'textes',
        component: () =>
            import('~/components/tools/textes/LoremIpsumGenerator.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Lorem Ipsum Generator - Words, Paragraphs, Variants – ${BRAND}`,
            description:
                'Professional Lorem Ipsum generator with multiple variants and generation modes. Create dummy text by words, characters, or paragraphs. Includes statistics, random seed control, and harmonized dark UI. Perfect for mockups and wireframes—all client-side.',
            ogImage: OG,
            keywords:
                'lorem ipsum generator, dummy text, placeholder text, generate lorem, paragraphs words characters, lorem variants, fake text generator, sample text, filler text, design placeholder, mockup text, wireframe text',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Lorem Ipsum Generator Pro',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: [
                    'Generate by Words',
                    'Generate by Characters',
                    'Generate by Paragraphs',
                    'Multiple Lorem Variants',
                    'Randomize Seed',
                    'Statistics (Chars, Words, Sentences, Paragraphs)',
                    'Copy to Clipboard',
                    'Clear All',
                    'Harmonized Dark UI',
                    'Client-side Processing'
                ],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '38' }
            }
        }
    },

    'text-case-converter': {
        title: 'Text Case Converter',
        description: 'Professional text case converter supporting UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, kebab-case. Swap input/output with harmonized UI.',
        category: 'textes',
        component: () =>
            import('~/components/tools/textes/TextCaseConverter.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Text Case Converter - 15+ Cases (camelCase, snake_case, kebab) – ${BRAND}`,
            description:
                'Professional text case converter with 15+ transformation options: UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, and more. Swap input/output, statistics, harmonized dark UI—all client-side.',
            ogImage: OG,
            keywords:
                'text case converter, uppercase lowercase, sentence case, capitalize text, change case online, format text, camelcase converter, snake case, kebab case, pascal case, title case, constant case, dot case, path case, text transform',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Text Case Converter Pro',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: [
                    'UPPERCASE',
                    'lowercase',
                    'Title Case',
                    'Sentence case',
                    'camelCase',
                    'PascalCase',
                    'snake_case',
                    'kebab-case',
                    'CONSTANT_CASE',
                    'dot.case',
                    'path/case',
                    'Swap Input/Output',
                    'Statistics (Chars, Words, Lines)',
                    'Clear All',
                    'Harmonized Dark UI',
                    'Client-side Processing'
                ],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '45' }
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
        title: 'Box Shadow Designer',
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
                name: 'Box Shadow Designer',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: ['Interactive Controls', 'Preview', 'Copy CSS'],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '9' }
            }
        }
    },

    'color-converter': {
        title: 'Color Converter & Analyzer',
        description: 'Professional color converter with HEX, RGB, HSL, CMYK support. Features WCAG accessibility checker, color blindness simulator, harmony generator, and eyedropper tool.',
        category: 'colors',
        component: () => import('~/components/tools/colors/ColorConverter.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Color Converter - HEX/RGB/HSL/CMYK + WCAG & Accessibility – ${BRAND}`,
            description:
                'Professional color converter with HEX, RGB, HSL, CMYK formats. WCAG AAA/AA checker, color blindness simulator (protanopia, deuteranopia, tritanopia), harmony generator, CSS export, eyedropper tool. Perfect for designers & developers.',
            ogImage: OG,
            keywords:
                'color converter, hex to rgb, rgb to hsl, cmyk converter, wcag contrast checker, color blindness simulator, protanopia deuteranopia tritanopia, color harmony generator, complementary colors, triadic colors, analogous colors, eyedropper tool, css color picker, color accessibility, color naming, css custom properties, tailwind colors, scss variables',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Color Converter & Analyzer Pro',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: [
                    'HEX ⇄ RGB ⇄ HSL ⇄ CMYK Conversion',
                    'WCAG AAA/AA Accessibility Checker',
                    'Contrast Ratio Calculator (White & Black)',
                    'Color Blindness Simulator (Protanopia, Deuteranopia, Tritanopia)',
                    'Color Harmony Generator (Complementary, Triadic, Analogous, Split)',
                    'Native Eyedropper Tool (Screen Color Picker)',
                    'Color Naming (140+ CSS Colors)',
                    'Alpha Channel Support',
                    'Export as CSS Custom Properties',
                    'Export as Tailwind Config',
                    'Export as SCSS Variables',
                    'Visual WCAG Badges',
                    'Copy Buttons for All Formats',
                    'Real-time Conversion',
                    'Professional UI Design'
                ],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '24' }
            }
        }
    },

    'color-palette-generator': {
        title: 'Color Palette Generator',
        description: 'Generate harmonious color palettes with Material Design, accessibility checker, and undo/redo. Create monochrome, analogous, complementary, triadic palettes. Export to CSS, SCSS, JSON, Tailwind.',
        category: 'colors',
        component: () =>
            import('~/components/tools/colors/ColorPaletteGenerator.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Color Palette Generator with Material Design & Accessibility – ${BRAND}`,
            description:
                'Generate professional color palettes from any base color. Includes Material Design palette (50-900 + accents), WCAG accessibility checker, 6 harmony schemes, and export to CSS/SCSS/Tailwind. Full undo/redo support.',
            ogImage: OG,
            keywords:
                'color palette generator, material design colors, color harmonies, complementary colors, triadic palette, split complementary, accessibility checker, wcag contrast, tailwind colors, scss colors, css variables, color scheme generator, brand colors, ui colors, palette maker',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Color Palette Generator Pro',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: [
                    '6 Color Schemes (Mono, Material, Analogous, Complementary, Triadic, Split)',
                    'Material Design Palette (50-900 + A100-A700)',
                    'Monochrome Tailwind-like Scale (10 shades)',
                    'WCAG 2.1 Accessibility Checker',
                    'AA/AAA Contrast Compliance',
                    'Lock/Unlock Individual Colors',
                    'Shuffle with Lock Respect',
                    'Undo/Redo History (20 states)',
                    'Export to CSS Variables',
                    'Export to SCSS',
                    'Export to JSON',
                    'Export to Tailwind Config',
                    'Visual Color Pair Previews',
                    'HEX Color Picker',
                    'localStorage Persistence',
                    'Responsive Grid Layouts'
                ],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '18' }
            }
        }
    },

    'image-color-picker': {
        title: 'Image Color Picker',
        description: 'Pick colors from images with k-means palette extraction. Get HEX/RGB/HSL, extract dominant colors, and export to CSS/JSON/Tailwind—all client-side with magnifier.',
        category: 'colors',
        component: () =>
            import('~/components/tools/colors/ImageColorPicker.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Image Color Picker with Palette Extractor & K-Means – ${BRAND}`,
            description:
                'Upload an image to pick colors with precision magnifier and extract dominant color palette using k-means clustering. Export to CSS, JSON, Tailwind, or SCSS. Get HEX/RGB/HSL instantly—fully client-side with no uploads.',
            ogImage: OG,
            keywords:
                'image color picker, pick color from image, hex from image, eyedropper online, rgb sampler, color from photo, dominant colors, k-means clustering, color palette extractor, export to css, export to tailwind, color palette from image',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Image Color Picker Pro',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: [
                    'Pixel Color Sampling with Magnifier',
                    'Dominant Colors Extraction (K-Means)',
                    'Extract 6-Color Palette',
                    'HEX/RGB/RGBA/HSL Output',
                    'Export to CSS Variables',
                    'Export to SCSS',
                    'Export to JSON',
                    'Export to Tailwind Config',
                    'Color Percentage Display',
                    'Native Eyedropper Support',
                    'Zoom Control (3×-12×)',
                    'Average Mode Sampling',
                    'Color History (Last 10)',
                    'Click to Copy',
                    'Fully Client-Side'
                ],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '8' }
            }
        }
    },

    'dev-notepad': {
        title: 'Dev Notepad',
        description: 'Advanced developer notepad with Markdown & HTML support, multi-tabs, version history, regex search, and local autosave.',
        category: 'textes',
        component: () => import('~/components/tools/textes/DevNotepad.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Dev Notepad - Markdown & HTML Editor with Version History – ${BRAND}`,
            description:
                'Feature-rich in-browser notepad for developers. Supports Markdown with live preview, HTML WYSIWYG, multi-tabs, regex search/replace, and version snapshots. 100% local and privacy-friendly.',
            ogImage: OG,
            keywords:
                'developer notepad, markdown editor online, html scratchpad, browser text editor, regex search replace, version history notes, local storage notepad, distraction free writing, syntax highlighting, dev tools',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Dev Notepad Pro',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: [
                    'Markdown Editor with Live Preview',
                    'HTML WYSIWYG Editor',
                    'Multi-tab Support',
                    'Version History (Snapshots)',
                    'Regex Search & Replace',
                    'Syntax Highlighting (Prism.js)',
                    'Distraction-free Mode',
                    'Local Autosave (Privacy Focused)',
                    'Export to MD/HTML/TXT',
                    'Word, Char & Line Statistics'
                ],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '42' }
            }
        }
    },

    'css-formatter': {
        title: 'CSS Formatter',
        description: 'Professional CSS formatter with syntax highlighting, property sorting, and advanced minification. Minify or beautify CSS with smart optimizations—all client-side.',
        category: 'formatter',
        component: () => import('~/components/tools/formatter/CssFormatter.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `CSS Formatter & Minifier with Property Sorting – ${BRAND}`,
            description:
                'Advanced CSS formatter with syntax highlighting, property sorting, and smart minification. Beautify or compress CSS with hex color shortening, zero unit removal, and more—all in your browser.',
            ogImage: OG,
            keywords:
                'css minifier, format css, css beautifier, compress css online, tidy css, css formatter tool, sort css properties, css syntax highlighting, optimize css',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'CSS Formatter Pro',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: [
                    'Minify CSS',
                    'Beautify CSS',
                    'Syntax Highlighting',
                    'Sort Properties Alphabetically',
                    'Shorten Hex Colors',
                    'Remove Units on Zero',
                    'Statistics Dashboard',
                    'Custom Indentation',
                    'Auto-run on Paste',
                    'Copy & Download'
                ],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '29' }
            }
        }
    },

    'clip-path-maker': {
        title: 'Clip Path Maker',
        description: 'Visually create CSS clip-path polygons, circles, and ellipses with draggable handles. Export clean CSS code with modern harmonized UI.',
        category: 'imaging',
        component: () => import('~/components/tools/imaging/ClipPathMaker.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `CSS clip-path Generator (Polygon, Circle, Ellipse Editor) – ${BRAND}`,
            description:
                'Professional CSS clip-path generator with visual polygon, circle, and ellipse editor. Drag points, preview on images, export clean CSS code. Includes undo/redo, keyboard shortcuts, and harmonized dark UI—all client-side.',
            ogImage: OG,
            keywords:
                'css clip-path generator, polygon editor, clip path maker, image clipping, css shapes, polygon points, circle clip-path, ellipse clip-path, visual css editor, draggable points, clip-path polygon, css masking, shape generator, web design tool',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Clip Path Maker Pro',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: [
                    'Visual Polygon Editor with Draggable Points',
                    'Circle & Ellipse Shape Support',
                    'Live Preview on Images',
                    'Export Clean CSS Code',
                    'Undo/Redo History (Ctrl/⌘+Z)',
                    'Keyboard Shortcuts',
                    'Image Upload for Preview',
                    'Copy CSS to Clipboard',
                    'Reset Tool',
                    'Harmonized Dark UI',
                    'Client-side Processing'
                ],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '28' }
            }
        }
    },

    'image-compressor': {
        title: 'Image Compressor',
        description: 'Professional batch image compressor with AI-powered smart compression, EXIF data viewer, target file size mode, and support for JPEG, PNG, WebP, and AVIF formats. Download as ZIP with real-time progress tracking.',
        category: 'imaging',
        component: () =>
            import('~/components/tools/imaging/ImageCompressor.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Image Compressor (PNG/JPEG/WebP/AVIF) - Smart Compression & EXIF Viewer – ${BRAND}`,
            description:
                'Advanced AI-powered image compressor with smart compression, EXIF metadata viewer, and target file size mode. Supports JPEG, PNG, WebP, and AVIF formats. Compress multiple images in batch, view camera settings and GPS data, auto-optimize quality, and download as ZIP archive. All processing done client-side with complete privacy—no upload to server required.',
            ogImage: OG,
            keywords:
                'image compressor, smart compression, exif viewer, batch image compression, compress png, compress jpeg, convert to webp, avif compressor, resize image online, optimize images, zip download images, bulk image optimization, image quality reducer, webp converter, avif converter, exif data, camera metadata, gps photo location, target file size, auto quality adjustment',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Image Compressor Pro - Smart Compression & EXIF',
                applicationCategory: 'MultimediaApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: [
                    'Smart Compression (Auto-detect Format & Quality)',
                    'EXIF Data Viewer (Camera, GPS, Settings)',
                    'Target File Size Mode (Binary Search)',
                    'Batch Image Compression',
                    'AVIF Format Support',
                    'WebP Format Support',
                    'JPEG & PNG Compression',
                    'ZIP Archive Download',
                    'Real-time Progress Bar',
                    'Before/After Comparison',
                    'Drag & Drop Upload',
                    'Client-side Processing (Privacy)',
                    'Maintain Aspect Ratio',
                    'Custom Quality Control',
                    'Resize Images',
                    'Camera Metadata Display',
                    'GPS Coordinates Viewer'
                ],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '18' }
            }
        }
    },

    'time-converter': {
        title: 'Time Converter',
        description: 'Professional time converter with UNIX timestamp support, timezone conversion, duration calculator, and ISO 8601 formatting. Modern harmonized UI with quick examples.',
        category: 'converter',
        component: () =>
            import('~/components/tools/converter/TimeConverter.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Time & UNIX Timestamp Converter (Time Zones & Duration) – ${BRAND}`,
            description:
                'Professional time converter with UNIX timestamp to date conversion, timezone support (DST-safe), duration calculator, and human-readable formatting. Convert seconds/milliseconds/nanoseconds, view in UTC/local/any timezone, calculate time differences. Includes quick examples and harmonized UI—all client-side.',
            ogImage: OG,
            keywords:
                'unix timestamp converter, epoch time, convert timestamp to date, timezone converter, iso 8601, utc time, duration calculator, time difference calculator, human readable time, time zone converter, DST safe conversion, milliseconds to date, seconds to date, nanoseconds converter, time calculator, date difference, epoch converter',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Time Converter Pro',
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: [
                    'UNIX Timestamp ⇄ Date Conversion',
                    'Auto-detect Unit (Seconds/Milliseconds/Nanoseconds)',
                    'Duration Calculator (Days, Hours, Minutes, Seconds)',
                    'Timezone Converter (DST-safe)',
                    'Human-readable Time Format ("2 hours ago", "in 3 days")',
                    'ISO 8601 Output',
                    'UTC, Local, and Custom Timezone Support',
                    'Quick Timestamp Examples (Now, 1h ago, Y2K, Epoch)',
                    'Copy to Clipboard',
                    'Set All to Now Button',
                    'Harmonized Dark UI',
                    'Client-side Processing'
                ],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '34' }
            }
        }
    },

    'mini-image-editor': {
        title: 'Mini Image Editor',
        description:
            'Quick image editor: crop, resize, rotate, flip, and apply 13 filters (including Instagram-style presets). Global filter intensity control, undo/redo, and export to PNG/JPEG/WebP. Everything stays local in your browser.',
        category: 'imaging',
        component: () =>
            import('~/components/tools/imaging/MiniImageEditor.vue') as unknown as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Mini Image Editor with Instagram Filters (Crop, Resize, Filters) – ${BRAND}`,
            description:
                'In-browser image editor for quick edits: crop, resize, rotate, flip, and apply 13 filters including Instagram-style presets (Clarendon, Gingham, Valencia, etc.). Global filter intensity control, local only, privacy-friendly.',
            ogImage: OG,
            keywords:
                'image editor, crop image, resize image, rotate image, flip image, instagram filters, photo filters, clarendon filter, valencia filter, local image tool, photo editor online, filter intensity, image presets',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Mini Image Editor',
                applicationCategory: 'MultimediaApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: [
                    'Crop with Visual Handles',
                    'Resize & Rotate',
                    'Flip Horizontal/Vertical',
                    '13 Filter Presets (Basic + Instagram-style)',
                    'Global Filter Intensity Control (0-100%)',
                    '6 Adjustable Filters (Brightness, Contrast, Saturation, etc.)',
                    'Undo/Redo Support',
                    'Zoom Control',
                    'Export to PNG/JPEG/WebP',
                    'Local Processing (Privacy-Friendly)'
                ],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '32' }
            }
        }
    },


    'unit-converter': {
        title: 'Unit Converter',
        description: 'Professional unit converter with 80+ units across 10 categories including length, weight, temperature, speed, pressure, energy, power, area, volume, and CSS units. Search, favorites, and harmonized UI.',
        category: 'converter',
        component: () =>
            import('~/components/tools/converter/UnitConverter.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Unit Converter - 80+ Units (Length, Weight, Temperature, CSS) – ${BRAND}`,
            description:
                'Professional unit converter with 80+ units across 10 categories: length, area, volume, weight, speed, temperature, pressure, energy, power, and CSS units (px/rem/em). Search units, save favorites, track recent conversions, view all conversions at once. Modern harmonized UI—all client-side.',
            ogImage: OG,
            keywords:
                'unit converter, length converter, weight converter, temperature converter, speed converter, pressure converter, energy converter, power converter, area converter, volume converter, px to rem, px to em, metric to imperial, unit search, favorite units, celsius fahrenheit, km to miles, kg to pounds, bar to psi, joules to calories, watts to horsepower',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Unit Converter Pro',
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: [
                    'Length (km, m, cm, mm, mi, yd, ft, in)',
                    'Area (km², m², cm², acre, hectare, ft², in²)',
                    'Volume (m³, L, mL, ft³, gal, US/UK gal)',
                    'Weight (t, kg, g, mg, lb, oz, stone)',
                    'Speed (m/s, km/h, mph, knot, ft/s)',
                    'Temperature (°C, °F, K) with Exact Formulas',
                    'Pressure (Pa, kPa, MPa, bar, atm, psi, mmHg, inHg)',
                    'Energy (J, kJ, MJ, Wh, kWh, cal, kcal, BTU, eV)',
                    'Power (W, kW, MW, hp, BTU/h)',
                    'CSS Units (px/rem/em) with Root & Context Font-size',
                    'Search & Filter Units',
                    'Favorites with ⭐ Star System',
                    'Recent Conversions History',
                    'View All Conversions at Once',
                    'Swap Units Button',
                    'Copy Results',
                    'Harmonized Dark UI',
                    'localStorage Persistence'
                ],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '42' }
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
                featureList: [
                    'Flags',
                    'Matches/Groups',
                    'Replace Preview',
                    'Copy Results',
                    'Regex complexity analyzer',
                    'Pattern explainer',
                    'Common regex library',
                    'Regex cheat sheet collapsible panel',
                    'Highlight syntax errors in pattern',
                    'Generate code for multiple languages',
                    'Quick insert buttons for common patterns'
                ],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '48' }
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
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '31' }
            }
        }
    }
}


