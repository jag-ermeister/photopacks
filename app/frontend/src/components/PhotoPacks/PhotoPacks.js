import React from 'react'
import PhotoPack from './PhotoPack'

function PhotoPacks() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
        <div className="mb-8 max-w-screen-md lg:mb-16">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Designed for business teams like yours
          </h2>
          <p className="text-gray-500 dark:text-gray-400 sm:text-xl">
            Here at Flowbite we focus on markets where technology, innovation,
            and capital can unlock long-term value and drive economic growth.
          </p>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-3">
          <PhotoPack />
          <PhotoPack />
          <PhotoPack />
          <PhotoPack />
          <PhotoPack />
          <PhotoPack />
        </div>
      </div>
    </section>
  )
}

export default PhotoPacks
