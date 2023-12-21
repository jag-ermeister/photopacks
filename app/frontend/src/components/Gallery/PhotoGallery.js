import React from 'react'
import 'photoswipe/dist/photoswipe.css'
import { Gallery, Item } from 'react-photoswipe-gallery'

function PhotoGallery({ photoUrls }) {
  const items = photoUrls.map((url) => {
    return (
      <Item original={url} thumbnail={url} width="1024" height="1024" key={url}>
        {({ ref, open }) => (
          <div className="flex-basis-auto w-full max-w-xs">
            <img
              ref={ref}
              onClick={open}
              src={url}
              alt="Gallery Image"
              className="w-full h-auto object-cover"
            />
          </div>
        )}
      </Item>
    )
  })

  return (
    <Gallery>
      <div className="flex flex-wrap gap-4">{items}</div>
    </Gallery>
  )
}

export default PhotoGallery
