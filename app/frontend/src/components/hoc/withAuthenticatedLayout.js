import React from 'react'
import {
  Authenticator,
  ThemeProvider,
  useTheme,
  View,
} from '@aws-amplify/ui-react'
import LoggedInNavBar from '../NavBar/LoggedInNavBar'

const withAuthenticatedLayout = (Component) => {
  const components = {
    Header() {
      const { tokens } = useTheme()

      return (
        <View textAlign="center" padding={tokens.space.large}>
          <img alt="Mimic logo" src="/images/mimic_logo_primary.png" />
          <div className="my-6 bg-red-50 border border-red-300 text-red-600 px-4 py-2 ">
            Mimic is currently invite only. Please contact support@mimic.art for
            more information!
          </div>
        </View>
      )
    },
  }

  const Layout = ({ ...props }) => {
    const { tokens } = useTheme()

    const theme = {
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

    return (
      <ThemeProvider theme={theme}>
        <Authenticator socialProviders={['google']} components={components}>
          {({ signOut, user }) => (
            <div>
              <LoggedInNavBar signOut={signOut} />
              <Component user={user} {...props} />
            </div>
          )}
        </Authenticator>
      </ThemeProvider>
    )
  }
  return Layout
}

export default withAuthenticatedLayout
