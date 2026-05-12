"use client"

import { ProductCard } from "@/components/products/product-card"
import { buttonVariants } from "@/components/ui/button"
import { useProduct } from "@/hooks/product/useProducts.hook"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default function Page() {
  const { products, isLoading, error } = useProduct()

  if (isLoading) return <div>Loading products...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="flex h-full w-full flex-col gap-8">
      <header className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">NestNextApp</h1>
        <Link
          href="/products/new"
          className={buttonVariants({ variant: "default", size: "default" })}
        >
          Create Product
        </Link>
      </header>

      <section>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}
