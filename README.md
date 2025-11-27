# CodeHelper

CodeHelper is a comprehensive collection of developer tools, formatters, converters, and educational articles available directly in your browser. It works offline, respects privacy (client-side processing), and provides a clean, distraction-free interface.

Website: [https://codehelper.me](https://codehelper.me)

## Setup and Usage

This project is built with Nuxt 3.

### Installation

```bash
npm install
```

### Development Server

Start the development server at `http://localhost:3000`:

```bash
npm run dev
```

### Production Build

Generate the static site for production (output to `.output/public`):

```bash
npx nuxi generate
```

To preview the static build locally:

```bash
npx serve .output/public
```

## Tools

### Formatters
- [JSON Formatter](/tools/json-formatter) - Validator, tree view, diff, and minifier.
- [XML Formatter](/tools/xml-formatter) - Syntax highlighting, stats, and XML-to-JSON conversion.
- [HTML Optimizer](/tools/html-minifier) - Minify or beautify HTML with advanced controls.
- [CSS Formatter](/tools/css-formatter) - Format, sort properties, and minify CSS.
- [Var Dump Formatter](/tools/var-dump-formatter) - Beautify PHP debug output.

### Converters
- [JSON ↔ YAML Converter](/tools/json-yaml-converter) - Auto-detect and convert between formats.
- [Number Base Converter](/tools/number-base-converter) - Convert between Binary, Octal, Decimal, and Hex.
- [Byte Size Converter](/tools/byte-size-converter) - Convert data units (KB, MB, GB, TB).
- [Time Converter](/tools/time-converter) - Unix timestamps, time zones, and ISO formats.
- [Unit Converter](/tools/unit-converter) - Length, weight, temperature, speed, and CSS units.

### CSS & UI Generators
- [Clamp Generator](/tools/clamp-generator) - Create responsive fluid typography CSS.
- [Box Shadow Tester](/tools/box-shadow-tester) - Visual editor for CSS box-shadows.
- [Border Radius Generator](/tools/border-radius-generator) - Create advanced rounded corners.
- [Aspect Ratio Calculator](/tools/aspect-ratio-calculator) - Calculate dimensions and copy CSS.
- [PX to VH Converter](/tools/px-to-vh-converter) - Viewport height unit calculation.
- [PX to VW Converter](/tools/px-to-vw-converter) - Viewport width unit calculation.

### Colors
- [Color Converter](/tools/color-converter) - HEX, RGB, HSL, CMYK, WCAG check, and naming.
- [Color Palette Generator](/tools/color-palette-generator) - Generate harmonies and accessible palettes.
- [Color Shades Generator](/tools/color-shades-generator) - Tints and shades from a base color.
- [Image Color Picker](/tools/image-color-picker) - Sample colors directly from images.

### Imaging & SVG
- [Image Compressor](/tools/image-compressor) - Smart batch compression for PNG/JPEG/WebP/AVIF.
- [Mini Image Editor](/tools/mini-image-editor) - Crop, resize, and filter images locally.
- [SVG Icon Generator](/tools/svg-icon-generator) - Create and optimize SVG icons.
- [SVG Wave Generator](/tools/wave-generator) - Generate divider shapes for web design.
- [Clip Path Maker](/tools/clip-path-maker) - Visual CSS polygon generator.
- [Aspect Frame Generator](/tools/aspect-frame-generator) - Create matte frames for video/images.

### Text & Dev Utilities
- [Regex Tester](/tools/regex-tester) - Test and analyze regular expressions.
- [README Generator](/tools/readme-generator) - Create GitHub project documentation.
- [Dev Notepad](/tools/dev-notepad) - Local storage text editor with export.
- [Text Case Converter](/tools/text-case-converter) - Uppercase, lowercase, title case, etc.
- [Lorem Ipsum Generator](/tools/lorem-ipsum-generator) - Generate placeholder text.

## Articles

### JavaScript & Education
- [How to Use JSON in JavaScript](/articles/how-to-use-json)
- [10 Must-Have JavaScript Snippets](/articles/clipboard-snippets)
- [GitHub Student Developer Pack Guide](/articles/github-student-pack)

### Security & Hacking
- [Can AI Be Hacked?](/articles/ai-hacking)
- [AI-Powered Cyberattacks](/articles/ai-cyberattacks-rising)
- [Building a Hacker Dropbox](/articles/hacker-dropbox)

### Hardware & Energy
- [Samsung 9100 Pro NVMe Deep Dive](/articles/samsung-9100-pro-nvme)
- [Polar Night Sand Battery](/articles/polar-night-sand-battery)
- [CO₂ Battery Explained](/articles/co2-battery)

## Technologies & Libraries

### Core Framework
- **Nuxt 3** - The Intuitive Vue Framework.
- **Vue 3** - The Progressive JavaScript Framework.
- **Tailwind CSS** - Utility-first CSS framework.

### Key Libraries
- **@headlessui/vue** - Unstyled, fully accessible UI components.
- **@heroicons/vue** - Beautiful, hand-crafted SVG icons.
- **@nuxt/image** - Image optimization for Nuxt.
- **ajv** & **ajv-formats** - JSON Schema Validator.
- **deep-object-diff** - For comparing JSON objects.
- **exifr** - Fast EXIF reading.
- **html-minifier-terser** - JavaScript-based HTML minifier.
- **js-yaml** - YAML parser and dumper.
- **jszip** - Create, read and edit .zip files.
- **prismjs** - Lightweight, robust, elegant syntax highlighting.
- **snapsvg** - JavaScript SVG library.
- **vkbeautify** - Pretty print for XML/JSON/CSS.
- **vue3-json-viewer** - JSON viewer component for Vue 3.
- **web-vitals** - Library for measuring Web Vitals.

## License

MIT © Gianluca