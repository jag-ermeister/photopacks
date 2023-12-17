import React from 'react'
import Hero from '../components/Hero/Hero'
import PhotoPacks from '../components/PhotoPacks/PhotoPacks'
import LearnHowItWorks from '../components/LearnHowItWorks/LearnHowItWorks'
import Features from '../components/Features/Features'
import FAQ from '../FAQ/FAQ'

function Landing() {
  return (
    <div>
      <Hero />
      <PhotoPacks />
      <LearnHowItWorks />
      <Features />
      <FAQ />
    </div>
  )
}

export default Landing
