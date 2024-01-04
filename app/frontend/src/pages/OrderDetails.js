import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import withAuthenticatedLayout from '../components/hoc/withAuthenticatedLayout'
import { useOrder } from '../hooks/dataHooks'
import PhotoGallery from '../components/Gallery/PhotoGallery'
import { Badge, Button, Breadcrumb } from 'flowbite-react'
import { transformOrderToOrderPacks } from '../transform/transform'

function OrderDetails() {
  let { orderId, packId } = useParams()

  const { order, isLoading, error } = useOrder(orderId)

  const [showBackToTopButton, setShowBackToTopButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTopButton(window.scrollY > 200)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  const orderPacks = transformOrderToOrderPacks(order)
  const orderPack = orderPacks.find(
    (orderPack) => orderPack.prompt_pack.id === packId
  )

  return (
    <div className="flex flex-col gap-8 md:gap-12 max-w-screen-xl m-auto px-4 md:px-8 md:my-16 my-8">
      {/* Breadcrumb */}
      <Breadcrumb
        aria-label="Default breadcrumb example"
        className="md:block hidden"
      >
        <Breadcrumb.Item href="/orders">My Orders</Breadcrumb.Item>
        <Breadcrumb.Item>Order #{orderPack.display_id}</Breadcrumb.Item>
      </Breadcrumb>

      {/* Order details */}
      <div className="flex flex-col gap-4 md:flex-row justify-between w-full items-center">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <div className="text-3xl md:text-5xl font-extrabold tracking-tight text-primary-700">
              {orderPack.prompt_pack.display_name.toUpperCase()}&nbsp;&nbsp;
            </div>
            <Badge color="info" size="lg">
              {orderPack.prompt_pack.pack_type}
            </Badge>
          </div>
          <div className="text-gray-500">Order #{orderPack.display_id}</div>
        </div>
        <a href={order.zip_file_url} className="your-button-classes-here">
          <Button
            pill
            color="info"
            theme={{
              color: {
                custom:
                  'w-full text-primary-700 bg-white border border-primary-200 enabled:hover:bg-primary-50 enabled:hover:text-cyan-700 :ring-cyan-700 focus:text-cyan-700 dark:bg-transparent dark:text-gray-400 dark:border-gray-600 dark:enabled:hover:text-white dark:enabled:hover:bg-gray-700 focus:ring-2',
              },
            }}
          >
            Download All
          </Button>
        </a>
      </div>

      {/* Photo Gallery */}
      {orderPack.inference_image_urls && (
        <PhotoGallery photoUrls={orderPack.inference_image_urls} />
      )}
      {!orderPack.inference_image_urls && (
        <div>Your pack is currently processing</div>
      )}

      {/* Back to Top Button */}
      {showBackToTopButton && (
        <button
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 bg-primary-700 text-white rounded-full hover:bg-primary-600 focus:outline-none focus:ring focus:border-primary-300"
          onClick={scrollToTop}
        >
          Back to Top
        </button>
      )}
    </div>
  )
}

export default withAuthenticatedLayout(OrderDetails, false)
