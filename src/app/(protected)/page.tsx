import { Header } from "@/shared/components/header/header"
import { ProductList } from "@/features/products/components/product-list"

export const dynamic = "force-dynamic"

export default function Page() {
  return (
    <div className="flex h-full w-full flex-col gap-8">
      <Header />

      <ProductList />
    </div>
  )
}
