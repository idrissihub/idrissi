"use client"

import { useState } from "react"
import { products, categories } from "@/lib/data"
import ProductCard from "./product-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

const PRODUCTS_PER_PAGE = 8

export default function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [visibleProducts, setVisibleProducts] = useState(PRODUCTS_PER_PAGE)

  const filteredProducts =
    activeCategory === "all" ? products : products.filter((product) => product.category === activeCategory)

  const displayedProducts = filteredProducts.slice(0, visibleProducts)
  const hasMoreProducts = visibleProducts < filteredProducts.length

  const loadMore = () => {
    setVisibleProducts((prev) => prev + PRODUCTS_PER_PAGE)
  }

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    setVisibleProducts(PRODUCTS_PER_PAGE) // Reset visible products when changing category
  }

  return (
    <div>
      <Tabs defaultValue="all" className="w-full" onValueChange={handleCategoryChange}>
        <div className="flex justify-center mb-8">
          <TabsList className="bg-gray-100 border border-gray-200">
            <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-black">
              All Products
            </TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.slug}
                className="data-[state=active]:bg-primary data-[state=active]:text-black"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {hasMoreProducts && (
            <div className="flex justify-center mt-8">
              <Button
                onClick={loadMore}
                variant="outline"
                className="border-black text-black hover:bg-primary hover:text-black px-8 py-3 font-semibold"
              >
                Load More Products
              </Button>
            </div>
          )}
        </TabsContent>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.slug} className="mt-0">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {hasMoreProducts && (
              <div className="flex justify-center mt-8">
                <Button
                  onClick={loadMore}
                  variant="outline"
                  className="border-black text-black hover:bg-primary hover:text-black px-8 py-3 font-semibold"
                >
                  Load More Products
                </Button>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
