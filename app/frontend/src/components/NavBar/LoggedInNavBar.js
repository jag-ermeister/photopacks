import React from 'react'
import { Button, Navbar } from 'flowbite-react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

function LoggedOutNavBar({ signOut }) {
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
        await navigate('/') // Then navigate to home page
        console.log('navigate to home page')
      } catch (error) {
        console.error('Error signing out: ', error)
      }
    })
  }

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com">
        <img
          src="/favicon.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Photo Packs Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          PhotoPacks.ai
        </span>
      </Navbar.Brand>

      <Navbar.Collapse>
        <Navbar.Link href="/home">Home</Navbar.Link>
        <Navbar.Link href="/">Landing</Navbar.Link>
      </Navbar.Collapse>
      <div className="flex md:order-2">
        <Button onClick={handleSignOut}>Sign Out</Button>
        <Navbar.Toggle />
      </div>
    </Navbar>
  )
}

export default LoggedOutNavBar
