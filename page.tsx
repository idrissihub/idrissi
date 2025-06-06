import { Button } from "@/components/ui/button"
import AutoCarousel from "@/components/auto-carousel"
import CategorySection from "@/components/category-section"
import ProductsSection from "@/components/products-section"
import FeaturedProductSlider from "@/components/featured-product-slider"
import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen bg-secondary/30" id="home">
      {/* Hero Carousel */}
      <section className="w-full">
        <AutoCarousel />
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-black">Shop by Category</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our wide range of products across different categories
          </p>
        </div>
        <CategorySection />
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 px-4 md:px-8 bg-primary/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-black">Our Products</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Quality products at unbeatable prices</p>
          </div>
          <ProductsSection />
        </div>
      </section>

      {/* Featured Product Slider */}
      <section id="featured" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-black">Featured Products</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Hand-picked products just for you</p>
        </div>
        <FeaturedProductSlider />
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 md:px-8 bg-primary/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-black">About Us</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Your trusted partner for quality products and exceptional service
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="About Us"
                  width={600}
                  height={400}
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-3xl font-semibold mb-6 text-black">Our Story</h3>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                We are dedicated to providing high-quality products at affordable prices. Our mission is to make
                shopping a pleasant and convenient experience for all our customers.
              </p>
              <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                Founded in 2020, we've quickly grown to become one of the leading online retailers in the region, with a
                focus on customer satisfaction and product quality.
              </p>
              <Button className="bg-primary hover:bg-primary/90 text-black px-8 py-3 text-lg font-semibold">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
