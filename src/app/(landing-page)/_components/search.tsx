"use client"
import { useState, useEffect, useRef, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, Search, X } from "lucide-react"
import FilterSchoolDialog from "@/app/(ads)/_components/FilterSchool"
import SearchIcon from "@/components/svgs/search"

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
  {
    id: 5,
    name: "iPad Air 5th Generation",
    category: "Tablets",
    price: "₦420,000",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    name: "Dell XPS 13 Laptop",
    category: "Computers",
    price: "₦890,000",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 7,
    name: "Nintendo Switch OLED",
    category: "Gaming",
    price: "₦280,000",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 8,
    name: "Apple Watch Series 8",
    category: "Wearables",
    price: "₦320,000",
    image: "/placeholder.svg?height=40&width=40",
  },
]

// Categories mapping with products
const categoryMapping: Record<string, string> = {
  // Mobile Phones
  "iPhone 13 Pro": "Mobile Phones",
  "iPhone 13 Pro Max": "Mobile Phones",
  "iPhone 14 Pro": "Mobile Phones",
  "Samsung Galaxy S21": "Mobile Phones",
  "Samsung Galaxy S22 Ultra": "Mobile Phones",
  "Samsung ultra 25S": "Mobile Phones",
  "Samsung Note 3": "Mobile Phones",
  "Samsung S25": "Mobile Phones",
  "Samsung S21 Ultra": "Mobile Phones",

  // Computers
  "MacBook Air M1": "Computers",
  "MacBook Pro 16-inch": "Computers",
  "MacBook Air M2": "Computers",
  "Dell XPS 13 Laptop": "Computers",

  // Audio
  "AirPods Pro": "Audio",
  "AirPods Pro 2": "Audio",
  "Sony WH-1000XM4 Headphones": "Audio",
  "Mechanical Keyboard": "Audio",

  // Gaming
  "PlayStation 5": "Gaming",
  "PlayStation 5 Console": "Gaming",
  "Nintendo Switch OLED": "Gaming",

  // Tablets
  "iPad Pro": "Tablets",
  "iPad Air 5th Generation": "Tablets",
  "iPad Pro 12.9": "Tablets",

  // Wearables
  "Apple Watch Series 8": "Wearables",

  // Electronics (general)
  "Wireless Earbuds": "Electronics",
}

// All searchable terms for autocomplete
const allSearchTerms = [
  ...recentSearches,
  ...trendingSearches,
  ...productSuggestions.map((p) => p.name),
  // Additional search terms
  "Samsung ultra 25S",
  "Samsung Note 3",
  "Samsung S25",
  "Samsung S21 Ultra",
  "iPhone 14 Pro",
  "MacBook Air M2",
  "iPad Pro 12.9",
  "AirPods Pro 2",
  "PlayStation 5 Console",
  "Nintendo Switch OLED",
]

// Function to get category for a term
const getCategoryForTerm = (term: string): string => {
  // Direct mapping
  if (categoryMapping[term]) {
    return categoryMapping[term]
  }

  // Find from product suggestions
  const product = productSuggestions.find(
    (p) =>
      p.name.toLowerCase().includes(term.toLowerCase()) ||
      term.toLowerCase().includes(p.name.toLowerCase())
  )
  if (product) {
    return product.category
  }

  // Fallback based on keywords
  const termLower = term.toLowerCase()
  if (
    termLower.includes("iphone") ||
    termLower.includes("samsung") ||
    termLower.includes("galaxy")
  ) {
    return "Mobile Phones"
  }
  if (
    termLower.includes("macbook") ||
    termLower.includes("laptop") ||
    termLower.includes("dell")
  ) {
    return "Computers"
  }
  if (
    termLower.includes("airpods") ||
    termLower.includes("headphones") ||
    termLower.includes("audio")
  ) {
    return "Audio"
  }
  if (
    termLower.includes("playstation") ||
    termLower.includes("nintendo") ||
    termLower.includes("gaming")
  ) {
    return "Gaming"
  }
  if (termLower.includes("ipad") || termLower.includes("tablet")) {
    return "Tablets"
  }
  if (termLower.includes("watch")) {
    return "Wearables"
  }

  return "Electronics" // Default category
}

export default function SearchBar() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSchool, setSelectedSchool] = useState<string>("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [filterSchoolOpen, setFilterSchoolOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Filtered suggestions based on search term
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    Array<{
      text: string
      category: string
      type: "suggestion"
    }>
  >([])

  // Update suggestions when search term changes
  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      const searchLower = searchTerm.toLowerCase()
      const suggestions: Array<{
        text: string
        category: string
        type: "suggestion"
      }> = []

      // Add direct text matches with categories
      allSearchTerms
        .filter(
          (term) =>
            term.toLowerCase().includes(searchLower) &&
            term.toLowerCase() !== searchLower
        )
        .slice(0, 6)
        .forEach((term) => {
          const category = getCategoryForTerm(term)
          suggestions.push({
            text: term,
            category: category,
            type: "suggestion",
          })
        })

      setFilteredSuggestions(suggestions)
      setShowSuggestions(true)
      setHighlightedIndex(-1)
    } else {
      setShowSuggestions(false)
      setFilteredSuggestions([])
    }
  }, [searchTerm])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showSuggestions) return

      const totalItems = filteredSuggestions.length

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          setHighlightedIndex((prev) => (prev < totalItems - 1 ? prev + 1 : -1))
          break
        case "ArrowUp":
          e.preventDefault()
          setHighlightedIndex((prev) => (prev > -1 ? prev - 1 : totalItems - 1))
          break
        case "Enter":
          e.preventDefault()
          if (highlightedIndex >= 0) {
            const suggestion = filteredSuggestions[highlightedIndex]
            handleSuggestionClick(suggestion.text)
          } else {
            handleSearch()
          }
          break
        case "Escape":
          setShowSuggestions(false)
          setHighlightedIndex(-1)
          inputRef.current?.blur()
          break
      }
    }

    if (showSuggestions) {
      document.addEventListener("keydown", handleKeyDown)
      return () => document.removeEventListener("keydown", handleKeyDown)
    }
  }, [showSuggestions, highlightedIndex, filteredSuggestions])

  // Handle search submission
  const handleSearch = (e?: FormEvent) => {
    if (e) e.preventDefault()

    const params = new URLSearchParams()
    if (searchTerm.trim()) {
      params.set("q", searchTerm)
    }

    if (selectedSchool) {
      params.set("schools", selectedSchool)
    }

    router.push(`/ads?${params.toString()}`)
    setShowSuggestions(false)
    inputRef.current?.blur()
  }

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion)
    setShowSuggestions(false)

    // Auto-search after selecting suggestion
    setTimeout(() => {
      const params = new URLSearchParams()
      params.set("q", suggestion)
      if (selectedSchool) {
        params.set("schools", selectedSchool)
      }
      router.push(`/ads?${params.toString()}`)
    }, 100)
  }

  // Handle category click
  const handleCategoryClick = (category: string) => {
    setShowSuggestions(false)

    const params = new URLSearchParams()
    params.set("category", category)
    if (selectedSchool) {
      params.set("schools", selectedSchool)
    }
    router.push(`/ads?${params.toString()}`)
  }

  // Handle filter application
  const handleFilterApply = (
    schools: string,
    filterParams: URLSearchParams
  ) => {
    setSelectedSchool(schools)
    setFilterSchoolOpen(false)
  }

  // Handle input focus
  const handleInputFocus = () => {
    if (searchTerm.trim().length > 0) {
      setShowSuggestions(true)
    }
  }

  // Handle input blur (with delay to allow clicks)
  const handleInputBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false)
      setHighlightedIndex(-1)
    }, 200)
  }

  // Clear search
  const clearSearch = () => {
    setSearchTerm("")
    setShowSuggestions(false)
    inputRef.current?.focus()
  }

  return (
    <div className="flex w-full gap-2 items-center">
      {/* School Selection Button */}
      <Button
        variant="ghost"
        onClick={() => setFilterSchoolOpen(true)}
        className="min-w-[153px] h-10 lg:h-[48px] bg-[#F1F2F4] hover:bg-[#F1F2F4] transform duration-300 border border-[#E3E6EA] rounded-[10px] px-4 py-2 text-[14px] lg:text-[16px] font-medium flex items-center text-[#6B7B8A] gap-1 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-1 focus-visible:ring-offset-white cursor-pointer"
      >
        <span className="truncate max-w-[120px]">
          {selectedSchool || "All Schools"}
        </span>
        <ChevronDown className="ml-auto h-4 w-4 text-[#6B7B8A] flex-shrink-0" />
      </Button>

      {/* School Selection Dialog */}
      <FilterSchoolDialog
        open={filterSchoolOpen}
        onOpenChange={setFilterSchoolOpen}
        selectedSchool={selectedSchool}
        onApplyFilters={handleFilterApply}
      />

      {/* Search Input with Autocomplete */}
      <div className="relative w-full">
        <form onSubmit={handleSearch} className="flex items-center">
          <div className="relative w-full">
            <Input
              ref={inputRef}
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder={
                selectedSchool
                  ? `Search products in ${selectedSchool}`
                  : "Search products across all schools"
              }
              className="bg-white h-10 lg:h-[48px] w-full border border-[#E3E6EA] px-4 py-2 pr-20 text-sm rounded-[10px] placeholder:text-[#9CA3AF] shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
              autoComplete="off"
            />

            {/* Clear button */}
            {searchTerm && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={clearSearch}
                className="absolute right-12 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </Button>
            )}

            {/* Search button */}
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:bg-[#E3E6EA]/30 rounded-full h-7 w-7"
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </form>

        {/* Suggestions Dropdown */}
        {showSuggestions && (
          <div
            ref={suggestionsRef}
            className="absolute top-full left-0 right-0 z-50 -mt-1.5 bg-white rounded-b-[10px] shadow-none border border-gray-100 overflow-hidden"
          >
            <div className="py-2">
              {filteredSuggestions.length > 0 ? (
                filteredSuggestions.map((suggestion, index) => (
                  <div
                    key={`${suggestion.text}-${index}`}
                    className={`px-6 py-3 cursor-pointer text-[#6B7280] hover:bg-gray-50 transition-colors text-left ${
                      index === highlightedIndex ? "bg-gray-50" : ""
                    }`}
                    onClick={() => handleSuggestionClick(suggestion.text)}
                  >
                    <div className="flex items-center gap-1">
                      <span>{suggestion.text} in </span>
                      <span
                        className="text-[#3B82F6] font-medium cursor-pointer hover:underline"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleCategoryClick(suggestion.category)
                        }}
                      >
                        {suggestion.category}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full flex flex-col justify-center items-center px-6 py-8 text-center font-circular-std">
                  <SearchIcon />
                  <div className="text-foreground text-sm mb-2">
                    No results found for "{searchTerm}"
                  </div>
                  <div className="text-[#464D61] text-xs mb-4">
                    Try adjusting your search term or browse categories
                  </div>
                  <Button onClick={clearSearch}>Clear search</Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
