const getTheme = (tokens) => {
  return {
    tokens: {
      colors: {
        background: {
          primary: {
            value: tokens.colors.white.value,
          },
          secondary: {
            value: '#fafafa', // inactive tab background
          },
        },
        font: {
          interactive: {
            value: '#EB5E99', // font color and bar above active tab
          },
        },
        brand: {
          primary: {
            10: '#ede6ff', // background on hover over forgot password
            80: '#EB5E99', // sign on button color inactive
            90: '#A8065D', // sign in button hover - actually on hover
            100: '#A8065D', // on click down sign on button - actually on hover?
          },
        },
      },
    },
  }
}

export default getTheme
