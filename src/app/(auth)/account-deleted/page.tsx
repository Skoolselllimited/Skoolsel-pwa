"use client"
import BreadcrumbNav from "@/components/breadCrumbs"
import Link from "next/link"

import { GoArrowRight } from "react-icons/go"
import { SuccessfulPublish } from "../../../../public/svgs"

export default function DeletedAccount() {
  const mockPath = "/Home/User/Deleted-account"
  return (
    <div>
      <div className="hidden xl:block">
        <BreadcrumbNav pathname={mockPath} />
      </div>
      <div className="md:min-h-[calc(100vh-150px)] min-h-screen flex items-center justify-center bg-white md:bg-[#F7F8F9] font-inter px-4">
        <div className="w-full max-w-lg bg-white rounded-xl  p-8 md:p-9 border border-gray-100 text-center">
          {/* Success Icon */}
          <div className="mb-6 flex justify-center">
            <SuccessfulPublish />
          </div>

          <div className="max-w-sm mx-auto">
            <h2 className="text-xl font-bold text-[#003553] mb-2">
              Your account has been deleted successfully.
            </h2>

            <div className="w-full flex items-center justify-center mt-8">
              <Link href="/ads" className="w-full sm:w-auto">
                <button
                  className="w-full sm:w-auto rounded-md bg-[#54abdb] text-white hover:bg-[#4a90d2]
      px-6 py-3 text-sm sm:text-base text-center flex items-center justify-center"
                >
                  View Ads
                  <GoArrowRight className="w-4 h-4 ml-2" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
