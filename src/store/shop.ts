import { create } from 'zustand'

export type CartItem = {
  id: string
  title: string
  price: number
  image?: string
}

type ShopState = {
  cart: CartItem[]
  category: string | null
  addToCart: (item: CartItem) => void
  setCategory: (cat: string | null) => void
}

export const useShop = create<ShopState>((set) => ({
  cart: [],
  category: null,
  addToCart: (item) => set((s) => ({ cart: [...s.cart, item] })),
  setCategory: (cat) => set(() => ({ category: cat })),
}))

