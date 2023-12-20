import React from 'react'
import BackendClient from '../client/BackendClient'
import { useParams } from 'react-router-dom'
import { usePack } from '../hooks/dataHooks'
import withAuthenticatedLayout from '../components/hoc/withAuthenticatedLayout'
import { Button } from 'flowbite-react'
import {Badge} from 'flowbite-react'

function Purchase() {
  let { id } = useParams()

  const { pack, isLoading, error } = usePack(id)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  const handleButtonClick = async () => {
    try {
      const order = await BackendClient.createOrder({
        subject_name: 'test',
        prompt_pack: id,
        model_type: 'man',
      })
      await BackendClient.checkout(order.id)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
          <div className="flex align-top justify-between w-full">
              <div className="flex gap-6">
                  <div className="leading-none text-6xl font-extrabold">YOUR ORDER</div>
                  <Badge color="info" size="lg" className="mt-2">Poop</Badge>
              </div>
              <Button
                  pill
                  onClick={handleButtonClick}
                  color="info"
              >
                  Buy (Go to Stripe)
            </Button>
          </div>
      </div>
    </section>
  )
}

export default withAuthenticatedLayout(Purchase, false)
