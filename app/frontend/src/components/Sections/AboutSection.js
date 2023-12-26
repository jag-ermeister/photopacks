import React from 'react'
import { Button } from 'flowbite-react'

function AboutSection() {
  return (
    <section className="flex md:flex-row flex-col">
      <div className="bg-gray-900 w-full px-4 py-8 sm:py-16 lg:px-16 text-white">
        <div className="flex flex-col gap-8 md:gap-16 max-w-xl px-6 ml-auto">
          <div className="leading-tight text-2xl md:text-4xl font-light">
            We use{' '}
            <span className="text-secondary-600">SDXL with Dreambooth</span> to
            generate the highest quality images. Competitor images just don’t
            compare.
          </div>
          <div className="leading-tight text-2xl md:text-4xl font-light">
            We create{' '}
            <span className="text-secondary-600">high resolution images</span>{' '}
            and capture the details that lesser technologies just can’t obtain.
          </div>
          <a href="#" className="font-medium text-primary-700 hover:underline">
            Learn what makes PhotoPacks.AI different
          </a>
          <div className="flex">
            <Button pill size="xl" color="light">
              Get Started
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-secondary-600 w-full px-4 py-8 text-center sm:py-16 lg:px-16 text-primary-700">
        <div className="flex flex-col gap-16 max-w-xl px-6 mr-auto my-auto h-full justify-center">
          <div className="leading-tight text-5xl md:text-6xl font-extrabold text-capitalize">
            SHARPER, REALER, AND MORE AUTHENTICALLY{' '}
            <span className="text-white">YOU</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
