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

  static async checkout(product) {
    const response = await fetch(`${API_URL}/app/checkout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${await this.getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product,
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
}
