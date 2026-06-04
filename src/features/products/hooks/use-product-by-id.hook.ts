import { getProduct } from "@/features/products/api/products.api"
import { ProductDto } from "@/features/products/interfaces/products.interface"
import { getQueryClient } from "@/lib/react-query/query-client"
import { useQuery, useQueryClient } from "@tanstack/react-query"

export const useProductById = (id: number) => {
  const client = useQueryClient(getQueryClient())

  const { data, error, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    enabled: !isNaN(id),
    initialData: () => {
      const products = client.getQueryData<ProductDto[]>(["products"])
      return products?.find((p) => p.id === id)
    },
  })

  return { data, error, isLoading }
}
