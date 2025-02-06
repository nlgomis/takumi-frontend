/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			shippori: [
  				'Shippori Mincho',
  				'serif'
  			]
  		},
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
  			darkbrown: '#423023'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".vertical-rl": {
          writingMode: "vertical-rl",
        },
      };
      addUtilities(newUtilities);
    },
      require("tailwindcss-animate")
],
};
