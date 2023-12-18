import React from 'react'
import { useParams } from 'react-router-dom'
import withAuthenticatedLayout from '../components/hoc/withAuthenticatedLayout'

function OrderDetails() {
  let { id } = useParams()

  console.log(id)

  return (
    <div>
      <h1>Order Details</h1>
    </div>
  )
}

export default withAuthenticatedLayout(OrderDetails, false)
