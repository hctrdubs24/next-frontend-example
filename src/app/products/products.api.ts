import { api } from "@/lib/axios/axios-instance"
import { Product } from "./products.interface"

const productsUrl = "/products"

export async function createProduct(productData: Product): Promise<Product> {
  const { data } = await api.post<{ data: Product }>(productsUrl, productData)
  return data.data
}

export async function getProducts(): Promise<Product[]> {
  const { data } = await api.get<{ data: Product[] }>(productsUrl)
  return data.data
}

export async function getProduct(id: number): Promise<Product> {
  const { data } = await api.get<{ data: Product }>(`${productsUrl}/${id}`)
  return data.data
}

export async function removeProduct(id: number): Promise<void> {
  await api.delete(`${productsUrl}/${id}`)
}

export async function updateProduct(
  id: number,
  productData: Product
): Promise<Product> {
  const { data } = await api.patch<{ data: Product }>(
    `${productsUrl}/${id}`,
    productData
  )
  return data.data
}
