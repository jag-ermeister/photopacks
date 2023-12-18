import React from 'react'
import { useParams } from 'react-router-dom'
import { usePack } from '../hooks/dataHooks'
import withAuthenticatedLayout from '../components/hoc/withAuthenticatedLayout'

function PackDetails() {
  let { id } = useParams()

  const { pack, isLoading, error } = usePack(id)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h1>Pack Details</h1>
      <h2>{pack.name}</h2>
      <a
        href={`/purchase/${id}`}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Buy
      </a>
    </div>
  )
}

export default withAuthenticatedLayout(PackDetails, true)
