import { useState, useEffect } from 'react'
import BackendClient from '../client/BackendClient'

function usePacks() {
  const [promptPacks, setPromptPacks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchPacks() {
      setIsLoading(true)
      try {
        const data = await BackendClient.getPacks()
        setPromptPacks(data)
        setError(null)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPacks()
  }, [])

  return { promptPacks, isLoading, error }
}

function usePack(id) {
  const [pack, setPack] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchPack() {
      try {
        const data = await BackendClient.getPack(id)
        setPack(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPack()
  }, [id])

  return { pack, isLoading, error }
}

function useOrders() {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchOrders() {
      setIsLoading(true)
      try {
        const data = await BackendClient.getOrders()
        setOrders(data)
        setError(null)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [])

  return { orders, isLoading, error }
}

function useOrderPacks() {
  const { orders, isLoading, error } = useOrders()
  const [orderPacks, setOrderPacks] = useState([])

  useEffect(() => {
    if (orders.length > 0) {
      const transformedOrders = orders.flatMap((order) => {
        // Create an array for each prompt_pack that exists.
        return Array.from({ length: 5 }, (_, i) => {
          const promptPackKey = `prompt_pack_${i + 1}`
          if (order[promptPackKey]) {
            // Clone the order object and remove prompt_pack_X keys.
            const newOrder = { ...order }
            for (let j = 1; j <= 5; j++) {
              delete newOrder[`prompt_pack_${j}`]
            }
            // Add the single prompt_pack object.
            newOrder.prompt_pack = order[promptPackKey]
            newOrder.order_pack_id = `${order.id}_${newOrder.prompt_pack.id}`

            return newOrder
          }
          return null
        }).filter(Boolean) // Filter out the null entries.
      })
      setOrderPacks(transformedOrders)
    }
  }, [orders])

  return { orderPacks, isLoading, error }
}

function useOrder(id) {
  const [order, setOrder] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchOrder() {
      setIsLoading(true)
      try {
        const data = await BackendClient.getOrder(id)
        setOrder(data)
        setError(null)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrder()
  }, [])

  return { order, isLoading, error }
}

export { usePacks, usePack, useOrders, useOrder, useOrderPacks }
