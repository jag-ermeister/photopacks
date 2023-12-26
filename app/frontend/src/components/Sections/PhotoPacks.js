import React, { useState } from 'react'
import PhotoPackCard from '../Cards/PhotoPackCard'
import { usePacks } from '../../hooks/dataHooks'
import { Tabs } from 'flowbite-react'

function PhotoPacks() {
  let tabMap = new Map()
  tabMap.set(0, 'All')
  tabMap.set(1, 'Man')
  tabMap.set(2, 'Woman')
  tabMap.set(3, 'Dog')
  tabMap.set(4, 'Cat')

  const { promptPacks, isLoading, error } = usePacks()
  const [selectedTab, setSelectedTab] = useState('All')

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  const filteredPacks = promptPacks.filter((pack) => {
    if (selectedTab === 'All') return promptPacks
    return pack.pack_type === selectedTab
  })

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
        <div className="mb-8 lg:mb-16">
          <div className="flex justify-between">
            <h2 className="mb-4 text-6xl font-extrabold tracking-tight text-primary-700 dark:text-white">
              {'Photo Packs'.toUpperCase()}
            </h2>
            <Tabs.Group
              onActiveTabChange={(tabNumber) => {
                setSelectedTab(tabMap.get(tabNumber))
              }}
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
                      All
                    </span>
                  </>
                }
              />
              <Tabs.Item
                active
                title={
                  <>
                    <span className="text-gray-500 dark:text-gray-400 font-medium text-base">
                      Men
                    </span>
                  </>
                }
              />
              <Tabs.Item
                active
                title={
                  <>
                    <span className="text-gray-500 dark:text-gray-400 font-medium text-base">
                      Women
                    </span>
                  </>
                }
              />
              <Tabs.Item
                active
                title={
                  <>
                    <span className="text-gray-500 dark:text-gray-400 font-medium text-base">
                      Dog
                    </span>
                  </>
                }
              />
              <Tabs.Item
                active
                title={
                  <>
                    <span className="text-gray-500 dark:text-gray-400 font-medium text-base">
                      Cat
                    </span>
                  </>
                }
              />
            </Tabs.Group>
          </div>
          <p className="text-gray-500 dark:text-gray-400 sm:text-xl">
            100 images in each pack. One time payment. No subscription.
          </p>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-3">
          {filteredPacks.map((pack) => (
            <PhotoPackCard key={pack.id} pack={pack} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PhotoPacks
