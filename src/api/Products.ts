import {Product} from "@/models/Product";

const API_URL = 'https://flask-production-cb7c.up.railway.app'

export const getAllProducts = async () => {
  const response = await fetch(`${API_URL}/product`)
  return await response.json()
}

export const getProductById = async (id: string):Promise<Product> => {
  const response = await fetch(`${API_URL}/product/${id}`)
  return await response.json()
}

export const createProduct = async (product: any) => {
  const response = await fetch(`${API_URL}/product`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  })
  return await response.json()
}

export const updateProduct = async (id: string, product: Product) => {
  const response = await fetch(`${API_URL}/product/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  })
  return await response.json()
}

export const deleteProduct = async (id: string) => {
  const response = await fetch(`${API_URL}/product/${id}`, {
    method: 'DELETE'
  })
  return await response.json()
}