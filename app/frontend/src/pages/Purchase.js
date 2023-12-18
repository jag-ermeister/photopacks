import React from 'react'
import BackendClient from '../client/BackendClient'
import { useParams } from 'react-router-dom'
import { usePack } from '../hooks/dataHooks'
import withAuthenticatedLayout from '../components/hoc/withAuthenticatedLayout'

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
    <div>
      <h1>Purchase</h1>
      <h2>{pack.name}</h2>
      <button
        onClick={handleButtonClick}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Buy (Go to Stripe)
      </button>
    </div>
  )
}

export default withAuthenticatedLayout(Purchase, false)
