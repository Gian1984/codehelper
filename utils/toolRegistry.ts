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
        seoContent?: string // Added for long-form SEO content
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
            },
            seoContent: `
                <section>
                    <h2>What is a JSON Formatter?</h2>
                    <p>A <strong>JSON formatter</strong> is an online tool that takes raw, unstructured JSON text and transforms it into a clean, indented, and human-readable format. JSON (JavaScript Object Notation) is the universal data format used by APIs, configuration files, and web applications, but it is often minified or poorly indented—making it hard to read and debug.</p>
                    <p>CodeHelper's <strong>JSON Formatter & Validator</strong> goes far beyond simple pretty-printing. It includes a collapsible tree view, a diff comparison tool, JSON Schema validation, and support for JSONC (JSON with comments).</p>

                    <h3>Key Features</h3>
                    <ul>
                        <li><strong>Beautify & Minify</strong>: Instantly format minified JSON or compress it back for production.</li>
                        <li><strong>Tree View</strong>: Navigate large JSON structures with collapsible nodes.</li>
                        <li><strong>JSON Diff</strong>: Compare two JSON documents and highlight the differences.</li>
                        <li><strong>Schema Validation</strong>: Validate your JSON against a JSON Schema to catch structural errors.</li>
                        <li><strong>Sort Keys</strong>: Recursively sort all keys alphabetically for consistency.</li>
                    </ul>

                    <h3>How to use the JSON Formatter</h3>
                    <ol>
                        <li>Paste your raw or minified JSON into the input panel.</li>
                        <li>Click <strong>Format</strong> to instantly beautify and validate it.</li>
                        <li>Use the tree view to navigate and collapse nested objects.</li>
                        <li>Switch to the Diff tab to compare two JSON files side-by-side.</li>
                        <li>Copy the formatted output or download it as a file.</li>
                    </ol>

                    <p>Whether you are debugging an API response, editing a configuration file, or validating data against a schema, this free online JSON formatter is the fastest way to work with JSON data.</p>
                </section>
            `
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
            },
            seoContent: `
                <section>
                    <h2>What is an XML Formatter?</h2>
                    <p>An <strong>XML formatter</strong> is a tool that takes raw or minified XML markup and reformats it with proper indentation and line breaks, making it easy to read and understand. XML (eXtensible Markup Language) is widely used in configuration files, SOAP APIs, SVG graphics, and data exchange formats—but its verbose, nested structure can quickly become unreadable without proper formatting.</p>
                    <p>CodeHelper's <strong>XML Formatter & Converter</strong> lets you beautify, validate, and convert XML to JSON, plus test XPath queries—all directly in your browser with no file uploads required.</p>

                    <h3>Key Features</h3>
                    <ul>
                        <li><strong>Beautify XML</strong>: Add proper indentation with custom tab sizes for maximum readability.</li>
                        <li><strong>XML to JSON</strong>: Convert entire XML documents into JSON format in one click.</li>
                        <li><strong>XPath Tester</strong>: Write and test XPath queries against your document to extract specific nodes.</li>
                        <li><strong>Syntax Highlighting</strong>: Color-coded output for tags, attributes, and content.</li>
                        <li><strong>Minify XML</strong>: Strip all whitespace to produce compact output for production use.</li>
                    </ul>

                    <h3>How to use the XML Formatter</h3>
                    <ol>
                        <li>Paste your XML document into the input area.</li>
                        <li>Click <strong>Format</strong> to beautify and validate the structure.</li>
                        <li>Use the <strong>XML to JSON</strong> tab to convert the document.</li>
                        <li>Enter an XPath expression to query specific elements.</li>
                        <li>Copy or download the formatted result.</li>
                    </ol>

                    <p>Whether you are working with SOAP responses, RSS feeds, Android layouts, or Maven configuration files, this free XML formatter will help you work faster and with fewer errors.</p>
                </section>
            `
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
            },
            seoContent: `
                <section>
                    <h2>What is a JSON to YAML Converter?</h2>
                    <p>A <strong>JSON to YAML converter</strong> is a tool that transforms data between two of the most popular configuration and data serialization formats. JSON is widely used in web APIs and JavaScript applications, while YAML (YAML Ain't Markup Language) is favored in DevOps configuration files like Docker Compose, Kubernetes manifests, and GitHub Actions workflows due to its clean, human-friendly syntax.</p>
                    <p>CodeHelper's <strong>JSON ↔ YAML Converter</strong> detects the input format automatically and converts in either direction with a single click.</p>

                    <h3>Key Features</h3>
                    <ul>
                        <li><strong>Auto-detection</strong>: Paste either JSON or YAML and the tool identifies the format instantly.</li>
                        <li><strong>Bidirectional Conversion</strong>: Convert JSON to YAML or YAML to JSON with equal ease.</li>
                        <li><strong>Syntax Highlighting</strong>: Color-coded output makes both formats easy to scan.</li>
                        <li><strong>Sort Keys</strong>: Alphabetically sort keys during conversion for consistency.</li>
                        <li><strong>Error Validation</strong>: Immediate feedback if the input is malformed.</li>
                    </ul>

                    <h3>How to use the JSON YAML Converter</h3>
                    <ol>
                        <li>Paste your JSON or YAML into the input panel.</li>
                        <li>The tool auto-detects the format and shows a format indicator.</li>
                        <li>Click <strong>Convert</strong> to produce the output in the other format.</li>
                        <li>Copy the converted result to your clipboard.</li>
                    </ol>

                    <p>Whether you are migrating configuration files from JSON to YAML for Kubernetes, converting API responses for use in Ansible playbooks, or simply exploring the differences between the two formats, this free online converter makes the process instant and effortless.</p>
                </section>
            `
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
            },
            seoContent: `
                <section>
                    <h2>What is a Number Base Converter?</h2>
                    <p>A <strong>number base converter</strong> is a tool that translates numbers between different positional numeral systems—the most common being Binary (base 2), Octal (base 8), Decimal (base 10), and Hexadecimal (base 16). Understanding these conversions is fundamental in computer science, programming, and digital electronics.</p>
                    <p>CodeHelper's <strong>Number Base Converter</strong> supports large numbers via BigInt, handles negative values correctly, and visually displays binary results in grouped bytes for easy reading.</p>

                    <h3>When do you need to convert number bases?</h3>
                    <ul>
                        <li><strong>Binary to Decimal</strong>: Essential when reading CPU registers, memory addresses, or bitfield flags in low-level programming.</li>
                        <li><strong>Decimal to Hex</strong>: Used constantly in web colors (e.g., #FF5733), memory addresses, and network configuration.</li>
                        <li><strong>Octal</strong>: Appears in Unix file permission modes (e.g., chmod 755) and some legacy systems.</li>
                        <li><strong>Visual Binary Grouping</strong>: View binary numbers as 4-bit nibbles or 8-bit bytes to understand data structure.</li>
                    </ul>

                    <h3>How to use the Number Base Converter</h3>
                    <ol>
                        <li>Type a number into the <strong>Decimal</strong>, <strong>Binary</strong>, <strong>Octal</strong>, or <strong>Hex</strong> field.</li>
                        <li>All other fields update in real time.</li>
                        <li>Toggle the visual binary display to see byte-grouped output.</li>
                        <li>Use quick example values to explore common numbers like 255 or 65535.</li>
                    </ol>

                    <p>Whether you are studying computer architecture, debugging network protocols, or writing embedded systems code, this free binary to decimal to hex converter has you covered.</p>
                </section>
            `
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
            },
            seoContent: `
                <section>
                    <h2>What is a README Generator?</h2>
                    <p>A <strong>README generator</strong> is a tool that helps developers quickly create professional, well-structured <code>README.md</code> files for their GitHub repositories. A great README is the face of any open-source project—it communicates what the project does, how to install it, how to use it, and how to contribute.</p>
                    <p>CodeHelper's <strong>README Generator</strong> provides five project-specific templates (Frontend, Backend, CLI, Library, Full-Stack), a Shields.io badge builder, and a live GitHub-styled markdown preview.</p>

                    <h3>Key Features</h3>
                    <ul>
                        <li><strong>5 Quick Templates</strong>: Start with a pre-filled template matched to your project type—Frontend, Backend, CLI tool, Library, or Full-Stack app.</li>
                        <li><strong>Badge Builder</strong>: Add GitHub stars, forks, build status, npm version, and license badges powered by Shields.io.</li>
                        <li><strong>13 Customizable Sections</strong>: Including installation, usage, environment variables, API reference, contributing, FAQ, and changelog.</li>
                        <li><strong>Live Preview</strong>: See exactly how your README will render on GitHub before downloading.</li>
                    </ul>

                    <h3>How to generate a GitHub README</h3>
                    <ol>
                        <li>Choose a project template that matches your stack.</li>
                        <li>Fill in your project name, description, and relevant details.</li>
                        <li>Add Shields.io badges with the visual badge builder.</li>
                        <li>Toggle sections on or off to suit your project's needs.</li>
                        <li>Preview the rendered output, then copy or download the <code>README.md</code> file.</li>
                    </ol>

                    <p>Whether you are publishing an npm package, an open-source framework, or a personal portfolio project, a polished README.md is essential for attracting contributors and users.</p>
                </section>
            `
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
            },
            seoContent: `
                <section>
                    <h2>What is a .gitignore Generator?</h2>
                    <p>A <strong>.gitignore generator</strong> is a tool that creates the <code>.gitignore</code> file for your project—a special Git configuration file that tells Git which files and directories to ignore and never commit to your repository. Without a proper .gitignore, you risk accidentally committing sensitive credentials, node_modules, build artifacts, or OS-specific files.</p>
                    <p>CodeHelper's <strong>.gitignore Generator</strong> offers 40+ pre-built templates covering languages, frameworks, build tools, operating systems, and IDEs, which you can combine and customize freely.</p>

                    <h3>Available Template Categories</h3>
                    <ul>
                        <li><strong>Languages</strong>: Node.js, Python, Java, Go, Rust, PHP, Ruby, C++, and more.</li>
                        <li><strong>Frameworks</strong>: React, Vue, Next.js, Django, Laravel, Rails.</li>
                        <li><strong>IDEs</strong>: VSCode, JetBrains, Sublime Text, Vim, Emacs.</li>
                        <li><strong>Operating Systems</strong>: macOS (.DS_Store), Windows (Thumbs.db), Linux.</li>
                        <li><strong>Build Tools</strong>: npm, Yarn, Maven, Gradle, Webpack, Vite.</li>
                    </ul>

                    <h3>How to generate a .gitignore file</h3>
                    <ol>
                        <li>Search or browse for templates that match your project's tech stack.</li>
                        <li>Select one or more templates—they combine automatically.</li>
                        <li>Add any custom ignore rules in the custom rules section.</li>
                        <li>Preview the final output and click <strong>Download .gitignore</strong>.</li>
                        <li>Place the file in your project's root directory.</li>
                    </ol>

                    <p>Whether you are starting a new Node.js app, a Python data science project, or a full-stack monorepo, generating the right .gitignore file at project start saves time and prevents embarrassing commits.</p>
                </section>
            `
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
            },
            seoContent: `
                <section>
                    <h2>What is a Password Generator?</h2>
                    <p>A <strong>password generator</strong> is a tool that creates random, cryptographically secure passwords that are virtually impossible to guess or brute-force. Using weak or reused passwords is one of the leading causes of account breaches—a strong, unique password for every account is the most important step you can take to protect your digital security.</p>
                    <p>CodeHelper's <strong>Password Generator</strong> runs 100% in your browser using the Web Crypto API (<code>crypto.getRandomValues</code>), so your generated passwords are never sent to any server.</p>

                    <h3>Password Strength Options</h3>
                    <ul>
                        <li><strong>Strong Preset</strong>: 20-character password with uppercase, lowercase, numbers, and symbols—ideal for most accounts.</li>
                        <li><strong>Memorable Preset</strong>: Avoids visually similar characters (i, l, 1, O, 0) for easier manual entry.</li>
                        <li><strong>PIN Preset</strong>: Numeric-only password for device PINs and bank codes.</li>
                        <li><strong>Custom</strong>: Choose length (4–128), character sets, and symbols manually.</li>
                        <li><strong>Bulk Generation</strong>: Generate up to 50 passwords at once for batch account creation.</li>
                    </ul>

                    <h3>How to generate a secure password</h3>
                    <ol>
                        <li>Choose your desired length and character types.</li>
                        <li>Select a quick preset or configure options manually.</li>
                        <li>The strength meter and entropy score update in real time.</li>
                        <li>Click <strong>Copy</strong> to copy the password to your clipboard.</li>
                        <li>Use the password with a password manager like Bitwarden or 1Password.</li>
                    </ol>

                    <p>Whether you are creating a master password, securing a server account, or generating API keys, this free secure password generator gives you maximum security with zero privacy risk.</p>
                </section>
            `
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
            },
            seoContent: `
                <section>
                    <h2>What is a QR Code Generator?</h2>
                    <p>A <strong>QR code generator</strong> is a tool that creates scannable Quick Response (QR) codes—two-dimensional barcodes that smartphones can read with their cameras. QR codes can encode URLs, contact details, WiFi credentials, text, email addresses, phone numbers, and more, making them incredibly versatile for marketing, business, and personal use.</p>
                    <p>CodeHelper's <strong>QR Code Generator</strong> creates custom QR codes directly in your browser with no watermarks, no sign-up, and complete privacy. Export as PNG or SVG for any use case.</p>

                    <h3>Supported QR Code Types</h3>
                    <ul>
                        <li><strong>URL QR Code</strong>: Link directly to a website, landing page, or app store listing.</li>
                        <li><strong>WiFi QR Code</strong>: Let guests connect to your network by scanning—no password typing needed.</li>
                        <li><strong>vCard QR Code</strong>: Share your contact information including name, phone, email, and address.</li>
                        <li><strong>Email & SMS QR Codes</strong>: Pre-fill an email or text message for recipients to send.</li>
                        <li><strong>Geo Location QR Code</strong>: Encode GPS coordinates to open directly in Maps apps.</li>
                    </ul>

                    <h3>How to create a QR code</h3>
                    <ol>
                        <li>Select the QR code type (URL, WiFi, vCard, etc.).</li>
                        <li>Enter the required information in the form fields.</li>
                        <li>Customize the size, colors, and error correction level.</li>
                        <li>Preview the QR code in real time.</li>
                        <li>Download as PNG or SVG for print or digital use.</li>
                    </ol>

                    <p>Whether you are creating QR codes for business cards, restaurant menus, event posters, or product packaging, this free QR code maker delivers professional results instantly.</p>
                </section>
            `
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
            },
            seoContent: `
                <section>
                    <h2>What is a Byte Size Converter?</h2>
                    <p>A <strong>byte size converter</strong> is a tool that translates digital storage values between units—Bytes, Kilobytes (KB), Megabytes (MB), Gigabytes (GB), and Terabytes (TB). Understanding data sizes is essential for developers working with file uploads, APIs, databases, network bandwidth, and cloud storage pricing.</p>
                    <p>CodeHelper's <strong>Byte Size Converter</strong> supports both the decimal (SI) standard used by hard drive manufacturers and the binary (IEC) standard used by operating systems—so you always get the right answer for your context.</p>

                    <h3>Decimal vs Binary Units</h3>
                    <ul>
                        <li><strong>Decimal (SI)</strong>: 1 KB = 1,000 bytes. Used by storage manufacturers, network providers, and most file size displays.</li>
                        <li><strong>Binary (IEC)</strong>: 1 KiB = 1,024 bytes. Used by operating systems (Windows, Linux) to report RAM and file sizes.</li>
                        <li><strong>Why the difference matters</strong>: A "500 GB" hard drive actually holds ~465 GiB, which is why your OS reports less space than advertised.</li>
                    </ul>

                    <h3>How to use the Byte Size Converter</h3>
                    <ol>
                        <li>Enter a value in any unit field (Bytes, KB, MB, GB, or TB).</li>
                        <li>All other fields update instantly with the converted values.</li>
                        <li>Toggle between decimal and binary modes as needed.</li>
                        <li>Copy any result to your clipboard with one click.</li>
                    </ol>

                    <p>Whether you are calculating API payload limits, comparing cloud storage plans, or debugging file size discrepancies between your OS and hardware specifications, this free file size calculator is the fastest tool for the job.</p>
                </section>
            `
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
            },
            seoContent: `
                <section>
                    <h2>What is a CSS clamp() Generator?</h2>
                    <p>A <strong>CSS clamp() generator</strong> is a tool that produces fluid typography and spacing values using the CSS <code>clamp()</code> function. The <code>clamp(min, preferred, max)</code> function allows a value to scale smoothly between a minimum and maximum based on the viewport width—eliminating the need for multiple media query breakpoints for typography.</p>
                    <p>CodeHelper's <strong>Clamp Generator</strong> calculates the optimal viewport-based slope and intercept so your font sizes and spacing values scale perfectly across all screen sizes.</p>

                    <h3>Why use CSS clamp() for fluid typography?</h3>
                    <ul>
                        <li><strong>No more breakpoints</strong>: Instead of writing <code>@media</code> queries for every font size, one <code>clamp()</code> value handles everything.</li>
                        <li><strong>Smooth scaling</strong>: Text grows and shrinks linearly between your minimum and maximum sizes as the viewport changes.</li>
                        <li><strong>Better performance</strong>: Fewer media queries mean less CSS and faster rendering.</li>
                        <li><strong>Design systems</strong>: Use clamp() values in your Tailwind config or CSS custom properties for a consistent fluid type scale.</li>
                    </ul>

                    <h3>How to use the CSS Clamp Generator</h3>
                    <ol>
                        <li>Set your minimum font size and the minimum viewport width where it applies.</li>
                        <li>Set your maximum font size and the maximum viewport width.</li>
                        <li>The tool calculates the <code>clamp()</code> value with the correct <code>vw</code> slope.</li>
                        <li>Preview the live scaling behavior and copy the generated CSS.</li>
                    </ol>

                    <p>Whether you are building a design system, fine-tuning responsive headings, or implementing a fluid type scale for a marketing site, this free CSS clamp generator will save you hours of manual calculation.</p>
                </section>
            `
        }
    },

    'var-dump-formatter': {
        title: 'Var Dump Formatter',
        description: 'Beautify and format PHP var_dump() output.',
        category: 'formatter',
        component: () =>
            import('~/components/tools/formatter/VarDumpFormatter.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `PHP var_dump() Formatter & Beautifier – Pretty Print Online – ${BRAND}`,
            description:
                'Paste messy PHP var_dump() output and get clean, readable formatting instantly. Supports arrays, objects, and nested structures. Free online tool, no signup needed.',
            ogImage: OG,
            keywords:
                'PHP var_dump, formatter, pretty print, PHP arrays, dump viewer, debug tool, PHP debugging, var_dump pretty, pretty var_dump, var_dump beautifier, php var_dump pretty online',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Var Dump Formatter',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                featureList: ['Format var_dump() output', 'Readable structure', 'Copy formatted text'],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', ratingCount: '12' }
            },
            seoContent: `
                <section>
                    <h2>What is a PHP Var Dump Formatter?</h2>
                    <p>
                        A <strong>PHP var_dump() formatter</strong> is a specialized utility designed to take the raw, often messy output of PHP's debugging functions and transform it into a structured, readable format. 
                        When developers use <code>var_dump()</code> or <code>print_r()</code> on large arrays or deeply nested objects, the resulting output can be a single, unformatted block of text that is nearly impossible to analyze.
                    </p>
                    <p>
                        CodeHelper's Var Dump Beautifier instantly cleans up this output, adding proper indentation, line breaks, and structure, making it easy to see key-value pairs and object properties.
                    </p>

                    <h3>Var_dump vs. Print_r: Which one should you use?</h3>
                    <ul>
                        <li><strong>var_dump($var)</strong>: Provides the most detailed information, including data types (string, int, float) and lengths. It is essential for strict type checking.</li>
                        <li><strong>print_r($var)</strong>: Produces a more "human-readable" output but omits data types. It's great for a quick look at array structures.</li>
                        <li><strong>var_export($var)</strong>: Generates valid PHP code that can be copy-pasted back into a script to recreate the variable.</li>
                    </ul>

                    <h3>How to use the Var Dump Pretty Printer</h3>
                    <ol>
                        <li>Paste your raw PHP output into the input field.</li>
                        <li>Click the <strong>"Format"</strong> button.</li>
                        <li>The tool will automatically detect if it's a <code>var_dump</code>, <code>print_r</code>, or even JSON.</li>
                        <li>Copy the beautified result for your documentation or debugging logs.</li>
                    </ol>

                    <p>
                        Whether you are debugging a WordPress plugin, a Laravel application, or a legacy PHP script, having a clear view of your data is the first step toward fixing bugs faster.
                    </p>
                </section>
            `
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
            },
            seoContent: `
                <section>
                    <h2>What is an HTML Minifier?</h2>
                    <p>An <strong>HTML minifier</strong> is a tool that reduces the file size of HTML documents by removing unnecessary characters—whitespace, comments, optional end tags, and redundant attributes—without changing how the page renders in a browser. Smaller HTML files load faster, consume less bandwidth, and improve your website's Core Web Vitals scores.</p>
                    <p>CodeHelper's <strong>HTML Optimizer</strong> uses a professional parser engine and can reduce HTML size by up to 70%, while also offering a beautify mode to format messy HTML for readability.</p>

                    <h3>Minify vs. Beautify HTML</h3>
                    <ul>
                        <li><strong>Minify</strong>: Remove all whitespace, comments, and optional tags to produce the smallest possible output for production deployment.</li>
                        <li><strong>Beautify</strong>: Add proper indentation and line breaks to unformatted or minified HTML for easier editing and code review.</li>
                        <li><strong>Advanced Options</strong>: Choose to preserve certain comments, keep <code>&lt;pre&gt;</code> and <code>&lt;code&gt;</code> content intact, normalize boolean attributes, and remove default type attributes.</li>
                    </ul>

                    <h3>How to minify HTML online</h3>
                    <ol>
                        <li>Paste your HTML into the input area or upload an HTML file.</li>
                        <li>Choose <strong>Minify</strong> or <strong>Beautify</strong> mode.</li>
                        <li>Adjust advanced options for fine-grained control.</li>
                        <li>View the size statistics showing bytes saved and compression percentage.</li>
                        <li>Copy the output or download the optimized file.</li>
                    </ol>

                    <p>Whether you are optimizing email templates, hand-written HTML pages, or static site output, this free HTML minifier helps you ship leaner, faster-loading web pages.</p>
                </section>
            `
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
            },
            seoContent: `
                <section>
                    <h2>What is a Viewport Unit Converter?</h2>
                    <p>A <strong>viewport unit converter</strong> is a tool that translates pixel (px) values into CSS viewport-relative units—<code>vw</code>, <code>vh</code>, <code>vmin</code>, <code>vmax</code>—and modern units like <code>dvh</code> (dynamic viewport height), <code>svh</code> (small viewport height), and container query units (<code>cqw</code>, <code>cqh</code>). These units are essential for building truly responsive layouts that adapt to any screen size without fixed breakpoints.</p>
                    <p>CodeHelper's <strong>Viewport Unit Converter</strong> includes 18 device presets, batch conversion, and a built-in fluid <code>clamp()</code> generator.</p>

                    <h3>Modern CSS Viewport Units Explained</h3>
                    <ul>
                        <li><strong>vw / vh</strong>: Classic viewport width and height. 1vw = 1% of the viewport width.</li>
                        <li><strong>dvh</strong>: Dynamic viewport height—adjusts when the browser's address bar shows or hides on mobile.</li>
                        <li><strong>svh / lvh</strong>: Small and large viewport height variants for stable full-screen layouts.</li>
                        <li><strong>cqw / cqh</strong>: Container query units that respond to the parent container's size, not the viewport.</li>
                    </ul>

                    <h3>How to convert px to vw/vh</h3>
                    <ol>
                        <li>Select a device preset or enter a custom viewport width/height.</li>
                        <li>Enter the pixel value you want to convert.</li>
                        <li>Choose the target unit (vw, vh, dvh, cqw, etc.).</li>
                        <li>Use batch mode to convert multiple values at once.</li>
                        <li>Copy the generated CSS value or clamp() expression.</li>
                    </ol>

                    <p>Whether you are building mobile-first layouts, fixing the classic "100vh on iOS" problem with <code>dvh</code>, or implementing container query-based components, this free viewport unit calculator is an indispensable tool.</p>
                </section>
            `
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
            },
            seoContent: `
                <section>
                    <h2>What is an SVG Icon Generator?</h2>
                    <p>An <strong>SVG icon generator</strong> is a visual design tool that lets you create, customize, and export scalable vector icons for web and app projects. SVG icons are resolution-independent, meaning they look crisp on any screen—from small mobile displays to 4K monitors—and are typically much smaller in file size than raster icon images.</p>
                    <p>CodeHelper's <strong>SVG Icon Generator</strong> includes 33+ pre-made shapes, import support for existing SVG files, and export to multiple sizes simultaneously for icon packs.</p>

                    <h3>Key Features</h3>
                    <ul>
                        <li><strong>33+ Shape Library</strong>: Stars, hearts, triangles, arrows, badges, and more—ready to customize instantly.</li>
                        <li><strong>Import SVG</strong>: Upload an existing SVG file and edit its paths directly in the tool.</li>
                        <li><strong>Export Icon Pack</strong>: Download your icon in multiple sizes (16px to 512px) for favicons, app icons, and UI kits.</li>
                        <li><strong>Alignment Tools</strong>: Center horizontally/vertically, send to front/back, snap to grid.</li>
                        <li><strong>Color Presets</strong>: Quickly apply common UI color schemes and save recent colors.</li>
                    </ul>

                    <h3>How to create a custom SVG icon</h3>
                    <ol>
                        <li>Pick a base shape from the library or import an existing SVG.</li>
                        <li>Adjust fill color, stroke width, and stroke color.</li>
                        <li>Drag and resize the shape on the canvas.</li>
                        <li>Use alignment tools to center and position precisely.</li>
                        <li>Export as SVG or PNG in the sizes you need.</li>
                    </ol>

                    <p>Whether you are creating favicons, building a UI icon library, or designing custom icons for an app, this free SVG icon maker delivers professional results in minutes.</p>
                </section>
            `
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
            },
            seoContent: `
                <section>
                    <h2>What is an SVG Wave Generator?</h2>
                    <p>An <strong>SVG wave generator</strong> is a design tool that creates smooth, customizable wave shapes as scalable vector graphics. SVG waves are widely used in modern web design as decorative section dividers, hero backgrounds, and page separators—giving websites a polished, professional look without relying on heavy image files.</p>
                    <p>CodeHelper's <strong>SVG Wave Generator</strong> lets you build multi-layered waves with custom colors, amplitudes, and frequencies, then download the result or copy the SVG code directly.</p>

                    <h3>Why use SVG waves in web design?</h3>
                    <ul>
                        <li><strong>Lightweight</strong>: An SVG wave is just a few bytes of code compared to a PNG or JPEG background image.</li>
                        <li><strong>Scalable</strong>: SVG graphics look perfect at any resolution—ideal for responsive designs and Retina displays.</li>
                        <li><strong>Animatable</strong>: SVG waves can be animated with CSS or JavaScript for stunning motion effects.</li>
                        <li><strong>Customizable</strong>: Change colors, layers, amplitude, and frequency to match any brand palette.</li>
                    </ul>

                    <h3>How to generate an SVG wave</h3>
                    <ol>
                        <li>Adjust the amplitude and frequency sliders to shape your wave.</li>
                        <li>Add multiple layers for a depth effect with different colors.</li>
                        <li>Set the wave and background colors to match your design.</li>
                        <li>Preview the result in real time on the canvas.</li>
                        <li>Download the SVG file or copy the code to embed in your HTML.</li>
                    </ol>

                    <p>Whether you are building a landing page hero section, a section divider, or an animated background, this free SVG wave generator is the fastest way to add beautiful wave shapes to your website.</p>
                </section>
            `
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
            },
            seoContent: `
                <section>
                    <h2>What is an Aspect Ratio Calculator?</h2>
                    <p>An <strong>aspect ratio calculator</strong> is a tool that computes the proportional relationship between an image or screen's width and height. Aspect ratio is expressed as two numbers separated by a colon (e.g., 16:9, 4:3, 1:1) and is critical for maintaining visual consistency when resizing images, designing responsive layouts, or specifying video dimensions.</p>
                    <p>CodeHelper's <strong>Aspect Ratio Calculator</strong> works in both directions: calculate the ratio from pixel dimensions, or determine missing dimensions from a known ratio and one side.</p>

                    <h3>Common Aspect Ratios</h3>
                    <ul>
                        <li><strong>16:9</strong>: Standard widescreen for HD video, YouTube, and most monitors.</li>
                        <li><strong>4:3</strong>: Classic TV and older monitor format, still used in some presentations.</li>
                        <li><strong>1:1</strong>: Square format, popularized by Instagram profile images and thumbnails.</li>
                        <li><strong>9:16</strong>: Vertical video format for mobile, TikTok, Instagram Reels, and Stories.</li>
                        <li><strong>21:9</strong>: Ultrawide cinematic format for immersive displays and film.</li>
                    </ul>

                    <h3>How to use the Aspect Ratio Calculator</h3>
                    <ol>
                        <li>Enter width and height in pixels to calculate the reduced ratio.</li>
                        <li>Or enter a known ratio and one dimension to solve for the missing side.</li>
                        <li>Use the fit/cover preview to visualize how your image fills a container.</li>
                        <li>Copy the generated CSS <code>aspect-ratio</code> property for your stylesheet.</li>
                    </ol>

                    <p>Whether you are designing responsive images, preparing video thumbnails, planning print layouts, or implementing CSS <code>aspect-ratio</code> containers, this free calculator ensures your dimensions are always mathematically correct.</p>
                </section>
            `
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
            },
            seoContent: `
                <section>
                    <h2>What is an Aspect Frame Generator?</h2>
                    <p>An <strong>aspect frame generator</strong> is a tool that creates matte-style frame overlays—the black bars you see in cinematic videos that create a letterbox or pillarbox effect. These frames are used in video production, photography, social media content creation, and UI mockups to simulate different screen formats or add a cinematic look to footage.</p>
                    <p>CodeHelper's <strong>Aspect Frame Generator</strong> lets you choose from common cinema aspect ratios, set a custom resolution, and download a transparent PNG overlay ready to use in your video editor or image editor.</p>

                    <h3>Common Use Cases</h3>
                    <ul>
                        <li><strong>Letterboxing</strong>: Add black bars top and bottom to simulate a 2.39:1 or 21:9 cinematic frame on 16:9 footage.</li>
                        <li><strong>Pillarboxing</strong>: Add bars to the sides to center 4:3 or 1:1 content on a wider display.</li>
                        <li><strong>Social Media Frames</strong>: Create consistent frame overlays for Instagram, TikTok, or YouTube content.</li>
                        <li><strong>UI Mockups</strong>: Use matte frames to present app screenshots in a specific device aspect ratio.</li>
                    </ul>

                    <h3>How to generate a matte frame</h3>
                    <ol>
                        <li>Select the target aspect ratio for the frame (e.g., 2.39:1 for anamorphic cinema).</li>
                        <li>Enter the resolution of your source media (e.g., 1920×1080).</li>
                        <li>Preview the frame overlay on the canvas.</li>
                        <li>Download the PNG with a transparent center to overlay on your media.</li>
                    </ol>

                    <p>Whether you are a videographer adding cinematic bars, a photographer creating consistent Instagram crops, or a designer building UI mockups, this free aspect frame generator delivers precise results instantly.</p>
                </section>
            `
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
            },
            seoContent: `
                <section>
                    <h2>What is a Lorem Ipsum Generator?</h2>
                    <p>A <strong>Lorem Ipsum generator</strong> creates placeholder text used in design mockups, wireframes, and prototypes. The classic "Lorem ipsum" passage, derived from a work by Cicero, has been used as dummy text in the printing and typesetting industry since the 1500s. Today, it remains the go-to filler text for designers and developers who need realistic-looking content without writing the actual copy.</p>
                    <p>CodeHelper's <strong>Lorem Ipsum Generator</strong> supports multiple generation modes and text variants, giving you full control over how much placeholder text you need.</p>

                    <h3>Generation Modes</h3>
                    <ul>
                        <li><strong>By Words</strong>: Generate an exact number of lorem ipsum words—perfect for testing headlines and short copy fields.</li>
                        <li><strong>By Paragraphs</strong>: Generate multiple paragraphs for body text mockups.</li>
                        <li><strong>By Characters</strong>: Limit output to a precise character count for tight UI constraints like meta descriptions or tweet-length copy.</li>
                        <li><strong>Multiple Variants</strong>: Choose from classic Lorem Ipsum or other text variants for variety.</li>
                    </ul>

                    <h3>How to generate Lorem Ipsum text</h3>
                    <ol>
                        <li>Choose your generation mode: words, paragraphs, or characters.</li>
                        <li>Set the quantity you need.</li>
                        <li>Select a text variant if desired.</li>
                        <li>Click <strong>Generate</strong> to produce the placeholder text.</li>
                        <li>Copy the output directly to your design tool or code editor.</li>
                    </ol>

                    <p>Whether you are designing a landing page, building a CMS template, or testing a form layout, this free Lorem Ipsum generator gives you the right amount of filler text in seconds.</p>
                </section>
            `
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
            },
            seoContent: `
                <section>
                    <h2>What is a Text Case Converter?</h2>
                    <p>A <strong>text case converter</strong> is a tool that transforms text between different letter casing styles. Whether you need to change text to UPPERCASE for a headline, convert a variable name from camelCase to snake_case, or quickly capitalize a sentence, a case converter does the job instantly without manual editing.</p>
                    <p>CodeHelper's <strong>Text Case Converter</strong> supports 15+ case transformations including programming-specific formats like camelCase, PascalCase, snake_case, kebab-case, and CONSTANT_CASE.</p>

                    <h3>Supported Case Formats</h3>
                    <ul>
                        <li><strong>UPPERCASE / lowercase</strong>: The classic all-caps or all-lowercase transformations.</li>
                        <li><strong>Title Case</strong>: Capitalizes the first letter of each word—great for headings.</li>
                        <li><strong>Sentence case</strong>: Capitalizes only the first word of a sentence.</li>
                        <li><strong>camelCase</strong>: Joins words with no separator, capitalizing each word after the first. Used in JavaScript, Java, and most APIs.</li>
                        <li><strong>snake_case</strong>: Words joined with underscores. Common in Python, Ruby, and database column names.</li>
                        <li><strong>kebab-case</strong>: Words joined with hyphens. Standard for CSS class names and URL slugs.</li>
                        <li><strong>PascalCase</strong>: Like camelCase but the first letter is also capitalized. Used for class names and components.</li>
                    </ul>

                    <h3>How to convert text case</h3>
                    <ol>
                        <li>Paste or type your text into the input field.</li>
                        <li>Click the desired case format button.</li>
                        <li>The converted text appears in the output panel instantly.</li>
                        <li>Copy the result or swap input and output to chain conversions.</li>
                    </ol>

                    <p>Whether you are renaming variables, formatting CSV headers, preparing content for a CMS, or converting API field names, this free text case converter handles any transformation in a click.</p>
                </section>
            `
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
            },
            seoContent: `
                <section>
                    <h2>What is a Color Shades Generator?</h2>
                    <p>A <strong>color shades generator</strong> is a tool that takes a single base color and produces a range of lighter tints and darker shades from it. A well-structured color scale is fundamental to building consistent design systems, UI component libraries, and brand color palettes. Instead of manually picking lighter and darker variants by eye, a shades generator gives you mathematically balanced results.</p>
                    <p>CodeHelper's <strong>Color Shades Generator</strong> creates 10+ tints and shades from any HEX color, formatted in a Tailwind CSS-compatible scale (50 to 950).</p>

                    <h3>Tints vs Shades</h3>
                    <ul>
                        <li><strong>Tints</strong>: Created by mixing a color with white—progressively lighter versions toward pure white.</li>
                        <li><strong>Shades</strong>: Created by mixing a color with black—progressively darker versions toward pure black.</li>
                        <li><strong>Design System Use</strong>: Tools like Tailwind CSS use a 50-950 scale (50 being the lightest, 950 the darkest) for each color in the palette.</li>
                    </ul>

                    <h3>How to generate color shades</h3>
                    <ol>
                        <li>Enter or pick a base HEX color using the color picker.</li>
                        <li>The tool generates the full tints and shades scale instantly.</li>
                        <li>Hover over any swatch to see the HEX code.</li>
                        <li>Click any swatch to copy its HEX value to the clipboard.</li>
                        <li>Use the scale directly in your Tailwind config, CSS variables, or design tokens.</li>
                    </ol>

                    <p>Whether you are building a design system, creating Tailwind color extensions, or choosing hover and focus states for UI components, this free color shades generator gives you a complete, production-ready color scale from any base color.</p>
                </section>
            `
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
            },
            seoContent: `
                <section>
                    <h2>What is a CSS Box Shadow Generator?</h2>
                    <p>A <strong>CSS box shadow generator</strong> is a visual tool for creating and previewing CSS <code>box-shadow</code> declarations. The <code>box-shadow</code> property adds shadow effects around an element's frame, and its syntax—offset-x, offset-y, blur-radius, spread-radius, color, and inset—can be tricky to write by hand without seeing the result.</p>
                    <p>CodeHelper's <strong>Box Shadow Designer</strong> gives you interactive sliders for every parameter, a live preview on a real element, and a one-click copy of the final CSS code.</p>

                    <h3>Box Shadow Parameters</h3>
                    <ul>
                        <li><strong>Offset X / Y</strong>: Move the shadow horizontally and vertically relative to the element.</li>
                        <li><strong>Blur Radius</strong>: Soften the shadow edges—higher values create a more diffuse, realistic shadow.</li>
                        <li><strong>Spread Radius</strong>: Expand or contract the shadow size beyond the element's bounds.</li>
                        <li><strong>Color</strong>: Set shadow color with opacity (rgba) for subtle, layered depth effects.</li>
                        <li><strong>Inset</strong>: Render the shadow inside the element, creating a pressed or embossed appearance.</li>
                    </ul>

                    <h3>How to design a CSS box shadow</h3>
                    <ol>
                        <li>Adjust the offset sliders to position the shadow.</li>
                        <li>Set blur and spread to control shadow softness and size.</li>
                        <li>Pick a shadow color with the color picker.</li>
                        <li>Toggle inset for an inner shadow effect.</li>
                        <li>Copy the generated CSS and paste it into your stylesheet.</li>
                    </ol>

                    <p>Whether you are creating Material Design elevation shadows, subtle card lifts, neumorphism effects, or deep dramatic shadows, this free CSS box-shadow generator makes it visual and effortless.</p>
                </section>
            `
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
            },
            seoContent: `
                <section>
                    <h2>What is a Color Converter?</h2>
                    <p>A <strong>color converter</strong> is a tool that translates color values between different formats used in design and development. Designers work in HEX codes, CSS developers use RGB and HSL, print designers need CMYK values, and accessibility audits require contrast ratios. Having all these formats in one tool eliminates constant back-and-forth between applications.</p>
                    <p>CodeHelper's <strong>Color Converter & Analyzer</strong> goes beyond simple conversion—it includes a WCAG accessibility checker, a color blindness simulator, a color harmony generator, and export to Tailwind, SCSS, and CSS custom properties.</p>

                    <h3>Supported Color Formats</h3>
                    <ul>
                        <li><strong>HEX</strong>: The most common web format (e.g., #FF5733). Supports 3-digit and 8-digit (with alpha) variants.</li>
                        <li><strong>RGB / RGBA</strong>: Red, Green, Blue values from 0–255 with optional alpha transparency.</li>
                        <li><strong>HSL / HSLA</strong>: Hue (0–360°), Saturation (%), and Lightness (%)—the most intuitive format for designers.</li>
                        <li><strong>CMYK</strong>: Cyan, Magenta, Yellow, Black percentages for print color reproduction.</li>
                    </ul>

                    <h3>How to convert colors</h3>
                    <ol>
                        <li>Enter a color value in any format or use the native eyedropper to pick from your screen.</li>
                        <li>All other formats update in real time.</li>
                        <li>Check WCAG AA/AAA contrast ratios against white and black backgrounds.</li>
                        <li>Preview how the color appears to users with color vision deficiencies.</li>
                        <li>Generate complementary or triadic color harmonies, then export to CSS/Tailwind.</li>
                    </ol>

                    <p>Whether you are checking accessibility compliance, implementing a design spec, or finding the perfect color for your brand, this free color converter and analyzer is a complete color workstation in your browser.</p>
                </section>
            `
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
            },
            seoContent: `
                <section>
                    <h2>What is a Color Palette Generator?</h2>
                    <p>A <strong>color palette generator</strong> is a tool that creates harmonious sets of colors based on color theory principles. Building a coherent color palette is one of the most important—and challenging—aspects of visual design. Whether you are creating a brand identity, designing a web application, or building a component library, a well-chosen palette ensures visual harmony and accessibility.</p>
                    <p>CodeHelper's <strong>Color Palette Generator</strong> offers six harmony schemes, a full Material Design palette generator, WCAG accessibility checking, and export to CSS, SCSS, JSON, and Tailwind Config.</p>

                    <h3>Color Harmony Schemes</h3>
                    <ul>
                        <li><strong>Monochromatic</strong>: A Tailwind-style scale of 10 shades derived from a single base color.</li>
                        <li><strong>Material Design</strong>: The full 500-level primary + accent palette used in Google's Material Design system.</li>
                        <li><strong>Analogous</strong>: Colors adjacent on the color wheel—creates calm, cohesive palettes.</li>
                        <li><strong>Complementary</strong>: Opposite colors on the wheel—high contrast and visually dynamic.</li>
                        <li><strong>Triadic</strong>: Three equally spaced hues—vibrant and balanced.</li>
                        <li><strong>Split-Complementary</strong>: A base color plus two colors adjacent to its complement—contrast with less tension.</li>
                    </ul>

                    <h3>How to generate a color palette</h3>
                    <ol>
                        <li>Pick a base color with the HEX color picker.</li>
                        <li>Choose a color harmony scheme.</li>
                        <li>Lock colors you want to keep and shuffle the rest.</li>
                        <li>Check WCAG contrast ratios with the accessibility checker.</li>
                        <li>Export to CSS variables, SCSS, JSON, or Tailwind config.</li>
                    </ol>

                    <p>Whether you are designing a SaaS product, a brand identity system, or a component library, this free color palette generator helps you create beautiful, accessible color systems with ease.</p>
                </section>
            `
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
            },
            seoContent: `
                <section>
                    <h2>What is an Image Color Picker?</h2>
                    <p>An <strong>image color picker</strong> is a tool that lets you sample exact color values directly from an uploaded image. Instead of guessing a color by eye or searching for a brand's hex code, you simply upload the image and click to extract the precise HEX, RGB, or HSL value from any pixel. This is invaluable for matching colors from logos, photographs, or design mockups.</p>
                    <p>CodeHelper's <strong>Image Color Picker</strong> combines pixel-level sampling with a magnifier and k-means clustering to automatically extract a dominant color palette from any image.</p>

                    <h3>Key Features</h3>
                    <ul>
                        <li><strong>Precision Magnifier</strong>: A 3×–12× zoom lens lets you sample the exact pixel you need, even from detailed images.</li>
                        <li><strong>K-Means Palette Extraction</strong>: Automatically identifies the 6 most dominant colors in your image using machine learning clustering.</li>
                        <li><strong>Multiple Output Formats</strong>: Get colors as HEX, RGB, RGBA, or HSL instantly.</li>
                        <li><strong>Color History</strong>: Keeps your last 10 sampled colors for easy comparison.</li>
                        <li><strong>Export Options</strong>: Export the extracted palette to CSS variables, SCSS, JSON, or Tailwind config.</li>
                    </ul>

                    <h3>How to pick colors from an image</h3>
                    <ol>
                        <li>Upload an image by dragging and dropping or using the file picker.</li>
                        <li>Hover over the image to use the magnifier and click to sample a pixel color.</li>
                        <li>Switch to the <strong>Palette</strong> tab to view the auto-extracted dominant colors.</li>
                        <li>Copy any color value in your preferred format.</li>
                        <li>Export the full palette to your preferred format for use in code.</li>
                    </ol>

                    <p>Whether you are matching a client's brand colors from their logo, extracting a color palette from a photograph for a moodboard, or building a design token set from existing assets, this free image color picker is the most accurate tool available.</p>
                </section>
            `
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
            },
            seoContent: `
                <section>
                    <h2>What is a Dev Notepad?</h2>
                    <p>A <strong>Dev Notepad</strong> is a browser-based text editor designed specifically for developers—combining the simplicity of a notepad with developer-focused features like Markdown rendering, syntax highlighting, regex search, and version history. Unlike generic note-taking apps, it is built for writing code snippets, documentation drafts, and structured notes that benefit from markup and formatting.</p>
                    <p>CodeHelper's <strong>Dev Notepad</strong> saves all data locally in your browser using localStorage, meaning your notes are completely private and available offline.</p>

                    <h3>Key Features</h3>
                    <ul>
                        <li><strong>Markdown Editor</strong>: Write in Markdown with a live preview that renders headings, code blocks, lists, and links.</li>
                        <li><strong>HTML WYSIWYG Mode</strong>: Switch to a rich text editor for HTML-formatted notes.</li>
                        <li><strong>Multi-tab Support</strong>: Manage multiple notes simultaneously in separate tabs without losing context.</li>
                        <li><strong>Version History</strong>: Take snapshots of your notes and restore previous versions anytime.</li>
                        <li><strong>Regex Search & Replace</strong>: Find and transform content in your notes with full regular expression support.</li>
                        <li><strong>Export</strong>: Download notes as Markdown (.md), HTML, or plain text files.</li>
                    </ul>

                    <h3>How to use the Dev Notepad</h3>
                    <ol>
                        <li>Open a new tab in the notepad and start writing.</li>
                        <li>Toggle Markdown preview to see rendered output alongside your raw text.</li>
                        <li>Use regex search to find and bulk-replace content across your note.</li>
                        <li>Save a version snapshot before making major changes.</li>
                        <li>Export the note to share or archive outside the browser.</li>
                    </ol>

                    <p>Whether you are jotting down a code snippet, drafting technical documentation, or keeping a project journal, this free developer notepad keeps your notes organized and accessible without any account or sync setup.</p>
                </section>
            `
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
            },
            seoContent: `
                <section>
                    <h2>What is a CSS Formatter & Minifier?</h2>
                    <p>A <strong>CSS formatter</strong> (also called a CSS beautifier) takes compressed or poorly indented CSS code and restructures it into a clean, readable format with consistent indentation and line breaks. A <strong>CSS minifier</strong> does the opposite—it strips all unnecessary whitespace, comments, and redundant characters to reduce file size and improve page load performance.</p>
                    <p>CodeHelper's <strong>CSS Formatter Pro</strong> handles both tasks in one place, with additional optimizations like property sorting, hex color shortening, and zero-unit removal.</p>

                    <h3>Beautify vs. Minify: when to use each</h3>
                    <ul>
                        <li><strong>Beautify/Format</strong>: Use during development for readability, code reviews, and debugging. Consistent formatting makes it easy to spot errors and collaborate with teammates.</li>
                        <li><strong>Minify/Compress</strong>: Use before deploying to production. Removing whitespace and comments can reduce CSS file size by up to 50%, speeding up page loads and improving Core Web Vitals scores.</li>
                        <li><strong>Sort Properties</strong>: Alphabetically ordering CSS properties improves consistency across large codebases and makes diffs easier to review.</li>
                    </ul>

                    <h3>How to format or minify CSS online</h3>
                    <ol>
                        <li>Paste your CSS code into the input field.</li>
                        <li>Choose <strong>Beautify</strong> to format or <strong>Minify</strong> to compress.</li>
                        <li>Enable optional optimizations: sort properties, shorten colors, or remove zero units.</li>
                        <li>Copy the result or download the <code>.css</code> file directly.</li>
                    </ol>

                    <p>Whether you are cleaning up a legacy stylesheet, optimizing a React or Vue project, or preparing CSS for a WordPress theme, this free online CSS formatter ensures your code is always production-ready.</p>
                </section>
            `
        }
    },

    'clip-path-maker': {
        title: 'Clip Path Maker',
        description: 'Visually create CSS clip-path polygons, circles, and ellipses with draggable handles. Export clean CSS code with modern harmonized UI.',
        category: 'imaging',
        component: () => import('~/components/tools/imaging/ClipPathMaker.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `CSS Clip-Path Generator – Polygon, Circle & Ellipse Editor – ${BRAND}`,
            description:
                'Visual CSS clip-path generator with drag-and-drop points. Create polygon, circle, and ellipse shapes, preview on images, and copy clean CSS code. Free online tool.',
            ogImage: OG,
            keywords:
                'css clip-path generator, polygon editor, clip path maker, image clipping, css shapes, polygon points, circle clip-path, ellipse clip-path, visual css editor, draggable points, clip-path polygon, css masking, shape generator, web design tool, clip path generator, clip-path maker, polygon clip path, css shapes generator',
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
            },
            seoContent: `
                <section>
                    <h2>What is CSS Clip-Path?</h2>
                    <p>
                        The <code>clip-path</code> CSS property creates a clipping region that sets what part of an element should be shown. 
                        Parts that are inside the region are shown, while those outside are hidden. Unlike the older <code>clip</code> property, 
                        <code>clip-path</code> supports complex shapes like polygons, circles, and ellipses.
                    </p>
                    <p>
                        This tool is a <strong>visual CSS clip-path generator</strong> that helps you design these shapes interactively without manual coordinate calculation.
                    </p>

                    <h3>How to use the Clip Path Maker</h3>
                    <ol>
                        <li><strong>Choose a Base Shape</strong>: Select between Polygon, Circle, or Ellipse.</li>
                        <li><strong>Manipulate Points</strong>: For polygons, drag the handles directly on the preview image to create your desired shape.</li>
                        <li><strong>Add/Remove Points</strong>: Use the "Add Point" button to create more complex polygons.</li>
                        <li><strong>Customize Preview</strong>: Upload your own image to see exactly how the clipping will look on your specific project assets.</li>
                        <li><strong>Copy CSS</strong>: Once satisfied, copy the generated <code>clip-path</code> code and paste it into your stylesheet.</li>
                    </ol>

                    <h3>Polygon vs. Circle vs. Ellipse</h3>
                    <ul>
                        <li><strong>Polygon</strong>: The most versatile shape, defined by a set of (x, y) coordinates. Perfect for triangles, stars, or custom geometric backgrounds.</li>
                        <li><strong>Circle</strong>: Defined by a radius and a center point. Great for rounded profile pictures or circular UI elements.</li>
                        <li><strong>Ellipse</strong>: Similar to a circle but with different horizontal and vertical radii, allowing for oval shapes.</li>
                    </ul>

                    <p>
                        Using <code>clip-path</code> is a performant way to create unique web designs as it doesn't require extra image files or heavy SVG structures for simple clipping tasks. 
                        It is widely supported in all modern browsers including Chrome, Firefox, Safari, and Edge.
                    </p>
                </section>
            `
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
            },
            seoContent: `
                <section>
                    <h2>What is an Image Compressor?</h2>
                    <p>An <strong>image compressor</strong> is a tool that reduces the file size of images while preserving acceptable visual quality. Large images are one of the biggest contributors to slow page load times—compressing them is one of the highest-impact optimizations you can make for web performance, Core Web Vitals, and SEO.</p>
                    <p>CodeHelper's <strong>Image Compressor</strong> processes images entirely in your browser using client-side JavaScript, so your photos are never uploaded to any server—ensuring complete privacy. It supports JPEG, PNG, WebP, and AVIF formats with batch processing and ZIP download.</p>

                    <h3>Key Features</h3>
                    <ul>
                        <li><strong>Smart Compression</strong>: Automatically detects the best format and quality settings for each image.</li>
                        <li><strong>Target File Size Mode</strong>: Specify a target file size and the tool uses binary search to find the optimal quality setting.</li>
                        <li><strong>EXIF Viewer</strong>: View camera metadata including model, aperture, shutter speed, ISO, and GPS coordinates.</li>
                        <li><strong>Batch Processing</strong>: Compress multiple images at once and download them as a ZIP archive.</li>
                        <li><strong>Format Conversion</strong>: Convert JPEG/PNG images to modern WebP or AVIF for even smaller file sizes.</li>
                    </ul>

                    <h3>How to compress images online</h3>
                    <ol>
                        <li>Drag and drop your images or click to upload (JPEG, PNG, WebP, AVIF).</li>
                        <li>Choose compression mode: smart, custom quality, or target file size.</li>
                        <li>Optionally convert to WebP or AVIF for maximum compression.</li>
                        <li>Review before/after file sizes and compression ratios.</li>
                        <li>Download individual files or all files as a ZIP archive.</li>
                    </ol>

                    <p>Whether you are optimizing product images for an e-commerce site, reducing photo sizes for email, or bulk-compressing a gallery for web publishing, this free batch image compressor handles it all without leaving your browser.</p>
                </section>
            `
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
            },
            seoContent: `
                <section>
                    <h2>What is a UNIX Timestamp Converter?</h2>
                    <p>A <strong>UNIX timestamp converter</strong> is a tool that translates epoch time values—the number of seconds (or milliseconds) since January 1, 1970 00:00:00 UTC—into human-readable dates and times. UNIX timestamps are used ubiquitously in programming: database records, API responses, JWT expiration claims, server logs, and file metadata all commonly use this format.</p>
                    <p>CodeHelper's <strong>Time Converter</strong> auto-detects whether your timestamp is in seconds, milliseconds, or nanoseconds and converts it instantly to any timezone with DST-safe handling.</p>

                    <h3>Key Features</h3>
                    <ul>
                        <li><strong>Auto-detect Units</strong>: Automatically identifies seconds, milliseconds, and nanoseconds—no manual selection needed.</li>
                        <li><strong>Timezone Support</strong>: Convert to UTC, your local timezone, or any IANA timezone (America/New_York, Europe/Paris, etc.).</li>
                        <li><strong>ISO 8601 Output</strong>: Get dates in the standard ISO format used by APIs and databases.</li>
                        <li><strong>Human-readable Format</strong>: Understand timestamps as "2 hours ago" or "in 3 days" for quick context.</li>
                        <li><strong>Duration Calculator</strong>: Calculate the duration between two timestamps in days, hours, minutes, and seconds.</li>
                    </ul>

                    <h3>How to convert a UNIX timestamp</h3>
                    <ol>
                        <li>Paste a UNIX timestamp (seconds or milliseconds) into the input field.</li>
                        <li>The tool auto-detects the unit and shows the converted date and time.</li>
                        <li>Select a target timezone for localized output.</li>
                        <li>Use the duration calculator to find the difference between two timestamps.</li>
                        <li>Copy the formatted result in ISO 8601 or your preferred format.</li>
                    </ol>

                    <p>Whether you are debugging API responses, parsing JWT tokens, analyzing server logs, or working with date calculations in any programming language, this free epoch converter is an essential developer tool.</p>
                </section>
            `
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
            },
            seoContent: `
                <section>
                    <h2>What is a Mini Image Editor?</h2>
                    <p>A <strong>mini image editor</strong> is a lightweight, browser-based tool for performing quick image edits without needing to open a full application like Photoshop or GIMP. For everyday tasks—cropping a screenshot, resizing a photo for a blog post, rotating an image, or applying a filter before uploading—a mini editor in the browser is dramatically faster than launching a desktop application.</p>
                    <p>CodeHelper's <strong>Mini Image Editor</strong> processes everything locally in your browser with undo/redo support and export to PNG, JPEG, or WebP.</p>

                    <h3>Editing Tools</h3>
                    <ul>
                        <li><strong>Crop</strong>: Use visual drag handles to select and crop any area of your image.</li>
                        <li><strong>Resize</strong>: Set exact pixel dimensions while maintaining the original aspect ratio.</li>
                        <li><strong>Rotate & Flip</strong>: Rotate 90° in either direction or flip horizontally and vertically.</li>
                        <li><strong>13 Filter Presets</strong>: Apply Instagram-style filters including Clarendon, Gingham, Valencia, Lark, and more, with a global intensity slider.</li>
                        <li><strong>Fine Adjustments</strong>: Manually control brightness, contrast, saturation, hue, blur, and sharpness.</li>
                    </ul>

                    <h3>How to edit an image in the browser</h3>
                    <ol>
                        <li>Upload your image by dragging and dropping or using the file picker.</li>
                        <li>Use the toolbar to crop, resize, rotate, or flip as needed.</li>
                        <li>Apply a filter preset or adjust individual properties with the sliders.</li>
                        <li>Use undo/redo to explore different settings without risk.</li>
                        <li>Export the final image as PNG, JPEG, or WebP.</li>
                    </ol>

                    <p>Whether you are preparing a profile photo, editing a screenshot for documentation, adding an Instagram-style filter for social media, or quickly resizing images for a web page, this free browser image editor gets the job done in seconds.</p>
                </section>
            `
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
            },
            seoContent: `
                <section>
                    <h2>What is a Unit Converter?</h2>
                    <p>A <strong>unit converter</strong> is a tool that translates measurements between different units of the same physical quantity—converting kilometers to miles, kilograms to pounds, Celsius to Fahrenheit, and so on. Developers, engineers, scientists, and everyday users constantly encounter values in units that differ from what they need, making a fast, reliable converter essential.</p>
                    <p>CodeHelper's <strong>Unit Converter</strong> supports 80+ units across 10 categories including a unique CSS units category (px, rem, em) that is invaluable for front-end developers.</p>

                    <h3>Supported Categories</h3>
                    <ul>
                        <li><strong>Length</strong>: km, m, cm, mm, miles, yards, feet, inches—and more.</li>
                        <li><strong>Weight & Mass</strong>: tonnes, kg, g, mg, pounds, ounces, stone.</li>
                        <li><strong>Temperature</strong>: Celsius, Fahrenheit, Kelvin with exact conversion formulas.</li>
                        <li><strong>Speed</strong>: m/s, km/h, mph, knots, ft/s.</li>
                        <li><strong>CSS Units</strong>: px to rem, em, and back—with configurable root and context font sizes for accurate front-end calculations.</li>
                        <li><strong>Energy, Power, Pressure, Area, Volume</strong>: Complete scientific and engineering unit sets.</li>
                    </ul>

                    <h3>How to convert units</h3>
                    <ol>
                        <li>Select a category (e.g., Length, Temperature, CSS Units).</li>
                        <li>Choose the source unit and enter a value.</li>
                        <li>Select the target unit to see the converted result instantly.</li>
                        <li>Star units as favorites for quick access in future sessions.</li>
                        <li>View all conversions at once with the "Show All" mode.</li>
                    </ol>

                    <p>Whether you are converting metric to imperial for a recipe, calculating CSS pixel values for a design spec, or doing engineering calculations, this free unit converter handles every measurement you encounter in development and daily work.</p>
                </section>
            `
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
            },
            seoContent: `
                <section>
                    <h2>What is a Regex Tester?</h2>
                    <p>A <strong>regex tester</strong> is a tool for writing, testing, and debugging regular expressions—powerful pattern-matching syntax used in virtually every programming language. Regular expressions can validate email addresses, extract data from strings, find and replace text, parse log files, and much more. However, regex syntax is notoriously difficult to write correctly without instant feedback.</p>
                    <p>CodeHelper's <strong>Regex Tester</strong> highlights matches in real time, shows named groups, tests replacements, and includes a full cheat sheet and pattern library so you can write correct regex faster.</p>

                    <h3>Key Features</h3>
                    <ul>
                        <li><strong>Real-time Match Highlighting</strong>: Matches are highlighted in the test string as you type your pattern.</li>
                        <li><strong>Capture Groups & Named Groups</strong>: View all captured groups and their values for complex extraction patterns.</li>
                        <li><strong>Replace Preview</strong>: Test your <code>.replace()</code> pattern with a replacement string to verify the output.</li>
                        <li><strong>Flags Support</strong>: Toggle global (g), case-insensitive (i), multiline (m), dotAll (s), and unicode (u) flags.</li>
                        <li><strong>Pattern Library</strong>: A built-in library of common patterns—email, URL, IP address, date, phone number, and more.</li>
                        <li><strong>Regex Cheat Sheet</strong>: Quick reference for metacharacters, quantifiers, anchors, and assertions.</li>
                    </ul>

                    <h3>How to test a regular expression</h3>
                    <ol>
                        <li>Enter your regex pattern in the pattern field.</li>
                        <li>Paste or type your test string in the input area.</li>
                        <li>Matches are highlighted automatically in real time.</li>
                        <li>Review groups and captured values in the results panel.</li>
                        <li>Use the replace tab to test substitutions, then generate code for your language.</li>
                    </ol>

                    <p>Whether you are validating form inputs in JavaScript, parsing log files in Python, or writing complex search patterns for a text editor, this free online regex tester is the fastest way to get your pattern right.</p>
                </section>
            `
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
            },
            seoContent: `
                <section>
                    <h2>What is a Base64 Encoder/Decoder?</h2>
                    <p>A <strong>Base64 encoder/decoder</strong> is a tool that converts binary data—text, images, or files—into a text-safe ASCII representation using Base64 encoding, and reverses the process for decoding. Base64 is not encryption; it is an encoding scheme used when binary data needs to be transmitted over text-based protocols like HTTP, JSON, email (MIME), or embedded directly in HTML and CSS.</p>
                    <p>CodeHelper's <strong>Base64 Encoder/Decoder</strong> handles text, file uploads, and images—including generating data URLs for embedding images directly in HTML or CSS without separate file requests.</p>

                    <h3>Common Use Cases</h3>
                    <ul>
                        <li><strong>Data URLs</strong>: Embed small images directly in CSS (<code>background-image: url("data:image/png;base64,...")</code>) to eliminate HTTP requests.</li>
                        <li><strong>API Payloads</strong>: Encode binary files (PDFs, images) for transmission in JSON API bodies.</li>
                        <li><strong>Basic Auth</strong>: HTTP Basic Authentication encodes credentials as Base64 in the Authorization header.</li>
                        <li><strong>JWT Tokens</strong>: JSON Web Token headers and payloads are Base64URL encoded strings.</li>
                        <li><strong>Email Attachments</strong>: MIME encoding uses Base64 to encode file attachments in email messages.</li>
                    </ul>

                    <h3>How to encode or decode Base64</h3>
                    <ol>
                        <li>Choose <strong>Encode</strong> or <strong>Decode</strong> mode.</li>
                        <li>Paste text or upload a file/image.</li>
                        <li>The result appears instantly with size statistics.</li>
                        <li>For images, preview the decoded image directly in the tool.</li>
                        <li>Copy the output or download the decoded file.</li>
                    </ol>

                    <p>Whether you are debugging JWT tokens, embedding images as data URLs, working with API file uploads, or inspecting email MIME content, this free Base64 encoder and decoder is the fastest tool for the job.</p>
                </section>
            `
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
            },
            seoContent: `
                <section>
                    <h2>What is a CSS Border Radius Generator?</h2>
                    <p>A <strong>CSS border radius generator</strong> is a visual tool for creating rounded corners on HTML elements. The CSS <code>border-radius</code> property controls the curvature of an element's corners, and its extended elliptical syntax (<code>border-radius: 50% 20% / 30% 40%</code>) can produce organic blob shapes, pill buttons, tear-drop forms, and complex organic silhouettes that are impossible to visualize by writing values manually.</p>
                    <p>CodeHelper's <strong>Border Radius Generator</strong> provides interactive per-corner controls and a live preview so you can design any rounded shape visually.</p>

                    <h3>Border Radius Modes</h3>
                    <ul>
                        <li><strong>Uniform Radius</strong>: Set the same radius on all four corners with a single slider—perfect for buttons, cards, and input fields.</li>
                        <li><strong>Per-Corner Control</strong>: Independently adjust each corner (top-left, top-right, bottom-right, bottom-left) for asymmetric designs.</li>
                        <li><strong>Elliptical Radius</strong>: Control both the horizontal and vertical radii of each corner separately to create organic blob shapes and curved designs.</li>
                    </ul>

                    <h3>How to generate CSS border radius</h3>
                    <ol>
                        <li>Choose uniform or per-corner mode.</li>
                        <li>Drag the sliders or enter values directly to adjust each corner.</li>
                        <li>Enable elliptical mode for organic blob shapes.</li>
                        <li>Preview the result on a live element in the canvas.</li>
                        <li>Copy the generated CSS <code>border-radius</code> value and paste it into your stylesheet.</li>
                    </ol>

                    <p>Whether you are styling buttons, building card components, creating blob shapes for backgrounds, or designing pill badges, this free border radius generator makes it purely visual with instant CSS output.</p>
                </section>
            `
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
            },
            seoContent: `
                <section>
                    <h2>What is a JWT Decoder?</h2>
                    <p>A <strong>JWT decoder</strong> is a tool that parses and displays the contents of a JSON Web Token (JWT). JWTs are the most widely used authentication tokens in modern web applications—used by OAuth 2.0, OpenID Connect, and stateless REST APIs. They consist of three Base64URL-encoded parts: a header describing the algorithm, a payload containing claims (user data and metadata), and a signature for verification.</p>
                    <p>CodeHelper's <strong>JWT Decoder & Validator</strong> decodes tokens instantly and can verify HMAC signatures (HS256, HS384, HS512) entirely in your browser, so your tokens never leave your machine.</p>

                    <h3>JWT Claims Explained</h3>
                    <ul>
                        <li><strong>exp</strong>: Expiration time—the token is invalid after this UNIX timestamp.</li>
                        <li><strong>iat</strong>: Issued at—when the token was created.</li>
                        <li><strong>sub</strong>: Subject—typically the user ID the token represents.</li>
                        <li><strong>iss</strong>: Issuer—the entity that created the token (e.g., your auth server URL).</li>
                        <li><strong>aud</strong>: Audience—the intended recipient(s) of the token.</li>
                        <li><strong>nbf</strong>: Not Before—the token is not valid before this time.</li>
                    </ul>

                    <h3>How to decode a JWT token</h3>
                    <ol>
                        <li>Paste your JWT token (starting with "eyJ...") into the input field.</li>
                        <li>The header and payload are decoded and displayed as formatted JSON instantly.</li>
                        <li>Review token claims, expiration status, and time remaining.</li>
                        <li>Optionally enter your HMAC secret to verify the signature.</li>
                        <li>Copy individual parts for use in debugging or documentation.</li>
                    </ol>

                    <p>Whether you are debugging authentication issues, inspecting OAuth tokens, auditing API security, or learning how JWTs work, this free JWT decoder and validator is the most private and convenient tool available.</p>
                </section>
            `
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
            },
            seoContent: `
                <section>
                    <h2>What is a Hash Generator?</h2>
                    <p>A <strong>hash generator</strong> is a tool that applies a cryptographic hash function to input data—text or files—producing a fixed-length digest (hash) that acts as a unique fingerprint for that data. Cryptographic hashes are one-way functions: given the hash, you cannot reconstruct the original input. They are used to verify data integrity, store passwords securely, generate checksums, and create digital signatures.</p>
                    <p>CodeHelper's <strong>Hash Generator</strong> supports MD5, SHA-1, SHA-256, SHA-384, SHA-512, and HMAC, processing everything locally in your browser for complete privacy.</p>

                    <h3>Hash Algorithms Compared</h3>
                    <ul>
                        <li><strong>MD5</strong>: Fast but cryptographically broken—use only for non-security checksums like deduplication.</li>
                        <li><strong>SHA-1</strong>: Legacy algorithm, deprecated for security use—still seen in older systems and Git.</li>
                        <li><strong>SHA-256</strong>: The current standard for most security applications—used in TLS, Bitcoin, and code signing.</li>
                        <li><strong>SHA-512</strong>: Higher security margin than SHA-256, preferred for password hashing schemes and high-security contexts.</li>
                        <li><strong>HMAC</strong>: Hash-based Message Authentication Code—combines a secret key with a hash to verify both integrity and authenticity.</li>
                    </ul>

                    <h3>How to generate a hash</h3>
                    <ol>
                        <li>Choose <strong>Text</strong> or <strong>File</strong> mode.</li>
                        <li>Enter your text or upload a file.</li>
                        <li>All supported hash algorithms run simultaneously and display results instantly.</li>
                        <li>For HMAC, enter your secret key in the HMAC section.</li>
                        <li>Copy any hash with one click for verification or use in your application.</li>
                    </ol>

                    <p>Whether you are verifying a downloaded file's checksum, generating a password hash for comparison, implementing HMAC authentication, or auditing data integrity in a database, this free hash generator is fast, private, and supports all major algorithms.</p>
                </section>
            `
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
            },
            seoContent: `
                <section>
                    <h2>What is a URL Encoder/Decoder?</h2>
                    <p>A <strong>URL encoder/decoder</strong> is a tool that converts special characters in URLs to and from their percent-encoded form. URLs can only be transmitted over the internet using the ASCII character set—characters like spaces, ampersands, question marks, and non-ASCII letters must be encoded as a percent sign followed by two hexadecimal digits (e.g., space = <code>%20</code>, &amp; = <code>%26</code>). Encoding errors are a common source of broken links, failed API requests, and security vulnerabilities.</p>
                    <p>CodeHelper's <strong>URL Encoder/Decoder</strong> supports both <code>encodeURIComponent</code> (for query values) and <code>encodeURI</code> (for full URLs), plus a URL parser that breaks any URL into its component parts.</p>

                    <h3>encodeURIComponent vs encodeURI</h3>
                    <ul>
                        <li><strong>encodeURIComponent</strong>: Encodes ALL special characters including <code>/ ? # &amp; =</code>. Use this for individual query parameter values.</li>
                        <li><strong>encodeURI</strong>: Encodes special characters but preserves URL structure characters like <code>/ ? # &amp; =</code>. Use this for complete URLs.</li>
                        <li><strong>Decoding</strong>: Both modes decode percent-encoded strings back to their original form.</li>
                    </ul>

                    <h3>How to encode or decode a URL</h3>
                    <ol>
                        <li>Paste your URL or query string into the input field.</li>
                        <li>Choose <strong>Encode</strong> or <strong>Decode</strong> and select the encoding mode.</li>
                        <li>The result appears instantly with statistics on characters encoded.</li>
                        <li>Use the URL Parser tab to break a URL into protocol, hostname, path, query params, and hash.</li>
                        <li>Copy individual URL components or the full encoded/decoded result.</li>
                    </ol>

                    <p>Whether you are building API requests, debugging redirect chains, constructing query strings for web scraping, or diagnosing broken links in a CMS, this free URL encoder and decoder is an essential tool for any web developer.</p>
                </section>
            `
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
            },
            seoContent: `
                <section>
                    <h2>What is a UUID Generator?</h2>
                    <p>A <strong>UUID generator</strong> is a tool that creates Universally Unique Identifiers (UUIDs)—also known as GUIDs (Globally Unique Identifiers). UUIDs are 128-bit identifiers formatted as 32 hexadecimal characters in five groups separated by hyphens (e.g., <code>550e8400-e29b-41d4-a716-446655440000</code>). They are designed to be unique across space and time without requiring a central registry—making them ideal for distributed systems, database primary keys, session IDs, and API resource identifiers.</p>
                    <p>CodeHelper's <strong>UUID/GUID Generator</strong> uses the browser's native <code>crypto.randomUUID()</code> for cryptographically secure v4 UUIDs and supports bulk generation of up to 1,000 identifiers at once.</p>

                    <h3>UUID Versions Explained</h3>
                    <ul>
                        <li><strong>UUID v4 (Random)</strong>: The most widely used version—122 bits of cryptographically random data. Virtually collision-free for all practical applications.</li>
                        <li><strong>UUID v1 (Timestamp)</strong>: Based on the current timestamp and MAC address. Sortable by creation time but reveals timing information.</li>
                        <li><strong>Nil UUID</strong>: All zeros (<code>00000000-0000-0000-0000-000000000000</code>)—used as a null or default value in systems that require UUID format.</li>
                        <li><strong>Max UUID</strong>: All ones (all f's)—the maximum possible UUID value, used in some range-query contexts.</li>
                    </ul>

                    <h3>How to generate a UUID</h3>
                    <ol>
                        <li>Select the UUID version (v4 Random, v1 Timestamp, Nil, or Max).</li>
                        <li>Choose the output format: standard, no hyphens, uppercase, braces, or URN.</li>
                        <li>Set the quantity for bulk generation (1–1,000 UUIDs).</li>
                        <li>Click <strong>Generate</strong> to produce the identifiers.</li>
                        <li>Copy individual UUIDs, copy all, or download as a text file.</li>
                    </ol>

                    <p>Whether you are creating database primary keys, generating session tokens, building distributed systems, or seeding test data, this free UUID generator produces cryptographically secure identifiers instantly with no server-side processing.</p>
                </section>
            `
        }
    }
}


