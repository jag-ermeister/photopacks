import React from 'react'
import withAuthenticatedLayout from '../components/hoc/withAuthenticatedLayout'
import AboutHero from '../components/Sections/AboutHero'
import HeroBanner from '../components/Banner/HeroBanner'
import AboutUnique from '../components/Sections/AboutUnique'
import AboutDesigned from '../components/Sections/AboutDesigned'
import AboutCtaSection from '../components/Sections/AboutCtaSection'
import FAQ from '../FAQ/FAQ'
import GetInTouch from '../components/Sections/GetInTouch'

function About() {
  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="flex flex-col gap-6 md:gap-12 w-full justify-between mx-auto max-w-screen-xl px-4 mt-8 mb-16 md:my-16">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            {'Custom AI imagery for everyone'.toUpperCase()}
          </h2>
          <p className="text-base md:text-lg font-normal text-primary-700">
            We make it easy to transform ordinary photos into something
            extraordinary
          </p>
        </div>
      </section>
      <AboutHero />
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="text-center text-gray-900">
            <h2 className="max-w-screen-md flex mx-auto items-center mb-4 text-4xl tracking-tight font-extrabold text-gray-900 lg:text-5xl dark:text-white text-uppercase">
              {'Elevate The ordinary to extraordinary'.toUpperCase()}
            </h2>
          </div>
          <div className="grid gap-6 mt-12 lg:mt-14 lg:gap-12 md:grid-cols-3">
            <div className="flex mb-2 md:flex-col md:mb-0">
              <img
                className="mr-4 w-auto h-36 md:w-full md:h-auto rounded-lg"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-content-1.png"
                alt="office image"
              />
              <div>
                <h3 className="text-xl font-bold md:mt-4 mb-2.5 text-gray-900 dark:text-white">
                  Unique Gifts
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Create a canvas print, a personalized greeting card, or a
                  custom T-shirt. These unique images add a custom flare to
                  every occasion.
                </p>
              </div>
            </div>
            <div className="flex mb-2 md:flex-col md:mb-0">
              <img
                className="mr-4 w-auto h-36 md:w-full md:h-auto rounded-lg"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-content-2.png"
                alt="office image 2"
              />
              <div>
                <h3 className="text-xl font-bold md:mt-4 mb-2.5 text-gray-900 dark:text-white">
                  Professional Portraits
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Upgrade your professional image with polished portraits. Ideal
                  for LinkedIn profiles and personal branding. Make a lasting
                  impression in the digital professional landscape.
                </p>
              </div>
            </div>
            <div className="flex md:flex-col">
              <img
                className="mr-4 w-auto h-36 md:w-full md:h-auto rounded-lg"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-content-3.png"
                alt="office image 3"
              />
              <div>
                <h3 className="text-xl font-bold md:mt-4 mb-2.5 text-gray-900 dark:text-white">
                  Artistic Expression
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Showcase your unique style on social media. Curate a visually
                  stunning and distinctive online presence that reflects your
                  individuality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <HeroBanner />
      <AboutUnique />
      <AboutDesigned />
      <AboutCtaSection />
      <FAQ />
      <GetInTouch />
    </div>
  )
}

export default withAuthenticatedLayout(About, true)
