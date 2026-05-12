import {
  createProduct,
  getProducts,
  removeProduct,
  updateProduct,
} from "@/app/products/products.api"
import { Product, ProductDto } from "@/app/products/products.interface"
import { queryClient } from "@/lib/react-query/query-client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useProduct = () => {
  const client = useQueryClient(queryClient)

  // Query state for products
  const {
    isLoading,
    error,
    data: products = [],
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  })

  // Query mutation for deleting a product
  const deleteMutation = useMutation({
    mutationFn: removeProduct,
    onMutate: async (id: number) => {
      await client.cancelQueries({ queryKey: ["products"] })

      const previousProducts = client.getQueryData(["products"])

      client.setQueryData(["products"], (old: ProductDto[] = []) => {
        return old.filter((p) => p.id !== id)
      })

      return { previousProducts }
    },
    onError: (err, id, context) =>
      client.setQueryData(["products"], context?.previousProducts),
    onSettled: () => client.invalidateQueries({ queryKey: ["products"] }),
  })

  // Query mutation for creating a product
  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  })

  const handleRemoveProduct = (id: number) => {
    deleteMutation.mutate(id)
  }

  const handleCreateProduct = (data: Product) => {
    return createMutation.mutateAsync(data)
  }

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Product }) =>
      updateProduct(id, data),
    onMutate: async ({ id, data }) => {
      await client.cancelQueries({ queryKey: ["products"] })
      await client.cancelQueries({ queryKey: ["product", id] })

      const previousProducts = client.getQueryData<ProductDto[]>(["products"])
      const previousProduct = client.getQueryData<ProductDto>(["product", id])

      client.setQueryData(["products"], (old: ProductDto[] = []) =>
        old.map((p) => (p.id === id ? { ...p, ...data } : p))
      )

      if (previousProduct)
        client.setQueryData(["product", id], { ...previousProduct, ...data })

      return { previousProducts, previousProduct }
    },
    onError: (err, variables, context) => {
      if (context?.previousProducts)
        client.setQueryData(["products"], context.previousProducts)

      if (context?.previousProduct)
        client.setQueryData(["product", variables.id], context.previousProduct)
    },
    onSettled: (data, error, variables) => {
      client.invalidateQueries({ queryKey: ["products"] })
      client.invalidateQueries({ queryKey: ["product", variables.id] })
    },
  })

  const handleUpdateProduct = (id: number, data: Product) => {
    return updateMutation.mutateAsync({ id, data })
  }

  return {
    products,
    isLoading,
    error,
    handleRemoveProduct,
    isDeleting: deleteMutation.isPending,
    handleCreateProduct,
    handleUpdateProduct,
  }
}
