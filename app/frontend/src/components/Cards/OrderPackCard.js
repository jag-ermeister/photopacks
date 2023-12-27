import React from 'react'
import { STATIC_ROOT } from '../../constants'
import { Button } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'
import { Ring } from '@uiball/loaders'

function OrderPackCard({ order }) {
  let navigate = useNavigate()
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 px-8 ">
      <a href="#">
        <img
          className="pt-8 pb-2 rounded-t-lg"
          src={`${STATIC_ROOT}/packs/${order.prompt_pack.preview_image}`}
          alt="product image"
        />
      </a>
      <div className="pb-5">
        <div className="text-sm text-gray-500">Order #{order.id}</div>
        <div className="text-3xl font-bold text-gray-900">
          {order.prompt_pack.display_name}
        </div>
        <div className="text-gray-500">100 Image Pack</div>
        <div className="flex items-center justify-between mt-4">
          {order.is_success && (
            <Button
              onClick={() =>
                navigate(`/orders/${order.id}/packs/${order.prompt_pack.id}`)
              }
              pill
              color="info"
              theme={{
                color: {
                  custom:
                    'w-full text-primary-700 bg-white border border-primary-200 enabled:hover:bg-primary-50 enabled:hover:text-cyan-700 :ring-cyan-700 focus:text-cyan-700 dark:bg-transparent dark:text-gray-400 dark:border-gray-600 dark:enabled:hover:text-white dark:enabled:hover:bg-gray-700 focus:ring-2',
                },
              }}
            >
              View photos
            </Button>
          )}
          {!order.is_success && (
            <Button
              onClick={() =>
                navigate(`/orders/${order.id}/packs/${order.prompt_pack.id}`)
              }
              disabled
              pill
              color="custom"
              theme={{
                color: {
                  custom:
                    'w-full text-gray-700 bg-white border border-gray-200 enabled:hover:bg-gray-50 enabled:hover:text-cyan-700 :ring-cyan-700 focus:text-cyan-700 dark:bg-transparent dark:text-gray-400 dark:border-gray-600 dark:enabled:hover:text-white dark:enabled:hover:bg-gray-700 focus:ring-2',
                },
              }}
            >
              <Ring size={20} /> &nbsp;&nbsp;In progress
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderPackCard
