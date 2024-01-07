import React, { useEffect, useState } from 'react'
import { STATIC_ROOT } from '../../constants'

function AboutCtaSection() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scaleValue = 0.75 + scrollY * 0.0005 // Adjust the multiplier for the desired scaling effect

  return (
    <section className="bg-secondary-600 dark:bg-gray-900">
      <div className="relative bg-secondary-600 w-full px-4 py-8 sm:py-16 lg:px-16 overflow-hidden">
        <div className="absolute bottom-[-350px] right-[-350px] md:bottom-[-500px] md:right-[-500px]">
          {/* Your SVG image goes here */}
          <img
            style={{
              transform: `scale(${scaleValue})`,
              transition: 'transform 0.1s ease',
            }}
            className="w-[300px] h-[300px] md:w-full md:h-full"
            src={`${STATIC_ROOT}/YellowCircleBG.svg`}
            alt="Background Image"
          />
        </div>
        <div className="relative">
          <div className="w-full flex flex-col gap-8 mx-auto max-w-screen-xl px-4 py-8 md:py-24 sm:py-24 lg:px-6">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-4 md:mb-0 justify-left">
              {'the Cutting-edge AI technology, ahead of the curve'.toUpperCase()}
            </h2>
            <p className="font-normal md:max-w-screen-md text-lg text-gray-800">
              Step into the forefront of AI innovation with SDXL,
              setting the standard for custom image generation. Our advanced
              technology not only produces superior images but also demands
              fewer photo uploads, setting us apart from the competition.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutCtaSection
