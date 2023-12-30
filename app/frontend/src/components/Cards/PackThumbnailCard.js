import React from 'react'
import { Card } from 'flowbite-react'
import { STATIC_ROOT } from '../../constants'

function PackThumbnailCard({ pack }) {
  return (
    <Card
      renderImage={() => (
        <img
          width={96}
          height={96}
          src={`${STATIC_ROOT}/packs/${pack.preview_image}`}
          alt="image 1"
        />
      )}
      theme={{
        root: {
          children: 'flex h-full flex-col justify-center p-2',
          horizontal: {
            off: 'flex-col',
            on: 'flex-row md:max-w-xl',
          },
        },
      }}
      horizontal
      key={pack.id}
    >
      <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white px-4">
        {pack.display_name}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400 px-4">
        100 image pack
      </p>
    </Card>
  )
}

export default PackThumbnailCard
