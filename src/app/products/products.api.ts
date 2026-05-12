import { api } from "@/lib/axios/axios-instance"
import { Product } from "./products.interface"

const productsUrl = "/products"

export async function createProduct(productData: Product): Promise<Product> {
  const { data } = await api.post(productsUrl, productData)
  return data
}

export async function getProducts(): Promise<Product[]> {
  const { data } = await api.get(productsUrl)
  return data
}

export async function getProduct(id: number): Promise<Product> {
  const { data } = await api.get(`${productsUrl}/${id}`)
  return data
}

export async function removeProduct(id: number): Promise<void> {
  const { data } = await api.delete(`${productsUrl}/${id}`)
  return data
}

export async function updateProduct(
  id: number,
  productData: Product
): Promise<Product> {
  const { data } = await api.patch(`${productsUrl}/${id}`, productData)
  return data
}
