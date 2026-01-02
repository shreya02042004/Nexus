/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Deep Zen Backgrounds
                zen: {
                    bg: 'var(--zen-bg)',      // Deepest Charcoal (Requested)
                    surface: 'var(--zen-surface)', // Slightly lighter for cards
                    subtle: 'var(--zen-subtle)',  // For secondary elements
                    border: 'var(--zen-border)',  // Subtle borders (Requested)
                },
                // Text Colors
                txt: {
                    main: 'var(--txt-main)',      // Pure White (Requested)
                    muted: 'var(--txt-muted)',     // Muted gray for secondary text
                    dim: 'var(--txt-dim)',       // Very dim text
                },
                // Accents (Calming, Pro)
                accent: {
                    primary: '#E2E8F0',   // Slate 200 (High contrast white-ish)
                    secondary: '#94A3B8', // Slate 400
                    highlight: '#3B82F6', // Subtle Blue for active states (optional)
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'], // or just 'monospace' if not installed
            },
            borderRadius: {
                DEFAULT: '6px', // Pro-tool sharp (Requested)
                'sm': '4px',
                'md': '6px',
                'lg': '8px',
            },
            boxShadow: {
                'zen': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.15)',
                'glow': '0 0 15px rgba(255, 255, 255, 0.05)',
            }
        },
    },
    plugins: [],
}
