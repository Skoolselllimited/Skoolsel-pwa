"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import {
  FormInput,
  FormSelect,
  CustomSearchableDropdown,
  type DropdownOption,
} from "@/components/ui/form"
import { productDetailsSchema, type ProductDetailsData } from "../validation"
import { z } from "zod"
import { categories, schoolTypes } from "@/data"

interface ProductDetailsStepProps {
  data: Partial<ProductDetailsData>
  onDataChange: (data: Partial<ProductDetailsData>) => void
  onNext: () => void
  onCancel: () => void
}

const schoolOptions: DropdownOption[] = schoolTypes.map((school) => ({
  value: school.name,
  label: school.name,
  description: school.abbreviation,
}))

const conditionOptions = [
  { value: "new", label: "Brand New" },
  { value: "used", label: "Used" },
]

const negotiableOptions = [
  { value: "yes", label: "Yes, Negotiable" },
  { value: "no", label: "Fixed Price" },
]

export default function ProductDetailsStep({
  data,
  onDataChange,
  onNext,
  onCancel,
}: ProductDetailsStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  // Convert categories to dropdown options
  const categoryOptions: DropdownOption[] = categories.map((category) => ({
    value: category.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/&/g, "and"),
    label: category.name,
    description: `${category.subcategories.length} subcategories`,
    icon: category.icon,
  }))

  // Get subcategories based on selected category
  const subcategoryOptions: DropdownOption[] = useMemo(() => {
    if (!data.category) return []

    const selectedCategory = categories.find(
      (cat) =>
        cat.name.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and") ===
        data.category
    )

    if (!selectedCategory) return []

    return selectedCategory.subcategories.map((sub) => ({
      value: sub.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and"),
      label: sub,
      description: "",
    }))
  }, [data.category])

  const validateSingleField = (
    field: keyof ProductDetailsData,
    value: string
  ) => {
    try {
      const fieldSchema = z.object({
        [field]: productDetailsSchema.shape[field],
      })
      fieldSchema.parse({ [field]: value })
      setErrors((prev) => ({ ...prev, [field]: "" }))
    } catch (error: any) {
      if (error.errors?.[0]) {
        setErrors((prev) => ({ ...prev, [field]: error.errors[0].message }))
      }
    }
  }

  const handleInputChange = (
    field: keyof ProductDetailsData,
    value: string
  ) => {
    const updatedData = { ...data, [field]: value }

    // Reset subcategory when category changes
    if (field === "category") {
      updatedData.subcategory = ""
    }

    onDataChange(updatedData)

    if (touched[field]) {
      validateSingleField(field, value)
    }
  }

  const handleBlur = (field: keyof ProductDetailsData) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const isFormValid = () => {
    try {
      productDetailsSchema.parse(data)
      return true
    } catch {
      return false
    }
  }

  const handleNext = () => {
    // Validate all fields
    const allFields: (keyof ProductDetailsData)[] = [
      "category",
      "subcategory",
      "adTitle",
      "school",
      "price",
      "condition",
      "negotiable",
    ]

    allFields.forEach((field) => {
      setTouched((prev) => ({ ...prev, [field]: true }))
      validateSingleField(field, data[field] || "")
    })

    if (isFormValid()) {
      onNext()
    }
  }

  return (
    <div className="w-full min-h-screen lg-md:min-h-auto lg-md:h-full ">
      <div className="flex flex-col justify-between gap-8 bg-white pt-9 xl:p-9 rounded-xl">
        <div className="h-full flex flex-col gap-[18px] overflow-y-scroll scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-200 lg-md:overflow-y-hidden">
          {/* Category and Subcategory */}
          <div className="grid grid-cols-2 gap-4">
            <CustomSearchableDropdown
              label="Category"
              value={data.category || ""}
              onChange={(value) => handleInputChange("category", value)}
              onBlur={() => handleBlur("category")}
              options={categoryOptions}
              error={touched.category ? errors.category : ""}
              hasError={!!(touched.category && errors.category)}
              placeholder="Search categories..."
            />

            <CustomSearchableDropdown
              label="Subcategory"
              value={data.subcategory || ""}
              onChange={(value) => handleInputChange("subcategory", value)}
              onBlur={() => handleBlur("subcategory")}
              options={subcategoryOptions}
              error={touched.subcategory ? errors.subcategory : ""}
              hasError={!!(touched.subcategory && errors.subcategory)}
              placeholder="Search subcategories..."
              disabled={!data.category}
            />
          </div>
          {/* Ad Title */}
          <FormInput
            label="Ad Title"
            value={data.adTitle || ""}
            onChange={(value) => handleInputChange("adTitle", value)}
            onBlur={() => handleBlur("adTitle")}
            error={touched.adTitle ? errors.adTitle : ""}
            hasError={!!(touched.adTitle && errors.adTitle)}
            placeholder="Give your Ad a title"
          />
          {/* School Selection */}
          <CustomSearchableDropdown
            label="School"
            value={data.school || ""}
            onChange={(value) => handleInputChange("school", value)}
            onBlur={() => handleBlur("school")}
            options={schoolOptions}
            error={touched.school ? errors.school : ""}
            hasError={!!(touched.school && errors.school)}
            placeholder="Select school"
          />
          {/* Price */}
          <FormInput
            label="Price"
            value={data.price || ""}
            onChange={(value) => handleInputChange("price", value)}
            onBlur={() => handleBlur("price")}
            error={touched.price ? errors.price : ""}
            hasError={!!(touched.price && errors.price)}
            placeholder="Pick a good price- what would you pay?"
            type="number"
            icon={"NGN"}
            inputMode="numeric"
            pattern="[0-9]*"
          />
          {/* Condition and Negotiable */}
          <div className="grid grid-cols-2 gap-4">
            <FormSelect
              label="Condition"
              value={data.condition || ""}
              onChange={(value) => handleInputChange("condition", value)}
              onBlur={() => handleBlur("condition")}
              options={conditionOptions}
              error={touched.condition ? errors.condition : ""}
              hasError={!!(touched.condition && errors.condition)}
              placeholder="Select condition"
            />
            <FormSelect
              label="Negotiable"
              value={data.negotiable || ""}
              onChange={(value) => handleInputChange("negotiable", value)}
              onBlur={() => handleBlur("negotiable")}
              options={negotiableOptions}
              error={touched.negotiable ? errors.negotiable : ""}
              hasError={!!(touched.negotiable && errors.negotiable)}
              placeholder="Is price negotiable?"
            />
          </div>
        </div>
        {/* Action Buttons */}
        <div className="w-full bg-white z-10 absolute top-auto right-0 left-0 bottom-4 lg-md:static flex flex-col lg-md:flex-row lg-md:justify-between gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            className="hidden lg-md:flex h-[48px] w-full lg-md:w-[123px] text-lg bg-transparent border border-[#CCEEFF] text-secondary hover:bg-[#CCEEFF]/50 rounded-[6px]"
          >
            Cancel
          </Button>

          <Button
            onClick={handleNext}
            disabled={!isFormValid()}
            className="h-[48px]  w-full lg-md:w-[140px] bg-secondary text-[18px]/[100%] rounded-[6px] flex gap-3 cursor-pointer"
          >
            Next
            <ArrowRight className="h-6 w-6 shrink-0" />
          </Button>
          <Button
            variant="outline"
            onClick={onCancel}
            className="lg-md:hidden h-[48px] w-full lg-md:w-[123px] text-lg bg-transparent border border-[#CCEEFF] text-secondary hover:bg-[#CCEEFF]/50 rounded-[6px]"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}
