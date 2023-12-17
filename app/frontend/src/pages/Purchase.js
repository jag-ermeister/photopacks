import React from 'react'
import BackendClient from '../client/BackendClient'

function Purchase() {
  const handleButtonClick = async () => {
    try {
      await BackendClient.checkout()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h1>Purchase</h1>
      <button
        onClick={handleButtonClick}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Buy (Go to Stripe)
      </button>
    </div>
  )
}

export default Purchase
