"use client"

import BackButton from "@/components/BackButton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { categoryMapping, productSuggestions } from "@/data"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

// Sample data for recent searches
const recentSearches = [
  { text: "Apple M3", category: "Laptop" },
  { text: "Hisense", category: "TVs" },
  { text: "Samsung", category: "Mobile Phones" },
  { text: "Sweater", category: "Fashion" },
  { text: "iPhone 13 Pro", category: "Mobile Phones" },
  { text: "MacBook Air", category: "Laptop" },
]

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

  const product = productSuggestions?.find(
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

export default function SmallSearch({ onClick }: { onClick: () => void }) {
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

    router.push(`/ads?${params.toString()}`)
    setSearchTerm("")
  }

  // Remove individual recent search
  const removeRecentSearch = (index: number) => {
    setRecentSearchList((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="w-full flex items-center gap-3">
      {/* Back Button - Separate */}
      <BackButton onClick={onClick} />

      {/* Search Input Container */}
      <div className="w-full flex items-center relative bg-white rounded-md border px-1">
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
          className="w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-10 text-sm placeholder:text-sm font-normal placeholder:text-[#8B90A0]"
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
  )
}
