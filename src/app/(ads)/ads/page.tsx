"use client"

import BreadcrumbNav from "@/components/breadCrumbs"
import {
  ClockIcon,
  LightStrikeIcon,
  MapPinIcon,
  Spinner,
  SpinnerIcon,
} from "@/components/svgs"
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
import { generateBreadcrumbs, getInitials } from "@/lib/utils"
import {
  ChevronDown,
  ChevronRight,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState, type FormEvent } from "react"
import FilterSchoolDialog from "../_components/FilterSchool"
import BackButton from "@/components/BackButton"

// Sample product data - Updated to match ShopWithCategories structure
const productResults = [
  {
    id: 1,
    name: "iPhone 13 Pro Max",
    category: "Mobile",
    subcategory: "Apple",
    price: 750000,
    location: "ABU Zaria",
    timePosted: "1 week ago",
    image: "/images/related_ad.webp",
    vendor: "Aliya Gadget Store",
    vendorImage: "/images/vendor.jpg",
    condition: "New",
    isSponsored: true,
    school: "Ahmadu Bello University Zaria",
  },
  {
    id: 2,
    name: "MacBook Pro 16-inch",
    category: "Computer & Laptop",
    subcategory: "Apple",
    price: 1200000,
    location: "FUT Minna",
    timePosted: "3 days ago",
    image: "/images/image1.png",
    vendor: "Tech Hub",
    vendorImage: "/images/vendor.jpg",
    condition: "Used",
    isSponsored: false,
    school: "Federal University of Science and Technology Minna",
  },
  {
    id: 3,
    name: "Samsung Galaxy S22 Ultra",
    category: "Mobile",
    subcategory: "Samsung",
    price: 650000,
    location: "UniLag",
    timePosted: "2 weeks ago",
    image: "/images/image2.png",
    vendor: "Mobile World",
    vendorImage: "/images/vendor.jpg",
    condition: "New",
    isSponsored: true,
    school: "Lagos State University",
  },
  {
    id: 4,
    name: "Wireless Headphones",
    category: "Phone Accessories",
    subcategory: "Headphones",
    price: 180000,
    location: "COE Zuba",
    timePosted: "5 days ago",
    image: "/images/image3.png",
    vendor: "Sound Masters",
    vendorImage: "/images/vendor.jpg",
    condition: "New",
    isSponsored: false,
    school: "College of Education zuba",
  },
  {
    id: 5,
    name: "iPad Pro 12.9-inch",
    category: "Mobile",
    subcategory: "Apple",
    price: 550000,
    location: "UniAbuja",
    timePosted: "1 day ago",
    image: "/images/image4.png",
    vendor: "Apple Store Nigeria",
    vendorImage: "/images/vendor.jpg",
    condition: "New",
    isSponsored: true,
    school: "Abuja University",
  },
  {
    id: 6,
    name: "PlayStation 5 Digital Edition",
    category: "Gaming",
    subcategory: "PlayStation",
    price: 420000,
    location: "ABU Zaria",
    timePosted: "4 days ago",
    image: "/images/image2.png",
    vendor: "Game World",
    vendorImage: "/images/vendor.jpg",
    condition: "New",
    isSponsored: false,
    school: "Ahmadu Bello University Zaria",
  },
  {
    id: 7,
    name: "Dell XPS 15",
    category: "Computer & Laptop",
    subcategory: "Dell",
    price: 950000,
    location: "FUT Minna",
    timePosted: "1 week ago",
    image: "/images/related_ad.webp",
    vendor: "Computer Village",
    vendorImage: "/images/vendor.jpg",
    condition: "Used",
    isSponsored: false,
    school: "Federal University of Science and Technology Minna",
  },
  {
    id: 8,
    name: "Designer Handbag",
    category: "Fashion & Accessories",
    subcategory: "Bags",
    price: 180000,
    location: "UniLag",
    timePosted: "2 weeks ago",
    image: "/images/image4.png",
    vendor: "Fashion Store",
    vendorImage: "/images/vendor.jpg",
    condition: "New",
    isSponsored: true,
    school: "Lagos State University",
  },
  {
    id: 9,
    name: "Smart TV 55 inch",
    category: "Home & Living",
    subcategory: "Appliances",
    price: 850000,
    location: "UniLag",
    timePosted: "3 days ago",
    image: "/images/image1.png",
    vendor: "Electronics Hub",
    vendorImage: "/images/vendor.jpg",
    condition: "New",
    isSponsored: false,
    school: "University of Lagos",
  },
  {
    id: 10,
    name: "Organic Rice 50kg",
    category: "Food",
    subcategory: "Organic",
    price: 45000,
    location: "ABU Zaria",
    timePosted: "1 day ago",
    image: "/images/image3.png",
    vendor: "Farm Fresh",
    vendorImage: "/images/vendor.jpg",
    condition: "New",
    isSponsored: false,
    school: "Ahmadu Bello University Zaria",
  },
]

// School options
const schoolTypes = [
  "Ahmadu Bello University Zaria",
  "Federal University of Science and Technology Minna",
  "Lagos State University",
  "College of Education zuba",
  "Abuja University",
  "University of Lagos",
  "University of Ibadan",
  "Obafemi Awolowo University",
  "University of Nigeria, Nsukka",
  "Federal University of Technology, Akure",
  "Covenant University",
  "Babcock University",
  "Landmark University",
  "Nnamdi Azikiwe University",
  "University of Port Harcourt",
]

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

// Updated category data structure to match ShopWithCategories
const categories = [
  {
    name: "Computer & Laptop",
    subcategories: [
      "Desktop",
      "Laptop",
      "Gaming PC",
      "Workstation",
      "Mini PC",
      "All-in-One",
      "Apple",
      "Dell",
      "HP",
      "Others",
    ],
  },
  {
    name: "Mobile",
    subcategories: [
      "iPhone",
      "Samsung",
      "Xiaomi",
      "Tecno",
      "Infinix",
      "Oppo",
      "Vivo",
      "Huawei",
      "Nokia",
      "Apple",
      "Others",
    ],
  },
  {
    name: "Phone Accessories",
    subcategories: [
      "Cases & Covers",
      "Screen Protectors",
      "Chargers",
      "Headphones",
      "Power Banks",
      "Cables",
      "Others",
    ],
  },
  {
    name: "Computer Accessories",
    subcategories: [
      "Keyboards",
      "Mouse",
      "Monitors",
      "Speakers",
      "Webcams",
      "Storage",
      "Others",
    ],
  },
  {
    name: "Fashion & Accessories",
    subcategories: [
      "Clothing",
      "Shoes",
      "Bags",
      "Jewelry",
      "Watches",
      "Sunglasses",
      "Others",
    ],
  },
  {
    name: "Home & Living",
    subcategories: [
      "Furniture",
      "Appliances",
      "Kitchen",
      "Decor",
      "Garden",
      "Lighting",
      "Others",
    ],
  },
  {
    name: "Food",
    subcategories: [
      "Fresh Food",
      "Packaged Food",
      "Beverages",
      "Snacks",
      "Organic",
      "Local Delicacies",
      "Others",
    ],
  },
  {
    name: "Gaming",
    subcategories: [
      "PlayStation",
      "Xbox",
      "Nintendo",
      "PC Gaming",
      "Mobile Gaming",
      "Accessories",
      "Others",
    ],
  },
]

// Price ranges
const priceRanges = [
  { label: "All Prices", value: "all" },
  { label: "Under ₦10,000", value: "0-10000" },
  { label: "₦10,000 - ₦50,000", value: "10000-50000" },
  { label: "₦50,000 - ₦100,000", value: "50000-100000" },
  { label: "₦100,000 - ₦500,000", value: "100000-500000" },
  { label: "₦500,000 - ₦1,000,000", value: "500000-1000000" },
  { label: "Above ₦1,000,000", value: "1000000-" },
]

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
  const [filterSchoolOpen, setFilterSchoolOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  const [schoolSearchTerm, setSchoolSearchTerm] = useState("")
  const [selectedSchoolForMobile, setSelectedSchoolForMobile] =
    useState<string>(selectedSchool)

  const [expandedSections, setExpandedSections] = useState<string[]>([
    "price",
    "category",
    "condition",
    "school",
  ])
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

    // Create category structure that matches the ads page filter system
    const categoryData = { [category]: ["All"] }
    params.set("categories", encodeURIComponent(JSON.stringify(categoryData)))

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

  // Filter schools based on search term
  const filteredSchools = schoolSearchTerm
    ? schoolTypes.filter((school) =>
        school.toLowerCase().includes(schoolSearchTerm.toLowerCase())
      )
    : schoolTypes

  // Handle school selection
  const handleSchoolSelect = (school: string) => {
    setSelectedSchool(school)
  }

  // Handle mobile school selection
  const handleMobileSchoolSelect = (school: string) => {
    setSelectedSchoolForMobile(school)
    setSelectedSchool(school)
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

  // Apply filters
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
    params.set("sort", sortOption)

    router.push(`/ads?${params.toString()}`)
    setIsFiltersOpen(false)
  }

  const handleApplyFilters = (
    school: string,
    filterParams: URLSearchParams
  ) => {
    setSelectedSchool(school)
    router.push(`/ads?${filterParams.toString()}`)
    setFilterSchoolOpen(false)
  }

  // Clear all filters
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
    setSelectedSchoolForMobile("")
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
  const filteredProducts = productResults.filter((product) => {
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

  // Format price with Naira symbol
  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`
  }

  // Initialize filters from URL params
  useEffect(() => {
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

  // Filter content component
  const FilterContent = () => (
    <div className="w-full flex flex-col gap-[14px]">
      {/* Selected School */}
      <div className="bg-white rounded-[12px] p-4 border border-[#EBEEF7] flex flex-col gap-2">
        <div
          className="flex justify-between items-center mb-2 cursor-pointer"
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
            <div className="flex items-center border rounded-md px-2">
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
                  <div key={school} className="flex items-center">
                    <RadioGroupItem
                      value={school}
                      id={`school-${school}`}
                      className="mr-2"
                    />
                    <Label
                      htmlFor={`school-${school}`}
                      className="text-sm cursor-pointer"
                    >
                      {school}
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
        <div className="bg-white rounded-t-[12px] p-4 border border-[#EBEEF7] flex flex-col gap-2">
          <div
            className="flex justify-between items-center mb-2 cursor-pointer"
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
                  {categories.map((category) => (
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
        <div className="bg-white p-4 border border-[#EBEEF7] flex flex-col gap-2">
          <div
            className="flex justify-between items-center mb-2 cursor-pointer"
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
        <div className="bg-white rounded-b-[12px] p-4 border border-[#EBEEF7] flex flex-col gap-2">
          <div
            className="flex justify-between items-center mb-2 cursor-pointer"
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
            <h3 className="text-sm font-medium uppercase">Prices (NGN)</h3>
            <ChevronRight
              className={`h-6 w-6 text-[#636A80] transition-transform ${
                expandedSections.includes("price") ? "transform rotate-90" : ""
              }`}
            />
          </div>
          {expandedSections.includes("price") && (
            <>
              <div className="flex gap-2 mb-4">
                <Input
                  type="number"
                  placeholder="Min price"
                  className="h-9 text-sm"
                  value={minPrice}
                  min={1}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="Max price"
                  className="h-9 text-sm"
                  value={maxPrice}
                  min={minPrice || 0}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>

              <RadioGroup
                value={priceRange}
                onValueChange={setPriceRange}
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

  return (
    <div className="w-full min-h-screen flex flex-col gap-4 bg-[#F4F6F8]">
      {/* Mobile Header */}
      <div className="xl:hidden bg-white px-4 py-3 flex items-center gap-3">
        <div className="w-full flex items-center relative gap-3">
          <BackButton onClick={() => router.push("/")} />
          <form onSubmit={handleSearch} className="flex-1 flex items-center">
            <div className="relative w-full">
              <Input
                ref={inputRef}
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                placeholder="Need something? Start typing..."
                className="bg-white h-12 w-full border border-[#DADDE5] px-4 py-2 pr-20 text-sm rounded-md placeholder:text-[#8B90A0] shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
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
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-secondary rounded-full flex justify-center items-center"
              >
                <Search className="h-4 w-4 text-white" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
          </form>

          {/* Mobile Suggestions Dropdown */}
          {showSuggestions && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
              <div className="py-2">
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((suggestion, index) => (
                    <div
                      key={`${suggestion.text}-${index}`}
                      className={`px-4 py-3 cursor-pointer text-[#6B7280] hover:bg-gray-50 transition-colors text-left ${
                        index === highlightedIndex ? "bg-gray-50" : ""
                      }`}
                      onClick={() => handleSuggestionClick(suggestion.text)}
                    >
                      <div className="flex items-center gap-1">
                        <span className="text-sm">{suggestion.text} in </span>
                        <span
                          className="text-[#3B82F6] font-medium cursor-pointer hover:underline text-sm"
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
                  <div className="px-4 py-6 text-center">
                    <div className="text-2xl mb-2">🔍</div>
                    <div className="text-gray-500 text-xs mb-2">
                      No results found for "{searchTerm}"
                    </div>
                    <button
                      onClick={clearSearch}
                      className="text-blue-500 text-xs hover:underline"
                    >
                      Clear search
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile School Selector and Filters */}
      <div className="xl:hidden bg-white px-4 py-3 flex items-center gap-3">
        <Button
          variant="ghost"
          onClick={() => setFilterSchoolOpen(true)}
          className="flex-1 h-12 bg-white border-[#EDEFF5] border rounded-md px-4 py-2 text-[14px] font-medium flex items-center text-[#6B7B8A] gap-2 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-1 focus-visible:ring-offset-white cursor-pointer justify-between"
        >
          <div className="flex items-center gap-2">
            <MapPinIcon className="h-4 w-4 text-secondary" />
            <span className="truncate">{selectedSchool || "All Schools"}</span>
          </div>
          <ChevronDown className="h-4 w-4 text-[#6B7B8A] flex-shrink-0" />
        </Button>
        <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="h-12 px-4 bg-white border-[#EDEFF5]"
            >
              Filters
              <SlidersHorizontal className="h-4 w-4 mr-2" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="flex justify-between items-center">
                <span>Filters</span>
                <button
                  onClick={clearFilters}
                  className="text-secondary text-sm font-circular-std"
                >
                  Reset all
                </button>
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Breadcrumb */}
      <div className="hidden xl:flex w-full bg-[#E8EBEE] h-[43px] items-center">
        <div className="w-full h-full max-w-[1320px] bg-[#E8EBEE] mx-auto">
          <BreadcrumbNav pathname={pathname} className="h-6" />
        </div>
      </div>

      {/* Results count and sort */}
      <div className="w-full max-w-[1320px] mx-auto flex justify-between items-center p-4 shadow-[0px_1px_0px_0px_#E8EBEE]">
        <h1 className="text-[16px] xl:text-[20px]/[32px] text-[#636A80] font-circular-std font-[450] tracking-normal">
          <span className="font-bold text-[#191F33]">
            {filteredProducts.length}
          </span>{" "}
          Results Found
          {selectedDirectCategory && (
            <span className="text-secondary ml-2">
              in {selectedDirectCategory}
            </span>
          )}
        </h1>
        <div className="flex items-center">
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[120px] h-9 bg-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="price_low">Price: Low to High</SelectItem>
              <SelectItem value="price_high">Price: High to Low</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="w-full max-w-[1320px] mx-auto px-4 py-6">
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Desktop Left sidebar - Filters */}
          <div className="hidden xl:flex w-full xl:w-[314px] flex-shrink-0 flex-col gap-[9px]">
            <div className="flex justify-between items-center px-2">
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

          {/* Main content - Product grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 xl:gap-4">
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

                {/* Load more section */}
                <div ref={loadMoreRef} className="mt-8 flex justify-center">
                  {filteredProducts.length > itemsToShow ? (
                    <button
                      onClick={() => {
                        setIsLoading(true)
                        setTimeout(() => {
                          setItemsToShow((prev) => prev + 6)
                          setIsLoading(false)
                        }, 800)
                      }}
                      className="px-5 py-2 bg-[#E8F7FF] text-secondary rounded flex items-center gap-2 hover:bg-[#E8F7FF]/100 transition-colors cursor-pointer font-circular-std font-bold text-[14px] xl:text-[16px]/[50px] capitalize tracking-normal"
                    >
                      {isLoading ? (
                        <>
                          <Spinner />
                          Loading...
                        </>
                      ) : (
                        <>
                          <SpinnerIcon />
                          Load More
                        </>
                      )}
                    </button>
                  ) : (
                    filteredProducts.length > 0 && (
                      <p className="font-circular-std font-bold text-[14px] xl:text-[16px]/[50px] text-foreground/40">
                        No more products to load
                      </p>
                    )
                  )}
                </div>
              </>
            ) : (
              <div className="bg-white rounded-md p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h2 className="text-xl font-semibold font-circular-std text-[#464D61] mb-2">
                  No Results Found
                </h2>
                <p className="text-[#464D61] font-normal font-circular-std tracking-normal mb-6">
                  We couldn't find any products matching your search criteria.
                  Try adjusting your filters or search terms.
                </p>
                <Button onClick={clearFilters} className="bg-secondary">
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Filter Dialog */}
      <FilterSchoolDialog
        open={filterSchoolOpen}
        onOpenChange={setFilterSchoolOpen}
        selectedSchool={selectedSchool}
        onApplyFilters={handleApplyFilters}
      />
    </div>
  )
}
