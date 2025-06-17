"use client"

import { useState, useEffect, useRef, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ChevronDown,
  Search,
  X,
  TrendingUp,
  Clock,
  ArrowRight,
} from "lucide-react"
import FilterSchoolDialog from "./FilterSchool"

// Sample data for suggestions
const recentSearches = [
  "iPhone 13 Pro",
  "MacBook Air M1",
  "Samsung Galaxy S21",
  "AirPods Pro",
]

const trendingSearches = [
  "PlayStation 5",
  "Mechanical Keyboard",
  "iPad Pro",
  "Wireless Earbuds",
]

const productSuggestions = [
  {
    id: 1,
    name: "iPhone 13 Pro Max",
    category: "Electronics",
    price: "₦750,000",
    image: "/images/image1.png",
  },
  {
    id: 2,
    name: "MacBook Pro 16-inch",
    category: "Computers",
    price: "₦1,200,000",
    image: "/images/image2.png",
  },
  {
    id: 3,
    name: "Samsung Galaxy S22 Ultra",
    category: "Electronics",
    price: "₦650,000",
    image: "/images/image3.png",
  },
  {
    id: 4,
    name: "Sony WH-1000XM4 Headphones",
    category: "Audio",
    price: "₦180,000",
    image: "/images/image4.png",
  },
]

export default function SearchDialog() {
  const router = useRouter()
  const [searchOpen, setSearchOpen] = useState(false)
  const [filterSchoolOpen, setFilterSchoolOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSchool, setSelectedSchool] = useState<string>("")
  const inputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [filteredProducts, setFilteredProducts] = useState(productSuggestions)

  // Focus input when dialog opens
  useEffect(() => {
    if (searchOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [searchOpen])

  // Handle search submission
  const handleSearch = (e?: FormEvent) => {
    if (e) e.preventDefault()

    // Navigate to ads page with search parameters
    const params = new URLSearchParams()
    if (searchTerm.trim()) {
      params.set("q", searchTerm)
    }

    if (selectedSchool) {
      params.set("schools", selectedSchool)
    }

    router.push(`/ads?${params.toString()}`)
    setSearchOpen(false)
  }

  // Handle product click
  const handleProductClick = (product: (typeof productSuggestions)[0]) => {
    // Navigate to product detail page
    router.push(`/ads/${product.id}`)
    setSearchOpen(false)
  }

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion)
    // Small delay to update the search term before submitting
    setTimeout(() => handleSearch(), 100)
  }

  // Handle filter application
  const handleFilterApply = (
    schools: string,
    filterParams: URLSearchParams
  ) => {
    setSelectedSchool(schools)

    // Navigate to ads page with all parameters
    router.push(`/ads?${filterParams.toString()}`)
    setFilterSchoolOpen(false)
  }

  useEffect(() => {
    const results = productSuggestions.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredProducts(results)
  }, [searchTerm])

  return (
    <div className="flex items-center gap-2 p-2">
      {/* Filter/School Button */}
      <Button
        variant="ghost"
        onClick={() => setFilterSchoolOpen(true)}
        className="w-[141px] h-12 lg:h-[54px] bg-[#F6F6F6] hover:bg-[#F6F6F6]/50 transform duration-300 border border-[#E3E6EA] rounded-[8px] px-4 sm:px-4 py-2 text-[14px]/[18px] lg:text-[16px]/[18px] font-circular-std font-bold tracking-normal flex items-center text-[#384853] gap-[6px] focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-1 focus-visible:ring-offset-white cursor-pointer"
      >
        <span className="truncate max-w-[100px] sm:max-w-xs">
          {selectedSchool || "All School"}
        </span>
        <ChevronDown className="ml-auto h-5 w-5 text-[#384853] flex-shrink-0" />
      </Button>

      {/* Combined Filter/School Dialog */}
      <FilterSchoolDialog
        open={filterSchoolOpen}
        onOpenChange={setFilterSchoolOpen}
        selectedSchool={selectedSchool}
        onApplyFilters={handleFilterApply}
      />

      {/* Search Dialog */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogTrigger asChild>
          <div className="flex-1 flex items-center">
            <Input
              readOnly
              onClick={() => setSearchOpen(true)}
              type="search"
              placeholder="Search by item here...."
              className="bg-white h-9 sm:h-10 lg:h-[56px] flex-1 border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 pr-0 pl-1 lg:pl-2.5 lg:pr-1 font-nunito text-xs sm:text-sm text-foreground placeholder:text-[#384853] cursor-pointer"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              className="text-secondary hover:bg-[#E3E6EA]/30 rounded-full h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 cursor-pointer"
            >
              <Search className="h-6 w-6 sm:h-5 sm:w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[600px] p-0 gap-0">
          <DialogHeader className="px-4 pt-4 pb-0 flex-row items-center justify-between">
            <form
              ref={formRef}
              onSubmit={handleSearch}
              className="flex items-center gap-2 flex-1"
            >
              <Search className="h-5 w-5 text-gray-400" />
              <Input
                ref={inputRef}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for products, categories, and more..."
                className="flex-1 border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 text-base"
              />
              <Button
                type="submit"
                variant="ghost"
                size="sm"
                className="hidden"
              >
                Search
              </Button>
            </form>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(false)}
              className="h-10 w-10 absolute rounded-full z-10 bg-white hover:bg-white top-3 right-2"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogHeader>

          <div className="p-4 pt-2">
            {searchTerm.length > 0 ? (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-500">
                  Suggestions
                </h3>
                {filteredProducts.length > 0 ? (
                  <div className="space-y-2">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleProductClick(product)}
                      >
                        <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-500">
                            {product.category}
                          </p>
                        </div>
                        <p className="font-bold text-secondary">
                          {product.price}
                        </p>
                      </div>
                    ))}
                    <Button
                      variant="ghost"
                      className="w-full justify-between mt-2 text-secondary"
                      onClick={() => handleSearch()}
                    >
                      <span>See all results for "{searchTerm}"</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="py-6 text-center">
                    <p className="text-gray-500">
                      No results found for "{searchTerm}"
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <h3 className="text-sm font-medium text-gray-500">
                      Recent Searches
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="rounded-full text-sm"
                        onClick={() => handleSuggestionClick(search)}
                      >
                        {search}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="h-4 w-4 text-gray-400" />
                    <h3 className="text-sm font-medium text-gray-500">
                      Trending
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {trendingSearches.map((search, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="rounded-full text-sm"
                        onClick={() => handleSuggestionClick(search)}
                      >
                        {search}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">
                    Popular Products
                  </h3>
                  <div className="space-y-2">
                    {productSuggestions.slice(0, 3).map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleProductClick(product)}
                      >
                        <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-500">
                            {product.category}
                          </p>
                        </div>
                        <p className="font-bold text-secondary">
                          {product.price}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
