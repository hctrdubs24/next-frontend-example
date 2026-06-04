"use client"

import { Product } from "@/features/products/interfaces/products.interface"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useProducts } from "@/features/products/hooks/use-products.hook"
import { usePriceFormatter } from "@/shared/hooks/use-price-formatter.hook"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { FC } from "react"

type ProductCardProps = {
  product: Product
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { handleRemoveProduct, isDeleting } = useProducts()
  const router = useRouter()

  const { formatPrice } = usePriceFormatter({
    locale: "es-MX",
    currency: "MXN",
  })

  return (
    <Card
      className="w-full"
      onClick={() => router.push(`/products/${product.id}`)}
    >
      <CardHeader>
        <CardTitle className="flex flex-col items-center text-justify text-xl font-bold lg:flex-row lg:justify-between">
          {product.name}

          <span className="text-sm font-bold text-gray-400">
            {formatPrice(product.price)}
          </span>
        </CardTitle>
      </CardHeader>
      {product.image && (
        <Image
          src={
            product.image?.startsWith("http") || product.image?.startsWith("/")
              ? product.image
              : "https://blocks.astratic.com/img/general-img-landscape.png"
          }
          alt={product.name ?? "Product name"}
          width={400}
          height={400}
          loading="eager"
          className="h-48 w-full object-cover"
        />
      )}
      <CardContent>
        <p>{product.description}</p>
      </CardContent>

      <CardFooter className="flex items-center justify-around gap-2">
        <Button
          variant={"secondary"}
          onClick={(e) => {
            e.stopPropagation()
            router.push(`/products/${product.id}/edit`)
          }}
        >
          Edit
        </Button>
        <Button
          variant={"destructive"}
          onClick={(e) => {
            e.stopPropagation()
            handleRemoveProduct(product.id)
          }}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </CardFooter>
    </Card>
  )
}
