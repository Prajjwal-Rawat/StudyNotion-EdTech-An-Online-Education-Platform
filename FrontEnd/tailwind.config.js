/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      "edu-sa": ["Edu SA Beginner", "cursive"],
      mono: ["Roboto Mono", "monospace"],
    },
    colors: {
      white: "#fff",
      black: "#000",
      transparent: "#ffffff00",
      richblack: {
        5: "#F1F2FF",
        25: "#DBDDEA",
        50: "#C5C7D4",
        100: "#AFB2BF",
        200: "#999DAA",
        300: "#838894",
        400: "#6E727F",
        500: "#585D69",
        600: "#424854",
        700: "#2C333F",
        800: "#161D29",
        900: "#000814",
      },
      green: {
        5: "#E8F5E9",  
        25: "#C8E6C9",   
        50: "#A5D6A7",  
        100: "#81C784", 
        200: "#66BB6A", 
        300: "#4CAF50", 
        400: "#43A047", 
        500: "#388E3C", 
        600: "#2E7D32", 
        700: "#1B5E20", 
        800: "#004D40", 
        900: "#00251A"  
      },
      
      richblue: {
        5: "#ECF5FF",
        25: "#C6D6E1",
        50: "#A0B7C3",
        100: "#7A98A6",
        200: "#537988",
        300: "#2D5A6A",
        400: "#073B4C",
        500: "#063544",
        600: "#042E3B",
        700: "#032833",
        800: "#01212A",
        900: "#001B22",
      },
      blue: {
        5: "#EAF5FF",
        25: "#B4DAEC",
        50: "#7EC0D9",
        100: "#47A5C5",
        200: "#118AB2",
        300: "#0F7A9D",
        400: "#0C6A87",
        500: "#0A5A72",
        600: "#074B5D",
        700: "#053B48",
        800: "#022B32",
        900: "#001B1D",
      },
      caribbeangreen: {
        5: "#C1FFFD",
        25: "#83F1DE",
        50: "#44E4BF",
        100: "#06D6A0",
        200: "#05BF8E",
        300: "#05A77B",
        400: "#049069",
        500: "#037957",
        600: "#026144",
        700: "#014A32",
        800: "#01321F",
        900: "#001B0D",
      },
      brown: {
        5: "#FFF4C4",
        25: "#FFE395",
        50: "#FFD166",
        100: "#E7BC5B",
        200: "#CFA64F",
        300: "#B89144",
        400: "#A07C39",
        500: "#88662D",
        600: "#705122",
        700: "#593C17",
        800: "#41260B",
        900: "#291100",
      },
      pink: {
        5: "#FFF1F1",
        25: "#FBC7D1",
        50: "#F79CB0",
        100: "#F37290",
        200: "#EF476F",
        300: "#D43D63",
        400: "#BA3356",
        500: "#9F294A",
        600: "#841E3E",
        700: "#691432",
        800: "#4F0A25",
        900: "#340019",
      },
      yellow: {
        5: "#FFF970",
        25: "#FFE83D",
        50: "#FFD60A",
        100: "#E7C009",
        200: "#CFAB08",
        300: "#B69507",
        400: "#9E8006",
        500: "#866A04",
        600: "#6E5503",
        700: "#553F02",
        800: "#3D2A01",
        900: "#251400",
      },
      red: {
        5: "#FFE5E5",
        25: "#FFBABA",
        50: "#FF8F8F",
        100: "#FF6363",
        200: "#FF3737",
        300: "#E62E2E",
        400: "#CC2626",
        500: "#B31D1D",
        600: "#991515",
        700: "#800C0C",
        800: "#660404",
        900: "#4D0000",
      },
      gray: {
        5: "#F9F9F9",
        25: "#E2E2E2",
        50: "#CCCCCC",
        100: "#B5B5B5",
        200: "#9E9E9E",
        300: "#888888",
        400: "#717171",
        500: "#5B5B5B",
        600: "#444444",
        700: "#2D2D2D",
        800: "#171717",
        900: "#141414",
      },
    },
    extend: {
      maxWidth: {
        maxContent: "1260px",
        maxContentTab: "650px"
      },
      screens: {
        md: '930px',
      },
      boxShadow: {
        'custom': '10px 10px 15px 0 rgba(255, 255, 255, 0.5)',
        'instructorShadow': '-10px -10px 5px 0 rgba(205, 255, 255, 0.5)',
        // Generic Shadows
        'soft': '2px 2px 6px rgba(0, 0, 0, 0.1)',
        'medium': '4px 4px 10px rgba(0, 0, 0, 0.2)',
        'hard': '6px 6px 15px rgba(0, 0, 0, 0.3)',

        // Blue Shadows
        'blue-light': '2px 2px 8px rgba(71, 165, 197, 0.5)',
        'blue-bold': '4px 4px 12px rgba(17, 138, 178, 0.8)',

        // Red Shadows
        'red-light': '2px 2px 8px rgba(239, 71, 111, 0.5)',
        'red-bold': '4px 4px 12px rgba(255, 55, 55, 0.8)',

        // Yellow Shadows
        'yellow-light': '2px 2px 8px rgba(255, 214, 10, 0.5)',
        'yellow-bold': '4px 4px 12px rgba(199, 171, 8, 0.8)',

        // Green Shadows
        'green-light': '2px 2px 8px rgba(6, 214, 160, 0.5)',
        'green-bold': '4px 4px 12px rgba(5, 159, 87, 0.8)',

        // Pink Shadows
        'pink-light': '2px 2px 8px rgba(255, 99, 177, 0.5)',
        'pink-bold': '4px 4px 12px rgba(199, 52, 125, 0.8)',

        // Brown Shadows
        'brown-light': '2px 2px 8px rgba(184, 145, 68, 0.5)',
        'brown-bold': '4px 4px 12px rgba(137, 102, 45, 0.8)',

        // Grey Shadows
        'grey-light': '2px 2px 8px rgba(88, 88, 88, 0.3)',
        'grey-bold': '4px 4px 12px rgba(44, 44, 44, 0.6)',

        // Custom Shiny Shadows
        'shiny-yellow': '2px 2px 10px rgba(255, 249, 112, 0.8)',
        'shiny-blue': '2px 2px 10px rgba(48, 207, 208, 0.8)',
        'shiny-pink': '2px 2px 10px rgba(255, 145, 230, 0.8)',

        // Multicolor Shadows
        'rainbow': '4px 4px 12px rgba(239, 71, 111, 0.4), -4px -4px 12px rgba(17, 138, 178, 0.4)',
      },
      backgroundImage: {
        'shiny-yellow-gradient': 'linear-gradient(-225deg, #231557 0%, #44107A 29%, #FF1361 67%, #FFF800 100%)',
        'shiny-blue-gradient': 'linear-gradient(to top, #30cfd0 0%, #330867 100%)',
        'red-gradient': 'linear-gradient(90deg, #FF8F8F, #FF3737)',
        'red-yellow-gradient': 'linear-gradient(to bottom right, #FF3737, #FFD60A)',
        // Blue gradients
        'blue-sky': 'linear-gradient(to right, #118AB2, #47A5C5, #7EC0D9)',
        'blue-night': 'linear-gradient(to bottom, #063544, #0C6A87, #47A5C5)',

        // Red gradients
        'red-fire': 'linear-gradient(90deg, #FF3737, #E62E2E, #FF8F8F)',
        'red-love': 'linear-gradient(to bottom right, #991515, #FF6363, #FFE5E5)',

        // Yellow gradients
        'yellow-sunrise': 'linear-gradient(120deg, #FFD60A, #E7C009, #FFE83D)',
        'yellow-golden': 'linear-gradient(to top, #CFAB08, #FFD60A, #FFF970)',

        // Green gradients
        'green-mint': 'linear-gradient(to right, #06D6A0, #44E4BF, #C1FFFD)',
        'green-forest': 'linear-gradient(to bottom, #014A32, #037957, #06D6A0)',

        // Pink gradients
        'pink-candy': 'linear-gradient(45deg, #EF476F, #F79CB0, #FFF1F1)',
        'pink-sunset': 'linear-gradient(to right, #691432, #EF476F, #FBC7D1)',

        // Brown gradients
        'brown-earth': 'linear-gradient(120deg, #593C17, #88662D, #FFF4C4)',
        'brown-caramel': 'linear-gradient(to bottom, #B89144, #FFD166, #FFE395)',

        // Pure Grey gradients
        'grey-silver': 'linear-gradient(to right, #5B5B5B, #CCCCCC, #F9F9F9)',
        'grey-charcoal': 'linear-gradient(to bottom, #171717, #2D2D2D, #5B5B5B)',

        // Blue-Purple
        'blue-purple': 'linear-gradient(to right, #30cfd0, #330867)',

        // Custom multicolor gradients
        'rainbow': 'linear-gradient(45deg, #FF3737, #FFD60A, #06D6A0, #118AB2, #EF476F)',
        'shiny-pastel': 'linear-gradient(to bottom right, #ECF5FF, #C6D6E1, #FFE5E5, #FFF970)',
      },
    },
  },
  plugins: [],
}

