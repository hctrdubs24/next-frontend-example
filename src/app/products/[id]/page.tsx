"use client"

import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useProductById } from "@/hooks/product/useProductById.hook"
import { usePriceFormatter } from "@/hooks/usePriceFormatter.hook"
import Image from "next/image"
import Link from "next/link"
import { use } from "react"

type PageProps = {
  params: Promise<{ id: string }>
}

export default function ProductDetailsPage({ params }: PageProps) {
  const { id } = use(params)

  const { data: product, error, isLoading } = useProductById(Number(id))
  const { formatPrice } = usePriceFormatter({
    locale: "es-MX",
    currency: "MXN",
  })

  if (isLoading) return <section>Loading product...</section>
  if (error) return <section>Error: {error.message}</section>

  return (
    <section className="flex h-screen flex-col items-center justify-center gap-5">
      <Link
        href={"/"}
        className={buttonVariants({ variant: "ghost", size: "default" })}
      >
        Go back
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Product Details: {product?.id}</CardTitle>
        </CardHeader>

        <CardContent>
          <h2>{product?.name}</h2>
          <p>{product?.description}</p>
          <p>{formatPrice(product?.price ?? 0)}</p>
          <Image
            src={
              product?.image?.startsWith("http") ||
              product?.image?.startsWith("/")
                ? product?.image
                : "https://blocks.astratic.com/img/general-img-landscape.png"
            }
            alt={product?.name ?? "Product name"}
            width={400}
            height={400}
            loading="eager"
            className="h-48 w-full object-cover"
          />
        </CardContent>
      </Card>
    </section>
  )
}
