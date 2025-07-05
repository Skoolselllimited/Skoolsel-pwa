"use client"

import DialogHead from "@/components/DialogHead"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { categories, Category, priceRanges } from "@/data"
import { ChevronRight, Minus, PlusIcon } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

// Categories with icons
const categoriesWithIcons = [
  {
    name: "Computer & Laptop",
    icon: () => (
      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
        💻
      </div>
    ),
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
    icon: () => (
      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
        📱
      </div>
    ),
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
    icon: () => (
      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
        🎧
      </div>
    ),
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
    icon: () => (
      <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
        ⌨️
      </div>
    ),
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
    icon: () => (
      <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center">
        👗
      </div>
    ),
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
    icon: () => (
      <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
        🏠
      </div>
    ),
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
    icon: () => (
      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
        🍎
      </div>
    ),
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
    icon: () => (
      <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
        🎮
      </div>
    ),
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

interface FiltersDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onApplyFilters: (filterParams: URLSearchParams) => void
}

export default function FiltersDialog({
  open,
  onOpenChange,
  onApplyFilters,
}: FiltersDialogProps) {
  const searchParams = useSearchParams()

  // Dialog state
  const [step, setStep] = useState<
    "filter" | "categories" | "subcategories" | "conditions" | "prices"
  >("filter")

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("")
  const [selectedCondition, setSelectedCondition] = useState<string>("any")
  const [priceRange, setPriceRange] = useState<string>("all")
  const [minPrice, setMinPrice] = useState<string>("")
  const [maxPrice, setMaxPrice] = useState<string>("")

  // Current category for subcategory view
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null)

  // Reset dialog state when opened
  useEffect(() => {
    if (open) {
      setStep("filter")
      // Initialize from URL params
      const categoryParam = searchParams.get("category")
      const conditionParam = searchParams.get("condition")
      const priceRangeParam = searchParams.get("priceRange")
      const minPriceParam = searchParams.get("minPrice")
      const maxPriceParam = searchParams.get("maxPrice")

      setSelectedCondition(conditionParam || "any")
      setPriceRange(priceRangeParam || "all")
      setMinPrice(minPriceParam || "")
      setMaxPrice(maxPriceParam || "")

      if (categoryParam) {
        setSelectedCategory(categoryParam)
      }
    }
  }, [open, searchParams])

  // Handle category selection - navigate to subcategories step
  const handleCategoryClick = (category: Category) => {
    setCurrentCategory(category)
    setStep("subcategories")
  }

  // Handle subcategory selection
  const handleSubcategorySelect = (subcategory: string) => {
    if (currentCategory) {
      setSelectedCategory(currentCategory.name)
      setSelectedSubcategory(subcategory)
    }
  }

  // Handle price range selection - clear custom values when range is selected
  const handlePriceRangeChange = (value: string) => {
    setPriceRange(value)
    if (value !== "all") {
      setMinPrice("")
      setMaxPrice("")
    }
  }

  // Handle min price change
  const handleMinPriceChange = (value: string) => {
    setMinPrice(value)
    setTimeout(() => {
      if (value) {
        setPriceRange("all")
      }
    }, 0)
  }

  // Handle max price change
  const handleMaxPriceChange = (value: string) => {
    setMaxPrice(value)
    setTimeout(() => {
      if (value) {
        setPriceRange("all")
      }
    }, 0)
  }

  // Apply filters
  const applyFilters = () => {
    const params = new URLSearchParams()

    // Add search query if it exists
    const query = searchParams.get("q")
    if (query) {
      params.set("q", query)
    }

    // Add school if it exists
    const school = searchParams.get("schools")
    if (school) {
      params.set("schools", school)
    }

    // Add price filters
    if (minPrice || maxPrice) {
      if (minPrice) params.set("minPrice", minPrice)
      if (maxPrice) params.set("maxPrice", maxPrice)
    } else if (priceRange !== "all") {
      params.set("priceRange", priceRange)
    }

    // Add condition
    if (selectedCondition !== "any") {
      params.set("condition", selectedCondition)
    }

    // Add category and subcategory
    if (selectedCategory && selectedSubcategory) {
      const categoryData = { [selectedCategory]: [selectedSubcategory] }
      params.set("categories", encodeURIComponent(JSON.stringify(categoryData)))
    }

    onApplyFilters(params)
  }

  // Clear filters for current section
  const clearCurrentFilters = () => {
    if (step === "categories" || step === "subcategories") {
      setSelectedCategory("")
      setSelectedSubcategory("")
    } else if (step === "conditions") {
      setSelectedCondition("any")
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
      <DialogContent className="w-full h-full max-w-none max-h-none m-0 shadow-none border-0 rounded-none p-0 overflow-hidden flex flex-col">
        {/* Main Filters Step */}
        {step === "filter" && (
          <>
            <DialogHead
              back={() => onOpenChange(false)}
              title="Filters"
              clearText={
                getTotalSelectedFilters() > 0
                  ? `Clear All (${getTotalSelectedFilters()})`
                  : "Clear All"
              }
              clear={() => {
                setSelectedCategory("")
                setSelectedSubcategory("")
                setSelectedCondition("any")
                setPriceRange("all")
                setMinPrice("")
                setMaxPrice("")
              }}
            />
            <div className="flex-1 overflow-y-auto px-4 flex flex-col gap-2">
              {/* PRICES (NGN) */}
              <div className="flex flex-col border-b border-[#EBEEF7]">
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
              <div className="flex flex-col border-b border-[#EBEEF7]">
                <div
                  className="flex items-center justify-between py-2 cursor-pointer"
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
              <div className="flex flex-col border-b border-[#EBEEF7]">
                <div
                  className="flex items-center justify-between py-2 cursor-pointer"
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
                className="w-full h-[50px] rounded-[3.3px] px-[17.58px] bg-[#54ABDB] hover:bg-[#54ABDB]/60"
              >
                Apply Filter
              </Button>
            </DialogFooter>
          </>
        )}

        {/* Categories Step */}
        {step === "categories" && (
          <>
            <DialogHead
              back={() => setStep("filter")}
              title="Categories"
              clearText="Clear All"
              clear={clearCurrentFilters}
            />
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {categories.map((category: Category) => (
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

        {/* Subcategories Step */}
        {step === "subcategories" && currentCategory && (
          <>
            <DialogHead
              back={() => setStep("categories")}
              title={currentCategory.name}
              clearText="Clear All"
              clear={clearCurrentFilters}
            />
            <div className="w-full flex flex-col gap-2 overflow-y-auto px-4">
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
                  onChange={(e) => handleMinPriceChange(e.target.value)}
                  className="flex-1"
                />
                <Input
                  type="number"
                  placeholder="Max price"
                  value={maxPrice}
                  min={minPrice || 0}
                  onChange={(e) => handleMaxPriceChange(e.target.value)}
                  className="flex-1"
                />
              </div>
              <RadioGroup
                value={priceRange}
                onValueChange={handlePriceRangeChange}
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
