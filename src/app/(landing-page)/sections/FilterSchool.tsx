"use client"

import type React from "react"

import DialogHead from "@/components/DialogHead"
import {
  EducationCap,
  HandShakeIcon,
  HomeIcon,
  MobilePhone,
  ShopIcon,
  Vehicle,
  Wrench,
} from "@/components/svgs"
import SearchIcon from "@/components/svgs/search"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useMediaQuery } from "@/hooks/use-mobile"
import { ChevronRight, PlusIcon, X, Minus } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

// Category type definition
interface Category {
  name: string
  icon: React.ComponentType
  subcategories: string[]
}

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
const categories: Category[] = [
  {
    name: "Mobile",
    icon: MobilePhone,
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
    icon: Vehicle,
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
    icon: ShopIcon,
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
    icon: Wrench,
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
    icon: HomeIcon,
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
    icon: HandShakeIcon,
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
    icon: EducationCap,
    subcategories: ["Books", "Courses", "Tutoring", "Stationery", "Others"],
  },
]

// Price ranges
const priceRanges = [
  { label: "All Price", value: "all" },
  { label: "Under N20", value: "0-20" },
  { label: "N25 to N100", value: "25-100" },
  { label: "N300 to N500", value: "300-500" },
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
  const isLargeDevice = useMediaQuery("(min-width: 1024px)")

  // Dialog state - added subcategories step
  const [step, setStep] = useState<
    | "school"
    | "filter"
    | "categories"
    | "subcategories"
    | "conditions"
    | "schools"
    | "prices"
  >("school")
  const [selectedSchool, setSelectedSchool] = useState<string>(
    initialSelectedSchool || ""
  )
  const [schoolSearchTerm, setSchoolSearchTerm] = useState("")

  // Filter states - Changed to single category/subcategory selection
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("")
  const [selectedCondition, setSelectedCondition] = useState<string>("any")
  const [priceRange, setPriceRange] = useState<string>("all")
  const [minPrice, setMinPrice] = useState<string>("")
  const [maxPrice, setMaxPrice] = useState<string>("")
  const [selectedTopSchool, setSelectedTopSchool] = useState<string>("")

  // Current category for subcategory view
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null)

  // Reset dialog state when opened
  useEffect(() => {
    if (open) {
      if (isLargeDevice) {
        setStep("school")
      } else {
        // Skip school selection on mobile, go directly to filters
        setStep("filter")
      }
      setSelectedSchool(initialSelectedSchool || "")
      setSelectedTopSchool(initialSelectedSchool || "")
    }
  }, [open, initialSelectedSchool, isLargeDevice])

  // Filter schools based on search term
  const filteredSchools = schoolSearchTerm
    ? schoolTypes.filter((school) =>
        school.toLowerCase().includes(schoolSearchTerm.toLowerCase())
      )
    : schoolTypes

  // Handle school selection (single for large devices, single for small)
  const handleSchoolSelect = (school: string) => {
    if (isLargeDevice) {
      // Large devices: single selection, immediate apply
      setSelectedSchool(school)
      onApplyFilters(school, new URLSearchParams())
      onOpenChange(false)
      setStep("school")
    } else {
      // Small devices: single selection for now
      setSelectedSchool(school)
    }
  }

  // Handle top school selection for mobile
  const handleTopSchoolSelect = (school: string) => {
    setSelectedTopSchool(school)
  }

  // Handle category selection - navigate to subcategories step
  const handleCategoryClick = (category: Category) => {
    setCurrentCategory(category)
    setStep("subcategories")
  }

  // Handle subcategory selection - Updated for single selection
  const handleSubcategorySelect = (subcategory: string) => {
    if (currentCategory) {
      setSelectedCategory(currentCategory.name)
      setSelectedSubcategory(subcategory)
    }
  }

  // Apply filters
  const applyFilters = () => {
    const params = new URLSearchParams()

    // Add search query if it exists
    const query = searchParams.get("q")
    if (query) {
      params.set("q", query)
    }

    // Add selected school only if one is specifically chosen (not "All schools")
    const schoolToUse = selectedTopSchool || selectedSchool
    if (schoolToUse && schoolToUse !== "") {
      params.set("schools", schoolToUse)
    }

    // Add price filters
    if (priceRange !== "all") {
      params.set("priceRange", priceRange)
    }
    if (minPrice) params.set("minPrice", minPrice)
    if (maxPrice) params.set("maxPrice", maxPrice)

    // Add condition
    if (selectedCondition !== "any") {
      params.set("condition", selectedCondition)
    }

    // Add category and subcategory - Updated for single selection
    if (selectedCategory && selectedSubcategory) {
      const categoryData = { [selectedCategory]: [selectedSubcategory] }
      params.set("categories", encodeURIComponent(JSON.stringify(categoryData)))
    }

    onApplyFilters(schoolToUse, params)
  }

  // Clear filters for current section
  const clearCurrentFilters = () => {
    if (step === "categories" || step === "subcategories") {
      setSelectedCategory("")
      setSelectedSubcategory("")
    } else if (step === "conditions") {
      setSelectedCondition("any")
    } else if (step === "schools") {
      setSelectedTopSchool("")
    } else if (step === "prices") {
      setPriceRange("all")
      setMinPrice("")
      setMaxPrice("")
    }
  }

  // Get total selected filters count
  const getTotalSelectedFilters = () => {
    let count = 0
    if (selectedCategory && selectedSubcategory) count += 1
    if (priceRange !== "all" || minPrice || maxPrice) count += 1
    if (selectedCondition !== "any") count += 1
    return count
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`p-0 overflow-hidden flex flex-col ${
          isLargeDevice
            ? "sm:max-w-[800px] max-h-[90vh]"
            : "w-full h-full max-w-none max-h-none m-0 rounded-none"
        }`}
      >
        {/* School Selection Step */}
        {step === "school" && (
          <>
            <DialogHeader className="p-4">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-lg">Select School</DialogTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onOpenChange(false)}
                  className="h-8 w-8 bg-white hover:bg-white text-[#0A243F] z-10"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto p-4">
              <Input
                type="search"
                placeholder="Search for school..."
                value={schoolSearchTerm}
                onChange={(e) => setSchoolSearchTerm(e.target.value)}
                className="mb-4 placeholder:text-[#8B90A0] text-[16px]/[160%]"
              />

              {filteredSchools.length === 0 && schoolSearchTerm ? (
                <div className="flex flex-col items-center justify-center py-8 text-center gap-[30px]">
                  <SearchIcon />
                  <p className="text-sm xl:text-[20px]/[24px] font-medium font-circular-std text-center text-[#464D61]">
                    Sorry, nothing matched your search. Want to give it another
                    shot?
                  </p>
                  <Button size="sm" onClick={() => setSchoolSearchTerm("")}>
                    Clear search
                  </Button>
                </div>
              ) : (
                <RadioGroup
                  value={selectedSchool}
                  onValueChange={handleSchoolSelect}
                  className="space-y-3"
                >
                  {filteredSchools.map((school) => (
                    <div
                      key={school}
                      className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md"
                    >
                      <RadioGroupItem value={school} id={`school-${school}`} />
                      <Label
                        htmlFor={`school-${school}`}
                        className="text-sm text-[#464D61] font-circular-std font-normal cursor-pointer flex-1"
                      >
                        {school}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </div>

            {!isLargeDevice && (
              <DialogFooter className="p-4">
                <div className="flex w-full gap-3">
                  <Button
                    className="h-[50px] flex-1 py-[17.58px] bg-secondary"
                    onClick={() => setStep("filter")}
                  >
                    Confirm
                  </Button>
                </div>
              </DialogFooter>
            )}
          </>
        )}

        {/* Main Filters Step */}
        {step === "filter" && (
          <>
            <DialogHead
              back={() =>
                isLargeDevice ? setStep("school") : onOpenChange(false)
              }
              title="Filters"
              clearText={`Clear All ${getTotalSelectedFilters() > 0 && getTotalSelectedFilters()}`}
            />

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* TOP SCHOOLS */}
              <div className="flex flex-col gap-1 border-b border-[#EBEEF7] pb-2">
                <div
                  className="flex items-center justify-between py-3 cursor-pointer"
                  onClick={() => setStep("schools")}
                >
                  <h3 className="text-[#191F33] font-circular-std font-medium text-base tracking-normal">
                    TOP SCHOOLS
                  </h3>
                  <ChevronRight className="h-6 w-6 text-gray-400" />
                </div>
                <div className="text-secondary font-normal font-circular-std text-base tracking-normal">
                  {selectedTopSchool || selectedSchool || "All schools"}
                </div>
              </div>

              {/* PRICES (NGN) */}
              <div className="flex flex-col gap-1 border-b border-[#EBEEF7] pb-2">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setStep("prices")}
                >
                  <h3 className="text-[#191F33] font-circular-std font-medium text-base tracking-normal">
                    PRICES (NGN)
                  </h3>
                  <ChevronRight className="h-6 w-6 text-gray-400" />
                </div>
                <div className="text-secondary font-normal font-circular-std text-base tracking-normal">
                  {priceRange !== "all"
                    ? priceRanges.find((r) => r.value === priceRange)?.label
                    : minPrice || maxPrice
                      ? `₦${minPrice || "0"} - ₦${maxPrice || "∞"}`
                      : "All prices"}
                </div>
              </div>

              {/* CATEGORY */}
              <div className="flex flex-col gap-1 border-b border-[#EBEEF7] pb-2">
                <div
                  className="flex items-center justify-between py-3 cursor-pointer"
                  onClick={() => setStep("categories")}
                >
                  <h3 className="text-[#191F33] font-circular-std font-medium text-base tracking-normal">
                    CATEGORY
                  </h3>
                  <ChevronRight className="h-6 w-6 text-gray-400" />
                </div>
                <div className="text-secondary font-normal font-circular-std text-base tracking-normal">
                  {selectedCategory && selectedSubcategory
                    ? `${selectedCategory} - ${selectedSubcategory}`
                    : "All categories"}
                </div>
              </div>

              {/* CONDITIONS */}
              <div className="flex flex-col gap-1 border-b border-[#EBEEF7] pb-2">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setStep("conditions")}
                >
                  <h3 className="text-[#191F33] font-circular-std font-medium text-base tracking-normal">
                    CONDITIONS
                  </h3>
                  <ChevronRight className="h-6 w-6 text-gray-400" />
                </div>
                <div className="text-secondary font-normal font-circular-std text-base tracking-normal capitalize">
                  {selectedCondition === "any" ? "Any" : selectedCondition}
                </div>
              </div>
            </div>

            <DialogFooter className="p-4">
              <Button
                onClick={applyFilters}
                className="py-[17.58px] w-full bg-[#54ABDB] hover:bg-[#54ABDB]/60"
              >
                Apply Filter
              </Button>
            </DialogFooter>
          </>
        )}

        {/* Categories Step - Only shows main categories */}
        {step === "categories" && (
          <>
            <DialogHead
              back={() => setStep("filter")}
              title="Categories"
              clearText="Clear All"
              clear={clearCurrentFilters}
            />
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50 rounded-md px-2"
                  onClick={() => handleCategoryClick(category)}
                >
                  <div className="flex items-center gap-3">
                    <category.icon />
                    <span className="font-circular-std font-normal text-base text-[#464D61]">
                      {category.name}
                    </span>
                    {selectedCategory === category.name &&
                      selectedSubcategory && (
                        <span className="text-xs text-secondary">
                          {selectedSubcategory}
                        </span>
                      )}
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              ))}
            </div>

            <DialogFooter className="p-4">
              <Button
                onClick={() => setStep("filter")}
                className="w-full h-[50px] rounded-[3.3px] px-[17.58px] bg-[#54ABDB] hover:bg-[#54ABDB]/60"
              >
                Confirm
              </Button>
            </DialogFooter>
          </>
        )}

        {/* Subcategories Step - Shows subcategories for selected category */}
        {step === "subcategories" && currentCategory && (
          <>
            <DialogHead
              back={() => setStep("categories")}
              title={currentCategory.name}
              clearText="Clear All"
              clear={clearCurrentFilters}
            />
            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex items-center gap-3 mb-4">
                <currentCategory.icon />
                <span className="font-medium">{currentCategory.name}</span>
              </div>

              <RadioGroup
                value={
                  selectedCategory === currentCategory.name
                    ? selectedSubcategory
                    : ""
                }
                onValueChange={handleSubcategorySelect}
                className="space-y-3"
              >
                {currentCategory.subcategories.map((subcategory) => (
                  <div
                    key={subcategory}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem
                        value={subcategory}
                        id={`sub-${subcategory}`}
                      />
                      <Label
                        htmlFor={`sub-${subcategory}`}
                        className="text-sm flex-1 cursor-pointer"
                      >
                        {subcategory}
                      </Label>
                    </div>
                    {selectedCategory === currentCategory.name &&
                    selectedSubcategory === subcategory ? (
                      <Minus className="h-4 w-4 text-gray-400" />
                    ) : (
                      <PlusIcon className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                ))}
              </RadioGroup>
            </div>

            <DialogFooter className="p-4">
              <Button
                onClick={() => setStep("filter")}
                className="w-full h-[50px] rounded-[3.3px] px-[17.58px] bg-[#54ABDB] hover:bg-[#54ABDB]/60"
              >
                Confirm
              </Button>
            </DialogFooter>
          </>
        )}

        {/* Conditions Step */}
        {step === "conditions" && (
          <>
            <DialogHead
              back={() => setStep("filter")}
              title="Conditions"
              clearText="Clear All"
              clear={clearCurrentFilters}
            />

            <div className="flex-1 overflow-y-auto p-4">
              <RadioGroup
                value={selectedCondition}
                onValueChange={setSelectedCondition}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="any" id="condition-any" />
                  <Label
                    htmlFor="condition-any"
                    className="text-sm flex-1 cursor-pointer"
                  >
                    Any
                  </Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="used" id="condition-used" />
                  <Label
                    htmlFor="condition-used"
                    className="text-sm flex-1 cursor-pointer"
                  >
                    Used
                  </Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="new" id="condition-new" />
                  <Label
                    htmlFor="condition-new"
                    className="text-sm flex-1 cursor-pointer"
                  >
                    New
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <DialogFooter className="p-4">
              <Button
                onClick={() => setStep("filter")}
                className="w-full h-[50px] rounded-[3.3px] px-[17.58px] bg-[#54ABDB] hover:bg-[#54ABDB]/60"
              >
                Confirm
              </Button>
            </DialogFooter>
          </>
        )}

        {/* Top Schools Step */}
        {step === "schools" && (
          <>
            <DialogHead
              back={() => setStep("filter")}
              title="All Schools"
              clearText="Clear All"
              clear={clearCurrentFilters}
            />

            <div className="flex-1 overflow-y-auto p-4">
              <Input
                type="search"
                placeholder="Search for school..."
                value={schoolSearchTerm}
                onChange={(e) => setSchoolSearchTerm(e.target.value)}
                className="mb-4"
              />

              {filteredSchools.length === 0 && schoolSearchTerm ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <SearchIcon />
                  </div>
                  <h3 className="font-medium text-[#191F33] font-circular-std text-base tracking-normal mb-2">
                    No schools found
                  </h3>
                  <p className="text-secondary font-normal font-circular-std text-base tracking-normal">
                    We couldn't find any schools matching "{schoolSearchTerm}".
                    Try adjusting your search term.
                  </p>
                  <Button size="sm" onClick={() => setSchoolSearchTerm("")}>
                    Clear search
                  </Button>
                </div>
              ) : (
                <RadioGroup
                  value={selectedTopSchool}
                  onValueChange={handleTopSchoolSelect}
                  className="space-y-3"
                >
                  {schoolTypes.map((school) => (
                    <div key={school} className="flex items-center gap-3">
                      <RadioGroupItem
                        value={school}
                        id={`school-radio-${school}`}
                      />
                      <Label
                        htmlFor={`school-radio-${school}`}
                        className="text-sm flex-1 cursor-pointer"
                      >
                        {school}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </div>

            <DialogFooter className="p-4">
              <Button
                onClick={() => setStep("filter")}
                className="w-full h-[50px] rounded-[3.3px] px-[17.58px] bg-[#54ABDB] hover:bg-[#54ABDB]/60"
              >
                Confirm
              </Button>
            </DialogFooter>
          </>
        )}

        {/* Prices Step */}
        {step === "prices" && (
          <>
            <DialogHead
              back={() => setStep("filter")}
              title="Prices"
              clearText="Clear All"
              clear={() => {
                setPriceRange("all")
                setMinPrice("")
                setMaxPrice("")
              }}
            />

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="flex gap-3">
                <Input
                  type="number"
                  placeholder="Min price"
                  value={minPrice}
                  min={0}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="flex-1"
                />
                <Input
                  type="number"
                  placeholder="Max price"
                  value={maxPrice}
                  min={minPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="flex-1"
                />
              </div>

              <RadioGroup
                value={priceRange}
                onValueChange={setPriceRange}
                className="space-y-3"
              >
                {priceRanges.map((range) => (
                  <div key={range.value} className="flex items-center gap-3">
                    <RadioGroupItem
                      value={range.value}
                      id={`price-${range.value}`}
                    />
                    <Label
                      htmlFor={`price-${range.value}`}
                      className="text-sm flex-1 cursor-pointer"
                    >
                      {range.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <DialogFooter className="p-4">
              <Button
                onClick={() => setStep("filter")}
                className="w-full h-[50px] rounded-[3.3px] px-[17.58px] bg-[#54ABDB] hover:bg-[#54ABDB]/60"
              >
                Confirm
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
