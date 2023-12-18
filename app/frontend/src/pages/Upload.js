import React, { useState } from 'react'
import BackendClient from '../client/BackendClient'
import SelectPhotosButton from '../components/Buttons/SelectPhotoButton'
import PrimaryButton from '../components/Buttons/PrimaryButton'
import { useParams } from 'react-router-dom'

/*
This page should allow the user to upload images and then they will be redirected to the orders page
 */
function Upload() {
  let { id: orderId } = useParams()

  const [selectedModelType, setSelectedModelType] = useState(null)
  const [selectedImages, setSelectedImages] = useState([])
  const [modelNameError, setModelNameError] = useState('')
  const [selectedImageCount, setSelectedImageCount] = useState(0)

  const [imagesError, setImagesError] = useState('')
  const [selectedModelTypeError, setSelectedModelTypeError] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadFailureMessage, setUploadFailureMessage] = useState('')

  console.log(imagesError)
  console.log(isUploading)

  const validateModelName = (model_name) => {
    if (!model_name) {
      setModelNameError('Model name cannot be empty')
      return false
    } else {
      setModelNameError('')
      return true
    }
  }

  const validateImages = (images) => {
    if (images.length !== 10) {
      setImagesError('Please upload 10 images')
      return false
    } else {
      setImagesError('')
      return true
    }
  }

  const validateModelType = (selectedModelType) => {
    if (!selectedModelType) {
      setSelectedModelTypeError(true)
      return false
    } else {
      setImagesError(null)
      return true
    }
  }
  const handleModelNameChange = (event) => {
    validateModelName(event.target.value)
  }

  const handleImagesChange = (event) => {
    const files = event.target.files
    validateImages(event.target.files)
    setSelectedImages(files)
    setSelectedImageCount(files.length)

    if (files.length > 0) {
      const fileReader = new FileReader()
      fileReader.onload = (e) => {
        //setThumbnailUrl(e.target.result);
        console.log(e)
      }
      fileReader.readAsDataURL(files[0])
    } else {
      //setThumbnailUrl(null);
    }
  }

  const handleSubmit = async (event) => {
    console.log('!!!!!!!!!!!!!!!!!!')
    event.preventDefault()

    const model_name = event.target.elements.model_name.value
    const images = selectedImages

    const isModelNameValid = validateModelName(model_name)
    console.log('model name is good')
    const isImagesValid = validateImages(images)
    console.log('images are good')
    const isModelTypeValid = validateModelType(selectedModelType)
    console.log('model type is good')

    if (!isModelNameValid || !isImagesValid || !isModelTypeValid) {
      return
    }

    setIsUploading(true)
    try {
      const presignedResponse = await BackendClient.getPresignedUrls(
        orderId,
        images
      )
      const uploadResponse = await BackendClient.uploadTrainingPhotos(
        presignedResponse,
        model_name,
        images
      )
      const allResponsesOk = uploadResponse.every((response) => response.ok)

      if (allResponsesOk) {
        setUploadFailureMessage('')
      } else {
        setUploadFailureMessage('Failed to upload photos. Please try again.')
        throw new Error('Failed to create model')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div>
      <h1>Upload</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1 mt-8">
          <div className="font-medium font-ubuntu">Name your model</div>
          <label
            className="font-regular font-montserrat font-light mb-2"
            htmlFor="model_name"
          >
            <div>Enter the first name of your subject (e.g. Jeremy)</div>
          </label>
          <input
            id="model_name"
            type="text"
            name="model_name"
            className="w-full rounded-xl bg-light-purple px-4 py-4 border-0 font-montserrat font-light"
            placeholder="Name of model"
            onChange={handleModelNameChange}
          />
          {modelNameError && (
            <div className="mt-1 text-red-600 font-montserrat font-light">
              {modelNameError}
            </div>
          )}
        </div>
        <div>
          <div className="font-medium font-ubuntu mt-8 mb-1">
            Choose your model type
          </div>
          <div className="font-montserrat font-light">
            It helps create better images
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '12px',
            }}
          >
            <div
              className="w-full px-2 py-2 text-center font-medium font-ubuntu rounded-xl cursor-pointer hover:bg-light-green mr-2"
              style={{
                background: selectedModelType === 'man' ? '#37FFB0' : '#fff',
                color: selectedModelType === 'man' ? '#000' : '#000',
                border: '2px solid #37FFB0',
              }}
              onClick={() => setSelectedModelType('man')}
            >
              Male
            </div>

            <div
              className="w-full px-2 py-2 text-center font-medium font-ubuntu rounded-xl cursor-pointer mr-2"
              style={{
                background: selectedModelType === 'woman' ? '#37FFB0' : '#fff',
                color: selectedModelType === 'woman' ? '#000' : '#000',
                border: '2px solid #37FFB0',
                textAlign: 'center',
              }}
              onClick={() => setSelectedModelType('woman')}
            >
              Female
            </div>

            <div
              className="w-full px-2 py-2 text-center font-medium font-ubuntu rounded-xl cursor-pointer mr-2"
              style={{
                background: selectedModelType === 'dog' ? '#37FFB0' : '#fff',
                color: selectedModelType === 'dog' ? '#000' : '#000',
                border: '2px solid #37FFB0',
                textAlign: 'center',
              }}
              onClick={() => setSelectedModelType('dog')}
            >
              Dog
            </div>

            <div
              className="w-full px-2 py-2 text-center font-medium font-ubuntu rounded-xl cursor-pointer mr-2"
              style={{
                background: selectedModelType === 'cat' ? '#37FFB0' : '#fff',
                color: selectedModelType === 'cat' ? '#000' : '#000',
                border: '2px solid #37FFB0',
                textAlign: 'center',
              }}
              onClick={() => setSelectedModelType('cat')}
            >
              Cat
            </div>
          </div>
          {selectedModelTypeError && (
            <div className="mt-2 text-red-600 font-montserrat font-light">
              Must include a model type
            </div>
          )}
        </div>

        {uploadFailureMessage && (
          <div className="bg-light-red font-montserrat font-light rounded-xl text-black text-center py-6 px-4 mt-6 flex items-center">
            <img
              className="mr-2"
              height="16"
              width="16"
              src="/images/info_icon.png"
              alt="go"
            />
            {uploadFailureMessage}
          </div>
        )}

        <SelectPhotosButton onChange={handleImagesChange} />
        {selectedImageCount > 0 && (
          <div className="font-medium font-ubuntu text-xl my-4 flex items-center">
            {selectedImageCount} {selectedImageCount === 1 ? 'photo' : 'photos'}{' '}
            selected
          </div>
        )}

        <PrimaryButton type="submit" className="mt-6 w-full my-2 rounded-full">
          <div className="font-ubuntu font-medium text-base leading-tight">
            Create my model
          </div>
          <div className="text-xs leading-tight">20 GPU min</div>
        </PrimaryButton>
      </form>
    </div>
  )
}

export default Upload
