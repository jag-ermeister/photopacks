import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Button, Navbar } from 'flowbite-react'
import { Auth } from 'aws-amplify'
import { STATIC_ROOT } from '../../constants'

function NavBar({ onLoginClick }) {
  let navigate = useNavigate()
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
        await navigate('/')
        console.log('navigate to home page')
      } catch (error) {
        console.error('Error signing out: ', error)
      }
    })
  }

  return (
    <header>
      <Navbar fluid>
        <Navbar.Brand href="/">
          <img
            src={`${STATIC_ROOT}/title_logo.svg`}
            className="mr-3 h-6 sm:h-9"
            alt="PhotoPacks.AI Logo"
          />
          {/*<span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">*/}
          {/*  PhotoPacks.AI*/}
          {/*</span>*/}
        </Navbar.Brand>
        <div className="flex items-center gap-3 lg:order-2">
          {user ? (
            <>
              <Button color="info" onClick={handleSignOut}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button pill color="gray" onClick={onLoginClick}>
                Log in
              </Button>
              <Button pill color="info">
                Get started
              </Button>
            </>
          )}
        </div>
        <Navbar.Collapse
          theme={{
            list: 'mt-4 flex flex-col lg:mt-0 lg:flex-row lg:space-x-8 lg:text-base lg:font-medium',
          }}
          className="lg:order-1"
        >
          <Navbar.Link active href="/packs" className="rounded-lg">
            Packs
          </Navbar.Link>
          {user && (
            <Navbar.Link active href="/orders" className="rounded-lg">
              Orders
            </Navbar.Link>
          )}
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}

export default NavBar
