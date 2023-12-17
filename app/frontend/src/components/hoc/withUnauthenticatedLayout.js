import React from 'react'
import LoggedOutNavBar from '../NavBar/LoggedOutNavBar'

const withUnauthenticatedLayout = (Component) => {
  const WrappedComponent = ({ ...props }) => {
    return (
      <div>
        <LoggedOutNavBar />
        <div>
          <Component {...props} />
        </div>
      </div>
    )
  }
  return WrappedComponent
}

export default withUnauthenticatedLayout
