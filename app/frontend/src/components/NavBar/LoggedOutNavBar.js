import React from 'react'
import { Button, Navbar } from 'flowbite-react'

function LoggedOutNavBar() {
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
        <Button>Get started</Button>
        <Navbar.Toggle />
      </div>
    </Navbar>
  )
}

export default LoggedOutNavBar
