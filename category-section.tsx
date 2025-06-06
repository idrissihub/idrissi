"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { categories } from "@/lib/data"

export default function CategorySection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category, index) => (
        <motion.div
          key={category.id}
          className="relative overflow-hidden rounded-lg shadow-md cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <Link href={`/category/${category.slug}`}>
            <div className="relative h-64 w-full">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500"
                style={{
                  transform: hoveredIndex === index ? "scale(1.05)" : "scale(1)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-xl font-semibold">{category.name}</h3>
                <motion.div
                  className="h-1 bg-white mt-2"
                  initial={{ width: 0 }}
                  animate={{ width: hoveredIndex === index ? "100%" : "40%" }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
