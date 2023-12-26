import React from 'react'
import { STATIC_ROOT } from '../../constants'

function Hero() {
  return (
      <section className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
          <div className="text-center">
              <div className="flex flex-col gap-4">
                  <h1 className="text-4xl font-extrabold tracking-tight leading-none text-primary-700 md:text-5xl lg:text-6xl dark:text-white tracking-tight">
                      {'Create Your Perfect'.toUpperCase()}
                  </h1>
                  <div className="flex justify-center">
                      <img
                          className=""
                          src={`${STATIC_ROOT}/hero_placeholder.png`}
                          alt="product image"
                      />
                  </div>
                  <h1 className="text-4xl font-extrabold tracking-tight leading-none text-primary-700 md:text-5xl lg:text-6xl dark:text-white tracking-tight">
                      {'Profile Picture'.toUpperCase()}
                  </h1>
                  <p className="font-light text-gray-500 md:text-lg lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                      Upload your photos, get 100+ AI images.
                  </p>
              </div>
              <div className="flex justify-center">
                  <img
                      className="pt-8 pb-2 rounded-t-lg"
                      src={`${STATIC_ROOT}/icons/ScrollDown.svg`}
                      alt="product image"
                  />
              </div>
          </div>
      </section>
  )
}

export default Hero
