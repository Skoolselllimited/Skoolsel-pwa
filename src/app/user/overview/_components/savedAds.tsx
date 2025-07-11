"use client"
import { ClockIcon, HeartIcon, MapPinIcon } from "@/components/svgs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { formatPrice, getInitials } from "@/lib/utils"
import { AdsType } from "@/types"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface saveAdsProps {
  savedAds: AdsType[]
}
export default function SavedAds({ savedAds }: saveAdsProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-[20px]/[32px] font-circular-std font-medium tracking-normal text-[#191F33]">
          Saved Ads
        </h3>
        <Link
          href="/users/favourites"
          className="h-9 focus:bg-[#E8F7FF] focus:text-secondary rounded py-2 px-3 flex items-center gap-2 cursor-pointer text-[#464D61] hover:underline text-[14px]/[20px] font-circular-std font-medium tracking-normal"
        >
          View All <ArrowRight className="w-6 h-6" />
        </Link>
      </div>

      <div className="w-full grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 xl:gap-4">
        {savedAds.map((ad, idx) => (
          <Link
            key={idx}
            href={`/ads/${ad.id}?name=${ad.name}`}
            className="flex flex-col gap-[2.65px] bg-white p-1 lg:p-2 rounded-[10.6px] lg:rounded-[16px] hover:shadow-sm overflow-hidden border border-[#F1F2F4] cursor-pointer relative"
          >
            <div className="absolute top-1 right-1 lg-md:top-4 lg-md:right-4 z-10">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white"
              >
                <HeartIcon className="h-4 w-4 fill-secondary text-secondary" />
              </Button>
            </div>

            <div className="relative">
              <Image
                src={ad.image || "/placeholder.svg"}
                alt={ad.name}
                width={292}
                height={267}
                className="w-full h-32 sm:h-[176.86px] lg:h-[267px] object-cover rounded-[8px] bg-[#E3E6EA] hover:scale-[1.01] transition-transform duration-200"
              />
            </div>

            {/* Content */}
            <div className="pt-1 lg:pt-2 pb-0 flex flex-col gap-[2.65px] lg:gap-1">
              <h3 className="text-[12px]/[11.92px] lg:text-[16px]/[18px] font-medium font-circular-std text-[#384853] truncate">
                {ad.name}
              </h3>
              <p className="text-secondary font-bold text-[12px]/[15.9px] lg:text-[18px]/[24px] -tracking-[1%] align-middle">
                {formatPrice(ad.price)}
              </p>
              <div className="w-full flex justify-between gap-1 pb-4">
                <div className="flex items-center gap-1.5 lg:gap-2">
                  <MapPinIcon className="w-5 h-5 text-[#384853]" />
                  <span className="text-[#384853] text-[12px] lg:text-[16px]/[18px] font-[450] font-circular-std tracking-normal truncate">
                    {ad.abbreviation}{" "}
                  </span>
                </div>
                <div className="flex items-center justify-end gap-1.5 lg:gap-2">
                  <ClockIcon className="w-5 h-5 text-[#384853]" />
                  <span className="text-[#384853] text-[12px] lg:text-[16px]/[18px] font-[450] font-circular-std tracking-normal truncate">
                    {ad.timePosted}
                  </span>
                </div>
              </div>
              <div className="w-full py-[6.62px] lg:py-[10px] px-[10.6px] lg:px-4 bg-[#FAFAFA] rounded-[5.3px] lg:rounded-[8px] mt-1 lg:mt-4 flex flex-col gap-[2.65px] lg:gap-1.5">
                <p className="text-[#6B7B8A] text-[10px]/[10.6px] lg:text-[14px]/[16px] tracking-normal font-circular-std font-medium">
                  Vendor
                </p>
                <div className="w-full h-[14px] xl:h-[18px] flex items-center gap-[3px] xl:gap-[5px]">
                  <Avatar className="w-[8px] h-[8px] xl:w-[10.6px] xl:h-[10.6px] lg:w-6 lg:h-6">
                    <AvatarImage
                      src={ad.vendorImage || "/placeholder.svg"}
                      alt="Vendor's photo"
                    />
                    <AvatarFallback className="text-[6px] xl:text-[8px] lg:text-xs">
                      {getInitials(ad.vendor)}
                    </AvatarFallback>
                  </Avatar>
                  <p className="font-bold font-circular-std text-[#384853] text-[9px] xl:text-[12px]/[11.92px] lg:text-[15px]/[18px] tracking-normal truncate">
                    {ad.vendor}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
