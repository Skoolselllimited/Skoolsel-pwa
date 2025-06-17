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
import { Checkbox } from "@/components/ui/checkbox"
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
  ArrowLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"

// Sample product data
const productResults = [
  {
    id: 1,
    name: "iPhone 13 Pro Max",
    category: "Electronics",
    subcategory: "Apple",
    price: 750000,
    location: "Umuahia",
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
    category: "Computers",
    subcategory: "Apple",
    price: 1200000,
    location: "Lagos",
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
    location: "Abuja",
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
    name: "Sony WH-1000XM4 Headphones",
    category: "Audio",
    subcategory: "Sony",
    price: 180000,
    location: "Port Harcourt",
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
    location: "Kano",
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
    subcategory: "Sony",
    price: 420000,
    location: "Enugu",
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
    category: "Computers",
    subcategory: "Dell",
    price: 950000,
    location: "Ibadan",
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
    name: "Canon EOS R5",
    category: "Cameras",
    subcategory: "Canon",
    price: 1800000,
    location: "Kaduna",
    timePosted: "2 weeks ago",
    image: "/images/image4.png",
    vendor: "Photo Studio",
    vendorImage: "/images/vendor.jpg",
    condition: "New",
    isSponsored: true,
    school: "Lagos State University",
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

// Category data structure
const categories = [
  {
    name: "Mobile",
    subcategories: [
      "Apple",
      "Samsung",
      "Xiaomi",
      "Tecno",
      "Infinix",
      "Oppo",
      "Vivo",
      "Huawei",
      "Nokia",
      "Others",
    ],
  },
  {
    name: "Vehicle",
    subcategories: [
      "Toyota",
      "Honda",
      "Mercedes-Benz",
      "BMW",
      "Ford",
      "Hyundai",
      "Kia",
      "Nissan",
      "Lexus",
      "Others",
    ],
  },
  {
    name: "Properties",
    subcategories: [
      "Apartments",
      "Houses",
      "Land",
      "Commercial",
      "Short Lets",
      "Event Centers",
      "Others",
    ],
  },
  {
    name: "Essentials",
    subcategories: [
      "Clothing",
      "Shoes",
      "Bags",
      "Jewelry",
      "Watches",
      "Cosmetics",
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
      "Others",
    ],
  },
  {
    name: "Business & Industry",
    subcategories: [
      "Equipment",
      "Tools",
      "Office",
      "Medical",
      "Construction",
      "Others",
    ],
  },
  {
    name: "Education",
    subcategories: ["Books", "Courses", "Tutoring", "Stationery", "Others"],
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
  const [searchQuery, setSearchQuery] = useState(query)
  const [schoolSearchTerm, setSchoolSearchTerm] = useState("")
  const [selectedSchools, setSelectedSchools] = useState<string[]>(
    schoolsParam ? schoolsParam.split(",") : []
  )
  const [selectedSchoolForMobile, setSelectedSchoolForMobile] =
    useState<string>(selectedSchools.length > 0 ? selectedSchools[0] : "")
  // Change the expandedCategories state to only handle main sections
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "price",
    "category",
    "condition",
    "school",
  ])
  // Add a new state for subcategories
  const [expandedSubcategories, setExpandedSubcategories] = useState<string[]>(
    []
  )

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<
    Record<string, string[]>
  >({})
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
  // Add pagination state
  const [itemsToShow, setItemsToShow] = useState<number>(10)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  // Mobile states
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  // Filter schools based on search term
  const filteredSchools = schoolSearchTerm
    ? schoolTypes.filter((school) =>
        school.toLowerCase().includes(schoolSearchTerm.toLowerCase())
      )
    : schoolTypes

  // Handle school selection
  const handleSchoolSelect = (school: string, checked: boolean) => {
    if (checked) {
      setSelectedSchools((prev) => [...prev, school])
    } else {
      setSelectedSchools((prev) => prev.filter((s) => s !== school))
    }
  }

  // Handle mobile school selection
  const handleMobileSchoolSelect = (school: string) => {
    setSelectedSchoolForMobile(school)
    setSelectedSchools([school])
  }

  // Handle category selection
  const handleCategorySelection = (category: string, subcategory: string) => {
    setSelectedCategories((prev) => {
      const currentSubcategories = prev[category] || []

      if (currentSubcategories.includes(subcategory)) {
        // Remove subcategory if already selected
        const updatedSubcategories = currentSubcategories.filter(
          (sub) => sub !== subcategory
        )

        if (updatedSubcategories.length === 0) {
          // Remove category key if no subcategories left
          const { [category]: _, ...rest } = prev
          return rest
        } else {
          // Update subcategories for this category
          return { ...prev, [category]: updatedSubcategories }
        }
      } else {
        // Add subcategory
        return { ...prev, [category]: [...currentSubcategories, subcategory] }
      }
    })
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
    if (searchQuery) {
      params.set("q", searchQuery)
    }

    // Add selected schools
    if (selectedSchools.length > 0) {
      params.set("schools", selectedSchools.join(","))
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

    // Add categories
    if (Object.keys(selectedCategories).length > 0) {
      params.set(
        "categories",
        encodeURIComponent(JSON.stringify(selectedCategories))
      )
    }

    // Add sort option
    params.set("sort", sortOption)

    router.push(`/ads?${params.toString()}`)
    setIsFiltersOpen(false)
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedSchools([])
    setSelectedCategories({})
    setSelectedCondition("all")
    setPriceRange("all")
    setMinPrice("")
    setMaxPrice("")
    setSearchQuery("")
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

  // Filter products based on all filters
  const filteredProducts = productResults.filter((product) => {
    // Match by search query if provided
    const matchesQuery =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())

    // Match by schools if any are selected
    const matchesSchool =
      selectedSchools.length === 0 || selectedSchools.includes(product.school)

    // Match by price (both custom range and predefined ranges)
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

    // Match by categories
    let matchesCategory = true
    if (Object.keys(selectedCategories).length > 0) {
      matchesCategory = false
      for (const [category, subcategories] of Object.entries(
        selectedCategories
      )) {
        if (
          product.category.toLowerCase() === category.toLowerCase() &&
          subcategories.some(
            (sub) => product.subcategory.toLowerCase() === sub.toLowerCase()
          )
        ) {
          matchesCategory = true
          break
        }
      }
    }

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
    // Get categories from URL
    const categoriesParam = searchParams.get("categories")
    if (categoriesParam) {
      try {
        setSelectedCategories(JSON.parse(decodeURIComponent(categoriesParam)))
      } catch (e) {
        console.error("Failed to parse categories", e)
      }
    }
  }, [searchParams])

  // Add this useEffect for intersection observer after the other useEffect hooks
  useEffect(() => {
    // Set up intersection observer for infinite scroll
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && filteredProducts.length > itemsToShow) {
          // Add a small delay to simulate loading
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
  }, [filteredProducts.length])

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
          {selectedSchools.length > 0
            ? selectedSchools.join(", ")
            : schoolSearchTerm}
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
              {filteredSchools.map((school) => (
                <div key={school} className="flex items-center">
                  <Checkbox
                    id={`school-${school}`}
                    checked={selectedSchools.includes(school)}
                    onCheckedChange={(checked) =>
                      handleSchoolSelect(school, !!checked)
                    }
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
            {Object.keys(selectedCategories).length > 0
              ? Object.entries(selectedCategories)
                  .map(([category, subcategories]) =>
                    subcategories
                      .map((sub) => `${category} - ${sub}`)
                      .join(", ")
                  )
                  .join(", ")
              : "All"}
          </div>
          {expandedSections.includes("category") && (
            <div className="mt-2">
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
                    <span className="text-[16px]/[24px] font-medium font-circular-std tracking-normal text-foreground">
                      {category.name}
                    </span>
                    <ChevronRight
                      className={`h-5 w-5 text-gray-400 transition-transform ${
                        expandedSubcategories.includes(category.name)
                          ? "transform rotate-90"
                          : ""
                      }`}
                    />
                  </div>
                  {expandedSubcategories.includes(category.name) && (
                    <div className="pl-4 space-y-2 mt-1">
                      {category.subcategories.map((subcategory) => (
                        <div key={subcategory} className="flex items-center">
                          <Checkbox
                            checked={
                              selectedCategories[category.name]?.includes(
                                subcategory
                              ) || false
                            }
                            onCheckedChange={(checked) =>
                              handleCategorySelection(
                                category.name,
                                subcategory
                              )
                            }
                            className="mr-2"
                          />
                          <Label className="text-sm">{subcategory}</Label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
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
                  min={minPrice}
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
        <Button onClick={clearFilters} variant="outline" className="flex-1">
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
        <div className="flex-1 relative">
          <ArrowLeft className="h-6 w-6 text-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
          <Input
            placeholder="Need something? Start typing..."
            className="w-full h-12 bg-white border-[#DADDE5] placeholder:text-[#8B90A0] font-nunito rounded-md py-1 pl-10 pr-[10px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                applyFilters()
              }
            }}
          />
          <button className="w-10 h-10 bg-secondary rounded-full flex justify-center items-center absolute right-3 top-1/2 transform -translate-y-1/2">
            <Search className=" h-4 w-4 text-white" />
          </button>
        </div>
      </div>
      {/* Mobile School Selector and Filters */}
      <div className="xl:hidden bg-white px-4 py-3 flex items-center gap-3">
        <Select
          value={selectedSchoolForMobile}
          onValueChange={handleMobileSchoolSelect}
        >
          <SelectTrigger className="flex-1 h-12 bg-white border-[#EDEFF5]">
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-4 w-4 text-secondary" />
              <SelectValue placeholder="Select School" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {schoolTypes.map((school) => (
              <SelectItem key={school} value={school}>
                {school}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
                  className="text-blue-500 text-sm"
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
          <BreadcrumbNav items={breadcrumbItems} className=" h-6" />
        </div>
      </div>

      {/* Results count and sort */}
      <div className="w-full max-w-[1320px] mx-auto flex justify-between items-center p-4 shadow-[0px_1px_0px_0px_#E8EBEE]">
        <h1 className="text-[16px] xl:text-[20px]/[32px] text-[#636A80] font-nunito font-[450] tracking-normal">
          <span className="font-bold text-[#191F33]">
            {filteredProducts.length}
          </span>{" "}
          Results Found
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
                className="text-secondary text-[18px]/[32px] font-circular-std italic tracking-normal hover:underline"
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
                          src={ad.image}
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
                <h2 className="text-xl font-semibold font-nunito-sans text-[#464D61] mb-2">
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
    </div>
  )
}
