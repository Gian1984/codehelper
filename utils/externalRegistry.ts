/**
 * External Resources Registry
 * Curated collection of external tools and libraries for developers
 * Data migrated from LetuDev project
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface ExternalResource {
    name: string
    href: string
    desc: string
    category: ResourceCategory
    bgColor?: string // Optional: for UI decoration
}

export type ResourceCategory =
    | 'colors'
    | 'icons'
    | 'fonts'
    | 'favicons'
    | 'logos'
    | 'stock-photos'
    | 'stock-videos'
    | 'vectors-clip'
    | 'image-compression'
    | 'image-mockups'
    | 'ui-graphics'
    | 'css-frameworks'
    | 'css-animations'
    | 'css-methodologies'
    | 'react-ui-libraries'
    | 'vue-ui-libraries'
    | 'angular-ui-libraries'
    | 'svelte-ui-libraries'
    | 'react-native-ui-libraries'
    | 'chart-libraries'
    | 'animation-js-libraries'
    | 'ui-components'
    | 'design-systems'
    | 'design-inspiration'
    | 'design-software'
    | 'online-design-tools'
    | 'chrome-extensions'
    | 'html-css-templates'
    | 'icon-fonts'
    | 'sound-effects'
    | 'others'

// Category Metadata
export interface ResourceCategoryMeta {
    title: string
    description: string
    icon?: string
    count?: number
    seo?: {
        title?: string
        description?: string
        ogImage?: string
        keywords?: string
        structuredData?: Record<string, any>
        faqSchema?: Record<string, any>
        seoContent?: string
    }
}

// ============================================================================
// CATEGORY METADATA
// ============================================================================

const OG = 'https://codehelper.me/images/codehelper_OGIMAGE.webp'
const BRAND = 'CodeHelper'

export const resourceCategoryMeta: Record<ResourceCategory, ResourceCategoryMeta> = {
    'colors': {
        title: 'Colors',
        description: 'Color palette generators, gradient tools, and accessibility checkers',
        seo: {
            title: `Colors Resources: Generators, Palettes & Tools – ${BRAND}`,
            description: 'Curated collection of the best color palette generators, gradient tools, and accessibility checkers for developers and designers.',
            ogImage: OG,
            keywords: 'color palette generator, gradient tools, color accessibility, hex color picker, color contrast checker, web design colors, ui colors',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                name: 'Colors Resources',
                description: 'Curated collection of the best color palette generators, gradient tools, and accessibility checkers for developers and designers.',
                url: 'https://codehelper.me/resources/colors/',
                mainEntity: {
                    '@type': 'ItemList',
                    name: 'Best Color Tools & Resources',
                    description: 'Curated list of color palette generators, gradient tools, accessibility checkers, and hex color pickers'
                }
            },
            faqSchema: {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'What is the best free color palette generator?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Some of the most popular free color palette generators include Coolors, Adobe Color, Color Hunt, and Paletton. Each offers a unique approach :  Coolors is great for quick random palettes, while Adobe Color excels at color theory-based combinations.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'How do I check color contrast for accessibility?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Tools like Colorable, Whocanuse, and Color Brewer 2 let you test foreground/background color combinations against WCAG accessibility guidelines. They show contrast ratios and indicate whether they pass AA or AAA standards.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'How can I generate CSS gradients for my website?',
                        acceptedAnswer: { '@type': 'Answer', text: 'CSS Gradient (cssgradient.io), ColorGradient.dev, and Colorzilla all provide visual gradient editors that generate ready-to-use CSS gradient code you can copy directly into your stylesheet.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'Where can I find brand color codes?',
                        acceptedAnswer: { '@type': 'Answer', text: 'BrandColors (brandcolors.net) and Brand Palettes (brandpalettes.com) maintain large databases of official brand color codes and hex values for hundreds of well-known companies.' }
                    }
                ]
            },
            seoContent: `
                <section>
                    <h2>Best Color Tools for Developers &amp; Designers</h2>
                    <p>A great <strong>color palette</strong> is the foundation of any successful web or app design. Whether you need a hex color picker, a CSS gradient generator, or a color contrast checker for accessibility compliance, having the right color tools saves hours of manual work.</p>
                    <p>CodeHelper's curated color resources collection includes over 50 tools covering palette generation, gradient creation, accessibility testing, brand colors, and more :  all free to use.</p>

                    <h3>What to look for in a good color tool</h3>
                    <ul>
                        <li><strong>Accessibility support</strong>: Check that colors meet WCAG contrast ratio standards for readable, inclusive designs.</li>
                        <li><strong>Export options</strong>: Good tools export HEX, RGB, HSL, and CSS code directly.</li>
                        <li><strong>Inspiration mode</strong>: Browsable galleries of curated palettes help when you're starting from scratch.</li>
                    </ul>

                    <h3>How to use this resource collection</h3>
                    <ol>
                        <li>Browse the curated list of color tools below.</li>
                        <li>Click any tool to open it in a new tab.</li>
                        <li>Use the search bar to filter by name or description.</li>
                    </ol>

                    <p>Whether you are building a brand identity, designing a UI component library, or simply looking for web design colors that work together, this free curated collection saves you hours of research.</p>
                </section>
            `
        }
    },
    'icons': {
        title: 'Icons',
        description: 'Icon libraries, icon fonts, and icon generators',
        seo: {
            title: `Free Icon Libraries & Generators – ${BRAND}`,
            description: 'Huge collection of free icon libraries, icon fonts, and SVG icon generators for web and mobile development.',
            ogImage: OG,
            keywords: 'free icons, icon libraries, svg icons, icon fonts, material icons, font awesome, icon generator, web icons',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                name: 'Icons Resources',
                description: 'Huge collection of free icon libraries, icon fonts, and SVG icon generators for web and mobile development.',
                url: 'https://codehelper.me/resources/icons/',
                mainEntity: {
                    '@type': 'ItemList',
                    name: 'Best Icon Libraries & Tools',
                    description: 'Curated list of free SVG icon libraries, icon fonts, material icons, and icon generators for developers'
                }
            },
            faqSchema: {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'What are the best free SVG icon libraries?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Top free SVG icon libraries include Heroicons, Feather Icons, Tabler Icons, Phosphor Icons, Lucide, and Remix Icon. All are open source and available in SVG format, many also provide React and Vue components.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'Are Material Design icons free to use?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Yes, Material Design Icons are free and open source under the Apache License 2.0. You can use them in personal and commercial projects. They are available via Google Fonts or the community-maintained materialdesignicons.com.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'What is the difference between icon fonts and SVG icons?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Icon fonts render icons as text characters and are styled with CSS, making them easy to colorize and scale. SVG icons are vector files that offer better accessibility, sharper rendering at all sizes, and individual icon loading for better performance.' }
                    }
                ]
            },
            seoContent: `
                <section>
                    <h2>Best Free Icon Libraries for Developers &amp; Designers</h2>
                    <p>Finding the right <strong>icon library</strong> is essential for consistent, professional-looking interfaces. Free SVG icons, icon fonts, and animated icon sets are available in abundance :  but knowing which ones are high quality and actively maintained saves considerable time.</p>
                    <p>CodeHelper's curated icon resources collection includes over 50 libraries covering SVG icons, material icons, animated icons, brand icons, and Font Awesome alternatives :  all free and ready to use in web and mobile projects.</p>

                    <h3>What to look for in a good icon library</h3>
                    <ul>
                        <li><strong>License clarity</strong>: Confirm icons are free for commercial use, not just personal projects.</li>
                        <li><strong>Format variety</strong>: Good libraries offer SVG, PNG, and framework-specific packages (React, Vue).</li>
                        <li><strong>Consistency</strong>: Icons in the set should share the same visual style and stroke weight.</li>
                    </ul>

                    <h3>How to use this resource collection</h3>
                    <ol>
                        <li>Browse the curated list of icon tools below.</li>
                        <li>Click any tool to open it in a new tab.</li>
                        <li>Use the search bar to filter by name or description.</li>
                    </ol>

                    <p>Whether you are building a web application, a mobile app UI, or a design system, this free curated icon collection saves you hours of searching for the right web icons.</p>
                </section>
            `
        }
    },
    'fonts': {
        title: 'Fonts',
        description: 'Free font libraries, font pairing tools, and typography calculators',
        seo: {
            title: `Free Fonts & Typography Tools – ${BRAND}`,
            description: 'Best free font libraries, font pairing tools, and typography calculators for designers and developers.',
            ogImage: OG,
            keywords: 'free fonts, google fonts, font pairing, typography tools, web fonts, font calculator, golden ratio typography',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                name: 'Fonts Resources',
                description: 'Best free font libraries, font pairing tools, and typography calculators for designers and developers.',
                url: 'https://codehelper.me/resources/fonts/',
                mainEntity: {
                    '@type': 'ItemList',
                    name: 'Best Free Fonts & Typography Tools',
                    description: 'Curated list of free font libraries, font pairing tools, typography calculators, and web font hosting services'
                }
            },
            faqSchema: {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'Where can I find free fonts for commercial use?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Google Fonts, Font Squirrel, and DaFont all offer large collections of free fonts. Font Squirrel specifically filters for fonts that are free for commercial use. Always check the individual font license before using in commercial projects.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'What are the best font pairing tools?',
                        acceptedAnswer: { '@type': 'Answer', text: 'FontPair and Fontjoy are the most popular font pairing tools. FontPair focuses on Google Fonts combinations, while Fontjoy uses machine learning to generate aesthetically pleasing font pairings with one click.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'How do I calculate the right font size for my website?',
                        acceptedAnswer: { '@type': 'Answer', text: 'The Golden Ratio Typography Calculator (grtcalculator.com) helps you determine ideal font size, line height, and content width based on typographic principles. Enter your base font size and it calculates a harmonious type scale.' }
                    }
                ]
            },
            seoContent: `
                <section>
                    <h2>Best Free Fonts &amp; Typography Tools for Developers &amp; Designers</h2>
                    <p>Good <strong>typography</strong> is the backbone of readable, professional web design. Choosing the right web fonts, pairing them correctly, and setting proper line heights and sizes makes a dramatic difference in user experience.</p>
                    <p>CodeHelper's curated fonts collection includes free font libraries, font pairing tools, golden ratio typography calculators, and web font hosting services :  everything you need to make smart typographic decisions.</p>

                    <h3>What to look for in a good font resource</h3>
                    <ul>
                        <li><strong>License type</strong>: Ensure fonts are free for commercial use, not just personal projects.</li>
                        <li><strong>Web performance</strong>: Variable fonts and well-subsetted web fonts load faster and improve Core Web Vitals.</li>
                        <li><strong>Pairing guidance</strong>: Tools that suggest complementary font combinations save design decision time.</li>
                    </ul>

                    <h3>How to use this resource collection</h3>
                    <ol>
                        <li>Browse the curated list of font tools below.</li>
                        <li>Click any tool to open it in a new tab.</li>
                        <li>Use the search bar to filter by name or description.</li>
                    </ol>

                    <p>Whether you are choosing Google Fonts for a SaaS product, learning about golden ratio typography, or downloading free fonts for a client project, this collection saves you hours of research.</p>
                </section>
            `
        }
    },
    'favicons': {
        title: 'Favicons',
        description: 'Favicon generators and tools',
        seo: {
            title: `Favicon Generators & Tools – ${BRAND}`,
            description: 'Create and optimize favicons for all devices and browsers with these top favicon generators and tools.',
            ogImage: OG,
            keywords: 'favicon generator, create favicon, ico generator, app icons, maskable icons, favicon converter, website icons',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                name: 'Favicons Resources',
                description: 'Create and optimize favicons for all devices and browsers with these top favicon generators and tools.',
                url: 'https://codehelper.me/resources/favicons/',
                mainEntity: {
                    '@type': 'ItemList',
                    name: 'Best Favicon Generator Tools',
                    description: 'Curated list of favicon generators, ICO converters, app icon generators, and maskable icon tools'
                }
            },
            faqSchema: {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'What size should a favicon be?',
                        acceptedAnswer: { '@type': 'Answer', text: 'A standard favicon is 16x16 or 32x32 pixels in ICO format. Modern browsers also support 180x180 PNG for Apple Touch Icons and 192x192 or 512x512 PNG for Android/PWA icons. Favicon generators typically create all required sizes automatically.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'What is a maskable icon?',
                        acceptedAnswer: { '@type': 'Answer', text: 'A maskable icon is a PWA app icon designed with extra padding so the operating system can crop it into any shape (circle, rounded square, etc.) without cutting off important content. Tools like Maskable.app let you preview and create maskable icons.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'How do I add a favicon to my website?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Generate your favicon files using a favicon generator tool, then add link tags in your HTML head: <link rel="icon" href="/favicon.ico"> for the basic ICO and additional link tags for Apple Touch Icons and PNG variants.' }
                    }
                ]
            },
            seoContent: `
                <section>
                    <h2>Best Favicon Generator Tools for Developers</h2>
                    <p>A <strong>favicon</strong> is the small icon that appears in browser tabs, bookmarks, and home screen shortcuts. Getting favicons right :  across all devices and browsers :  requires generating multiple sizes and formats from a single source image.</p>
                    <p>CodeHelper's curated favicon tools collection covers everything from basic ICO converters to full favicon packages that generate website icons for Apple devices, Android PWAs, and modern browsers.</p>

                    <h3>What to look for in a good favicon tool</h3>
                    <ul>
                        <li><strong>Multi-size output</strong>: A good favicon generator creates all required sizes (16x16, 32x32, 180x180, 512x512) in one step.</li>
                        <li><strong>Maskable icon support</strong>: PWA-friendly tools generate maskable icons with safe zones for Android home screen display.</li>
                        <li><strong>HTML code snippet</strong>: The best tools also provide the HTML link tags you need to add to your page.</li>
                    </ul>

                    <h3>How to use this resource collection</h3>
                    <ol>
                        <li>Browse the curated list of favicon tools below.</li>
                        <li>Click any tool to open it in a new tab.</li>
                        <li>Use the search bar to filter by name or description.</li>
                    </ol>

                    <p>Whether you are creating app icons for a new product, converting a logo into an ICO file, or generating maskable icons for a PWA, this free collection saves you hours of research.</p>
                </section>
            `
        }
    },
    'logos': {
        title: 'Logos',
        description: 'Logo resources and tools',
        seo: {
            title: `Free Logo Resources & Makers – ${BRAND}`,
            description: 'Find free vector logos of popular brands or create your own with these logo makers and resources.',
            ogImage: OG,
            keywords: 'free logos, vector logos, brand logos, logo maker, svg logos, company logos, logo design tools',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                name: 'Logos Resources',
                description: 'Find free vector logos of popular brands or create your own with these logo makers and resources.',
                url: 'https://codehelper.me/resources/logos/',
                mainEntity: {
                    '@type': 'ItemList',
                    name: 'Best Logo Tools & Resources',
                    description: 'Curated list of free vector brand logos, SVG logo libraries, logo makers, and logo search engines'
                }
            },
            faqSchema: {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'Where can I download free vector logos of popular brands?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Websites like Worldvectorlogo, Seeklogo, and SVGporn maintain large collections of free brand logos in SVG format. These are useful for mockups, presentations, and development projects :  always verify the usage rights for your specific use case.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'What format should a logo be in for web use?',
                        acceptedAnswer: { '@type': 'Answer', text: 'SVG is the ideal format for web logos because it scales perfectly at any size and has small file sizes. PNG with transparency is a good fallback for environments that do not support SVG. Avoid using JPEG for logos as it does not support transparency.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'What are the best free online logo makers?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Free online logo makers include Canva, Hatchful by Shopify, and LogoMakr. For more control, vector design tools like Inkscape (free) or Figma (free tier) allow fully custom logo creation from scratch.' }
                    }
                ]
            },
            seoContent: `
                <section>
                    <h2>Best Free Logo Resources &amp; Makers for Developers &amp; Designers</h2>
                    <p>Whether you need official <strong>brand logos</strong> for a mockup, a logo maker for a side project, or an SVG logo library to integrate into your design system, having the right logo resources at hand is essential.</p>
                    <p>CodeHelper's curated logos collection covers free vector logos of popular companies, online logo design tools, SVG logo libraries, and logo search engines to help developers and designers find exactly what they need.</p>

                    <h3>What to look for in a good logo resource</h3>
                    <ul>
                        <li><strong>SVG format availability</strong>: Vector logos scale perfectly at any resolution without pixelation.</li>
                        <li><strong>License clarity</strong>: Confirm usage rights, especially for commercial use of brand logos in public-facing products.</li>
                        <li><strong>Search capability</strong>: Large logo databases with good search help you find specific company logos quickly.</li>
                    </ul>

                    <h3>How to use this resource collection</h3>
                    <ol>
                        <li>Browse the curated list of logo tools below.</li>
                        <li>Click any tool to open it in a new tab.</li>
                        <li>Use the search bar to filter by name or description.</li>
                    </ol>

                    <p>Whether you are building client presentations, creating app mockups with company logos, or designing your own brand identity, this free curated collection saves you hours of research.</p>
                </section>
            `
        }
    },
    'stock-photos': {
        title: 'Stock Photos',
        description: 'Free stock photography sites',
        seo: {
            title: `Free Stock Photos & Images – ${BRAND}`,
            description: 'The best websites for free, high-quality stock photos and royalty-free images for your projects.',
            ogImage: OG,
            keywords: 'free stock photos, royalty free images, public domain images, free photography, stock images, commercial use photos',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                name: 'Stock Photos Resources',
                description: 'The best websites for free, high-quality stock photos and royalty-free images for your projects.',
                url: 'https://codehelper.me/resources/stock-photos/',
                mainEntity: {
                    '@type': 'ItemList',
                    name: 'Best Free Stock Photo Sites',
                    description: 'Curated list of free stock photo websites, royalty-free image libraries, and public domain photography resources'
                }
            },
            faqSchema: {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'What are the best free stock photo websites?',
                        acceptedAnswer: { '@type': 'Answer', text: 'The most popular free stock photo sites include Unsplash, Pexels, Pixabay, and StockSnap. All offer high-resolution photography free for personal and commercial use under their respective licenses.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'Can I use free stock photos commercially?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Most free stock photo sites like Unsplash and Pexels allow commercial use without attribution, but always read the specific license. Some images may have model releases or property restrictions. When in doubt, use photos from sites with explicit commercial-use licenses.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'What is the difference between royalty-free and public domain images?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Royalty-free images are licensed for use without paying royalties, but are still copyrighted :  you must follow usage terms. Public domain images have no copyright restrictions and can be used freely in any way. Unsplash uses a custom license, while sites like Pixabay offer CC0 public domain options.' }
                    }
                ]
            },
            seoContent: `
                <section>
                    <h2>Best Free Stock Photos for Developers &amp; Designers</h2>
                    <p>High-quality <strong>stock photos</strong> are essential for websites, apps, presentations, and marketing materials. Finding royalty-free images that are both visually compelling and safe to use commercially can be time-consuming without the right resources.</p>
                    <p>CodeHelper's curated stock photos collection includes the best free stock photography sites with thousands of high-resolution, royalty-free images available for commercial use :  no attribution required on most.</p>

                    <h3>What to look for in a free stock photo site</h3>
                    <ul>
                        <li><strong>Commercial use license</strong>: Confirm photos can be used in client work and commercial products without royalty fees.</li>
                        <li><strong>Image quality</strong>: High-resolution photography (at least 1920px wide) ensures images look sharp on retina displays.</li>
                        <li><strong>Search quality</strong>: Good search and filtering by orientation, color, and category speeds up your workflow.</li>
                    </ul>

                    <h3>How to use this resource collection</h3>
                    <ol>
                        <li>Browse the curated list of stock photo sites below.</li>
                        <li>Click any site to open it in a new tab.</li>
                        <li>Use the search bar to filter by name or description.</li>
                    </ol>

                    <p>Whether you are looking for public domain images for a blog, commercial use photos for a client website, or free photography for a mobile app, this collection saves you hours of research.</p>
                </section>
            `
        }
    },
    'stock-videos': {
        title: 'Stock Videos',
        description: 'Free stock video footage',
        seo: {
            title: `Free Stock Video Footage & Clips – ${BRAND}`,
            description: 'Download free stock video footage, clips, and loops for your website or video projects.',
            ogImage: OG,
            keywords: 'free stock videos, royalty free footage, video clips, video backgrounds, stock footage, free video loops',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                name: 'Stock Videos Resources',
                description: 'Download free stock video footage, clips, and loops for your website or video projects.',
                url: 'https://codehelper.me/resources/stock-videos/',
                mainEntity: {
                    '@type': 'ItemList',
                    name: 'Best Free Stock Video Sites',
                    description: 'Curated list of free stock video footage sites, royalty-free video clips, video loop libraries, and 4K stock footage resources'
                }
            },
            faqSchema: {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'Where can I download free stock video footage?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Top free stock video sites include Pexels Videos, Pixabay Videos, Coverr, and Mixkit. All offer royalty-free footage for personal and commercial use. Pexels and Pixabay have the largest libraries with thousands of 4K clips.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'Can I use free stock videos commercially?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Most free stock video sites allow commercial use, but always check the specific license for each clip. Sites like Coverr and Mixkit offer footage under licenses that explicitly permit commercial use without attribution.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'What are video backgrounds used for in web design?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Video backgrounds are used as hero section backgrounds, ambient visuals, and storytelling elements on websites. Looping stock footage clips are particularly popular as subtle, attention-capturing background animations in modern web design.' }
                    }
                ]
            },
            seoContent: `
                <section>
                    <h2>Best Free Stock Video Footage for Developers &amp; Designers</h2>
                    <p>High-quality <strong>stock video</strong> footage can dramatically elevate websites, app demos, and marketing materials. Finding royalty-free video clips that are free for commercial use :  especially 4K footage :  used to require paid subscriptions, but several excellent free resources now exist.</p>
                    <p>CodeHelper's curated stock videos collection includes the best sites for free stock footage, video loops, video backgrounds, and royalty-free clips ready to use in commercial projects.</p>

                    <h3>What to look for in a free stock video site</h3>
                    <ul>
                        <li><strong>Commercial license</strong>: Ensure videos can be used in client work, advertisements, and websites without attribution fees.</li>
                        <li><strong>Resolution options</strong>: Sites offering 4K or at least 1080p footage ensure crisp visuals on modern displays.</li>
                        <li><strong>Loop-friendly clips</strong>: Seamlessly looping video backgrounds are essential for web hero sections.</li>
                    </ul>

                    <h3>How to use this resource collection</h3>
                    <ol>
                        <li>Browse the curated list of stock video sites below.</li>
                        <li>Click any site to open it in a new tab.</li>
                        <li>Use the search bar to filter by name or description.</li>
                    </ol>

                    <p>Whether you are creating video backgrounds for a landing page, sourcing free footage for a promotional video, or building a multimedia web experience, this collection saves you hours of searching.</p>
                </section>
            `
        }
    },
    'vectors-clip': {
        title: 'Vectors & Clip Art',
        description: 'Free vector graphics and clipart',
        seo: {
            title: `Free Vectors, Clip Art & Illustrations – ${BRAND}`,
            description: 'Discover the best sources for free vector graphics, clip art, illustrations, and SVG patterns.',
            ogImage: OG,
            keywords: 'free vectors, vector graphics, clipart, illustrations, svg patterns, vector art, free illustrations',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                name: 'Vectors & Clip Art Resources',
                description: 'Discover the best sources for free vector graphics, clip art, illustrations, and SVG patterns.',
                url: 'https://codehelper.me/resources/vectors-clip/',
                mainEntity: {
                    '@type': 'ItemList',
                    name: 'Best Free Vector & Illustration Resources',
                    description: 'Curated list of free vector graphics libraries, illustration collections, SVG patterns, and clip art sites'
                }
            },
            faqSchema: {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'Where can I find free vector illustrations for my website?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Popular free vector illustration resources include unDraw, Humaaans, Blush, Open Peeps, and Drawkit. These provide SVG illustrations in consistent styles, many customizable by color, and free for commercial use.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'What is the difference between vector graphics and raster images?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Vector graphics (SVG, AI, EPS) are defined by mathematical paths and scale perfectly at any size without losing quality. Raster images (PNG, JPEG) are made of pixels and become blurry when enlarged. Vectors are preferred for logos, icons, and illustrations used at multiple sizes.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'Are free vector graphics safe to use commercially?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Many free vector sites offer commercial licenses, but always check. unDraw, Open Peeps, and Humaaans explicitly allow commercial use. Freepik and Flaticon have free tiers with attribution requirements for non-premium accounts.' }
                    }
                ]
            },
            seoContent: `
                <section>
                    <h2>Best Free Vectors, Clip Art &amp; Illustrations for Developers &amp; Designers</h2>
                    <p><strong>Vector graphics</strong> and illustrations bring warmth and visual storytelling to websites and applications. Unlike raster images, SVG illustrations scale perfectly at any resolution, making them ideal for hero sections, empty states, onboarding screens, and marketing pages.</p>
                    <p>CodeHelper's curated vectors and clip art collection includes free illustration libraries, SVG pattern generators, vector art sites, and clip art resources :  all suitable for use in web and app design projects.</p>

                    <h3>What to look for in a good vector resource</h3>
                    <ul>
                        <li><strong>Style consistency</strong>: Choose illustrations from a single collection for visual coherence across your project.</li>
                        <li><strong>Color customizability</strong>: SVG illustrations that allow color changes make it easy to match your brand palette.</li>
                        <li><strong>Commercial license</strong>: Verify you can use the vectors in client work and commercial products.</li>
                    </ul>

                    <h3>How to use this resource collection</h3>
                    <ol>
                        <li>Browse the curated list of vector tools below.</li>
                        <li>Click any tool to open it in a new tab.</li>
                        <li>Use the search bar to filter by name or description.</li>
                    </ol>

                    <p>Whether you are adding free illustrations to a landing page, sourcing SVG patterns for a UI background, or building a clip art library for a creative project, this collection saves you hours of searching.</p>
                </section>
            `
        }
    },
    'image-compression': {
        title: 'Image Compression',
        description: 'Online image optimization tools',
        seo: {
            title: `Image Compression & Optimization Tools – ${BRAND}`,
            description: 'Optimize your images for the web with these top image compression and resizing tools.',
            ogImage: OG,
            keywords: 'image compression, image optimizer, compress png, compress jpeg, webp converter, image resizer, reduce image size',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                name: 'Image Compression Resources',
                description: 'Optimize your images for the web with these top image compression and resizing tools.',
                url: 'https://codehelper.me/resources/image-compression/',
                mainEntity: {
                    '@type': 'ItemList',
                    name: 'Best Image Compression & Optimization Tools',
                    description: 'Curated list of online image compressors, image resizers, WebP converters, and SVG optimizers'
                }
            },
            faqSchema: {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'What is the best free online image compression tool?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Popular free image compression tools include TinyPNG (supports PNG and JPEG), Squoosh (by Google, supports many formats including WebP and AVIF), and Compressor.io. All provide significant file size reductions with minimal quality loss.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'Should I use WebP instead of PNG or JPEG for web images?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Yes, WebP typically provides 25-35% smaller file sizes than JPEG at equivalent quality, with support for transparency like PNG. All modern browsers support WebP. For maximum compatibility, serve WebP with a JPEG/PNG fallback using the HTML picture element.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'How do I optimize SVG files?',
                        acceptedAnswer: { '@type': 'Answer', text: 'SVGOMG (the online version of SVGO) is the best free tool for SVG optimization. It removes unnecessary metadata, comments, and redundant data from SVG files, often reducing file sizes by 50-70% without any visual difference.' }
                    }
                ]
            },
            seoContent: `
                <section>
                    <h2>Best Image Compression &amp; Optimization Tools for Developers</h2>
                    <p><strong>Image compression</strong> and optimization is one of the highest-impact performance improvements you can make to a website. Unoptimized images are the leading cause of slow page loads, poor Core Web Vitals scores, and wasted bandwidth on mobile connections.</p>
                    <p>CodeHelper's curated image compression collection includes the best tools for compressing PNG and JPEG files, converting images to WebP, resizing images for responsive layouts, and optimizing SVGs :  all free and online.</p>

                    <h3>What to look for in a good image optimizer</h3>
                    <ul>
                        <li><strong>Lossless vs lossy options</strong>: Good tools offer both modes :  lossless for quality-critical images, lossy for dramatic size reductions.</li>
                        <li><strong>WebP and AVIF support</strong>: Modern format conversion helps future-proof your image delivery strategy.</li>
                        <li><strong>Batch processing</strong>: Tools that handle multiple files simultaneously save significant time in production workflows.</li>
                    </ul>

                    <h3>How to use this resource collection</h3>
                    <ol>
                        <li>Browse the curated list of image compression tools below.</li>
                        <li>Click any tool to open it in a new tab.</li>
                        <li>Use the search bar to filter by name or description.</li>
                    </ol>

                    <p>Whether you are reducing image size for a website, converting images to WebP for better performance, or optimizing SVG icons, this free collection saves you hours of searching for the right tools.</p>
                </section>
            `
        }
    },
    'image-mockups': {
        title: 'Image Mockups',
        description: 'Device mockup generators',
        seo: {
            title: `Device Mockup Generators & Tools – ${BRAND}`,
            description: 'Create professional device mockups for your designs instantly with these free mockup generators.',
            ogImage: OG,
            keywords: 'device mockups, mockup generator, iphone mockup, browser mockup, laptop mockup, screen mockup, 3d mockups',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                name: 'Image Mockups Resources',
                description: 'Create professional device mockups for your designs instantly with these free mockup generators.',
                url: 'https://codehelper.me/resources/image-mockups/',
                mainEntity: {
                    '@type': 'ItemList',
                    name: 'Best Device Mockup Generator Tools',
                    description: 'Curated list of device mockup generators, browser frame mockups, 3D mockup tools, and app screenshot generators'
                }
            },
            faqSchema: {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'What is the best free device mockup generator?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Popular free mockup generators include Mockup World, Shots.so, Previewed, and Screely. Each lets you place a screenshot inside a realistic device frame :  phone, tablet, laptop, or browser window :  in seconds without design software.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'How do I create an iPhone mockup for free?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Tools like Previewed and MockuPhone let you upload a screenshot and instantly generate iPhone mockups in various poses. You can then download the image as PNG or export it for use in presentations and app store listings.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'What are browser frame mockups used for?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Browser frame mockups wrap a website screenshot in a realistic browser window (Chrome, Safari, Firefox), making it look like a real website preview. They are commonly used in case studies, portfolios, landing pages, and product presentations.' }
                    }
                ]
            },
            seoContent: `
                <section>
                    <h2>Best Device Mockup Generators for Developers &amp; Designers</h2>
                    <p><strong>Device mockups</strong> transform plain screenshots into professional presentations showing your designs inside realistic phones, tablets, laptops, and browser windows. They are essential for portfolio projects, app store listings, landing pages, and client presentations.</p>
                    <p>CodeHelper's curated image mockups collection includes the best free mockup generators :  from iPhone and Android phone mockups to browser frame mockups and 3D device renders :  no design software required.</p>

                    <h3>What to look for in a good mockup tool</h3>
                    <ul>
                        <li><strong>Device variety</strong>: Good tools cover phones, tablets, laptops, desktops, and browser frames to match any presentation need.</li>
                        <li><strong>Export quality</strong>: High-resolution PNG exports (2x or 3x) ensure mockups look sharp in presentations and on retina displays.</li>
                        <li><strong>3D and perspective options</strong>: Angled and 3D mockups add visual depth and make screenshots more engaging than flat frames.</li>
                    </ul>

                    <h3>How to use this resource collection</h3>
                    <ol>
                        <li>Browse the curated list of mockup tools below.</li>
                        <li>Click any tool to open it in a new tab.</li>
                        <li>Use the search bar to filter by name or description.</li>
                    </ol>

                    <p>Whether you are creating app store screenshots, building a portfolio, or preparing a client presentation, this free collection of screen mockup and device mockup generators saves you hours.</p>
                </section>
            `
        }
    },
    'ui-graphics': {
        title: 'UI Graphics',
        description: 'UI design assets and graphics',
        seo: {
            title: `Free UI Graphics, Assets & Patterns – ${BRAND}`,
            description: 'Collection of free UI graphics, design assets, backgrounds, and patterns for web and app design.',
            ogImage: OG,
            keywords: 'ui graphics, design assets, background patterns, ui kits, free design resources, web textures, svg backgrounds',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                name: 'UI Graphics Resources',
                description: 'Collection of free UI graphics, design assets, backgrounds, and patterns for web and app design.',
                url: 'https://codehelper.me/resources/ui-graphics/',
                mainEntity: {
                    '@type': 'ItemList',
                    name: 'Best Free UI Graphics & Design Assets',
                    description: 'Curated list of free UI design assets, background pattern generators, texture libraries, and SVG background tools'
                }
            },
            faqSchema: {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'Where can I find free background patterns for my website?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Great sources for free background patterns include Hero Patterns, SVG Backgrounds (svgbackgrounds.com), Patternico, and CSS Backgrounds. Most generate or provide SVG and CSS patterns ready to use directly in your stylesheets.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'What are UI kits and where can I download free ones?',
                        acceptedAnswer: { '@type': 'Answer', text: 'UI kits are collections of pre-designed interface components :  buttons, forms, cards, navigation bars :  that speed up design and prototyping. Free UI kits are available on Figma Community, Sketch App Sources, and various design resource sites.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'What are SVG backgrounds and how do I use them?',
                        acceptedAnswer: { '@type': 'Answer', text: 'SVG backgrounds are scalable vector patterns and shapes used as section backgrounds in web design. You can use them inline in HTML, as CSS background-image URLs, or as external SVG files. Sites like Hero Patterns generate CSS code you can paste directly into your stylesheet.' }
                    }
                ]
            },
            seoContent: `
                <section>
                    <h2>Best Free UI Graphics &amp; Design Assets for Developers &amp; Designers</h2>
                    <p><strong>UI graphics</strong> :  including background patterns, textures, abstract shapes, and decorative SVG elements :  add visual depth and polish to websites and applications. Finding high-quality, free design assets saves hours of custom creation work.</p>
                    <p>CodeHelper's curated UI graphics collection includes background pattern generators, free UI kits, SVG background tools, texture libraries, and web design assets :  all free and ready to use.</p>

                    <h3>What to look for in good UI graphic resources</h3>
                    <ul>
                        <li><strong>CSS-ready output</strong>: Tools that generate CSS background-image code let you apply patterns without downloading files.</li>
                        <li><strong>Customization options</strong>: Adjustable colors, sizes, and opacities let you match graphics to your brand.</li>
                        <li><strong>Performance-friendly formats</strong>: SVG patterns are tiny in file size and scale perfectly, making them ideal for web backgrounds.</li>
                    </ul>

                    <h3>How to use this resource collection</h3>
                    <ol>
                        <li>Browse the curated list of UI graphic tools below.</li>
                        <li>Click any tool to open it in a new tab.</li>
                        <li>Use the search bar to filter by name or description.</li>
                    </ol>

                    <p>Whether you need free design resources for a landing page, svg backgrounds for a hero section, or UI kits for rapid prototyping, this collection covers everything you need.</p>
                </section>
            `
        }
    },
    'css-frameworks': {
        title: 'CSS Frameworks',
        description: 'UI frameworks and CSS libraries',
        seo: {
            title: `Best CSS Frameworks & Libraries – ${BRAND}`,
            description: 'Explore the best CSS frameworks and libraries for modern web development, from heavyweights to lightweight alternatives.',
            ogImage: OG,
            keywords: 'css frameworks, ui frameworks, tailwind css, bootstrap, bulma, css libraries, responsive framework, frontend frameworks',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                name: 'CSS Frameworks Resources',
                description: 'Explore the best CSS frameworks and libraries for modern web development, from heavyweights to lightweight alternatives.',
                url: 'https://codehelper.me/resources/css-frameworks/',
                mainEntity: {
                    '@type': 'ItemList',
                    name: 'Best CSS Frameworks & Libraries',
                    description: 'Curated list of CSS frameworks including utility-first frameworks, component-based libraries, and responsive frontend frameworks'
                }
            },
            faqSchema: {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'What is the best CSS framework for beginners?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Bootstrap is the most beginner-friendly CSS framework due to its extensive documentation, large community, and pre-built components. Tailwind CSS has a steeper learning curve but offers more flexibility. Bulma is also a good starting point for its simplicity.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'What is the difference between Tailwind CSS and Bootstrap?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Bootstrap provides ready-made components (navbars, modals, cards) with predefined styles, while Tailwind CSS is utility-first :  it gives you low-level utility classes to build custom designs without leaving your HTML. Bootstrap is faster to prototype with; Tailwind offers more design flexibility.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'Are CSS frameworks worth using in 2025?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Yes. CSS frameworks significantly speed up development by providing responsive grid systems, cross-browser-compatible styles, and reusable components. Tailwind CSS in particular has become a standard in modern web development for its performance and customizability.' }
                    }
                ]
            },
            seoContent: `
                <section>
                    <h2>Best CSS Frameworks &amp; Libraries for Web Development</h2>
                    <p><strong>CSS frameworks</strong> accelerate web development by providing pre-built responsive grids, UI components, and utility classes that eliminate writing repetitive styles from scratch. Choosing the right CSS library for your project can dramatically reduce development time.</p>
                    <p>CodeHelper's curated CSS frameworks collection covers utility-first frameworks like Tailwind CSS, component-based frameworks like Bootstrap and Bulma, Material Design frameworks, and lightweight CSS libraries for every project scale.</p>

                    <h3>What to look for in a CSS framework</h3>
                    <ul>
                        <li><strong>Bundle size</strong>: Utility-first frameworks with PurgeCSS integration produce very small final CSS files; component frameworks can be heavier without careful tree-shaking.</li>
                        <li><strong>Customization</strong>: Good frameworks expose a design token system for colors, spacing, and typography that aligns with your brand.</li>
                        <li><strong>Community and ecosystem</strong>: Active communities mean better plugins, templates, and long-term maintenance.</li>
                    </ul>

                    <h3>How to use this resource collection</h3>
                    <ol>
                        <li>Browse the curated list of CSS frameworks below.</li>
                        <li>Click any framework to open its documentation in a new tab.</li>
                        <li>Use the search bar to filter by name or description.</li>
                    </ol>

                    <p>Whether you are choosing between Tailwind CSS and Bootstrap, exploring responsive frameworks, or looking for a lightweight CSS library for a small project, this collection has you covered.</p>
                </section>
            `
        }
    },
    'css-animations': {
        title: 'CSS Animations',
        description: 'CSS animation libraries and keyframe generators',
        seo: {
            title: `CSS Animation Libraries & Generators – ${BRAND}`,
            description: 'Add life to your website with these CSS animation libraries, keyframe generators, and transition tools.',
            ogImage: OG,
            keywords: 'css animations, animation library, keyframe generator, css transitions, animate.css, web animations, hover effects',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                name: 'CSS Animations Resources',
                description: 'Add life to your website with these CSS animation libraries, keyframe generators, and transition tools.',
                url: 'https://codehelper.me/resources/css-animations/',
                mainEntity: {
                    '@type': 'ItemList',
                    name: 'Best CSS Animation Libraries & Tools',
                    description: 'Curated list of CSS animation libraries, keyframe generators, transition tools, hover effects, and scroll animation resources'
                }
            },
            faqSchema: {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'What is the best CSS animation library?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Animate.css is the most widely used CSS animation library, offering ready-to-use keyframe animations for entrances, exits, and attention-seekers. For scroll-triggered animations, AOS (Animate On Scroll) and Wow.js are popular choices. For advanced sequences, GSAP is industry-standard.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'How do I create CSS keyframe animations?',
                        acceptedAnswer: { '@type': 'Answer', text: 'CSS keyframe animations use @keyframes rules to define animation states, then the animation property to apply them to elements. Tools like Animista and Keyframes.app provide visual editors that generate the CSS code for you, which you can copy directly into your stylesheet.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'How do I add scroll animations to a website?',
                        acceptedAnswer: { '@type': 'Answer', text: 'AOS (Animate On Scroll) is the simplest scroll animation library :  add data-aos attributes to HTML elements and initialize with one line of JavaScript. For more control, ScrollReveal and Intersection Observer API (native browser API) are excellent alternatives.' }
                    }
                ]
            },
            seoContent: `
                <section>
                    <h2>Best CSS Animation Libraries &amp; Tools for Web Developers</h2>
                    <p><strong>CSS animations</strong> bring interfaces to life with smooth transitions, entrance effects, hover states, and scroll-triggered animations. The right animation library can make a website feel polished and modern without the performance overhead of JavaScript-heavy solutions.</p>
                    <p>CodeHelper's curated CSS animations collection includes keyframe animation libraries, CSS transition generators, hover effect libraries, scroll animation tools, and visual keyframe editors.</p>

                    <h3>What to look for in a CSS animation resource</h3>
                    <ul>
                        <li><strong>Performance</strong>: Good animations use GPU-accelerated properties (transform, opacity) rather than layout-triggering properties (width, height, top).</li>
                        <li><strong>Accessibility</strong>: Well-designed tools respect prefers-reduced-motion media queries for users who are sensitive to motion.</li>
                        <li><strong>Copy-paste ready</strong>: The best tools generate clean CSS code you can drop directly into your project.</li>
                    </ul>

                    <h3>How to use this resource collection</h3>
                    <ol>
                        <li>Browse the curated list of CSS animation tools below.</li>
                        <li>Click any tool to open it in a new tab.</li>
                        <li>Use the search bar to filter by name or description.</li>
                    </ol>

                    <p>Whether you are adding hover effects to buttons, building scroll-triggered animations for a landing page, or exploring keyframe generators, this collection has what you need.</p>
                </section>
            `
        }
    },
    'css-methodologies': {
        title: 'CSS Methodologies',
        description: 'CSS architecture and best practices',
        seo: {
            title: `CSS Methodologies & Architecture – ${BRAND}`,
            description: 'Learn about popular CSS methodologies and architecture patterns for scalable and maintainable stylesheets.',
            ogImage: OG,
            keywords: 'css methodologies, bem, oocss, smacss, atomic css, css architecture, maintainable css, css best practices',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                name: 'CSS Methodologies Resources',
                description: 'Learn about popular CSS methodologies and architecture patterns for scalable and maintainable stylesheets.',
                url: 'https://codehelper.me/resources/css-methodologies/',
                mainEntity: {
                    '@type': 'ItemList',
                    name: 'Best CSS Methodologies & Architecture Resources',
                    description: 'Curated list of CSS methodology guides including BEM, OOCSS, SMACSS, Atomic CSS, and CSS architecture best practices'
                }
            },
            faqSchema: {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'What is BEM in CSS?',
                        acceptedAnswer: { '@type': 'Answer', text: 'BEM (Block, Element, Modifier) is a CSS naming methodology that creates a consistent, predictable class naming structure. Blocks are standalone components (.card), Elements are parts of blocks (.card__title), and Modifiers are variations (.card--featured). BEM prevents specificity conflicts and makes styles more readable.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'What is the difference between BEM, SMACSS, and OOCSS?',
                        acceptedAnswer: { '@type': 'Answer', text: 'BEM focuses on a strict naming convention for blocks, elements, and modifiers. SMACSS (Scalable and Modular Architecture for CSS) categorizes rules into base, layout, module, state, and theme layers. OOCSS (Object-Oriented CSS) promotes separating structure from skin. All three aim to create maintainable, scalable CSS architectures.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'Should I use a CSS methodology with Tailwind CSS?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Tailwind CSS largely replaces traditional CSS methodology needs since utility classes eliminate custom class naming decisions. However, for component-level organization you may still benefit from patterns like OOCSS thinking when building reusable Tailwind component abstractions.' }
                    }
                ]
            },
            seoContent: `
                <section>
                    <h2>Best CSS Methodologies &amp; Architecture Resources for Developers</h2>
                    <p><strong>CSS methodologies</strong> provide structured approaches to writing scalable, maintainable stylesheets. Without a clear architecture, CSS in large projects quickly becomes difficult to manage, with specificity conflicts, unintended overrides, and inconsistent naming patterns.</p>
                    <p>CodeHelper's curated CSS methodologies collection covers the major architectural patterns :  BEM, OOCSS, SMACSS, Atomic CSS, and CSS best practices :  with resources to help you choose and implement the right approach for your project.</p>

                    <h3>What to look for when choosing a CSS methodology</h3>
                    <ul>
                        <li><strong>Team size</strong>: Strict methodologies like BEM benefit larger teams where consistency matters most.</li>
                        <li><strong>Project scale</strong>: Simple projects may not need a formal methodology; large codebases benefit enormously from architectural patterns.</li>
                        <li><strong>Framework compatibility</strong>: Consider how your chosen methodology integrates with CSS frameworks or preprocessors you are already using.</li>
                    </ul>

                    <h3>How to use this resource collection</h3>
                    <ol>
                        <li>Browse the curated list of CSS methodology resources below.</li>
                        <li>Click any resource to open it in a new tab.</li>
                        <li>Use the search bar to filter by name or description.</li>
                    </ol>

                    <p>Whether you are learning BEM for the first time, exploring Atomic CSS, or looking for CSS architecture best practices to apply to a large codebase, this collection is your starting point.</p>
                </section>
            `
        }
    },
    'react-ui-libraries': {
        title: 'React UI Libraries',
        description: 'Component libraries for React',
        seo: {
            title: `Best React UI Component Libraries – ${BRAND}`,
            description: 'Top React UI component libraries and design systems to speed up your React application development.',
            ogImage: OG,
            keywords: 'react ui library, react components, material ui, ant design, chakra ui, react bootstrap, react design system',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                name: 'React UI Libraries Resources',
                description: 'Top React UI component libraries and design systems to speed up your React application development.',
                url: 'https://codehelper.me/resources/react-ui-libraries/',
                mainEntity: {
                    '@type': 'ItemList',
                    name: 'Best React UI Component Libraries',
                    description: 'Curated list of React component libraries, Material Design for React, Tailwind-based React components, and enterprise design systems'
                }
            },
            faqSchema: {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'What is the most popular React UI library?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Material UI (MUI) is the most widely used React UI library, offering a comprehensive set of components following Material Design guidelines. Ant Design is popular for enterprise applications. Chakra UI and shadcn/ui have gained significant adoption for their developer experience and accessibility focus.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'What is the difference between MUI and Ant Design?',
                        acceptedAnswer: { '@type': 'Answer', text: 'MUI implements Google Material Design and is highly customizable through theming. Ant Design has its own design language, is particularly strong for admin and enterprise applications, and provides a more opinionated component set. Both are production-ready with excellent TypeScript support.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'What is shadcn/ui and why is it popular?',
                        acceptedAnswer: { '@type': 'Answer', text: 'shadcn/ui is a collection of re-usable React components built with Tailwind CSS and Radix UI primitives. Unlike traditional libraries, you copy the component source code into your project rather than installing a package, giving you full control over customization. Its accessibility, design quality, and flexibility have made it extremely popular.' }
                    }
                ]
            },
            seoContent: `
                <section>
                    <h2>Best React UI Component Libraries for Developers</h2>
                    <p><strong>React UI libraries</strong> provide pre-built, accessible, and customizable components that dramatically accelerate frontend development. Choosing the right React component library for your project saves weeks of building common UI patterns from scratch.</p>
                    <p>CodeHelper's curated React UI libraries collection covers the full spectrum :  from full-featured design systems like Material UI and Ant Design, to utility-first approaches like shadcn/ui and Headless UI, to specialized libraries for specific use cases.</p>

                    <h3>What to look for in a React UI library</h3>
                    <ul>
                        <li><strong>Accessibility</strong>: Well-maintained libraries follow WAI-ARIA standards and are keyboard-navigable out of the box.</li>
                        <li><strong>TypeScript support</strong>: First-class TypeScript support improves developer experience and catches bugs early.</li>
                        <li><strong>Bundle size and tree-shaking</strong>: Libraries that support tree-shaking allow importing only the components you use, keeping bundle sizes small.</li>
                    </ul>

                    <h3>How to use this resource collection</h3>
                    <ol>
                        <li>Browse the curated list of React UI libraries below.</li>
                        <li>Click any library to open its documentation in a new tab.</li>
                        <li>Use the search bar to filter by name or description.</li>
                    </ol>

                    <p>Whether you are starting a new React project, evaluating Material UI alternatives, or building an enterprise design system, this collection helps you find the right react design system for your needs.</p>
                </section>
            `
        }
    },
    'vue-ui-libraries': {
        title: 'Vue UI Libraries',
        description: 'Component libraries for Vue.js',
        seo: {
            title: `Best Vue.js UI Component Libraries – ${BRAND}`,
            description: 'Collection of the best UI component libraries and frameworks for Vue.js applications.',
            ogImage: OG,
            keywords: 'vue ui library, vue components, vuetify, element ui, bootstrap vue, quasar, vue design system',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                name: 'Vue UI Libraries Resources',
                description: 'Collection of the best UI component libraries and frameworks for Vue.js applications.',
                url: 'https://codehelper.me/resources/vue-ui-libraries/',
                mainEntity: {
                    '@type': 'ItemList',
                    name: 'Best Vue.js UI Component Libraries',
                    description: 'Curated list of Vue component libraries, Vuetify, Element Plus, Quasar, and other Vue design system resources'
                }
            },
            faqSchema: {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'What is the best Vue.js UI component library?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Vuetify is the most feature-complete Vue UI library, offering Material Design components for Vue 3. Element Plus is excellent for enterprise admin interfaces. Quasar stands out for its ability to target web, mobile, and desktop from a single codebase. PrimeVue offers a large component set with multiple themes.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'Is Vuetify compatible with Vue 3?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Yes, Vuetify 3 fully supports Vue 3 with the Composition API. It was rewritten for Vue 3 and provides improved performance, better TypeScript support, and a treeshakeable component library compared to Vuetify 2.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'What Vue UI library should I use for mobile apps?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Quasar Framework is the top choice for building mobile-ready Vue applications, offering a unified component set for web, Capacitor (iOS/Android), and Electron (desktop). Ionic Vue is another strong option specifically for hybrid mobile app development with Vue.' }
                    }
                ]
            },
            seoContent: `
                <section>
                    <h2>Best Vue.js UI Component Libraries for Developers</h2>
                    <p><strong>Vue UI libraries</strong> provide ready-made, accessible components that integrate seamlessly with Vue.js and Nuxt applications. The Vue ecosystem has matured significantly, offering excellent choices from full Material Design systems to lightweight headless component libraries.</p>
                    <p>CodeHelper's curated Vue UI libraries collection includes Vuetify, Element Plus, Quasar, Bootstrap Vue, PrimeVue, and more :  covering everything from admin dashboards to mobile-first applications.</p>

                    <h3>What to look for in a Vue UI library</h3>
                    <ul>
                        <li><strong>Vue 3 compatibility</strong>: Ensure the library supports Vue 3 with Composition API for modern projects.</li>
                        <li><strong>Theming system</strong>: Good libraries provide CSS custom property-based theming for easy brand customization.</li>
                        <li><strong>SSR support</strong>: For Nuxt.js projects, verify the library works with server-side rendering without hydration issues.</li>
                    </ul>

                    <h3>How to use this resource collection</h3>
                    <ol>
                        <li>Browse the curated list of Vue UI libraries below.</li>
                        <li>Click any library to open its documentation in a new tab.</li>
                        <li>Use the search bar to filter by name or description.</li>
                    </ol>

                    <p>Whether you are building a Vue 3 SaaS product, a Nuxt application, or an admin dashboard, this collection helps you find the right vue design system for your project.</p>
                </section>
            `
        }
    },
    'angular-ui-libraries': {
        title: 'Angular UI Libraries',
        description: 'Component libraries for Angular',
        seo: {
            title: `Best Angular UI Component Libraries – ${BRAND}`,
            description: 'Top UI component libraries and material design frameworks for Angular developers.',
            ogImage: OG,
            keywords: 'angular ui library, angular components, angular material, ng bootstrap, primeng, angular framework',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                name: 'Angular UI Libraries Resources',
                description: 'Top UI component libraries and material design frameworks for Angular developers.',
                url: 'https://codehelper.me/resources/angular-ui-libraries/',
                mainEntity: {
                    '@type': 'ItemList',
                    name: 'Best Angular UI Component Libraries',
                    description: 'Curated list of Angular component libraries including Angular Material, NgBootstrap, PrimeNG, and enterprise Angular UI kits'
                }
            },
            faqSchema: {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'What is the best Angular UI library?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Angular Material (the official Google library) is the most used Angular UI library, providing Material Design components with deep Angular integration. PrimeNG is a strong alternative with a larger component set and multiple themes. NgBootstrap is ideal for projects already using Bootstrap CSS.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'Is Angular Material free to use?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Yes, Angular Material is completely free and open source under the MIT license. It is maintained by the Angular team at Google and updated with every major Angular release, ensuring long-term compatibility and support.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'How do I add Angular Material to my project?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Run ng add @angular/material in your Angular CLI project. The schematic automatically installs the package, adds a theme, imports the BrowserAnimationsModule, and configures your project. You then import individual component modules as needed.' }
                    }
                ]
            },
            seoContent: `
                <section>
                    <h2>Best Angular UI Component Libraries for Developers</h2>
                    <p><strong>Angular UI libraries</strong> provide production-ready components designed to work seamlessly with Angular's module system, dependency injection, and change detection. The right Angular component library can significantly reduce development time for enterprise applications.</p>
                    <p>CodeHelper's curated Angular UI libraries collection includes Angular Material, PrimeNG, NgBootstrap, Clarity Design System, and more :  covering a range of design styles and use cases from admin panels to consumer applications.</p>

                    <h3>What to look for in an Angular UI library</h3>
                    <ul>
                        <li><strong>Angular version compatibility</strong>: Verify the library actively supports the latest Angular version and uses standalone components for modern architectures.</li>
                        <li><strong>Accessibility</strong>: Look for ARIA compliance and keyboard navigation support, especially for enterprise applications.</li>
                        <li><strong>Theming</strong>: Component libraries with robust theming systems let you match your corporate brand without style conflicts.</li>
                    </ul>

                    <h3>How to use this resource collection</h3>
                    <ol>
                        <li>Browse the curated list of Angular UI libraries below.</li>
                        <li>Click any library to open its documentation in a new tab.</li>
                        <li>Use the search bar to filter by name or description.</li>
                    </ol>

                    <p>Whether you are building an enterprise Angular application, exploring Angular Material alternatives, or looking for angular components with advanced data grid capabilities, this collection is your guide.</p>
                </section>
            `
        }
    },
    'svelte-ui-libraries': {
        title: 'Svelte UI Libraries',
        description: 'Component libraries for Svelte',
        seo: {
            title: `Best Svelte UI Component Libraries – ${BRAND}`,
            description: 'Explore the growing ecosystem of UI component libraries and tools for Svelte applications.',
            ogImage: OG,
            keywords: 'svelte ui library, svelte components, svelte material ui, sveltestrap, svelte framework',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                name: 'Svelte UI Libraries Resources',
                description: 'Explore the growing ecosystem of UI component libraries and tools for Svelte applications.',
                url: 'https://codehelper.me/resources/svelte-ui-libraries/',
                mainEntity: {
                    '@type': 'ItemList',
                    name: 'Best Svelte UI Component Libraries',
                    description: 'Curated list of Svelte component libraries, Svelte Material UI, SvelteStrap, and lightweight Svelte UI kits'
                }
            },
            faqSchema: {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'What are the best UI libraries for Svelte?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Top Svelte UI libraries include Skeleton UI, Flowbite Svelte, Svelte Material UI, and SvelteStrap. Skeleton is particularly popular for SvelteKit projects, offering a modern design system with Tailwind CSS integration.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'Can I use shadcn/ui with Svelte?',
                        acceptedAnswer: { '@type': 'Answer', text: 'shadcn-svelte is a community port of shadcn/ui for Svelte, built with Bits UI (accessible headless primitives) and Tailwind CSS. It follows the same copy-paste philosophy as the React version, giving you full component ownership.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'Is the Svelte component ecosystem mature enough for production?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Yes. While the Svelte ecosystem is smaller than React or Vue, it has grown significantly with SvelteKit as the standard meta-framework. Libraries like Skeleton, Flowbite Svelte, and Svelte Material UI are production-ready and actively maintained.' }
                    }
                ]
            },
            seoContent: `
                <section>
                    <h2>Best Svelte UI Component Libraries for Developers</h2>
                    <p><strong>Svelte UI libraries</strong> are growing rapidly alongside SvelteKit's adoption as a production meta-framework. Svelte's compile-time approach means UI libraries can be extremely lightweight, shipping only the component code you actually use.</p>
                    <p>CodeHelper's curated Svelte UI libraries collection includes Skeleton, Flowbite Svelte, Svelte Material UI, SvelteStrap, and other svelte components and frameworks suitable for modern SvelteKit applications.</p>

                    <h3>What to look for in a Svelte UI library</h3>
                    <ul>
                        <li><strong>SvelteKit compatibility</strong>: Ensure the library supports SSR and SvelteKit's file-based routing without client-only workarounds.</li>
                        <li><strong>Tailwind integration</strong>: Many modern Svelte libraries are built with Tailwind CSS, making customization straightforward.</li>
                        <li><strong>Accessibility</strong>: Look for libraries using accessible headless primitives like Bits UI or Melt UI under the hood.</li>
                    </ul>

                    <h3>How to use this resource collection</h3>
                    <ol>
                        <li>Browse the curated list of Svelte UI libraries below.</li>
                        <li>Click any library to open its documentation in a new tab.</li>
                        <li>Use the search bar to filter by name or description.</li>
                    </ol>

                    <p>Whether you are building a SvelteKit app, exploring Svelte Material UI, or looking for lightweight UI kits for a Svelte side project, this collection is your starting point.</p>
                </section>
            `
        }
    },
    'react-native-ui-libraries': {
        title: 'React Native UI Libraries',
        description: 'Mobile UI component libraries',
        seo: {
            title: `React Native UI Libraries & Kits – ${BRAND}`,
            description: 'Best UI kits and component libraries for building cross-platform mobile apps with React Native.',
            ogImage: OG,
            keywords: 'react native ui, react native components, mobile ui kit, nativebase, react native elements, cross-platform ui',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                name: 'React Native UI Libraries Resources',
                description: 'Best UI kits and component libraries for building cross-platform mobile apps with React Native.',
                url: 'https://codehelper.me/resources/react-native-ui-libraries/',
                mainEntity: {
                    '@type': 'ItemList',
                    name: 'Best React Native UI Libraries & Kits',
                    description: 'Curated list of React Native component libraries, mobile UI kits, cross-platform UI frameworks, and Material Design for React Native'
                }
            },
            faqSchema: {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'What is the best React Native UI library?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Popular React Native UI libraries include React Native Paper (Material Design), NativeBase, React Native Elements, and Tamagui. React Native Paper is ideal for Material Design adherence; Tamagui is emerging as a high-performance alternative with universal (web + native) support.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'Can I use the same UI library for React and React Native?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Some libraries support both React (web) and React Native. Tamagui and NativeBase (via React Native Web) offer universal component support. However, most React web UI libraries do not work in React Native, and vice versa, so separate library choices are typically needed.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'What is Expo and how does it affect library compatibility?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Expo is a framework built on top of React Native that simplifies development and deployment. Most React Native UI libraries are compatible with Expo managed workflow, but some that require native modules may need bare workflow or expo-modules to work properly.' }
                    }
                ]
            },
            seoContent: `
                <section>
                    <h2>Best React Native UI Libraries for Mobile Developers</h2>
                    <p><strong>React Native UI libraries</strong> provide platform-aware components that adapt their appearance to iOS and Android design conventions while maintaining a single JavaScript codebase. Choosing the right mobile UI kit accelerates cross-platform app development significantly.</p>
                    <p>CodeHelper's curated React Native UI libraries collection covers the best mobile UI kits :  from Material Design implementations to lightweight component sets :  all compatible with React Native and Expo projects.</p>

                    <h3>What to look for in a React Native UI library</h3>
                    <ul>
                        <li><strong>Platform adaptation</strong>: Good libraries automatically apply iOS and Android-specific styling conventions where appropriate.</li>
                        <li><strong>Expo compatibility</strong>: Verify the library works with Expo managed workflow if you are using Expo for your project.</li>
                        <li><strong>Performance</strong>: Mobile libraries should avoid heavy JavaScript animations that could cause dropped frames on lower-end devices.</li>
                    </ul>

                    <h3>How to use this resource collection</h3>
                    <ol>
                        <li>Browse the curated list of React Native UI libraries below.</li>
                        <li>Click any library to open its documentation in a new tab.</li>
                        <li>Use the search bar to filter by name or description.</li>
                    </ol>

                    <p>Whether you are building a cross-platform mobile app with React Native, evaluating NativeBase alternatives, or looking for react native components with good Expo support, this collection is your guide.</p>
                </section>
            `
        }
    },
    'chart-libraries': {
        title: 'Chart Libraries',
        description: 'Data visualization libraries',
        seo: {
            title: `JavaScript Charting & Visualization Libraries – ${BRAND}`,
            description: 'Best JavaScript libraries for creating interactive charts, graphs, and data visualizations.',
            ogImage: OG,
            keywords: 'chart libraries, javascript charts, d3.js, chart.js, data visualization, graphing libraries, plotting tools',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                name: 'Chart Libraries Resources',
                description: 'Best JavaScript libraries for creating interactive charts, graphs, and data visualizations.',
                url: 'https://codehelper.me/resources/chart-libraries/',
                mainEntity: {
                    '@type': 'ItemList',
                    name: 'Best JavaScript Chart & Data Visualization Libraries',
                    description: 'Curated list of JavaScript charting libraries, data visualization tools, D3.js resources, and interactive graph libraries'
                }
            },
            faqSchema: {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'What is the best JavaScript charting library?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Chart.js is the most beginner-friendly charting library with good out-of-the-box charts. D3.js is the most powerful for custom visualizations but has a steeper learning curve. Recharts and Victory are popular React-specific options. ECharts by Apache is excellent for complex dashboards.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'What is the difference between Chart.js and D3.js?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Chart.js provides pre-built chart types (bar, line, pie, etc.) that are quick to set up with minimal code. D3.js is a low-level data binding library that gives you full control over every visual element, making it ideal for custom or unconventional visualizations. D3 has a much steeper learning curve.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'Which chart library works best with React?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Recharts and Victory are purpose-built for React with declarative component APIs. Tremor provides pre-built React chart components styled for dashboards. For maximum flexibility, react-chartjs-2 wraps Chart.js for React use. Nivo offers both SVG and canvas rendering for React.' }
                    }
                ]
            },
            seoContent: `
                <section>
                    <h2>Best JavaScript Charting &amp; Data Visualization Libraries</h2>
                    <p><strong>Chart libraries</strong> and data visualization tools are essential for building dashboards, analytics platforms, and data-driven applications. From simple bar charts to complex interactive data visualizations, JavaScript charting libraries handle the heavy lifting of turning raw data into insightful graphics.</p>
                    <p>CodeHelper's curated chart libraries collection covers the full range :  from beginner-friendly charting libraries like Chart.js to powerful low-level tools like D3.js, plus framework-specific options for React, Vue, and Angular.</p>

                    <h3>What to look for in a JavaScript chart library</h3>
                    <ul>
                        <li><strong>Chart type coverage</strong>: Ensure the library covers the chart types you need :  bar, line, pie, scatter, heatmap, etc.</li>
                        <li><strong>Interactivity</strong>: Hover tooltips, click events, zoom, and pan are important for data-rich dashboards.</li>
                        <li><strong>Performance</strong>: Canvas-based libraries generally perform better than SVG for large datasets with thousands of data points.</li>
                    </ul>

                    <h3>How to use this resource collection</h3>
                    <ol>
                        <li>Browse the curated list of chart libraries below.</li>
                        <li>Click any library to open its documentation in a new tab.</li>
                        <li>Use the search bar to filter by name or description.</li>
                    </ol>

                    <p>Whether you are building a data dashboard, implementing interactive graphs, or exploring D3.js for custom data visualization, this collection of graphing libraries covers all your needs.</p>
                </section>
            `
        }
    },
    'animation-js-libraries': {
        title: 'JavaScript Animation Libraries',
        description: 'Motion graphics and scroll animation libraries',
        seo: {
            title: `JavaScript Animation Libraries & Tools – ${BRAND}`,
            description: 'Powerful JavaScript libraries for web animations, motion graphics, scroll effects, and 3D rendering.',
            ogImage: OG,
            keywords: 'javascript animation, animation library, gsap, three.js, webgl, scroll animations, motion graphics web',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                name: 'JavaScript Animation Libraries Resources',
                description: 'Powerful JavaScript libraries for web animations, motion graphics, scroll effects, and 3D rendering.',
                url: 'https://codehelper.me/resources/animation-js-libraries/',
                mainEntity: {
                    '@type': 'ItemList',
                    name: 'Best JavaScript Animation Libraries & Tools',
                    description: 'Curated list of JavaScript animation libraries including GSAP, Three.js, WebGL tools, scroll animation libraries, and canvas animation frameworks'
                }
            },
            faqSchema: {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'What is GSAP and why is it popular?',
                        acceptedAnswer: { '@type': 'Answer', text: 'GSAP (GreenSock Animation Platform) is the industry-standard JavaScript animation library, used on millions of websites. It is extremely performant, works in all browsers, handles complex animation sequences, and includes powerful plugins for scroll-triggered animations, morphing SVGs, and more.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'What is the difference between GSAP and Three.js?',
                        acceptedAnswer: { '@type': 'Answer', text: 'GSAP is a general-purpose animation engine that animates DOM elements, SVG, canvas, and more with timeline-based sequencing. Three.js is a 3D graphics library built on WebGL for creating 3D scenes, models, and visualizations in the browser. They serve different purposes and are often used together.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'What are the best libraries for scroll-triggered animations?',
                        acceptedAnswer: { '@type': 'Answer', text: 'For scroll animations, GSAP ScrollTrigger is the most powerful and flexible option. Framer Motion (React) is excellent for component-level scroll animations. Locomotive Scroll provides smooth scrolling with scroll-linked effects. Lenis is a newer, lightweight smooth scroll library.' }
                    }
                ]
            },
            seoContent: `
                <section>
                    <h2>Best JavaScript Animation Libraries for Web Developers</h2>
                    <p><strong>JavaScript animation libraries</strong> enable sophisticated motion graphics, scroll effects, 3D scenes, and interactive experiences that pure CSS cannot achieve. From GSAP's industry-standard timeline-based animations to Three.js WebGL 3D rendering, the JavaScript animation ecosystem is rich and powerful.</p>
                    <p>CodeHelper's curated JavaScript animation libraries collection covers GSAP, Three.js, Framer Motion, Lottie, Anime.js, and many more tools for building compelling web animations and motion graphics.</p>

                    <h3>What to look for in a JavaScript animation library</h3>
                    <ul>
                        <li><strong>Performance</strong>: The best libraries use requestAnimationFrame, CSS transforms, and avoid layout thrashing for smooth 60fps animations.</li>
                        <li><strong>Timeline control</strong>: Sequence-based animation systems (like GSAP timelines) make complex multi-step animations manageable.</li>
                        <li><strong>Scroll integration</strong>: Many modern animation libraries include scroll-trigger capabilities for scroll-linked and scroll-triggered animations.</li>
                    </ul>

                    <h3>How to use this resource collection</h3>
                    <ol>
                        <li>Browse the curated list of JavaScript animation libraries below.</li>
                        <li>Click any library to open its documentation in a new tab.</li>
                        <li>Use the search bar to filter by name or description.</li>
                    </ol>

                    <p>Whether you are implementing scroll animations for a landing page, building a WebGL 3D experience, or creating motion graphics with GSAP, this collection covers all your animation library needs.</p>
                </section>
            `
        }
    },
    'ui-components': {
        title: 'UI Components',
        description: 'Reusable UI components and kits',
        seo: {
            title: `Free UI Components & Kits – ${BRAND}`,
            description: 'Collection of reusable UI components, snippets, and kits for faster web development.',
            ogImage: OG,
            keywords: 'ui components, ui kits, web components, css components, html snippets, reusable ui, frontend components',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                name: 'UI Components Resources',
                description: 'Collection of reusable UI components, snippets, and kits for faster web development.',
                url: 'https://codehelper.me/resources/ui-components/',
                mainEntity: {
                    '@type': 'ItemList',
                    name: 'Best Free UI Components & Kits',
                    description: 'Curated list of CSS components, HTML snippet collections, Tailwind UI kits, and reusable frontend component resources'
                }
            },
            faqSchema: {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'Where can I find free UI components for my website?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Great sources for free UI components include Tailwind UI (free examples), Flowbite, DaisyUI, HyperUI, Meraki UI, and Headless UI. These provide ready-to-use HTML and CSS components for common UI patterns like cards, navbars, modals, and forms.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'What are Web Components and can I use them in any framework?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Web Components are a set of browser APIs (Custom Elements, Shadow DOM, HTML Templates) that enable creating reusable, encapsulated components that work natively in any HTML page, regardless of JavaScript framework. They work in React, Vue, Angular, and vanilla HTML.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'What are the best Tailwind CSS component libraries?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Top Tailwind CSS component libraries include DaisyUI (adds component classes to Tailwind), Flowbite (interactive components with JavaScript), HyperUI (free open-source copy-paste components), and Meraki UI. All provide pre-built components styled with Tailwind utility classes.' }
                    }
                ]
            },
            seoContent: `
                <section>
                    <h2>Best Free UI Components &amp; Kits for Web Development</h2>
                    <p><strong>UI components</strong> :  pre-built HTML, CSS, and JavaScript patterns for buttons, cards, navigation, modals, forms, and more :  are the building blocks of modern web interfaces. Having a library of reusable components dramatically speeds up frontend development.</p>
                    <p>CodeHelper's curated UI components collection includes CSS component libraries, Tailwind UI kits, HTML snippet collections, and framework-agnostic web components :  all free and ready to copy into your projects.</p>

                    <h3>What to look for in UI component resources</h3>
                    <ul>
                        <li><strong>Framework compatibility</strong>: Check if components work with your tech stack :  some are framework-agnostic HTML/CSS, others are React or Vue-specific.</li>
                        <li><strong>Accessibility</strong>: Well-built components include correct ARIA attributes and keyboard interaction patterns.</li>
                        <li><strong>Copy-paste workflow</strong>: Component resources that provide clean, copy-paste-ready code integrate faster than those requiring package installation.</li>
                    </ul>

                    <h3>How to use this resource collection</h3>
                    <ol>
                        <li>Browse the curated list of UI component resources below.</li>
                        <li>Click any resource to open it in a new tab.</li>
                        <li>Use the search bar to filter by name or description.</li>
                    </ol>

                    <p>Whether you need free CSS components for a quick prototype, Tailwind UI kits for a product landing page, or html snippets for common patterns, this collection covers your frontend component needs.</p>
                </section>
            `
        }
    },
    'design-systems': {
        title: 'Design Systems',
        description: 'Enterprise design systems and style guides',
        seo: {
            title: `Design Systems & Style Guides Gallery – ${BRAND}`,
            description: 'Explore famous design systems and style guides from top companies like Google, Apple, and IBM.',
            ogImage: OG,
            keywords: 'design systems, style guides, material design, human interface guidelines, brand guidelines, ui system, design language',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                name: 'Design Systems Resources',
                description: 'Explore famous design systems and style guides from top companies like Google, Apple, and IBM.',
                url: 'https://codehelper.me/resources/design-systems/',
                mainEntity: {
                    '@type': 'ItemList',
                    name: 'Best Design Systems & Style Guides',
                    description: 'Curated collection of enterprise design systems, corporate style guides, UI guidelines, and design language resources from leading companies'
                }
            },
            faqSchema: {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'What is a design system?',
                        acceptedAnswer: { '@type': 'Answer', text: 'A design system is a collection of reusable components, design tokens (colors, typography, spacing), patterns, and guidelines that ensure consistency across a product or brand. Famous examples include Google Material Design, Apple Human Interface Guidelines, IBM Carbon, and Salesforce Lightning.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'What is the difference between a design system and a style guide?',
                        acceptedAnswer: { '@type': 'Answer', text: 'A style guide documents visual rules (colors, typography, logo usage), while a design system is broader :  it includes a component library, design tokens, usage guidelines, and often code implementations. Design systems are living documents maintained by dedicated teams.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'How do I build my own design system?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Start by defining design tokens (color palette, type scale, spacing system), then build a component library from your most reused UI patterns. Document usage guidelines and maintain a Figma or Storybook reference. Study existing design systems like Carbon or Ant Design for inspiration and best practices.' }
                    }
                ]
            },
            seoContent: `
                <section>
                    <h2>Best Design Systems &amp; Style Guides for Developers &amp; Designers</h2>
                    <p><strong>Design systems</strong> are the source of truth for product design and development teams. They codify visual decisions into reusable components and guidelines that ensure consistency across every screen, platform, and team member. Studying established design systems accelerates both design and development work.</p>
                    <p>CodeHelper's curated design systems collection includes famous examples from Google, Apple, IBM, Microsoft, Salesforce, and more :  plus resources for building and maintaining your own design language and style guides.</p>

                    <h3>What to look for when studying design systems</h3>
                    <ul>
                        <li><strong>Design token structure</strong>: How the system defines and names colors, spacing, typography, and elevation scales is instructive for building your own.</li>
                        <li><strong>Component documentation</strong>: Well-documented systems explain not just how components look, but when and why to use each one.</li>
                        <li><strong>Accessibility standards</strong>: Leading design systems explicitly document their accessibility approach and include guidance for keyboard, screen reader, and motion preferences.</li>
                    </ul>

                    <h3>How to use this resource collection</h3>
                    <ol>
                        <li>Browse the curated list of design systems below.</li>
                        <li>Click any system to open its documentation in a new tab.</li>
                        <li>Use the search bar to filter by name or description.</li>
                    </ol>

                    <p>Whether you are building a new design system from scratch, studying material design guidelines, or looking for brand guidelines inspiration, this collection is the ideal reference.</p>
                </section>
            `
        }
    },
    'design-inspiration': {
        title: 'Design Inspiration',
        description: 'Design showcases and inspiration galleries',
        seo: {
            title: `Web Design Inspiration & Showcases – ${BRAND}`,
            description: 'Get inspired by the best web design showcases, landing page galleries, and UI patterns.',
            ogImage: OG,
            keywords: 'web design inspiration, ui inspiration, website gallery, design showcase, landing page examples, dribbble, behance',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                name: 'Design Inspiration Resources',
                description: 'Get inspired by the best web design showcases, landing page galleries, and UI patterns.',
                url: 'https://codehelper.me/resources/design-inspiration/',
                mainEntity: {
                    '@type': 'ItemList',
                    name: 'Best Web Design Inspiration Sites',
                    description: 'Curated list of web design galleries, UI inspiration sites, landing page showcases, and portfolio collections'
                }
            },
            faqSchema: {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'What are the best websites for web design inspiration?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Top web design inspiration sites include Awwwards, Dribbble, Behance, Land-book, Lapa Ninja, and Minimal.gallery. Awwwards curates award-winning websites, while Lapa Ninja and Land-book focus specifically on landing page design inspiration.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'Where can I find landing page design examples?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Lapa Ninja, Land-book, Landingfolio, and One Page Love are dedicated landing page galleries showcasing hundreds of real-world examples. They are great for studying how successful products present their value proposition, CTAs, and visual hierarchy.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'What are UI patterns and where can I find examples?',
                        acceptedAnswer: { '@type': 'Answer', text: 'UI patterns are established solutions to common interface design problems :  navigation patterns, onboarding flows, empty states, error messages, and more. UI Patterns (ui-patterns.com), Mobbin, and Pttrns collect real-world examples of UI patterns from popular apps and websites.' }
                    }
                ]
            },
            seoContent: `
                <section>
                    <h2>Best Web Design Inspiration Sites for Developers &amp; Designers</h2>
                    <p><strong>Web design inspiration</strong> is the starting point for any new creative project. Studying award-winning websites, outstanding landing pages, and innovative UI patterns helps you understand current design trends and raises the quality bar for your own work.</p>
                    <p>CodeHelper's curated design inspiration collection includes the best website galleries, UI inspiration sites, landing page showcases, design showcases, and pattern libraries :  handpicked to cover a wide range of styles and industries.</p>

                    <h3>What to look for in design inspiration resources</h3>
                    <ul>
                        <li><strong>Category filtering</strong>: Sites that organize inspiration by industry, style, or component type help you find relevant examples faster.</li>
                        <li><strong>Real-world examples</strong>: Inspiration from live production sites is more applicable than conceptual or unrealistic portfolio pieces.</li>
                        <li><strong>Pattern libraries</strong>: Collections organized by UI pattern (onboarding, empty states, CTAs) are especially useful for solving specific design problems.</li>
                    </ul>

                    <h3>How to use this resource collection</h3>
                    <ol>
                        <li>Browse the curated list of design inspiration sites below.</li>
                        <li>Click any site to open it in a new tab.</li>
                        <li>Use the search bar to filter by name or description.</li>
                    </ol>

                    <p>Whether you are seeking landing page examples, studying ui inspiration for an app, or browsing design showcases from sites like Dribbble and Behance, this collection is your creative starting point.</p>
                </section>
            `
        }
    },
    'design-software': {
        title: 'Design Software',
        description: 'Design tools and applications',
        seo: {
            title: `Best Design Software & Graphic Tools – ${BRAND}`,
            description: 'Top design software and tools for UI/UX design, vector graphics, photo editing, and prototyping.',
            ogImage: OG,
            keywords: 'design software, graphic design tools, ui design tools, vector software, photo editor, prototyping tools, figma alternatives',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                name: 'Design Software Resources',
                description: 'Top design software and tools for UI/UX design, vector graphics, photo editing, and prototyping.',
                url: 'https://codehelper.me/resources/design-software/',
                mainEntity: {
                    '@type': 'ItemList',
                    name: 'Best Design Software & Graphic Tools',
                    description: 'Curated list of UI design tools, vector software, photo editing applications, prototyping tools, and Figma alternatives'
                }
            },
            faqSchema: {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'What is the best free design software for UI/UX?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Figma offers the most powerful free tier for UI/UX design, supporting up to 3 projects with full collaboration features. Penpot is a fully open-source alternative with similar capabilities. Adobe XD had a free tier but has been discontinued in favor of Figma.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'What are the best Figma alternatives?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Notable Figma alternatives include Penpot (open source, self-hostable), Sketch (macOS only, subscription), Affinity Designer (one-time purchase), and Lunacy (free for Windows and Mac). Penpot is the top choice for teams wanting an open-source design tool.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'What is the best free vector graphics software?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Inkscape is the best free, open-source vector graphics editor :  a capable alternative to Adobe Illustrator. Vectornator (Linearity Curve) offers a modern interface on Mac and iPad. For web-based vector editing, SVGator and Boxy SVG are excellent lightweight options.' }
                    }
                ]
            },
            seoContent: `
                <section>
                    <h2>Best Design Software &amp; Graphic Tools for Developers &amp; Designers</h2>
                    <p>The right <strong>design software</strong> is essential for creating professional UI/UX mockups, vector graphics, photo composites, and interactive prototypes. The design tool landscape has expanded significantly, offering powerful free and open-source alternatives alongside industry standards.</p>
                    <p>CodeHelper's curated design software collection covers UI design tools, vector software, photo editors, prototyping apps, and Figma alternatives :  from free open-source tools to industry-standard applications.</p>

                    <h3>What to look for in design software</h3>
                    <ul>
                        <li><strong>Collaboration features</strong>: Cloud-based tools like Figma enable real-time team collaboration, reducing handoff friction between designers and developers.</li>
                        <li><strong>Developer handoff</strong>: Good UI design tools provide inspect modes with CSS values, measurements, and asset export for developers.</li>
                        <li><strong>Plugin ecosystem</strong>: A rich plugin marketplace extends functionality with icon libraries, content generators, and workflow automation.</li>
                    </ul>

                    <h3>How to use this resource collection</h3>
                    <ol>
                        <li>Browse the curated list of design software below.</li>
                        <li>Click any tool to open its website in a new tab.</li>
                        <li>Use the search bar to filter by name or description.</li>
                    </ol>

                    <p>Whether you are choosing your first graphic design tool, exploring Figma alternatives, or looking for free prototyping tools, this collection covers all the major design software options.</p>
                </section>
            `
        }
    },
    'online-design-tools': {
        title: 'Online Design Tools',
        description: 'Web-based design and prototyping tools',
        seo: {
            title: `Free Online Design & Prototyping Tools – ${BRAND}`,
            description: 'Useful online tools for quick design tasks, prototyping, image editing, and asset generation.',
            ogImage: OG,
            keywords: 'online design tools, web design tools, online photo editor, svg generator, mockup generator, css tools, browser tools',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                name: 'Online Design Tools Resources',
                description: 'Useful online tools for quick design tasks, prototyping, image editing, and asset generation.',
                url: 'https://codehelper.me/resources/online-design-tools/',
                mainEntity: {
                    '@type': 'ItemList',
                    name: 'Best Free Online Design & Prototyping Tools',
                    description: 'Curated list of online graphic editors, CSS generators, SVG tools, mockup creators, and web-based design utilities'
                }
            },
            faqSchema: {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'What are the best free online design tools?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Top free online design tools include Canva (graphic design), Figma (UI/UX design and prototyping), Photopea (Photoshop-like photo editing), Vectr (vector graphics), and Remove.bg (background removal). All run in the browser without installation.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'What online CSS generator tools are available?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Popular online CSS generator tools include CSS Gradient (gradient backgrounds), Neumorphism.io (soft-UI shadows), Glassmorphism.com (glass effect styles), CSS Grid Generator, and Flexbox Froggy (for learning flexbox). These generate ready-to-use CSS code.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'Can I edit SVG files online for free?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Yes, several free online SVG editors are available including Boxy SVG, SVG-Edit, and Vectr. For optimizing SVG files, SVGOMG (the online SVGO interface) is the best tool, typically reducing file sizes by 40-70% without visual quality loss.' }
                    }
                ]
            },
            seoContent: `
                <section>
                    <h2>Best Free Online Design Tools for Developers &amp; Designers</h2>
                    <p><strong>Online design tools</strong> bring powerful design capabilities directly to the browser :  no installation, no subscription, no OS restrictions. From quick CSS generation to full image editing, web-based design tools have become indispensable in modern development workflows.</p>
                    <p>CodeHelper's curated online design tools collection includes CSS generators, SVG editors, mockup creators, online photo editors, background removers, and other browser tools that solve specific design tasks quickly and for free.</p>

                    <h3>What to look for in online design tools</h3>
                    <ul>
                        <li><strong>No-install convenience</strong>: The best online tools run entirely in the browser with no account required for basic functionality.</li>
                        <li><strong>Code output</strong>: Tools that generate ready-to-use CSS, SVG, or HTML code are especially valuable for developers.</li>
                        <li><strong>Export options</strong>: Good tools support multiple export formats (PNG, SVG, PDF) for use across different contexts.</li>
                    </ul>

                    <h3>How to use this resource collection</h3>
                    <ol>
                        <li>Browse the curated list of online design tools below.</li>
                        <li>Click any tool to open it in a new tab.</li>
                        <li>Use the search bar to filter by name or description.</li>
                    </ol>

                    <p>Whether you need a quick CSS tool, a browser-based photo editor, or an SVG generator for a design project, this collection of web design tools provides instant access without any software installation.</p>
                </section>
            `
        }
    },
    'chrome-extensions': {
        title: 'Chrome Extensions',
        description: 'Developer productivity extensions',
        seo: {
            title: `Best Chrome Extensions for Developers – ${BRAND}`,
            description: 'Must-have Chrome extensions for web developers and designers to boost productivity.',
            ogImage: OG,
            keywords: 'chrome extensions, developer tools, web development extensions, productivity tools, browser extensions, design extensions',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                name: 'Chrome Extensions Resources',
                description: 'Must-have Chrome extensions for web developers and designers to boost productivity.',
                url: 'https://codehelper.me/resources/chrome-extensions/',
                mainEntity: {
                    '@type': 'ItemList',
                    name: 'Best Chrome Extensions for Web Developers',
                    description: 'Curated list of must-have Chrome extensions for developer productivity, design inspection, code validation, and color picking'
                }
            },
            faqSchema: {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'What are the must-have Chrome extensions for web developers?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Essential Chrome extensions for web developers include React DevTools, Vue.js devtools, Lighthouse (performance auditing), axe DevTools (accessibility), ColorZilla (color picker), WhatFont (font identifier), and JSON Formatter. These directly integrate with your development workflow.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'What Chrome extensions help with web design?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Useful design Chrome extensions include Eye Dropper (color picker from any webpage), WhatFont (identify fonts in use), CSS Peeper (inspect CSS styles), PixelParallel (design overlay comparison), and Page Ruler Redux (measure distances on screen).' }
                    },
                    {
                        '@type': 'Question',
                        name: 'Are developer Chrome extensions free?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Most essential developer Chrome extensions are completely free. Extensions like React DevTools, Vue DevTools, Lighthouse, axe DevTools, ColorZilla, and WhatFont are all free in the Chrome Web Store. Some advanced extensions offer paid premium tiers for additional features.' }
                    }
                ]
            },
            seoContent: `
                <section>
                    <h2>Best Chrome Extensions for Web Developers &amp; Designers</h2>
                    <p><strong>Chrome extensions</strong> for developers can dramatically boost productivity by bringing debugging tools, design inspectors, accessibility checkers, and performance auditors directly into your browser. The right set of browser extensions makes your daily development workflow faster and more efficient.</p>
                    <p>CodeHelper's curated Chrome extensions collection covers the must-have productivity tools, design extensions, code validators, color pickers, and developer tools that every web developer and designer should have installed.</p>

                    <h3>What to look for in developer Chrome extensions</h3>
                    <ul>
                        <li><strong>DevTools integration</strong>: Extensions that add panels to Chrome DevTools (React DevTools, Vue devtools) provide the deepest inspection capabilities.</li>
                        <li><strong>Performance impact</strong>: Avoid installing too many extensions simultaneously as they can slow page loads; enable them as needed.</li>
                        <li><strong>Maintenance status</strong>: Check that extensions are actively maintained and updated for recent Chrome versions to avoid compatibility issues.</li>
                    </ul>

                    <h3>How to use this resource collection</h3>
                    <ol>
                        <li>Browse the curated list of Chrome extensions below.</li>
                        <li>Click any extension to open its Chrome Web Store page in a new tab.</li>
                        <li>Use the search bar to filter by name or description.</li>
                    </ol>

                    <p>Whether you are looking for web development extensions to speed up debugging, design extensions for inspecting styles, or productivity tools to streamline your workflow, this collection covers all the essentials.</p>
                </section>
            `
        }
    },
    'html-css-templates': {
        title: 'HTML & CSS Templates',
        description: 'Website templates and themes',
        seo: {
            title: `Free HTML & CSS Website Templates – ${BRAND}`,
            description: 'Download high-quality free HTML5 and CSS3 website templates and themes for your next project.',
            ogImage: OG,
            keywords: 'free html templates, website templates, css themes, bootstrap templates, responsive templates, landing page templates',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                name: 'HTML & CSS Templates Resources',
                description: 'Download high-quality free HTML5 and CSS3 website templates and themes for your next project.',
                url: 'https://codehelper.me/resources/html-css-templates/',
                mainEntity: {
                    '@type': 'ItemList',
                    name: 'Best Free HTML & CSS Website Templates',
                    description: 'Curated list of free HTML5 templates, Bootstrap themes, responsive website templates, landing page templates, and admin dashboard themes'
                }
            },
            faqSchema: {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'Where can I download free HTML and CSS website templates?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Top sources for free HTML/CSS templates include HTML5 UP, Free CSS, TemplateFlip, Colorlib, and Start Bootstrap. These sites offer a wide variety of responsive HTML5 templates for portfolios, landing pages, business sites, and admin dashboards.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'Are free HTML templates safe to use commercially?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Many free HTML templates are released under Creative Commons or MIT licenses that permit commercial use. Always read the specific license for each template. Some free templates require attribution (a link back to the template creator), while others like those from HTML5 UP allow commercial use with attribution.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'What is the difference between HTML templates and WordPress themes?',
                        acceptedAnswer: { '@type': 'Answer', text: 'HTML/CSS templates are static files (HTML, CSS, JavaScript) that you serve directly or integrate into any backend. WordPress themes are designed specifically for the WordPress CMS and include PHP templates that integrate with WordPress functionality. HTML templates offer more flexibility; WordPress themes work best with the WordPress ecosystem.' }
                    }
                ]
            },
            seoContent: `
                <section>
                    <h2>Best Free HTML &amp; CSS Website Templates for Developers</h2>
                    <p><strong>HTML and CSS templates</strong> provide a ready-made structural and visual starting point for websites, saving hours of initial setup. Whether you need a landing page, portfolio, business site, or admin dashboard, free HTML5 templates let you go from zero to working prototype quickly.</p>
                    <p>CodeHelper's curated HTML/CSS templates collection includes the best sources for free responsive templates, Bootstrap themes, landing page templates, and admin dashboard templates :  all downloadable and customizable.</p>

                    <h3>What to look for in a free HTML template</h3>
                    <ul>
                        <li><strong>Responsive design</strong>: Templates should work well on mobile, tablet, and desktop without additional media query work.</li>
                        <li><strong>Clean code quality</strong>: Well-structured HTML and organized CSS make templates easier to customize and maintain.</li>
                        <li><strong>License terms</strong>: Verify whether the template requires attribution for commercial use, especially for client projects.</li>
                    </ul>

                    <h3>How to use this resource collection</h3>
                    <ol>
                        <li>Browse the curated list of template sites below.</li>
                        <li>Click any site to open it in a new tab.</li>
                        <li>Use the search bar to filter by name or description.</li>
                    </ol>

                    <p>Whether you are building a portfolio, creating a landing page for a product, or looking for free Bootstrap templates for a client project, this collection covers a wide range of website templates and css themes.</p>
                </section>
            `
        }
    },
    'icon-fonts': {
        title: 'Icon Fonts',
        description: 'Icon font libraries',
        seo: {
            title: `Icon Fonts & Web Font Libraries – ${BRAND}`,
            description: 'Popular icon font libraries for web developers. Easily scalable and styleable icons for your website.',
            ogImage: OG,
            keywords: 'icon fonts, web fonts, font awesome, material icons, icon sets, scalable icons, web design icons',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                name: 'Icon Fonts Resources',
                description: 'Popular icon font libraries for web developers. Easily scalable and styleable icons for your website.',
                url: 'https://codehelper.me/resources/icon-fonts/',
                mainEntity: {
                    '@type': 'ItemList',
                    name: 'Best Icon Fonts & Web Icon Libraries',
                    description: 'Curated list of popular icon fonts, web font kits, icon font generators, and scalable icon libraries for web developers'
                }
            },
            faqSchema: {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'What are the most popular icon fonts for web development?',
                        acceptedAnswer: { '@type': 'Answer', text: 'The most widely used icon fonts include Font Awesome (the most popular, with free and pro tiers), Material Icons (Google), Ionicons, Remix Icon, and Bootstrap Icons. Font Awesome 6 free includes over 2000 icons in solid, regular, and brand styles.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'Should I use icon fonts or SVG icons in 2025?',
                        acceptedAnswer: { '@type': 'Answer', text: 'SVG icons are generally preferred in modern web development for better accessibility, sharper rendering, individual loading capability, and the ability to style individual paths. Icon fonts are still widely used and practical, especially when you need a large icon set via a single CSS import.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'How do I add Font Awesome to my website?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Add Font Awesome via CDN by including the link tag from cdnjs or the Font Awesome CDN in your HTML head. Alternatively, install the npm package for use in JavaScript frameworks. Use class names like fa-solid fa-house to display icons in your HTML.' }
                    }
                ]
            },
            seoContent: `
                <section>
                    <h2>Best Icon Fonts &amp; Web Icon Libraries for Developers</h2>
                    <p><strong>Icon fonts</strong> remain one of the most practical ways to add scalable, CSS-styleable icons to websites. A single font file can provide thousands of icons that render crisp at any size and can be colored, sized, and animated with pure CSS.</p>
                    <p>CodeHelper's curated icon fonts collection covers the most popular icon font libraries :  Font Awesome, Material Icons, Ionicons, Bootstrap Icons, Remix Icon :  plus tools for generating custom icon fonts from your own SVG files.</p>

                    <h3>What to look for in an icon font library</h3>
                    <ul>
                        <li><strong>Icon variety and coverage</strong>: Good icon fonts cover UI essentials (arrows, controls, navigation) plus domain-specific icons (brands, social, e-commerce).</li>
                        <li><strong>Free tier scope</strong>: Check how many icons are available for free vs. requiring a paid license :  Font Awesome free offers 2000+ icons.</li>
                        <li><strong>CDN availability</strong>: Easy CDN installation makes icon fonts quick to add to any project without a build step.</li>
                    </ul>

                    <h3>How to use this resource collection</h3>
                    <ol>
                        <li>Browse the curated list of icon font libraries below.</li>
                        <li>Click any library to open its website in a new tab.</li>
                        <li>Use the search bar to filter by name or description.</li>
                    </ol>

                    <p>Whether you are adding Font Awesome to a project, looking for scalable icons for a design system, or building a custom icon font from your own SVG icons, this collection provides all the resources you need.</p>
                </section>
            `
        }
    },
    'sound-effects': {
        title: 'Sound Effects',
        description: 'Free audio and sound effects',
        seo: {
            title: `Free Sound Effects & Royalty-Free Audio – ${BRAND}`,
            description: 'Libraries of free sound effects and royalty-free music for games, videos, and applications.',
            ogImage: OG,
            keywords: 'free sound effects, royalty free music, game audio, background music, stock audio, sound clips',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                name: 'Sound Effects Resources',
                description: 'Libraries of free sound effects and royalty-free music for games, videos, and applications.',
                url: 'https://codehelper.me/resources/sound-effects/',
                mainEntity: {
                    '@type': 'ItemList',
                    name: 'Best Free Sound Effects & Royalty-Free Audio Libraries',
                    description: 'Curated list of free sound effect libraries, royalty-free music sites, game audio assets, and UI sound resources'
                }
            },
            faqSchema: {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'Where can I download free sound effects?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Top sources for free sound effects include Freesound.org (community-driven library), Zapsplat, Mixkit, and BBC Sound Effects (released under a non-commercial license). Freesound has the largest library with over 500,000 sounds in various formats.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'Where can I find royalty-free music for my game or video?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Free royalty-free music sources include Free Music Archive, ccMixter, Incompetech (by Kevin MacLeod), and YouTube Audio Library. These offer music for commercial use under Creative Commons or custom licenses, often with attribution requirements.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'What are UI sounds and how do I add them to a web app?',
                        acceptedAnswer: { '@type': 'Answer', text: 'UI sounds are short audio cues for user interface interactions :  button clicks, notifications, success/error feedback. In web apps, use the Web Audio API or simple HTML5 audio elements to trigger sounds on user interactions. Keep UI sounds subtle and provide a way for users to mute them.' }
                    }
                ]
            },
            seoContent: `
                <section>
                    <h2>Best Free Sound Effects &amp; Royalty-Free Audio for Developers</h2>
                    <p><strong>Sound effects</strong> and royalty-free audio are essential for game development, video production, podcast creation, and interactive web applications. Finding high-quality, free audio assets that are safe to use commercially can be challenging without the right resources.</p>
                    <p>CodeHelper's curated sound effects collection covers free sound effect libraries, royalty-free music sites, game audio asset collections, and UI sound resources :  everything a developer or content creator needs.</p>

                    <h3>What to look for in a free sound library</h3>
                    <ul>
                        <li><strong>License clarity</strong>: Distinguish between Creative Commons (may require attribution), public domain (completely free), and custom commercial licenses.</li>
                        <li><strong>Audio quality</strong>: High-quality WAV files (44.1kHz, 16-bit minimum) ensure professional results in games and video productions.</li>
                        <li><strong>Search capability</strong>: Good sound libraries have detailed tagging and search so you can find specific sounds quickly by category or description.</li>
                    </ul>

                    <h3>How to use this resource collection</h3>
                    <ol>
                        <li>Browse the curated list of sound effect sites below.</li>
                        <li>Click any site to open it in a new tab.</li>
                        <li>Use the search bar to filter by name or description.</li>
                    </ol>

                    <p>Whether you are adding UI sounds to a web application, sourcing game audio assets for an indie game, or finding royalty-free music for a video project, this free collection saves you hours of searching.</p>
                </section>
            `
        }
    },
    'others': {
        title: 'Other Resources',
        description: 'Miscellaneous developer resources',
        seo: {
            title: `Useful Developer Tools & Resources – ${BRAND}`,
            description: 'A collection of miscellaneous but incredibly useful tools, cheatsheets, and resources for developers.',
            ogImage: OG,
            keywords: 'developer resources, web tools, coding cheatsheets, utilities, miscellaneous tools, programming resources',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                name: 'Other Resources',
                description: 'A collection of miscellaneous but incredibly useful tools, cheatsheets, and resources for developers.',
                url: 'https://codehelper.me/resources/others/',
                mainEntity: {
                    '@type': 'ItemList',
                    name: 'Best Miscellaneous Developer Tools & Resources',
                    description: 'Curated list of developer cheatsheets, web utilities, file converters, accessibility tools, and miscellaneous programming resources'
                }
            },
            faqSchema: {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'What are useful miscellaneous tools for web developers?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Useful miscellaneous developer tools include Can I Use (browser compatibility), RegExr (regular expression testing), DevDocs (unified API documentation), Bundlephobia (npm package size checker), Carbon (code screenshot tool), and Ray.so. These solve specific development tasks that do not fit neatly into other categories.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'Where can I find developer cheatsheets?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Devhints.io offers beautifully designed cheatsheets for many development topics. OverAPI.com provides large visual cheatsheets for popular languages and frameworks. QuickRef.me is another comprehensive cheatsheet collection covering CSS, JavaScript, Git, Linux, and more.' }
                    },
                    {
                        '@type': 'Question',
                        name: 'What accessibility testing tools should developers use?',
                        acceptedAnswer: { '@type': 'Answer', text: 'Key accessibility testing tools include axe DevTools (browser extension and CLI), WAVE (web accessibility evaluation), Lighthouse (built into Chrome DevTools), and the WebAIM Contrast Checker. Using a screen reader like NVDA (Windows) or VoiceOver (Mac/iOS) for manual testing is also recommended.' }
                    }
                ]
            },
            seoContent: `
                <section>
                    <h2>Best Miscellaneous Developer Tools &amp; Resources</h2>
                    <p>Some of the most valuable <strong>developer resources</strong> do not fit neatly into a single category. From browser compatibility checkers and coding cheatsheets to accessibility auditors and file converters, miscellaneous web tools fill important gaps in any developer's toolkit.</p>
                    <p>CodeHelper's curated miscellaneous resources collection gathers the most useful programming resources that do not belong elsewhere :  utilities that developers reach for daily across all kinds of projects and tech stacks.</p>

                    <h3>What to look for in miscellaneous developer tools</h3>
                    <ul>
                        <li><strong>Focused functionality</strong>: The best utility tools do one thing exceptionally well :  a regex tester, a diff checker, a base64 encoder :  rather than trying to be everything.</li>
                        <li><strong>No-account required</strong>: For quick utility tasks, tools that work instantly without sign-up provide the best developer experience.</li>
                        <li><strong>Reliable uptime</strong>: Developer tools you depend on daily should be stable, maintained, and available offline or as CLI tools where possible.</li>
                    </ul>

                    <h3>How to use this resource collection</h3>
                    <ol>
                        <li>Browse the curated list of developer tools below.</li>
                        <li>Click any tool to open it in a new tab.</li>
                        <li>Use the search bar to filter by name or description.</li>
                    </ol>

                    <p>Whether you are looking for coding cheatsheets for a new technology, web utilities to solve a specific problem, or miscellaneous tools to round out your programming resources toolkit, this collection has you covered.</p>
                </section>
            `
        }
    },
}


// ============================================================================
// EXTERNAL RESOURCES DATA
// ============================================================================

export const externalResources: Record<ResourceCategory, ExternalResource[]> = {
    // Design & Assets Categories
    'colors': [
        { name: 'Color Brewer 2', href: 'https://colorbrewer2.org/', desc: 'The original color palette generator, also supporting color blindness. Probably the scientifically best option. Also probably not the prettiest.', category: 'colors', bgColor: 'bg-pink-600' },
        { name: 'Huetone', href: 'https://github.com/ardov/huetone', desc: 'A tool to create accessible color systems.', category: 'colors', bgColor: 'bg-purple-600' },
        { name: 'Colormind.io', href: 'http://colormind.io', desc: 'Color palette generator', category: 'colors', bgColor: 'bg-yellow-500' },
        { name: 'ColorCurves.app', href: 'https://colorcurves.app', desc: 'Color palette generator that uses curves to generate color palettes', category: 'colors', bgColor: 'bg-green-500' },
        { name: 'ColorGradient', href: 'https://colorgradient.dev/', desc: 'A free tool to create simple and complex CSS Gradients visually', category: 'colors', bgColor: 'bg-orange-500' },
        { name: 'Coolors', href: 'https://coolors.co', desc: 'Create the perfect palette or get inspired by thousands of beautiful color schemes', category: 'colors', bgColor: 'bg-blue-500' },
        { name: 'HTML Color Codes', href: 'https://htmlcolorcodes.com/', desc: 'HTML color codes, Hex color codes, RGB and HSL values with our color picker, color chart and HTML color names', category: 'colors', bgColor: 'bg-cyan-500' },
        { name: 'Colors & Fonts', href: 'https://www.colorsandfonts.com/', desc: 'A curated library of colors, fonts and resources', category: 'colors', bgColor: 'bg-sky-500' },
        { name: 'Palette List', href: 'https://www.palettelist.com/', desc: 'Pick 2 colors you like and the tool generates thousands of palettes for you.', category: 'colors', bgColor: 'bg-amber-500' },
        { name: 'Google Material Color Tool', href: 'https://material.io/resources/color/', desc: 'Official Google Material Color Palette Tool', category: 'colors', bgColor: 'bg-red-500' },
        { name: 'Material Palette', href: 'https://www.materialpalette.com/', desc: 'Free to pick palettes, icons and colors for Material Design', category: 'colors', bgColor: 'bg-emerald-500' },
        { name: 'ColorSpace', href: 'https://mycolor.space/', desc: 'Generate nice color palettes from one color', category: 'colors', bgColor: 'bg-pink-500' },
        { name: 'FlatUIColors', href: 'https://flatuicolors.com', desc: 'Beautiful set of color palettes in various flavors', category: 'colors', bgColor: 'bg-purple-600' },
        { name: 'Adobe Color', href: 'https://color.adobe.com/create', desc: 'Create color palettes, extract gradients from images, etc.', category: 'colors', bgColor: 'bg-yellow-500' },
        { name: 'Colorsinspo', href: 'https://colorsinspo.com/', desc: 'All-in-one resource for finding everything about colors', category: 'colors', bgColor: 'bg-green-500' },
        { name: 'ColorsWall', href: 'https://colorswall.com/', desc: 'Place to store your color palettes and generate palette in one click', category: 'colors', bgColor: 'bg-orange-500' },
        { name: 'Happyhues', href: 'https://www.happyhues.co/', desc: 'Happy Hues is a color palette inspiration site that acts as a real-world example as to how the colors could be used in your design projects by Mackenzie Child', category: 'colors', bgColor: 'bg-blue-500' },
        { name: 'Adobe Trends', href: 'https://color.adobe.com/trends', desc: 'Discover current color trends in different industries from the creative communities on Behance and Adobe Stock', category: 'colors', bgColor: 'bg-cyan-500' },
        { name: 'Color Hunt', href: 'https://colorhunt.co/', desc: 'A free and open platform for color inspiration with thousands of trendy hand-picked color palettes', category: 'colors', bgColor: 'bg-sky-500' },
        { name: 'Gradient Hunt', href: 'https://gradienthunt.com/', desc: 'A free and open platform for gradient inspiration with thousands of trendy hand-picked color gradients', category: 'colors', bgColor: 'bg-amber-500' },
        { name: 'Web Gradients', href: 'https://webgradients.com/', desc: 'A free website to find good CSS gradients', category: 'colors', bgColor: 'bg-red-500' },
        { name: 'ColorBox', href: 'https://www.colorbox.io', desc: 'A free website to produce color set', category: 'colors', bgColor: 'bg-emerald-500' },
        { name: 'CSS gradient', href: 'https://cssgradient.io/', desc: 'A free website to make custom gradient and some examples of gradient', category: 'colors', bgColor: 'bg-pink-500' },
        { name: 'Gradienta', href: 'https://gradienta.io/', desc: 'A pure css and jpg gradients', category: 'colors', bgColor: 'bg-purple-600' },
        { name: 'UI Gradients', href: 'https://uigradients.com/', desc: 'UI gradients color generator', category: 'colors', bgColor: 'bg-yellow-500' },
        { name: 'Palette Generator', href: 'https://palettegenerator.colorion.co/', desc: 'Generate new color palette with every spacebar press', category: 'colors', bgColor: 'bg-green-500' },
        { name: 'Material Palettes', href: 'https://material.colorion.co/', desc: '1000+ Material Design palettes', category: 'colors', bgColor: 'bg-orange-500' },
        { name: 'Grabient', href: 'https://www.grabient.com/', desc: 'Gradient Selector', category: 'colors', bgColor: 'bg-blue-500' },
        { name: 'ShadeSwash', href: 'https://shadeswash.netlify.app/', desc: 'Quickly generate shades of any color', category: 'colors', bgColor: 'bg-cyan-500' },
        { name: 'BrandColors', href: 'http://brandcolors.net/', desc: 'The biggest collection of official brand color codes', category: 'colors', bgColor: 'bg-amber-500' },
        { name: 'Brand Palettes', href: 'https://brandpalettes.com/', desc: 'Logo Color Codes and Palettes', category: 'colors', bgColor: 'bg-red-500' },
        { name: 'Material Design Palette Generator', href: 'http://mcg.mbitson.com', desc: 'Generate theme and color palette Material Design-like', category: 'colors', bgColor: 'bg-emerald-500' },
        { name: 'Colorate', href: 'https://colorate.azurewebsites.net/', desc: 'Color scheme tool for designers and developers. This will help you draw inspiration and serve as a resource for your color work.', category: 'colors', bgColor: 'bg-pink-500' },
        { name: '0to255', href: 'https://www.0to255.com/', desc: 'A color tool that makes it easy to lighten and darken colors. It\'s perfect for hover states, borders, gradients, and more.', category: 'colors', bgColor: 'bg-purple-600' },
        { name: 'Color Blender', href: 'https://meyerweb.com/eric/tools/color-blend', desc: 'A tool that shows the midpoint colors between two colors', category: 'colors', bgColor: 'bg-yellow-500' },
        { name: 'Gradient Buttons', href: 'https://gradientbuttons.colorion.co/', desc: 'Ready to use copy/paste gradient buttons', category: 'colors', bgColor: 'bg-green-500' },
        { name: 'Khroma', href: 'http://khroma.co/', desc: 'Khroma uses AI to learn which colors you like and creates limitless palettes for you to discover, search, and save.', category: 'colors', bgColor: 'bg-orange-500' },
        { name: 'Whocanuse', href: 'https://whocanuse.com', desc: 'A tool that brings attention and understanding to how color contrast can affect different people with visual impairments.', category: 'colors', bgColor: 'bg-blue-500' },
        { name: 'Colorable', href: 'https://colorable.jxnblk.com/', desc: 'Color combination contrast tester', category: 'colors', bgColor: 'bg-cyan-500' },
        { name: 'Color Hex Picker', href: 'https://colorhexpicker.com', desc: 'Tool to get hex code along with name of the color.', category: 'colors', bgColor: 'bg-sky-500' },
        { name: 'Saruwakakun', href: 'https://saruwakakun.com/en/color-ideas', desc: 'The stunning color scheme for website & App Designs with previews', category: 'colors', bgColor: 'bg-amber-500' },
        { name: 'Paletton', href: 'https://paletton.com/', desc: 'Paletton.com is a designer color tool designed for creating color combinations that work together well', category: 'colors', bgColor: 'bg-red-500' },
        { name: 'Colorzilla', href: 'https://www.colorzilla.com/', desc: 'A powerful online Photoshop-like CSS gradient editor', category: 'colors', bgColor: 'bg-emerald-500' },
        { name: 'CSS Gradient Editor', href: 'https://www.cssgradienteditor.com', desc: 'You may only need this tool for creating CSS gradient backgrounds and patterns.', category: 'colors', bgColor: 'bg-pink-500' },
        { name: 'Image Color Picker', href: 'https://image-color.com/', desc: 'Image color picker and palette generator', category: 'colors', bgColor: 'bg-purple-600' },
        { name: 'CombineCOLORS', href: 'https://combinecolors.com/', desc: 'Color mixing tool', category: 'colors', bgColor: 'bg-yellow-500' },
        { name: 'Color Lovers', href: 'https://www.colourlovers.com/palettes', desc: 'It will show the color schemes which are popular in the outside world.', category: 'colors', bgColor: 'bg-pink-600' },
        { name: 'HTML CSS Color', href: 'https://www.htmlcsscolor.com/', desc: 'Free online Color (USA) or Colour (British) tools: information, gradient generator, color wheels etc.', category: 'colors', bgColor: 'bg-purple-600' },
        { name: 'HEX Color Codes', href: 'https://hexcolorcodes.org/', desc: 'It gets HTML color codes, Hex color codes, RGB and HSL values with our color picker, color chart and HTML color names.', category: 'colors', bgColor: 'bg-yellow-500' },
        { name: 'CoolHue 2.0', href: 'https://webkul.github.io/coolhue/', desc: 'A free tool that shows different gradient examples in CSS and PNG format', category: 'colors', bgColor: 'bg-green-500' },
        { name: 'Colors.lol', href: 'https://colors.lol/', desc: 'Interesting color palettes generated by a Twitter bot, there are hex codes and descriptive names for each color.', category: 'colors', bgColor: 'bg-orange-500' },
        { name: 'Colors Dopely', href: 'https://colors.dopely.top/', desc: 'Super-fast and simple color palette generator, palettes can be saved and shared in seconds.', category: 'colors', bgColor: 'bg-blue-500' },
        { name: 'UIColor Picker', href: 'https://uicolorpicker.com/', desc: 'A collection of UI Colors with hex codes available to be copied in just one click.', category: 'colors', bgColor: 'bg-cyan-500' },
        { name: 'Color Hex', href: 'https://www.color-hex.com', desc: 'Color-hex gives information about colors including color models (RGB,HSL,HSV and CMYK) and generates a simple css code for the selected color.', category: 'colors', bgColor: 'bg-sky-500' },
        { name: 'FarbVelo', href: 'https://farbvelo.elastiq.ch/', desc: 'A random color palette generator', category: 'colors', bgColor: 'bg-amber-500' },
        { name: 'Veranda Color', href: 'https://verandacolor.com', desc: 'Browse color palettes made by other designers, generate and submit your own', category: 'colors', bgColor: 'bg-red-500' },
        { name: 'Duo', href: 'https://duo.alexpate.uk/', desc: 'Duo is a collection of colour combinations that I\'ve curated from personal projects or that I\'ve come across on the web.', category: 'colors', bgColor: 'bg-emerald-500' },
        { name: 'Lospec Palette List', href: 'https://lospec.com/palette-list', desc: 'The Lospec Palette List is a database of palettes for pixel art.', category: 'colors', bgColor: 'bg-pink-500' },
        { name: 'Eggradients', href: 'https://www.eggradients.com/', desc: 'Gradient Background Colors with eggs.', category: 'colors', bgColor: 'bg-purple-600' },
        { name: 'Gradientos', href: 'https://www.gradientos.app/', desc: 'Find and test gradients easily.', category: 'colors', bgColor: 'bg-yellow-500' },
        { name: 'Encycolorpedia', href: 'https://encycolorpedia.com/', desc: 'Website for referencing web colors. Color knowledge, Web colors, Hex color codes.', category: 'colors', bgColor: 'bg-green-500' },
        { name: 'Croma', href: 'https://croma.app/', desc: 'A website for pick colors quickly from image or manually. It\'s color picker is easier to use.', category: 'colors', bgColor: 'bg-orange-500' },
        { name: 'Color Designer', href: 'https://colordesigner.io/gradient-generator', desc: 'A gradient generetor from one color.', category: 'colors', bgColor: 'bg-blue-500' },
    ],

    'icons': [
        { name: 'UXWing', href: 'https://uxwing.com/', desc: 'Well Optimized, Free icons for commercial use', category: 'icons', bgColor: 'bg-pink-600' },
        { name: 'Shapedfonts Iconclub', href: 'https://shapedfonts.com/iconclub/', desc: '8000+ free icons', category: 'icons', bgColor: 'bg-purple-600' },
        { name: 'Feather Icons', href: 'https://feathericons.com/', desc: 'Beautiful, customizable open source icons', category: 'icons', bgColor: 'bg-yellow-500' },
        { name: 'Tabler Icons', href: 'https://tablericons.com/', desc: '470+ highly customizable open source SVG icon', category: 'icons', bgColor: 'bg-green-500' },
        { name: 'Xicons', href: 'https://www.xicons.org/#/', desc: 'SVG Vue/React components integrated from fluentui-system-icons, ionicons, etc. (Vue3, Vue2, React, SVG)', category: 'icons', bgColor: 'bg-orange-500' },
        { name: 'Iconoir', href: 'https://iconoir.com/', desc: 'Free library of 900+ open source icons', category: 'icons', bgColor: 'bg-blue-500' },
        { name: 'Simple Icons', href: 'https://simpleicons.org/', desc: '1307 Free SVG icons for popular brands', category: 'icons', bgColor: 'bg-cyan-500' },
        { name: 'Linear Icons', href: 'https://linearicons.com/free', desc: '1000+ Ultra crisp vector icons', category: 'icons', bgColor: 'bg-sky-500' },
        { name: 'Icons8', href: 'https://icons8.com/', desc: 'Free icons, photos, vectors and tools', category: 'icons', bgColor: 'bg-amber-500' },
        { name: 'Flat Icon', href: 'https://www.flaticon.com/', desc: 'The largest database of free icons in PNG, SVG, EPS, PSD and BASE 64 formats', category: 'icons', bgColor: 'bg-red-500' },
        { name: 'The Noun Project', href: 'https://thenounproject.com/', desc: 'Over 2 Million curated icons, created by a global community', category: 'icons', bgColor: 'bg-emerald-500' },
        { name: 'Iconscout', href: 'https://iconscout.com/', desc: 'Free Download Icons illustrations stock photos at one place', category: 'icons', bgColor: 'bg-pink-500' },
        { name: 'IconSear.ch', href: 'https://iconsear.ch/search.html', desc: 'Search engine with over 50,000 SVG icons indexed', category: 'icons', bgColor: 'bg-purple-600' },
        { name: 'Nucleo App', href: 'https://nucleoapp.com/', desc: 'Nucleo is a beautiful library of 27500 icons, and a powerful application to collect, customize and export all your icons. (Free & Paid)', category: 'icons', bgColor: 'bg-yellow-500' },
        { name: 'Icon-icons.com', href: 'https://icon-icons.com/', desc: 'Free Icons PNG, ICO, ICNS and Vector file SVG', category: 'icons', bgColor: 'bg-green-500' },
        { name: 'Bootstrap Icons', href: 'https://icons.getbootstrap.com', desc: 'Free Icons built for Bootstrap but they\'ll work in any project', category: 'icons', bgColor: 'bg-orange-500' },
        { name: 'Remix Icon', href: 'https://remixicon.com/', desc: 'Simply Delightful Icon System', category: 'icons', bgColor: 'bg-blue-500' },
        { name: 'Iconmonstr', href: 'https://iconmonstr.com/', desc: 'Discover 4496+ free icons in 313 collections', category: 'icons', bgColor: 'bg-cyan-500' },
        { name: 'Vivid.js', href: 'https://webkul.github.io/vivid/', desc: 'Ready to use Free and Open Source SVG Icons Pack JavaScript Library', category: 'icons', bgColor: 'bg-sky-500' },
        { name: 'Iconfinder', href: 'https://www.iconfinder.com/', desc: 'Free and premium vector icons in SVG, PNG, CSH and AI format', category: 'icons', bgColor: 'bg-amber-500' },
        { name: 'Lordicon', href: 'https://lordicon.com/icons#free', desc: '50 free animated interactive icons', category: 'icons', bgColor: 'bg-red-500' },
        { name: 'UseAnimations', href: 'https://useanimations.com/', desc: 'Free Animated Icons in SVG and Json Format(for lottie)', category: 'icons', bgColor: 'bg-emerald-500' },
        { name: 'Css.gg', href: 'https://css.gg/', desc: '700+ Open-source CSS, SVG and Figma UI Icons Available in SVG Sprite, styled-components, NPM & API', category: 'icons', bgColor: 'bg-pink-500' },
        { name: 'IconBros', href: 'https://www.iconbros.com', desc: '7843+ free icons grouped in 182 collections', category: 'icons', bgColor: 'bg-purple-600' },
        { name: 'Material Design Icons', href: 'https://materialdesignicons.com/', desc: 'An icon collection allowing designers and developers targeting various platforms to download icons in the format, color and size they need for any project.', category: 'icons', bgColor: 'bg-yellow-500' },
        { name: 'Heroicons', href: 'https://heroicons.dev/', desc: 'Free, open source icons from the creators of Tailwind CSS.', category: 'icons', bgColor: 'bg-green-500' },
        { name: 'Zondicons', href: 'https://www.zondicons.com/icons.html', desc: 'A set of free premium SVG icons for you to use on your digital products.', category: 'icons', bgColor: 'bg-orange-500' },
        { name: 'Endless Icons', href: 'http://endlessicons.com/', desc: 'A website offering a number of free icons. Icons are tagged and also compressed into kits.', category: 'icons', bgColor: 'bg-blue-500' },
        { name: 'Icomoon', href: 'https://icomoon.io/app/', desc: 'Browse 5500+ Free Icons. Add any set you wish to easily browse and search its icons.', category: 'icons', bgColor: 'bg-cyan-500' },
        { name: 'Eva Icons', href: 'https://akveo.github.io/eva-icons/#/', desc: 'Eva Icons is a pack of more than 480 beautifully crafted Open Source icons for common actions and items.', category: 'icons', bgColor: 'bg-amber-500' },
        { name: 'Cryptoicons', href: 'http://cryptoicons.co/', desc: 'A set of 430 crypto and fiat currency icons. Completely free.', category: 'icons', bgColor: 'bg-red-500' },
        { name: 'Ikonate', href: 'https://ikonate.com/', desc: 'Fully customizable & accessible vector icons', category: 'icons', bgColor: 'bg-emerald-500' },
        { name: 'Appicon', href: 'https://appicon.co/', desc: 'Quickly generate app icons in different sizes for your IOS, macOS and Android projects', category: 'icons', bgColor: 'bg-pink-500' },
        { name: 'LineIcons', href: 'https://lineicons.com', desc: 'Evericons is a big pack of over 460 free icons designed by Aleksey Popov.', category: 'icons', bgColor: 'bg-purple-600' },
        { name: 'SVG Repo', href: 'https://www.svgrepo.com/', desc: 'Download free SVG Vectors for commercial use.', category: 'icons', bgColor: 'bg-yellow-500' },
        { name: 'Convertio', href: 'https://convertio.co/png-svg/', desc: 'Convert PNG files to SVG online & free. (One of the services provided by it.)', category: 'icons', bgColor: 'bg-green-500' },
        { name: 'CSS ICON', href: 'https://cssicon.space/', desc: 'Icon set made with pure css code, no dependencies, "grab and go" icons', category: 'icons', bgColor: 'bg-orange-500' },
        { name: 'Unified icons', href: 'https://iconify.design/', desc: 'Thousands of icons, one unified framework. One library, over 40,000 vector icons.', category: 'icons', bgColor: 'bg-blue-500' },
        { name: 'System UIcons', href: 'https://systemuicons.com/', desc: '220+ icons in a growing collection.', category: 'icons', bgColor: 'bg-cyan-500' },
        { name: 'IconPark', href: 'https://github.com/bytedance/IconPark', desc: 'Transform an SVG icon into multiple themes, and generate React icons，Vue icons，svg icons', category: 'icons', bgColor: 'bg-sky-500' },
        { name: 'Radix Icons', href: 'https://icons.modulz.app/', desc: 'A crisp set of 15×15 icons designed by the Modulz team. All icons available as individual react component,SVG and more.', category: 'icons', bgColor: 'bg-amber-500' },
        { name: 'EOS Icons', href: 'https://icons.eosdesignsystem.com/', desc: 'A pixel-perfect, open source iconic font available as ligature and SVG.', category: 'icons', bgColor: 'bg-red-500' },
        { name: 'Ionicons', href: 'https://ionicons.com', desc: 'Beautifully crafted open source icons for use in web, iOS, Android, and desktop apps.', category: 'icons', bgColor: 'bg-emerald-500' },
        { name: 'Phosphor Icons', href: 'https://phosphoricons.com', desc: 'Phosphor is a flexible icon family for interfaces, diagrams, presentations', category: 'icons', bgColor: 'bg-pink-500' },
        { name: 'Teeny Icons', href: 'https://teenyicons.com/', desc: 'TeenyIcons is a set icons in SVG format easy to use in html', category: 'icons', bgColor: 'bg-purple-600' },
        { name: 'Lucide', href: 'https://lucide.netlify.app/', desc: 'Lucide is an open-source icon library, a fork of Feather Icons.', category: 'icons', bgColor: 'bg-yellow-500' },
        { name: 'Icones', href: 'https://icones.js.org/', desc: 'Icon Explorer with Instant searching, powered by Iconify.', category: 'icons', bgColor: 'bg-pink-600' },
        { name: 'Shitty Icons', href: 'https://shittyicons.com/', desc: 'Collection of Free icons.', category: 'icons', bgColor: 'bg-purple-600' },
        { name: 'Iconhub', href: 'https://iconhub.io/', desc: 'Just practical stunning icons for everyone', category: 'icons', bgColor: 'bg-yellow-500' },
        { name: '3DICONS', href: 'https://3dicons.co', desc: 'Beautifully crafted open source 3D icons', category: 'icons', bgColor: 'bg-green-500' },
        { name: 'IconsDb', href: 'https://www.iconsdb.com/', desc: 'Free Custom Icons', category: 'icons', bgColor: 'bg-orange-500' },
    ],

    'fonts': [
        { name: 'Google Fonts', href: "https://fonts.google.com/", desc:'Library of around 1000 free licensed font families', bgColor: 'bg-pink-600', category: 'fonts' },
        { name: 'DaFont', href:"https://www.dafont.com/", desc:'Archive of freely downloadable fonts', bgColor: 'bg-purple-600', category: 'fonts' },
        { name: 'Use & Modify', href: "https://usemodify.com/", desc: 'Personal selection of beautiful, classy, punk, professional, incomplete, weird typefaces', bgColor: 'bg-yellow-500', category: 'fonts' },
        { name: '1001 Free Fonts', href: "https://www.1001freefonts.com/", desc: 'I think the name speaks for itself', bgColor: 'bg-green-500', category: 'fonts' },
        { name: 'Font Squirrel', href: "https://www.fontsquirrel.com/", desc: 'Font Squirrel scours the internet for high quality, legitimately free fonts', bgColor: 'bg-orange-500', category: 'fonts' },
        { name: 'Font Fabric', href: "https://www.fontfabric.com/free-fonts/", desc: 'A digital type foundry crafting retail fonts and custom typography for various brands', bgColor: 'bg-blue-500', category: 'fonts' },
        { name: 'Tiff', href: "https://tiff.herokuapp.com/", desc: 'A type diff tool that visually contrasts the differences between two fonts', bgColor: 'bg-cyan-500', category: 'fonts' },
        { name: 'TypeKit Practice', href: "https://practice.typekit.com/", desc: 'Learn about typography practices', bgColor: 'bg-sky-500', category: 'fonts' },
        { name: 'Fontjoy', href: "https://fontjoy.com/", desc: 'Generate font pairing in one click', bgColor: 'bg-amber-500', category: 'fonts' },
        { name: 'Golden Ratio', href: "https://grtcalculator.com/", desc: 'Golden Ratio Typography Calculator', bgColor: 'bg-red-500', category: 'fonts' },
        { name: 'FontGet', href: "https://www.fontget.com/", desc: 'Has a variety of fonts available to download and sorted neatly with tags', bgColor: 'bg-emerald-500', category: 'fonts' },
        { name: 'FontPair', href: "https://fontpair.co/", desc: 'Helps you pair Google Fonts together', bgColor: 'bg-pink-500', category: 'fonts' },
        { name: 'Font Space', href:"https://www.fontspace.com/", desc:'A designer-centered free font website that has quick customizable previews', bgColor: 'bg-purple-600', category: 'fonts' },
        { name: 'Abstract Fonts', href: "http://www.abstractfonts.com/", desc: 'Fonts free for personal and commercial use', bgColor: 'bg-yellow-500', category: 'fonts' },
        { name: 'Free Typography', href: "https://freetypography.com/" , desc: 'A list of high quality fonts', bgColor: 'bg-green-500', category: 'fonts' },
        { name: 'Leon Sans', href: "https://github.com/cmiscm/leonsans/", desc: 'A geometric sans-serif typeface made with code', bgColor: 'bg-orange-500', category: 'fonts' },
        { name: 'Lexend', href: "https://www.lexend.com/", desc: 'A variable font empirically shown to significantly improve reading-proficiency', bgColor: 'bg-blue-500', category: 'fonts' },
        { name: 'Fonts for Apple Platforms', href: "https://developer.apple.com/fonts/", desc: 'Get the details, frameworks, and tools you need to use system fonts for Apple platforms in your apps', bgColor: 'bg-cyan-500', category: 'fonts' },
        { name: 'SFWin', href: "https://github.com/blaisck/sfwin/", desc: 'San Francisco Fonts for Windows 10 and non-Apple Platform<', bgColor: 'bg-sky-500', category: 'fonts' },
        { name: 'Font Flipper', href: "https://fontflipper.com/", desc: 'Preview 800+ Google Fonts on top of your own designs, without having to download the fonts', bgColor: 'bg-amber-500', category: 'fonts' },
        { name: 'Fonts Arena', href: "https://fontsarena.com/", desc: 'Free curated fonts', bgColor: 'bg-red-500', category: 'fonts' },
        { name: 'Befonts', href: "https://befonts.com/", desc: 'High quality fonts for free', bgColor: 'bg-emerald-500', category: 'fonts' },
        { name: 'Arabic fonts', href: "https://arabicfonts.net/", desc: 'Arabic fonts for free', bgColor: 'bg-pink-500', category: 'fonts' },
        { name: 'FontDrop', href:"https://fontdrop.info" , desc:'Simple and easy way to view the contents of font files', bgColor: 'bg-purple-600', category: 'fonts' },
        { name: 'Open Foundry', href: "https://open-foundry.com", desc: 'FREE platform for curated open-source typefaces', bgColor: 'bg-yellow-500', category: 'fonts' },
        { name: 'Glyphter', href: "https://glyphter.com", desc: 'Upload your own SVGS and turn them into font files. Useful if you want a smaller library loaded', bgColor: 'bg-green-500', category: 'fonts' },
        { name: 'Google Webfonts Helper', href: "https://google-webfonts-helper.herokuapp.com/fonts", desc: 'A Hassle-Free Way to Self-Host Google Fonts', bgColor: 'bg-orange-500', category: 'fonts' },
        { name: 'Rough Font Awesome', href: "https://djamshed.github.io/rough-awesome-font/dist/", desc: 'When RoughJS meets Font Awesome', bgColor: 'bg-blue-500', category: 'fonts' },
        { name: 'FFonts', href: "https://ffonts.net", desc: 'Stylish fonts for free', bgColor: 'bg-cyan-500', category: 'fonts' },
        { name: 'Malayalam Fonts', href: "https://smc.org.in/fonts/", desc: 'Malayalam fonts for free which are maintained by Swathanthra Malayalam Computing(SMC)', bgColor: 'bg-amber-500', category: 'fonts' },
        { name: 'Dev Fonts', href: "https://devfonts.gafi.dev/", desc: 'Find and use the coding fonts for free', bgColor: 'bg-red-500', category: 'fonts' },
        { name: 'Font M', href: "https://fontm.com/", desc: 'Free font you can download for material coding and design', bgColor: 'bg-emerald-500', category: 'fonts' },
        { name: 'W Fonts', href: "https://www.wfonts.com/", desc: 'Download Free fonts', bgColor: 'bg-pink-500', category: 'fonts' },
        { name: 'Modern fluid typography editor', href:"https://modern-fluid-typography.vercel.app/", desc:'Fluid typography is a modern way of approaching responsive typography.', bgColor: 'bg-purple-600', category: 'fonts' },
        { name: 'UrbanFonts', href: "https://www.urbanfonts.com/", desc: 'A collection of over 8000 free fonts and dingbats', bgColor: 'bg-yellow-500', category: 'fonts' },
    ],

    'stock-photos': [
        { name: 'Pexels', href: "https://www.pexels.com/", desc:'Free stock photos shared by talented creators', bgColor: 'bg-pink-600', category: 'stock-photos' },
        { name: 'Unsplash', href:"https://unsplash.com/", desc:'The internet’s source of freely usable images', bgColor: 'bg-purple-600', category: 'stock-photos' },
        { name: 'Pixabay', href: "https://pixabay.com/", desc: 'Over 1.7 million+ high-quality stock images and videos', bgColor: 'bg-yellow-500', category: 'stock-photos' },
        { name: 'Magdeleine', href: "https://magdeleine.co/", desc: 'Gallery & free high-resolution photo everyday', bgColor: 'bg-green-500', category: 'stock-photos' },
        { name: 'Picspree', href: "https://picspree.com", desc: 'Royalty free images, stock photos, illustrations, and vectors', bgColor: 'bg-orange-500', category: 'stock-photos' },
        { name: 'Burst', href: "https://burst.shopify.com/", desc: 'Free stock photos collections', bgColor: 'bg-blue-500', category: 'stock-photos' },
        { name: 'Gratisography', href: "https://gratisography.com/", desc: 'Free collection of free high-resolution pictures', bgColor: 'bg-cyan-500', category: 'stock-photos' },
        { name: 'Life of Pix', href: "https://www.lifeofpix.com/", desc: 'Free high-resolution photography', bgColor: 'bg-sky-500', category: 'stock-photos' },
        { name: 'Stock Snap', href: "https://stocksnap.io/", desc: 'Hundreds of high quality photos added weekly', bgColor: 'bg-amber-500', category: 'stock-photos' },
        { name: 'Morguefile', href: "https://morguefile.com/", desc: 'Over 350,000 free stock photos for commercial use<', bgColor: 'bg-red-500', category: 'stock-photos' },
        { name: 'Kaboom Pics', href: "https://kaboompics.com/", desc: 'Stock photography and color palettes. Good for product images', bgColor: 'bg-emerald-500', category: 'stock-photos' },
        { name: 'New Old Stock', href: "https://nos.twnsnd.co/", desc: 'Stock vintage photos', bgColor: 'bg-pink-500', category: 'stock-photos' },
        { name: 'Pic Jumbo', href:"https://picjumbo.com/", desc:'Good collections of different types of photos', bgColor: 'bg-purple-600', category: 'stock-photos' },
        { name: 'Public Domain Pictures', href: "https://www.publicdomainpictures.net/en/", desc: 'Public domain images of all types', bgColor: 'bg-yellow-500', category: 'stock-photos' },
        { name: 'Find A Photo', href: "https://www.chamberofcommerce.org/findaphoto/", desc: 'Searches multiple stock photo websites', bgColor: 'bg-green-500', category: 'stock-photos' },
        { name: 'Stockvault', href: "http://www.stockvault.net/", desc: 'Categorized stock photos', bgColor: 'bg-orange-500', category: 'stock-photos' },
        { name: 'Placeholder', href: "https://placeholder.com/", desc: 'A free image placeholder service for the web. You can specify image size and format', bgColor: 'bg-blue-500', category: 'stock-photos' },
        { name: 'Realistic Shots', href: "https://realisticshots.com/", desc: 'Free high-resolution stock photos', bgColor: 'bg-cyan-500', category: 'stock-photos' },
        { name: 'Negative Space', href: "https://negativespace.co/", desc: 'High-Resolution Free Stock Photos', bgColor: 'bg-sky-500', category: 'stock-photos' },
        { name: 'SkitterPhoto', href: "https://skitterphoto.com/", desc: 'Free high-resolution photography', bgColor: 'bg-amber-500', category: 'stock-photos' },
        { name: 'PicoGraphy', href: "https://picography.co/", desc: 'Gorgeous, High-Resolution, Free Photos', bgColor: 'bg-red-500', category: 'stock-photos' },
        { name: 'Wunder Stock', href: "https://wunderstock.com/", desc: 'Stunningly amazing free photos', bgColor: 'bg-emerald-500', category: 'stock-photos' },
        { name: 'PxHere', href: "https://pxhere.com/", desc: 'Free Images & Free stock photos: PxHere', bgColor: 'bg-pink-500', category: 'stock-photos' },
        { name: 'Piqsels', href:"https://piqsels.com/", desc:'Royalty Free Stock Photos', bgColor: 'bg-purple-600', category: 'stock-photos' },
        { name: 'Nappy', href: "https://www.nappy.co/", desc: 'A website offering Beautiful, high-res photos of black and brown people.', bgColor: 'bg-yellow-500', category: 'stock-photos' },
        { name: 'Generated Photos', href: "https://generated.photos/", desc: 'Unique AI Generated model photos', bgColor: 'bg-green-500', category: 'stock-photos' },
        { name: 'Lorem.space: Placeholder image generator', href: "https://lorem.space", desc: 'API for placeholder images but useful!', bgColor: 'bg-orange-500', category: 'stock-photos' },
        { name: 'Openverse', href: "https://wordpress.org/openverse/", desc: 'Openverse is a search engine for openly-licensed media', bgColor: 'bg-blue-500', category: 'stock-photos' },
    ],

    'image-compression': [
        { name: 'TinyPNG', href:"https://tinypng.com/", desc:'Smart PNG and JPEG compression', bgColor: 'bg-pink-600', category: 'image-compression' },
        { name: 'Optimizilla', href:"https://imagecompressor.com/" , desc:'Online JPEG and PNG optimizer / compressor with settings and archive download', bgColor: 'bg-purple-600', category: 'image-compression' },
        { name: 'Compressor.io', href:"https://compressor.io/", desc: 'JPEG, PNG, GIF, SVG Compression', bgColor: 'bg-yellow-500', category: 'image-compression' },
        { name: 'Squoosh app', href:"https://squoosh.app/", desc: 'Image compression from Google Chrome Labs', bgColor: 'bg-green-500', category: 'image-compression'  },
        { name: 'BulkResizePhotos', href:"https://bulkresizephotos.com/" , desc: 'Bulk image resizing, compression & converting that perform all the tasks within the browser (It works offline)', bgColor: 'bg-orange-500', category: 'image-compression'  },
        { name: 'iLoveIMG', href:"https://www.iloveimg.com/", desc: 'The fastest free web app for easy image modification', bgColor: 'bg-blue-500', category: 'image-compression'  },
        { name: 'SvgOMG', href:"https://jakearchibald.github.io/svgomg/", desc: 'Online SVG optimizer with a lot of settings and possibility to cut and paste svg code directly in it.', bgColor: 'bg-cyan-500', category: 'image-compression'  },
        { name: 'CompressJPEG', href:'https://compressjpeg.com/' , desc: 'Compress JPEG images with size even greater than 5MB', bgColor: 'bg-sky-500', category: 'image-compression'  },
        { name: 'CompressNow', href:"https://compressnow.com/", desc: 'JPEG, GIF, PNG Compression', bgColor: 'bg-amber-500', category: 'image-compression'  },
        { name: 'Promo Image Resizer', href:"https://promo.com/tools/image-resizer/", desc: 'Free Image and Photo Resizer', bgColor: 'bg-red-500', category: 'image-compression'  },
        { name: 'Image Optimizer', href:"http://www.imageoptimizer.net/" , desc:'Image Optimizer Free With Quality Options', bgColor: 'bg-emerald-500', category: 'image-compression'  },
        { name: 'SVGminify', href:"https://www.svgminify.com/" , desc: 'This tool removes superfluous information, thereby reducing the size of your SVG files', bgColor: 'bg-pink-500', category: 'image-compression'  },
        { name: 'JPEG Optimizer', href:"http://jpeg-optimizer.com/", desc:'Free online tool for resizing and compressing digital photos and images for displaying on the web', bgColor: 'bg-purple-600', category: 'image-compression'  },
        { name: 'Resizing App', href:"https://resizing.app/" , desc: 'Resize Your Images Online', bgColor: 'bg-yellow-500', category: 'image-compression'  },
        { name: 'EZGif', href:"https://ezgif.com/", desc: 'Animated GIF maker and Image editor including Image optimization and supports WebP conversion', bgColor: 'bg-green-500', category: 'image-compression'  },
        { name: 'OnlinePngtools', href:"https://onlinepngtools.com/resize-png", desc: 'Resize png for without losing transparent background.', bgColor: 'bg-orange-500', category: 'image-compression'  },
        { name: 'Verexif', href:"https://www.verexif.com/en/", desc: 'Remove meta tags in image in order to reduce image size and increase privacy security', bgColor: 'bg-blue-500', category: 'image-compression'  },
        { name: 'Vecta Nano', href:"https://vecta.io/nano" , desc: 'ses lossless compression to compress inefficient SVG codes by removing unnecessary data. (Free &; Paid)', bgColor: 'bg-cyan-500', category: 'image-compression'  },
        { name: 'Watermarkly', href:"https://watermarkly.com/compress-jpeg/", desc: 'Private, client-side compression of JPEG images. The app does not send images to a server for processing.', bgColor: 'bg-sky-500', category: 'image-compression'  },
        { name: 'Jpeg.io', href:"https://www.jpeg.io", desc: 'Convert any major image format into a highly optimized JPEG', bgColor: 'bg-amber-500', category: 'image-compression'  },
    ],

    // CSS & Frameworks
    'css-frameworks': [
        { name: 'Tailwind CSS', href:"https://tailwindcss.com/", desc:'Low level, utility-first framework', bgColor: 'bg-pink-600', category: 'css-frameworks' },
        { name: 'Bootstrap', href:"https://getbootstrap.com/", desc:'Popular UI framework with tons of components that use both CSS and JS', bgColor: 'bg-purple-600', category: 'css-frameworks' },
        { name: 'Materialize', href:"https://materializecss.com/", desc:'A modern responsive front-end framework based on Material Design', bgColor: 'bg-yellow-500', category: 'css-frameworks' },
        { name: 'Material Design Lite', href:"https://getmdl.io/", desc: 'Light framework based on Material Design. No JS dependency', bgColor: 'bg-green-500', category: 'css-frameworks' },
        { name: 'Bulma', href:"https://bulma.io/", desc: 'Modern CSS framework with no JS', bgColor: 'bg-orange-500', category: 'css-frameworks' },
        { name: 'Skeleton', href:"http://getskeleton.com/", desc: 'Extremely light framework for basic UI elements', bgColor: 'bg-blue-500', category: 'css-frameworks' },
        { name: 'Uniform CSS', href:"https://uniformcss.com/", desc: 'Fully configurable utility generator and CSS framework built entirely in Sass', bgColor: 'bg-cyan-500', category: 'css-frameworks' },
        { name: 'Semantic UI', href:"https://semantic-ui.com/", desc:'Empowers designers and developers by creating a shared vocabulary for UI', bgColor: 'bg-sky-500', category: 'css-frameworks' },
        { name: 'Fomantic UI', href:"https://fomantic-ui.com/", desc: 'A community fork of Semantic-UI', bgColor: 'bg-amber-500', category: 'css-frameworks' },
        { name: 'Foundation', href:"https://get.foundation/", desc: 'Mobile first framework with clean markup', bgColor: 'bg-red-500', category: 'css-frameworks' },
        { name: 'Pure CSS', href:"https://purecss.io/", desc: 'A set of small, responsive CSS modules', bgColor: 'bg-emerald-500', category: 'css-frameworks' },
        { name: 'UIKit', href:"https://getuikit.com/", desc: 'Lightweight and modular front-end framework', bgColor: 'bg-pink-500', category: 'css-frameworks' },
        { name: 'Susy', href:"https://www.oddbird.net/susy/" , desc:'Lightweight, grid-layout engine for Sass', bgColor: 'bg-purple-600', category: 'css-frameworks' },
        { name: 'Milligram.io', href: "https://milligram.io/", desc: 'Minimalist CSS framework', bgColor: 'bg-yellow-500', category: 'css-frameworks' },
        { name: 'Vanilla Framework', href:"https://vanillaframework.io/", desc: 'Simple, extensible CSS framework written in Sass', bgColor: 'bg-green-500', category: 'css-frameworks' },
        { name: 'Spectre CSS', href: "https://picturepan2.github.io/spectre/", desc: 'Lightweight, modern CSS framework', bgColor: 'bg-orange-500', category: 'css-frameworks' },
        { name: 'Picnic CSS', href:"https://picnicss.com/", desc: 'Lightweight and beautiful library', bgColor: 'bg-blue-500', category: 'css-frameworks' },
        { name: 'Wing', href:"https://kbrsh.github.io/wing/", desc: 'A beautiful CSS framework designed for minimalists', bgColor: 'bg-cyan-500', category: 'css-frameworks' },
        { name: 'Chota', href:"https://jenil.github.io/chota/", desc: 'A micro (~3kb) CSS framework', bgColor: 'bg-sky-500', category: 'css-frameworks' },
        { name: 'Blueprint CSS', href:"https://blueprintcss.dev/", desc: 'A lightweight layout library for building great responsive mobile first UIs that work everywhere', bgColor: 'bg-amber-500', category: 'css-frameworks' },
        { name: 'W3.CSS', href:"https://www.w3schools.com/w3css/", desc: 'A modern CSS framework with support for desktop, tablet, and mobile design by default. Designed to be independent of jQuery or any other JavaScript library', bgColor: 'bg-red-500', category: 'css-frameworks' },
        { name: '98.css', href: "https://jdan.github.io/98.css/", desc: 'A design system for building faithful recreations of old UIs', bgColor: 'bg-emerald-500', category: 'css-frameworks' },
        { name: 'NES CSS', href:"https://nostalgic-css.github.io/NES.css/", desc: 'NES-style CSS Framework', bgColor: 'bg-pink-500', category: 'css-frameworks' },
        { name: 'Shoelace.css', href:"https://www.shoelace.style/", desc:'Lightweight, forward-thinking CSS library built with future CSS syntax.', bgColor: 'bg-purple-600', category: 'css-frameworks' },
        { name: 'MVP.css', href:"https://andybrewer.github.io/mvp/", desc: 'A minimalist stylesheet for HTML elements. No class names, no frameworks, just semantic HTML and you\'re done', bgColor: 'bg-yellow-500', category: 'css-frameworks' },
        { name: 'Blaze.css', href:"http://blazecss.com/", desc: 'Open source modular CSS toolkit providing great structure for building websites quickly', bgColor: 'bg-green-500', category: 'css-frameworks' },
        { name: 'Turret CSS', href:"https://turretcss.com/", desc: 'Turret CSS is a styles framework for development of responsive websites.', bgColor: 'bg-orange-500', category: 'css-frameworks' },
        { name: 'Cutestrap', href:"https://www.cutestrap.com/", desc: 'A strong, independent CSS Framework.', bgColor: 'bg-blue-500', category: 'css-frameworks' },
        { name: 'XP.css', href: "https://botoxparty.github.io/XP.css/", desc: 'XP.css is an extension of 98.css. A CSS library for building interfaces that look like old UIs.', bgColor: 'bg-cyan-500', category: 'css-frameworks' },
        { name: 'Framework7', href:"https://framework7.io/" , desc: 'A free and open source framework to develop mobile, desktop or web apps with native look and feel.', bgColor: 'bg-amber-500', category: 'css-frameworks' },
        { name: 'Hint.css', href:"https://kushagra.dev/lab/hint/", desc: 'A pure CSS tooltip library for your lovely websites.', bgColor: 'bg-red-500', category: 'css-frameworks' },
        { name: 'Imagehover.io', href:"http://imagehover.io/" , desc: 'Pure CSS Image Hover Effect Library', bgColor: 'bg-emerald-500', category: 'css-frameworks' },
        { name: 'Mini.css', href:"https://minicss.org/", desc: 'A minimal, responsive, style-agnostic CSS framework', bgColor: 'bg-pink-500' , category: 'css-frameworks'},
        { name: 'Tachyons', href:"https://tachyons.io/", desc:'Create fast loading, highly readable, and 100% responsive interfaces with as little css as possible.', bgColor: 'bg-purple-600', category: 'css-frameworks' },
        { name: 'Material Bootstrap', href: "https://fezvrasta.github.io/bootstrap-material-design/", desc: 'Material Design with Bootstrap', bgColor: 'bg-yellow-500', category: 'css-frameworks' },
        { name: 'Ivory', href:"https://github.com/IVORY-UI/ivory", desc: 'A modern CSS framework for developing powerful web interfaces faster and easier', bgColor: 'bg-green-500', category: 'css-frameworks' },
        { name: 'Halfmoon UI', href:"https://www.gethalfmoon.com/", desc: 'A responsive and lightweight framework, designed for quickly building beautiful dashboards and product pages.', bgColor: 'bg-orange-500', category: 'css-frameworks'},
        { name: 'Metro 4', href:"https://metroui.org.ua/index.html", desc: 'Create your site quickly and effectively with Metro 4. impressive components library built on html, css, javascript.', bgColor: 'bg-blue-500', category: 'css-frameworks' },
        { name: 'Css-doodle', href:"https://css-doodle.com/", desc: 'A web component for drawing patterns with CSS', bgColor: 'bg-cyan-500', category: 'css-frameworks' },
        { name: 'Latex.css', href:"https://latex.now.sh/", desc: 'Make your website look like a LaTeX document', bgColor: 'bg-sky-500', category: 'css-frameworks' },
        { name: 'Paper CSS', href:"https://github.com/cognitom/paper-css", desc: 'Front-end printing solution', bgColor: 'bg-amber-500', category: 'css-frameworks' },
        { name: 'Windi CSS', href: "https://windicss.org/", desc: 'Next generation compiler for Tailwind CSS', bgColor: 'bg-red-500', category: 'css-frameworks' },
        { name: 'Cirrus CSS', href:"https://cirrus-ui.netlify.app/" , desc: 'A component and utility centric SCSS framework designed for rapid prototyping.', bgColor: 'bg-emerald-500', category: 'css-frameworks' },
        { name: 'Gutenberg', href:"https://github.com/BafS/Gutenberg", desc: 'Modern framework to print the web correctly.', bgColor: 'bg-pink-500', category: 'css-frameworks' },
        { name: 'Lit', href:"https://github.com/ajusa/lit", desc:'World\'s smallest responsive fire css framework (395 bytes).', bgColor: 'bg-purple-600', category: 'css-frameworks' },
        { name: 'Arwes', href: "https://github.com/arwes/arwes", desc: 'Arwes is a web framework to build user interfaces based on futuristic science fiction designs, animations, and sound effects.', bgColor: 'bg-yellow-500', category: 'css-frameworks' },
        { name: 'Bojler', href:"https://bojler.slicejack.com/", desc:'An email framework for developing responsive and lightweight email templates that will render correctly across each of the most popular email clients.', bgColor: 'bg-pink-600', category: 'css-frameworks' },
        { name: 'Tacit', href:"https://github.com/yegor256/tacit", desc:'Primitive CSS Framework for dummies, without classes.', bgColor: 'bg-purple-600', category: 'css-frameworks' },
        { name: 'Terminal CSS', href:"https://terminalcss.xyz/", desc:'A modern and minimal CSS framework for terminal lovers.', bgColor: 'bg-yellow-500', category: 'css-frameworks' },
        { name: 'Sakura', href:"https://oxal.org/projects/sakura/", desc: 'A minimal classless css framework / theme.', bgColor: 'bg-green-500', category: 'css-frameworks' },
        { name: 'PSone', href:"https://github.com/micah5/PSone.css", desc: 'PS1 style CSS Framework, inspired by NES.css.', bgColor: 'bg-orange-500' , category: 'css-frameworks'},
        { name: 'Marx', href:"https://github.com/mblode/marx", desc: 'Marx is the classless CSS reset to be used in any projects (namely small ones).', bgColor: 'bg-blue-500', category: 'css-frameworks' },
        { name: 'Tufte', href:"https://github.com/edwardtufte/tufte-css", desc: 'Style your webpage like Edward Tufte’s handouts.', bgColor: 'bg-cyan-500', category: 'css-frameworks' },
        { name: 'Axentix', href:"https://useaxentix.com/" , desc:'Axentix is an open source Framework based on CSS Grid using HTML, CSS and JS.', bgColor: 'bg-sky-500', category: 'css-frameworks' },
        { name: 'Raster Simple Grid System', href:"https://rsms.me/raster/", desc: 'Minimal and straight-forward CSS grid system utilizing descriptive HTML rather than semantic CSS.', bgColor: 'bg-amber-500' , category: 'css-frameworks'},
        { name: 'Flowrift', href:"https://flowrift.com/c/banner", desc: 'Flowrift is a library made of beautifully designed Tailwind CSS UI blocks.', bgColor: 'bg-red-500', category: 'css-frameworks' },
        { name: 'Twind', href:"https://twind.dev/", desc: 'The smallest, fastest, most feature complete tailwind-in-js solution in existence', bgColor: 'bg-emerald-500', category: 'css-frameworks' },
        { name: 'Pico.css', href:"https://picocss.com/", desc: 'Elegant styles for all natives HTML elements without .classes and dark mode automatically enabled.', bgColor: 'bg-pink-500', category: 'css-frameworks' },
        { name: 'Clay.css', href:"https://github.com/codeAdrian/clay.css" , desc:'Extensible and configurable micro CSS util class and SASS mixin for adding claymorphism styles to your components.', bgColor: 'bg-purple-600', category: 'css-frameworks' },
    ],

    'css-animations': [
        { name: 'Animate.css', href:"https://animate.style/", desc:'Just-add-water CSS animations', bgColor: 'bg-pink-600', category: 'css-animations' },
        { name: 'Bounce.js', href:"http://bouncejs.com/", desc:'Bounce.js is a tool and JS library that lets you create beautiful CSS3 powered animations', bgColor: 'bg-purple-600', category: 'css-animations' },
        { name: 'Anime.js', href:"https://animejs.com/", desc:'Anime.js (/ˈæn.ə.meɪ/) is a lightweight JavaScript animation library with a simple, yet powerful API. It works with CSS properties, SVG, DOM attributes and JavaScript Objects', bgColor: 'bg-yellow-500', category: 'css-animations' },
        { name: 'Magic Animations', href:"https://www.minimamente.com/project/magic/", desc: 'Animations has been one of the most impressive animation libraries availabl', bgColor: 'bg-green-500', category: 'css-animations' },
        { name: 'Zdog', href:"https://zzz.dog/", desc: 'Round, flat, designer-friendly pseudo-3D engine for canvas & SVG', bgColor: 'bg-orange-500', category: 'css-animations' },
        { name: 'CSShake', href:"http://elrumordelaluz.github.io/csshake/", desc: 'CSShake delivers exactly what it says on the box :  a CSS library designed specifically for shaking elements within your web page', bgColor: 'bg-blue-500', category: 'css-animations' },
        { name: 'Hover.css', href:"http://ianlunn.github.io/Hover/", desc: 'Hover.css is a CSS animation library designed for use with buttons and other UI elements in your website', bgColor: 'bg-cyan-500' , category: 'css-animations'},
        { name: 'AniJS', href:"http://anijs.github.io/", desc:'AniJS is an animation library that allows you to add animations to elements in a simple ‘sentence-like’ structure', bgColor: 'bg-sky-500', category: 'css-animations' },
        { name: 'Animista', href:"http://animista.net/", desc: 'CSS Animations On Demand', bgColor: 'bg-amber-500', category: 'css-animations' },
        { name: 'Tachyons-animate', href:"https://github.com/anater/tachyons-animate", desc: 'Tachyons itself is an atomic CSS library with a ton of utility classes for essentially designing anything by adding classes to what you need', bgColor: 'bg-red-500', category: 'css-animations' },
        { name: 'Sequence.js', href:"https://www.sequencejs.com/", desc: 'Sequence.js is a JavaScript library that provides a responsive CSS framework for creating unique sliders, presentations, banners, and other step-based applications', bgColor: 'bg-emerald-500', category: 'css-animations' },
        { name: 'Infinite', href:"https://tilomitra.github.io/infinite/", desc: 'These animations, like rotations and pulses, that are specifically designed to run and repeat forever', bgColor: 'bg-pink-500', category: 'css-animations' },
        { name: 'OBNOXIOUS.CSS', href:"http://tholman.com/obnoxious/" , desc:'Animations for the strong of heart, and weak of mind', bgColor: 'bg-purple-600', category: 'css-animations' },
        { name: 'MOTION UI', href:"https://zurb.com/playground/motion-ui", desc: 'A Sass library for creating flexible CSS transitions and animations', bgColor: 'bg-yellow-500', category: 'css-animations' },
        { name: 'Keyframes.app', href:"https://keyframes.app/", desc: 'A graphical user interface for generating custom CSS keyframe animations', bgColor: 'bg-green-500', category: 'css-animations' },
        { name: 'Thoughtbot', href: "https://thoughtbot.com/blog/transitions-and-transforms", desc: 'CSS Transitions and Transformations for Beginners', bgColor: 'bg-orange-500' , category: 'css-animations'},
        { name: 'SVG Artista', href:"https://svgartista.net/", desc: 'A useful tool to animate stroke and fill properties in SVG images with plain CSS code', bgColor: 'bg-blue-500', category: 'css-animations' },
        { name: 'AnimXYZ', href:"https://animxyz.com/", desc: 'AnimXYZ helps you create, customize, and compose animations for your website. Built for Vue, React, SCSS, and CSS', bgColor: 'bg-cyan-500' , category: 'css-animations'},
        { name: 'Whirl', href:"https://github.com/jh3y/whirl", desc: 'CSS loading animations with minimal effort!', bgColor: 'bg-sky-500', category: 'css-animations' },
        { name: 'Hamburgers', href:"https://jonsuh.com/hamburgers/", desc: 'Hamburgers is a collection of tasty CSS-animated hamburger icons. Also included is the source as a Sass library. It’s modular and customizable, so cook up your own hamburger.', bgColor: 'bg-amber-500', category: 'css-animations' },
        { name: 'CSS Loaders & Spinners', href:"https://cssloaders.github.io/", desc: 'This is a library having a collection of different types of CSS loaders, spinners', bgColor: 'bg-red-500', category: 'css-animations' },
        { name: 'Motion One', href:"https://motion.dev/", desc:'A new animation library, built on the Web Animations API for the smallest filesize and the fastest performance.', bgColor: 'bg-emerald-500', category: 'css-animations' },
        { name: 'Pocoloco', href:"https://pocoloco.io/", desc: 'Generate dynamic backgrounds for your website', bgColor: 'bg-pink-500', category: 'css-animations' },
        { name: 'AniX', href:"https://drawcall.github.io/AniX/", desc:'Super easy and lightweight css animation library.', bgColor: 'bg-purple-600', category: 'css-animations' },
    ],

    'css-methodologies': [
        { name: 'OOCSS', href:"http://oocss.org/", desc:'OOCSS concepts help us write components that are flexible, modular and interchangeable.', bgColor: 'bg-pink-600', category: 'css-methodologies' },
        { name: 'Atomic CSS', href:"https://acss.io/", desc:'Atomic CSS is the approach to CSS architecture that favors small, single-purpose classes with names based on visual function.', bgColor: 'bg-purple-600', category: 'css-methodologies' },
        { name: 'BEM', href:"http://getbem.com/", desc:'Block Element Modifier is a methodology that helps you to create reusable components and code sharing in front-end development.', bgColor: 'bg-yellow-500', category: 'css-methodologies' },
        { name: 'SMACSS', href:"http://smacss.com/", desc: 'SMACSS is a way to examine your design process and as a way to fit those rigid frameworks into a flexible thought process.', bgColor: 'bg-green-500', category: 'css-methodologies' },
    ],

    'react-ui-libraries': [
        { name: 'Material UI', href:"https://material-ui.com/", desc:'React components for faster and easier web development, based on Material Design', bgColor: 'bg-pink-600', category: 'react-ui-libraries' },
        { name: 'Chakra UI', href:"https://chakra-ui.com/", desc:'Build accessible React apps & websites with speed.', bgColor: 'bg-purple-600', category: 'react-ui-libraries' },
        { name: 'React Bootstrap', href:"https://react-bootstrap.github.io/", desc: 'Bootstrap rebuilt for React. Include Bootstrap components right in your JavaScript', bgColor: 'bg-yellow-500', category: 'react-ui-libraries' },
        { name: 'Semi Design', href:"https://semi.design/en-US", desc: 'A modern, comprehensive, flexible design system that gives you all modular blocks you need to build sensible web apps & SaaS products.', bgColor: 'bg-green-500', category: 'react-ui-libraries' },
        { name: 'Mantine', href:"https://mantine.dev/", desc: 'React components and hooks library with native dark theme support focused on usability, accessibility and developer experience.', bgColor: 'bg-orange-500', category: 'react-ui-libraries' },
        { name: 'NextUI', href:"https://nextui.org/", desc: 'Beautiful, fast and modern React UI library that allows you to create beatiful websites regardless of your design experience.', bgColor: 'bg-blue-500', category: 'react-ui-libraries' },
        { name: 'Arco Design', href:"https://arco.design/en-US", desc: 'A comprehensive React UI components library based on the Arco Design system.', bgColor: 'bg-cyan-500', category: 'react-ui-libraries' },
        { name: 'Ui-playbook', href:"https://uiplaybook.dev/", desc: 'The documented collection of UI components', bgColor: 'bg-sky-500', category: 'react-ui-libraries' },
        { name: 'ReactStrap', href:"https://reactstrap.github.io/", desc: 'Another Bootstrap UI library for React', bgColor: 'bg-amber-500', category: 'react-ui-libraries' },
        { name: 'React Admin', href:"https://marmelab.com/react-admin/", desc: 'A frontend Framework for building admin applications. Supports APIs out of the box', bgColor: 'bg-red-500', category: 'react-ui-libraries' },
        { name: 'BlueprintJS', href:"https://blueprintjs.com/", desc: 'React-based UI toolkit for the web', bgColor: 'bg-emerald-500', category: 'react-ui-libraries' },
        { name: 'React Semantic UI', href:"https://react.semantic-ui.com/", desc: 'UI components based off of the Semantic UI framework', bgColor: 'bg-pink-500', category: 'react-ui-libraries' },
        { name: 'Shards React', href:"https://designrevision.com/downloads/shards-react/", desc:'React UI kit featuring a modern design system with dozens of custom components', bgColor: 'bg-purple-600', category: 'react-ui-libraries' },
        { name: 'React Virtualized', href:"https://bvaughn.github.io/react-virtualized", desc: 'UI set for data. Includes tables, lists, sorting, etc.', bgColor: 'bg-yellow-500', category: 'react-ui-libraries' },
        { name: 'React Toolbox', href:"http://react-toolbox.io/#/", desc: 'Material design UI library for React', bgColor: 'bg-green-500', category: 'react-ui-libraries' },
        { name: 'Elastic UI', href:"https://elastic.github.io/eui/#/", desc: 'Distributes UI React components and static assets for use in building web layouts', bgColor: 'bg-orange-500', category: 'react-ui-libraries' },
        { name: 'React Desktop', href:"http://reactdesktop.js.org/", desc: 'Desktop styled components in React. Includes MacOS and Windows based components', bgColor: 'bg-blue-500', category: 'react-ui-libraries' },
        { name: 'Onsen React', href:"https://onsen.io/react/", desc: 'Distributes Components for hybrid mobile apps with React and Onsen UI', bgColor: 'bg-cyan-500', category: 'react-ui-libraries' },
        { name: 'Evergreen', href:"https://evergreen.segment.com/", desc: 'Design system for React', bgColor: 'bg-sky-500', category: 'react-ui-libraries' },
        { name: 'Rebass', href:"https://rebassjs.org/", desc: 'React primitive UI components built with styled system', bgColor: 'bg-amber-500', category: 'react-ui-libraries' },
        { name: 'Grommet', href:"https://v2.grommet.io/", desc: 'Mobile first UI component library', bgColor: 'bg-red-500', category: 'react-ui-libraries' },
        { name: 'Landing Page Template', href:"https://github.com/cruip/open-react-template/", desc: 'Open source landing page template for react', bgColor: 'bg-emerald-500', category: 'react-ui-libraries' },
        { name: 'Elemental UI', href:"http://elemental-ui.com/", desc: 'A UI Toolkit for React.js Websites and Apps', bgColor: 'bg-pink-500', category: 'react-ui-libraries' },
        { name: 'Ant Design', href:"https://ant.design/", desc:'Open source design React UI library.', bgColor: 'bg-purple-600', category: 'react-ui-libraries' },
        { name: 'Bumbag', href:"https://bumbag.style/", desc: 'Bumbag is a friendly React UI Kit suitable for MVPs or large-scale applications.', bgColor: 'bg-yellow-500', category: 'react-ui-libraries' },
        { name: 'Primereact', href:"https://www.primefaces.org/primereact/", desc: 'The ultimate collection of design-agnostic, flexible and accessible React UI Components', bgColor: 'bg-green-500', category: 'react-ui-libraries' },
        { name: 'Primer Components', href:"https://primer.style/components/", desc: 'Primer Components are React components which implement GitHub Primer Design System', bgColor: 'bg-orange-500', category: 'react-ui-libraries' },
        { name: 'Orbit', href:"https://orbit.kiwi/", desc: 'Design system and React UI components for travel projects.', bgColor: 'bg-blue-500', category: 'react-ui-libraries' },
        { name: 'Base Web', href:"https://baseweb.design/", desc: 'Base Web provides a robust suite of components out of the box', bgColor: 'bg-cyan-500', category: 'react-ui-libraries' },
        { name: 'Backpack UI', href:"http://lonelyplanet.github.io/backpack-ui/?path=/story/styles--design-tokens", desc: 'Backpack is the Lonely Planet toolset that we use to build front end apps.', bgColor: 'bg-amber-500', category: 'react-ui-libraries' },
        { name: 'Reaviz', href:"https://reaviz.io", desc: 'Data visualization library for React based on D3', bgColor: 'bg-red-500', category: 'react-ui-libraries' },
        { name: 'React Suite', href:"https://rsuitejs.com/en/", desc: 'A suite of React components, sensible UI design, and a friendly development experience.', bgColor: 'bg-emerald-500', category: 'react-ui-libraries' },
        { name: 'React Spring', href:"https://www.react-spring.io/", desc:'Spring-physics based animation library for React applications.', bgColor: 'bg-pink-500', category: 'react-ui-libraries' },
        { name: 'Recharts', href:"http://recharts.org/en-US/", desc:'A composable charting library built on React components.', bgColor: 'bg-purple-600', category: 'react-ui-libraries' },
        { name: 'Vercel UI', href:"https://github.com/geist-org/react", desc:'Modern and minimalist React UI library', bgColor: 'bg-yellow-500', category: 'react-ui-libraries' },
        { name: 'Framer Motion', href:"https://www.framer.com/motion/", desc: 'A React library to power production-ready animations.', bgColor: 'bg-green-500', category: 'react-ui-libraries' },
        { name: 'React Spectrum', href:"https://react-spectrum.adobe.com/react-spectrum/index.html", desc: 'A React implementation of Spectrum, Adobe’s design system.', bgColor: 'bg-orange-500', category: 'react-ui-libraries' },
        { name: 'React tsParticles', href:"https://github.com/matteobruni/tsparticles/tree/main/components/react", desc: 'A lightweight React component for creating particles', bgColor: 'bg-blue-500', category: 'react-ui-libraries' },
        { name: 'Particles-bg', href:"https://github.com/lindelof/particles-bg", desc: 'A React particles animation background component', bgColor: 'bg-cyan-500', category: 'react-ui-libraries' },
        { name: 'Treact', href:"https://treact.owaiskhan.me", desc: 'Gallery of free and modern React templates and UI components developed using TailwindCSS as the front-end framework', bgColor: 'bg-sky-500', category: 'react-ui-libraries' },
        { name: 'OAH-Admin', href:"https://gatsby-admin.paljs.com/extra-components/progress/", desc: 'A free React admin dashboard template based on Gatsby with oah-ui components and elements package.', bgColor: 'bg-amber-500', category: 'react-ui-libraries' },
        { name: 'Carolina Admin Dashboard', href:"https://demo.uifort.com/carolina-react-admin-dashboard-material-ui-free-demo/LandingPage", desc: 'Free React admin template powered by Material-UI components framework.', bgColor: 'bg-red-500', category: 'react-ui-libraries' },
        { name: 'Tabler', href:"https://github.com/tabler/tabler-react", desc: 'Tabler is a free React admin dashboard template ideal for any kind of back-end web application.', bgColor: 'bg-emerald-500', category: 'react-ui-libraries' },
        { name: 'Sha-el-design', href:"https://github.com/sha-el/sha-el-design", desc: 'React components for easier customization and smooth development flow.', bgColor: 'bg-pink-500', category: 'react-ui-libraries' },
        { name: 'React-WeUI', href:"https://weui.github.io/react-weui/docs/#/react-weui/docs/page/0/articles/0", desc:'React-WeUI made from our love of React and WeChat’s WeUI Design.', bgColor: 'bg-purple-600', category: 'react-ui-libraries' },
        { name: 'Supabase UI', href:"https://ui.supabase.io/", desc:'An open-source UI component library inspired by Tailwind and AntDesign.', bgColor: 'bg-purple-600', category: 'react-ui-libraries' },
        { name: 'Ring UI', href:"https://github.com/JetBrains/ring-ui", desc: 'A collection of JetBrains Web UI components.', bgColor: 'bg-yellow-500', category: 'react-ui-libraries' },
        { name: 'React95', href:"https://react95.io/", desc: 'Refreshed Windows 95 style UI components for your React app.', bgColor: 'bg-green-500', category: 'react-ui-libraries' },
        { name: 'Reakit', href:"https://reakit.io/", desc: 'Reakit is a lower level component library for building accessible high level UI libraries, design systems and applications with React.', bgColor: 'bg-orange-500', category: 'react-ui-libraries' },
        { name: 'Zent', href:"https://github.com/youzan/zent", desc: 'A collection of essential UI components written with React.', bgColor: 'bg-blue-500', category: 'react-ui-libraries' },
        { name: 'Gestalt', href:"https://github.com/pinterest/gestalt", desc: 'A set of React UI components that supports Pinterest’s design language.', bgColor: 'bg-cyan-500', category: 'react-ui-libraries' },
        { name: 'Xstyled', href:"https://xstyled.dev/", desc: 'A CSS-in-JS framework built for React with props based utilities like display, fontSize or rotate.', bgColor: 'bg-sky-500', category: 'react-ui-libraries' },
        { name: '@use-gesture', href:"https://github.com/pmndrs/use-gesture", desc: 'Bread n butter utility for component-tied mouse/touch gestures in React.', bgColor: 'bg-amber-500', category: 'react-ui-libraries' },
        { name: 'React Rainbow', href:"https://react-rainbow.io/", desc: 'React Rainbow is a collection of components that will reliably help you build your application in a snap.', bgColor: 'bg-red-500', category: 'react-ui-libraries' },
        { name: 'React Use Smooth Scroll', href:"https://github.com/saidMounaim/React-Use-Smooth-Scroll", desc: 'React Provider Component to add a smooth scroll effect', bgColor: 'bg-emerald-500', category: 'react-ui-libraries' },
        { name: 'Choc UI', href:"https://choc-ui.com/", desc: 'Choc UI is a set of accessible and reusable components that are commonly used in web applications.', bgColor: 'bg-pink-500', category: 'react-ui-libraries' },
        { name: 'Elementz', href:"https://elementz.style/", desc:'A React Component library for buliding modern applications easily & quickly.', bgColor: 'bg-purple-600', category: 'react-ui-libraries' },
        { name: 'Radix UI', href:"https://www.radix-ui.com/", desc: 'Unstyled, accessible components for building high-quality design systems and web apps in React', bgColor: 'bg-yellow-500', category: 'react-ui-libraries' },
        { name: 'Materio MUI React NextJS Admin Template', href:"https://github.com/themeselection/materio-mui-react-nextjs-admin-template-free", desc: 'Most Powerful & Comprehensive Open-source MUI React NextJS Admin Dashboard Template built for developers.', bgColor: 'bg-green-500', category: 'react-ui-libraries' },
    ],

    'vue-ui-libraries': [
        { name: 'Vuetify', href:"https://vuetifyjs.com/en/", desc:'Material design component framework', bgColor: 'bg-pink-600', category: 'vue-ui-libraries' },
        { name: 'Bootstrap Vue', href:"https://bootstrap-vue.org/", desc:'Use Bootstrap components with Vue', bgColor: 'bg-purple-600', category: 'vue-ui-libraries' },
        { name: 'Buefy', href:"https://buefy.org/", desc: 'Lightweight UI components based on Bulma', bgColor: 'bg-yellow-500', category: 'vue-ui-libraries' },
        { name: 'Semantic UI Vue', href:"https://semi.design/en-US", desc: 'Semantic UI Vue is the Vue integration for Semantic UI', bgColor: 'bg-green-500', category: 'vue-ui-libraries' },
        { name: 'Arco Design Vue', href:"https://arco.design/vue/en-US/docs/start", desc: 'A comprehensive Vue UI components library based on the Arco Design system.', bgColor: 'bg-orange-500', category: 'vue-ui-libraries' },
        { name: 'VEUI', href:"https://veui.dev/en-US", desc: 'VEUI is an enterprise UI component library, based on Vue.js.', bgColor: 'bg-blue-500', category: 'vue-ui-libraries' },
        { name: 'Grace', href:"https://github.com/Trendyol/grace", desc: 'Design System For Vue Applications.', bgColor: 'bg-cyan-500', category: 'vue-ui-libraries' },
        { name: 'Quasar', href:"https://quasar.dev/" , desc: 'High-performance Material Design component suite with builders for SPA, SSR, PWA, Mobile (Cordova & Capacitor), Desktop (Electron) and Browser extensions', bgColor: 'bg-sky-500', category: 'vue-ui-libraries' },
        { name: 'Element', href:"https://element.eleme.io/#/en-US", desc: 'Desktop UI library for Vue', bgColor: 'bg-amber-500', category: 'vue-ui-libraries' },
        { name: 'Fish UI', href:"https://myliang.github.io/fish-ui/#/components/index", desc: 'Vue UI toolkit for the web', bgColor: 'bg-red-500', category: 'vue-ui-libraries' },
        { name: 'Keen UI', href:"https://josephuspaye.github.io/Keen-UI", desc: 'VueUI library with a simple API, inspired by Google\'s Material Design', bgColor: 'bg-emerald-500', category: 'vue-ui-libraries' },
        { name: 'Materio Vuetify Vuejs Admin Template', href:"https://github.com/themeselection/materio-vuetify-vuejs-admin-template-free", desc: 'Open-source & Easy to use Vuetify Vuejs Admin Template with Elegant Design & Unique Layout', bgColor: 'bg-pink-500', category: 'vue-ui-libraries' },
        { name: 'Onsen Vue', href:"https://onsen.io/vue/", desc:'Distributes Components for hybrid mobile apps with Vue and Onsen UI', bgColor: 'bg-purple-600', category: 'vue-ui-libraries' },
        { name: 'Vuejsexamples', href:"https://vuejsexamples.com", desc: 'A nice collection of useful vuejs UI components', bgColor: 'bg-yellow-500', category: 'vue-ui-libraries' },
        { name: 'Inkline', href:"https://inkline.io", desc: 'Inkline is a modern UI/UX Framework for Vue.js designed for creating flawless responsive web applications', bgColor: 'bg-green-500', category: 'vue-ui-libraries' },
        { name: 'Vuesax', href:"https://vuesax.com/", desc: 'Unique and reusable UI components', bgColor: 'bg-orange-500', category: 'vue-ui-libraries' },
        { name: 'Antdv', href:"https://antdv.com/", desc: 'UI library for Vue based on Ant Design', bgColor: 'bg-blue-500', category: 'vue-ui-libraries' },
        { name: 'Shards Vue', href:"https://designrevision.com/downloads/shards-vue/", desc: 'A high-quality & free Vue UI kit featuring a modern design system with dozens of custom components', bgColor: 'bg-cyan-500', category: 'vue-ui-libraries' },
        { name: 'Prime Vue', href:"https://www.primefaces.org/primevue/", desc: 'Powerful yet simple to use, versatile, performant Vue UI Component Library to help you build stunning user interfaces.', bgColor: 'bg-sky-500', category: 'vue-ui-libraries' },
        { name: 'Chakra UI Vue', href:"https://vue.chakra-ui.com/", desc: 'Chakra UI is a simple modular and accessible component library that gives you the building blocks to build Vue applications with speed.', bgColor: 'bg-amber-500', category: 'vue-ui-libraries' },
        { name: 'View UI', href:"https://www.iviewui.com/", desc: 'Dozens of useful and beautiful Vue components made for people with all skill levels with extensive documentation.', bgColor: 'bg-red-500', category: 'vue-ui-libraries' },
        { name: 'Particles.vue', href:"https://github.com/matteobruni/tsparticles/tree/main/components/vue", desc: 'A lightweight Vue 2.x component for creating particles', bgColor: 'bg-emerald-500', category: 'vue-ui-libraries' },
        { name: 'Particles.vue3', href:"https://github.com/matteobruni/tsparticles/tree/main/components/vue3", desc: 'A lightweight Vue 3.x component for creating particles', bgColor: 'bg-pink-500', category: 'vue-ui-libraries' },
        { name: 'TC Components', href:"https://components.timos.design", desc:'A library of high-quality ready to use components that will help you speed up your development workflow.', bgColor: 'bg-purple-600', category: 'vue-ui-libraries' },
        { name: 'Vant', href:"https://youzan.github.io/vant", desc: 'Lightweight Mobile UI Components built on Vue.', bgColor: 'bg-yellow-500', category: 'vue-ui-libraries' },
        { name: 'Equal UI', href:"https://quatrochan.github.io/Equal/", desc: 'Open-source Vue 3 components system for your next project based on TypeScript', bgColor: 'bg-green-500', category: 'vue-ui-libraries' },
        { name: 'Mint UI', href:"https://mint-ui.github.io/#!/en", desc: 'Mobile UI elements for Vue.js', bgColor: 'bg-orange-500', category: 'vue-ui-libraries' },
        { name: 'Cube UI', href:"https://didi.github.io/cube-ui/#/en-US", desc: 'A fantastic mobile ui lib implement by Vue.js', bgColor: 'bg-blue-500', category: 'vue-ui-libraries' },
        { name: 'Muse UI', href:"https://muse-ui.org/#/en-US", desc: 'Based on the Vue 2.0 elegant Material Design UI component library', bgColor: 'bg-cyan-500', category: 'vue-ui-libraries' },
        { name: 'AT-UI', href:"https://at-ui.github.io/at-ui/#/en", desc: 'AT-UI is a modular front-end UI framework for developing fast and powerful web interfaces based on Vue.js.', bgColor: 'bg-amber-500', category: 'vue-ui-libraries' },
        { name: 'Vuikit', href:"https://vuikit.js.org/", desc: 'A consistent and responsive Vue UI library, based on the front-end framework UIkit.', bgColor: 'bg-red-500', category: 'vue-ui-libraries' },
        { name: 'Wave UI', href:"https://antoniandre.github.io/wave-ui/", desc: 'A Vue.js UI framework with only the bright side.', bgColor: 'bg-emerald-500', category: 'vue-ui-libraries' },
        { name: 'VueTailwind', href:"https://www.vue-tailwind.com/", desc:'Set of Lightweight and fully customizable Vue Components optimized for TailwindCSS.', bgColor: 'bg-pink-500', category: 'vue-ui-libraries' },
        { name: 'Oruga', href:"https://oruga.io/", desc:'Oruga is a lightweight library of UI components for Vue.js without CSS framework dependency.', bgColor: 'bg-purple-600', category: 'vue-ui-libraries' },
        { name: 'BalmUI', href:"https://material.balmjs.com/#/", desc:'BalmUI is a modular and customizable Material Design UI library for Vue.js.', bgColor: 'bg-yellow-500', category: 'vue-ui-libraries' },
        { name: 'Weex UI', href:"https://github.com/apache/incubator-weex-ui", desc: 'A rich interaction, lightweight, high performance UI library based on Weex.', bgColor: 'bg-green-500', category: 'vue-ui-libraries' },
        { name: 'Varlet', href:"https://github.com/haoziqaq/varlet", desc: 'Varlet is a Material design mobile component library developed based on Vue3, developed and maintained by partners in the community.', bgColor: 'bg-orange-500', category: 'vue-ui-libraries' },
        { name: 'Naive UI', href:"https://www.naiveui.com/en-US/os-theme", desc: 'A Vue 3 Component Library. Fairly Complete. Customizable Themes. Uses TypeScript. Not too Slow.', bgColor: 'bg-blue-500', category: 'vue-ui-libraries' },
        { name: 'Vuestic', href:"https://vuestic.dev/", desc: 'Free and Open Source UI Library for Vue 3', bgColor: 'bg-cyan-500', category: 'vue-ui-libraries' },
        { name: 'Vue Final Modal', href:"https://vue-final-modal.org/", desc: 'Vue Final Modal is a tiny, renderless, mobile-friendly, feature-rich modal component for Vue.js.', bgColor: 'bg-sky-500', category: 'vue-ui-libraries' },
        { name: 'Vuetensils', href:"https://vuetensils.stegosource.com/", desc: 'Vuetensils is a lightweight component library for Vue 2.x that brings some of most common UI features, but only the bare minimum styles to avoid adding any extra bloat.', bgColor: 'bg-amber-500', category: 'vue-ui-libraries' },
    ],

    'angular-ui-libraries': [
        { name: 'Material Angular', href:"https://material.angular.io/", desc:'UI library for Angular based on Material design', bgColor: 'bg-pink-600', category: 'angular-ui-libraries' },
        { name: 'NG Bootstrap', href:"https://ng-bootstrap.github.io/#/home", desc:'UI library for Angular based on the Bootstrap framework', bgColor: 'bg-purple-600', category: 'angular-ui-libraries' },
        { name: 'PrimeNG', href:"https://www.primefaces.org/primeng/#/", desc: 'Powerful UI component library for Angular', bgColor: 'bg-yellow-500', category: 'angular-ui-libraries' },
        { name: 'Onsen Angular', href:"https://onsen.io/angular2/", desc: 'Hybrid mobile and PWA UI library for Angular and Onsen UI', bgColor: 'bg-green-500', category: 'angular-ui-libraries' },
        { name: 'NG Lightning', href:"https://ng-lightning.github.io/ng-lightning/#/", desc: 'Native Angular components & directives for Lightning Design System', bgColor: 'bg-orange-500', category: 'angular-ui-libraries' },
        { name: 'NG Semantic', href:"https://ng-semantic.herokuapp.com/", desc: 'UI library for Angular based on Semantic UI.', bgColor: 'bg-blue-500', category: 'angular-ui-libraries' },
        { name: 'Nebular', href:"https://akveo.github.io/nebular/", desc: 'Customizable UI Kit, Auth & Security for Angular', bgColor: 'bg-cyan-500', category: 'angular-ui-libraries' },
        { name: 'Alyle UI', href:"https://alyle.io/", desc: 'Minimal components set for Angular', bgColor: 'bg-sky-500', category: 'angular-ui-libraries' },
        { name: 'NGX Bootstrap', href:"https://valor-software.com/ngx-bootstrap/#/", desc: 'Another UI library for Angular based on the Bootstrap framework', bgColor: 'bg-amber-500', category: 'angular-ui-libraries' },
        { name: 'NG Zorro', href:"https://ng.ant.design/", desc: 'UI library for Angular based on Ant Design', bgColor: 'bg-red-500', category: 'angular-ui-libraries' },
        { name: 'Pagination for datatables', href:"https://www.npmjs.com/package/ngx-pagination", desc: 'npm library for pagination', bgColor: 'bg-emerald-500', category: 'angular-ui-libraries' },
        { name: 'Multi select dropdown', href:"https://www.npmjs.com/package/ng-multiselect-dropdown", desc: 'For multi select dropdown in forms', bgColor: 'bg-pink-500', category: 'angular-ui-libraries' },
        { name: 'NG Particles', href:"https://particles.matteobruni.it/", desc:'A lightweight Angular component for creating particles', bgColor: 'bg-purple-600', category: 'angular-ui-libraries' },
        { name: 'Covalent UI', href:"https://teradata.github.io/covalent/v3/#/", desc: 'Angular UI Platform focused on solving common enterprise needs', bgColor: 'bg-yellow-500', category: 'angular-ui-libraries' },
        { name: 'Clarity', href:"https://clarity.design/", desc: 'CSS based Angular UI framework developed by VMware group', bgColor: 'bg-green-500', category: 'angular-ui-libraries' },
        { name: 'Taiga UI', href:"https://taiga-ui.dev/", desc: 'Taiga UI is fully-treeshakable Angular UI Kit consisting of multiple base libraries and several add-ons.', bgColor: 'bg-orange-500', category: 'angular-ui-libraries' },
    ],

    'svelte-ui-libraries': [
        { name: 'Svelte Material UI', href:"https://sveltematerialui.com/", desc:'UI library for Svelte based on Material Design', bgColor: 'bg-pink-600', category: 'svelte-ui-libraries' },
        { name: 'SvelteStrap', href:"https://bestguy.github.io/sveltestrap/", desc:'UI library for Svelte based on the Bootstrap framework', bgColor: 'bg-purple-600', category: 'svelte-ui-libraries' },
        { name: 'Svelte Flat UI', href:"https://svelteui.js.org/", desc: 'UI library for Svelte based on Flat Design', bgColor: 'bg-yellow-500', category: 'svelte-ui-libraries' },
        { name: 'Svelte Particles', href:"https://github.com/matteobruni/tsparticles/tree/main/components/svelte", desc: 'A lightweight Svelte component for creating particles', bgColor: 'bg-green-500', category: 'svelte-ui-libraries' },
        { name: 'Attractions', href:"https://illright.github.io/attractions/", desc: 'A pretty cool UI kit for Svelte', bgColor: 'bg-orange-500', category: 'svelte-ui-libraries' },
        { name: 'Svelteit', href:"https://docs.svelteit.dev", desc: 'A minimalistic UI/UX component library for Svelte and Sapper projects', bgColor: 'bg-blue-500', category: 'svelte-ui-libraries' },
    ],

    'react-native-ui-libraries': [
        { name: 'Magnus UI', href:"https://magnus-ui.com/", desc:'Magnus UI is the ultimate UI framework that helps you in building consistent user interfaces effortlessly in react native', bgColor: 'bg-pink-600', category: 'react-native-ui-libraries' },
        { name: 'React Native UI Lib', href:"https://wix.github.io/react-native-ui-lib/", desc:'React Native UI (RNUI) is a UI Toolset & Components Library for React Native from Wix', bgColor: 'bg-purple-600', category: 'react-native-ui-libraries' },
        { name: 'React Native Paper', href:"https://reactnativepaper.com/", desc: 'React Native Paper is a high-quality, standard-compliant Material Design library that has you covered in all major use-cases', bgColor: 'bg-yellow-500', category: 'react-native-ui-libraries' },
        { name: 'UI Kitten', href:"https://akveo.github.io/react-native-ui-kitten/", desc: 'UI Kitten is React Native framework for creating stunning cross-platform mobile applications. Design system based, brings your product from MVP to enterprise.', bgColor: 'bg-green-500', category: 'react-native-ui-libraries' },
        { name: 'React Native Elements', href:"https://reactnativeelements.com/", desc: 'Cross Platform React Native UI Toolkit that provides an all-in-one UI kit for creating apps in react native.', bgColor: 'bg-orange-500', category: 'react-native-ui-libraries' },
        { name: 'NativeBase', href:"https://nativebase.io/", desc: 'Essential cross-platform UI components for React Native & Vue Native.', bgColor: 'bg-blue-500', category: 'react-native-ui-libraries' },
        { name: 'Shoutem UI', href:"https://shoutem.github.io/docs/ui-toolkit/introduction", desc: 'Shoutem UI toolkit enables you to build professionally looking React Native apps with ease', bgColor: 'bg-cyan-500', category: 'react-native-ui-libraries' },
        { name: 'Tailwind-rn', href:"https://github.com/vadimdemedes/tailwind-rn", desc: 'Use Tailwind CSS in React Native projects.', bgColor: 'bg-sky-500', category: 'react-native-ui-libraries' },
        { name: 'Ant Design Mobile RN', href:"https://rn.mobile.ant.design/", desc: 'An Ant design based configurable Mobile UI component library based on React Native.', bgColor: 'bg-amber-500', category: 'react-native-ui-libraries' },
        { name: 'SnackUI', href:"https://github.com/snackui/snackui", desc: 'SnackUI is a UI Kit for React Native + react-native-web that\'s much faster rocket with an optimizing compiler.', bgColor: 'bg-red-500', category: 'react-native-ui-libraries' },
        { name: 'Moti', href:"https://moti.fyi/", desc: 'Moti is the universal animation package for React Native', bgColor: 'bg-emerald-500', category: 'react-native-ui-libraries' },
        { name: 'Tamagui', href:"https://tamagui.dev/", desc: 'Universal React design systems that optimize for native & web', bgColor: 'bg-pink-500', category: 'react-native-ui-libraries' },
    ],

    // Animation & Charts
    'chart-libraries': [
        { name: 'ChartJS', href:"https://www.chartjs.org/", desc:'Simple yet flexible JavaScript charting for designers & developers', bgColor: 'bg-pink-600', category: 'chart-libraries' },
        { name: 'FrappeJS', href:"https://frappe.io/charts", desc:'Includes Green squares grid like in GitHub, and other charts to use.', bgColor: 'bg-purple-600', category: 'chart-libraries' },
        { name: 'G2Plot', href:"https://g2plot.antv.vision/en", desc:'G2Plot is an interactive and responsive charting library based on the grammar of graphics.', bgColor: 'bg-yellow-500', category: 'chart-libraries' },
        { name: 'Google Charts', href:"https://developers.google.com/chart/", desc: 'Get the experience from Google to create similar charts that Google uses.', bgColor: 'bg-green-500', category: 'chart-libraries' },
        { name: 'Data Driven Documents (D3)', href:"https://d3js.org/", desc:'Bind complicated and massive data to interactive graphs.', bgColor: 'bg-orange-500', category: 'chart-libraries' },
        { name: 'ApexCharts.Js', href:"https://apexcharts.com/", desc: 'Modern & Interactive Open-source Charts', bgColor: 'bg-blue-500', category: 'chart-libraries' },
        { name: 'Chartist', href:"http://gionkunz.github.io/chartist-js/index.html", desc:'Simple responsive charts', bgColor: 'bg-cyan-500', category: 'chart-libraries' },
        { name: 'Vizzu', href:"https://lib.vizzuhq.com/0.3.0/", desc:'Vizzu: a free, open-source Javascript library for building animated charts, data stories, and interactive explorers.', bgColor: 'bg-sky-500', category: 'chart-libraries' },
    ],

    'animation-js-libraries': [
        { name: 'Greensock', href:"https://greensock.com/", desc:'A JavaScript library for building high-performance animations that work in every major browser', bgColor: 'bg-pink-600', category: 'animation-js-libraries' },
        { name: 'Velocity.js', href:"http://velocityjs.org/", desc:'Simple & light weight vanilla javascript plugin to create smooth & beautiful animations when you scroll!', bgColor: 'bg-purple-600', category: 'animation-js-libraries' },
        { name: 'Rellax.js', href:"https://github.com/dixonandmoe/rellax", desc:'A buttery smooth, super lightweight, vanilla javascript parallax library', bgColor: 'bg-yellow-500', category: 'animation-js-libraries' },
        { name: 'Three.js', href:"https://github.com/mrdoob/three.js/", desc:'An easy to use, lightweight, 3D library with a default WebGL renderer.', bgColor: 'bg-green-500', category: 'animation-js-libraries' },
        { name: 'Atropos', href:"https://atroposjs.com/", desc:'Atropos is a lightweight, free and open-source JavaScript library to create stunning touch-friendly 3D parallax hover effects.', bgColor: 'bg-orange-500', category: 'animation-js-libraries' },
        { name: 'Wow.js', href:"https://wowjs.uk/", desc:'Reveal Animations When You Scroll.', bgColor: 'bg-blue-500', category: 'animation-js-libraries' },
        { name: 'Chocolat.js', href:"http://chocolat.insipi.de/", desc:'Free lightbox plugin.', bgColor: 'bg-cyan-500', category: 'animation-js-libraries' },
        { name: 'Animate On Scroll', href:"https://michalsnik.github.io/aos/", desc:'Animate on scroll library to reveal animations when You scroll.', bgColor: 'bg-sky-500', category: 'animation-js-libraries' },
        { name: 'Tilt.js', href:"http://gijsroge.github.io/tilt.js/", desc:'A tiny requestAnimationFrame powered 60+fps lightweight parallax hover tilt effect for jQuery.', bgColor: 'bg-amber-500', category: 'animation-js-libraries' },
        { name: 'Roughnotation', href:"https://roughnotation.com/", desc:'Rough Notation is a small JavaScript library to create and animate annotations on a web page', bgColor: 'bg-red-500', category: 'animation-js-libraries' },
        { name: 'tsParticles', href:"https://particles.js.org/", desc:'A lightweight library for creating particles, an improved version of the abandoned and obsolete particles.js', bgColor: 'bg-emerald-500', category: 'animation-js-libraries' },
        { name: 'Particles.js', href:"https://vincentgarreau.com/particles.js/", desc:'A lightweight JavaScript library for creating particles', bgColor: 'bg-pink-500', category: 'animation-js-libraries' },
        { name: 'Mo.js', href:"https://mojs.github.io/", desc:'The motion graphics toolbelt for the web', bgColor: 'bg-purple-600', category: 'animation-js-libraries' },
        { name: 'Lightbox2', href:"https://lokeshdhakar.com/projects/lightbox2/", desc:'A small JS library to overlay images on top of the current page.', bgColor: 'bg-yellow-500', category: 'animation-js-libraries' },
        { name: 'Slick', href:"https://kenwheeler.github.io/slick/", desc:'Fully responsive carousel', bgColor: 'bg-green-500', category: 'animation-js-libraries' },
        { name: 'Barba.js', href:"https://barba.js.org/", desc:'Create fluid and smooth transitions between your website’s pages.', bgColor: 'bg-orange-500', category: 'animation-js-libraries' },
        { name: 'Locomotive Scroll', href:"https://locomotivemtl.github.io/locomotive-scroll/", desc:'A simple scroll library that provides detection of elements in viewport & smooth scrolling with parallax.', bgColor: 'bg-blue-500', category: 'animation-js-libraries' },
        { name: 'Owl carousel', href:"https://owlcarousel2.github.io/OwlCarousel2/", desc:'Free responsive jQuery carousel', bgColor: 'bg-cyan-500', category: 'animation-js-libraries' },
        { name: 'Swiperjs', href:"https://swiperjs.com/", desc:'Free, Open Source, Modern Slider without jQuery. Available for Vanilla JS and all modern frameworks like React, Vue, Angular etc.', bgColor: 'bg-sky-500', category: 'animation-js-libraries' },
        { name: 'Splide', href:"https://splidejs.com", desc:'Free, pure JS library for carousels and sliders', bgColor: 'bg-amber-500', category: 'animation-js-libraries' },
        { name: 'Simple Parallax', href:"https://simpleparallax.com/", desc:'The easiest way to get a parallax effect with javascript', bgColor: 'bg-red-500', category: 'animation-js-libraries' },
        { name: 'KUTE.js', href:"https://thednp.github.io/kute.js/", desc:'KUTE.js is a JavaScript animation engine for modern browsers.', bgColor: 'bg-emerald-500', category: 'animation-js-libraries' },
        { name: 'Granim.js', href:"https://sarcadass.github.io/granim.js/index.html", desc:'Create fluid and interactive gradient animations with this small javascript library.', bgColor: 'bg-pink-500', category: 'animation-js-libraries' },
        { name: 'Popmotion', href:"https://popmotion.io/", desc:'Simple animation libraries for delightful user interfaces.', bgColor: 'bg-purple-600', category: 'animation-js-libraries' },
        { name: 'Vivus', href:"https://maxwellito.github.io/vivus/", desc:'Vivus is a lightweight JavaScript class (with no dependencies) that allows you to animate SVGs, giving them the appearance of being drawn.', bgColor: 'bg-yellow-500', category: 'animation-js-libraries' },
        { name: 'Typed.js', href:"https://mattboldt.com/demos/typed-js/", desc:'A JavaScript Typing Animation Library.', bgColor: 'bg-green-500', category: 'animation-js-libraries' },
        { name: 'Progress Bar.js', href:"https://kimmobrunfeldt.github.io/progressbar.js/", desc:'Responsive and slick progress bars with animated SVG paths.', bgColor: 'bg-orange-500', category: 'animation-js-libraries' },
        { name: 'Midnight.js', href:"https://aerolab.github.io/midnight.js/", desc:'Midnight.js lets you switch fixed headers on the fly', bgColor: 'bg-blue-500', category: 'animation-js-libraries' },
        { name: 'Tingle.js', href:"https://tingle.robinparisi.com/", desc:'Tingle is a simple modal plugin written in pure JavaScript', bgColor: 'bg-cyan-500', category: 'animation-js-libraries' },
        { name: 'Theatre.js', href:"https://www.theatrejs.com/", desc:'Theatre.js is a JavaScript animation library with a GUI. It animates the DOM, WebGL, and any other JavaScript variable.', bgColor: 'bg-amber-500', category: 'animation-js-libraries' },
        { name: 'Splidejs', href:"https://splidejs.com/", desc:'Splide is a lightweight, flexible and accessible slider/carousel written in TypeScript. No dependencies, no Lighthouse errors.', bgColor: 'bg-red-500', category: 'animation-js-libraries' },
        { name: 'Nice-waves', href:"https://gvguy.github.io/nice-waves/", desc:'Beautiful animated waves', bgColor: 'bg-emerald-500', category: 'animation-js-libraries' },
        { name: 'Vanta.js', href:"https://www.vantajs.com/", desc:'Animated website backgrounds in a few lines of code.', bgColor: 'bg-pink-500', category: 'animation-js-libraries' },
    ],

    // Design Tools & Systems
    'design-systems': [
        { name: 'Material Design', href:"https://material.io/", desc:"Google's Material Design", bgColor: 'bg-pink-600', category: 'design-systems' },
        { name: 'Ant Design', href:"https://ant.design/", desc:'Design system for enterprise-level products', bgColor: 'bg-purple-600', category: 'design-systems' },
        { name: 'Apple Design Resources', href:"https://developer.apple.com/design/resources/", desc: 'Guides and templates for using Apple design and UI', bgColor: 'bg-yellow-500', category: 'design-systems' },
        { name: 'Primer', href:"https://primer.style/", desc: 'Design, build, and create with GitHub’s design system', bgColor: 'bg-green-500', category: 'design-systems' },
        { name: 'Arco.design', href:"https://arco.design/en-US", desc: 'An enterprise-level design system jointly launched by the Bytedance GIP UED team and the architecture front-end team.', bgColor: 'bg-orange-500', category: 'design-systems' },
        { name: 'Alta UI', href:"https://www.oracle.com/webfolder/ux/middleware/alta/index.html", desc: "Oracle's design system and toolkit", bgColor: 'bg-blue-500', category: 'design-systems' },
        { name: 'Pulse', href:"https://pulse.heartbeat.ua/", desc: 'Design system, guides and React component library.', bgColor: 'bg-cyan-500', category: 'design-systems' },
        { name: 'Bolt', href:"https://boltdesignsystem.com/", desc: 'Robust Twig and web component powered UI components', bgColor: 'bg-sky-500', category: 'design-systems' },
        { name: 'Clarity Design System', href:"https://clarity.design/", desc: 'UX guidelines, HTML/CSS framework, and Angular components', bgColor: 'bg-amber-500', category: 'design-systems' },
        { name: 'AtlasKit', href:"https://atlaskit.atlassian.com/", desc: "Atlassian's official UI library, built according to the Atlassian Design Guidelines", bgColor: 'bg-red-500', category: 'design-systems' },
        { name: 'Audi Design Resources', href:"https://www.audi.com/ci/en/guides/user-interface/introduction.html", desc: 'Audi UI design system and toolkit', bgColor: 'bg-emerald-500', category: 'design-systems' },
        { name: 'Carbon Design Systems', href:"https://www.carbondesignsystem.com/", desc: 'Carbon is IBM’s open-source design system for products and experiences', bgColor: 'bg-pink-500', category: 'design-systems' },
        { name: 'Yelp Style Guide', href:"https://www.yelp.com/styleguide", desc:'Yelp style guide, components and toolkit', bgColor: 'bg-purple-600', category: 'design-systems' },
        { name: 'Comet', href:"https://comet.discoveryeducation.com/", desc: 'Scalable design system of visual language, components, and design assets', bgColor: 'bg-yellow-500', category: 'design-systems' },
        { name: 'ETrade Design System', href:"https://etrade.design/", desc: 'Guides and toolkits that blend finance with simplicity and ease of use', bgColor: 'bg-green-500', category: 'design-systems' },
        { name: 'Fundamental Library', href:"https://sap.github.io/fundamental-styles/", desc: 'Open source and community driven project for consistent user interfaces', bgColor: 'bg-orange-500', category: 'design-systems' },
        { name: 'Infor Design', href:"https://design.infor.com/", desc: 'Guidelines and resources to create meaningful experiences for Infor’s products', bgColor: 'bg-blue-500', category: 'design-systems' },
        { name: 'Lexicon', href:"https://liferay.design/lexicon/", desc: 'An experience language for crafting beautiful UI', bgColor: 'bg-cyan-500', category: 'design-systems' },
        { name: 'Mailchimp UI/UX', href:"https://ux.mailchimp.com/patterns/color", desc: 'Style guide and components from Mailchimp', bgColor: 'bg-sky-500', category: 'design-systems' },
        { name: 'Marvel Style Guide', href:"https://marvelapp.com/styleguide/overview/introduction", desc: 'Set of design principles and components', bgColor: 'bg-amber-500', category: 'design-systems' },
        { name: 'Microsoft Fluent UI', href:"https://developer.microsoft.com/en-us/fluentui#/", desc: 'Collection of UX frameworks from Microsoft', bgColor: 'bg-red-500', category: 'design-systems' },
        { name: 'Pluralsight Design System', href:"https://design-system.pluralsight.com/", desc: 'Design guide with components for designing with Pluralsight', bgColor: 'bg-emerald-500', category: 'design-systems' },
        { name: 'Polaris', href:"https://polaris.shopify.com/", desc: 'Design system that creates great experiences for all of Shopify’s merchants', bgColor: 'bg-pink-500', category: 'design-systems' },
        { name: 'Mozilla Protocol', href:"https://protocol.mozilla.org/", desc:'Protocol is a design system for Mozilla and Firefox websites', bgColor: 'bg-purple-600', category: 'design-systems' },
        { name: 'SendGrid Style Guide', href:"http://styleguide.sendgrid.com/", desc: 'UI library for developing consistent UI/UX at SendGrid', bgColor: 'bg-yellow-500', category: 'design-systems' },
        { name: 'VTEX Styleguide', href:"https://styleguide.vtex.com/", desc: 'Reusable patterns, components and assets related to product design in VTEX', bgColor: 'bg-green-500', category: 'design-systems' },
        { name: 'Rizzo', href:"https://rizzo.lonelyplanet.com/styleguide/design-elements", desc: 'Style guide with UI components, JS components, widgets, etc', bgColor: 'bg-orange-500', category: 'design-systems' },
        { name: 'Atomize', href:"https://atomizecode.com/", desc: 'UI framework that helps developers collaborate with designers and build consistent user interfaces effortlessly', bgColor: 'bg-blue-500', category: 'design-systems' },
        { name: 'StyleGuides.io', href:"http://styleguides.io/", desc: 'A directory of 500+ styleguides', bgColor: 'bg-cyan-500', category: 'design-systems' },
        { name: 'Done Design System', href:"https://uilibrary.github.io/done-design-system/", desc: 'Open source design system, guides & components', bgColor: 'bg-amber-500', category: 'design-systems' },
        { name: 'Skoda Brand System', href:"https://skoda-brand.com/explore-our-brand", desc: 'Design guideline for developing applications under the Skoda brand', bgColor: 'bg-red-500', category: 'design-systems' },
        { name: 'Spectrum', href:"https://spectrum.adobe.com/", desc: 'Adobe’s design system that provides components and tools to help product teams work more efficiently, and to make Adobe’s applications more cohesive.', bgColor: 'bg-emerald-500', category: 'design-systems' },
        { name: 'Asphalt', href:"https://asphalt.gojek.io/", desc:'Gojek’s design language system. A collection of guidelines and components to create amazing user experiences.', bgColor: 'bg-pink-500', category: 'design-systems' },
        { name: 'Laws of UX', href:"https://lawsofux.com/", desc:'A collection of the key maxims that designers must consider when building user interfaces.', bgColor: 'bg-purple-600', category: 'design-systems' },
        { name: 'Checklist Design', href:"https://www.checklist.design/", desc:'Checklist Design is a curated list of checklists ranging from website pages, to UI components, all the way to branding assets.', bgColor: 'bg-yellow-500', category: 'design-systems' },
        { name: 'Humane By Design', href:"https://humanebydesign.com/", desc: 'A resource that provides guidance for designing ethically humane digital products through patterns focused on user well-being.', bgColor: 'bg-green-500', category: 'design-systems' },
        { name: 'Pr1mer Guidelines', href:"https://guidelines.pr1mer.tech", desc: 'An open source set of very general guidelines, inspired by Human Interface. Created and maintained by Pr1mer Tech', bgColor: 'bg-orange-500', category: 'design-systems' },
        { name: 'Patterfly', href:"https://www.patternfly.org/", desc: 'PatternFly is an open source design system from Red Hat, Inc.', bgColor: 'bg-blue-500', category: 'design-systems' },
    ],

    'online-design-tools': [
        { name: 'Figma', href:"https://www.figma.com/graphic-design-tool/", desc:'Online graphic design tool (Free & paid options)', bgColor: 'bg-pink-600', category: 'online-design-tools' },
        { name: 'Vectr', href:"https://vectr.com/", desc:'Free vector graphics software', bgColor: 'bg-purple-600', category: 'online-design-tools' },
        { name: 'Taler', href:"https://www.taler.app/", desc: 'Create social media banner designs in minutes from hundreds of customizable templates', bgColor: 'bg-yellow-500', category: 'online-design-tools' },
        { name: 'Canva', href:"https://www.canva.com/", desc: 'Create beautiful designs (Free & Paid)', bgColor: 'bg-green-500', category: 'online-design-tools' },
        { name: 'Get Waves', href:"https://getwaves.io/", desc: 'A free SVG wave generator to make unique SVG waves for web design', bgColor: 'bg-orange-500', category: 'online-design-tools' },
        { name: 'Clippy', href:"https://bennettfeely.com/clippy/", desc: 'Easy CSS clip-path maker', bgColor: 'bg-blue-500', category: 'online-design-tools' },
        { name: 'Fancy Border Radius', href:"https://9elements.github.io/fancy-border-radius/full-control.html", desc: 'Eight values specifying border-radius in CSS ( border-radius generator )', bgColor: 'bg-cyan-500', category: 'online-design-tools' },
        { name: 'Wireframe.cc', href:"https://wireframe.cc/", desc: 'Wireframing tool (free & paid)', bgColor: 'bg-sky-500', category: 'online-design-tools' },
        { name: 'Fotor', href:"https://www.fotor.com/", desc: 'Photo editor and design maker', bgColor: 'bg-amber-500', category: 'online-design-tools' },
        { name: 'Pixlr', href:"https://www.pixlr.com/", desc: 'Online photo editor', bgColor: 'bg-red-500', category: 'online-design-tools' },
        { name: 'Animoto Video Maker', href:"https://animoto.com/apps/online-video-maker", desc: 'Make videos online', bgColor: 'bg-emerald-500', category: 'online-design-tools' },
        { name: 'RemoveBG', href:"https://www.remove.bg/", desc: 'Remove image backgrounds', bgColor: 'bg-pink-500', category: 'online-design-tools' },
        { name: 'Photo Creator', href:"https://photos.icons8.com/creator", desc:'Create your own photos instead of searching for stock', bgColor: 'bg-purple-600', category: 'online-design-tools' },
        { name: 'Visme', href:"https://www.visme.co/", desc: 'Create presentations, infographics and more', bgColor: 'bg-yellow-500', category: 'online-design-tools' },
        { name: 'Infogram', href:"https://infogram.com/", desc:'Create infograms', bgColor: 'bg-green-500', category: 'online-design-tools' },
        { name: 'ChartGo', href:"https://www.chartgo.com/", desc: 'Create charts and graphs online', bgColor: 'bg-orange-500', category: 'online-design-tools' },
        { name: 'Cartoon Photo', href:"https://cartoon.pho.to/", desc: 'Turn photos into cartoons', bgColor: 'bg-blue-500', category: 'online-design-tools' },
        { name: 'Whimsical', href:"https://whimsical.com/", desc: 'Wireframes, diagrams and more (4 free)', bgColor: 'bg-cyan-500', category: 'online-design-tools' },
        { name: 'Whiteboard', href:"https://witeboard.com/", desc: 'Online drawing tool', bgColor: 'bg-sky-500', category: 'online-design-tools' },
        { name: 'Octopus', href:"https://octopus.do/", desc: 'Sitemap builder', bgColor: 'bg-amber-500', category: 'online-design-tools' },
        { name: 'Onlineboard', href:"https://onlineboard.eu", desc: 'Real-time shareable whiteboard for brainstorming', bgColor: 'bg-red-500', category: 'online-design-tools' },
        { name: 'CTA Button Maker', href:"https://www.clickminded.com/button-generator/", desc: 'Create call to action buttons', bgColor: 'bg-emerald-500', category: 'online-design-tools' },
        { name: 'Blobmaker', href:"https://www.blobmaker.app/", desc: 'Blobmaker is a free generative design tool, to help you quickly create random, unique, and organic-looking SVG shapes.', bgColor: 'bg-pink-500', category: 'online-design-tools' },
        { name: 'Personas', href:"https://personas.draftbit.com/", desc:'A playful avatar generator for the modern age', bgColor: 'bg-purple-600', category: 'online-design-tools' },
        { name: 'Photopea', href:"https://www.photopea.com", desc: 'An Online Photoshop editor', bgColor: 'bg-yellow-500', category: 'online-design-tools' },
        { name: 'Excalidraw', href:"https://excalidraw.com/", desc: 'Virtual whiteboard for sketching hand-drawn like diagrams', bgColor: 'bg-green-500', category: 'online-design-tools' },
        { name: 'Diagrams', href:"https://www.diagrams.net/", desc: 'Diagram software and Flowchart make', bgColor: 'bg-orange-500', category: 'online-design-tools' },
        { name: 'Mermaid', href:"https://github.com/mermaid-js/mermaid", desc:'Renders Markdown-inspired text definitions to create and modify diagrams dynamically.', bgColor: 'bg-blue-500', category: 'online-design-tools' },
        { name: 'MapInSeconds', href:"http://mapinseconds.com/", desc: 'Simple way to visualize your data with a map', bgColor: 'bg-cyan-500', category: 'online-design-tools' },
        { name: 'Grid Malven', href:"http://grid.malven.co/", desc: 'A CSS grid cheatsheet to reference when creating a CSS grid', bgColor: 'bg-amber-500', category: 'online-design-tools' },
        { name: 'Flex Malven', href:"http://flexbox.malven.co/", desc: 'A flexbox grid cheatsheet to reference when working with flexbox', bgColor: 'bg-red-500', category: 'online-design-tools' },
        { name: 'Smart Upscaler', href:"https://icons8.com/upscaler", desc: 'Upscale images by 2-4x resolution', bgColor: 'bg-emerald-500', category: 'online-design-tools' },
        { name: 'GetAvataaars', href:"https://getavataaars.com/", desc:'Fun and Colorful free avatars web generator tool', bgColor: 'bg-pink-500', category: 'online-design-tools' },
        { name: 'Big Heads', href:"https://github.com/RobertBroersma/bigheads", desc:'Easily generate avatars for your projects with Big Heads by Robert Broersma.', bgColor: 'bg-purple-600', category: 'online-design-tools' },
        { name: 'Webflow', href:"https://webflow.com/", desc:'Build better business websites faster, without coding.', bgColor: 'bg-yellow-500', category: 'online-design-tools' },
        { name: 'Trace', href:"https://stickermule.com/trace", desc: 'Instantly remove the background from your photos', bgColor: 'bg-green-500', category: 'online-design-tools' },
        { name: 'Neumorphism.io', href:"https://neumorphism.io/#55b9f3", desc: 'Generate Soft-UI CSS shadow code', bgColor: 'bg-orange-500', category: 'online-design-tools' },
        { name: 'DB Designer', href:"https://app.dbdesigner.net/", desc: 'Design your database for free online', bgColor: 'bg-blue-500', category: 'online-design-tools' },
        { name: 'Ui Bakery', href:"https://uibakery.io/", desc: 'Create full-fledged web apps visually', bgColor: 'bg-cyan-500', category: 'online-design-tools' },
        { name: 'Faux', href:"http://knutsynstad.com/fauxcode/", desc: 'Turn real code into faux code', bgColor: 'bg-sky-500', category: 'online-design-tools' },
        { name: 'Unscreen', href:"https://www.unscreen.com/", desc: 'Remove Video Background 100% Automatically and Free', bgColor: 'bg-amber-500', category: 'online-design-tools' },
        { name: 'Kodeshot', href:"https://www.kodeshot.net/", desc: 'Convert your source code into nice pictures for your articles, tweets, posts...', bgColor: 'bg-red-500', category: 'online-design-tools' },
        { name: 'Wix', href:"https://www.wix.com/", desc: 'Create a Website You’re Proud Of', bgColor: 'bg-emerald-500', category: 'online-design-tools' },
        { name: 'GTmetrix', href:"https://gtmetrix.com/", desc: 'Website Speed and Performance Optimization', bgColor: 'bg-pink-500', category: 'online-design-tools' },
        { name: 'Framer', href:"https://www.framer.com/", desc:'Prototyping tool for teams', bgColor: 'bg-purple-600', category: 'online-design-tools' },
        { name: 'Draw.io', href:"https://www.draw.io/", desc:'Creating and Edit SVG Online', bgColor: 'bg-pink-600', category: 'online-design-tools' },
        { name: 'CSS Arrow', href:"http://www.cssarrowplease.com/", desc:'Create and export CSS code for a custom box with an arrow extending out from the side.', bgColor: 'bg-purple-600', category: 'online-design-tools' },
        { name: 'Lucidchart', href:"https://www.lucidchart.com/pages/", desc: 'Diagramming and visualization tools that allows creating databases, flowcharts, and more.', bgColor: 'bg-yellow-500', category: 'online-design-tools' },
        { name: 'Carbon', href:"https://carbon.now.sh", desc: 'Create and share beautiful images of your source code.', bgColor: 'bg-green-500', category: 'online-design-tools' },
        { name: 'PixCleaner', href:"https://www.pixcleaner.com/", desc: 'Accurate and hassle free background removal tool', bgColor: 'bg-orange-500', category: 'online-design-tools' },
        { name: 'Glass UI', href:"https://ui.glass/generator", desc: 'A modern CSS UI library based on the glassmorphism design principles.', bgColor: 'bg-blue-500', category: 'online-design-tools' },
        { name: 'Glassmorphism', href:"https://glassmorphism.com/", desc: 'An online tool for generating glassmorphic UI CSS snippets.', bgColor: 'bg-cyan-500', category: 'online-design-tools' },
        { name: 'TableConvert', href:"https://tableconvert.com/", desc: 'Convert tables between formats like Markdown, CSV, JSON, XML, SQL, etc.', bgColor: 'bg-sky-500', category: 'online-design-tools' },
        { name: 'Doodle Ipsum', href:"https://doodleipsum.com/", desc: 'The lorem ipsum of illustrations.', bgColor: 'bg-amber-500', category: 'online-design-tools' },
        { name: 'Figen', href:"https://figen.cc/", desc: 'Post Cover & Background Generator Tool', bgColor: 'bg-red-500', category: 'online-design-tools' },
        { name: 'Windframe', href:"https://www.devwares.com/windframe/", desc: 'Prototype and build stunning websites using Tailwind CSS.', bgColor: 'bg-emerald-500', category: 'online-design-tools' },
        { name: 'Slickr', href:"https://slickr.vercel.app/", desc: 'A tool for designing cover images for blogs.', bgColor: 'bg-pink-500', category: 'online-design-tools' },
        { name: 'Shadow Palette Generator', href:"https://www.joshwcomeau.com/shadow-palette/", desc:'Create a set of lush, realistic CSS shadows', bgColor: 'bg-purple-600', category: 'online-design-tools' },
        { name: 'Ray.so', href:"https://ray.so/", desc: 'Online tool to create beautiful images of your code.', bgColor: 'bg-yellow-500', category: 'online-design-tools' },
        { name: 'Codepng', href:"https://www.codepng.app/", desc: 'Convert your source code into awesome shareable images.', bgColor: 'bg-green-500', category: 'online-design-tools' },
        { name: 'CSS Grid Generator', href:"https://grid.layoutit.com/", desc: 'A tool for creating CSS Grid Layouts', bgColor: 'bg-sky-500', category: 'online-design-tools' },
        { name: 'JSONT', href:"https://www.jsont.run/", desc: 'Simple and powerful online JSON formatting tool', bgColor: 'bg-amber-500', category: 'online-design-tools' },
        { name: 'Jitter', href:"https://jitter.video/", desc: 'Online tool to create motion graphics/design', bgColor: 'bg-red-500', category: 'online-design-tools' },
    ],

    // Developer Tools
    'chrome-extensions': [
        { name: 'WhatFont', href:"https://chrome.google.com/webstore/detail/whatfont/jabopobgcpjmedljpbcaablpmlmfcogm", desc:'The easiest way to identify fonts on web pages.', bgColor: 'bg-pink-600', category: 'chrome-extensions' },
        { name: 'WhatRuns', href:"https://chrome.google.com/webstore/detail/whatruns/cmkdbmfndkfgebldhnkbfhlneefdaaip?hl=en", desc:'Discover what runs a website. Frameworks, Analytics Tools, WordPress Plugins, Fonts: you name it.', bgColor: 'bg-purple-600', category: 'chrome-extensions' },
        { name: 'Web Developer', href:"https://chrome.google.com/webstore/detail/web-developer/bfbameneiokkgbdmiekhjnmfkcnldhhm", desc:'Adds a toolbar button with various web developer tools.', bgColor: 'bg-yellow-500', category: 'chrome-extensions' },
        { name: 'Awesome Screenshot & Screen Recorder', href:"https://chrome.google.com/webstore/detail/awesome-screenshot-screen/nlipoenfbbikpbjkfpfillcgkoblgpmj?hl=en", desc:'Full page screen capture and screen recorder: 2 in 1. Share screencast video instantly.', bgColor: 'bg-green-500', category: 'chrome-extensions' },
        { name: 'News for Busy Developers', href:"https://chrome.google.com/webstore/detail/dailydev-news-for-busy-de/jlmpjdjjbgclbocgajdjefcidcncaied", desc:'Get programming news with zero effort. Simply open a new tab, and you’re all set. A must-have tool for busy developers!', bgColor: 'bg-orange-500', category: 'chrome-extensions' },
        { name: 'JSONView', href:"https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc?hl=en", desc:'Validate and view JSON documents.', bgColor: 'bg-blue-500', category: 'chrome-extensions' },
        { name: 'JSON Lite', href:"https://github.com/lauriro/json-lite", desc:'Browser extension for viewing JSON files.', bgColor: 'bg-cyan-500', category: 'chrome-extensions' },
        { name: 'Window Resizer', href:"https://chrome.google.com/webstore/detail/window-resizer/kkelicaakdanhinjdeammmilcgefonfh?hl=en", desc:'Resize the browser window to emulate various screen resolutions.', bgColor: 'bg-sky-500', category: 'chrome-extensions' },
        { name: 'Responsive Viewer', href:"https://chrome.google.com/webstore/detail/responsive-viewer/inmopeiepgfljkpkidclfgbgbmfcennb?hl=en", desc:'Show multiple screens at once :  responsive design tester.', bgColor: 'bg-amber-500', category: 'chrome-extensions' },
        { name: 'BrowserStack', href:"https://chrome.google.com/webstore/detail/browserstack/nkihdmlheodkdfojglpcjjmioefjahjb?hl=en", desc:'Instantly test your webpage on any desktop or mobile browser.', bgColor: 'bg-red-500', category: 'chrome-extensions' },
        { name: 'VisBug', href:"https://chrome.google.com/webstore/detail/visbug/cdockenadnadldjbbgcallicgledbeoc?hl=en", desc:'Open-source web design debug tool built with JavaScript.', bgColor: 'bg-emerald-500', category: 'chrome-extensions' },
        { name: 'Kontrast: WCAG Contrast Checker', href:"https://chrome.google.com/webstore/detail/kontrast-wcag-contrast-ch/haphaaenepedkjngghandlmhfillnhjk?hl=en", desc:'Quickly check and adjust contrast in real time to meet WCAG 2.1 requirements.', bgColor: 'bg-pink-500', category: 'chrome-extensions' },
        { name: 'PerfectPixel', href:"https://chrome.google.com/webstore/detail/perfectpixel-by-welldonec/dkaagdgjmgdmbnecmcefdhjekcoceebi", desc:'Adds a semi-transparent image overlay to perform pixel-perfect comparisons.', bgColor: 'bg-purple-600', category: 'chrome-extensions' },
        { name: 'Pesticide', href:"https://chrome.google.com/webstore/detail/pesticide-for-chrome-with/neonnmencpneifkhlmhmfhfiklgjmloi", desc:'Outlines all HTML elements to visualize layout structure :  great for debugging.', bgColor: 'bg-yellow-500', category: 'chrome-extensions' },
        { name: 'Site Palette', href:"https://chrome.google.com/webstore/detail/site-palette/pekhihjiehdafocefoimckjpbkegknoh", desc:'Grab color palettes from any website.', bgColor: 'bg-green-500', category: 'chrome-extensions' },
        { name: 'ColorZilla', href:"https://chrome.google.com/webstore/detail/colorzilla/bhlhnicpbhignbdhedgjhgdocnmhomnp", desc:'Advanced Eyedropper, Color Picker, Gradient Generator and other color tools.', bgColor: 'bg-orange-500', category: 'chrome-extensions' },
        { name: 'Lorem Ipsum Generator', href:"https://chrome.google.com/webstore/detail/lorem-ipsum-generator-def/mcdcbjjoakogbcopinefncmkcamnfkdb", desc:'Quickly create Lorem Ipsum or custom placeholder text.', bgColor: 'bg-blue-500', category: 'chrome-extensions' },
        { name: 'JavaScript and CSS Code Beautifier', href:"https://chrome.google.com/webstore/detail/javascript-and-css-code-b/iiglodndmmefofehaibmaignglbpdald?hl=en", desc:'Beautify CSS, JavaScript, and JSON code directly in the browser.', bgColor: 'bg-cyan-500', category: 'chrome-extensions' },
        { name: 'Imageye: Image Downloader', href:"https://chrome.google.com/webstore/detail/imageye-image-downloader/agionbommeaifngbhincahgmoflcikhm", desc:'Find and download all images on a web page easily.', bgColor: 'bg-sky-500', category: 'chrome-extensions' },
        { name: 'GoFullPage: Full Page Screen Capture', href:"https://chrome.google.com/webstore/detail/gofullpage-full-page-scre/fdpohaocaechififmbbbbbknoalclacl", desc:'Capture an entire web page as a screenshot :  simple and reliable.', bgColor: 'bg-amber-500', category: 'chrome-extensions' },
        { name: 'Stylebot', href:"https://chrome.google.com/webstore/detail/stylebot/oiaejidbmkiecgbjeifoejpgmdaleoha", desc:'Change the appearance of any website instantly.', bgColor: 'bg-red-500', category: 'chrome-extensions' },
        { name: 'ColorPick Eyedropper', href:"https://chrome.google.com/webstore/detail/colorpick-eyedropper/ohcpnigalekghcmgcdcenkpelffpdolg", desc:'A zoomed eyedropper & color chooser tool.', bgColor: 'bg-emerald-500', category: 'chrome-extensions' },
        { name: 'React Developer Tools', href:"https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi", desc:'Inspect React component hierarchies in Chrome DevTools.', bgColor: 'bg-pink-500', category: 'chrome-extensions' },
        { name: 'Wappalyzer', href:"https://chrome.google.com/webstore/detail/wappalyzer/gppongmhjkpfnbhagpmjfkannfbllamg", desc:'See what technologies any website uses.', bgColor: 'bg-purple-600', category: 'chrome-extensions' },
        { name: 'Fake Filler', href:"https://chrome.google.com/webstore/detail/fake-filler/bnjjngeaknajbdcgpfkgnonkmififhfo", desc:'Fills all form fields with dummy data automatically.', bgColor: 'bg-yellow-500', category: 'chrome-extensions' },
        { name: 'Page Ruler Redux', href:"https://chrome.google.com/webstore/detail/page-ruler-redux/giejhjebcalaheckengmchjekofhhmal", desc:'Measure elements on a web page with pixel precision.', bgColor: 'bg-green-500', category: 'chrome-extensions' },
        { name: 'Web Editor', href:"https://chrome.google.com/webstore/detail/web-editor/pdmlhckofhkhebmcplblcijijgjiakcm", desc:'Inspect, edit, and restyle any web page visually.', bgColor: 'bg-orange-500', category: 'chrome-extensions' },
        { name: 'CSSViewer', href:"https://chrome.google.com/webstore/detail/cssviewer/ggfgijbpiheegefliciemofobhmofgce", desc:'View CSS properties of any element quickly.', bgColor: 'bg-blue-500', category: 'chrome-extensions' },
        { name: 'Fonts Ninja', href:"https://chrome.google.com/webstore/detail/fonts-ninja/eljapbgkmlngdpckoiiibecpemleclhh", desc:'Identify and preview fonts from any website.', bgColor: 'bg-cyan-500', category: 'chrome-extensions' },
        { name: 'Lighthouse', href:"https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk", desc:'Audit performance, accessibility, and SEO of any site.', bgColor: 'bg-amber-500', category: 'chrome-extensions' },
        { name: 'Debug CSS', href:"https://chrome.google.com/webstore/detail/debug-css/igiofjnckcagmjgdoaakafngegecjnkj", desc:'Add outlines to all page elements to debug CSS layout.', bgColor: 'bg-red-500', category: 'chrome-extensions' },
        { name: 'Angular Developer Tools', href:"https://chrome.google.com/webstore/detail/angular-devtools/ienfalfjdbdpebioblfackkekamfmbnh", desc:'Inspect Angular component states and structure easily.', bgColor: 'bg-emerald-500', category: 'chrome-extensions' },
    ],

    'favicons': [
        { name: 'Favicon.io', href: "https://favicon.io/", desc:'Generate a favicon from text, from an image, or from an emoji. Download in .ico and .png formats', bgColor: 'bg-pink-600', category: 'favicons' },
        { name: 'Favicomatic', href:"https://favicomatic.com/", desc:'Generate favicons of all sizes and formats, plus the HTML code to support all browsers and devices.', bgColor: 'bg-purple-600', category: 'favicons' },
        { name: 'Favicon Generator', href: "http://tools.dynamicdrive.com/favicon/", desc:'Generate favicon .ico files for your website.', bgColor: 'bg-yellow-500', category: 'favicons' },
        { name: 'RealFaviconGenerator', href: "https://realfavicongenerator.net/", desc:'Generate icons for all platforms (Windows, iOS, Android).', bgColor: 'bg-green-500', category: 'favicons' },
        { name: 'FontIcon', href: "https://gauger.io/fonticon/", desc:'Generate favicons and images from Font Awesome icons.', bgColor: 'bg-orange-500', category: 'favicons' },
        { name: 'Favicon.cc', href: "https://www.favicon.cc", desc:'Draw a favicon online and browse a library of user-created icons.', bgColor: 'bg-blue-500', category: 'favicons' },
        { name: 'Maskable.app Editor', href: "https://maskable.app/editor/", desc:'Generate maskable PWA icons from your existing logo.', bgColor: 'bg-cyan-500', category: 'favicons' },
    ],

    'logos': [
        { name: 'Instant Logo Search', href: "http://instantlogosearch.com/", desc:'Thousands of free brand logos (SVG: PNG)', bgColor: 'bg-pink-600', category: 'logos' },
        { name: 'LogoSear.ch', href:"https://logosear.ch/search.html", desc:'Search engine with over 200,000 SVG logos indexed', bgColor: 'bg-purple-600', category: 'logos' },
        { name: 'SVGPorn', href: "https://svgporn.com", desc:'1000+ high-quality SVG logos', bgColor: 'bg-yellow-500', category: 'logos' },
        { name: 'Payment System Logos', href:"https://github.com/mpay24/payment-logos/", desc:'Logos for payment systems available in PNG and SVG', bgColor: 'bg-green-500', category: 'logos' },
        { name: 'Browser Logos', href: "https://github.com/alrra/browser-logos/", desc:'High-resolution web browser logos', bgColor: 'bg-orange-500', category: 'logos' },
        { name: 'VectorLogoZone', href: "https://www.vectorlogo.zone/", desc:'Consistently formatted SVG logos', bgColor: 'bg-blue-500', category: 'logos' },
        { name: 'World Vector Logo', href: "https://worldvectorlogo.com/", desc:'Download vector logos of brands you love', bgColor: 'bg-cyan-500', category: 'logos' },
        { name: 'Logo Maker', href: "https://logomakr.com/", desc:'Create custom logos online', bgColor: 'bg-sky-500', category: 'logos' },
        { name: 'Free Logo Maker', href: "https://www.namecheap.com/logo-maker/", desc:'Fast, all-in-one logo generator', bgColor: 'bg-amber-500', category: 'logos' },
        { name: 'LOGOwine', href: "https://www.logo.wine/", desc:'Brand logos free to download in SVG and PNG formats', bgColor: 'bg-red-500', category: 'logos' },
    ],

    'stock-videos': [
        { name: 'Pexels', href: "https://www.pexels.com/videos", desc:'Largest library of free-to-use videos donated by the community.', bgColor: 'bg-pink-600', category: 'stock-videos' },
        { name: 'Unsplash', href:"https://www.pixabay.com/videos", desc:'Large library of free-to-use videos donated by the community, similar to Pexels.', bgColor: 'bg-purple-600', category: 'stock-videos' },
        { name: 'Coverr.co', href: "https://coverr.co/", desc:'Beautiful free stock video footage.', bgColor: 'bg-yellow-500', category: 'stock-videos' },
        { name: 'Videezy', href: "https://www.videezy.com/", desc:'Free HD stock footage and 4K videos.', bgColor: 'bg-green-500', category: 'stock-videos' },
        { name: 'Mix Kit', href: "https://mixkit.co/", desc:'Stock video clips and music.', bgColor: 'bg-orange-500', category: 'stock-videos' },
        { name: 'Life Of Vids', href: "https://www.lifeofvids.com/", desc:'Free video clips and loops.', bgColor: 'bg-blue-500', category: 'stock-videos' },
        { name: 'Videvo', href: "https://www.videvo.net/stock-video-footage/", desc:'Free and premium stock videos.', bgColor: 'bg-cyan-500', category: 'stock-videos' },
        { name: 'Loopvidz', href: "http://stock.loopvidz.com/", desc:'Free cinemagraphs created with the VIMAGE app.', bgColor: 'bg-sky-500', category: 'stock-videos' },
        { name: 'SplitShire', href: "https://www.splitshire.com/", desc:'Beautiful and exclusive free stock videos and photos.', bgColor: 'bg-amber-500', category: 'stock-videos' },
    ],

    'vectors-clip': [
        { name: 'Vecteezy', href: "https://www.vecteezy.com/", desc:'Find and download free vector art.', bgColor: 'bg-pink-600', category: 'vectors-clip' },
        { name: 'Freepik', href:"https://www.freepik.com", desc:'Free vectors, stock photos, PSD and icons.', bgColor: 'bg-purple-600', category: 'vectors-clip' },
        { name: 'Free Vectors', href: "https://www.freevectors.net/", desc:'Community of vector lovers sharing free vector graphics.', bgColor: 'bg-yellow-500', category: 'vectors-clip' },
        { name: 'PNGTree', href: "https://pngtree.com/free-vectors", desc:'PNGs, backgrounds, templates, and text effects.', bgColor: 'bg-green-500', category: 'vectors-clip' },
        { name: 'Vector4Free', href: "https://www.vector4free.com/", desc:'Free vector graphics.', bgColor: 'bg-orange-500', category: 'vectors-clip' },
        { name: 'Freeble', href: "http://freebbble.com/", desc:'Vectors, patterns, mockups and more.', bgColor: 'bg-blue-500', category: 'vectors-clip' },
        { name: 'Lukaszadam', href: "https://lukaszadam.com/", desc:'Free vector artworks.', bgColor: 'bg-cyan-500', category: 'vectors-clip' },
        { name: 'Illlustrations', href: "https://illlustrations.co/", desc:'Beautiful 100 illustrations in PNG and SVG.', bgColor: 'bg-sky-500', category: 'vectors-clip' },
        { name: 'Clipart', href: "https://www.clipart.email/", desc:'Choose great clipart, PNGs, coloring pages, drawings and more from a free collection.', bgColor: 'bg-amber-500', category: 'vectors-clip' },
        { name: 'Growwwkit Illustrations', href:"https://growwwkit.com/illustrations/phonies", desc:'A set of 8 simple, black & white, stylish illustrations.', bgColor: 'bg-red-500', category: 'vectors-clip' },
        { name: 'Trianglify.io', href: "https://trianglify.io/", desc:'Generate low-poly backgrounds, textures, and vectors.', bgColor: 'bg-emerald-500', category: 'vectors-clip' },
        { name: 'Blob', href: "https://blobs.app/", desc:'Generate blob shapes for Web and Flutter apps.', bgColor: 'bg-pink-500', category: 'vectors-clip' },
        { name: 'HiClipart', href:"https://www.hiclipart.com/", desc:'A community for designers to share & download transparent PNG cliparts.', bgColor: 'bg-purple-600', category: 'vectors-clip' },
        { name: 'Stories by Freepik', href:"https://stories.freepik.com/", desc:'A collection of free and customizable illustrations for projects.', bgColor: 'bg-yellow-500', category: 'vectors-clip' },
        { name: 'Black Illustrations', href: "https://www.blackillustrations.com/", desc:'Beautiful illustrations of black people (free and premium).', bgColor: 'bg-green-500', category: 'vectors-clip' },
        { name: 'Delesign', href: "https://delesign.com/free-designs/graphics", desc:'A collection of free illustrations and more.', bgColor: 'bg-orange-500', category: 'vectors-clip' },
        { name: 'Custom Shape Dividers', href:"https://www.shapedivider.app/", desc:'Free tool for exporting beautiful SVG shape dividers.', bgColor: 'bg-blue-500', category: 'vectors-clip' },
        { name: 'Servier Medical Art', href:"https://smart.servier.com", desc:'3000 free medical images to illustrate your publications and presentations.', bgColor: 'bg-cyan-500', category: 'vectors-clip' },
        { name: 'Clker', href: "http://www.clker.com", desc:'Free clip art you can use for anything.', bgColor: 'bg-sky-500', category: 'vectors-clip' },
        { name: 'SVG Wave', href: "https://svgwave.in/", desc:'SVG wave generator for UI designs.', bgColor: 'bg-amber-500', category: 'vectors-clip' },
        { name: 'Heritage Library', href:"https://www.heritagetype.com/collections/free-vintage-illustrations", desc:'Vintage illustrations (vector and PNG).', bgColor: 'bg-red-500', category: 'vectors-clip' },
        { name: 'ROBOHASH', href:"https://robohash.org/", desc:'Generate unique images from any text.', bgColor: 'bg-emerald-500', category: 'vectors-clip' },
        { name: 'Tabbied', href:"https://tabbied.com/", desc:'Create and customize minimally generated patterns or artwork for backgrounds, print, and more.', bgColor: 'bg-pink-500', category: 'vectors-clip' },
        { name: 'Haikei', href:"https://app.haikei.app/", desc:'An awesome multi-shape web app for generative design.', bgColor: 'bg-purple-600', category: 'vectors-clip' },
    ],


    'image-mockups': [
        { name: 'Smart Mockups', href:"https://smartmockups.com/", desc:'Create stunning product mockups (free & premium).', bgColor: 'bg-pink-600', category: 'image-mockups' },
        { name: 'Media Modifier', href:"https://mediamodifier.com/", desc:'Beautiful design mockups service for your products (free & premium).', bgColor: 'bg-purple-600', category: 'image-mockups' },
        { name: 'Shot Snap', href:"https://shotsnapp.com/", desc:'Create beautiful device mockup images for your app or website design.', bgColor: 'bg-yellow-500', category: 'image-mockups' },
        { name: 'Screely', href:"https://www.screely.com/", desc:'Instantly turn your screenshot into a mockup.', bgColor: 'bg-green-500', category: 'image-mockups' },
        { name: 'Screenshot.rocks', href:"https://screenshot.rocks/", desc:'Create beautiful browser and mobile mockups in seconds.', bgColor: 'bg-orange-500', category: 'image-mockups' },
        { name: 'Screen Peak', href:"https://screenpeek.io/", desc:'Create a mockup from a URL.', bgColor: 'bg-blue-500', category: 'image-mockups' },
        { name: 'Mockup World', href:"https://www.mockupworld.co/", desc:'The biggest source of free photo-realistic mockups online.', bgColor: 'bg-cyan-500', category: 'image-mockups' },
        { name: 'Collab Shot', href:"https://www.collabshot.com/", desc:'Real-time screen grabs and image sharing.', bgColor: 'bg-sky-500', category: 'image-mockups' },
        { name: 'Facebook Devices', href:"https://facebook.design/devices", desc:'Images and Sketch files of popular devices.', bgColor: 'bg-amber-500', category: 'image-mockups' },
        { name: 'Threed.io', href:"https://threed.io", desc:'Generate 3D mockups right in your browser.', bgColor: 'bg-red-500', category: 'image-mockups' },
        { name: 'Mockuphone', href:"https://mockuphone.com/", desc:'100% free mockups for all devices including iOS, Android, Windows Phone, Laptop, Desktop, and TV.', bgColor: 'bg-emerald-500', category: 'image-mockups' },
        { name: 'Device Shots', href:"https://deviceshots.com/", desc:'Create high-resolution device mockups for social media, for free.', bgColor: 'bg-pink-500', category: 'image-mockups' },
        { name: 'Clean Mock', href:"https://www.mock.video/", desc:'Instantly create mockups by adding a device frame to your videos.', bgColor: 'bg-purple-600', category: 'image-mockups' },
        { name: 'MockupBro', href:"https://mockupbro.com/", desc:'Create product mockups with an online generator :  choose a mockup, upload your design, and download without watermark.', bgColor: 'bg-yellow-500', category: 'image-mockups' },
        { name: 'Animockup', href:"https://animockup.com/", desc:'Create animated mockups directly in the browser.', bgColor: 'bg-green-500', category: 'image-mockups' },
    ],

    'ui-graphics': [
        { name: 'UI Design Daily', href: 'https://uidesigndaily.com/', desc:'Awesome UI components of all types.', bgColor: 'bg-pink-600', category: 'ui-graphics' },
        { name: '100 Daily UI', href:"https://100dailyui.webflow.io/", desc:'Free Figma library of products, elements, and screens.', bgColor: 'bg-purple-600', category: 'ui-graphics' },
        { name: 'Sketch App Sources', href:"https://www.sketchappsources.com/", desc:'Sketch UIs, wireframes, icons, and more.', bgColor: 'bg-yellow-500', category: 'ui-graphics' },
        { name: 'Humaaans', href:"https://www.humaaans.com/", desc:'Cool illustrations of people with the ability to mix and match.', bgColor: 'bg-green-500', category: 'ui-graphics' },
        { name: 'Paaatterns', href:"https://products.ls.graphics/paaatterns/", desc:'Beautiful vector patterns for backgrounds and UI design.', bgColor: 'bg-orange-500', category: 'ui-graphics' },
        { name: 'The Pattern Library', href:"http://thepatternlibrary.com/", desc:'Free beautiful background patterns.', bgColor: 'bg-blue-500', category: 'ui-graphics' },
        { name: '404 Illustration', href:"https://error404.fun/", desc:'Free illustrations for 404 pages.', bgColor: 'bg-cyan-500', category: 'ui-graphics' },
        { name: 'Drawkit.io', href:"https://www.drawkit.io/", desc:'Illustrations for designers and startups.', bgColor: 'bg-sky-500', category: 'ui-graphics' },
        { name: 'Absurd Design', href:"https://absurd.design/", desc:'Free surrealist illustrations for designers and developers.', bgColor: 'bg-amber-500', category: 'ui-graphics' },
        { name: 'Undraw.co', href:"https://undraw.co/", desc:'Open-source illustrations for any idea you can imagine.', bgColor: 'bg-red-500', category: 'ui-graphics' },
        { name: 'Manypixels.co', href:"https://www.manypixels.co/gallery/", desc:'Monochromatic, isometric, high-quality illustrations.', bgColor: 'bg-emerald-500', category: 'ui-graphics' },
        { name: 'Open Peeps', href:"https://www.openpeeps.com/", desc:'Hand-drawn illustration library.', bgColor: 'bg-pink-500', category: 'ui-graphics' },
        { name: 'UI Space', href:"https://uispace.net/", desc:'Thousands of great UI freebies.', bgColor: 'bg-purple-600', category: 'ui-graphics' },
        { name: 'Animaticons', href:"http://animaticons.co/", desc:'Beautiful, customizable animated GIF icons.', bgColor: 'bg-yellow-500', category: 'ui-graphics' },
        { name: 'Uplabs', href:"https://www.uplabs.com/", desc:'High-quality design resources (Free & Premium).', bgColor: 'bg-green-500', category: 'ui-graphics' },
        { name: 'InvisionApp', href:"https://www.invisionapp.com/inside-design/design-resources/", desc:'Library of free, high-quality UI kits, icon packs, and mockups.', bgColor: 'bg-orange-500', category: 'ui-graphics' },
        { name: 'Open Doodles', href:"https://www.opendoodles.com/", desc:'A free set of sketchy illustrations.', bgColor: 'bg-blue-500', category: 'ui-graphics' },
        { name: 'Avataaars', href:"https://avataaars.com/", desc:'Free sketch library of avatar illustrations by Pablo Stanley.', bgColor: 'bg-cyan-500', category: 'ui-graphics' },
        { name: 'Blush', href:"https://blush.design/", desc:'Free customizable illustrations with Figma plugin.', bgColor: 'bg-sky-500', category: 'ui-graphics' },
        { name: 'Hero Patterns', href:"http://www.heropatterns.com/", desc:'A collection of repeatable SVG background patterns.', bgColor: 'bg-amber-500', category: 'ui-graphics' },
        { name: 'BEAUBUS Patterns', href:"https://patterns.beaubus.com/", desc:'A set of 150+ free SVG background patterns.', bgColor: 'bg-red-500', category: 'ui-graphics' },
        { name: 'IsoFlat', href:"https://isoflat.com/", desc:'A free collection of isometric SVG graphic resources.', bgColor: 'bg-emerald-500', category: 'ui-graphics' },
        { name: 'IRA Design', href:"https://iradesign.io/", desc:'An open-source gradient illustration collection by Creative Tim.', bgColor: 'bg-pink-500', category: 'ui-graphics' },
        { name: 'Transparent Textures', href:"https://www.transparenttextures.com/", desc:'A collection of transparent texture background patterns.', bgColor: 'bg-purple-600', category: 'ui-graphics' },
        { name: 'Icons8', href:"https://icons8.com/illustrations", desc:'Free vector illustrations to enhance your project.', bgColor: 'bg-yellow-500', category: 'ui-graphics' },
        { name: 'Patternico', href:"https://patternico.com", desc:'Seamless pattern maker.', bgColor: 'bg-green-500', category: 'ui-graphics' },
        { name: 'Freellustrations', href:"https://www.freellustrations.com/", desc:'Free background images for landing pages.', bgColor: 'bg-orange-500', category: 'ui-graphics' },
        { name: 'Pixeltrue Illustrations', href:"https://www.pixeltrue.com/illustrations", desc:'Free animated illustrations.', bgColor: 'bg-blue-500', category: 'ui-graphics' },
        { name: 'Abstract User Avatar API', href:"https://www.abstractapi.com/user-avatar-api", desc:'API to create simple yet flexible user avatars from names or emails.', bgColor: 'bg-amber-500', category: 'ui-graphics' },
        { name: 'Sketchvalley', href:"https://sketchvalley.com/", desc:'Download free PNG, SVG, or AI files.', bgColor: 'bg-red-500', category: 'ui-graphics' },
        { name: 'PatternPad', href:"https://patternpad.com/", desc:'Free and unlimited unique pattern designs.', bgColor: 'bg-emerald-500', category: 'ui-graphics' },
        { name: 'Dimensions', href:"https://www.dimensions.com/", desc:'Database of dimensioned drawings of everyday objects and spaces.', bgColor: 'bg-pink-500', category: 'ui-graphics' },
        { name: 'Freebiesbug', href:"https://freebiesbug.com/", desc:'Hand-picked resources for web designers and developers, constantly updated.', bgColor: 'bg-purple-600', category: 'ui-graphics' },
        { name: 'Flexiple', href:"https://2.flexiple.com/scale/all-illustrations", desc:'A new high-quality open-source illustration every day.', bgColor: 'bg-yellow-500', category: 'ui-graphics' },
        { name: 'Cool Text', href:"https://cooltext.com/", desc:'Free graphics generator for creating logos and text effects.', bgColor: 'bg-green-500', category: 'ui-graphics' },
        { name: 'Illustration Kit', href:"https://illustrationkit.com/", desc:'Premium open-source illustrations added daily.', bgColor: 'bg-orange-500', category: 'ui-graphics' },
        { name: 'Doodad Pattern Generator', href:"https://doodad.dev/pattern-generator/", desc:'Create unique, seamless, royalty-free patterns.', bgColor: 'bg-blue-500', category: 'ui-graphics' },
        { name: 'Pattern Monster', href:"https://pattern.monster/", desc:'Online generator to create repeatable SVG patterns.', bgColor: 'bg-cyan-500', category: 'ui-graphics' },
        { name: 'Exemplar', href:"https://themeselection.com/products/exemplar-free-avatar-library-for-figma-and-sketch/", desc:'Free avatar library for Figma and Sketch.', bgColor: 'bg-sky-500', category: 'ui-graphics' },
        { name: 'UIBundle', href:"https://uibundle.com", desc:'Thousands of free design resources: UI kits, mockups, illustrations, icons, fonts, templates, and more.', bgColor: 'bg-amber-500', category: 'ui-graphics' },
        { name: 'Openby Design', href:"https://openby.design/", desc:'Custom-crafted free UI design resources for personal and commercial projects.', bgColor: 'bg-red-500', category: 'ui-graphics' },
        { name: 'Design Stripe', href:"https://designstripe.com/catalog", desc:'Create beautiful illustrations without design skills.', bgColor: 'bg-emerald-500', category: 'ui-graphics' },
        { name: 'HOLA SVG!', href:"https://holasvg.com/", desc:'An SVG playground to share and experiment with SVGs.', bgColor: 'bg-pink-500', category: 'ui-graphics' },
        { name: 'Symu.co', href:"https://symu.co/freebies/templates-4/", desc:'Free templates, UI kits, icons, and PSDs.', bgColor: 'bg-purple-600', category: 'ui-graphics' },
        { name: 'Mesh Gradient', href:"https://meshgradient.in/", desc:'Generate and download beautiful mesh gradients.', bgColor: 'bg-yellow-500', category: 'ui-graphics' },
    ],

    'ui-components': [
        { name: 'Bit', href:"https://bit.dev/components", desc:'Provides a huge library of reusable UI components for React, Angular, Vue, and React Native. Also enables sharing components among team members.', bgColor: 'bg-pink-600', category: 'ui-components' },
        { name: 'UILang', href:"http://uilang.com/", desc:'A minimal, UI-focused programming language for web designers.', bgColor: 'bg-purple-600', category: 'ui-components' },
        { name: 'Medialoot CSS Components', href:"https://medialoot.com/free-themes/css-components/", desc:'Calendars, price grids, and other UI components.', bgColor: 'bg-yellow-500', category: 'ui-components' },
        { name: 'Froala Design Blocks', href:"https://froala.com/design-blocks", desc:'Over 170 responsive design blocks ready to use in your web or mobile apps.', bgColor: 'bg-green-500', category: 'ui-components' },
        { name: 'Flowbite', href:"https://flowbite.com", desc:'Open-source library of Tailwind CSS components.', bgColor: 'bg-orange-500', category: 'ui-components' },
        { name: 'daisyUI', href:"https://daisyui.com/", desc:'Tailwind CSS components made simple and customizable.', bgColor: 'bg-blue-500', category: 'ui-components' },
        { name: 'Mui Treasury', href:"https://mui-treasury.com", desc:'A collection of ready-to-use components based on Material-UI.', bgColor: 'bg-cyan-500', category: 'ui-components' },
        { name: 'Material Design for Bootstrap', href:"https://fezvrasta.github.io/bootstrap-material-design/", desc:'Open-source toolkit for building Material Design with Bootstrap.', bgColor: 'bg-sky-500', category: 'ui-components' },
        { name: 'Photonkit', href:"http://photonkit.com/", desc:'Desktop UI library for Electron.', bgColor: 'bg-amber-500', category: 'ui-components' },
        { name: 'Flat UI', href:"https://designmodo.github.io/Flat-UI/", desc:'Minimal free user interface kit.', bgColor: 'bg-red-500', category: 'ui-components' },
        { name: 'Shards', href:"https://designrevision.com/downloads/shards/", desc:'A free and modern UI toolkit for web makers based on Bootstrap.', bgColor: 'bg-emerald-500', category: 'ui-components' },
        { name: 'Themesberg', href:"https://themesberg.com/templates/free", desc:'Free and open-source templates, themes, and UI kits based on Bootstrap and React.', bgColor: 'bg-pink-500', category: 'ui-components' },
        { name: 'Creative Tim', href:"https://www.creative-tim.com/", desc:'UI libraries and kits for React, Vue, Angular, and Bootstrap.', bgColor: 'bg-purple-600', category: 'ui-components' },
        { name: 'Brumm Shadow Maker', href:"https://brumm.af/shadows", desc:'Online tool to generate realistic CSS shadows.', bgColor: 'bg-yellow-500', category: 'ui-components' },
        { name: 'AdminLTE', href:"https://adminlte.io/", desc:'Open-source admin dashboard and control panel theme.', bgColor: 'bg-green-500', category: 'ui-components' },
        { name: 'SpinKit', href:"https://tobiasahlin.com/spinkit/", desc:'Simple CSS spinners.', bgColor: 'bg-orange-500', category: 'ui-components' },
        { name: 'Epic Spinners', href:"https://epic-spinners.epicmax.co/", desc:'CSS spinners collection with Vue.js integration.', bgColor: 'bg-blue-500', category: 'ui-components' },
        { name: 'Loading.io', href:"https://loading.io/", desc:'Create simple animations, spinners, and progress bars online.', bgColor: 'bg-cyan-500', category: 'ui-components' },
        { name: 'Moving Letters', href:"https://tobiasahlin.com/moving-letters/", desc:'Animated text using JavaScript and anime.js.', bgColor: 'bg-sky-500', category: 'ui-components' },
        { name: 'CSS Layout', href:"https://csslayout.io/", desc:'Collection of popular web layouts and patterns in pure CSS.', bgColor: 'bg-amber-500', category: 'ui-components' },
        { name: 'CSS Grid Generator', href:"https://cssgrid-generator.netlify.app/", desc:'Tool to quickly create dynamic layouts using CSS Grid.', bgColor: 'bg-red-500', category: 'ui-components' },
        { name: 'Codyhouse', href:"https://codyhouse.co/", desc:'Front-end framework and library of accessible HTML, CSS, and JS components.', bgColor: 'bg-emerald-500', category: 'ui-components' },
        { name: 'Tailwind Starter Kit', href:"https://github.com/creativetimofficial/tailwind-starter-kit", desc:'Free and open-source extension for Tailwind CSS.', bgColor: 'bg-pink-500', category: 'ui-components' },
        { name: 'Tailwind Toolbox', href:"https://www.tailwindtoolbox.com/", desc:'Starter templates, components, and plugins for Tailwind CSS projects.', bgColor: 'bg-purple-600', category: 'ui-components' },
        { name: 'Tailwind Components', href:"https://tailwindcomponents.com/", desc:'Community-driven repository of free Tailwind CSS components.', bgColor: 'bg-yellow-500', category: 'ui-components' },
        { name: 'SweetAlert', href:"https://sweetalert.js.org/", desc:'Makes popup messages beautiful and easy.', bgColor: 'bg-green-500', category: 'ui-components' },
        { name: 'SweetAlert2', href:"https://sweetalert2.github.io/", desc:'Customizable, accessible replacement for JavaScript alert boxes.', bgColor: 'bg-orange-500', category: 'ui-components' },
        { name: 'Tailblocks', href:"https://mertjf.github.io/tailblocks/", desc:'Ready-to-use Tailwind CSS components.', bgColor: 'bg-blue-500', category: 'ui-components' },
        { name: 'Soft Components', href:"https://soft-components-docs.web.app/", desc:'Framework-agnostic web components based on neumorphic design.', bgColor: 'bg-cyan-500', category: 'ui-components' },
        { name: 'Fast', href:"https://www.fast.design/", desc:'Interface system for React, Vue, Angular, and modern web frameworks.', bgColor: 'bg-amber-500', category: 'ui-components' },
        { name: 'LottieFiles', href:"https://lottiefiles.com/", desc:'Interactive animations in JSON, GIF, and MP4 formats, with libraries and plugins for web and mobile.', bgColor: 'bg-red-500', category: 'ui-components' },
        { name: 'Tailwindow', href:"https://component.tailwindow.com/", desc:'Customizable Tailwind CSS-based UI components.', bgColor: 'bg-emerald-500', category: 'ui-components' },
        { name: 'Kutty', href:"https://kutty.netlify.app/", desc:'Accessible, reusable prebuilt Tailwind CSS components for web apps.', bgColor: 'bg-pink-500', category: 'ui-components' },
        { name: 'Tailwind Templates', href:"https://tailwindtemplates.io/", desc:'Free Tailwind CSS templates for rapid UI development.', bgColor: 'bg-purple-600', category: 'ui-components' },
        { name: 'Stitches', href:"https://stitches.dev/", desc:'CSS-in-JS with near-zero runtime, SSR, and multi-variant support.', bgColor: 'bg-blue-500', category: 'ui-components' },
        { name: 'Headless UI', href:"https://headlessui.dev/", desc:'Unstyled, fully accessible UI components designed for Tailwind CSS.', bgColor: 'bg-cyan-500', category: 'ui-components' },
        { name: 'Styled Components', href:"https://styled-components.com/", desc:'Build beautiful UI components for your apps and websites.', bgColor: 'bg-sky-500', category: 'ui-components' },
        { name: 'Figma Bootstrap 5 UI Kit', href:"https://drive.google.com/file/d/1SZOTxXYfCMujqP2P684Vd5QIrlk5bwe6/view?usp=sharing", desc:'UI kit with 300+ organized Bootstrap 5 components built with atomic design system and auto layout.', bgColor: 'bg-amber-500', category: 'ui-components' },
        { name: 'Notiflix', href:"https://notiflix.github.io", desc:'JavaScript library for non-blocking notifications, popups, and loaders.', bgColor: 'bg-red-500', category: 'ui-components' },
        { name: 'CoreUI', href:"https://coreui.io", desc:'Bootstrap admin dashboard template and UI components library.', bgColor: 'bg-emerald-500', category: 'ui-components' },
        { name: 'AgnosticUI', href:"https://www.agnosticui.com/", desc:'Accessible UI primitives for React, Vue 3, Svelte, and Angular.', bgColor: 'bg-pink-500', category: 'ui-components' },
        { name: 'SVGR', href:"https://react-svgr.com/", desc:'Transform raw SVGs into ready-to-use React components via CLI, Node.js, or build plugins.', bgColor: 'bg-purple-600', category: 'ui-components' },
    ],

    'design-inspiration': [
        { name: 'Behance', href:"https://www.behance.net/", desc:'Design projects featured by different creators.', bgColor: 'bg-pink-600', category: 'design-inspiration' },
        { name: 'Dribbble', href:"https://dribbble.com/", desc:'Design projects featured by different creators.', bgColor: 'bg-purple-600', category: 'design-inspiration' },
        { name: 'Landingfolio', href:"https://landingfolio.com/", desc:'Landingfolio features the best landing page inspiration, templates, resources, and examples on the web.', bgColor: 'bg-yellow-500', category: 'design-inspiration' },
        { name: 'Codewell', href:"https://www.codewell.cc/", desc:'Practice your HTML, CSS, and JavaScript skills on real-world design templates.', bgColor: 'bg-green-500', category: 'design-inspiration' },
        { name: 'Foxyapps', href:"https://foxyapps.co/", desc:'Design inspiration from the best mobile app designs.', bgColor: 'bg-orange-500', category: 'design-inspiration' },
        { name: 'Httpster', href:"https://httpster.net/2020/apr/", desc:'Showcases websites made by people from all over the world.', bgColor: 'bg-blue-500', category: 'design-inspiration' },
        { name: 'Inspofinds', href:"https://inspofinds.com/", desc:'Latest design work from designers and the design community.', bgColor: 'bg-cyan-500', category: 'design-inspiration' },
        { name: 'Land Book', href:"https://land-book.com/", desc:'Displays a large collection of websites to help find inspiration.', bgColor: 'bg-sky-500', category: 'design-inspiration' },
        { name: 'Frontend Mentor', href:"https://www.frontendmentor.io/", desc:'Real-world UI challenges using HTML, CSS, and JavaScript.', bgColor: 'bg-amber-500', category: 'design-inspiration' },
        { name: 'Awwwards', href:"https://www.awwwards.com/", desc:'A website that rates and collects the best websites in the world for UI inspiration.', bgColor: 'bg-red-500', category: 'design-inspiration' },
        { name: 'SaaS Landing Page', href:"https://saaslandingpage.com/", desc:'Discover the best landing page examples created by top SaaS companies.', bgColor: 'bg-emerald-500', category: 'design-inspiration' },
        { name: 'Saaspages.xyz', href:"https://saaspages.xyz", desc:'A collection of the best landing pages focused on copywriting and design.', bgColor: 'bg-pink-500', category: 'design-inspiration' },
        { name: 'Screenlane', href:"https://screenlane.com", desc:'Website and newsletter featuring the latest web and mobile design inspiration.', bgColor: 'bg-purple-600', category: 'design-inspiration' },
        { name: 'Lapa Ninja', href:"https://www.lapa.ninja/", desc:'Best landing page inspiration.', bgColor: 'bg-yellow-500', category: 'design-inspiration' },
        { name: 'Freefrontend', href:"https://freefrontend.com/", desc:'Free frontend designs using CSS, HTML, and JavaScript.', bgColor: 'bg-green-500', category: 'design-inspiration' },
        { name: 'Webframe', href:"https://webframe.xyz", desc:'Discover and be inspired by beautiful web app designs.', bgColor: 'bg-orange-500', category: 'design-inspiration' },
        { name: 'Collect UI', href:"http://collectui.com/", desc:'Daily inspiration collected from the Daily UI archive and beyond.', bgColor: 'bg-blue-500', category: 'design-inspiration' },
        { name: 'Graphic Burger', href:"https://graphicburger.com/", desc:'Free and premium icons, mockups, UI kits, text effects, and backgrounds.', bgColor: 'bg-cyan-500', category: 'design-inspiration' },
        { name: 'Really Good Emails', href:"https://reallygoodemails.com/", desc:'Showcases company emails :  from customer service to marketing.', bgColor: 'bg-sky-500', category: 'design-inspiration' },
        { name: 'Free Design Resource', href:"https://freedesignresources.net/", desc:'Fonts, mockups, templates, graphics, and UI kits.', bgColor: 'bg-amber-500', category: 'design-inspiration' },
        { name: 'Site Inspire', href:"https://www.siteinspire.com/", desc:'Showcase of the finest web and interactive designs.', bgColor: 'bg-red-500', category: 'design-inspiration' },
        { name: 'Web Design Inspiration', href:"https://www.webdesign-inspiration.com/", desc:'Daily updated gallery of web design inspiration.', bgColor: 'bg-emerald-500', category: 'design-inspiration' },
        { name: 'NavNav', href:"https://navnav.co/", desc:'Responsive navigation examples for inspiration.', bgColor: 'bg-pink-500', category: 'design-inspiration' },
        { name: 'Calltoidea', href:"https://www.calltoidea.com/", desc:'Collection of web components for inspiration.', bgColor: 'bg-purple-600', category: 'design-inspiration' },
        { name: 'MediaQueri.es', href:"https://mediaqueri.es/", desc:'Collection of inspirational websites using media queries and responsive design.', bgColor: 'bg-yellow-500', category: 'design-inspiration' },
        { name: 'Muzli Search', href:"https://search.muz.li", desc:'Search engine for design inspiration.', bgColor: 'bg-green-500', category: 'design-inspiration' },
        { name: 'DeviantArt', href:"https://www.deviantart.com/", desc:'Access over 370 million pieces of art for inspiration.', bgColor: 'bg-orange-500', category: 'design-inspiration' },
        { name: 'Design Your Way', href:"https://www.designyourway.net/blog/web-and-mobile-design/", desc:'Collection of web and mobile design inspiration.', bgColor: 'bg-blue-500', category: 'design-inspiration' },
        { name: 'Humans.fyi', href:"https://humans.fyi/", desc:'Collection of personal websites filterable by color and technology.', bgColor: 'bg-cyan-500', category: 'design-inspiration' },
        { name: 'SiteSee', href:"https://sitesee.co/", desc:'Curated gallery of beautiful and modern websites.', bgColor: 'bg-amber-500', category: 'design-inspiration' },
        { name: 'UI Garage', href:"https://uigarage.net/", desc:'Daily handpicked UI inspiration and patterns.', bgColor: 'bg-red-500', category: 'design-inspiration' },
        { name: 'Ecomm Design', href:"https://ecomm.design/", desc:'eCommerce website design gallery and tech inspiration.', bgColor: 'bg-emerald-500', category: 'design-inspiration' },
        { name: 'Design Nominees', href:"https://www.designnominees.com/", desc:'Showcases and awards the best websites, apps, and games.', bgColor: 'bg-pink-500', category: 'design-inspiration' },
        { name: 'Design Vault', href:"https://designvault.io/", desc:'Library of screenshots and UI patterns from real-world digital products.', bgColor: 'bg-purple-600', category: 'design-inspiration' },
        { name: 'CSS Buttons', href:"https://getcssscan.com/css-buttons-examples", desc:'84 beautiful CSS button examples.', bgColor: 'bg-yellow-500', category: 'design-inspiration' },
        { name: 'CSS Box-Shadow', href:"https://getcssscan.com/css-box-shadow-examples", desc:'91 beautiful CSS box-shadow examples.', bgColor: 'bg-green-500', category: 'design-inspiration' },
        { name: 'Super Designer', href:"https://superdesigner.co", desc:'Design tools that give you superpowers.', bgColor: 'bg-orange-500', category: 'design-inspiration' },
    ],

    'design-software': [
        { name: 'GIMP', href:"https://www.gimp.org/", desc:'Free & open-source image editor similar to Photoshop.', bgColor: 'bg-pink-600', category: 'design-software' },
        { name: 'Gravit Designer', href:"https://www.designer.io/en/", desc:'Free full-featured vector graphic design app that works on all platforms.', bgColor: 'bg-purple-600', category: 'design-software' },
        { name: 'Blender', href:"https://www.blender.org/download/", desc:'Open-source and free 3D modeling, animation, and rendering software.', bgColor: 'bg-yellow-500', category: 'design-software' },
        { name: 'RawTherapee', href:"https://rawtherapee.com/", desc:'Cross-platform RAW image processing software.', bgColor: 'bg-green-500', category: 'design-software' },
        { name: 'BeFunky', href:"https://www.befunky.com/features/graphic-designer/", desc:'Online design and photo editing program.', bgColor: 'bg-orange-500', category: 'design-software' },
        { name: 'Krita', href:"https://krita.org/en/download/krita-desktop/", desc:'Professional sketching and painting program for digital artists.', bgColor: 'bg-blue-500', category: 'design-software' },
        { name: 'Pencil Project', href:"https://pencil.evolus.vn/", desc:'Open-source GUI prototyping software.', bgColor: 'bg-cyan-500', category: 'design-software' },
        { name: 'Inkscape', href:"https://inkscape.org/", desc:'Powerful and free vector graphic design tool.', bgColor: 'bg-sky-500', category: 'design-software' },
        { name: 'Adobe XD', href:"https://www.adobe.com/products/xd.html", desc:'Free design and prototyping tool from Adobe.', bgColor: 'bg-amber-500', category: 'design-software' },
        { name: 'Shape.so', href:"https://shape.so/pricing", desc:'Icon library that can be used as code directly in your projects.', bgColor: 'bg-red-500', category: 'design-software' },
        { name: 'Lunacy', href:"https://icons8.com/lunacy", desc:'Free graphic design software :  a Sketch alternative for Windows.', bgColor: 'bg-emerald-500', category: 'design-software' },
        { name: 'InVision Studio', href:"https://www.invisionapp.com/studio", desc:'Free screen design and prototyping tool from InVision.', bgColor: 'bg-pink-500', category: 'design-software' },
        { name: 'Darktable', href:"https://www.darktable.org/", desc:'Free & open-source photography workflow application and RAW developer.', bgColor: 'bg-purple-600', category: 'design-software' },
        { name: 'InPixio Photo Editor', href:"https://www.inpixio.com/free-photo-editor", desc:'Free photo editor for Windows.', bgColor: 'bg-yellow-500', category: 'design-software' },
        { name: 'Colorpicker', href:"https://colorpicker.fr", desc:'Open-source color management tool to retrieve, manipulate, and store colors easily.', bgColor: 'bg-green-500', category: 'design-software' },
        { name: 'Google Web Designer', href:"https://webdesigner.withgoogle.com/", desc:'Create engaging HTML5-based designs and motion graphics that run on any device.', bgColor: 'bg-orange-500', category: 'design-software' },
    ],

    'html-css-templates': [
        { name: 'HTML5Up', href:"https://html5up.net/", desc:'Modern and unique responsive HTML5/CSS3 themes.', bgColor: 'bg-pink-600', category: 'html-css-templates' },
        { name: 'Templatemo', href:"https://templatemo.com/", desc:'Minimal, resume, and gallery themes, plus more.', bgColor: 'bg-purple-600', category: 'html-css-templates' },
        { name: 'FreeHTML5', href:"https://freehtml5.co/", desc:'Free and premium HTML5 and Bootstrap themes.', bgColor: 'bg-yellow-500', category: 'html-css-templates' },
        { name: 'StyleShout', href:"https://www.styleshout.com/free-templates/", desc:'Beautifully crafted free website templates.', bgColor: 'bg-green-500', category: 'html-css-templates' },
        { name: 'Start Bootstrap', href:"https://startbootstrap.com/", desc:'Bootstrap starter themes and templates.', bgColor: 'bg-orange-500', category: 'html-css-templates' },
        { name: 'Zerotheme', href:"https://www.zerotheme.com/", desc:'HTML5, Bootstrap, and Prestashop templates.', bgColor: 'bg-blue-500', category: 'html-css-templates' },
        { name: 'HTML5xCSS3', href:"https://www.html5xcss3.com/", desc:'Collection of beautiful templates across multiple categories.', bgColor: 'bg-cyan-500', category: 'html-css-templates' },
        { name: 'Colorlib', href:"https://colorlib.com/wp/templates/", desc:'Huge selection of templates in nearly every category.', bgColor: 'bg-sky-500', category: 'html-css-templates' },
        { name: 'Free CSS', href:"https://www.free-css.com/free-css-templates", desc:'Large collection of free HTML and CSS templates.', bgColor: 'bg-amber-500', category: 'html-css-templates' },
        { name: 'HubSpot', href:"https://www.hubspot.com/resources", desc:'Templates, infographics, banners, and more.', bgColor: 'bg-red-500', category: 'html-css-templates' },
        { name: 'Mobirise', href:"https://mobirise.com/html-templates/", desc:'Modern and responsive HTML5/CSS3 templates.', bgColor: 'bg-emerald-500', category: 'html-css-templates' },
        { name: 'Bootswatch', href:"https://bootswatch.com/", desc:'Free themes for Bootstrap.', bgColor: 'bg-pink-500', category: 'html-css-templates' },
        { name: 'One Page Love', href:"https://onepagelove.com/", desc:'Curated collection of one-page websites, templates, and resources.', bgColor: 'bg-purple-600', category: 'html-css-templates' },
        { name: 'Themes For App', href:"https://themesfor.app/", desc:'Free Bootstrap themes and landing page templates.', bgColor: 'bg-yellow-500', category: 'html-css-templates' },
        { name: 'BootstrapTaste', href:"https://bootstraptaste.com/", desc:'Premium and free Bootstrap templates.', bgColor: 'bg-green-500', category: 'html-css-templates' },
        { name: 'BootstrapMade', href:"https://bootstrapmade.com/", desc:'Elegant and clean free templates built with Bootstrap.', bgColor: 'bg-orange-500', category: 'html-css-templates' },
        { name: 'W3Layouts', href:"https://w3layouts.com/", desc:'Over 3,700 free website templates for various industries.', bgColor: 'bg-blue-500', category: 'html-css-templates' },
        { name: 'Tooplate', href:"https://www.tooplate.com/", desc:'Free HTML templates for everyone.', bgColor: 'bg-cyan-500', category: 'html-css-templates' },
        { name: 'Cruip', href:"https://cruip.com/free-templates/", desc:'Fully coded HTML templates for startups and landing pages.', bgColor: 'bg-sky-500', category: 'html-css-templates' },
        { name: 'UIdeck', href:"https://uideck.com/", desc:'Free landing page templates and Bootstrap themes.', bgColor: 'bg-amber-500', category: 'html-css-templates' },
        { name: 'Splawr', href:"https://splawr.com/", desc:'Free web templates to kickstart your ideas.', bgColor: 'bg-red-500', category: 'html-css-templates' },
        { name: 'W3.CSS Templates', href:"https://www.w3schools.com/w3css/w3css_templates.asp", desc:'Responsive website templates built with W3.CSS.', bgColor: 'bg-emerald-500', category: 'html-css-templates' },
        { name: 'All Free Download', href:"https://all-free-download.com/free-website-templates/free-html-css-templates.html", desc:'Download free website templates and themes.', bgColor: 'bg-pink-500', category: 'html-css-templates' },
        { name: 'Mashup Template', href:"http://www.mashup-template.com/templates.html", desc:'Free HTML5/CSS3 templates.', bgColor: 'bg-purple-600', category: 'html-css-templates' },
        { name: 'Sneat Bootstrap 5 HTML Admin Template', href:"https://github.com/themeselection/sneat-html-admin-template-free", desc:'Open-source and easy-to-use Bootstrap 5 admin template with elegant design and unique layout.', bgColor: 'bg-yellow-500', category: 'html-css-templates' },
    ],

    'icon-fonts': [
        { name: 'Font Awesome', href:"https://fontawesome.com/", desc:"The web's most popular icon set and toolkit.", bgColor: 'bg-pink-600', category: 'icon-fonts' },
        { name: 'Line Awesome', href:"https://icons8.com/line-awesome", desc:'Drop-in replacement for Font Awesome with modern line icons.', bgColor: 'bg-purple-600', category: 'icon-fonts' },
        { name: 'Material Icons', href:"https://material.io/resources/icons/", desc:'Official Material Design icon library.', bgColor: 'bg-yellow-500', category: 'icon-fonts' },
        { name: 'Ionicons', href:"http://ionicons.com/", desc:'Beautifully crafted open-source icons from the Ionic team.', bgColor: 'bg-green-500', category: 'icon-fonts' },
        { name: 'Zurb Foundation Icons', href:"https://zurb.com/playground/foundation-icon-fonts-3", desc:'Customizable icon font set for Foundation.', bgColor: 'bg-orange-500', category: 'icon-fonts' },
        { name: 'Fontisto Icons', href:"https://fontisto.com/", desc:'Iconic font and CSS toolkit with 600+ free icons.', bgColor: 'bg-blue-500', category: 'icon-fonts' },
        { name: 'Boxicons', href:"https://boxicons.com/", desc:'Free collection of carefully crafted open-source icons.', bgColor: 'bg-cyan-500', category: 'icon-fonts' },
        { name: 'IcoFont', href:"https://icofont.com/", desc:'Over 2100 free icons to enhance your creative designs.', bgColor: 'bg-sky-500', category: 'icon-fonts' },
        { name: 'Material Palette', href:"https://www.materialpalette.com/icons", desc:'Pick palettes, icons, and colors for Material Design projects.', bgColor: 'bg-amber-500', category: 'icon-fonts' },
        { name: 'Material Design Iconic Font', href:"http://zavoloklom.github.io/material-design-iconic-font/index.html", desc:'Material Design-inspired icon font.', bgColor: 'bg-red-500', category: 'icon-fonts' },
        { name: 'VSCode Codicons', href:"https://microsoft.github.io/vscode-codicons/dist/codicon.html", desc:'The official icon font used by Visual Studio Code.', bgColor: 'bg-emerald-500', category: 'icon-fonts' },
        { name: 'Devicon', href:"https://devicon.dev", desc:'Set of icons representing programming languages and development tools.', bgColor: 'bg-pink-500', category: 'icon-fonts' },
        { name: 'PaymentFont', href:"https://github.com/AlexanderPoellmann/PaymentFont", desc:'Sleek web font for payment operators and methods with 100+ icons.', bgColor: 'bg-purple-600', category: 'icon-fonts' },
        { name: 'Weather Icons', href:"https://erikflowers.github.io/weather-icons/", desc:'Icon font with over 220 weather-themed icons.', bgColor: 'bg-yellow-500', category: 'icon-fonts' },
        { name: 'Stroke 7', href:"https://themes-pixeden.com/font-demos/7-stroke/index.html", desc:'202 thin stroke icons inspired by iOS 7.', bgColor: 'bg-green-500', category: 'icon-fonts' },
        { name: 'Jam Icons', href:"https://jam-icons.com/", desc:'Set of 890+ handcrafted icons for web applications.', bgColor: 'bg-orange-500', category: 'icon-fonts' },
        { name: 'Fontello', href:"http://fontello.com/", desc:'Over 200 web icons with customizable names and codes.', bgColor: 'bg-blue-500', category: 'icon-fonts' },
        { name: 'Linea', href:"https://linea.io/", desc:'Icon pack featuring 750+ free line icons.', bgColor: 'bg-cyan-500', category: 'icon-fonts' },
        { name: 'Unicons', href:"https://iconscout.com/unicons", desc:'1100+ free line-style icons available as web font, SVG, and React/Vue components.', bgColor: 'bg-sky-500', category: 'icon-fonts' },
        { name: 'Mobirise Icons', href:"https://mobiriseicons.com/", desc:'Free, open-source set of 150 pixel-perfect linear icons available as font and SVG.', bgColor: 'bg-amber-500', category: 'icon-fonts' },
        { name: 'Hero Icons', href:"https://heroicons.dev/", desc:'Free open-source SVG icon library for web projects.', bgColor: 'bg-red-500', category: 'icon-fonts' },
    ],

    'sound-effects': [
        { name: 'Free Stock Music', href:"https://www.free-stock-music.com/", desc:'Royalty-free stock music for YouTube videos, podcasts, and more.', bgColor: 'bg-pink-600', category: 'sound-effects' },
        { name: 'Bensound', href:"https://www.bensound.com/", desc:'Download royalty-free music to use freely in your projects.', bgColor: 'bg-purple-600', category: 'sound-effects' },
        { name: 'Mixkit', href:"https://mixkit.co/free-stock-music/", desc:'Free high-quality music tracks for creative projects.', bgColor: 'bg-yellow-500', category: 'sound-effects' },
        { name: 'Freesound', href:"https://freesound.org/", desc:'Collaborative database of free stock music and sound effects.', bgColor: 'bg-green-500', category: 'sound-effects' },
        { name: 'Free Music Archive', href:"https://freemusicarchive.org/", desc:'Collaborative library of Creative Commons–licensed sound for musicians and creators.', bgColor: 'bg-orange-500', category: 'sound-effects' },
        { name: 'Pixabay Music', href:"https://pixabay.com/music/", desc:'Free music downloads for YouTube videos, vlogs, films, and podcasts.', bgColor: 'bg-blue-500', category: 'sound-effects' },
        { name: 'Unminus', href:"https://www.unminus.com/", desc:'Free premium-quality music for personal and commercial projects.', bgColor: 'bg-cyan-500', category: 'sound-effects' },
    ],

    'others': [
        { name: 'Vertopal', href:"https://www.vertopal.com/", desc:'Free online platform for converting computer files into various formats.', bgColor: 'bg-pink-600', category: 'others' },
        { name: 'Everysize Kibalabs', href:"https://everysize.kibalabs.com/", desc:'Check how your responsive webpage looks on different screen sizes.', bgColor: 'bg-purple-600', category: 'others' },
        { name: 'Devhints', href:"https://devhints.io/", desc:'A modest but extremely useful collection of developer cheatsheets.', bgColor: 'bg-yellow-500', category: 'others' },
        { name: 'The Web Toolbox', href:"https://thewebtoolbox.cc/", desc:'A collection of handy, free-to-use tools for web developers and designers.', bgColor: 'bg-green-500', category: 'others' },
        { name: 'WebDevTrick', href:"https://webdevtrick.com/", desc:'Blog showcasing creative HTML, CSS, and jQuery designs.', bgColor: 'bg-orange-500', category: 'others' },
        { name: 'CSS-Tricks', href:"https://css-tricks.com/", desc:'Free CSS tricks, guides, and unique ideas for beginners and experts.', bgColor: 'bg-blue-500', category: 'others' },
        { name: 'Material Design Resources', href:"https://material.io/resources", desc:'Material tools, downloads, and interactive projects to simplify your workflow.', bgColor: 'bg-cyan-500', category: 'others' },
        { name: 'Nodesign', href:"https://nodesign.dev", desc:'A collection of tools for developers with little or no artistic talent.', bgColor: 'bg-sky-500', category: 'others' },
        { name: 'A11ygator', href:"https://a11ygator.chialab.io/", desc:'Web tool to scan websites against WCAG accessibility rules.', bgColor: 'bg-amber-500', category: 'others' },
        { name: 'Commitizen', href:"http://commitizen.github.io/cz-cli/", desc:'CLI tool for creating standardized commit messages.', bgColor: 'bg-red-500', category: 'others' },
        { name: 'CleanCSS', href:"https://www.cleancss.com/", desc:'Formatter, minifier, and converter for HTML, CSS, and JS.', bgColor: 'bg-emerald-500', category: 'others' },
        { name: 'Tiny Helpers', href:"https://tiny-helpers.dev/", desc:'Collection of single-purpose online tools for web developers.', bgColor: 'bg-pink-500', category: 'others' },
        { name: 'CSS Ribbon Generator', href:"https://www.cssportal.com/css-ribbon-generator/", desc:'Generator to create pure CSS corner ribbons.', bgColor: 'bg-purple-600', category: 'others' },
        { name: 'Can I Use', href:"https://caniuse.com/", desc:'Check cross-browser compatibility for frontend technologies.', bgColor: 'bg-yellow-500', category: 'others' },
        { name: 'Kangax', href:"https://kangax.github.io/compat-table/es6/", desc:'Compare JavaScript version compatibility across platforms and runtimes.', bgColor: 'bg-green-500', category: 'others' },
        { name: 'MyDevice', href:"https://www.mydevice.io/", desc:'Database of common device resolutions including phones and tablets.', bgColor: 'bg-orange-500', category: 'others' },
        { name: 'CodePen', href:"https://codepen.io/", desc:'Online playground for building, testing, and sharing frontend code.', bgColor: 'bg-blue-500', category: 'others' },
        { name: 'Responsively', href:"https://responsively.app", desc:'Tool for designing and debugging responsive websites across devices.', bgColor: 'bg-cyan-500', category: 'others' },
        { name: 'Html2pdf', href:"https://ekoopmans.github.io/html2pdf.js/", desc:'Client-side HTML-to-PDF rendering with pure JavaScript.', bgColor: 'bg-sky-500', category: 'others' },
        { name: 'CSS Reference', href:"https://cssreference.io/", desc:'Visual reference for all CSS properties and their syntax.', bgColor: 'bg-amber-500', category: 'others' },
        { name: 'Critical Path CSS Generator', href:"https://www.sitelocity.com/critical-path-css-generator", desc:'Generate optimized critical CSS for your webpages.', bgColor: 'bg-red-500', category: 'others' },
        { name: 'SVG Gobbler', href:"https://github.com/rossmoody/svg-gobbler", desc:'Browser extension to find and export SVGs from webpages.', bgColor: 'bg-emerald-500', category: 'others' },
        { name: 'Shortcode', href:"https://shortcode.dev", desc:'Collection of useful code snippets for HTML, CSS, JS, and more.', bgColor: 'bg-pink-500', category: 'others' },
        { name: 'PlayCode', href:"https://playcode.io/", desc:'Online JavaScript playground for rapid testing.', bgColor: 'bg-purple-600', category: 'others' },
        { name: 'All The Tags', href:"https://allthetags.com/", desc:'Comprehensive reference for all HTML tags.', bgColor: 'bg-yellow-500', category: 'others' },
        { name: 'Vue Telemetry', href:"https://vuetelemetry.com/", desc:'Explore Vue.js technology stacks used across real websites.', bgColor: 'bg-green-500', category: 'others' },
        { name: 'Grid.js', href:"https://gridjs.io/", desc:'Free, open-source HTML table plugin for modern JS frameworks.', bgColor: 'bg-orange-500', category: 'others' },
        { name: 'Gerillass', href:"https://gerillass.com/", desc:'Sass-based library providing mixins and tools for scalable CSS.', bgColor: 'bg-blue-500', category: 'others' },
        { name: 'Sketchize', href:"https://www.sketchize.com/", desc:'Printable wireframe templates for UI/UX designers.', bgColor: 'bg-cyan-500', category: 'others' },
        { name: '{CSS}Portal', href:"https://www.cssportal.com/", desc:'Large collection of CSS generators, tools, and resources.', bgColor: 'bg-amber-500', category: 'others' },
        { name: 'DevDocs', href:"https://devdocs.io/", desc:'Unified, fast, and searchable interface for multiple API documentations.', bgColor: 'bg-red-500', category: 'others' },
        { name: 'Papersizes', href:"https://papersizes.io/", desc:'Resource for international paper sizes, dimensions, and formats.', bgColor: 'bg-emerald-500', category: 'others' },
        { name: 'Flexbox Froggy', href:"http://flexboxfroggy.com/", desc:'Learn CSS Flexbox interactively by helping Froggy and friends!', bgColor: 'bg-pink-500', category: 'others' },
        { name: 'DesignBetter Books', href:"https://www.designbetter.co/books", desc:'Essential reads on design practices used by top design teams.', bgColor: 'bg-purple-600', category: 'others' },
        { name: 'OverAPI', href:"https://overapi.com/", desc:'Comprehensive collection of developer cheat sheets.', bgColor: 'bg-yellow-500', category: 'others' },
        { name: 'Pageclip', href:"https://pageclip.co/", desc:'Server backend for static HTML forms :  simple and easy to use.', bgColor: 'bg-green-500', category: 'others' },
        { name: 'Shields.io', href:"https://shields.io", desc:'Create custom badges for GitHub, npm, and other projects.', bgColor: 'bg-orange-500', category: 'others' },
        { name: 'WilliamSharkey', href:"http://williamsharkey.com/Shapes.html", desc:'Random SVG graphic generator.', bgColor: 'bg-blue-500', category: 'others' },
        { name: 'Bootstrap CheatSheet', href:"https://bootstrap-cheatsheet.themeselection.com/", desc:'Interactive list of Bootstrap classes, variables, and mixins.', bgColor: 'bg-cyan-500', category: 'others' },
        { name: 'QR Code Generator', href:"https://markodenic.com/tools/qr-code-generator/", desc:'Easily create QR codes for projects and websites.', bgColor: 'bg-sky-500', category: 'others' },
        { name: 'PapersDB', href:"https://papersdb.com/", desc:'Comprehensive paper size and dimension database (metric & imperial).', bgColor: 'bg-amber-500', category: 'others' },
        { name: 'SmallDev', href:"https://smalldev.tools/", desc:'Free developer tools for minifying, beautifying, and optimizing code.', bgColor: 'bg-red-500', category: 'others' },
        { name: 'Angry Tools', href:"https://angrytools.com/", desc:'Free web tools to speed up your development process.', bgColor: 'bg-emerald-500', category: 'others' },
        { name: 'RapidAPI', href:"https://rapidapi.com/hub", desc:'Discover and connect to thousands of APIs.', bgColor: 'bg-pink-500', category: 'others' },
        { name: 'Readme.so', href:"https://readme.so", desc:'The easiest way to create a professional README file.', bgColor: 'bg-purple-600', category: 'others' },
        { name: 'Showcode', href:"https://showcode.app", desc:'Generate beautiful screenshots of your code.', bgColor: 'bg-pink-600', category: 'others' },
        { name: 'Tldraw', href:"https://www.tldraw.com", desc:'Tiny and intuitive online drawing app.', bgColor: 'bg-purple-600', category: 'others' },
        { name: 'Devices.css', href:"http://marvelapp.github.io/devices.css/", desc:'Pure CSS phones and tablets for mockups by Marvel App.', bgColor: 'bg-yellow-500', category: 'others' },
        { name: 'Troopl', href:"https://troopl.com", desc:'Build and publish your portfolio in minutes.', bgColor: 'bg-green-500', category: 'others' },
    ],

}

// ============================================================================
// EXTERNAL APIs DATA
// ============================================================================


// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get all resources for a specific category
 */
export function getResourcesByCategory(category: ResourceCategory): ExternalResource[] {
    return externalResources[category] || []
}

/**
 * Get total count of all resources
 */
export function getTotalResourcesCount(): number {
    return Object.values(externalResources).reduce((sum, arr) => sum + arr.length, 0)
}

/**
 * Search resources by name or description
 */
export function searchResources(query: string): ExternalResource[] {
    const lowerQuery = query.toLowerCase()
    const results: ExternalResource[] = []

    Object.values(externalResources).forEach((categoryResources) => {
        categoryResources.forEach((resource) => {
            if (
                resource.name.toLowerCase().includes(lowerQuery) ||
                resource.desc.toLowerCase().includes(lowerQuery)
            ) {
                results.push(resource)
            }
        })
    })

    return results
}
