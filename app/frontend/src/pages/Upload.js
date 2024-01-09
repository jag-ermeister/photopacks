import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import BackendClient from '../client/BackendClient'
import { Badge, Button, Spinner } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'
import withAuthenticatedLayout from '../components/hoc/withAuthenticatedLayout'
import { STATIC_ROOT } from '../constants'
import { HiOutlineArrowUp, HiOutlineTrash } from 'react-icons/hi'
import { useOrder } from '../hooks/dataHooks'
import PackThumbnailCard from '../components/Cards/PackThumbnailCard'

function Upload() {
  let { id: orderId } = useParams()
  const { order, isLoading, error } = useOrder(orderId)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [selectedFiles, setSelectedFiles] = useState([])
  const [isDragging, setIsDragging] = useState(false)

  const navigate = useNavigate()
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm()

  const fileErrorRef = useRef(null)
  useEffect(() => {
    if (errors.files) {
      const element = fileErrorRef.current
      if (element) {
        const elementRect = element.getBoundingClientRect()
        const absoluteElementTop = elementRect.top + window.pageYOffset
        const middle = absoluteElementTop - window.innerHeight / 2

        window.scrollTo({
          top: middle,
          behavior: 'smooth',
        })
      }
    }
  }, [errors.files])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  const packs = [
    order.prompt_pack_1,
    order.prompt_pack_2,
    order.prompt_pack_3,
    order.prompt_pack_4,
    order.prompt_pack_5,
  ].filter((pack) => pack !== undefined && pack !== null)

  const onSubmit = async (data) => {
    setIsUploading(true)
    setUploadError('')

    try {
      const presignedResponse = await BackendClient.getPresignedUrls(
        orderId,
        data.files
      )
      const uploadResponse = await BackendClient.uploadTrainingPhotos(
        presignedResponse,
        data.files
      )
      const allResponsesOk = uploadResponse.every((response) => response.ok)

      if (allResponsesOk) {
        await BackendClient.updateOrder(orderId, presignedResponse)
        navigate(`/orders?success_order=${orderId}`)
      } else {
        setUploadError('Some or all files failed to upload')
      }
    } catch (error) {
      console.error('Upload error:', error)
      setUploadError('An error occurred during the upload.')
    } finally {
      setIsUploading(false)
    }
  }

  const processFiles = (newFiles) => {
    const updatedFiles = [...selectedFiles, ...newFiles]
    setValue('files', updatedFiles)
    setSelectedFiles(updatedFiles)
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    // This is required. I need this here to prevent the browser from opening the file in another tab automatically.
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragging(false)
    const files = Array.from(event.dataTransfer.files)
    processFiles(files)
  }

  const handleDragEnter = (event) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (event) => {
    event.preventDefault()
    setIsDragging(false)
  }

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files)
    processFiles(files)
  }

  const removeFile = (fileToRemove) => {
    setSelectedFiles(selectedFiles.filter((file) => file !== fileToRemove))
  }

  const renderImagePreviews = () => {
    return selectedFiles.map((file, index) => (
      <div key={index} className="relative col-span-1">
        <img
          className="h-auto max-w-full rounded-lg"
          src={URL.createObjectURL(file)}
          alt={`preview ${index}`}
        />
        <button
          onClick={() => removeFile(file)}
          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 m-1"
        >
          <HiOutlineTrash className="h-5 w-5" />
        </button>
      </div>
    ))
  }

  return (
    <div className="my-8 md:my-24 flex flex-col gap-8 md:gap-12 w-full">
      <div className="flex flex-col md:flex-row items-center justify-center mx-auto max-w-screen-xl mx-8">
        <div className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white text-center md:text-left mb-4 md:mb-0">
          {'Upload Your Photos'.toUpperCase()}&nbsp;&nbsp;
        </div>
        <Badge color="info" size="lg">
          {order.model_type}
        </Badge>
      </div>
      <div>
        <div className="text-center text-lg font-medium mb-4">
          Order #{order.display_id}
        </div>
        <div className="flex justify-center gap-4">
          {packs.map((pack) => (
            <PackThumbnailCard pack={pack} key={pack.id} />
          ))}
        </div>
      </div>

      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 py-8 text-center sm:py-16 lg:px-6">
          <h4 className="mb-8 md:mb-16 text-3xl md:text-4xl font-bold tracking-tight ">
            Choose the right photos
          </h4>
          <div className="my-8 space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0">
            <div>
              <div className="mb-6 inline-flex gap-4 h-24 w-24 items-center justify-center rounded-lg">
                <img
                  className="rounded-lg"
                  src={`${STATIC_ROOT}/tips/tips_good_1.jpg`}
                  alt="product image"
                />
                <img
                  className="rounded-lg"
                  src={`${STATIC_ROOT}/tips/tips_good_2.jpg`}
                  alt="product image"
                />
                <img
                  className="rounded-lg"
                  src={`${STATIC_ROOT}/tips/tips_good_3.jpg`}
                  alt="product image"
                />
                <img
                  className="rounded-lg"
                  src={`${STATIC_ROOT}/tips/tips_good_4.jpg`}
                  alt="product image"
                />
              </div>
              <h3 className="mb-2 md:mb-4 text-xl md:text-2xl font-bold dark:text-white">
                Good Photos
              </h3>
              <p className="mb-4 text-gray-500">
                Provide many headshots and several full-body shots. Photos
                should be fairly high resolution, well lit, and from a variety
                of angles. The subject should we wearing a variety of clothing
                in a variety of backgrounds.
              </p>
            </div>
            <div>
              <div className="mb-6 inline-flex gap-4 h-24 w-24 items-center justify-center rounded-lg">
                <img
                  className="rounded-lg"
                  src={`${STATIC_ROOT}/tips/tips_bad_1.jpg`}
                  alt="product image"
                />
                <img
                  className="rounded-lg"
                  src={`${STATIC_ROOT}/tips/tips_bad_2.jpg`}
                  alt="product image"
                />
                <img
                  className="rounded-lg"
                  src={`${STATIC_ROOT}/tips/tips_bad_3.jpg`}
                  alt="product image"
                />
                <img
                  className="rounded-lg"
                  src={`${STATIC_ROOT}/tips/tips_bad_4.jpg`}
                  alt="product image"
                />
              </div>
              <h3 className="mb:2 md:mb-4 text-xl md:text-2xl font-bold dark:text-white">
                Bad Photos
              </h3>
              <p className="mb-4 text-gray-500">
                Do not use photos with other people! Also avoid photos with
                harsh shadows, sunglasses, poor color contrast, and partial
                faces.
              </p>
            </div>
          </div>
        </div>
      </section>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-8 md:my-8 md:p-4">
        <div className="mb-8 md:mb-16 mx-4 text-center">
          <label className="block text-primary-700 text-4xl font-bold mb-8">
            Upload 10 Photos
          </label>

          <Controller
            name="files"
            control={control}
            rules={{
              required: 'Please upload photos.',
              validate: (files) =>
                files?.length === 10 || 'Please select 10 photos.',
            }}
            render={() => (
              <>
                <label
                  htmlFor="file-upload"
                  className={`flex flex-col max-w-screen-xl mx-auto items-center justify-center w-full h-64 border-2 ${
                    isDragging
                      ? 'border-blue-500 bg-blue-100'
                      : 'border-gray-300 bg-gray-50'
                  } rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600`}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-primary-600 dark:text-gray-400">
                      <span className="font-semibold">
                        Click or drag to upload
                      </span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PNG or JPG
                    </p>
                  </div>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
              </>
            )}
          />
          <div className="text-sm text-gray-500 mt-2">
            {selectedFiles.length === 0
              ? 'No photos selected'
              : `${selectedFiles.length} photo(s) selected`}
          </div>
          {errors.files && (
            <div ref={fileErrorRef} className="text-red-500 text-lg italic">
              {errors.files.message}
            </div>
          )}
        </div>

        <section className="max-w-screen-xl mx-auto my-8 md:my-16">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mx-4 gap-y-4">
            {renderImagePreviews()}
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="bg-white rounded-lg shadow lg:griddark:bg-gray-800">
              <div className="col-span-2 p-6 lg:p-8">
                <h2 className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">
                  Give it a once over
                </h2>
                <p className="text-lg font-light text-gray-500 dark:text-gray-400">
                  Once you upload your photos, the AI magic kicks off and
                  can&apos;t be stopped.
                </p>
                <div className="grid gap-4 mt-4 lg:mt-6">
                  <ul role="list" className="space-y-4 dark:text-white">
                    <li className="flex space-x-2.5">
                      <img
                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                        src={`${STATIC_ROOT}/icons/circle-check.svg`}
                        alt="product image"
                      />
                      <span className="leading-tight text-gray-500 dark:text-gray-400">
                        Photos are of ONE animal or person ONLY and do not
                        include any other animals or people
                      </span>
                    </li>
                    <li className="flex space-x-2.5">
                      <img
                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                        src={`${STATIC_ROOT}/icons/circle-check.svg`}
                        alt="product image"
                      />
                      <span className="leading-tight text-gray-500 dark:text-gray-400">
                        Photos are include a variety of expression and
                        backgrounds with good lighting
                      </span>
                    </li>
                    <li className="flex space-x-2.5">
                      <img
                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                        src={`${STATIC_ROOT}/icons/circle-check.svg`}
                        alt="product image"
                      />
                      <span className="leading-tight text-gray-500 dark:text-gray-400">
                        The subject is an animal or person over the age of 18
                        who has given their permission
                      </span>
                    </li>
                    <li className="flex space-x-2.5">
                      <img
                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                        src={`${STATIC_ROOT}/icons/circle-check.svg`}
                        alt="product image"
                      />
                      <span className="leading-tight text-gray-500 dark:text-gray-400">
                        Photos are closely cropped to the subject and don’t crop
                        part of the subjects face
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="flex items-center mb-3">
            <Controller
              name="affirmation"
              control={control}
              rules={{ required: 'You must affirm before submitting.' }}
              render={({ field }) => (
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  {...field}
                />
              )}
            />
            <label
              htmlFor="affirmation"
              className="ml-2 text-sm font-medium text-gray-700"
            >
              I affirm that:
            </label>
            {errors.affirmation && (
              <div className="text-red-500 text-xs italic ml-2">
                {errors.affirmation.message}
              </div>
            )}
          </div>

          <ul className="list-disc pl-5 font-normal text-sm text-gray-700 flex flex-col gap-2 ml-4">
            <li>I have read the tips and warnings above;</li>
            <li>
              I have read and agree to the PhotoPacks.AI Terms and Conditions;
            </li>
            <li>
              The content uploaded is an animal or a natural person over the age
              of 18;
            </li>
            <li>
              The content uploaded does not infringe on the privacy or
              intellectual property rights of any third party;
            </li>
            <li>
              We use and manage your personal information in accordance with our
              Privacy Policy.
            </li>
          </ul>
        </section>

        <div className="max-w-screen-xl mx-auto px-6">
          <Button
            type="submit"
            pill
            color="info"
            size="lg"
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <Spinner />
                <span className="ml-2">Uploading...</span>
              </>
            ) : (
              <>
                Upload My Photos <HiOutlineArrowUp className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>

        {uploadError && (
          <div className="text-red-500 text-xs italic my-2">{uploadError}</div>
        )}
      </form>
    </div>
  )
}

export default withAuthenticatedLayout(Upload, false)
