import React from 'react'
import { STATIC_ROOT } from '../../constants'
import { Badge, Button } from 'flowbite-react'
import { HiShoppingCart } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

function PhotoPackCard({ id, name }) {
  let navigate = useNavigate()
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 px-8 ">
      <a href="#">
        <img
          className="pt-8 pb-2 rounded-t-lg"
          src={`${STATIC_ROOT}/yuki_cowboy.jpeg`}
          alt="product image"
        />
      </a>
      <div className="pb-5">
        <div className="flex items-center pb-2 gap-2 mt-0.5">
          <Badge color="yellow" size="sm" className="text-xs font-semibold">
            Trending
          </Badge>
          <Badge color="gray" size="sm" className="text-xs font-semibold">
            Unique Gift
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            {name}
          </span>
          <Button
            onClick={() => navigate(`/purchase/${id}`)}
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
            Buy $9.99
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PhotoPackCard
