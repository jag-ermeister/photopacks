import React from 'react'
import { STATIC_ROOT } from '../../constants'

function LearnHowItWorks() {
  return (
    <div className="dark">
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 py-8 text-center sm:py-16 lg:px-6 text-white">
          <h2 className="mb-4 text-4xl md:text-5xl font-extrabold tracking-tight text-primary-700">
            {'Your People, Your Pets, Your Portraits'.toUpperCase()}
          </h2>
          <p className="sm:text-xl lg:px-48">
            Customized portraits - uniquely crafted for you.
          </p>
          <div className="mb-8 mt-8 space-y-8 md:grid md:grid-cols-3 md:gap-12 md:space-y-0">
            <div>
              <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-lg">
                <img
                  className="pt-8 pb-2 rounded-t-lg"
                  src={`${STATIC_ROOT}/icons/Upload.svg`}
                  alt="product image"
                />
              </div>
              <h3 className="mb-4 text-2xl font-bold dark:text-white">
                Upload 10-20 Photos
              </h3>
              <p className="mb-4">
                Upload 10-20 images of yourself, a loved one, or a furry friend.
              </p>
            </div>
            <div>
              <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-lg">
                <img
                  className="pt-8 pb-2 rounded-t-lg"
                  src={`${STATIC_ROOT}/icons/Robot.svg`}
                  alt="product image"
                />
              </div>
              <h3 className="mb-4 text-2xl font-bold dark:text-white">
                Let AI Work Its Magic
              </h3>
              <p className="mb-4">
                Sit back and relax while our AI learns the unique charms of your
                chosen subject and generates one-of-a-kind images.
              </p>
            </div>
            <div>
              <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-lg">
                <img
                  className="pt-8 pb-2 rounded-t-lg"
                  src={`${STATIC_ROOT}/icons/100.svg`}
                  alt="product image"
                />
              </div>
              <h3 className="mb-4 text-2xl font-bold dark:text-white">
                Get 100+ Unique Images
              </h3>
              <p className="mb-4">
                In less than 24 hours, your images will be ready to post, share,
                print, or turn into treasures. We&apos;ll notify you!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LearnHowItWorks
