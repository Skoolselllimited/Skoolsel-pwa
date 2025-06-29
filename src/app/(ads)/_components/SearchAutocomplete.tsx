"use client"

import BackButton from "@/components/BackButton"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

// Sample data for recent searches
const recentSearches = [
  { text: "Apple M3", category: "Laptop" },
  { text: "Hisense", category: "TVs" },
  { text: "Samsung", category: "Mobile Phones" },
  { text: "Sweater", category: "Fashion" },
  { text: "iPhone 13 Pro", category: "Mobile Phones" },
  { text: "MacBook Air", category: "Laptop" },
]

const productSuggestions = [
  {
    id: 1,
    name: "iPhone 13 Pro Max",
    category: "Mobile Phones",
    price: "₦750,000",
    image: "/images/image1.png",
  },
  {
    id: 2,
    name: "MacBook Pro 16-inch",
    category: "Laptop",
    price: "₦1,200,000",
    image: "/images/image2.png",
  },
  {
    id: 3,
    name: "Samsung Galaxy S22 Ultra",
    category: "Mobile Phones",
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

// Categories mapping
const categoryMapping: Record<string, string> = {
  "iPhone 13 Pro": "Mobile Phones",
  "iPhone 13 Pro Max": "Mobile Phones",
  "iPhone 14 Pro": "Mobile Phones",
  "Samsung Galaxy S21": "Mobile Phones",
  "Samsung Galaxy S22 Ultra": "Mobile Phones",
  "MacBook Air M1": "Laptop",
  "MacBook Pro 16-inch": "Laptop",
  "AirPods Pro": "Audio",
  "Sony WH-1000XM4 Headphones": "Audio",
  "PlayStation 5": "Gaming",
  "iPad Pro": "Tablets",
  "Wireless Earbuds": "Electronics",
}

// All searchable terms
const allSearchTerms = [
  ...recentSearches.map((r) => r.text),
  ...productSuggestions.map((p) => p.name),
]

// Function to get category for a term
const getCategoryForTerm = (term: string): string => {
  if (categoryMapping[term]) {
    return categoryMapping[term]
  }

  const product = productSuggestions.find(
    (p) =>
      p.name.toLowerCase().includes(term.toLowerCase()) ||
      term.toLowerCase().includes(p.name.toLowerCase())
  )
  if (product) {
    return product.category
  }

  const termLower = term.toLowerCase()
  if (termLower.includes("iphone") || termLower.includes("samsung")) {
    return "Mobile Phones"
  }
  if (termLower.includes("macbook") || termLower.includes("laptop")) {
    return "Laptop"
  }
  if (termLower.includes("airpods") || termLower.includes("headphones")) {
    return "Audio"
  }
  if (termLower.includes("playstation") || termLower.includes("gaming")) {
    return "Gaming"
  }
  if (termLower.includes("ipad") || termLower.includes("tablet")) {
    return "Tablets"
  }

  return "Electronics"
}

interface SearchAutocompleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedSchool?: string
}

export default function SearchAutocompleteDialog({
  open,
  onOpenChange,
  selectedSchool,
}: SearchAutocompleteDialogProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [recentSearchList, setRecentSearchList] = useState(recentSearches)
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
    } else {
      setFilteredSuggestions([])
    }
  }, [searchTerm])

  // Handle search submission
  const handleSearch = () => {
    if (!searchTerm.trim()) return

    const params = new URLSearchParams()
    params.set("q", searchTerm)

    if (selectedSchool) {
      params.set("schools", selectedSchool)
    }

    router.push(`/ads?${params.toString()}`)
    onOpenChange(false)
    setSearchTerm("")
  }

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    const params = new URLSearchParams()
    params.set("q", suggestion)

    if (selectedSchool) {
      params.set("schools", selectedSchool)
    }

    router.push(`/ads?${params.toString()}`)
    onOpenChange(false)
    setSearchTerm("")
  }

  // Handle recent search click
  const handleRecentSearchClick = (search: {
    text: string
    category: string
  }) => {
    const params = new URLSearchParams()
    params.set("q", search.text)

    if (selectedSchool) {
      params.set("schools", selectedSchool)
    }

    router.push(`/ads?${params.toString()}`)
    onOpenChange(false)
  }

  // Handle category click
  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams()
    params.set("category", category)

    if (selectedSchool) {
      params.set("schools", selectedSchool)
    }

    router.push(`/ads?${params.toString()}`)
    onOpenChange(false)
  }

  // Remove individual recent search
  const removeRecentSearch = (index: number) => {
    setRecentSearchList((prev) => prev.filter((_, i) => i !== index))
  }

  // Clear all recent searches
  const clearAllRecentSearches = () => {
    setRecentSearchList([])
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full h-full max-w-none max-h-none p-0 gap-0 m-0 rounded-none border-0 bg-[#F8F9FA]">
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Search Input */}
          <div className="p-4 bg-[#F8F9FA]">
            <div className="flex items-center gap-3">
              {/* Back Button - Separate */}
              <BackButton onClick={() => onOpenChange(false)} />

              {/* Search Input Container */}
              <div className="relative bg-white rounded-md border flex-1 px-1">
                <div className="flex items-center">
                  <Input
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch()
                      }
                    }}
                    placeholder="Need something? Start typing..."
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-10 text-sm placeholder:text-sm font-normal placeholder:text-[#8B90A0]"
                    autoComplete="off"
                    autoFocus
                  />

                  <Button
                    onClick={handleSearch}
                    size="icon"
                    className="h-6 w-6 rounded-full mr-1 flex-shrink-0 bg-secondary"
                  >
                    <Search className="h-4 w-4 text-white" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4">
            {searchTerm.trim().length > 0 ? (
              /* Search Suggestions */
              <div className="space-y-1">
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((suggestion, index) => (
                    <div
                      key={`${suggestion.text}-${index}`}
                      className="flex items-center justify-between py-4 cursor-pointer font-circular-std font-[450]"
                      onClick={() => handleSuggestionClick(suggestion.text)}
                    >
                      <div className="flex items-center gap-1">
                        <span className="text-gray-600 text-base">
                          {suggestion.text} in{" "}
                        </span>
                        <span
                          className="text-secondary text-base font-medium cursor-pointer"
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
                  <div className="text-center py-12">
                    <div className="text-[#6B7280] text-base tracking-normal">
                      No suggestions found
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Recent Searches */
              <div className="space-y-1 font-circular-std">
                {recentSearchList.length > 0 && (
                  <>
                    <h3 className="text-[#6B7280] text-base mb-4 mt-2">
                      Recent search
                    </h3>
                    {recentSearchList.map((search, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-4 cursor-pointer"
                        onClick={() => handleRecentSearchClick(search)}
                      >
                        <div className="flex items-center gap-1">
                          <span className="text-[#6B7280]  text-base">
                            {search.text} in{" "}
                          </span>
                          <span
                            className="text-[#3B82F6] text-base font-medium cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleCategoryClick(search.category)
                            }}
                          >
                            {search.category}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeRecentSearch(index)
                          }}
                          className="h-8 w-8 text-[#6B7280] hover:text-gray-600 hover:bg-gray-100"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}

                    {recentSearchList.length > 0 && (
                      <button
                        onClick={clearAllRecentSearches}
                        className="text-[#6B7280] text-base italic mt-6 hover:text-gray-600 transition-colors cursor-pointer"
                      >
                        Clear all
                      </button>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
