"use client"

import { ProfileMan } from "@/components/svgs"
import PageTitle from "@/components/Title/pageTitle"
import { Button } from "@/components/ui/button"
import { InfoIcon } from "lucide-react"

interface VerifyIntroStepProps {
  onNext: () => void
  onBack: () => void
}

export default function VerifyIntroStep({
  onNext,
  onBack,
}: VerifyIntroStepProps) {
  return (
    <div className="h-full flex flex-col gap-4 relative">
      <PageTitle text="Verify Identity" />
      <div className="w-full xl:w-[984px] mx-auto bg-white flex flex-col gap-8 justify-center items-center xl:p-9 rounded-xl">
        <div className="w-full lg:w-[536px] mx-auto flex flex-col justify-center items-center gap-[18px]">
          <ProfileMan />
          <div className="w-full flex flex-col gap-[27px]">
            <div className="flex flex-col gap-[14px] text-center">
              <h3 className="text-2xl font-semibold text-gray-900">
                Let&apos;s Confirm It&apos;s You!
              </h3>
              <p className="text-gray-600">
                We verify IDs to keep Skoolsel safe for everyone. This quick
                process helps prevent fraud and builds a trusted community. It
                only takes a few minutes!
              </p>
            </div>
            {/* Security Features */}
            <div className="flex flex-col gap-[7px]">
              <h4 className="flex items-center gap-2 text-[16px]/[100%] font-semibold font-circular-std text-[#464D61]">
                To verify your identity, we'll need:
              </h4>
              <ul className="text-[15px]/[100%] text-[#636A80] font-circular-std font-normal space-y-1 text-left tracking-normal">
                <li>
                  <span>&bull;</span> A clear photo of your government-issued ID
                  or student ID
                </li>
                <li>
                  {" "}
                  <span>&bull;</span> A quick selfie to match with your ID
                </li>
              </ul>
            </div>

            {/* Time Estimate */}
            <div className="h-[68px] flex items-center bg-[#F5F7FA] rounded-md py-[6px] pr-2">
              <span className="px-3">
                <InfoIcon className="w-6 h-6 text-[#464D61]" />
              </span>
              <span className="text-[15px]/[20px] font-normal tracking-normal text-[#464D61] mt-1.5">
                Your ID and selfie are only used for verification, and we never
                keep a copy.
              </span>
            </div>

            {/* Start Button */}
            <div className="w-full max-w-[535px] mx-auto bg-white z-10 absolute top-auto right-0 left-0 bottom-4 lg-md:static grid grid-cols-1 lg-md:grid-cols-2 gap-[12px]">
              <Button
                variant="outline"
                onClick={onBack}
                className="hidden lg-md:flex w-auto h-[48px] text-lg bg-transparent border border-[#CCEEFF] text-secondary hover:bg-[#CCEEFF]/50 rounded-[6px]"
              >
                Cancel
              </Button>

              <Button
                onClick={onNext}
                className="h-[48px] w-auto bg-secondary text-[18px]/[100%] rounded-[6px] flex gap-3 cursor-pointer"
              >
                Next
              </Button>
              <Button
                variant="outline"
                onClick={onBack}
                className="lg-md:hidden h-[48px] w-full lg-md:w-[123px] text-lg bg-transparent border border-[#CCEEFF] text-secondary hover:bg-[#CCEEFF]/50 rounded-[6px]"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
