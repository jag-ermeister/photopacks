import React from 'react'

function AboutUnique() {
  return (
    <div className="dark">
      <section className="bg-white dark:bg-gray-900">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              {'Uniquely Your’s, Uniquely You'.toUpperCase()}
            </h2>
            <p className="mb-4">
              We take your images and craft a one-of-a-kind, unique AI model
              specifically tailored to your nuances. The result? A collection of
              distinct, unparalleled photos that capture your individual details
              and personality like never before.
            </p>
            <p>
              Each image is exclusively yours – a visual narrative that sets you
              apart. Revel in the assurance that every photo in your pack is
              entirely unique, ensuring a personal touch that belongs to you and
              you alone.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <img
              className="w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-content-2.png"
              alt="office content 3"
            />
            <img
              className="mt-4 w-full lg:mt-10 rounded-lg"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-content-2.png"
              alt="office content 4"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutUnique
