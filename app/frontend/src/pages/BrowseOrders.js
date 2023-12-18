import React from 'react'
import { useOrders } from '../hooks/dataHooks'

function BrowseOrders() {
  const { orders, isLoading, error } = useOrders()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h1>My Orders</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            {order.id} - {order.subject_name} - {order.model_type}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BrowseOrders
