"use client"

import { SuccessIcon, VerifiedIcon } from "@/components/svgs"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight } from "lucide-react"

interface SuccessStepProps {
  onPostAnother: () => void
  onViewAds: () => void
}

export default function SuccessStep({
  onPostAnother,
  onViewAds,
}: SuccessStepProps) {
  return (
    <div className="w-full xl:w-[984px] bg-white flex flex-col gap-8 justify-center items-center xl:p-9 rounded-xl">
      {/* Success Icon */}
      <SuccessIcon />

      {/* Success Message */}
      <div className="flex flex-col items-center justify-center gap-2 font-circular-std align-middle text-center tracking-normal">
        <h2 className="text-[40px]/[48px] xl:text-[32px]/[100%] font-semibold text-[#0A243F] ">
          Your ad is now boosted and live
        </h2>
        <p className="font-[450] text-[#767E94] text-[14px]/[100%]">
          Your Ad will appear at the top of search results for maximum
          visibility.
        </p>
      </div>

      {/* What Happens Next */}
      <div className="rounded-xl text-left max-w-[542px] flex flex-col gap-4 p-6 mx-auto border border-[#EBEEF7]">
        <h3 className="text-[20px]/[24px] text-center font-medium font-circular-std text-[#0A243F]">
          What happens next?
        </h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3 text-[#767E94] font-circular-std font-[450] text-[16px]/[100%] tracking-normal">
            <span className=" flex-shrink-0">1. </span>
            Interested buyers will contact you via your provided contact
            information
          </div>
          <div className="flex items-start space-x-3 text-[#767E94] font-circular-std font-[450] text-[16px]/[100%] tracking-normal">
            <span className=" flex-shrink-0">2. </span>
            Once sold, you can mark your ad as sold from your profile
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full flex flex-col lg-md:flex-row justify-between gap-[18px] absolute top-auto right-0 left-0 bottom-4">
        <Button
          variant="outline"
          onClick={onPostAnother}
          className="h-[48px] w-full lg-md:w-[185px] text-lg bg-transparent border border-[#CCEEFF] text-secondary hover:bg-[#CCEEFF]/50 rounded-[6px]"
        >
          Post Ad
        </Button>
        <Button
          onClick={onViewAds}
          className="h-[48px] w-full lg-md:w-[185px] bg-secondary text-[18px]/[100%] rounded-[6px] flex gap-3 cursor-pointer"
        >
          View My Ads
          <ArrowRight className="h-6 w-6 shrink-0" />
        </Button>
      </div>
    </div>
  )
}
