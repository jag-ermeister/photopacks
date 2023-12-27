import React from 'react'
import { useParams } from 'react-router-dom'
import withAuthenticatedLayout from '../components/hoc/withAuthenticatedLayout'
import { useOrder } from '../hooks/dataHooks'
import PhotoGallery from '../components/Gallery/PhotoGallery'
import { Badge, Button } from 'flowbite-react'

function OrderDetails() {
  let { orderId, packId } = useParams()

  const { order, isLoading, error } = useOrder(orderId)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  const promptPacks = [
    order.prompt_pack_1,
    order.prompt_pack_2,
    order.prompt_pack_3,
    order.prompt_pack_4,
    order.prompt_pack_5,
  ]
  const promptPack = promptPacks.find((pack) => pack && pack.id === packId)

  return (
    <div>
      <div className="mt-16 flex">
        <div className="text-6xl font-extrabold tracking-tight text-primary-700">
          {promptPack.display_name.toUpperCase()}&nbsp;&nbsp;
        </div>
        <Badge color="info" size="lg">
          {promptPack.pack_type}
        </Badge>
      </div>
      <div className="text-gray-500">Order ID: {orderId}</div>
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
      {order.inference_image_urls && (
        <PhotoGallery photoUrls={order.inference_image_urls} />
      )}
      {!order.inference_image_urls && (
        <div>Your pack is currently processing</div>
      )}
    </div>
  )
}

export default withAuthenticatedLayout(OrderDetails, false)
