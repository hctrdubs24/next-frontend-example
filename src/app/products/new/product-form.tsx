"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useProduct } from "@/hooks/product/useProducts.hook"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Product, ProductDto } from "../products.interface"

interface ProductFormProps {
  product?: ProductDto
}

export function ProductForm({ product }: ProductFormProps) {
  const { register, handleSubmit, reset } = useForm<Product>({
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
      image: product?.image || "",
      id: product?.id || undefined,
    },
  })
  const { handleCreateProduct, handleUpdateProduct } = useProduct()
  const router = useRouter()
  const params = useParams()

  const onSubmit = handleSubmit(async (data: Product) => {
    try {
      if (params.id) {
        await handleUpdateProduct(Number(params.id), data)
      } else {
        await handleCreateProduct(data)
      }

      reset()
      router.push("/")
    } catch (error) {
      console.error(`Error creating product: ${error}`)
    }
  })

  return (
    <form onSubmit={onSubmit}>
      <Label>Product Name</Label>
      <Input {...register("name")} />
      <Label>Description</Label>
      <Input {...register("description")} />
      <Label>Price</Label>
      <Input
        type="number"
        step="any"
        {...register("price", { valueAsNumber: true })}
      />
      <Label>Image</Label>
      <Input {...register("image")} />

      <Button type="submit">
        {params.id ? "Update Product" : "Create Product"}
      </Button>
    </form>
  )
}
