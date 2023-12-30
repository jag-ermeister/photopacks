import React from 'react'
import withAuthenticatedLayout from '../components/hoc/withAuthenticatedLayout'

function BrowsePacks() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="flex flex-col gap-6 md:gap-12 w-full justify-between mx-auto max-w-screen-xl px-4 items-center mt-8 mb-16 md:my-16">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-center">
          {'About'.toUpperCase()}
        </h2>
      </div>
    </section>
  )
}

export default withAuthenticatedLayout(BrowsePacks, true)
