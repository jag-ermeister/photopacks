import React from 'react'
import 'photoswipe/dist/photoswipe.css'
import { Gallery, Item } from 'react-photoswipe-gallery'

function PhotoGallery({ photoUrls }) {
  const items = photoUrls.map((url, index) => {
    const altText = Math.floor(index / 5) + 1

    return (
      <Item original={url} thumbnail={url} width="1024" height="1024" key={url}>
        {({ ref, open }) => (
          <div className="flex-basis-auto w-full relative overflow-hidden hover:transform hover:scale-105 transition-transform duration-300">
            <img
              ref={ref}
              onClick={open}
              src={url}
              alt={altText}
              className="w-full h-auto object-cover rounded-lg hover:cursor-pointer"
            />
          </div>
        )}
      </Item>
    )
  })

  return (
    <Gallery>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">{items}</div>
    </Gallery>
  )
}

export default PhotoGallery
