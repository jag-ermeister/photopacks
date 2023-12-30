import React from 'react'
import { Tabs } from 'flowbite-react'
import { STATIC_ROOT } from '../../constants'

function Features() {
  return (
    <section className="bg-white antialiased dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:py-24">
        <div className="flex flex-col gap-8 md:gap-16">
          <Tabs.Group
            style="underline"
            theme={{
              tablist: {
                tabitem: {
                  base: 'flex mx-6 items-center relative justify-center rounded-t-lg p-2 text-sm font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500 focus:outline-none',
                  styles: {
                    pills: {
                      active: {
                        on: 'rounded-lg bg-gray-900 text-gray-900 text-white dark:text-white dark:bg-gray-800',
                        off: 'rounded-lg bg-gray-100 text-gray-500 dark:text-gray-400 dark:bg-gray-800',
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
                  <span className="text-gray-500 dark:text-gray-400 font-medium text-base">
                    Women
                  </span>
                </>
              }
            >
              <div className="flex flex-col md:flex-row md:gap-16">
                <div className="mt-8 space-y-4 sm:space-y-6 lg:space-y-8 md:w-1/2 order-2 md:order-1">
                  <div>
                    <h2 className="text-4xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl">
                      The picture-perfect photo shoot, without the price tag
                    </h2>
                    <p className="mt-4 text-xl md:text-2xl font-normal text-gray-500 dark:text-gray-400 sm:text-xl">
                      Elevate your glow and shine with scenic backdrops,
                      artistic expression, and great lighting.
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
                      href="/packs"
                      title=""
                      className="inline-flex items-center text-base font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Photo Packs
                      <svg
                        aria-hidden="true"
                        className="ml-1.5 h-8 w-8"
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
                <div className="order-1 md:order-2 md:w-1/2 w-full">
                  <img src={`${STATIC_ROOT}/feature_women.png`} alt="" />
                </div>
              </div>
            </Tabs.Item>
            <Tabs.Item
              title={
                <>
                  <span className="text-gray-500 dark:text-gray-400 font-medium text-base">
                    Men
                  </span>
                </>
              }
            >
              <div className="flex flex-col md:flex-row md:gap-16">
                <div className="mt-8 space-y-4 sm:space-y-6 lg:space-y-8 md:w-1/2 order-2 md:order-1">
                  <div>
                    <h2 className="text-4xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl">
                      The picture-perfect photo shoot, without the price tag
                    </h2>
                    <p className="mt-4 text-xl md:text-2xl font-normal text-gray-500 dark:text-gray-400 sm:text-xl">
                      Elevate your glow and shine with scenic backdrops,
                      artistic expression, and great lighting.
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
                      href="/packs"
                      title=""
                      className="inline-flex items-center text-base font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Photo Packs
                      <svg
                        aria-hidden="true"
                        className="ml-1.5 h-8 w-8"
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
                <div className="order-1 md:order-2 md:w-1/2 w-full">
                  <img src={`${STATIC_ROOT}/feature_women.png`} alt="" />
                </div>
              </div>
            </Tabs.Item>
          </Tabs.Group>

          <Tabs.Group
            style="underline"
            theme={{
              tablist: {
                tabitem: {
                  base: 'flex mx-6 items-center relative justify-center rounded-t-lg p-2 text-sm font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500 focus:outline-none',
                  styles: {
                    pills: {
                      active: {
                        on: 'rounded-lg bg-gray-900 text-gray-900 text-white dark:text-white dark:bg-gray-800',
                        off: 'rounded-lg bg-gray-100 text-gray-500 dark:text-gray-400 dark:bg-gray-800',
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
                  <span className="text-gray-500 dark:text-gray-400 font-medium text-base">
                    Dog
                  </span>
                </>
              }
            >
              <div className="flex flex-col md:flex-row md:gap-16">
                <div className="mt-8 space-y-4 sm:space-y-6 lg:space-y-8 md:w-1/2 order-2 md:order-2">
                  <div>
                    <h2 className="text-4xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl">
                      Purr-fectly captured, because your fur baby doesn&apos;t
                      always sit still
                    </h2>
                    <p className="mt-4 text-xl md:text-2xl font-normal text-gray-500 dark:text-gray-400 sm:text-xl">
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
                      href="/packs"
                      title=""
                      className="inline-flex items-center text-base font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Photo Packs
                      <svg
                        aria-hidden="true"
                        className="ml-1.5 h-8 w-8"
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
                <div className="md:w-1/2 w-full order-1 md:order-1">
                  <img src={`${STATIC_ROOT}/feature_cat.png`} alt="" />
                </div>
              </div>
            </Tabs.Item>
            <Tabs.Item
              title={
                <>
                  <span className="text-gray-500 dark:text-gray-400 font-medium text-base">
                    Cat
                  </span>
                </>
              }
            >
              <div className="flex flex-col md:flex-row md:gap-16">
                <div className="mt-8 space-y-4 sm:space-y-6 lg:space-y-8 md:w-1/2 order-2 md:order-2">
                  <div>
                    <h2 className="text-4xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl">
                      Purr-fectly captured, because your fur baby doesn&apos;t
                      always sit still
                    </h2>
                    <p className="mt-4 text-xl md:text-2xl font-normal text-gray-500 dark:text-gray-400 sm:text-xl">
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
                      href="/packs"
                      title=""
                      className="inline-flex items-center text-base font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Photo Packs
                      <svg
                        aria-hidden="true"
                        className="ml-1.5 h-8 w-8"
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
                <div className="md:w-1/2 w-full order-1 md:order-1">
                  <img src={`${STATIC_ROOT}/feature_cat.png`} alt="" />
                </div>
              </div>
            </Tabs.Item>
          </Tabs.Group>
        </div>
      </div>
    </section>
  )
}

export default Features
