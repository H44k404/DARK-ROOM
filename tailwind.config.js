/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Noto Sans Sinhala', 'Inter', 'sans-serif'],
            },
            colors: {
                primary: {
                    black: '#000000',
                    white: '#FFFFFF',
                    gray: {
                        50: '#FAFAFA',
                        100: '#F5F5F5',
                        200: '#E5E5E5',
                        300: '#D4D4D4',
                        400: '#A3A3A3',
                        500: '#737373',
                        600: '#525252',
                        700: '#404040',
                        800: '#262626',
                        900: '#171717',
                    }
                }
            },
            maxWidth: {
                '8xl': '88rem',
                '9xl': '96rem',
            },
            backdropBlur: {
                xs: '2px',
            },
            animation: {
                'marquee': 'marquee 30s linear infinite',
                'marquee-fast': 'marquee 20s linear infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
            },
        },
    },
    plugins: [],
}
