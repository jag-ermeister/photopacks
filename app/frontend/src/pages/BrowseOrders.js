import React from 'react'
import { useOrderPacks, useOrders } from '../hooks/dataHooks'
import withAuthenticatedLayout from '../components/hoc/withAuthenticatedLayout'
import OrderPacks from '../components/Sections/OrderPacks'
import { useLocation } from 'react-router-dom'
import { Alert } from 'flowbite-react'
import { HiCheck, HiInformationCircle } from 'react-icons/hi'
import AwaitingUploadOrders from '../components/Sections/AwaitingUploadOrders'

function BrowseOrders() {
  const {
    orders,
    isLoading: ordersIsLoading,
    error: ordersIsError,
  } = useOrders()
  const {
    orderPacks,
    isLoading: orderPacksIsLoading,
    error: orderPacksIsError,
  } = useOrderPacks()
  const location = useLocation()
  const successOrderParam = new URLSearchParams(location.search).get(
    'success_order'
  )

  if (ordersIsLoading || orderPacksIsLoading) return <div>Loading...</div>
  if (ordersIsError || orderPacksIsError) return <div>Error!</div>

  const imagesNotUploadedOrders = orders.filter(
    (o) => o.training_image_urls === null || o.training_image_urls.length === 0
  )
  const imagesUploadedOrderPacks = orderPacks.filter(
    (o) => o.training_image_urls !== null && o.training_image_urls.length > 0
  )

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="flex flex-col gap-6 md:gap-12 w-full justify-between mx-auto max-w-screen-xl px-4 items-center mt-8 mb-16 md:my-16">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-center">
          {'My Orders'.toUpperCase()}
        </h2>
        <div>
          {successOrderParam && (
            <Alert
              color="success"
              className="w-full mb-8 mx-auto"
              icon={HiCheck}
              additionalContent={
                <div>
                  Your order is in progress! You can see it below.{' '}
                  <span className="font-bold">
                    We&apos;ll send you an email when it is complete!
                  </span>
                </div>
              }
            >
              Order #{successOrderParam} Successfully Uploaded
            </Alert>
          )}

          <AwaitingUploadOrders orders={imagesNotUploadedOrders} />
          <OrderPacks orders={imagesUploadedOrderPacks} />
          {orders.length === 0 && (
            <Alert
              color="warning"
              icon={HiInformationCircle}
              className="w-full mx-auto"
            >
              You have not placed any orders yet!
            </Alert>
          )}
        </div>
      </div>
    </section>
  )
}

export default withAuthenticatedLayout(BrowseOrders, false)
