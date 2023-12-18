import React from 'react'
import { useParams } from 'react-router-dom'
import withAuthenticatedLayout from '../components/hoc/withAuthenticatedLayout'

function OrderDetails() {
  let { id } = useParams()

  return (
    <div>
      <h1>Order Details</h1>
      <h2>Order ID: {id}</h2>
    </div>
  )
}

export default withAuthenticatedLayout(OrderDetails, false)
