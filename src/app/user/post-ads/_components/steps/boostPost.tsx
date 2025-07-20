"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Zap,
  TrendingUp,
  Star,
  Crown,
  Smartphone,
  BatteryWarningIcon,
} from "lucide-react"
import {
  boostPostSchema,
  type BoostPostData,
  validateForm,
} from "../validation"
import { cn } from "@/lib/utils"
import { PiBatteryWarningVertical } from "react-icons/pi"
import { Separator } from "@/components/ui/separator"

interface BoostPostStepProps {
  data: Partial<BoostPostData>
  onDataChange: (data: Partial<BoostPostData>) => void
  onNext: () => void
  onPrevious: () => void
}

const boostOptions = [
  {
    id: "3days" as const,
    title: "3 Days",
    description: "Appear higher in search results",
    price: "N300",
    icon: Zap,
    bgColor: "bg-[#F0FDF4]",
    subTextColor: "text-[#4D9F6C]",
    borderColor: "border-[#15803D]",
    textColor: "text-[#15803D]",
  },
  {
    id: "1week" as const,
    title: "1 Week",
    description: "Get 3x more views",
    price: "N300",
    icon: TrendingUp,
    bgColor: "bg-[#EFF6FF]",
    borderColor: "border-[#5177E1]",
    subTextColor: "text-[#3B82F6]",
    textColor: "text-[#1D4ED8]",
    badge: "Most Popular",
    badgeBg: "bg-[#DBEAFE]",
  },
  {
    id: "2weeks" as const,
    title: "2 Weeks",
    description: "Extended visibility on homepage and search",
    price: "N900",
    icon: Star,
    bgColor: "bg-[#FAF5FF]",
    borderColor: "border-[#CCA2FB]",
    subTextColor: "text-[#9C54DA]",
    textColor: "text-[#7E22CE]",
  },
  {
    id: "1month" as const,
    title: "1 Month",
    description: "Maximum reach with featured tag",
    price: "N300",
    icon: Crown,
    bgColor: "bg-[#FEFCE8]",
    borderColor: "border-[#FEF08A]",
    textColor: "text-[#A16207]",
    subTextColor: "text-[#B98940]",
    badge: "Best Value",
    badgeBg: "bg-[#FEF9C3]",
  },
]

export default function BoostPostStep({
  data,
  onDataChange,
  onNext,
  onPrevious,
}: BoostPostStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const handleOptionSelect = (optionId: BoostPostData["boostOption"]) => {
    onDataChange({ ...data, boostOption: optionId })
    setTouched((prev) => ({ ...prev, boostOption: true }))
    setErrors((prev) => ({ ...prev, boostOption: "" }))
  }

  const isFormValid = () => {
    const validation = validateForm(boostPostSchema, data)
    return validation.isValid
  }

  const handleNext = () => {
    setTouched({ boostOption: true })
    const validation = validateForm(boostPostSchema, data)
    if (validation.isValid) {
      onNext()
    } else {
      setErrors(validation.errors)
    }
  }

  return (
    <div className="w-full h-screen lg-md:h-full xl:w-[648px] bg-white pt-9 xl:p-9 flex flex-col justify-between gap-8 rounded-xl">
      {/* Boost Options */}
      <div className="h-full flex flex-col gap-[18px] overflow-y-scroll scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-200 pb-38 lg-md:pb-0">
        <div className="flex flex-col gap-1 font-circular-std">
          <h1 className="text-[18px]/[100%] font-medium text-[#0A243F] tracking-normal align-middle">
            Boost Your Ad for More Visibility
          </h1>
          <p className="text-[15px]/[24px] text-[#767E94] tracking-normal font-circular-std">
            Choose a plan to reach more buyers
          </p>
        </div>
        {boostOptions.map((option) => {
          const isSelected = data.boostOption === option.id
          const Icon = option.icon

          return (
            <div
              key={option.id}
              className={cn(
                "relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-200",
                option.bgColor,
                option.borderColor
              )}
              onClick={() => handleOptionSelect(option.id)}
            >
              <div className="flex items-center justify-between">
                {/* Left side - Icon and content */}
                <div className="flex items-start gap-[10px]">
                  <div className="mt-0.5 bg-white h-6 w-6 rounded flex justify-center items-center">
                    <Icon className={cn("h-4 w-4", option.textColor)} />
                  </div>
                  <div className="flex flex-col  gap-2">
                    <div className="flex gap-[10px] items-center">
                      <h3
                        className={cn(
                          "font-medium text-[16px]/[24px] tracking-normal font-circular-std",
                          option.textColor
                        )}
                      >
                        {option.title}
                      </h3>
                      {/* Badge */}
                      {option.badge && (
                        <span
                          className={cn(
                            "w-fit h-[17px] rounded-[30px] text-white text-sm px-[6px] py-[3px] font-medium flex justify-center items-center",
                            option.badgeBg,
                            option.textColor
                          )}
                        >
                          {option.badge}
                        </span>
                      )}
                    </div>
                    <p
                      className={cn(
                        "text-[14px]/[100%] font-circular-std font-[450] tracking-normal text-justify align-bottom",
                        option.subTextColor
                      )}
                    >
                      {option.description}
                    </p>
                    <p
                      className={cn(
                        "text-[16px]/[18px] font-circular-std -tracking-[0.25px] font-[900] align-middle",
                        option.textColor
                      )}
                    >
                      {option.price}
                    </p>
                  </div>
                </div>

                {/* Right side - Radio button */}
                <div
                  className={cn(
                    "w-[22px] h-[22px] rounded-full border-[1.5px] flex items-center justify-center transition-all",
                    isSelected
                      ? "border-[#15803D] bg-white"
                      : "border-[#C5C9D6] bg-white"
                  )}
                >
                  {isSelected && (
                    <div className="w-3 h-3 bg-[#15803D] rounded-full"></div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
        <Separator />
        {/* Free Option Section */}
        <div className="flex flex-col gap-2">
          <h2 className="text-[16px]/[100%] font-medium font-circular-std tracking-normal text-[#0A243F]">
            Or post without boosting
          </h2>
          <div
            className={cn(
              "p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 bg-white",
              data.boostOption === "free"
                ? "border-gray-400"
                : "border-gray-200 hover:border-gray-300"
            )}
            onClick={() => handleOptionSelect("free")}
          >
            <div className="flex items-center justify-between">
              {/* Left side - Icon and content */}
              <div className="flex items-start gap-4">
                <div className="mt-1 h-6 w-6 flex justify-center items-center rounded bg-[#0A243F0D]">
                  <PiBatteryWarningVertical className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium text-[16px]/[24px] tracking-normal font-circular-std text-[#0A243F]">
                    Post for Free
                  </h3>
                  <p className="text-[14px]/[24px] font-[450] font-circular-std tracking-normal text-[#637381]">
                    Basic visibility — appears after boosted ads
                  </p>
                </div>
              </div>

              {/* Right side - Radio button */}
              <div
                className={cn(
                  "w-[22px] h-[22px] rounded-full border-[1.5px] flex items-center justify-center transition-all",
                  data.boostOption === "free"
                    ? "border-[#15803D] bg-white"
                    : "border-[#C5C9D6] bg-white"
                )}
              >
                {data.boostOption === "free" && (
                  <div className="w-3 h-3 bg-[#15803D] rounded-full"></div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {touched.boostOption && errors.boostOption && (
          <div className="text-center">
            <p className="text-red-500 text-lg">{errors.boostOption}</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="w-full bg-white z-10 absolute top-auto right-0 left-0 bottom-0 lg-md:static flex flex-col lg-md:flex-row lg-md:justify-between gap-4">
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
