import React from 'react'
import {
  Authenticator,
  ThemeProvider,
  useTheme,
  View,
} from '@aws-amplify/ui-react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Button } from 'flowbite-react'

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
    let navigate = useNavigate()
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

    const deleteAllCookies = () => {
      const allCookies = Cookies.get()
      for (let cookieName in allCookies) {
        if (allCookies.hasOwnProperty(cookieName)) {
          Cookies.remove(cookieName)
        }
      }
    }

    return (
      <ThemeProvider theme={theme}>
        <Authenticator socialProviders={['google']} components={components}>
          {({ signOut, user }) => (
            <div>
              <nav>
                <Link to="/">Landing</Link>
                <Link to="/home">Home</Link>
                <Button
                  onClick={async (e) => {
                    e.preventDefault()
                    // using setTimeout here because of this issue: https://github.com/aws-amplify/amplify-js/issues/10198#issuecomment-1213384095
                    setTimeout(async () => {
                      try {
                        console.log('signing out!')
                        await signOut() // Wait for signOut to complete
                        localStorage.clear()
                        deleteAllCookies()
                        console.log('sign out complete')
                        await navigate('/') // Then navigate to home page
                        console.log('navigate to home page')
                      } catch (error) {
                        console.error('Error signing out: ', error)
                      }
                    })
                  }}
                  className="border-pretty-green border-solid border-2 text-black bg-white hover:bg-light-green active:bg-dark-green rounded-xl px-4 py-2 font-ubuntu font-medium"
                >
                  Sign Out
                </Button>
              </nav>
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
