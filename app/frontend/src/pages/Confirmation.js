import React, { useState } from 'react'
import BackendClient from '../client/BackendClient'
import { useParams } from 'react-router-dom'
import { usePacks } from '../hooks/dataHooks'
import withAuthenticatedLayout from '../components/hoc/withAuthenticatedLayout'
import { Button, Badge, Card, Alert } from 'flowbite-react'
import {
  HiInformationCircle,
  HiOutlineArrowRight,
  HiMinusCircle,
} from 'react-icons/hi'
import { STATIC_ROOT } from '../constants'
import ConfirmationPhotoPacks from '../components/Sections/ConfirmationPhotoPacks'

function Confirmation() {
  let { id } = useParams()
  const [addedPacks, setAddedPacks] = useState([])
  const { promptPacks, isLoading, error } = usePacks()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  const mainPack = promptPacks.find((pack) => pack.id === id)
  const addablePacks = promptPacks.filter((pack) => {
    return (
      pack.id !== id &&
      !addedPacks.includes(pack) &&
      pack.pack_type === mainPack.pack_type
    )
  })

  const totalCost = 9.99 + 4.99 * addedPacks.length

  const handleBuyClicked = (packToBuy) => {
    if (addedPacks.length >= 4) {
      return
    }
    const isDuplicate =
      addedPacks.some((extraPack) => extraPack.id === packToBuy.id) ||
      packToBuy.id === mainPack.id
    if (!isDuplicate) {
      setAddedPacks([...addedPacks, packToBuy])
    }
  }

  const handleRemoveClicked = (packToRemove) => {
    const updatedPacks = addedPacks.filter(
      (pack) => pack.id !== packToRemove.id
    )
    setAddedPacks(updatedPacks)
  }

  const handleButtonClick = async () => {
    try {
      let orderData = {
        prompt_pack_1: id,
        model_type: mainPack.pack_type.toLowerCase(),
      }

      addedPacks.forEach((pack, index) => {
        const key = `prompt_pack_${index + 2}`
        orderData[key] = pack.id
      })

      const order = await BackendClient.createOrder(orderData)
      await BackendClient.checkout(order.id)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <section className="bg-white dark:bg-gray-900 my-8">
        <div className="flex flex-col gap-12 mx-auto max-w-screen-xl px-4 md:py-16 sm:py-16 lg:px-6">
          <div className="flex  flex-col md:flex-row align-center justify-between">
            <div className="flex gap-2 md:gap-6">
              <div className="leading-none text-4xl md:text-6xl font-extrabold">
                YOUR ORDER
              </div>
              <Badge color="info" size="lg" className="mt-0 md:mt-2">
                {mainPack.pack_type}
              </Badge>
            </div>
            <div className="h-auto mt-4 md:mt-0">
              <Button pill size="lg" onClick={handleButtonClick} color="info">
                Proceed to payment
                <HiOutlineArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between leading-none text-3xl font-bold">
              <div>Summary</div>
              <div>Total ${totalCost}</div>
            </div>
            <Card
              className="max-w-full md:max-w-full flex items-center"
              imgSrc={`${STATIC_ROOT}/packs/${mainPack.preview_image}`}
              theme={{
                root: {
                  children:
                    'flex h-full flex-col justify-center gap-4 p-6  w-full',
                },
              }}
              horizontal
            >
              <div className="flex justify-between w-full">
                <div className="w-full">
                  <h5 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {mainPack.display_name}
                  </h5>
                  <p className="font-normal text-gray-500 dark:text-gray-400">
                    100 image pack
                  </p>
                </div>
                <div className="leading-tight text-2xl font-bold my-auto">
                  $9.99
                </div>
              </div>
            </Card>
            {addedPacks.map((pack) => (
              <Card
                className="max-w-full md:max-w-full"
                key={pack.id}
                imgSrc={`${STATIC_ROOT}/packs/${pack.preview_image}`}
                theme={{
                  root: {
                    children:
                      'flex h-full flex-col justify-center gap-4 p-6  w-full',
                  },
                }}
                horizontal
              >
                <div className="flex justify-between w-full">
                  <div className="w-full">
                    <h5 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {pack.display_name}
                    </h5>
                    <p className="font-normal text-gray-500 dark:text-gray-400">
                      100 image pack
                    </p>
                    <Button
                      onClick={() => handleRemoveClicked(pack)}
                      pill
                      outline
                      color="light"
                      className="mt-4"
                      theme={{
                        color: {
                          custom:
                            'text-primary-700 bg-white border border-primary-200 enabled:hover:bg-primary-50 enabled:hover:text-cyan-700 :ring-cyan-700 focus:text-cyan-700 dark:bg-transparent dark:text-gray-400 dark:border-gray-600 dark:enabled:hover:text-white dark:enabled:hover:bg-gray-700 focus:ring-2',
                        },
                      }}
                    >
                      Remove
                      <HiMinusCircle className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                  <div className="leading-tight text-2xl font-bold my-auto">
                    <div>
                      <s>$9.99</s>&nbsp;$4.99
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8 mx-auto max-w-screen-xl px-4 pb-8 pt-0 sm:pb-16 sm:pt-0 lg:px-6">
          <div className="flex flex-col gap-6">
            <div className="leading-tight text-4xl font-bold">
              SAME {mainPack.pack_type.toUpperCase()},{' '}
              <span className="text-primary-700">MORE PACKS, MORE SAVINGS</span>
            </div>
            <div className="flex flex-col gap-2 text-2xl md:text-3xl font-normal">
              <div>
                Add a 2nd Pack for the Same {mainPack.pack_type} for{' '}
                <span className="text-primary-700">ONLY $1 MILLION</span>
              </div>
              <div>
                The 3rd, 4th, and 5th Packs are Just $4.99 Each
                <span className="text-primary-700">$4.99 Each</span>
              </div>
            </div>
            <Alert
              color="warning"
              icon={HiInformationCircle}
              additionalContent={
                <div>
                  You&apos;ll upload a single set of photos of one animal and
                  we&apos;ll generate all the photo packs for that subject. For
                  packs featuring a different animal, please make a separate
                  purchase.
                </div>
              }
            >
              Each Added Pack Features the Same Subject
            </Alert>
            <div className="flex flex-col gap-0">
              <div className="font-extrabold font-capitalize text-primary-700 text-2xl">
                MORE PACKS YOU&apos;ll LOVE
              </div>
              <ConfirmationPhotoPacks
                promptPacks={addablePacks}
                handleBuyClicked={handleBuyClicked}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default withAuthenticatedLayout(Confirmation, false)
