"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/types"

export default function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false)
  const { toast } = useToast()
  const { addToCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    addToCart(product, 1)

    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    })
  }

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.id}`}>
        <div className="relative h-48 md:h-64 w-full overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500"
            style={{
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
          />
          {product.discountPrice && (
            <div className="absolute top-2 right-2 bg-black text-white text-xs font-bold px-2 py-1 rounded">
              {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
            </div>
          )}
        </div>

        <div className="p-3 md:p-4">
          <h3 className="text-sm md:text-lg font-semibold mb-1 truncate text-black">{product.title}</h3>
          <p className="text-gray-600 text-xs md:text-sm mb-2 line-clamp-2 hidden md:block">{product.description}</p>

          <div className="flex items-center justify-between">
            <div>
              {product.discountPrice ? (
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                  <span className="text-sm md:text-lg font-bold text-black">{product.discountPrice.toFixed(2)} DH</span>
                  <span className="text-gray-500 text-xs md:text-sm line-through">{product.price.toFixed(2)} DH</span>
                </div>
              ) : (
                <span className="text-sm md:text-lg font-bold text-black">{product.price.toFixed(2)} DH</span>
              )}
            </div>

            <Button
              size="sm"
              className="flex items-center gap-1 bg-primary hover:bg-primary/90 text-black font-semibold text-xs md:text-sm p-2 md:p-3"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden md:inline-block">Add</span>
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
