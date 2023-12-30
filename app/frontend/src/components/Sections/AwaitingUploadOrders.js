import React from 'react'
import AwaitingUploadOrderCard from '../Cards/AwaitingUploadOrderCard'

function AwaitingUploadOrders({ orders }) {
  return (
    <div>
      {orders.map((order) => (
        <AwaitingUploadOrderCard key={order.order_pack_id} order={order} />
      ))}
    </div>
  )
}

export default AwaitingUploadOrders
