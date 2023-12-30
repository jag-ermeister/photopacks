import React from 'react'
import { Button, Card } from 'flowbite-react'
import PackThumbnailCard from './PackThumbnailCard'
import { useNavigate } from 'react-router-dom'

function AwaitingUploadOrderCard({ order }) {
  const navigate = useNavigate()
  const packs = [
    order.prompt_pack_1,
    order.prompt_pack_2,
    order.prompt_pack_3,
    order.prompt_pack_4,
    order.prompt_pack_5,
  ].filter((pack) => pack !== undefined && pack !== null)

  return (
    <Card className="max-w-3xl">
      <h1 className="mb-2 font-bold text-gray-900 dark:text-white">
        Order #{order.id}
      </h1>
      <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        Awaiting your photo upload
      </h5>
      <p className="mb-5 text-base text-gray-500 dark:text-gray-400 sm:text-lg">
        Upload photos for your recent purchase!
      </p>
      {packs.map((pack) => (
        <PackThumbnailCard pack={pack} key={pack.id} />
      ))}
      <Button pill color="info" onClick={() => navigate(`/upload/${order.id}`)}>
        Upload my photos
      </Button>
    </Card>
  )
}

export default AwaitingUploadOrderCard
