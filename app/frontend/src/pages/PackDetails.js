import React from 'react'
import { useParams } from 'react-router-dom'
import { usePack } from '../hooks/dataHooks'
import withAuthenticatedLayout from '../components/hoc/withAuthenticatedLayout'
import { STATIC_ROOT } from '../constants'
import { Badge, Button } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'

function PackDetails() {
  let { id } = useParams()
  let navigate = useNavigate()

  const { pack, isLoading, error } = usePack(id)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  const handleBuyClick = () => {
    navigate(`/confirmation/${pack.id}`)
  }

  return (
    <div>
      <div className="dark">
        <section className="bg-white dark:bg-gray-900">
          <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="mr-auto place-self-center lg:col-span-7">
              <div className="flex gap-2 md:gap-4 items-center">
                <div className="text-4xl md:text-6xl font-extrabold tracking-tight text-grey-900 dark:text-white">
                  {pack.display_name}
                </div>
                <Badge color="pink" size="lg">
                  {pack.pack_type}
                </Badge>
              </div>
              <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                These pics are dope.
              </p>
              <Button pill size="lg" onClick={handleBuyClick}>
                Buy Now $9.99
              </Button>
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
              <img
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
                alt="mockup"
              />
            </div>
          </div>
        </section>
      </div>

      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:px-12 sm:text-center lg:py-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            AI Magic in Every Style
          </h2>
          <p className="font-light text-gray-500 sm:text-lg md:px-20 lg:px-38 xl:px-48 dark:text-gray-400">
            We whip up a bunch of different styles, so you&apos;re bound to find
            your perfect match in every photo pack. It&apos;s your own personal
            gallery, curated just for you.
          </p>
          <div className="gap-4 mt-8 grid grid-cols-2 md:grid-cols-5">
            <img
              className="rounded-lg"
              src={`${STATIC_ROOT}/packs/${pack.preview_image}`}
              alt="product image"
            />
            <img
              className="rounded-lg"
              src={`${STATIC_ROOT}/packs/${pack.preview_image}`}
              alt="product image"
            />
            <img
              className="rounded-lg"
              src={`${STATIC_ROOT}/packs/${pack.preview_image}`}
              alt="product image"
            />
            <img
              className="rounded-lg"
              src={`${STATIC_ROOT}/packs/${pack.preview_image}`}
              alt="product image"
            />
            <img
              className="rounded-lg"
              src={`${STATIC_ROOT}/packs/${pack.preview_image}`}
              alt="product image"
            />
            <img
              className="rounded-lg"
              src={`${STATIC_ROOT}/packs/${pack.preview_image}`}
              alt="product image"
            />
            <img
              className="rounded-lg"
              src={`${STATIC_ROOT}/packs/${pack.preview_image}`}
              alt="product image"
            />
            <img
              className="rounded-lg"
              src={`${STATIC_ROOT}/packs/${pack.preview_image}`}
              alt="product image"
            />
            <img
              className="rounded-lg"
              src={`${STATIC_ROOT}/packs/${pack.preview_image}`}
              alt="product image"
            />
            <img
              className="rounded-lg"
              src={`${STATIC_ROOT}/packs/${pack.preview_image}`}
              alt="product image"
            />
            <img
              className="rounded-lg"
              src={`${STATIC_ROOT}/packs/${pack.preview_image}`}
              alt="product image"
            />
            <img
              className="rounded-lg"
              src={`${STATIC_ROOT}/packs/${pack.preview_image}`}
              alt="product image"
            />
            <img
              className="rounded-lg"
              src={`${STATIC_ROOT}/packs/${pack.preview_image}`}
              alt="product image"
            />
            <img
              className="rounded-lg"
              src={`${STATIC_ROOT}/packs/${pack.preview_image}`}
              alt="product image"
            />
            <img
              className="rounded-lg"
              src={`${STATIC_ROOT}/packs/${pack.preview_image}`}
              alt="product image"
            />
            <img
              className="rounded-lg"
              src={`${STATIC_ROOT}/packs/${pack.preview_image}`}
              alt="product image"
            />
            <img
              className="rounded-lg"
              src={`${STATIC_ROOT}/packs/${pack.preview_image}`}
              alt="product image"
            />
            <img
              className="rounded-lg"
              src={`${STATIC_ROOT}/packs/${pack.preview_image}`}
              alt="product image"
            />
            <img
              className="rounded-lg"
              src={`${STATIC_ROOT}/packs/${pack.preview_image}`}
              alt="product image"
            />
            <img
              className="rounded-lg"
              src={`${STATIC_ROOT}/packs/${pack.preview_image}`}
              alt="product image"
            />
          </div>
        </div>
      </section>

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
                  Upload 10-20 images of yourself, a loved one, or a furry
                  friend.
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
                  Sit back and relax while our AI learns the unique charms of
                  your chosen subject and generates one-of-a-kind images.
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
                  In ~ 6 hours, your images will be ready to post, share, print,
                  or turn into treasures. We&apos;ll notify you!
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="bg-secondary-600 dark:bg-gray-900">
        <div className="flex flex-col md:flex-row gap-6 w-full justify-between mx-auto max-w-screen-xl px-4 py-8 md:py-24 sm:py-24 lg:px-6 items-center">
          <div className="flex flex-col gap-2">
            <h2 className="leading-tight text-xl md:text-4xl font-light">
              Upgrade to Extraordinary with
            </h2>
            <div className="flex gap-2 md:gap-4 items-center">
              <div className="text-4xl md:text-6xl font-extrabold tracking-tight text-grey-900">
                {pack.display_name}
              </div>
              <Badge color="dark" size="lg">
                {pack.pack_type}
              </Badge>
            </div>
          </div>
          <Button pill size="lg" onClick={handleBuyClick}>
            Buy Now $9.99
          </Button>
        </div>
      </section>
    </div>
  )
}

export default withAuthenticatedLayout(PackDetails, true)
