import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { Button, Navbar } from 'flowbite-react'
import { Auth } from 'aws-amplify'
import { STATIC_ROOT } from '../../constants'

function NavBar({ onLoginClick }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    Auth.currentAuthenticatedUser()
        .then((currentUser) => {
          setUser(currentUser)
        })
        .catch(() => {
          setUser(null)
        })
  }, [])

  const deleteAllCookies = () => {
    const allCookies = Cookies.get()
    for (let cookieName in allCookies) {
      if (allCookies.hasOwnProperty(cookieName)) {
        Cookies.remove(cookieName)
      }
    }
  }

  const handleSignOut = async (e) => {
    e.preventDefault()
    // using setTimeout here because of this issue: https://github.com/aws-amplify/amplify-js/issues/10198#issuecomment-1213384095
    setTimeout(async () => {
      try {
        console.log('signing out!')
        await Auth.signOut()
        localStorage.clear()
        deleteAllCookies()
        console.log('sign out complete')
        window.location.href = '/'
        console.log('navigate to home page')
      } catch (error) {
        console.error('Error signing out: ', error)
      }
    })
  }

  return (
      <header>
        <Navbar fluid rounded>
          <Navbar.Brand href="/">
            <img
                src={`${STATIC_ROOT}/title_logo.svg`}
                className="mr-3 h-6 sm:h-9"
                alt="PhotoPacks.AI Logo"
            />
          </Navbar.Brand>
          <div className="flex md:order-2">
            {user ? (
                <>
                  <Button pill color="info" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                </>
            ) : (
                <>
                  <Button pill color="gray" onClick={() => onLoginClick('signIn')}>
                    Log in
                  </Button>
                  <Button
                      pill
                      color="info"
                      className="hidden md:block md:ml-4"
                      onClick={() => onLoginClick('signUp')}
                  >
                    Get started
                  </Button>
                </>
            )}
            <Navbar.Toggle />
          </div>
          <Navbar.Collapse>
            <Navbar.Link
                active
                href="/packs"
                className="bg-transparent text-primary-700"
            >
              Packs
            </Navbar.Link>
            {user && (
                <Navbar.Link
                    active
                    href="/orders"
                    className="bg-transparent text-primary-700"
                >
                  Orders
                </Navbar.Link>
            )}
          </Navbar.Collapse>
        </Navbar>
      </header>
  )
}

export default NavBar
