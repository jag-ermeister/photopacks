import React from 'react'
import { useOrderPacks } from '../hooks/dataHooks'
import withAuthenticatedLayout from '../components/hoc/withAuthenticatedLayout'
import OrderPacks from '../components/Sections/OrderPacks'
import { useLocation } from 'react-router-dom'
import { Alert } from 'flowbite-react'
import { HiCheck } from 'react-icons/hi'

function BrowseOrders() {
  const { orderPacks, isLoading, error } = useOrderPacks()
  const location = useLocation()
  const successOrderParam = new URLSearchParams(location.search).get(
    'success_order'
  )

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h2 className="mt-16 mb-8 mb-4 text-4xl md:text-6xl font-extrabold tracking-tight text-center">
        {'My Orders'.toUpperCase()}
      </h2>
      {successOrderParam && (
        <Alert
          color="warning"
          icon={HiCheck}
          additionalContent={
            <div>
              Your order is in progress! You can see it below. We&apos;ll send
              you an email when it is complete!
            </div>
          }
        >
          Order #{successOrderParam} Successfully Uploaded
        </Alert>
      )}

      <OrderPacks orders={orderPacks} />
    </div>
  )
}

export default withAuthenticatedLayout(BrowseOrders, false)
