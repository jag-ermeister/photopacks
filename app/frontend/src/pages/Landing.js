import React from 'react'
import Hero from '../components/Hero/Hero'
import PhotoPacks from '../components/PhotoPacks/PhotoPacks'
import LearnHowItWorks from '../components/LearnHowItWorks/LearnHowItWorks'
import Features from '../components/Features/Features'
import FAQ from '../FAQ/FAQ'
import withAuthenticatedLayout from '../components/hoc/withAuthenticatedLayout'
import HeroBanner from '../components/Banner/HeroBanner'

function Landing() {
  return (
    <div>
      <Hero />
      <HeroBanner />
      <PhotoPacks />
      <LearnHowItWorks />
      <Features />
      <FAQ />
    </div>
  )
}

export default withAuthenticatedLayout(Landing, true)
