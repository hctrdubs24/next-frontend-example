"use client"

import { useProducts } from "@/features/products/hooks/use-products.hook"
import { ProductCard } from "./product-card"

export const ProductList = () => {
  const { products, isLoading, error } = useProducts()

  if (isLoading) return <div>Loading products...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <section>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
