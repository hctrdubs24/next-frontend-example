"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductForm } from "./product-form"
import { useProductById } from "@/hooks/product/useProductById.hook"
import { use } from "react"

interface ProductParams {
  params: Promise<{ id: string }>
}

export default function ProductsNewPage({ params }: ProductParams) {
  const { id } = use(params)
  const { data: product, error, isLoading } = useProductById(Number(id))

  if (id && isLoading) return <section>Loading product...</section>
  if (id && error) return <section>Error: {error.message}</section>

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle className="my-3 text-4xl font-bold">
            {id ? "Edit Product" : "Create Product"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <ProductForm product={product} />
        </CardContent>
      </Card>
    </div>
  )
}
