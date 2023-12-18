const getTheme = (tokens) => {
  return {
    tokens: {
      colors: {
        background: {
          primary: {
            value: tokens.colors.white.value,
          },
          secondary: {
            value: '#fafafa',
          },
        },
        font: {
          interactive: {
            value: '#4701FD',
          },
        },
        brand: {
          primary: {
            10: '#ede6ff', // background on hover over forgot password
            80: '#4701FD', // sign on button color inactive
            90: '#3301b2', // sign in button hover - actually on hover
            100: '#a480ff', // on click down sign on button - actually on hover?
          },
        },
      },
    },
  }
}

export default getTheme
