import React from 'react'
import { Button, Tabs } from 'flowbite-react'
import { STATIC_ROOT } from '../../constants'

function Features() {
  return (
    <section className="bg-white antialiased dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:py-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <Tabs.Group
            style="underline"
            theme={{
              tablist: {
                tabitem: {
                  base: 'flex mx-6 items-center relative justify-center rounded-t-lg p-2 text-sm font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500 focus:ring-4 focus:ring-gray-300 focus:outline-none',
                  styles: {
                    pills: {
                      active: {
                        on: '!ring-0 rounded-lg bg-gray-900 text-gray-900 text-white dark:text-white dark:bg-gray-800',
                        off: '!ring-0 rounded-lg bg-gray-100 text-gray-500 dark:text-gray-400 dark:bg-gray-800',
                      },
                    },
                  },
                },
              },
            }}
          >
            <Tabs.Item
              active
              title={
                <>
                  <span className="absolute -bottom-8 text-gray-500 dark:text-gray-400 font-medium text-base">
                    Women
                  </span>
                </>
              }
            >
              <div className="mt-8 space-y-4 sm:space-y-6 lg:space-y-8">
                <div>
                  <h2 className="text-4xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl">
                    The picture-perfect photo shoot, without the price tag
                  </h2>
                  <p className="mt-4 text-2xl font-normal text-gray-500 dark:text-gray-400 sm:text-xl">
                    Elevate your glow and shine with scenic backdrops, artistic
                    expression, and great lighting.
                  </p>
                </div>
                <div className="border-t border-gray-200 pt-4 dark:border-gray-800 sm:pt-6 lg:pt-8">
                  <ul className="space-y-4">
                    <li className="flex items-center gap-2.5">
                      <div className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-500">
                        <svg
                          aria-hidden="true"
                          className="h-3.5 w-3.5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-base font-medium text-gray-900 dark:text-white">
                        Profile photos and personal branding
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <div className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-500">
                        <svg
                          aria-hidden="true"
                          className="h-3.5 w-3.5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-base font-medium text-gray-900 dark:text-white">
                        Professional headshots
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <div className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-500">
                        <svg
                          aria-hidden="true"
                          className="h-3.5 w-3.5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-base font-medium text-gray-900 dark:text-white">
                        Dating profiles
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <a
                    href="#"
                    title=""
                    className="inline-flex items-center text-base font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Photo Packs
                    <svg
                      aria-hidden="true"
                      className="ml-1.5 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </Tabs.Item>
            <Tabs.Item
              title={
                <>
                  <span className="absolute -bottom-8 text-gray-500 dark:text-gray-400 font-medium text-base">
                    Men
                  </span>
                </>
              }
            >
              <div className="mt-8 space-y-4 sm:space-y-6 lg:space-y-8">
                <div>
                  <h2 className="text-3xl font-extrabold leading-tight text-gray-900 dark:text-white sm:text-4xl">
                    Flowbite in Android: Take control of your finances with us
                  </h2>
                  <p className="mt-4 text-base font-normal text-gray-500 dark:text-gray-400 sm:text-xl">
                    Our app helps users easily track their expenses and create a
                    budget. With a user-friendly interface, the app allows users
                    to quickly input their income and expenses, and then
                    automatically categorizes them for easy tracking.
                  </p>
                </div>
                <div className="border-t border-gray-200 pt-4 dark:border-gray-800 sm:pt-6 lg:pt-8">
                  <ul className="space-y-4">
                    <li className="flex items-center gap-2.5">
                      <div className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-500">
                        <svg
                          aria-hidden="true"
                          className="h-3.5 w-3.5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-base font-medium text-gray-900 dark:text-white">
                        Seamless integration with Android Studio
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <div className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-500">
                        <svg
                          aria-hidden="true"
                          className="h-3.5 w-3.5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-base font-medium text-gray-900 dark:text-white">
                        Deployments with a click of a button
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <div className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-500">
                        <svg
                          aria-hidden="true"
                          className="h-3.5 w-3.5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-base font-medium text-gray-900 dark:text-white">
                        Lightning fast performance
                      </span>
                    </li>
                  </ul>
                  <h3 className="mt-6 text-xl font-normal text-gray-500 dark:text-gray-400">
                    Flowbite takes the hassle out of budgeting and empowers
                    users to take control of their finances.
                  </h3>
                </div>
                <div>
                  <a
                    href="#"
                    title=""
                    className="inline-flex items-center text-base font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Check out the Android app features
                    <svg
                      aria-hidden="true"
                      className="ml-1.5 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </Tabs.Item>
          </Tabs.Group>
          <div className="hidden lg:block">
            <img src={`${STATIC_ROOT}/feature_women.png`} alt="" />
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-8 lg:mt-20 lg:grid-cols-2 lg:gap-16">
          <div className="hidden lg:block">
            <img src={`${STATIC_ROOT}/feature_cat.png`} alt="" />
          </div>
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            <div>
              <h2 className="text-4xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl">
                Purr-fectly captured, because your fur baby doesn&apos;t always
                sit still
              </h2>
              <p className="mt-4 text-2xl font-normal text-gray-500 dark:text-gray-400 sm:text-xl">
                Let our tech handle the lively antics and turn them into
                timeless treasures.
              </p>
            </div>
            <div className="border-t border-gray-200 pt-4 dark:border-gray-800 sm:pt-6 lg:pt-8">
              <ul className="space-y-4">
                <li className="flex items-center gap-2.5">
                  <div className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-500">
                    <svg
                      aria-hidden="true"
                      className="h-3.5 w-3.5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-base font-medium text-gray-900 dark:text-white">
                    Art prints
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-500">
                    <svg
                      aria-hidden="true"
                      className="h-3.5 w-3.5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-base font-medium text-gray-900 dark:text-white">
                    Unique gifts
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-500">
                    <svg
                      aria-hidden="true"
                      className="h-3.5 w-3.5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-base font-medium text-gray-900 dark:text-white">
                    Holiday cards
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-500">
                    <svg
                      aria-hidden="true"
                      className="h-3.5 w-3.5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-base font-medium text-gray-900 dark:text-white">
                    One-of-a-kind decor
                  </span>
                </li>
              </ul>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="#"
                title=""
                className="inline-flex items-center text-base font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Photo Packs
                <svg
                  aria-hidden="true"
                  className="ml-1.5 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
