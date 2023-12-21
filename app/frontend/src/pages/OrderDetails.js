import React from 'react'
import { useParams } from 'react-router-dom'
import withAuthenticatedLayout from '../components/hoc/withAuthenticatedLayout'
import { useOrder } from '../hooks/dataHooks'
import PhotoGallery from '../components/Gallery/PhotoGallery'

function OrderDetails() {
  let { id } = useParams()

  const { order, isLoading, error } = useOrder(id)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h1>Order Details</h1>
      <h2>Order ID: {id}</h2>
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
