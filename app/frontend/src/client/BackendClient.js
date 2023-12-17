import { Auth } from 'aws-amplify'
import { API_URL } from '../constants'

export default class BackendClient {
  static async getAuthToken() {
    return await Auth.currentSession().then((session) =>
      session.getIdToken().getJwtToken()
    )
  }

  static async getOrders() {
    const response = await fetch(`${API_URL}/api/orders/`, {
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
}
