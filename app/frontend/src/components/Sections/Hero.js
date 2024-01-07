import React, { useState } from 'react'
import { STATIC_ROOT } from '../../constants'
import ImageTransition from '../WebGL/ImageTransition'

function Hero() {
  const imageCaptions = [
    {
      image: `${STATIC_ROOT}/hero_placeholder.png`,
      caption: 'Profile Picture',
      effect: 'GlitchDisplace',
    },
    {
      image: `${STATIC_ROOT}/abstract_hero.png`,
      caption: 'Abstract Art',
      effect: 'directionalwarp',
    },
    {
      image: `${STATIC_ROOT}/cat_hero.png`,
      caption: 'Unique Gift',
      effect: 'morph',
    },
    {
      image: `${STATIC_ROOT}/fashion_hero.png`,
      caption: 'Fashion Shots',
      effect: 'randomsquares',
    },
  ]

  const [currentCaption, setCurrentCaption] = useState(imageCaptions[0].caption)
  const [animationClass, setAnimationClass] = useState(
    'animate-float-in animate-fadeIn'
  )

  const handleTransition = (index) => {
    setAnimationClass('animate-fade-out')

    setTimeout(() => {
      setCurrentCaption(imageCaptions[index].caption)
      setAnimationClass('animate-fade-in')
    }, 500)
  }

  return (
    <section className="bg-white dark:bg-gray-900 min-h-screen flex flex-col -mb-14">
      <div className="bg-white dark:bg-gray-900 my-auto flex items-center justify-center text-center">
        <div className="flex flex-col gap-4 w-full">
          <h1 className="text-4xl font-extrabold tracking-tight leading-none text-primary-700 md:text-5xl lg:text-6xl dark:text-white tracking-tight animate-float-down">
            {'Create Your Perfect'.toUpperCase()}
          </h1>
          <div className="flex justify-center w-full">
            <ImageTransition
              images={imageCaptions.map((item) => item.image)}
              effects={imageCaptions.map((item) => item.effect)}
              onTransition={handleTransition}
            />
          </div>
          <h1
            className={`text-4xl font-extrabold tracking-tight leading-none text-primary-700 md:text-5xl lg:text-6xl dark:text-white tracking-tight  ${animationClass}`}
          >
            {currentCaption.toUpperCase()}
          </h1>
          <p className="font-light text-gray-500 md:text-lg lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 opacity-0 animate-appear">
            Upload your photos, get 100+ AI images
          </p>
        </div>
      </div>
      <div className="flex justify-center mb-32 md:mb-24">
        <img
          className="pt-8 pb-2 rounded-t-lg opacity-0 animate-arrow-dance"
          src={`${STATIC_ROOT}/icons/ScrollDown.svg`}
          alt="scroll down icon"
        />
      </div>
    </section>
  )
}

export default Hero
