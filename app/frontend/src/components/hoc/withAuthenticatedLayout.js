import React, { useEffect, useState } from 'react'
import {
  Authenticator,
  ThemeProvider,
  useTheme,
  View,
} from '@aws-amplify/ui-react'
import { Auth, Hub } from 'aws-amplify'
import LoggedInNavBar from '../NavBar/LoggedInNavBar'
import LoggedOutNavBar from '../NavBar/LoggedOutNavBar'

const withAuthenticatedLayout = (Component, bypassAuth = false) => {
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
    const [user, setUser] = useState(null)
    const [isAuthRequired, setIsAuthRequired] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const triggerLogin = () => {
      setIsAuthRequired(true)
    }

    useEffect(() => {
      let unsubscribe

      if (!bypassAuth) {
        const checkUser = async () => {
          try {
            await Auth.currentAuthenticatedUser()
            setIsAuthRequired(false)
          } catch (error) {
            setIsAuthRequired(true)
          }
        }
        checkUser()
      }

      return () => {
        if (unsubscribe) unsubscribe()
      }
    }, [])

    useEffect(() => {
      const listener = (data) => {
        if (data.payload.event === 'signOut') {
          setIsAuthRequired(false)
        }
      }

      Hub.listen('auth', listener)
      return () => Hub.remove('auth', listener)
    }, [])

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

    useEffect(() => {
      Auth.currentAuthenticatedUser()
        .then((currentUser) => {
          setUser(currentUser)
          setIsLoading(false)
        })
        .catch(() => {
          setUser(null)
          setIsLoading(false)
        })
    }, [])

    if (isLoading) {
      return <div>Loading...</div>
    }

    if (bypassAuth && !isAuthRequired) {
      // Bypass authentication check for specific components
      return (
        <ThemeProvider theme={theme}>
          <div>
            {user ? (
              <LoggedInNavBar
                signOut={async () => {
                  await Auth.signOut()
                  window.location.href = '/'
                }}
              />
            ) : (
              <LoggedOutNavBar onLoginClick={triggerLogin} />
            )}
            <Component {...props} user={user} />
          </div>
        </ThemeProvider>
      )
    }

    // Default behavior with authentication check
    return (
      <ThemeProvider theme={theme}>
        <Authenticator socialProviders={['google']} components={components}>
          {({ signOut }) => (
            <div>
              <LoggedInNavBar signOut={signOut} />
              <Component {...props} user={user} />
            </div>
          )}
        </Authenticator>
      </ThemeProvider>
    )
  }
  return Layout
}

export default withAuthenticatedLayout
