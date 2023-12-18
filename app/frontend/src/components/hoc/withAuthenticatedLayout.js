import React, { useEffect, useState } from 'react'
import {
  Authenticator,
  ThemeProvider,
  useTheme,
  View,
} from '@aws-amplify/ui-react'
import { Auth, Hub } from 'aws-amplify'
import NavBar from '../NavBar/NavBar'
import getTheme from './authenticationTheme'

const withAuthenticatedLayout = (Component, bypassAuth = false) => {
  const components = {
    Header() {
      const { tokens } = useTheme()

      return (
        <View textAlign="center" padding={tokens.space.large}>
          <img alt="PhotoPacks.AI logo" src="/images/mimic_logo_primary.png" />
        </View>
      )
    },
  }

  const Layout = ({ ...props }) => {
    const [user, setUser] = useState(null)
    const [isAuthRequired, setIsAuthRequired] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const { tokens } = useTheme()
    const theme = getTheme(tokens)

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
            <NavBar onLoginClick={triggerLogin} />
            <Component {...props} user={user} />
          </div>
        </ThemeProvider>
      )
    }

    // Default behavior with authentication check
    return (
      <ThemeProvider theme={theme}>
        <Authenticator socialProviders={['google']} components={components}>
          {() => (
            <div>
              <NavBar onLoginClick={triggerLogin} />
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
