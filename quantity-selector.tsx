"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"

interface QuantitySelectorProps {
  initialQuantity?: number
  onChange?: (quantity: number) => void
}

export default function QuantitySelector({ initialQuantity = 1, onChange }: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialQuantity)

  const increment = () => {
    const newQuantity = quantity + 1
    setQuantity(newQuantity)
    if (onChange) onChange(newQuantity)
  }

  const decrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1
      setQuantity(newQuantity)
      if (onChange) onChange(newQuantity)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value > 0) {
      setQuantity(value)
      if (onChange) onChange(value)
    }
  }

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor="quantity" className="text-sm font-medium">
        Quantity
      </label>
      <div className="flex items-center">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={decrement}
          disabled={quantity <= 1}
          className="h-10 w-10 rounded-r-none"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <input
          type="number"
          id="quantity"
          min="1"
          value={quantity}
          onChange={handleChange}
          className="h-10 w-16 border-y text-center focus:outline-none"
        />
        <Button type="button" variant="outline" size="icon" onClick={increment} className="h-10 w-10 rounded-l-none">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
