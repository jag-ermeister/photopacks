import React from 'react'
import { useParams } from 'react-router-dom'

function PackDetails() {
  let { id } = useParams()

  // You can now use the `id` variable to fetch data or perform other actions
  console.log(id) // Logs the id from the URL

  return (
    <div>
      <h1>Pack Details</h1>
      <a
        href="/purchase"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Buy
      </a>
    </div>
  )
}

export default PackDetails
