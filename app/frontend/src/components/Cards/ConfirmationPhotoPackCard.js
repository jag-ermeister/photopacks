import React from 'react'
import { STATIC_ROOT } from '../../constants'
import { Badge, Button } from 'flowbite-react'
import { HiShoppingCart } from 'react-icons/hi'

function ConfirmationPackCard({ pack, handleBuyClicked }) {
  return (
    <div className="w-full group cursor-pointer">
      <div className="relative">
        <img
          className="pt-4 pb-2"
          src={`${STATIC_ROOT}/packs/${pack.preview_image}`}
          alt="product image"
        />
        <div className="absolute bottom-0 left-0 mb-4 ml-2">
          <Badge color="dark" size="sm" className="text-xs font-semibold">
            {pack.pack_type}
          </Badge>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center pb-2 gap-2 mt-0.5">
          <Badge color="gray" size="sm" className="text-xs font-semibold">
            Trending
          </Badge>
          <Badge color="gray" size="sm" className="text-xs font-semibold">
            Unique Gift
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900 dark:text-white group-hover:underline">
            {pack.display_name}
          </span>
          <Button
            onClick={() => handleBuyClicked(pack)}
            pill
            color="custom"
            theme={{
              color: {
                custom:
                  'text-primary-700 bg-white border border-primary-200 enabled:hover:bg-primary-50 enabled:hover:text-cyan-700 :ring-cyan-700 focus:text-cyan-700 dark:bg-transparent dark:text-gray-400 dark:border-gray-600 dark:enabled:hover:text-white dark:enabled:hover:bg-gray-700 focus:ring-2',
              },
            }}
          >
            <HiShoppingCart className="mr-2 h-5 w-5" />
            Add $4.99
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationPackCard
