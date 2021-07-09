const plugin = require('tailwindcss/plugin');

module.exports = {
    purge: ['./src/**/*.{js,ts,jsx,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: {
                    darkest: '#351d62',
                    dark: '#402376',
                    DEFAULT: '#4b2988',
                    light: '#552f9d',
                    lightest: '#6035b1',
                }
            },
            transitionDuration: {
                '2': '2s'
            },
            width: {
                '5/7': '71.4285714%',
            }
        },
        fontFamily: {
            'agenor-regular': ['Agenor-Regular', 'sans-serif'],
            'agenor-bold': ['Agenor-Bold', 'sans-serif'],
            'agenor-black': ['Agenor-Black', 'sans-serif'],
        }
    },
    variants: {
        extend: {
            opacity: ['input-checked'],
            position: ['input-checked']
        },
    },
    plugins: [
        plugin(({addVariant, e}) => {
            addVariant("input-checked", ({container}) => {
                container.walkRules((rule) => {
                    rule.selector = `:checked + .input-checked\\:${rule.selector.slice(1)}`;
                });
            });
        }),
        plugin(({addUtilities, theme}) => {
            const themeColors = theme('colors');
            const individualBorderColors = Object.keys(themeColors).map(colorName => ({
                [`.border-b-${colorName}`]: {
                    borderBottomColor: themeColors[colorName]
                },
                [`.border-t-${colorName}`]: {
                    borderTopColor: themeColors[colorName]
                },
                [`.border-l-${colorName}`]: {
                    borderLeftColor: themeColors[colorName]
                },
                [`.border-r-${colorName}`]: {
                    borderRightColor: themeColors[colorName]
                }
            }));
            addUtilities(individualBorderColors);
        })
    ],
}
