import React, { useEffect, useState } from 'react'
import { Button } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'
import { STATIC_ROOT } from '../../constants'
import { useInView } from 'react-intersection-observer'

function AboutHero() {
  const [scrollY, setScrollY] = useState(0)
  const navigate = useNavigate()
  const [ref1, inView1] = useInView({})
  const [ref2, inView2] = useInView({})

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scaleValue = 1 + scrollY * 0.0005 // Adjust the multiplier for the desired scaling effect

  return (
    <section className="flex md:flex-row flex-col">
      <div className="bg-gray-900 w-full px-4 py-8 sm:py-16 lg:px-16 text-white">
        <div className="flex flex-col gap-8 md:gap-16 max-w-xl px-2 md:px-6 ml-auto">
          <div
            ref={ref1}
            className={`leading-tight text-2xl md:text-4xl font-light opacity-0 ${
              inView1 ? 'animate-float-in' : ''
            }`}
          >
            Upload your photos and{' '}
            <span className="text-primary-700">
              transform yourself, your friends and family, and even your pets
            </span>{' '}
            into stunning, professional images and works of art.
          </div>
          <div
            ref={ref2}
            className={`flex leading-tight text-2xl md:text-4xl font-light opacity-0 ${
              inView2 ? 'animate-float-in' : ''
            }`}
          >
            <Button
              pill
              size="xl"
              color="light"
              onClick={() => navigate('/packs')}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
      <div className="relative bg-primary-700 w-full text-primary-700 overflow-hidden">
        <div className="absolute w-full h-full object-cover">
          {/* Your SVG image goes here */}
          <img
            style={{
              transform: `scale(${scaleValue})`,
              transition: 'transform 0.1s ease',
            }}
            className="w-full h-full object-cover"
            src={`${STATIC_ROOT}/WhiteLines.svg`}
            alt="Background Image"
          />
        </div>
      </div>
    </section>
  )
}

export default AboutHero
