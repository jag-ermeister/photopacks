import React from 'react'
import PhotoPackCard from './PhotoPackCard'
import { usePacks } from '../../hooks/dataHooks'

function PhotoPacks() {
  const { promptPacks, isLoading, error } = usePacks()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
        <div className="mb-8 max-w-screen-md lg:mb-16">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-primary-700 dark:text-white">
            {'Photo Packs'.toUpperCase()}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 sm:text-xl">
            100 images in each pack. One time payment. No subscription.
          </p>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-3">
          {promptPacks.map((pack) => (
            <PhotoPackCard key={pack.id} pack={pack} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PhotoPacks
