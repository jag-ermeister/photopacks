import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import BackendClient from '../client/BackendClient'
import { Button, Card, Spinner } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'
import withAuthenticatedLayout from '../components/hoc/withAuthenticatedLayout'
import { STATIC_ROOT } from '../constants'
import { HiOutlineArrowUp } from 'react-icons/hi'

function Upload() {
  let { id: orderId } = useParams()
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [selectedFiles, setSelectedFiles] = useState([])
  const navigate = useNavigate()

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm()

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
        navigate('/orders')
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

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files)
    setValue('files', files)
    setSelectedFiles(files)
  }

  const renderImagePreviews = () => {
    return selectedFiles.map((file, index) => (
      <div key={index} className="col-span-1">
        <img
          className="h-auto max-w-full rounded-lg"
          src={URL.createObjectURL(file)}
          alt={`preview ${index}`}
        />
      </div>
    ))
  }

  return (
    <div>
      {' '}
      <h2 className="mb-4 leading-none text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
        {'Upload Your Photos'.toUpperCase()}
      </h2>
      <div>Order #{orderId}</div>
      <div className="flex justify-center gap-4">
        <Card className="max-w-sm" imgSrc="/images/blog/image-4.jpg" horizontal>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Christmas
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            100 image pack
          </p>
        </Card>
        <Card className="max-w-sm" imgSrc="/images/blog/image-4.jpg" horizontal>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Christmas
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            100 image pack
          </p>
        </Card>
      </div>
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 py-8 text-center sm:py-16 lg:px-6">
          <h4 className="mb-4 text-5xl font-extrabold tracking-tight ">
            Choose the right photos
          </h4>
          <div className="mb-8 mt-8 space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0">
            <div>
              <div className="mb-6 inline-flex gap-4 h-24 w-24 items-center justify-center rounded-lg">
                <img
                  className="pt-8 pb-2 rounded-t-lg"
                  src={`${STATIC_ROOT}/tips/tips_good_1.jpg`}
                  alt="product image"
                />
                <img
                  className="pt-8 pb-2 rounded-t-lg"
                  src={`${STATIC_ROOT}/tips/tips_good_2.jpg`}
                  alt="product image"
                />
                <img
                  className="pt-8 pb-2 rounded-t-lg"
                  src={`${STATIC_ROOT}/tips/tips_good_3.jpg`}
                  alt="product image"
                />
                <img
                  className="pt-8 pb-2 rounded-t-lg"
                  src={`${STATIC_ROOT}/tips/tips_good_4.jpg`}
                  alt="product image"
                />
              </div>
              <h3 className="mb-4 text-2xl font-bold dark:text-white">
                Good Photos
              </h3>
              <p className="mb-4">
                Provide many headshots and several full-body shots. Photos
                should be fairly high resolution, well lit, and from a variety
                of angles.
              </p>
            </div>
            <div>
              <div className="mb-6 inline-flex gap-4 h-24 w-24 items-center justify-center rounded-lg">
                <img
                  className="pt-8 pb-2 rounded-t-lg"
                  src={`${STATIC_ROOT}/tips/tips_bad_1.jpg`}
                  alt="product image"
                />
                <img
                  className="pt-8 pb-2 rounded-t-lg"
                  src={`${STATIC_ROOT}/tips/tips_bad_2.jpg`}
                  alt="product image"
                />
                <img
                  className="pt-8 pb-2 rounded-t-lg"
                  src={`${STATIC_ROOT}/tips/tips_bad_3.jpg`}
                  alt="product image"
                />
                <img
                  className="pt-8 pb-2 rounded-t-lg"
                  src={`${STATIC_ROOT}/tips/tips_bad_4.jpg`}
                  alt="product image"
                />
              </div>
              <h3 className="mb-4 text-2xl font-bold dark:text-white">
                Bad Photos
              </h3>
              <p className="mb-4">
                Do not use photos with other people! Also avoid photos with
                harsh shadows, sunglasses, poor color contrast, and partial faces.
              </p>
            </div>
          </div>
        </div>
      </section>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto my-8 p-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Upload Photos:
          </label>
          <Controller
            name="files"
            control={control}
            rules={{
              required: 'Please upload photos.',
              validate: (files) =>
                (files?.length >= 5 && files?.length <= 10) ||
                'Please select between 5 and 10 photos.',
            }}
            render={() => (
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300"
              />
            )}
          />
          {errors.files && (
            <div className="text-red-500 text-xs italic">
              {errors.files.message}
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {renderImagePreviews()}
        </div>

        <section className="bg-white dark:bg-gray-900">
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

        <div className="flex justify-center items-center">
          <Button type="submit" pill color="info" disabled={isUploading}>
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
