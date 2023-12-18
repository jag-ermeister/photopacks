import { Auth } from 'aws-amplify'
import { API_URL } from '../constants'

export default class BackendClient {
  static async getAuthToken() {
    return await Auth.currentSession().then((session) =>
      session.getIdToken().getJwtToken()
    )
  }

  static async getOrders() {
    const response = await fetch(`${API_URL}/app/orders/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${await this.getAuthToken()}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to retrieve orders')
    }
    return await response.json()
  }

  static async checkout(orderId) {
    const response = await fetch(`${API_URL}/app/checkout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${await this.getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order_id: orderId,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to create checkout session')
    }
    const data = await response.json()
    window.location.href = data.redirect_url
  }

  static async createOrder(createModelPayload) {
    const response = await fetch(`${API_URL}/app/orders/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await this.getAuthToken()}`,
      },
      body: JSON.stringify(createModelPayload),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Error ${response.status}: ${JSON.stringify(errorData)}`)
    }

    return await response.json()
  }

  static async getPacks() {
    const response = await fetch(`${API_URL}/app/packs/`, {
      // Update the endpoint as necessary
      method: 'GET',
      headers: {
        Authorization: `Bearer ${await this.getAuthToken()}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to retrieve prompt packs')
    }
    return await response.json()
  }

  static async getPack(id) {
    console.log('requesting')
    const response = await fetch(`${API_URL}/app/packs/${id}/`, {
      // Ensure the URL matches your endpoint
      method: 'GET',
      headers: {
        Authorization: `Bearer ${await this.getAuthToken()}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to retrieve prompt pack with ID: ${id}`)
    }
    return await response.json()
  }

  static async getPresignedUrls(order_id, images) {
    const formData = new FormData()
    formData.append('order_id', order_id)
    for (let i = 0; i < images.length; i++) {
      formData.append('image_names', images[i].name)
    }

    const response = await fetch(`${API_URL}/app/presigned_urls`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${await this.getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order_id,
        image_names: Array.from(formData.getAll('image_names')),
      }),
    })
    return await response.json()
  }

  static async uploadTrainingPhotos(response, model_name, images) {
    const fetchPromises = Array.from(images).map(async (image) => {
      const presigned_url = response.presigned_urls[image.name]
      let blobData = new Blob([image], { type: 'image/jpeg' })
      return await fetch(presigned_url, {
        method: 'PUT',
        body: blobData,
      })
    })
    return await Promise.all(fetchPromises)
  }
}
