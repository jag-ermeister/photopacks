import React from 'react'
import { Button } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'

function CtaSection() {
  let navigate = useNavigate()

  return (
    <section className="bg-secondary-600 dark:bg-gray-900">
      <div className="flex flex-col md:flex-row w-full justify-between mx-auto max-w-screen-xl px-4 py-8 md:py-24 sm:py-24 lg:px-6 items-center">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-grey-900 mb-4 md:mb-0">
          {'Upgrade to Extraordinary'.toUpperCase()}
        </h2>
        <Button pill size="lg" onClick={() => navigate('/packs')}>
          Get Started
        </Button>
      </div>
    </section>
  )
}

export default CtaSection
