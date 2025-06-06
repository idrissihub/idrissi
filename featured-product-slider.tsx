"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/lib/cart-context"
import { getFeaturedProducts } from "@/lib/data"

export default function FeaturedProductSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const { toast } = useToast()
  const { addToCart } = useCart()

  const featuredProducts = getFeaturedProducts()

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredProducts.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [featuredProducts.length, isAutoPlaying])

  const handlePrevious = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + featuredProducts.length) % featuredProducts.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredProducts.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const product = featuredProducts[currentIndex]
    addToCart(product, 1)

    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    })
  }

  const handleViewDetails = () => {
    const product = featuredProducts[currentIndex]
    window.location.href = `/product/${product.id}`
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.9,
    }),
  }

  if (featuredProducts.length === 0) {
    return null
  }

  const product = featuredProducts[currentIndex]

  return (
    <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-2xl">
      {/* Navigation Arrows */}
      <div className="absolute top-1/2 left-6 z-20 transform -translate-y-1/2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white/90 backdrop-blur-sm hover:bg-white border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={handlePrevious}
        >
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </Button>
      </div>

      <div className="absolute top-1/2 right-6 z-20 transform -translate-y-1/2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white/90 backdrop-blur-sm hover:bg-white border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={handleNext}
        >
          <ChevronRight className="h-5 w-5 text-gray-700" />
        </Button>
      </div>

      <div className="h-[450px] md:h-[550px] overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0"
          >
            <div className="flex flex-col md:flex-row h-full">
              <div className="md:w-1/2 relative bg-white">
                <div className="absolute inset-4 rounded-xl overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                {product.discountPrice && (
                  <div className="absolute top-8 right-8 bg-red-500 text-white text-sm font-bold px-3 py-2 rounded-full shadow-lg">
                    {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                  </div>
                )}
              </div>

              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
                <div className="mb-4">
                  <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">
                    Featured Product
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 leading-tight">{product.title}</h2>

                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-gray-600 text-sm">(4.8/5 - 124 reviews)</span>
                </div>

                <p className="text-gray-600 mb-8 text-lg leading-relaxed">{product.description}</p>

                <div className="mb-8">
                  {product.discountPrice ? (
                    <div className="flex items-center gap-4">
                      <span className="text-4xl font-bold text-gray-900">{product.discountPrice.toFixed(2)} DH</span>
                      <span className="text-xl text-gray-500 line-through">{product.price.toFixed(2)} DH</span>
                    </div>
                  ) : (
                    <span className="text-4xl font-bold text-gray-900">{product.price.toFixed(2)} DH</span>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="flex items-center gap-3 bg-primary hover:bg-primary/90 text-black font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 py-4 rounded-xl border-2 border-gray-300 hover:border-primary hover:bg-primary/5 transition-all duration-300"
                    onClick={handleViewDetails}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Enhanced Dots Indicator */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3">
        {featuredProducts.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-8 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-primary shadow-lg" : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
              setIsAutoPlaying(false)
              setTimeout(() => setIsAutoPlaying(true), 10000)
            }}
          />
        ))}
      </div>
    </div>
  )
}
