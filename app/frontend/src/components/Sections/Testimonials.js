import React from 'react'
import { Rating } from 'flowbite-react'
import { useInView } from 'react-intersection-observer'
import { STATIC_ROOT } from '../../constants'

function TestimonialsSection() {
  const [ref1, inView1] = useInView({})
  const [ref2, inView2] = useInView({})
  const [ref3, inView3] = useInView({})
  const [ref4, inView4] = useInView({})
  const [ref5, inView5] = useInView({})
  const [ref6, inView6] = useInView({})
  const [ref7, inView7] = useInView({})
  const [ref8, inView8] = useInView({})
  const [ref9, inView9] = useInView({})

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
          <div
            ref={ref1}
            className={`space-y-6 opacity-0 ${
              inView1 ? 'animate-float-in' : ''
            }`}
          >
            <figure className="p-6 bg-gray-50 rounded dark:bg-gray-800">
              <Rating className="mb-2">
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  5.0
                </p>
              </Rating>
              <blockquote className="text-sm text-gray-500 dark:text-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Amazing pics!
                </h3>
                <p className="my-4">
                  &quot;Majority are useable for prints and even Christmas
                  cards!&quot;
                </p>
              </blockquote>
              <figcaption className="flex items-center space-x-3">
                <img
                  className="w-9 h-9 rounded-full"
                  src={`${STATIC_ROOT}/testimonials/Bridget.png`}
                  alt="profile picture"
                />
                <div className="space-y-0.5 font-medium dark:text-white">
                  <div>Bridget Green</div>
                  <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Digital Artist
                  </div>
                </div>
              </figcaption>
            </figure>
            {/* Repeat similar structure for other testimonials */}
          </div>
          {/* Testimonial 2 */}
          <div
            ref={ref2}
            className={`space-y-6 opacity-0 ${
              inView2 ? 'animate-float-in' : ''
            }`}
          >
            <figure className="p-6 bg-gray-50 rounded dark:bg-gray-800">
              <Rating className="mb-2">
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  5.0
                </p>
              </Rating>
              <blockquote className="text-sm text-gray-500 dark:text-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Ding Dong Darling
                </h3>
                <p className="my-4">
                  &quot;Love how well the pictures turned out in comparison to
                  what my fur baby looks like&quot;
                </p>
              </blockquote>
              <figcaption className="flex items-center space-x-3">
                <img
                  className="w-9 h-9 rounded-full"
                  src={`${STATIC_ROOT}/testimonials/Elena.png`}
                  alt="profile picture"
                />
                <div className="space-y-0.5 font-medium dark:text-white">
                  <div>Elena Ivanova</div>
                  <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Photographer
                  </div>
                </div>
              </figcaption>
            </figure>
            {/* Repeat similar structure for other testimonials */}
          </div>
          {/* Testimonial 3 */}
          <div
            ref={ref3}
            className={`space-y-6 opacity-0 ${
              inView3 ? 'animate-float-in' : ''
            }`}
          >
            <figure className="p-6 bg-gray-50 rounded dark:bg-gray-800">
              <Rating className="mb-2">
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  5.0
                </p>
              </Rating>
              <blockquote className="text-sm text-gray-500 dark:text-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Oh my goodness.
                </h3>
                <p className="my-4">
                  &quot;I cant recommend this item enough. I have told so many
                  people about this. The customer service is amazing. The images
                  I have received are top notch. I can’t thank you enough.&quot;
                </p>
              </blockquote>
              <figcaption className="flex items-center space-x-3">
                <img
                  className="w-9 h-9 rounded-full"
                  src={`${STATIC_ROOT}/testimonials/Natasha.png`}
                  alt="profile picture"
                />
                <div className="space-y-0.5 font-medium dark:text-white">
                  <div>Natasha Patel</div>
                  <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Visual Artist
                  </div>
                </div>
              </figcaption>
            </figure>
            {/* Repeat similar structure for other testimonials */}
          </div>
          {/* Testimonial 4 */}
          <div
            ref={ref4}
            className={`space-y-6 opacity-0 ${
              inView4 ? 'animate-float-in' : ''
            }`}
          >
            <figure className="p-6 bg-gray-50 rounded dark:bg-gray-800">
              <Rating className="mb-2">
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  5.0
                </p>
              </Rating>
              <blockquote className="text-sm text-gray-500 dark:text-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  So much fun
                </h3>
                <p className="my-4">
                  &quot;Got a wonderful photo for our family holiday card this
                  year. Super fast turnaround and fun to see my pup with so many
                  backgrounds.&quot;
                </p>
              </blockquote>
              <figcaption className="flex items-center space-x-3">
                <img
                  className="w-9 h-9 rounded-full"
                  src={`${STATIC_ROOT}/testimonials/Haley.png`}
                  alt="profile picture"
                />
                <div className="space-y-0.5 font-medium dark:text-white">
                  <div>Haley Nguyen</div>
                  <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Barista
                  </div>
                </div>
              </figcaption>
            </figure>
            {/* Repeat similar structure for other testimonials */}
          </div>
          {/* Testimonial 5 */}
          <div
            ref={ref5}
            className={`space-y-6 opacity-0 ${
              inView5 ? 'animate-float-in' : ''
            }`}
          >
            <figure className="p-6 bg-gray-50 rounded dark:bg-gray-800">
              <Rating className="mb-2">
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  5.0
                </p>
              </Rating>
              <blockquote className="text-sm text-gray-500 dark:text-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  I wasn&apos;t sure what to expect, but I couldn&apos;t be more
                  pleased.
                </h3>
                <p className="my-4">
                  &quot; I had a hard time picking my favorite of those for my
                  christmas card. I feel like this is the perfect use of AI bc
                  it’s pretty difficult to take great photo portraits of
                  animals.&quot;
                </p>
              </blockquote>
              <figcaption className="flex items-center space-x-3">
                <img
                  className="w-9 h-9 rounded-full"
                  src={`${STATIC_ROOT}/testimonials/Jamal.png`}
                  alt="profile picture"
                />
                <div className="space-y-0.5 font-medium dark:text-white">
                  <div>Jamal Thompson</div>
                  <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Photoshop Expert
                  </div>
                </div>
              </figcaption>
            </figure>
            {/* Repeat similar structure for other testimonials */}
          </div>
          {/* Testimonial 6 */}
          <div
            ref={ref6}
            className={`space-y-6 opacity-0 ${
              inView6 ? 'animate-float-in' : ''
            }`}
          >
            <figure className="p-6 bg-gray-50 rounded dark:bg-gray-800">
              <Rating className="mb-2">
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  5.0
                </p>
              </Rating>
              <blockquote className="text-sm text-gray-500 dark:text-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  fun way to create unique photos
                </h3>
                <p className="my-4">
                  &quot;While some of them are a little ridiculous due to the
                  nature of AI, you&apos;ll get a good amount of photos that are
                  awesome. I&apos;m planning to use some of the
                  &quot;cartoon&quot; style photos as wrapping paper for gifts
                  this year.&quot;
                </p>
              </blockquote>
              <figcaption className="flex items-center space-x-3">
                <img
                  className="w-9 h-9 rounded-full"
                  src={`${STATIC_ROOT}/testimonials/Josh.png`}
                  alt="profile picture"
                />
                <div className="space-y-0.5 font-medium dark:text-white">
                  <div>Josh Motak</div>
                  <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                    CTO
                  </div>
                </div>
              </figcaption>
            </figure>
            {/* Repeat similar structure for other testimonials */}
          </div>
          {/* Testimonial 7 */}
          <div
            ref={ref7}
            className={`space-y-6 opacity-0 ${
              inView7 ? 'animate-float-in' : ''
            }`}
          >
            <figure className="p-6 bg-gray-50 rounded dark:bg-gray-800">
              <Rating className="mb-2">
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  5.0
                </p>
              </Rating>
              <blockquote className="text-sm text-gray-500 dark:text-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  The pics are fire!!
                </h3>
                <p className="my-4">
                  &quot;Not all of them are perfect, but so many highlights.
                  I&apos;m excited to get these for all three of my dogs! One of
                  the pics in the drawn style would be so perfect for a custom
                  pillow cover too!&quot;
                </p>
              </blockquote>
              <figcaption className="flex items-center space-x-3">
                <img
                  className="w-9 h-9 rounded-full"
                  src={`${STATIC_ROOT}/testimonials/Liam.png`}
                  alt="profile picture"
                />
                <div className="space-y-0.5 font-medium dark:text-white">
                  <div>Liam O&apos;Malley</div>
                  <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Marketing Professional
                  </div>
                </div>
              </figcaption>
            </figure>
            {/* Repeat similar structure for other testimonials */}
          </div>
          {/* Testimonial 8 */}
          <div
            ref={ref8}
            className={`space-y-6 opacity-0 ${
              inView8 ? 'animate-float-in' : ''
            }`}
          >
            <figure className="p-6 bg-gray-50 rounded dark:bg-gray-800">
              <Rating className="mb-2">
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  5.0
                </p>
              </Rating>
              <blockquote className="text-sm text-gray-500 dark:text-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Got these for my girlfriend, she loved it!
                </h3>
                <p className="my-4">
                  &quot;Process was easy and got it fast. So many good pics.
                  Will be buying more for gifts.&quot;
                </p>
              </blockquote>
              <figcaption className="flex items-center space-x-3">
                <img
                  className="w-9 h-9 rounded-full"
                  src={`${STATIC_ROOT}/testimonials/Alex.png`}
                  alt="profile picture"
                />
                <div className="space-y-0.5 font-medium dark:text-white">
                  <div>Alex Johnson</div>
                  <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                    VFX Artist
                  </div>
                </div>
              </figcaption>
            </figure>
            {/* Repeat similar structure for other testimonials */}
          </div>
          {/* Testimonial 9 */}
          <div
            ref={ref9}
            className={`space-y-6 opacity-0 ${
              inView9 ? 'animate-float-in' : ''
            }`}
          >
            <figure className="p-6 bg-gray-50 rounded dark:bg-gray-800">
              <Rating className="mb-2">
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  5.0
                </p>
              </Rating>
              <blockquote className="text-sm text-gray-500 dark:text-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  This is nuts
                </h3>
                <p className="my-4">
                  &quot;Exceeded all expectations I had.&quot;
                </p>
              </blockquote>
              <figcaption className="flex items-center space-x-3">
                <img
                  className="w-9 h-9 rounded-full"
                  src={`${STATIC_ROOT}/testimonials/Kayla.png`}
                  alt="profile picture"
                />
                <div className="space-y-0.5 font-medium dark:text-white">
                  <div>Kayla Kim</div>
                  <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Influencer
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
