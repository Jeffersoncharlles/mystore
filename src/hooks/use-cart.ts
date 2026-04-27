import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  addToCart,
  getCartItems,
  removeFromCart,
  updateCartItem,
} from '@/http/http-services'

export const useCart = () => {
  const queryClient = useQueryClient()

  const { data: cart, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      return getCartItems()
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
  })

  const addItemMutation = useMutation({
    mutationFn: async (item: { productId: string; quantity: number }) => {
      return addToCart(item.productId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })

  const removeItemMutation = useMutation({
    mutationFn: async (itemId: string) => {
      return removeFromCart(itemId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })

  const updateItemMutation = useMutation({
    mutationFn: async (item: { itemId: string; quantity: number }) => {
      return updateCartItem({ productId: item.itemId, quantity: item.quantity })
    },
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
