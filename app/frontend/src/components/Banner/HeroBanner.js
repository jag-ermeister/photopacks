import React from 'react'
import { STATIC_ROOT } from '../../constants'

function HeroBanner() {
  return (
    <section className="flex items-center gap-4 py-4 bg-primary-700 text-5xl font-extrabold leading-tight">
      <div>{'Upload Your Photos'.toUpperCase()}</div>
      <div>
        {' '}
        <img src={`${STATIC_ROOT}/icons/circle.svg`} alt="product image" />
      </div>
      <div>{'Get 100+ Professional AI Images'.toUpperCase()}</div>
      <div>
        {' '}
        <img src={`${STATIC_ROOT}/icons/circle.svg`} alt="product image" />
      </div>
    </section>
  )
}

export default HeroBanner
