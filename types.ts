export interface Product {
  id: string
  title: string
  description: string
  price: number
  discountPrice?: number
  image: string
  category: string
  featured?: boolean
}

export interface Category {
  id: string
  name: string
  image: string
  slug: string
}
