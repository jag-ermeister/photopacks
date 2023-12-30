import React from 'react'

const TestimonialsSection = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center">
          <h2 className="mb-4 text-4xl md:text-6xl tracking-tight font-extrabold text-gray-900 dark:text-white uppercase">
            Unfiltered love
          </h2>
          <p className="mb-8 font-light text-gray-500 lg:mb-16 dark:text-gray-400 sm:text-xl">
            Straight from the visual trendsetters themselves
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Testimonial 1 */}
          <div className="space-y-6">
            <figure className="p-6 bg-gray-50 rounded dark:bg-gray-800">
              <blockquote className="text-sm text-gray-500 dark:text-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Solid foundation for any project
                </h3>
                <p className="my-4">
                  &quot;This is a very complex and beautiful set of elements.
                  Under the hood it comes with the best things from 2 different
                  worlds: Figma and Tailwind.&quot;
                </p>
              </blockquote>
              <figcaption className="flex items-center space-x-3">
                <img
                  className="w-9 h-9 rounded-full"
                  src="#"
                  alt="profile picture"
                />
                <div className="space-y-0.5 font-medium dark:text-white">
                  <div>Bonnie Green</div>
                  <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                    CTO at Open AI
                  </div>
                </div>
              </figcaption>
            </figure>
            {/* Repeat similar structure for other testimonials */}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
