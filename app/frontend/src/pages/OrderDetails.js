import React from 'react'
import { useParams } from 'react-router-dom'

function OrderDetails() {
  let { id } = useParams()

  // You can now use the `id` variable to fetch data or perform other actions
  console.log(id) // Logs the id from the URL

  return (
    <div>
      <h1>Order Details</h1>
    </div>
  )
}

export default OrderDetails
