import React from 'react'
import ConfirmationPhotoPackCard from '../Cards/ConfirmationPhotoPackCard'

function ConfirmationPhotoPacks({ promptPacks, handleBuyClicked }) {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-6">
        <div className="space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-3">
          {promptPacks.map((pack) => (
            <ConfirmationPhotoPackCard
              key={pack.id}
              pack={pack}
              handleBuyClicked={handleBuyClicked}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ConfirmationPhotoPacks
