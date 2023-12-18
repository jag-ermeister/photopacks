import React from 'react'
import { Button, Navbar } from 'flowbite-react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

function LoggedInNavBar({ signOut }) {
  let navigate = useNavigate()

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
        await signOut() // Wait for signOut to complete
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
        <Navbar.Brand href="https://flowbite.com">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            PhotoPacks.AI
          </span>
        </Navbar.Brand>
        <div className="flex items-center gap-3 lg:order-2">
          <Button color="info" onClick={handleSignOut}>
            Sign Out
          </Button>
          <Navbar.Toggle theme={{ icon: 'h-5 w-5 shrink-0' }} />
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
          <Navbar.Link active href="/orders" className="rounded-lg">
            Orders
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}

export default LoggedInNavBar
