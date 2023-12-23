import React from 'react'
import { Accordion } from 'flowbite-react'

function FAQ() {
  return (
    <div className="dark">
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
          <h2 className="mb-6 text-center text-3xl font-extrabold tracking-tight text-secondary-700 dark:text-secondary-700 lg:mb-8 lg:text-6xl">
            FAQ
          </h2>
          <div className="mx-auto max-w-screen-md">
            <Accordion flush>
              <Accordion.Panel>
                <Accordion.Title className="bg-transparent dark:bg-transparent">
                  What photos should I upload?
                </Accordion.Title>
                <Accordion.Content>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    Go for variety. Use photos with good lighting, diverse
                    facial expressions and backgrounds. Photos should be cropped
                    close to your face or body, but don’t cut of a part of your
                    head. High quality photos make for high quality generations.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title className="bg-transparent dark:bg-transparent">
                  What file formats do you accept?
                </Accordion.Title>
                <Accordion.Content>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    We accept jpeg and png file formats.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title className="bg-transparent dark:bg-transparent">
                  What do you do with my data?
                </Accordion.Title>
                <Accordion.Content>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    PhotoPacks.AI will never sell your data. We use your photos
                    to train our AI models to learn about your photo subject.
                    The images you upload and generate are only available to you
                    and will never be shared publicly without your explicit
                    consent. The images that are generated are yours to do with
                    whatever you wish.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title className="bg-transparent dark:bg-transparent">
                  How long does it take?
                </Accordion.Title>
                <Accordion.Content>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    You will receive your photos in 24 hours or less. Often
                    times you will receive your photos much quicker, depending
                    on the capacity of our AI-learning servers.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FAQ
