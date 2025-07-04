"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { allSearchTerms, categoryMapping, productSuggestions } from "@/data"
import { ChevronDown, Search, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState, type FormEvent } from "react"
import FilterSchoolDialog from "../../(ads)/_components/FilterSchool"
import SearchAutocompleteDialog from "./SearchAutocomplete"

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

export default function SearchDialog() {
  const router = useRouter()
  const [filterSchoolOpen, setFilterSchoolOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSchool, setSelectedSchool] = useState<string>("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [autocompleteOpen, setAutocompleteOpen] = useState(false)

  // Filtered suggestions based on search term
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    Array<{
      text: string
      category: string
      type: "suggestion"
    }>
  >([])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

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

    // On mobile, apply filters and navigate
    if (window.innerWidth <= 768) {
      router.push(`/ads?${filterParams.toString()}`)
    }

    setFilterSchoolOpen(false)
  }

  // Handle input focus - open autocomplete dialog on mobile
  const handleInputFocus = () => {
    if (isMobile) {
      setAutocompleteOpen(true)
      inputRef.current?.blur() // Remove focus from input
    } else {
      if (searchTerm.trim().length > 0) {
        setShowSuggestions(true)
      }
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
    <div className="flex items-center gap-2 p-2">
      {/* Filter/School Button */}
      <Button
        variant="ghost"
        onClick={() => setFilterSchoolOpen(true)}
        className="w-[141px] h-12 lg:h-[54px] bg-[#F6F6F6] hover:bg-[#F6F6F6]/50 transform duration-300 border border-[#E3E6EA] rounded-[8px] px-4 sm:px-4 py-2 text-[14px]/[18px] lg:text-[16px]/[18px] font-circular-std font-bold tracking-normal flex items-center text-[#384853] gap-[6px] focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-1 focus-visible:ring-offset-white cursor-pointer"
      >
        <span className="truncate max-w-[100px] sm:max-w-xs">
          {selectedSchool || "All Schools"}
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

      {/* Search Autocomplete Dialog for Mobile */}
      <SearchAutocompleteDialog
        open={autocompleteOpen}
        onOpenChange={setAutocompleteOpen}
        selectedSchool={selectedSchool}
      />

      {/* Autocomplete Search Input */}
      <div className="flex-1 relative">
        <form onSubmit={handleSearch} className="flex items-center">
          <div className="relative flex-1">
            <Input
              ref={inputRef}
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={handleInputFocus}
              onClick={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder={
                selectedSchool
                  ? `Search items in ${selectedSchool}...`
                  : "Search items here..."
              }
              className="bg-white h-9 sm:h-10 lg:h-[56px] flex-1 border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 pr-20 pl-1 lg:pl-2.5 font-nunito text-xs sm:text-sm text-foreground placeholder:text-[#8B90A0]"
              autoComplete="off"
              readOnly={isMobile}
            />

            {/* Clear button */}
            {searchTerm && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </Button>
            )}

            {/* Search button */}
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 text-secondary hover:bg-[#E3E6EA]/30 rounded-full h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0"
            >
              <Search className="h-5 w-5 sm:h-5 sm:w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </form>

        {/* Suggestions Dropdown - Matching the UI design */}
        {showSuggestions && (
          <div
            ref={suggestionsRef}
            className="absolute top-full left-0 right-0 z-50 mt-1 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
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
                <div className="px-6 py-8 text-center">
                  <div className="text-4xl mb-3">🔍</div>
                  <div className="text-gray-500 text-sm mb-2">
                    No results found for "{searchTerm}"
                  </div>
                  <div className="text-gray-400 text-xs mb-4">
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
