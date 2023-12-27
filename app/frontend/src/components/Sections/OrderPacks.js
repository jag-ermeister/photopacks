import React from 'react'
import OrderPackCard from '../Cards/OrderPackCard'

function OrderPacks({ orders }) {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
        <div className="space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-3">
          {orders.map((order) => (
            <OrderPackCard key={order.order_pack_id} order={order} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default OrderPacks
