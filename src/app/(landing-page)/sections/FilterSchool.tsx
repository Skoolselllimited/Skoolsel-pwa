"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Filter, X, ArrowLeft, Search } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

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

interface FilterSchoolDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedSchool: string
  onApplyFilters: (school: string, filterParams: URLSearchParams) => void
}

export default function FilterSchoolDialog({
  open,
  onOpenChange,
  selectedSchool: initialSelectedSchool,
  onApplyFilters,
}: FilterSchoolDialogProps) {
  const searchParams = useSearchParams()

  // Dialog state
  const [step, setStep] = useState<"school" | "filter">("school")

  // School state
  const [selectedSchool, setSelectedSchool] = useState<string[]>(
    initialSelectedSchool ? [initialSelectedSchool] : []
  )
  const [schoolSearchTerm, setSchoolSearchTerm] = useState("")

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<
    Record<string, string[]>
  >({})
  const [selectedCondition, setSelectedCondition] = useState<string>("all")
  const [priceRange, setPriceRange] = useState<string>("all")
  const [minPrice, setMinPrice] = useState<string>("")
  const [maxPrice, setMaxPrice] = useState<string>("")
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])

  // Reset to school selection when dialog opens
  useEffect(() => {
    if (open) {
      // If a school is already selected, go to filter step
      if (initialSelectedSchool) {
        setStep("filter")
      } else {
        setStep("school")
      }

      setSelectedSchool(initialSelectedSchool ? [initialSelectedSchool] : [])
    }
  }, [open, initialSelectedSchool])

  // Initialize filters from URL params when dialog opens
  useEffect(() => {
    if (open && step === "filter") {
      // Get price filters from URL
      const priceRangeParam = searchParams.get("priceRange") || "all"
      setPriceRange(priceRangeParam)

      const minPriceParam = searchParams.get("minPrice") || ""
      setMinPrice(minPriceParam)

      const maxPriceParam = searchParams.get("maxPrice") || ""
      setMaxPrice(maxPriceParam)

      // Get condition from URL
      const conditionParam = searchParams.get("condition") || "all"
      setSelectedCondition(conditionParam)

      // Get categories from URL
      const categoriesParam = searchParams.get("categories")
      if (categoriesParam) {
        try {
          setSelectedCategories(JSON.parse(decodeURIComponent(categoriesParam)))
        } catch (e) {
          console.error("Failed to parse categories from URL", e)
        }
      } else {
        setSelectedCategories({})
      }
    }
  }, [open, step, searchParams])

  // Filter schools based on search term
  const filteredSchools = schoolSearchTerm
    ? schoolTypes.filter((school) =>
        school.toLowerCase().includes(schoolSearchTerm.toLowerCase())
      )
    : schoolTypes

  // Handle school selection
  const handleSchoolSelect = (school: string, checked: boolean) => {
    if (checked) {
      setSelectedSchool((prev) => [...prev, school])
    } else {
      setSelectedSchool((prev) => prev.filter((s) => s !== school))
    }
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
    setExpandedCategories((prev) => {
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
    const query = searchParams.get("q")
    if (query) {
      params.set("q", query)
    }

    // Add selected schools
    if (selectedSchool.length > 0) {
      params.set("schools", selectedSchool.join(","))
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

    onApplyFilters(selectedSchool.join(","), params)
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories({})
    setSelectedCondition("all")
    setPriceRange("all")
    setMinPrice("")
    setMaxPrice("")
  }

  // Count total selected filters
  const getTotalSelectedFilters = () => {
    let count = 0

    // Count selected categories
    Object.values(selectedCategories).forEach((subcategories) => {
      count += subcategories.length
    })

    // Count price filters
    if (priceRange !== "all" || minPrice || maxPrice) {
      count += 1
    }

    // Count condition
    if (selectedCondition !== "all") {
      count += 1
    }

    return count
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 max-h-[90vh] overflow-hidden flex flex-col">
        {step === "school" ? (
          <>
            <DialogHeader className="p-4 border-b sticky top-0 bg-white z-10">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-xl">Select School</DialogTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onOpenChange(false)}
                  className="h-8 w-8 rounded-full"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex items-center border rounded-md px-2 mb-4 bg-gray-50">
                <Search className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <Input
                  placeholder="Search schools..."
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-10 text-sm bg-transparent"
                  value={schoolSearchTerm}
                  onChange={(e) => setSchoolSearchTerm(e.target.value)}
                />
                {schoolSearchTerm && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 p-0"
                    onClick={() => setSchoolSearchTerm("")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>

              <div className="space-y-2">
                {filteredSchools.length > 0 ? (
                  filteredSchools.map((school) => (
                    <div
                      key={school}
                      className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md"
                    >
                      <Checkbox
                        id={`school-${school}`}
                        checked={selectedSchool.includes(school)}
                        onCheckedChange={(checked) =>
                          handleSchoolSelect(school, !!checked)
                        }
                      />
                      <Label
                        htmlFor={`school-${school}`}
                        className="text-sm cursor-pointer flex-1"
                      >
                        {school}
                      </Label>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-sm text-gray-500">
                    No schools match your search
                  </div>
                )}
              </div>
            </div>

            <DialogFooter className="p-4 border-t sticky bottom-0 bg-white z-10">
              <div className="flex w-full gap-3">
                <Button
                  onClick={() => {
                    if (selectedSchool.length > 0) {
                      setStep("filter")
                    }
                  }}
                  className="flex-1"
                  disabled={selectedSchool.length === 0}
                >
                  Continue to Filters
                </Button>
              </div>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader className="p-4 border-b sticky top-0 bg-white z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setStep("school")}
                    className="h-8 w-8 rounded-full mr-1"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back to School Selection</span>
                  </Button>
                  <DialogTitle className="text-xl flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filters
                    {getTotalSelectedFilters() > 0 && (
                      <span className="bg-secondary text-white text-xs rounded-full px-2 py-0.5 ml-2">
                        {getTotalSelectedFilters()}
                      </span>
                    )}
                  </DialogTitle>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onOpenChange(false)}
                  className="h-8 w-8 rounded-full bg-white hover:bg-white"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
              <div className="mt-2 text-sm font-circular-std text-gray-500">
                Schools:{" "}
                {selectedSchool.length > 0
                  ? selectedSchool.join(", ")
                  : "None selected"}
              </div>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto p-4">
              {/* Price Section */}
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-3">Price</h3>

                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1">
                    <Label
                      htmlFor="min-price"
                      className="text-sm text-gray-500 mb-1 block"
                    >
                      Min
                    </Label>
                    <Input
                      id="min-price"
                      type="number"
                      placeholder="₦0"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="h-10"
                    />
                  </div>
                  <div className="pt-6">-</div>
                  <div className="flex-1">
                    <Label
                      htmlFor="max-price"
                      className="text-sm text-gray-500 mb-1 block"
                    >
                      Max
                    </Label>
                    <Input
                      id="max-price"
                      type="number"
                      placeholder="No limit"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="h-10"
                    />
                  </div>
                </div>

                <RadioGroup
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="space-y-2"
                >
                  {priceRanges.map((range) => (
                    <div key={range.value} className="flex items-center gap-3">
                      <RadioGroupItem
                        value={range.value}
                        id={`price-${range.value}`}
                      />
                      <Label
                        htmlFor={`price-${range.value}`}
                        className="text-sm cursor-pointer flex-1"
                      >
                        {range.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <Separator className="my-6" />

              {/* Categories Section */}
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-3">Categories</h3>

                <Accordion
                  type="multiple"
                  value={expandedCategories}
                  className="w-full"
                >
                  {categories.map((category) => (
                    <AccordionItem
                      key={category.name}
                      value={category.name}
                      className="border-b"
                    >
                      <AccordionTrigger
                        onClick={(e) => {
                          e.preventDefault()
                          toggleCategoryExpansion(category.name)
                        }}
                        className="py-2 hover:no-underline"
                      >
                        <span className="text-sm font-medium">
                          {category.name}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pl-2 space-y-1 py-1">
                          {category.subcategories.map((subcategory) => (
                            <div
                              key={subcategory}
                              className="flex items-center gap-3 py-1"
                            >
                              <Checkbox
                                id={`${category.name}-${subcategory}`}
                                checked={(
                                  selectedCategories[category.name] || []
                                ).includes(subcategory)}
                                onCheckedChange={() =>
                                  handleCategorySelection(
                                    category.name,
                                    subcategory
                                  )
                                }
                              />
                              <Label
                                htmlFor={`${category.name}-${subcategory}`}
                                className="text-sm cursor-pointer flex-1"
                              >
                                {subcategory}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              <Separator className="my-6" />

              {/* Condition Section */}
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-3">Condition</h3>

                <RadioGroup
                  value={selectedCondition}
                  onValueChange={setSelectedCondition}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="all" id="condition-all" />
                    <Label
                      htmlFor="condition-all"
                      className="text-sm cursor-pointer flex-1"
                    >
                      All
                    </Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="new" id="condition-new" />
                    <Label
                      htmlFor="condition-new"
                      className="text-sm cursor-pointer flex-1"
                    >
                      New
                    </Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="used" id="condition-used" />
                    <Label
                      htmlFor="condition-used"
                      className="text-sm cursor-pointer flex-1"
                    >
                      Used
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <DialogFooter className="p-4 border-t sticky bottom-0 bg-white z-10">
              <div className="flex w-full gap-3">
                <Button onClick={clearFilters}>Clear All</Button>
                <Button onClick={applyFilters}>Apply Filters</Button>
              </div>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
