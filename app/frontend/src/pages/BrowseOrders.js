import React from 'react'
import { useOrders } from '../hooks/dataHooks'
import withAuthenticatedLayout from '../components/hoc/withAuthenticatedLayout'
import { Link } from 'react-router-dom'

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
            <Link to={`/orders/${order.id}`}>
              {order.id} - {order.subject_name} - {order.model_type}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default withAuthenticatedLayout(BrowseOrders, false)
