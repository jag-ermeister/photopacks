import React from 'react'
import { useOrders } from '../hooks/dataHooks'
import withAuthenticatedLayout from '../components/hoc/withAuthenticatedLayout'
import OrderPacks from '../components/PhotoPacks/OrderPacks'

function BrowseOrders() {
  const { orders, isLoading, error } = useOrders()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h1>My Orders</h1>
      <OrderPacks orders={orders} />
    </div>
  )
}

export default withAuthenticatedLayout(BrowseOrders, false)
