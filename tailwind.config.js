/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5A33E2",
        secondary: "#8A84E2", 
        light: "#AFAFDC",
        black: "#373737",
        beige: "#EEE5E9",
        pink: "#EED3F6",
        green: "#099D06",
        orange: "#FF9B04",
        gray: "#B9B9B9",
        green: "#86EC84",
        red: "#EE3430",
        violet:"#5A33E2",
      },
      backgroundImage: {
        "contact-page" : "linear-gradient(90deg, rgba(138, 132, 226, 0.8) 24.54%, rgba(55, 55, 55, 0.8) 79.56%), url(/images/contact-page-hero-bg.jpeg)",
        "login-bg": "linear-gradient(0deg, rgba(238, 211, 246, 0.8), rgba(238, 211, 246, 0.8)), url(/images/login-bg.jpeg)",
        "inscription-page" : "linear-gradient(180deg, #8A84E2 0%, #000000 100%)",
        "inscription-hotel": "url(/images/inscription-extra.jpeg)",
        "inscription-extra": "url(/images/inscription-hotel.jpeg)",
        "inscription-hotel-page": "linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(/images/hotel-registration-page.jpeg)",
        "inscription-extra-page": "linear-gradient(0deg, rgba(0, 0, 0, 0.20), rgba(0, 0, 0, 0.20)), url(/images/extra-registration-page.jpeg)",
      },
      boxShadow : {
        "inscription-card": "inset 0px 0px 15px 5px rgba(0, 0, 0, 0.25)",
        "normal": "0px 0px 10px 2px rgba(0, 0, 0, 0.25)",
        "profile-hotel": "0px 0px 10px 3px rgba(0, 0, 0, 0.25)",
        "rapport-details":" 0px 0px 6px 1px rgba(0, 0, 0, 0.25) inset"
      }
    },
    backgroundImage: {
      home_section_1: "linear-gradient(90deg, #8A84E2AA 24.54%, #37373700 79.56%), url('/home_section_1_image.jpg');",
      home_section_3: "linear-gradient(to bottom,pink 0%, pink 100px, paleturquoise 100px, paleturquoise 100%)",
      about_page_section_1: "linear-gradient(90deg, #8A84E2AA 24.54%, #37373700 79.56%), url('/about_page_section_1.jpg');",
      about_page_section_4: "linear-gradient(180deg, #EED3F6 0%, rgba(238, 211, 246, 0) 100%)",
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar-hide')

  ],
}
