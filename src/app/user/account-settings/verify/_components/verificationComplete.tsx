"use client"

import { SuccessIcon } from "@/components/svgs"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface VerificationCompleteStepProps {
  onFinish: () => void
}

export default function VerificationCompleteStep({
  onFinish,
}: VerificationCompleteStepProps) {
  const router = useRouter()
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full xl:w-[984px] bg-white flex flex-col gap-8 justify-center items-center xl:p-9 rounded-xl">
        <div className="w-full lg:w-[536px] mx-auto flex flex-col justify-center items-center gap-[18px]">
          <div className="w-full flex flex-col gap-[32px] max-w-[415px] text-center">
            {/* Success Icon */}
            <div className="flex flex-col gap-6 items-center">
              <SuccessIcon />
              <div className="flex flex-col gap-2">
                <h2 className="text-[30px]/[48px] text-center tracking-normal font-semibold font-circular-std text-[#191F33]">
                  Verification Submitted!
                </h2>
                <p className="text-[#767E94] text-[16px]/[24px] leading-normal text-center">
                  You&apos;ve successfully completed all the verification steps.
                </p>
              </div>
            </div>

            {/* Status Card */}
            <div className="flex flex-col gap-[7px] text-center font-circular-std">
              <h3 className="text-[#464D61] text-[16px]/[100%] font-semibold ">
                What happens next?
              </h3>
              <p className="text-[15px]/[24px] text-[#636A80] font-normal">
                We&apos;re reviewing your details, and you&apos;ll receive a
                notification once your verification is approved. This usually
                takes a short while.
              </p>
            </div>
          </div>

          {/* Continue Button */}
          <div className="w-full max-w-[535px] mx-auto bg-white z-10 absolute top-auto right-0 left-0 bottom-4 lg-md:static grid grid-cols-1 lg-md:grid-cols-2 gap-[25px]">
            <Button
              onClick={onFinish}
              className="hidden lg-md:flex w-auto h-[48px] text-lg bg-transparent border border-[#CCEEFF] text-secondary hover:bg-[#CCEEFF]/50 rounded-[6px]"
            >
              Go to dashboard
            </Button>
            <Button
              onClick={() => router.push("/user/post-ads")}
              className="h-[48px] w-full bg-secondary text-[18px]/[100%] rounded-[6px] flex items-center justify-center gap-3 cursor-pointer"
            >
              Post Ads
            </Button>
            <Button
              onClick={onFinish}
              className="flex lg-md:hidden w-auto h-[48px] text-lg bg-transparent text-[#636A80] hover:bg-[#CCEEFF]/50 rounded-[6px]"
            >
              Go to dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
