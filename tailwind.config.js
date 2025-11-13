/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app.vue',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './plugins/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      // Optimized system font stack for maximum performance and consistency
      fontFamily: {
        // Sans-serif: Modern system UI fonts
        sans: [
          // Modern system fonts (fastest, zero latency)
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          // Segoe UI for Windows
          '"Segoe UI"',
          // Roboto for Android
          'Roboto',
          // Helvetica/Arial fallbacks
          '"Helvetica Neue"',
          'Arial',
          // Emoji fonts for proper emoji rendering
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          // Final fallback
          'sans-serif',
        ],
        // Monospace: Optimized for code blocks and developer tools
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          '"SF Mono"',
          'Menlo',
          'Consolas',
          '"Liberation Mono"',
          '"Courier New"',
          'monospace',
        ],
      },
    },
  },
  plugins: [],
}


