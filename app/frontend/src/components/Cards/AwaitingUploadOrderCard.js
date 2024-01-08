import React from 'react'
import { Badge, Button, Card } from 'flowbite-react'
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
    <Card className="max-w-3xl p-2">
      <div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <h5 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Awaiting your photo upload
            </h5>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400 text-center">
              Upload photos for your recent purchase!
            </p>
          </div>
          <div className="flex justify-center">
            <span>
              <Badge color="info" size="lg">
                {order.model_type}
              </Badge>
            </span>
            <span>
              <h1 className="font-normal text-lg text-gray-900 dark:text-white text-center">
                &nbsp;&nbsp;Order #{order.display_id}
              </h1>
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {packs.map((pack) => (
              <PackThumbnailCard pack={pack} key={pack.id} />
            ))}
          </div>
          <div className="mx-auto">
            <Button
              pill
              color="info"
              onClick={() => navigate(`/upload/${order.id}`)}
            >
              Upload my photos
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default AwaitingUploadOrderCard
