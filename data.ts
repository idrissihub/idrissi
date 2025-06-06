import type { Product, Category } from "./types"

export const categories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    image: "/placeholder.svg?height=300&width=300",
    slug: "electronics",
  },
  {
    id: "2",
    name: "Clothing",
    image: "/placeholder.svg?height=300&width=300",
    slug: "clothing",
  },
  {
    id: "3",
    name: "Home & Kitchen",
    image: "/placeholder.svg?height=300&width=300",
    slug: "home-kitchen",
  },
  {
    id: "4",
    name: "Beauty",
    image: "/placeholder.svg?height=300&width=300",
    slug: "beauty",
  },
]

export const products: Product[] = [
  {
    id: "1",
    title: "Wireless Headphones",
    description: "Premium wireless headphones with noise cancellation technology.",
    price: 1999.99,
    discountPrice: 1499.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "electronics",
    featured: true,
  },
  {
    id: "2",
    title: "Smartphone X",
    description: "Latest smartphone with advanced camera and long battery life.",
    price: 8999.99,
    discountPrice: 7999.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "electronics",
  },
  {
    id: "3",
    title: "Men's Casual Shirt",
    description: "Comfortable cotton shirt perfect for casual occasions.",
    price: 499.99,
    discountPrice: 399.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "clothing",
    featured: true,
  },
  {
    id: "4",
    title: "Women's Summer Dress",
    description: "Elegant summer dress made from lightweight fabric.",
    price: 799.99,
    discountPrice: 599.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "clothing",
  },
  {
    id: "5",
    title: "Coffee Maker",
    description: "Automatic coffee maker with timer and multiple brewing options.",
    price: 1299.99,
    discountPrice: 999.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "home-kitchen",
    featured: true,
  },
  {
    id: "6",
    title: "Blender Set",
    description: "High-powered blender with multiple attachments for various uses.",
    price: 899.99,
    discountPrice: 699.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "home-kitchen",
  },
  {
    id: "7",
    title: "Skincare Set",
    description: "Complete skincare routine with cleanser, toner, and moisturizer.",
    price: 599.99,
    discountPrice: 499.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "beauty",
  },
  {
    id: "8",
    title: "Makeup Palette",
    description: "Professional makeup palette with a variety of colors.",
    price: 399.99,
    discountPrice: 299.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "beauty",
    featured: true,
  },
  {
    id: "9",
    title: "Gaming Laptop",
    description: "High-performance gaming laptop with RGB keyboard.",
    price: 12999.99,
    discountPrice: 10999.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "electronics",
  },
  {
    id: "10",
    title: "Wireless Mouse",
    description: "Ergonomic wireless mouse with precision tracking.",
    price: 299.99,
    discountPrice: 249.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "electronics",
  },
  {
    id: "11",
    title: "Men's Jeans",
    description: "Classic fit denim jeans in dark wash.",
    price: 699.99,
    discountPrice: 549.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "clothing",
  },
  {
    id: "12",
    title: "Women's Sneakers",
    description: "Comfortable running sneakers with cushioned sole.",
    price: 899.99,
    discountPrice: 749.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "clothing",
  },
  {
    id: "13",
    title: "Kitchen Knife Set",
    description: "Professional chef knife set with wooden block.",
    price: 1499.99,
    discountPrice: 1199.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "home-kitchen",
  },
  {
    id: "14",
    title: "Air Fryer",
    description: "Digital air fryer for healthy cooking with less oil.",
    price: 999.99,
    discountPrice: 799.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "home-kitchen",
  },
  {
    id: "15",
    title: "Face Moisturizer",
    description: "Hydrating face moisturizer with SPF protection.",
    price: 249.99,
    discountPrice: 199.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "beauty",
  },
  {
    id: "16",
    title: "Hair Styling Kit",
    description: "Complete hair styling kit with multiple tools.",
    price: 799.99,
    discountPrice: 649.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "beauty",
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured)
}
