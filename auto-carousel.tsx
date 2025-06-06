"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    id: 1,
    image: "/placeholder.svg?height=600&width=1400",
    title: "Premium Collection",
    subtitle: "Discover our exclusive range with exceptional quality",
    buttonText: "Explore Now",
    buttonAction: "scroll",
    target: "products",
    gradient: "from-black/70 via-black/50 to-transparent",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=600&width=1400",
    title: "New Arrivals",
    subtitle: "Latest products with innovative designs and features",
    buttonText: "Shop Collection",
    buttonAction: "scroll",
    target: "categories",
    gradient: "from-slate-900/70 via-slate-800/50 to-transparent",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=600&width=1400",
    title: "Special Offers",
    subtitle: "Limited time exclusive deals on premium products",
    buttonText: "View Deals",
    buttonAction: "scroll",
    target: "featured",
    gradient: "from-gray-900/70 via-gray-700/50 to-transparent",
  },
]

export default function AutoCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000) // Resume auto-play after 10 seconds
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const handleButtonClick = (slide: (typeof slides)[0]) => {
    if (slide.buttonAction === "scroll") {
      // Check if we're on the home page
      if (window.location.pathname === "/") {
        // Scroll to the target section
        const element = document.getElementById(slide.target)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      } else {
        // Navigate to home page with hash
        router.push(`/#${slide.target}`)
      }
    }
  }

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-gray-100">
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="relative min-w-full h-full">
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6">
              <div className="text-center max-w-4xl">
                <h1 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">{slide.title}</h1>
                <p className="text-lg md:text-2xl mb-8 max-w-2xl mx-auto font-light leading-relaxed opacity-90">
                  {slide.subtitle}
                </p>
                <Button
                  size="lg"
                  onClick={() => handleButtonClick(slide)}
                  className="bg-primary hover:bg-primary/90 text-black font-semibold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                >
                  {slide.buttonText}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 border border-white/20 hover:border-white/40"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 border border-white/20 hover:border-white/40"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-primary scale-125 shadow-lg" : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </div>
  )
}
