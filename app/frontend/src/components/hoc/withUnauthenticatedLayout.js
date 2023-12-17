import React from 'react'
import LoggedOutNavBar from '../NavBar/LoggedOutNavBar'
import Footer from '../Footer/Footer'

const withUnauthenticatedLayout = (Component) => {
  const WrappedComponent = ({ ...props }) => {
    return (
      <div>
        <LoggedOutNavBar />
        <div>
          <Component {...props} />
        </div>
        <Footer />
      </div>
    )
  }
  return WrappedComponent
}

export default withUnauthenticatedLayout
