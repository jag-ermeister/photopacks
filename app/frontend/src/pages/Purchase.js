import React from 'react'
import BackendClient from '../client/BackendClient'
import { useParams } from 'react-router-dom'
import { usePack } from '../hooks/dataHooks'
import withAuthenticatedLayout from '../components/hoc/withAuthenticatedLayout'
import { Button, Badge, Card, Alert } from 'flowbite-react'
import { HiInformationCircle, HiOutlineArrowRight } from 'react-icons/hi'
import PhotoPacks from '../components/Sections/PhotoPacks'

function Purchase() {
  let { id } = useParams()

  const { pack, isLoading, error } = usePack(id)

  console.log(pack)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  const handleButtonClick = async () => {
    try {
      const order = await BackendClient.createOrder({
        subject_name: 'test',
        prompt_pack: id,
        model_type: 'man',
      })
      await BackendClient.checkout(order.id)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="flex flex-col gap-12 mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
          <div className="flex align-top justify-between">
            <div className="flex gap-6">
              <div className="leading-none text-6xl font-extrabold">
                YOUR ORDER
              </div>
              <Badge color="info" size="lg" className="mt-2">
                Poop
              </Badge>
            </div>
            <Button pill onClick={handleButtonClick} color="info">
              Proceed to payment
              <HiOutlineArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between leading-none text-3xl font-bold">
              <div>Summary</div>
              <div>Total $9.99</div>
            </div>
            <Card
              className="max-w-full md:max-w-full"
              imgSrc="/images/blog/image-4.jpg"
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
                    Christmas
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
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900">
        <div className="flex flex-col gap-12 mx-auto max-w-screen-xl px-4 pb-8 pt-0 sm:pb-16 sm:pt-0 lg:px-6">
          <div className="flex flex-col gap-6">
            <div className="leading-tight text-4xl font-bold">
              SAME DOG,{' '}
              <span className="text-primary-700">MORE PACKS, MORE SAVINGS</span>
            </div>
            <div className="text-3xl font-normal">
              <div>Add a Pack for the Same Dog for ONLY $1 MILLION</div>
              <div>Additional Packs, Priced at Just $4.99 Each</div>
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
          </div>
          <PhotoPacks />
        </div>
      </section>
    </>
  )
}

export default withAuthenticatedLayout(Purchase, false)
