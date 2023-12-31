import React, { useEffect, useState } from 'react'
import { Button } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'
import { STATIC_ROOT } from '../../constants'
import { useInView } from 'react-intersection-observer'

function AboutSection() {
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

  const scaleValue = 0.75 + scrollY * 0.0005 // Adjust the multiplier for the desired scaling effect

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
            We use{' '}
            <span className="text-secondary-600">SDXL with Dreambooth</span> to
            generate the highest quality images. Competitor images just don’t
            compare.
          </div>
          <div
            ref={ref2}
            className={`leading-tight text-2xl md:text-4xl font-light opacity-0 ${
              inView2 ? 'animate-float-in' : ''
            }`}
          >
            We create{' '}
            <span className="text-secondary-600">high resolution images</span>{' '}
            and capture the details that lesser technologies just can’t obtain.
          </div>
          <div>
            <a
              href="/packs"
              title=""
              className="inline-flex items-center text-base font-medium text-primary-700 hover:underline dark:text-primary-500"
            >
              Learn what makes PhotoPacks.AI different
              <svg
                aria-hidden="true"
                className="ml-1.5 h-8 w-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
          <div className="flex">
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
      <div className="relative bg-secondary-600 w-full px-4 py-8 text-center sm:py-16 lg:px-16 text-primary-700 overflow-hidden">
        <div className="absolute bottom-[-1350px] right-[-1350px] md:bottom-[-500px] md:right-[-500px]">
          {/* Your SVG image goes here */}
          <img
            style={{
              transform: `scale(${scaleValue})`,
              transition: 'transform 0.1s ease',
            }}
            className="w-1/2 h-1/2"
            src={`${STATIC_ROOT}/YellowCircleBG.svg`}
            alt="Background Image"
          />
        </div>
        <div className="flex flex-col gap-16 max-w-xl px-6 mr-auto my-auto h-full justify-center relative">
          <div className="leading-tight text-4xl md:text-6xl font-extrabold text-capitalize">
            SHARPER, REALER, AND MORE AUTHENTICALLY{' '}
            <span className="text-white">YOU</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
