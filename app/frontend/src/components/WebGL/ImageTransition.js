import React, { useState, useEffect, useRef } from 'react'
import { Surface } from 'gl-react-dom'
import GLTransitions from 'gl-transitions'
import GLTransition from 'react-gl-transition'
import { STATIC_ROOT } from '../../constants'

function ImageTransition({
  displayDuration = 3000,
  transitionDuration = 1000,
}) {
  const images = [
    `${STATIC_ROOT}/hero_placeholder.png`,
    `${STATIC_ROOT}/hero_placeholder.png`,
  ]

  const [index, setIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })
  const containerRef = useRef(null)

  const maxWidth = 1086 // Maximum width of the image
  const maxHeight = 429 // Maximum height of the image
  const aspectRatio = maxHeight / maxWidth // Aspect ratio of the images

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        let containerWidth = entry.contentRect.width
        let imageHeight = containerWidth * aspectRatio

        // Check if the calculated width exceeds the maximum width
        if (containerWidth > maxWidth) {
          containerWidth = maxWidth
          imageHeight = maxHeight
        }

        setCanvasSize({ width: containerWidth, height: imageHeight })
      }
    })

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      let start = null

      const step = (timestamp) => {
        if (!start) start = timestamp
        const progress = (timestamp - start) / transitionDuration
        setProgress(Math.min(progress, 1))

        if (progress < 1) {
          requestAnimationFrame(step)
        } else {
          setIndex((current) => (current + 1) % images.length)
          setProgress(0) // Reset progress for next transition
        }
      }

      requestAnimationFrame(step)
    }, displayDuration)

    return () => clearTimeout(timeout)
  }, [index, displayDuration, transitionDuration])

  const from = images[index % images.length]
  const to = images[(index + 1) % images.length]
  const transition = GLTransitions.find((t) => t.name === 'GlitchMemories') // Or any other transition you prefer

  return (
    <div ref={containerRef} className="w-full">
      <Surface width={canvasSize.width} height={canvasSize.height}>
        <GLTransition
          from={from}
          to={to}
          progress={progress}
          transition={transition}
        />
      </Surface>
    </div>
  )
}

export default ImageTransition
