import React from 'react'
import { STATIC_ROOT } from '../../constants'

function HeroBanner() {
  return (
    <section className="flex items-center gap-4 py-4 bg-primary-700 text-4xl md:text-6xl font-extrabold leading-tight overflow-x-hidden">
      <div className="whitespace-nowrap">
        {'Upload Your Photos'.toUpperCase()}
      </div>
      <div className="flex-shrink-0">
        {' '}
        <img src={`${STATIC_ROOT}/icons/circle.svg`} alt="product image" />
      </div>
      <div className="whitespace-nowrap">
        {'Get 100+ Professional AI Images'.toUpperCase()}
      </div>
      <div className="flex-shrink-0">
        {' '}
        <img src={`${STATIC_ROOT}/icons/circle.svg`} alt="product image" />
      </div>
    </section>
  )
}

export default HeroBanner
