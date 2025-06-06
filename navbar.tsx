"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { useCart } from "@/lib/cart-context"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { cartItems } = useCart()

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    if (pathname !== "/") {
      // If not on home page, navigate to home first then scroll
      window.location.href = `/#${sectionId}`
    } else {
      // If on home page, scroll to section
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg py-2" : "bg-white/95 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-primary">
            <Image src="/logo-new.png" alt="Idrissi Logo" fill className="object-cover" priority />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection("home")}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/" ? "text-primary" : "text-black"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("categories")}
            className="text-sm font-medium text-black transition-colors hover:text-primary"
          >
            Categories
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-sm font-medium text-black transition-colors hover:text-primary"
          >
            About
          </button>
          <Link
            href="/contact"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/contact" ? "text-primary" : "text-black"
            }`}
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link href="/cart" className="relative group">
            <div className="p-2 rounded-lg hover:bg-primary/10 transition-colors">
              <ShoppingCart className="h-6 w-6 text-black group-hover:text-primary" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {totalItems}
                </span>
              )}
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="flex flex-col p-4 space-y-4">
            <button
              onClick={() => scrollToSection("home")}
              className="text-left text-black hover:text-primary py-2 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("categories")}
              className="text-left text-black hover:text-primary py-2 transition-colors"
            >
              Categories
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-left text-black hover:text-primary py-2 transition-colors"
            >
              About
            </button>
            <Link
              href="/contact"
              className="text-black hover:text-primary py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
