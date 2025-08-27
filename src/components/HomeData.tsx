"use client"
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export function useRecentProducts(limit = 5) {
  const { data, error, isLoading } = useSWR(`/api/products?sort=recent&limit=${limit}`, fetcher, { revalidateOnFocus: false })
  return { products: data ?? [], error, isLoading }
}

export function useBestSellers(limit = 5) {
  const { data, error, isLoading } = useSWR(`/api/products?sort=bestsellers&limit=${limit}`, fetcher, { revalidateOnFocus: false })
  return { products: data ?? [], error, isLoading }
}

export function useCategoryList(limit = 5) {
  // Derive from products mock; in real app, fetch categories endpoint
  const categories = ['remeras','camperas','jeans','buzos','joggers','gorros','accesorios']
  return { categories: categories.slice(0, limit) }
}

export function useInstagram3() {
  const { data, error, isLoading } = useSWR('/api/instagram', fetcher, { revalidateOnFocus: false })
  return { items: data?.items ?? [], error, isLoading }
}

