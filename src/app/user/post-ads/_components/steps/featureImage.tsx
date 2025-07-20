"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, X, Plus, CircleX, CircleXIcon } from "lucide-react"
import { TextareaInput } from "@/components/ui/form"
import {
  featuresImagesSchema,
  type FeaturesImagesData,
  validateForm,
} from "../validation"
import { CicledCloseIcon, CircledPlusIcon } from "@/components/svgs"
import Image from "next/image"
import { LuCircleX } from "react-icons/lu"

interface FeaturesImagesStepProps {
  data: Partial<FeaturesImagesData>
  onDataChange: (data: Partial<FeaturesImagesData>) => void
  onNext: () => void
  onPrevious: () => void
}

export default function FeaturesImagesStep({
  data,
  onDataChange,
  onNext,
  onPrevious,
}: FeaturesImagesStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [dragActive, setDragActive] = useState(false)
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateSingleField = (field: "description" | "images", value: any) => {
    try {
      if (field === "description") {
        const schema = featuresImagesSchema.pick({ description: true })
        schema.parse({ description: value })
      } else if (field === "images") {
        const schema = featuresImagesSchema.pick({ images: true })
        schema.parse({ images: value })
      }
      setErrors((prev) => ({ ...prev, [field]: "" }))
    } catch (error: any) {
      if (error.errors?.[0]) {
        setErrors((prev) => ({ ...prev, [field]: error.errors[0].message }))
      }
    }
  }

  const handleDescriptionChange = (value: string) => {
    onDataChange({ ...data, description: value })
    if (touched.description) {
      validateSingleField("description", value)
    }
  }

  const handleDescriptionBlur = () => {
    setTouched((prev) => ({ ...prev, description: true }))
    validateSingleField("description", data.description || "")
  }

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return

    const newFiles = Array.from(files).filter((file) => {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          images: "Only image files are allowed",
        }))
        return false
      }
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          images: "Each image must be less than 5MB",
        }))
        return false
      }
      return true
    })

    if (newFiles.length === 0) return

    const existingImages = data.images || []
    const allImages = [...existingImages, ...newFiles]

    // Validate total count
    if (allImages.length > 10) {
      setErrors((prev) => ({ ...prev, images: "Maximum 10 images allowed" }))
      return
    }

    onDataChange({ ...data, images: allImages })
    setTouched((prev) => ({ ...prev, images: true }))
    validateSingleField("images", allImages)
  }

  const removeImage = (index: number) => {
    const images = data.images || []
    const newImages = images.filter((_, i) => i !== index)
    onDataChange({ ...data, images: newImages })
    if (touched.images) {
      validateSingleField("images", newImages)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    handleImageUpload(e.dataTransfer.files)
  }

  const isFormValid = () => {
    const validation = validateForm(featuresImagesSchema, data)
    return validation.isValid
  }

  const handleNext = () => {
    // Mark all fields as touched
    setTouched({ description: true, images: true })

    // Validate description
    if (data.description !== undefined) {
      validateSingleField("description", data.description)
    }

    // Validate images
    if (data.images !== undefined) {
      validateSingleField("images", data.images)
    }

    const validation = validateForm(featuresImagesSchema, data)
    if (validation.isValid) {
      onNext()
    } else {
      setErrors(validation.errors)
    }
  }

  return (
    <div className="w-full h-screen lg-md:h-full xl:w-[648px] bg-white pt-9 xl:p-9 flex flex-col gap-8 rounded-xl">
      <div className="flex flex-col gap-[18px] overflow-y-scroll scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-200">
        <TextareaInput
          label="Description"
          value={data.description || ""}
          onChange={(value) => handleDescriptionChange(value)}
          onBlur={handleDescriptionBlur}
          error={touched.description ? errors.description : ""}
          placeholder="Ad details/ description"
        />

        {/* Upload Photos Section */}
        <div className="flex flex-col">
          <h2 className="font-circular-std font-medium text-[20px]/[32px] text-[#191F33] tracking-normal">
            Upload Photos
          </h2>

          {/* Image Grid */}
          <div className="px-[6px] pt-5 pb-[6px] lg-md:p-5 grid grid-cols-2 sm:grid-cols-3 lg-md:grid-cols-4 gap-4 border border-dashed border-[#EBEEF7] [border-image:repeating-linear-gradient(45deg,#EBEEF7_0_16px,transparent_0_24px)_1] rounded-md bg-white z-[1] relative">
            {/* Existing Images */}
            {(data.images || []).map((image, index) => (
              <div className="relative">
                <div
                  key={index}
                  className="aspect-square flex items-center rounded-[6px] bg-[#EBEEF7] overflow-hidden z-[1]"
                >
                  <Image
                    src={URL.createObjectURL(image)}
                    alt={`Upload ${index + 1}`}
                    width={120}
                    height={120}
                    className="w-full h-full object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-3 -right-2 flex items-center justify-center"
                  >
                    <CicledCloseIcon />
                  </button>
                </div>
              </div>
            ))}

            {/* Add More Button */}
            {(!data.images || data.images.length < 10) && (
              <div
                className={`bg-[#F5F7FA] aspect-square rounded-[6px] flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors ${
                  dragActive ? "border-secondary bg-blue-50" : ""
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <CircledPlusIcon className="text-[#636A80] w-[37.5px] h-[37.5px]" />
              </div>
            )}
          </div>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files)}
            className="hidden"
          />

          {touched.images && errors.images && (
            <p className="text-red-500 text-sm text-center">{errors.images}</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full bg-white z-10 absolute top-auto right-0 left-0 bottom-4 lg-md:static flex flex-col lg-md:flex-row justify-between gap-[12px]">
        <Button
          variant="outline"
          onClick={onPrevious}
          className="hidden lg-md:flex h-[48px] w-full lg-md:w-[123px] text-lg bg-transparent border border-[#CCEEFF] text-secondary hover:bg-[#CCEEFF]/50 rounded-[6px]"
        >
          Previous
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
          onClick={onPrevious}
          className="lg-md:hidden h-[48px] w-full lg-md:w-[123px] text-lg bg-transparent border border-[#CCEEFF] text-secondary hover:bg-[#CCEEFF]/50 rounded-[6px]"
        >
          Previous
        </Button>
      </div>
    </div>
  )
}
