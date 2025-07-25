"use client"

import { useState } from "react"
import ProgressStepper from "./_components/progress"
import ProductDetailsStep from "./_components/steps/productDetail"
import FeaturesImagesStep from "./_components/steps/featureImage"
import BoostPostStep from "./_components/steps/boostPost"
import SuccessStep from "./_components/steps/success"
import StepTips from "./_components/tips"
import type {
  ProductDetailsData,
  FeaturesImagesData,
  BoostPostData,
} from "./_components/validation"
import { useRouter } from "next/navigation"
import PageTitle from "@/components/Title/pageTitle"
import BackButton from "@/components/BackButton"

const steps = [
  {
    id: 1,
    name: "Product Details",
    description: "Basic information about your item",
  },
  {
    id: 2,
    name: "Features & Images",
    description: "Photos and detailed description",
  },
  { id: 3, name: "Boost & Post Ad", description: "Choose visibility options" },
]

export default function PostAdStepper() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<{
    productDetails: Partial<ProductDetailsData>
    featuresImages: Partial<FeaturesImagesData>
    boostPost: Partial<BoostPostData>
  }>({
    productDetails: {},
    featuresImages: {},
    boostPost: { boostOption: "3days" }, // Default selection
  })

  const handleProductDetailsChange = (data: Partial<ProductDetailsData>) => {
    setFormData((prev) => ({
      ...prev,
      productDetails: data,
    }))
  }

  const handleFeaturesImagesChange = (data: Partial<FeaturesImagesData>) => {
    setFormData((prev) => ({
      ...prev,
      featuresImages: data,
    }))
  }

  const handleBoostPostChange = (data: Partial<BoostPostData>) => {
    setFormData((prev) => ({
      ...prev,
      boostPost: data,
    }))
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleCancel = () => {
    // Reset form or navigate away
    setCurrentStep(1)
    setFormData({
      productDetails: {},
      featuresImages: {},
      boostPost: { boostOption: "3days" },
    })
  }

  const handlePostAnother = () => {
    setCurrentStep(1)
    setFormData({
      productDetails: {},
      featuresImages: {},
      boostPost: { boostOption: "3days" },
    })
  }

  const handleViewAds = () => {
    router.push("/user/my-ads")
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ProductDetailsStep
            data={formData.productDetails}
            onDataChange={handleProductDetailsChange}
            onNext={handleNext}
            onCancel={handleCancel}
          />
        )
      case 2:
        return (
          <FeaturesImagesStep
            data={formData.featuresImages}
            onDataChange={handleFeaturesImagesChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )
      case 3:
        return (
          <BoostPostStep
            data={formData.boostPost}
            onDataChange={handleBoostPostChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )
      case 4:
        return (
          <SuccessStep
            onPostAnother={handlePostAnother}
            onViewAds={handleViewAds}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex flex-col gap-[26px]">
      <div className="xl:hidden">
        {" "}
        <BackButton onClick={() => router.push("/user/overview")} />
      </div>
      {currentStep <= 3 && (
        <div className="w-full px-2 lg-md:px-0 lg-md:w-[648px] flex flex-col gap-3">
          <>
            <PageTitle text="Post Ads" />
            <p className="font-circular-std font-normal text-14px]/[22px] tracking-normal text-[#637381] hidden lg-md:flex">
              Fill in your ad details to reach buyers fast.
            </p>
          </>
          <ProgressStepper steps={steps} currentStep={currentStep} />
        </div>
      )}

      <div className="w-full xl:w-[960px] flex  items-start gap-2 3xl:gap-8">
        {/* Main Content */}
        <div className="w-full xl:w-[648px]">{renderCurrentStep()}</div>
        {/* Tips Sidebar */}
        {currentStep <= 3 && (
          <div className="hidden xl:flex xl:w-[306px] h-fit shrink-0">
            <StepTips currentStep={currentStep} />
          </div>
        )}
      </div>
    </div>
  )
}
