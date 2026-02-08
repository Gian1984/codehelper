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
            title: `Free JSON Formatter & Validator Online - Beautify JSON Instantly – ${BRAND}`,
            description:
                'Format, validate & compare JSON in one click! Tree view, syntax highlighting, diff tool, schema validation. Free online, no signup. Try it now!',
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
            title: `Free XML Formatter Online - Beautify, Validate & Convert to JSON – ${BRAND}`,
            description:
                'Format & beautify XML instantly! Convert XML to JSON, test XPath queries, validate structure. Free online tool, works in browser. No upload needed.',
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

    'gitignore-generator': {
        title: '.gitignore Generator',
        description: 'Generate .gitignore files for your projects with 40+ pre-built templates. Select from languages, frameworks, OS, IDEs, and build tools. Combine multiple templates and add custom rules.',
        category: 'generator',
        component: () =>
            import('~/components/tools/generator/GitignoreGenerator.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Free .gitignore Generator - 40+ Templates (Node, Python, React) – ${BRAND}`,
            description:
                'Create perfect .gitignore files in seconds! 40+ templates for Node.js, Python, React, Java & more. Combine templates, add custom rules. Free download.',
            ogImage: OG,
            keywords:
                'gitignore generator, generate gitignore, .gitignore creator, node gitignore, python gitignore, java gitignore, react gitignore, gitignore template, gitignore maker, git ignore file generator, gitignore node_modules, create gitignore online, gitignore builder, vscode gitignore, macos gitignore',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: '.gitignore Generator Pro',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: [
                    '40+ Pre-built Templates',
                    'Languages (Node, Python, Java, Go, Rust, PHP, Ruby, C++)',
                    'Frameworks (React, Vue, Next.js, Django, Laravel)',
                    'Build Tools (npm, Yarn, Maven, Gradle, Webpack, Vite)',
                    'Operating Systems (macOS, Windows, Linux)',
                    'IDEs (VSCode, JetBrains, Sublime, Vim)',
                    'Popular Presets (Node.js, Python, Java, React, Vue, Go, Rust, Full Stack)',
                    'Multi-select Template Combination',
                    'Search & Filter Templates',
                    'Custom Rules Support',
                    'Real-time Preview',
                    'Pattern Statistics',
                    'Copy to Clipboard',
                    'Download .gitignore File',
                    'Select All / Deselect All',
                    'Quick Start Presets'
                ],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '28' }
            }
        }
    },

    'password-generator': {
        title: 'Password Generator',
        description: 'Generate secure passwords with customizable length, character types, and strength meter. Bulk generation support, presets (strong, memorable, PIN), and entropy calculation—all client-side.',
        category: 'generator',
        component: () =>
            import('~/components/tools/generator/PasswordGenerator.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Free Secure Password Generator - Strong Passwords with Strength Meter – ${BRAND}`,
            description:
                'Generate uncrackable passwords instantly! Strength meter, bulk generation (up to 50), PIN mode. 100% private - nothing stored. Free, no signup needed.',
            ogImage: OG,
            keywords:
                'password generator, secure password, random password generator, strong password generator, password strength meter, generate password online, password creator, entropy calculator, password security, bulk password generator, pin generator, memorable password, exclude similar characters',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Password Generator Pro',
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: [
                    'Customizable Length (4-128 characters)',
                    'Uppercase Letters (A-Z)',
                    'Lowercase Letters (a-z)',
                    'Numbers (0-9)',
                    'Symbols (!@#$%^&*)',
                    'Exclude Similar Characters (i, l, 1, L, o, 0, O)',
                    'Password Strength Meter (5 levels)',
                    'Entropy Calculation',
                    'Crack Time Estimation',
                    'Quick Presets (Strong, Memorable, PIN)',
                    'Bulk Generation (1-50 passwords)',
                    'Copy Individual Passwords',
                    'Cryptographically Secure (crypto.getRandomValues)',
                    'Client-side Processing (Privacy-Friendly)',
                    'localStorage Persistence'
                ],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '94' }
            }
        }
    },

    'qr-code-generator': {
        title: 'QR Code Generator',
        description: 'Generate QR codes for URLs, text, WiFi, vCards, and more. Customizable size, colors, error correction. Download as PNG or SVG—all client-side.',
        category: 'generator',
        component: () =>
            import('~/components/tools/generator/QRCodeGenerator.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Free QR Code Generator - Create QR for URL, WiFi, vCard Online – ${BRAND}`,
            description:
                'Create QR codes in seconds! URLs, WiFi, vCards, emails & more. Custom colors, download PNG/SVG. 100% free, no watermark, no signup. Try it now!',
            ogImage: OG,
            keywords:
                'qr code generator, create qr code, qr code maker, generate qr code online, qr code creator, wifi qr code, vcard qr code, url qr code, custom qr code, qr code colors, qr code download, qr code png svg, free qr code generator',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'QR Code Generator Pro',
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: [
                    'Generate QR Codes for URLs',
                    'Plain Text QR Codes',
                    'WiFi Network QR Codes',
                    'vCard Contact QR Codes',
                    'Email QR Codes',
                    'Phone Number QR Codes',
                    'SMS QR Codes',
                    'Geo Location QR Codes',
                    'Customizable Size (128-1024px)',
                    'Error Correction Levels (L, M, Q, H)',
                    'Custom Foreground/Background Colors',
                    'Download as PNG',
                    'Download as SVG',
                    'Quick Templates',
                    'Real-time Preview',
                    'Client-side Processing (Privacy-Friendly)',
                    'localStorage Persistence'
                ],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '112' }
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
            title: `Bytes to KB/MB/GB Converter - Free File Size Calculator – ${BRAND}`,
            description:
                'Instantly convert bytes to KB, MB, GB, TB and back. Supports binary (KiB, MiB) & decimal units. Perfect for developers. Free, fast, no signup.',
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
            title: `CSS clamp() Generator - Fluid Typography Made Easy (Free) – ${BRAND}`,
            description:
                'Create perfect responsive font sizes with CSS clamp() in seconds. Set min/max sizes, preview live, copy CSS. The easiest fluid typography tool online.',
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
            title: `Free PHP var_dump() Formatter - Beautify Output Online – ${BRAND}`,
            description:
                'Clean up messy PHP var_dump() output instantly! Format arrays & objects into readable code. Perfect for debugging. Free, paste & format. No signup.',
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
            title: `HTML Minifier & Beautifier - Compress HTML Online Free – ${BRAND}`,
            description:
                'Reduce HTML file size by up to 70%! Minify or beautify HTML instantly. Remove comments, whitespace & optimize code. Free online tool, no upload needed.',
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
            title: `PX to VW/VH Converter - Free Viewport Unit Calculator (2026) – ${BRAND}`,
            description:
                'Instantly convert px to vw, vh, vmin, vmax & modern CSS units (dvh, svh, cqw). 18 device presets included. Batch convert multiple values. Free, no signup required.',
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
            title: `Free SVG Icon Generator - Create Custom Icons Online (33+ Shapes) – ${BRAND}`,
            description:
                'Create custom SVG icons in minutes! 33+ shapes, color presets, export icon packs (16-512px). Import & edit existing SVGs. Free, no account needed.',
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
            title: `Free SVG Wave Generator - Create Hero Backgrounds Instantly – ${BRAND}`,
            description:
                'Generate beautiful SVG waves for website headers & backgrounds. Customize colors, amplitude, layers. Download SVG or copy code. 100% free, no signup.',
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
            title: `Free Lorem Ipsum Generator - Create Dummy Text Online – ${BRAND}`,
            description:
                'Generate Lorem Ipsum text instantly! By words, paragraphs or characters. Multiple variants included. Perfect for mockups & wireframes. Free, no signup.',
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
            title: `Free Text Case Converter - UPPERCASE, camelCase, snake_case Online – ${BRAND}`,
            description:
                'Convert text to any case instantly! UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case & more. 15+ options. Free, works offline.',
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
            title: `Color Shades Generator - Create Tints & Shades Free Online – ${BRAND}`,
            description:
                'Generate 10+ tints and shades from any color instantly. Perfect for design systems & Tailwind. Copy HEX codes with one click. Free, no signup.',
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
            title: `Free Color Converter - HEX to RGB, HSL, CMYK + WCAG Checker – ${BRAND}`,
            description:
                'Convert colors between HEX, RGB, HSL, CMYK instantly! WCAG contrast checker, color blindness simulator, harmony generator. Free tool for designers.',
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
            title: `Free CSS Formatter & Minifier Online - Beautify CSS Instantly – ${BRAND}`,
            description:
                'Format or minify CSS in one click! Sort properties, shorten colors, remove whitespace. Reduce file size up to 50%. Free online tool, no signup.',
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
            title: `Free CSS clip-path Generator - Create Shapes Visually Online – ${BRAND}`,
            description:
                'Create stunning CSS clip-path shapes in seconds! Drag points to build polygons, circles & ellipses. Preview on images, copy CSS instantly. No signup, 100% free.',
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
            title: `Free Image Compressor - Reduce PNG/JPEG/WebP Size Online (No Upload) – ${BRAND}`,
            description:
                'Compress images up to 80% smaller! Supports PNG, JPEG, WebP, AVIF. Batch compress, view EXIF data, download as ZIP. 100% private - files never leave your browser.',
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
            title: `Free UNIX Timestamp Converter - Epoch to Date Online – ${BRAND}`,
            description:
                'Convert UNIX timestamps to dates instantly! Timezone support, duration calculator, human-readable format. Seconds, milliseconds, nanoseconds. Free, fast.',
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
            title: `Free Regex Tester Online - Test Regular Expressions Instantly – ${BRAND}`,
            description:
                'Test regex patterns in real-time! Highlight matches, view groups, test replacements. Includes cheat sheet & common patterns library. Free, works offline.',
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

    'base64-encoder-decoder': {
        title: 'Base64 Encoder/Decoder',
        description: 'Encode and decode Base64 strings, files, images with data URL support. Upload files or paste text for instant conversion.',
        category: 'dev',
        component: () =>
            import('~/components/tools/dev/Base64EncoderDecoder.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Free Base64 Encoder & Decoder Online - Encode Images & Files – ${BRAND}`,
            description:
                'Encode or decode Base64 instantly! Supports text, images & files. Generate data URLs, preview images. Free, private, works offline. No signup required.',
            ogImage: OG,
            keywords:
                'base64 encoder, base64 decoder, encode base64 online, decode base64, data url generator, base64 image encoder, base64 file upload, base64 to image, image to base64, base64 converter, mime type base64, base64 decode online, base64 encode file',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Base64 Encoder/Decoder Pro',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: [
                    'Encode Text to Base64',
                    'Decode Base64 to Text',
                    'Upload Files for Encoding',
                    'Generate Data URLs',
                    'Auto-detect MIME Types',
                    'Image Preview for Decoded Images',
                    'Download Decoded Files',
                    'UTF-8 Support',
                    'Binary File Support',
                    'Copy to Clipboard',
                    'Size Statistics & Overhead Calculation',
                    'Auto-process Mode',
                    'Client-side Processing (Privacy-Friendly)',
                    'localStorage Persistence'
                ],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '52' }
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
            title: `CSS Border Radius Generator - Create Rounded Corners Free – ${BRAND}`,
            description:
                'Design perfect rounded corners & blob shapes visually. Control each corner, create elliptical curves, copy CSS instantly. Free online tool.',
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
    },

    'jwt-decoder': {
        title: 'JWT Decoder & Validator',
        description: 'Decode, validate, and inspect JSON Web Tokens (JWT). Parse header, payload, verify signatures with HMAC algorithms, and check token expiration—all client-side.',
        category: 'dev',
        component: () => import('~/components/tools/dev/JwtDecoder.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Free JWT Decoder Online - Decode & Validate JSON Web Tokens – ${BRAND}`,
            description:
                'Decode JWT tokens instantly! View header, payload, verify signatures (HS256/384/512), check expiration. 100% private - tokens never leave your browser.',
            ogImage: OG,
            keywords:
                'jwt decoder, jwt validator, decode jwt online, json web token decoder, jwt parser, verify jwt signature, jwt debugger, jwt claims inspector, check jwt expiration, hs256 validator, jwt token analyzer, decode jwt header payload, jwt verification tool, jwt signature checker',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'JWT Decoder & Validator',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: [
                    'Decode JWT Header',
                    'Decode JWT Payload',
                    'Extract Signature',
                    'Verify HMAC Signatures (HS256, HS384, HS512)',
                    'Inspect Standard Claims (exp, iat, iss, sub, aud, nbf, jti)',
                    'Token Expiration Checker',
                    'Time Remaining Calculator',
                    'Algorithm Detection',
                    'Copy Header/Payload/Signature',
                    'Load Example JWT',
                    'Auto-decode Mode',
                    'Base64URL Decoding',
                    'JWT Structure Validation',
                    'Client-side Processing (Privacy-Friendly)',
                    'localStorage Persistence'
                ],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '64' }
            }
        }
    },

    'hash-generator': {
        title: 'Hash Generator',
        description: 'Generate cryptographic hashes for text and files using MD5, SHA-1, SHA-256, SHA-384, SHA-512, and HMAC. File hashing support with real-time processing—all client-side.',
        category: 'dev',
        component: () => import('~/components/tools/dev/HashGenerator.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Free Hash Generator - MD5, SHA-256, SHA-512 Online (Text & Files) – ${BRAND}`,
            description:
                'Generate MD5, SHA-256, SHA-512 hashes instantly! Hash text or files, HMAC support. Verify file integrity. Free, private, works offline. No upload needed.',
            ogImage: OG,
            keywords:
                'hash generator, md5 generator, sha256 generator, sha512 generator, file hash, text hash, checksum calculator, hmac generator, hash calculator online, generate hash, file checksum, cryptographic hash, sha1 hash, sha384 hash, message digest, hash function, file integrity checker',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Hash Generator Pro',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: [
                    'MD5 Hash Generation',
                    'SHA-1 Hash Generation',
                    'SHA-256 Hash Generation (Recommended)',
                    'SHA-384 Hash Generation',
                    'SHA-512 Hash Generation',
                    'Text Input Hashing',
                    'File Upload Hashing',
                    'HMAC Support (SHA-256, SHA-384, SHA-512, SHA-1)',
                    'Multiple Hash Algorithms Simultaneously',
                    'Copy Individual Hashes',
                    'Auto-process Mode',
                    'File Size Display',
                    'Hash Length Information',
                    'Security Warnings for Legacy Algorithms',
                    'Client-side Processing (Privacy-Friendly)',
                    'localStorage Persistence'
                ],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '78' }
            }
        }
    },

    'url-encoder-decoder': {
        title: 'URL Encoder/Decoder',
        description: 'Encode and decode URLs, query strings, and URI components. Supports encodeURIComponent and encodeURI with URL parser and query parameter inspector—all client-side.',
        category: 'dev',
        component: () => import('~/components/tools/dev/UrlEncoderDecoder.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Free URL Encoder & Decoder Online - Encode Query Strings Instantly – ${BRAND}`,
            description:
                'Encode or decode URLs & query strings in one click! Parse URLs, inspect parameters, percent-encode special chars. Free tool, no signup. Works offline.',
            ogImage: OG,
            keywords:
                'url encoder, url decoder, encode url online, decode url, query string encoder, uri encoder, encodeURIComponent, encodeURI, percent encoding, url parser, query parameters, decode query string, url escape, uri decode, url encode special characters, percent decode',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'URL Encoder/Decoder Pro',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: [
                    'Encode URLs with encodeURIComponent',
                    'Encode URLs with encodeURI',
                    'Decode URL-encoded strings',
                    'URL Parser (protocol, hostname, port, pathname, search, hash)',
                    'Query Parameter Inspector',
                    'Swap Input/Output',
                    'Auto-process Mode',
                    'Quick Actions (Encode Query String, Build URL, Extract Domain)',
                    'Character Encoding Reference',
                    'Copy Individual Components',
                    'Load Examples',
                    'Real-time Encoding Statistics',
                    'Client-side Processing (Privacy-Friendly)',
                    'localStorage Persistence'
                ],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '92' }
            }
        }
    },

    'uuid-generator': {
        title: 'UUID/GUID Generator',
        description: 'Generate unique identifiers (UUID v4, v1, Nil, Max) with bulk generation support. Includes UUID validator and multiple output formats—all client-side.',
        category: 'dev',
        component: () => import('~/components/tools/dev/UuidGenerator.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Free UUID Generator Online - Generate v4, v1 & Bulk UUIDs – ${BRAND}`,
            description:
                'Generate UUIDs/GUIDs instantly! v4 random, v1 timestamp, bulk up to 1000. Validate existing UUIDs. Free online tool, cryptographically secure. No signup.',
            ogImage: OG,
            keywords:
                'uuid generator, guid generator, generate uuid online, uuid v4, uuid v1, random uuid, bulk uuid generator, uuid validator, unique identifier, globally unique identifier, uuid format, uuid urn, uuid braces, validate uuid, check uuid version',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'UUID/GUID Generator Pro',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: [
                    'Generate UUID v4 (Random)',
                    'Generate UUID v1 (Timestamp-based)',
                    'Generate Nil UUID (all zeros)',
                    'Generate Max UUID (all ones)',
                    'Bulk Generation (1-1000 UUIDs)',
                    'Multiple Output Formats (Standard, No Hyphens, Uppercase, Braces, URN)',
                    'UUID Validator with Version Detection',
                    'Copy Individual UUIDs',
                    'Copy All UUIDs',
                    'Download as Text File',
                    'Cryptographically Secure (uses crypto.randomUUID)',
                    'Client-side Processing (Privacy-Friendly)',
                    'localStorage Persistence'
                ],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '86' }
            }
        }
    }
}


