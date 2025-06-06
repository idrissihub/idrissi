"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/types"

interface AddToCartButtonProps {
  product: Product
  quantity?: number
  className?: string
}

export default function AddToCartButton({ product, quantity = 1, className = "" }: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    setIsLoading(true)

    // Simulate a delay for better UX
    setTimeout(() => {
      addToCart(product, quantity)

      toast({
        title: "Added to cart",
        description: `${product.title} has been added to your cart.`,
      })

      setIsLoading(false)
    }, 500)
  }

  return (
    <Button onClick={handleAddToCart} disabled={isLoading} className={className}>
      {isLoading ? (
        <div className="flex items-center">
          <div className="h-4 w-4 mr-2 rounded-full border-2 border-t-transparent border-white animate-spin" />
          Adding...
        </div>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </>
      )}
    </Button>
  )
}
