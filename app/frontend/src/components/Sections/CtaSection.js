import React, { useEffect, useState } from 'react'
import { Button } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'
import { STATIC_ROOT } from '../../constants'

function CtaSection() {
  const [scrollY, setScrollY] = useState(0)
  const navigate = useNavigate()

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
            className="w-[300px] h-[300px] md:w-1/2 md:h-1/2"
            src={`${STATIC_ROOT}/YellowCircleBG.svg`}
            alt="Background Image"
          />
        </div>
        <div className="relative">
          <div className="w-full flex flex-col md:flex-row justify-between mx-auto max-w-screen-xl px-4 py-8 md:py-24 sm:py-24 lg:px-6 items-center">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-grey-900 mb-4 md:mb-0">
              {'Upgrade to Extraordinary'.toUpperCase()}
            </h2>
            <Button pill size="lg" onClick={() => navigate('/packs')}>
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CtaSection
