"use client"

import type React from "react"

import BackButton from "@/components/BackButton"
import BreadcrumbNav from "@/components/breadCrumbs"
import {
  ClockIcon,
  LightStrikeIcon,
  MapPinIcon,
  Spinner,
} from "@/components/svgs"
import SearchIcon from "@/components/svgs/search"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  ads,
  allSearchTerms,
  categories,
  categoryMapping,
  priceRanges,
  productSuggestions,
  schoolTypes,
} from "@/data"
import { generateBreadcrumbs, getInitials } from "@/lib/utils"
import { ChevronRight, SlidersHorizontal, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react"
import FiltersDialog from "./_components/Filters"
import SchoolSelectorDialog from "./_components/SelectSchool"

// Function to get category for a term
const getCategoryForTerm = (term: string): string => {
  // Direct mapping
  if (categoryMapping[term]) {
    return categoryMapping[term]
  }

  // Find from product suggestions
  const product = productSuggestions?.find(
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

// Helper function to parse time posted into comparable values
const parseTimePosted = (timePosted: string): number => {
  const now = Date.now()
  const timeStr = timePosted.toLowerCase()

  if (timeStr.includes("day")) {
    const days = Number.parseInt(timeStr.match(/\d+/)?.[0] || "0")
    return now - days * 24 * 60 * 60 * 1000
  } else if (timeStr.includes("week")) {
    const weeks = Number.parseInt(timeStr.match(/\d+/)?.[0] || "0")
    return now - weeks * 7 * 24 * 60 * 60 * 1000
  } else if (timeStr.includes("hour")) {
    const hours = Number.parseInt(timeStr.match(/\d+/)?.[0] || "0")
    return now - hours * 60 * 60 * 1000
  } else if (timeStr.includes("minute") || timeStr.includes("min")) {
    const minutes = Number.parseInt(timeStr.match(/\d+/)?.[0] || "0")
    return now - minutes * 60 * 1000
  }

  return now // Default to now for unknown formats
}

export default function AdsPage() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const breadcrumbItems = generateBreadcrumbs(pathname)

  // Search and filter states
  const query = searchParams.get("q") || ""
  const schoolsParam = searchParams.get("schools") || ""
  const categoryParam = searchParams.get("category") || "" // Direct category from ShopWithCategories

  const [searchTerm, setSearchTerm] = useState(query)
  const [selectedSchool, setSelectedSchool] = useState<string>(
    schoolsParam ? schoolsParam.split(",")[0] : ""
  )
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [schoolSelectorOpen, setSchoolSelectorOpen] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  const [schoolSearchTerm, setSchoolSearchTerm] = useState("")

  // Close all filters by default on large devices, keep mobile filters expanded
  const [expandedSections, setExpandedSections] = useState<string[]>([])
  const [expandedSubcategories, setExpandedSubcategories] = useState<string[]>(
    []
  )

  // Filter states - Support both direct category and category/subcategory filtering
  const [selectedDirectCategory, setSelectedDirectCategory] =
    useState<string>(categoryParam)
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("")
  const [selectedCondition, setSelectedCondition] = useState<string>(
    searchParams.get("condition") || "all"
  )
  const [priceRange, setPriceRange] = useState<string>(
    searchParams.get("priceRange") || "all"
  )
  const [minPrice, setMinPrice] = useState<string>(
    searchParams.get("minPrice") || ""
  )
  const [maxPrice, setMaxPrice] = useState<string>(
    searchParams.get("maxPrice") || ""
  )
  const [sortOption, setSortOption] = useState<string>("latest")
  const [itemsToShow, setItemsToShow] = useState<number>(10)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  // Mobile states
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  // Filtered suggestions based on search term (mobile only)
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    Array<{
      text: string
      category: string
      type: "suggestion"
    }>
  >([])

  // Function to get price display text
  const getPriceDisplayText = () => {
    if (minPrice || maxPrice) {
      // Custom price range
      if (minPrice && maxPrice) {
        return `${formatPrice(Number(minPrice))} - ${formatPrice(Number(maxPrice))}`
      } else if (minPrice) {
        return `From ${formatPrice(Number(minPrice))}`
      } else if (maxPrice) {
        return `Up to ${formatPrice(Number(maxPrice))}`
      }
    } else if (priceRange !== "all") {
      // Predefined price range
      const range = priceRanges.find((r) => r.value === priceRange)
      return range?.label || "All prices"
    }
    return "All prices"
  }

  // Price input handlers with proper focus management
  const handleMinPriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setMinPrice(value)
      // Only clear predefined range if there's actually a value
      if (value && priceRange !== "all") {
        // Use requestAnimationFrame to avoid immediate re-render
        requestAnimationFrame(() => {
          setPriceRange("all")
        })
      }
    },
    [priceRange]
  )

  const handleMaxPriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setMaxPrice(value)
      // Only clear predefined range if there's actually a value
      if (value && priceRange !== "all") {
        // Use requestAnimationFrame to avoid immediate re-render
        requestAnimationFrame(() => {
          setPriceRange("all")
        })
      }
    },
    [priceRange]
  )

  // Function to handle min/max price validation and swapping
  const validateAndSwapPrices = useCallback(() => {
    if (minPrice && maxPrice) {
      const minVal = Number(minPrice)
      const maxVal = Number(maxPrice)

      if (minVal > maxVal) {
        // Swap the values
        setMinPrice(maxPrice)
        setMaxPrice(minPrice)
      }
    }
  }, [minPrice, maxPrice])

  // Handle price input blur
  const handlePriceBlur = useCallback(() => {
    validateAndSwapPrices()
  }, [validateAndSwapPrices])

  // Update suggestions when search term changes (mobile only)
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

  // Handle keyboard navigation (mobile only)
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

  // Handle search submission - includes current school and filters (mobile only)
  const handleSearch = (e?: FormEvent) => {
    if (e) e.preventDefault()

    const params = new URLSearchParams(searchParams.toString())

    // Update search term
    if (searchTerm.trim()) {
      params.set("q", searchTerm)
    } else {
      params.delete("q")
    }

    // Keep existing school selection
    if (selectedSchool) {
      params.set("schools", selectedSchool)
    }

    router.push(`/ads?${params.toString()}`)
    setShowSuggestions(false)
    inputRef.current?.blur()
  }

  // Handle suggestion click - includes current school and filters (mobile only)
  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion)
    setShowSuggestions(false)

    // Auto-search after selecting suggestion with current filters
    setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      params.set("q", suggestion)

      // Keep existing school selection
      if (selectedSchool) {
        params.set("schools", selectedSchool)
      }

      router.push(`/ads?${params.toString()}`)
    }, 100)
  }

  // Handle category click - includes current school and search (mobile only)
  const handleCategoryClick = (category: string) => {
    setShowSuggestions(false)

    const params = new URLSearchParams(searchParams.toString())

    // Create category structure that matches the ads page filter system
    const categoryData = { [category]: ["All"] }
    params.set("categories", encodeURIComponent(JSON.stringify(categoryData)))

    // Keep existing search and school
    if (searchTerm) {
      params.set("q", searchTerm)
    }
    if (selectedSchool) {
      params.set("schools", selectedSchool)
    }

    router.push(`/ads?${params.toString()}`)
  }

  // Handle input focus (mobile only)
  const handleInputFocus = () => {
    if (searchTerm.trim().length > 0) {
      setShowSuggestions(true)
    }
  }

  // Handle input blur (with delay to allow clicks) (mobile only)
  const handleInputBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false)
      setHighlightedIndex(-1)
    }, 200)
  }

  // Clear search (mobile only)
  const clearSearch = () => {
    setSearchTerm("")
    setShowSuggestions(false)

    // Update URL to remove search but keep other filters
    const params = new URLSearchParams(searchParams.toString())
    params.delete("q")
    router.push(`/ads?${params.toString()}`)

    inputRef.current?.focus()
  }

  // Filter schools based on search term
  const filteredSchools = schoolSearchTerm
    ? schoolTypes.filter((school) => {
        const term = schoolSearchTerm.toLowerCase()
        return (
          school.name.toLowerCase().includes(term) ||
          school.abbreviation.toLowerCase().includes(term)
        )
      })
    : schoolTypes

  // Handle school selection - preserves search and filters
  const handleSchoolSelect = (school: string) => {
    setSelectedSchool(school)

    // Update URL with new school selection while preserving other params
    const params = new URLSearchParams(searchParams.toString())
    if (school) {
      params.set("schools", school)
    } else {
      params.delete("schools")
    }
    router.push(`/ads?${params.toString()}`)
  }

  // Handle category selection
  const handleCategorySelection = (category: string, subcategory: string) => {
    setSelectedCategory(category)
    setSelectedSubcategory(subcategory)
    // Clear direct category when using detailed filtering
    setSelectedDirectCategory("")
  }

  // Handle direct category selection (from URL or filter reset)
  const handleDirectCategorySelection = (category: string) => {
    setSelectedDirectCategory(category)
    // Clear detailed category selection when using direct category
    setSelectedCategory("")
    setSelectedSubcategory("")
  }

  // Toggle category expansion
  const toggleCategoryExpansion = (category: string) => {
    setExpandedSections((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category)
      } else {
        return [...prev, category]
      }
    })
  }

  // Apply filters from filters dialog - preserves search and school
  const handleApplyFilters = (filterParams: URLSearchParams) => {
    router.push(`/ads?${filterParams.toString()}`)
    setFiltersOpen(false)
    setIsFiltersOpen(false)
  }

  // Apply filters (for desktop) - preserves search and school
  const applyFilters = () => {
    const params = new URLSearchParams()

    // Add search query if it exists
    if (searchTerm) {
      params.set("q", searchTerm)
    }

    // Add selected school
    if (selectedSchool) {
      params.set("schools", selectedSchool)
    }

    // Add price filters
    if (priceRange !== "all") {
      params.set("priceRange", priceRange)
    }

    if (minPrice) {
      params.set("minPrice", minPrice)
    }

    if (maxPrice) {
      params.set("maxPrice", maxPrice)
    }

    // Add condition
    if (selectedCondition !== "all") {
      params.set("condition", selectedCondition)
    }

    // Add category filters - prioritize direct category over detailed category/subcategory
    if (selectedDirectCategory) {
      params.set("category", selectedDirectCategory)
    } else if (selectedCategory && selectedSubcategory) {
      const categoryData = { [selectedCategory]: [selectedSubcategory] }
      params.set("categories", encodeURIComponent(JSON.stringify(categoryData)))
    }

    // Add sort option
    if (sortOption !== "latest") {
      params.set("sort", sortOption)
    }

    router.push(`/ads?${params.toString()}`)
    setIsFiltersOpen(false)
  }

  // Clear all filters - resets everything
  const clearFilters = () => {
    setSelectedSchool("")
    setSelectedDirectCategory("")
    setSelectedCategory("")
    setSelectedSubcategory("")
    setSelectedCondition("all")
    setPriceRange("all")
    setMinPrice("")
    setMaxPrice("")
    setSearchTerm("")
    router.push("/ads")
  }

  // Parse min and max price
  const minPriceValue = minPrice ? Number.parseInt(minPrice) : 0
  const maxPriceValue = maxPrice
    ? Number.parseInt(maxPrice)
    : Number.POSITIVE_INFINITY

  // Parse price range
  const [minRangePrice, maxRangePrice] =
    priceRange !== "all"
      ? priceRange
          .split("-")
          .map((p) =>
            p ? Number.parseInt(p) : p === "" ? Number.POSITIVE_INFINITY : 0
          )
      : [0, Number.POSITIVE_INFINITY]

  // Enhanced filter logic to support both direct category and detailed filtering
  const filteredProducts =
    ads
      ?.filter((product) => {
        // Match by search query if provided
        const matchesQuery =
          !searchTerm ||
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())

        // Match by school if selected
        const matchesSchool =
          !selectedSchool ||
          selectedSchool === "" ||
          selectedSchool === product.school

        // Match by price
        const matchesPrice =
          product.price >= minPriceValue &&
          product.price <= maxPriceValue &&
          product.price >= minRangePrice &&
          (maxRangePrice === Number.POSITIVE_INFINITY ||
            product.price <= maxRangePrice)

        // Match by condition
        const matchesCondition =
          selectedCondition === "all" ||
          product.condition.toLowerCase() === selectedCondition.toLowerCase()

        // Enhanced category matching - support both direct category and detailed category/subcategory
        const matchesCategory =
          // If direct category is selected (from ShopWithCategories)
          (selectedDirectCategory &&
            product.category.toLowerCase() ===
              selectedDirectCategory.toLowerCase()) ||
          // If detailed category/subcategory is selected
          (selectedCategory &&
            selectedSubcategory &&
            product.category.toLowerCase() === selectedCategory.toLowerCase() &&
            product.subcategory.toLowerCase() ===
              selectedSubcategory.toLowerCase()) ||
          // If no category filters are applied
          (!selectedDirectCategory && !selectedCategory && !selectedSubcategory)

        return (
          matchesQuery &&
          matchesSchool &&
          matchesPrice &&
          matchesCondition &&
          matchesCategory
        )
      })
      .sort((a, b) => {
        // Sort the filtered products based on selected sort option
        switch (sortOption) {
          case "price-low":
            return a.price - b.price
          case "price-high":
            return b.price - a.price
          case "popular":
            // Sort by sponsored first, then by latest
            if (a.isSponsored && !b.isSponsored) return -1
            if (!a.isSponsored && b.isSponsored) return 1
            return parseTimePosted(b.timePosted) - parseTimePosted(a.timePosted)
          case "latest":
          default:
            // Sort by time posted (newest first)
            return parseTimePosted(b.timePosted) - parseTimePosted(a.timePosted)
        }
      }) || []

  // Format price with Naira symbol
  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`
  }

  // Initialize filters from URL params
  useEffect(() => {
    // Handle sort option from URL
    const sortParam = searchParams.get("sort")
    if (sortParam) {
      setSortOption(sortParam)
    }

    // Handle direct category parameter (from ShopWithCategories)
    const categoryParam = searchParams.get("category")
    if (categoryParam) {
      setSelectedDirectCategory(categoryParam)
      // Clear detailed category selection when direct category is set
      setSelectedCategory("")
      setSelectedSubcategory("")
    }

    // Handle detailed categories parameter
    const categoriesParam = searchParams.get("categories")
    if (categoriesParam && !categoryParam) {
      try {
        const categories = JSON.parse(decodeURIComponent(categoriesParam))
        const firstCategory = Object.keys(categories)[0]
        if (firstCategory && categories[firstCategory].length > 0) {
          setSelectedCategory(firstCategory)
          setSelectedSubcategory(categories[firstCategory][0])
          // Clear direct category when detailed category is set
          setSelectedDirectCategory("")
        }
      } catch (e) {
        console.error("Failed to parse categories", e)
      }
    }
  }, [searchParams])

  // Intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && filteredProducts.length > itemsToShow) {
          setIsLoading(true)
          setTimeout(() => {
            setItemsToShow((prev) => prev + 6)
            setIsLoading(false)
          }, 800)
        }
      },
      { threshold: 0.1 }
    )

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current)
      }
    }
  }, [filteredProducts.length, itemsToShow])

  // Filter content component (for desktop)
  const FilterContent = () => (
    <div className="w-full flex flex-col gap-[14px]">
      {/* Selected School */}
      <div className="bg-white rounded-[12px] px-4 py-2 border border-[#EBEEF7] flex flex-col">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => {
            if (expandedSections.includes("school")) {
              setExpandedSections(
                expandedSections.filter((c) => c !== "school")
              )
            } else {
              setExpandedSections([...expandedSections, "school"])
            }
          }}
        >
          <h3 className="text-[16px]/[24px] font-medium font-circular-std tracking-normal text-foreground">
            Selected School
          </h3>
          <ChevronRight
            className={`h-6 w-6 text-[#636A80] transition-transform ${
              expandedSections.includes("school") ? "transform rotate-90" : ""
            }`}
          />
        </div>
        <div className="font-medium font-circular-std text-[16px]/[24px] tracking-normal text-secondary">
          {selectedSchool || "All schools"}
        </div>
        {expandedSections.includes("school") && (
          <div className="flex flex-col gap-4">
            {/* Hide school search on large devices */}
            <div className="xl:hidden flex items-center border rounded-md px-2">
              <Input
                placeholder="Search schools..."
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-8 text-sm placeholder:text-sm placeholder:text-[#8B90A0] bg-white"
                value={schoolSearchTerm}
                onChange={(e) => setSchoolSearchTerm(e.target.value)}
              />
            </div>
            <div className="max-h-40 overflow-y-auto space-y-1">
              <RadioGroup
                value={selectedSchool}
                onValueChange={handleSchoolSelect}
                className="space-y-1"
              >
                <div className="flex items-center">
                  <RadioGroupItem value="" id="school-all" className="mr-2" />
                  <Label
                    htmlFor="school-all"
                    className="text-sm cursor-pointer"
                  >
                    All schools
                  </Label>
                </div>
                {filteredSchools.map((school) => (
                  <div key={school.name} className="flex items-center">
                    <RadioGroupItem
                      value={school.name}
                      id={`school-${school.name}`}
                      className="mr-2"
                    />
                    <Label
                      htmlFor={`school-${school.name}`}
                      className="text-sm cursor-pointer"
                    >
                      {school.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col">
        {/* Category */}
        <div className="bg-white rounded-t-[12px]  px-4 py-2 border border-[#EBEEF7] flex flex-col">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => {
              if (expandedSections.includes("category")) {
                setExpandedSections(
                  expandedSections.filter((c) => c !== "category")
                )
              } else {
                setExpandedSections([...expandedSections, "category"])
              }
            }}
          >
            <h3 className="text-[16px]/[24px] font-medium font-circular-std tracking-normal text-foreground">
              Category
            </h3>
            <ChevronRight
              className={`h-6 w-6 text-[#636A80] transition-transform ${
                expandedSections.includes("category")
                  ? "transform rotate-90"
                  : ""
              }`}
            />
          </div>
          <div className="font-medium font-circular-std text-[16px]/[24px] tracking-normal text-secondary">
            {selectedDirectCategory ||
              (selectedCategory && selectedSubcategory
                ? `${selectedCategory} - ${selectedSubcategory}`
                : "All")}
          </div>
          {expandedSections.includes("category") && (
            <div className="mt-2">
              {/* Direct category selection */}
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2 text-gray-700">
                  Main Categories
                </h4>
                <RadioGroup
                  value={selectedDirectCategory}
                  onValueChange={handleDirectCategorySelection}
                  className="space-y-2"
                >
                  <div className="flex items-center">
                    <RadioGroupItem
                      value=""
                      id="category-all"
                      className="mr-2"
                    />
                    <Label
                      htmlFor="category-all"
                      className="text-sm cursor-pointer"
                    >
                      All Categories
                    </Label>
                  </div>
                  {categories?.map((category) => (
                    <div key={category.name} className="flex items-center">
                      <RadioGroupItem
                        value={category.name}
                        id={`direct-${category.name}`}
                        className="mr-2"
                      />
                      <Label
                        htmlFor={`direct-${category.name}`}
                        className="text-sm cursor-pointer"
                      >
                        {category.name}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Detailed category/subcategory selection */}
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium mb-2 text-gray-700">
                  Detailed Categories
                </h4>
                {categories.map((category) => (
                  <div key={category.name} className="mb-2">
                    <div
                      className="flex justify-between items-center py-1 cursor-pointer"
                      onClick={() => {
                        if (expandedSubcategories.includes(category.name)) {
                          setExpandedSubcategories(
                            expandedSubcategories.filter(
                              (c) => c !== category.name
                            )
                          )
                        } else {
                          setExpandedSubcategories([
                            ...expandedSubcategories,
                            category.name,
                          ])
                        }
                      }}
                    >
                      <span className="text-[14px] font-medium font-circular-std tracking-normal text-foreground">
                        {category.name}
                      </span>
                      <ChevronRight
                        className={`h-4 w-4 text-gray-400 transition-transform ${
                          expandedSubcategories.includes(category.name)
                            ? "transform rotate-90"
                            : ""
                        }`}
                      />
                    </div>
                    {expandedSubcategories.includes(category.name) && (
                      <div className="pl-4 space-y-2 mt-1">
                        <RadioGroup
                          value={
                            selectedCategory === category.name
                              ? selectedSubcategory
                              : ""
                          }
                          onValueChange={(value) =>
                            handleCategorySelection(category.name, value)
                          }
                          className="space-y-2"
                        >
                          {category.subcategories.map((subcategory) => (
                            <div
                              key={subcategory}
                              className="flex items-center"
                            >
                              <RadioGroupItem
                                value={subcategory}
                                id={`${category.name}-${subcategory}`}
                                className="mr-2"
                              />
                              <Label
                                htmlFor={`${category.name}-${subcategory}`}
                                className="text-sm cursor-pointer"
                              >
                                {subcategory}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Condition */}
        <div className="bg-white  px-4 py-2 border border-[#EBEEF7] flex flex-col">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => {
              if (expandedSections.includes("condition")) {
                setExpandedSections(
                  expandedSections.filter((c) => c !== "condition")
                )
              } else {
                setExpandedSections([...expandedSections, "condition"])
              }
            }}
          >
            <h3 className="text-[16px]/[24px] font-medium font-circular-std tracking-normal text-foreground">
              Condition
            </h3>
            <ChevronRight
              className={`h-6 w-6 text-[#636A80] transition-transform ${
                expandedSections.includes("condition")
                  ? "transform rotate-90"
                  : ""
              }`}
            />
          </div>
          <div className="font-medium font-circular-std text-[16px]/[24px] tracking-normal text-secondary capitalize">
            {selectedCondition === "all" ? "All" : selectedCondition}
          </div>
          {expandedSections.includes("condition") && (
            <div className="mt-2 space-y-2">
              <RadioGroup
                value={selectedCondition}
                onValueChange={setSelectedCondition}
                className="space-y-2"
              >
                <div className="flex items-center">
                  <RadioGroupItem
                    value="all"
                    id="condition-all"
                    className="mr-2"
                  />
                  <Label htmlFor="condition-all" className="text-sm">
                    All Conditions
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem
                    value="new"
                    id="condition-new"
                    className="mr-2"
                  />
                  <Label htmlFor="condition-new" className="text-sm">
                    New
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem
                    value="used"
                    id="condition-used"
                    className="mr-2"
                  />
                  <Label htmlFor="condition-used" className="text-sm">
                    Used
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="bg-white rounded-b-[12px] px-4 py-2 border border-[#EBEEF7] flex flex-col">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => {
              if (expandedSections.includes("price")) {
                setExpandedSections(
                  expandedSections.filter((c) => c !== "price")
                )
              } else {
                setExpandedSections([...expandedSections, "price"])
              }
            }}
          >
            <h3 className="text-[16px]/[24px] font-medium font-circular-std tracking-normal text-foreground">
              Prices (NGN)
            </h3>
            <ChevronRight
              className={`h-6 w-6 text-[#636A80] transition-transform ${
                expandedSections.includes("price") ? "transform rotate-90" : ""
              }`}
            />
          </div>
          <div className="font-medium font-circular-std text-[16px]/[24px] tracking-normal text-secondary">
            {getPriceDisplayText()}
          </div>
          {expandedSections.includes("price") && (
            <>
              <div className="flex gap-2 mb-4 mt-2">
                <Input
                  type="number"
                  placeholder="Min price"
                  className="h-9 text-sm"
                  value={minPrice}
                  onChange={handleMinPriceChange}
                  onBlur={handlePriceBlur}
                />
                <Input
                  type="number"
                  placeholder="Max price"
                  className="h-9 text-sm"
                  value={maxPrice}
                  onChange={handleMaxPriceChange}
                  onBlur={handlePriceBlur}
                />
              </div>

              <RadioGroup
                value={priceRange}
                onValueChange={(value) => {
                  setPriceRange(value)
                  // Clear custom inputs when predefined range is selected
                  if (value !== "all") {
                    setMinPrice("")
                    setMaxPrice("")
                  }
                }}
                className="space-y-2"
              >
                {priceRanges.map((range) => (
                  <div key={range.value} className="flex items-center">
                    <RadioGroupItem
                      value={range.value}
                      id={`price-${range.value}`}
                      className="mr-2"
                    />
                    <Label htmlFor={`price-${range.value}`} className="text-sm">
                      {range.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </>
          )}
        </div>
      </div>

      {/* Apply and Clear buttons for mobile */}
      <div className="flex gap-2 mt-4 xl:hidden">
        <Button
          onClick={clearFilters}
          variant="outline"
          className="flex-1 bg-transparent"
        >
          Clear All
        </Button>
        <Button onClick={applyFilters} className="flex-1">
          Apply Filters
        </Button>
      </div>
    </div>
  )

  // Handle sort option change
  const handleSortChange = (value: string) => {
    setSortOption(value)

    // Update URL with new sort option
    const params = new URLSearchParams(searchParams.toString())
    if (value !== "latest") {
      params.set("sort", value)
    } else {
      params.delete("sort")
    }
    router.push(`/ads?${params.toString()}`)
  }

  return (
    <div className="w-full min-h-screen flex flex-col gap-4 bg-white xl:bg-[#F4F6F8]">
      {/* Mobile Header with Search */}
      <div className="xl:hidden px-4 py-3 flex items-center gap-3">
        <div className="w-full flex items-center relative gap-3">
          <BackButton onClick={() => router.push("/")} />

          {/* Mobile Search Input with Autocomplete */}
          <div className="flex-1 relative">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Need something? Start typing..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  className="px-[10px] h-12 text-sm placeholder:text-[#8B90A0] placeholder:font-normal bg-[#F7F8F9] border-[#DADDE5] focus-visible:ring-0 focus-visible:ring-none focus-visible:ring-offset-0 focus-visible:ring-none"
                />
                {searchTerm && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={clearSearch}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </form>

            {/* Mobile Search Suggestions */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div
                ref={suggestionsRef}
                className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-80 overflow-y-auto mt-1"
              >
                {filteredSuggestions.map((suggestion, index) => (
                  <div
                    key={`${suggestion.text}-${index}`}
                    className={`px-4 py-3 cursor-pointer border-b border-gray-100 last:border-b-0 ${
                      index === highlightedIndex
                        ? "bg-gray-50"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleSuggestionClick(suggestion.text)}
                  >
                    <p className="font-circular-std text-sm text-[#191F33]">
                      {suggestion.text}{" "}
                      <span
                        className="text-xs text-[#3B82F6] hover:underline cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleCategoryClick(suggestion.category)
                        }}
                      >
                        in {suggestion.category}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile School Selector and Filters */}
      <div className="xl:hidden px-4 py-3 flex items-center gap-3">
        {/* School Selector Button */}
        <Button
          variant="ghost"
          onClick={() => setSchoolSelectorOpen(true)}
          className="flex-1 h-12 bg-[#F7F8F9] border-[#EDEFF5] border rounded-md px-4 py-2 text-[14px] font-medium flex items-center text-[#6B7B8A] gap-2 focus-visible:ring-0 focus-visible:ring-none focus-visible:ring-offset-1 focus-visible:ring-offset-white cursor-pointer justify-between"
        >
          <div className="flex items-center gap-2">
            <MapPinIcon className="h-4 w-4 text-secondary" />
            <span className="truncate">{selectedSchool || "All Schools"}</span>
          </div>
          <ChevronRight className="h-4 w-4 text-[#6B7B8A] flex-shrink-0" />
        </Button>

        {/* Filters Button */}
        <Button
          variant="outline"
          onClick={() => setFiltersOpen(true)}
          className="w-[140px] h-12 px-4 text-[14px]/[24px] font-[450] font-circular-std text-[#4E4E5A] bg-[#F7F8F9] border-[#EDEFF5] flex items-center gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* School Selector Dialog */}
      <SchoolSelectorDialog
        open={schoolSelectorOpen}
        onOpenChange={setSchoolSelectorOpen}
        selectedSchool={selectedSchool}
        onSchoolSelect={handleSchoolSelect}
      />

      {/* Filters Dialog */}
      <FiltersDialog
        open={filtersOpen}
        onOpenChange={setFiltersOpen}
        onApplyFilters={handleApplyFilters}
      />

      <BreadcrumbNav pathname={pathname} />

      {/* Main Content Container */}
      <div className="w-full max-w-[1320px] mx-auto px-4 xl:px-6">
        {/* Results Header */}
        <div className="pb-4 2xl:pb-6 flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-[16px] xl:text-[20px]/[32px] text-[#636A80] font-circular-std font-[450] tracking-normal">
              <span className="font-bold text-[#191F33]">
                {filteredProducts.length}
              </span>{" "}
              Results Found
              {selectedDirectCategory && (
                <span className="text-secondary ml-2">
                  in {selectedDirectCategory}
                </span>
              )}
            </p>
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 hidden xl:inline">
              Sort by:
            </span>
            <Select value={sortOption} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[140px] xl:w-[160px] h-10 bg-white border-[#DADDE5]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Main Layout */}
        <div className="xl:flex xl:gap-2 2xl:gap-6">
          {/* Desktop Filters Sidebar */}
          <div className="hidden xl:block w-80 flex-shrink-0">
            {/* Filters Header with Reset All Link */}
            <div className="flex justify-between items-center mb-4 px-2">
              <h2 className="font-medium font-circular-std text-[20px]/[32px] tracking-normal text-foreground">
                Filters
              </h2>
              <button
                onClick={clearFilters}
                className="text-secondary text-[18px]/[32px] font-circular-std italic tracking-normal hover:underline cursor-pointer"
              >
                Reset all
              </button>
            </div>
            <FilterContent />
          </div>

          {/* Mobile Filters Sheet */}
          <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <SheetTrigger asChild>
              <div />
            </SheetTrigger>
            <SheetContent side="left" className="w-full p-0">
              <SheetHeader className="p-4 border-b">
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto p-4">
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>

          {/* Products Grid */}
          <div className="w-full xl:flex-1">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-[12px] p-8 xl:p-12 text-center">
                <div className="flex flex-col items-center gap-4">
                  <SearchIcon />
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-gray-900">
                      No Results Found
                    </h3>
                    <p className="text-sm text-gray-500">
                      Try adjusting your search or filter criteria to find what
                      you're looking for.
                    </p>
                  </div>
                  <Button onClick={clearFilters} className="bg-secondary">
                    Clear all filters
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="w-full grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-3 xl:gap-4">
                  {filteredProducts.slice(0, itemsToShow).map((ad, idx) => (
                    <Link
                      key={idx}
                      href={`/ads/${ad.id}?name=${ad.name}`}
                      className="flex flex-col gap-[2.65px] bg-white p-1 lg:p-2 rounded-[10.6px] lg:rounded-[16px] hover:shadow-sm overflow-hidden border border-[#F1F2F4] cursor-pointer"
                    >
                      <div className="relative">
                        <Image
                          src={ad.image || "/placeholder.svg"}
                          alt={ad.name}
                          width={292}
                          height={267}
                          className="w-full h-32 sm:h-[176.86px] lg:h-[267px] object-cover rounded-[8px] bg-[#E3E6EA] hover:scale-[1.01] transition-transform duration-200"
                        />
                        {ad.isSponsored && (
                          <span className="w-fit h-8 flex items-center justify-center gap-[10px] rounded-[8px] p-2 absolute top-[130px] lg:top-[226.49px] left-[14.03px] bg-[#131313]/80 text-[#FFCC33] text-[12px]/[16px] font-bold font-circular-std tracking-normal">
                            <LightStrikeIcon /> Sponsored
                          </span>
                        )}
                        <span className="w-fit h-6 py-1 px-2 flex justify-center items-center gap-[10px] absolute top-2 left-2 bg-white text-[#384853] text-[12px]/[16px] font-medium font-circular-std rounded-[8px]">
                          {ad.condition}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="pt-1 lg:pt-2 pb-0 flex flex-col gap-[2.65px] lg:gap-1">
                        <h3 className="text-[12px]/[11.92px] lg:text-[16px]/[18px] font-medium font-circular-std text-[#384853] truncate">
                          {ad.name}
                        </h3>
                        <p className="text-secondary font-bold text-[12px]/[15.9px] lg:text-[18px]/[24px] -tracking-[1%] align-middle">
                          {formatPrice(ad.price)}
                        </p>
                        <div className="w-full flex justify-between gap-1">
                          <div className="flex items-center gap-1 xl:gap-1.5 lg:gap-2">
                            <MapPinIcon className="w-3 h-3 xl:w-4 xl:h-4 text-[#384853]" />
                            <span className="text-[#384853] text-[10px] xl:text-[12px] lg:text-[14px] leading-[1.2] font-medium font-circular-std truncate">
                              {ad.location}
                            </span>
                          </div>
                          <div className="hidden xl:flex items-center justify-end gap-1.5 lg:gap-2">
                            <ClockIcon className="w-4 h-4 text-[#384853]" />
                            <span className="text-[#384853] text-[12px] lg:text-[14px] leading-[1.2] font-medium font-circular-std truncate">
                              {ad.timePosted}
                            </span>
                          </div>
                        </div>
                        <div className="w-full py-[6.62px] lg:py-[10px] px-[10.6px] lg:px-4 bg-[#FAFAFA] rounded-[5.3px] lg:rounded-[8px] mt-1 lg:mt-4 flex flex-col gap-[2.65px] lg:gap-1.5">
                          <p className="text-[#6B7B8A] text-[10px]/[10.6px] lg:text-[14px]/[16px] tracking-normal font-circular-std font-medium">
                            Vendor
                          </p>
                          <div className="w-full h-[14px] xl:h-[18px] flex items-center gap-[3px] xl:gap-[5px]">
                            <Avatar className="w-[8px] h-[8px] xl:w-[10.6px] xl:h-[10.6px] lg:w-6 lg:h-6">
                              <AvatarImage
                                src={ad.vendorImage || "/placeholder.svg"}
                                alt="Vendor's photo"
                              />
                              <AvatarFallback className="text-[6px] xl:text-[8px] lg:text-xs">
                                {getInitials(ad.vendor)}
                              </AvatarFallback>
                            </Avatar>
                            <p className="font-bold font-circular-std text-[#384853] text-[9px] xl:text-[12px]/[11.92px] lg:text-[15px]/[18px] tracking-normal truncate">
                              {ad.vendor}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Load More Trigger */}
                {filteredProducts.length > itemsToShow && (
                  <div ref={loadMoreRef} className="flex justify-center py-8">
                    {isLoading ? (
                      <div className="flex items-center gap-2 text-secondary">
                        <Spinner />
                        <span>Loading...</span>
                      </div>
                    ) : (
                      <div className="h-4" />
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
