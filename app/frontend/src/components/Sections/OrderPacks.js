import React from 'react'
import OrderPackCard from '../Cards/OrderPackCard'

function OrderPacks({ orders }) {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-4">
        {orders.length > 0 &&
          orders.map((order) => (
            <OrderPackCard key={order.order_pack_id} order={order} />
          ))}
      </div>
    </section>
  )
}

export default OrderPacks
