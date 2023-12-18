import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import BackendClient from '../client/BackendClient'
import { Spinner } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'

function Upload() {
  let { id: orderId } = useParams()
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const navigate = useNavigate()

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm()
  const modelTypes = ['male', 'female', 'dog', 'cat']

  const onSubmit = async (data) => {
    console.log(data)
    setIsUploading(true)
    setUploadError('')

    try {
      const presignedResponse = await BackendClient.getPresignedUrls(
        orderId,
        data.files
      )
      const uploadResponse = await BackendClient.uploadTrainingPhotos(
        presignedResponse,
        data.modelName,
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
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto my-8 p-4"
    >
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Model Name:
        </label>
        <Controller
          name="modelName"
          control={control}
          rules={{ required: 'Model name is required.' }}
          render={({ field }) => (
            <input
              {...field}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          )}
        />
        {errors.modelName && (
          <div className="text-red-500 text-xs italic">
            {errors.modelName.message}
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Model Type:
        </label>
        <Controller
          name="modelType"
          control={control}
          rules={{ required: 'Model type is required.' }}
          render={({ field }) => (
            <div className="flex flex-wrap gap-2">
              {modelTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`py-2 px-4 border rounded ${
                    field.value === type
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200'
                  }`}
                  onClick={() => field.onChange(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          )}
        />
        {errors.modelType && (
          <div className="text-red-500 text-xs italic">
            {errors.modelType.message}
          </div>
        )}
      </div>

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

      <div className="flex justify-center items-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <Spinner />
              <span className="ml-2">Uploading...</span>
            </>
          ) : (
            'Submit'
          )}
        </button>
      </div>

      {uploadError && (
        <div className="text-red-500 text-xs italic my-2">{uploadError}</div>
      )}
    </form>
  )
}

export default Upload
