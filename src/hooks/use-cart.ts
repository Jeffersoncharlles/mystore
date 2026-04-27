import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useCart = () => {
  const queryClient = useQueryClient()

  const { data: cart, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {},
    staleTime: 1000 * 60 * 5, // 5 minutos
  })

  const addItemMutation = useMutation({
    mutationFn: async (item: { productId: string; quantity: number }) => {},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })

  const removeItemMutation = useMutation({
    mutationFn: async (itemId: string) => {},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })

  const updateItemMutation = useMutation({
    mutationFn: async (item: { itemId: string; quantity: number }) => {},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })

  return {
    cart,
    isLoading,
    addItem: addItemMutation.mutate,
    removeItem: removeItemMutation.mutate,
    updateItem: updateItemMutation.mutate,
  }
}
