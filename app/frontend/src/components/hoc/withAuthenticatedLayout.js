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
import BackendClient from '../../client/BackendClient'

const withAuthenticatedLayout = (Component, bypassAuth = false) => {
  const components = {
    Header() {
      const { tokens } = useTheme()

      return (
        <View textAlign="center" padding={tokens.space.large}>
          <img alt="PhotoPacks.AI logo" src={`${STATIC_ROOT}/title_logo.svg`} />
          <div className="my-6 bg-red-50 border border-red-300 text-red-600 px-4 py-2 ">
            PhotoPacks.AI is currently invite only.
          </div>
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
      const listener = async (data) => {
        switch (data.payload.event) {
          case 'signIn':
            // This is a hack to ensure the backend to a user-centered operation so that, for new users...
            // ...it creates the User model, and fires off welcome email if needed
            // I should instead have a function and API to GET/CREATE a user
            // Sign In ALWAYS occurs after Sign Up
            await BackendClient.getOrders()
            break
        }
      }

      Hub.listen('auth', listener)

      return () => {
        Hub.remove('auth', listener)
      }
    }, [])

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
