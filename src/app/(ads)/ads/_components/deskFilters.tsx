"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { categories, priceRanges, schoolTypes } from "@/data"
import { formatPrice } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import React, { useCallback, useMemo, useState } from "react"

interface FiltersProps {
  selectedSchool: string
  onSchoolSelect: (school: string) => void
  selectedDirectCategory: string
  selectedCategory: string
  selectedSubcategory: string
  selectedCondition: string
  priceRange: string
  minPrice: string
  maxPrice: string
  onInputBlur: () => void
  onPriceBlur: () => void
  onDirectCategorySelect: (category: string) => void
  onCategorySelect: (category: string, subcategory: string) => void
  onConditionChange: (condition: string) => void
  onPriceRangeChange: (range: string) => void
  onMinPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onMaxPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClearFilters: () => void
  onApplyFilters: () => void
}

export default React.memo(function DesktopFilters({
  selectedSchool,
  onSchoolSelect,
  selectedDirectCategory,
  selectedCategory,
  selectedSubcategory,
  selectedCondition,
  priceRange,
  minPrice,
  maxPrice,
  onDirectCategorySelect,
  onCategorySelect,
  onConditionChange,
  onPriceRangeChange,
  onMinPriceChange,
  onMaxPriceChange,
  onClearFilters,
  onApplyFilters,
  onInputBlur,
  onPriceBlur,
}: FiltersProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([])
  const [expandedSubcategories, setExpandedSubcategories] = useState<string[]>(
    []
  )
  const [schoolSearchTerm, setSchoolSearchTerm] = useState("")

  const filteredSchools = useMemo(() => {
    if (!schoolSearchTerm) return schoolTypes
    const term = schoolSearchTerm.toLowerCase()
    return schoolTypes.filter(
      (s) =>
        s.name.toLowerCase().includes(term) ||
        s.abbreviation.toLowerCase().includes(term)
    )
  }, [schoolSearchTerm])

  const getPriceDisplayText = useCallback(() => {
    if (minPrice || maxPrice) {
      if (minPrice && maxPrice) {
        return `${formatPrice(Number(minPrice))} - ${formatPrice(Number(maxPrice))}`
      }
      if (minPrice) return `From ${formatPrice(Number(minPrice))}`
      return `Up to ${formatPrice(Number(maxPrice))}`
    }
    if (priceRange !== "all") {
      const range = priceRanges.find((r) => r.value === priceRange)
      return range?.label || "All prices"
    }
    return "All prices"
  }, [minPrice, maxPrice, priceRange])

  return (
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
            <Input
              placeholder="Search schools..."
              className="focus-visible:ring-0 focus-visible:ring-offset-0 h-8 text-sm placeholder:text-sm placeholder:text-[#8B90A0] bg-white my-1"
              value={schoolSearchTerm}
              onChange={(e) => setSchoolSearchTerm(e.target.value)}
            />
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
                onValueChange={onSchoolSelect}
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
                  onValueChange={onDirectCategorySelect}
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
                            onCategorySelect(category.name, value)
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
                onValueChange={onConditionChange}
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
                  onChange={onMinPriceChange}
                  onBlur={onInputBlur}
                />
                <Input
                  type="number"
                  placeholder="Max price"
                  className="h-9 text-sm"
                  value={maxPrice}
                  onChange={onMaxPriceChange}
                  onBlur={onPriceBlur}
                />
              </div>

              <RadioGroup
                value={priceRange}
                onValueChange={onPriceRangeChange}
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
          onClick={onClearFilters}
          variant="outline"
          className="flex-1 bg-transparent"
        >
          Clear All
        </Button>
        <Button onClick={onApplyFilters} className="flex-1">
          Apply Filters
        </Button>
      </div>
    </div>
  )
})
