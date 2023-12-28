import React from 'react'
import ConfirmationPhotoPackCard from '../Cards/ConfirmationPhotoPackCard'

function ConfirmationPhotoPacks({ promptPacks, handleBuyClicked }) {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-0">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
