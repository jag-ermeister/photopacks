import React from 'react'
import { Button } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'
import { Ring } from '@uiball/loaders'

function OrderPackCard({ order }) {
  const navigate = useNavigate()

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-hidden">
      <div
        className="relative overflow-hidden"
        style={{ paddingTop: '100%' }}
        onClick={() =>
          navigate(`/orders/${order.id}/packs/${order.prompt_pack.id}`)
        }
      >
        <a
          href="#"
          className="absolute inset-0 flex items-center justify-center"
        >
          {order.is_success && (
            <img
              className="w-full h-full object-cover rounded-lg"
              src={order.inference_image_urls[0]}
              alt="product image"
            />
          )}
          {!order.is_success && (
            <img
              className="w-full h-full object-cover rounded-lg"
              src={order.training_image_urls[0]}
              alt="product image"
            />
          )}
        </a>
      </div>

      <div className="flex flex-col gap-6 pt-6">
        <div className="flex flex-col gap-1">
          <div className="text-xs text-gray-500">Order #{order.display_id}</div>
          <div className="text-2xl font-bold text-gray-900">
            {order.prompt_pack.display_name}
          </div>
          <div className="text-gray-500">100 Image Pack</div>
        </div>

        <div className="flex items-center justify-between">
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
