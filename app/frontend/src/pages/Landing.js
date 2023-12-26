import React from 'react'
import Hero from '../components/Sections/Hero'
import PhotoPacks from '../components/Sections/PhotoPacks'
import LearnHowItWorks from '../components/Sections/LearnHowItWorks'
import Features from '../components/Sections/Features'
import FAQ from '../FAQ/FAQ'
import withAuthenticatedLayout from '../components/hoc/withAuthenticatedLayout'
import HeroBanner from '../components/Banner/HeroBanner'
import AboutSection from '../components/Sections/AboutSection'
import CtaSection from '../components/Sections/CtaSection'

function Landing() {
  return (
    <div>
      <Hero />
      <HeroBanner />
      <PhotoPacks />
      <LearnHowItWorks />
      <Features />
      <AboutSection />
      <FAQ />
      <CtaSection />
    </div>
  )
}

export default withAuthenticatedLayout(Landing, true)
