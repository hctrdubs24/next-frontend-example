export type Product = {
  id: number
  name: string
  price: number
  description?: string
  image?: string
}

export interface ProductDto {
  id: number
  name: string
  description?: string
  price: number
  image?: string
}
