import React from 'react'
import { useOrders } from '../hooks/dataHooks'
import withAuthenticatedLayout from '../components/hoc/withAuthenticatedLayout'
import OrderPacks from '../components/Sections/OrderPacks'
import { useLocation } from 'react-router-dom'
import { Alert } from 'flowbite-react'
import { HiCheck, HiInformationCircle } from 'react-icons/hi'
import AwaitingUploadOrders from '../components/Sections/AwaitingUploadOrders'
import { transformOrdersToOrderPacks } from '../transform/transform'

function BrowseOrders() {
  const { orders, isLoading, error } = useOrders()

  const location = useLocation()
  const successOrderParam = new URLSearchParams(location.search).get(
    'success_order'
  )

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error!</div>

  const orderPacks = transformOrdersToOrderPacks(orders)

  const imagesNotUploadedOrders = orders.filter(
    (o) => o.training_image_urls === null || o.training_image_urls.length === 0
  )
  const imagesUploadedOrderPacks = orderPacks.filter(
    (o) => o.training_image_urls !== null && o.training_image_urls.length > 0
  )
  const uploadedOrder = successOrderParam
    ? orders.find((o) => o.id === successOrderParam)
    : null

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="flex flex-col gap-6 md:gap-12 w-full justify-between mx-auto max-w-screen-xl px-4 items-center mt-8 mb-16 md:my-16">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-center">
          {'My Orders'.toUpperCase()}
        </h2>
        {uploadedOrder && (
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
            Order #{uploadedOrder.display_id} Successfully Uploaded
          </Alert>
        )}
        <AwaitingUploadOrders orders={imagesNotUploadedOrders} />
        <div className="w-full">
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
