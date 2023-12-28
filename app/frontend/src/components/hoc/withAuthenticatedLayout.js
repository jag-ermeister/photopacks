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
import Footer from '../Footer/Footer'
import { STATIC_ROOT } from '../../constants'
import styles from './AmplifyStyles.module.css'

const withAuthenticatedLayout = (Component, bypassAuth = false) => {
  const components = {
    Header() {
      const { tokens } = useTheme()

      return (
        <View textAlign="center" padding={tokens.space.large}>
          <img alt="PhotoPacks.AI logo" src={`${STATIC_ROOT}/title_logo.svg`} />
        </View>
      )
    },
  }

  const Layout = ({ ...props }) => {
    const [user, setUser] = useState(null)
    const [isAuthRequired, setIsAuthRequired] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [action, setAction] = useState(null)

    const { tokens } = useTheme()
    const theme = getTheme(tokens)

    const triggerLogin = (action) => {
      setAction(action)
      setIsAuthRequired(true)
    }

    useEffect(() => {
      let unsubscribe

      if (!bypassAuth) {
        const checkUser = async () => {
          try {
            await Auth.currentAuthenticatedUser()
            setIsAuthRequired(false)
            setAction(null)
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
          setAction(null)
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
            <Footer />
          </div>
        </ThemeProvider>
      )
    }

    // Default behavior with authentication check
    return (
      <ThemeProvider theme={theme}>
        <Authenticator
          initialState={action}
          socialProviders={['google']}
          components={components}
          className={styles.amplifyScoped}
        >
          {() => (
            <div>
              <NavBar onLoginClick={triggerLogin} />
              <Component {...props} user={user} />
              <Footer />
            </div>
          )}
        </Authenticator>
      </ThemeProvider>
    )
  }
  return Layout
}

export default withAuthenticatedLayout
