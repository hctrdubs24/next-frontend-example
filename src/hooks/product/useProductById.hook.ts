import { getProduct } from "@/app/products/products.api"
import { ProductDto } from "@/app/products/products.interface"
import { queryClient } from "@/lib/react-query/query-client"
import { useQuery, useQueryClient } from "@tanstack/react-query"

export const useProductById = (id: number) => {
  const client = useQueryClient(queryClient)

  const { data, error, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    initialData: () => {
      const products = client.getQueryData<ProductDto[]>(["products"])
      return products?.find((p) => p.id === id)
    },
  })

  return { data, error, isLoading }
}
