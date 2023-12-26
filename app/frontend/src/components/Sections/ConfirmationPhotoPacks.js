import React from 'react'
import PhotoPackCard from '../Cards/PhotoPackCard'
import { usePacks } from '../../hooks/dataHooks'

function ConfirmationPhotoPacks({ pack_type }) {
  const { promptPacks, isLoading, error } = usePacks()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  const filteredPacks = promptPacks.filter(
    (pack) => pack.pack_type === pack_type
  )

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-6">
        <div className="space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-3">
          {filteredPacks.map((pack) => (
            <PhotoPackCard key={pack.id} pack={pack} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ConfirmationPhotoPacks
