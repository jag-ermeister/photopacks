import React, { useRef, useEffect, useState } from 'react'
import { STATIC_ROOT } from '../../constants'

function HeroBanner() {
  const bannerRef = useRef(null)
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    let animationFrameId
    let position = 0

    const updateAnimation = () => {
      // Adjust this value for the desired effect
      position -= 0.75 // You can experiment with the speed by adjusting this value

      if (bannerRef.current) {
        bannerRef.current.style.transform = `translateX(${position}px)`

        // Check if a reset is needed
        const bannerWidth = bannerRef.current.offsetWidth
        //const containerWidth = bannerRef.current.parentElement.offsetWidth

        if (position <= -10 * bannerWidth) {
          setCounter((prevCounter) => (prevCounter + 1) % 20)
          position = 0
        }
      }

      // Update the DOM in sync with the repaint cycle
      animationFrameId = requestAnimationFrame(updateAnimation)
    }

    updateAnimation()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [counter])

  // Function to get content inside the marquee
  const getBannerContent = () => (
    <div className="BannerContent flex items-center gap-4 py-4 font-extrabold leading-tight">
      <div className="whitespace-nowrap text-4xl md:text-6xl ml-16">
        {'Get 100+ AI Images'.toUpperCase()}
      </div>
      <div className="flex-shrink-0">
        <img src={`${STATIC_ROOT}/icons/circle.svg`} alt="product image" />
      </div>
      <div className="whitespace-nowrap text-4xl md:text-6xl">
        {'Upload Your Photos'.toUpperCase()}
      </div>
      <div className="flex-shrink-0">
        <img src={`${STATIC_ROOT}/icons/circle.svg`} alt="product image" />
      </div>
    </div>
  )

  return (
    <section className="relative overflow-hidden bg-primary-700">
      <div ref={bannerRef} className="flex">
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index}>{getBannerContent()}</div>
        ))}
      </div>
      {/* Additional content inside the section */}
    </section>
  )
}

export default HeroBanner
