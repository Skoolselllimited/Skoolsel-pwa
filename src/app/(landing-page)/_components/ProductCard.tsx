"use client"

import { ClockIcon, LightStrikeIcon, MapPinIcon } from "@/components/svgs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatPrice, getInitials } from "@/lib/utils"
import Product from "@/types/productCardType"
import Image from "next/image"
import Link from "next/link"
import React from "react"

type Props = {
  ad: Product
}

const ProductCard: React.FC<Props> = ({ ad }: Props) => {
  return (
    <Link
      href={`/ads/${ad.id}?name=${ad.name}`}
      className="flex flex-col gap-[2.65px] bg-white p-1 lg:p-2 rounded-[10.6px] lg:rounded-[16px] hover:shadow-sm overflow-hidden border border-[#F1F2F4] cursor-pointer"
    >
      <div className="relative">
        <Image
          src={ad.image}
          alt={ad.name}
          width={292}
          height={267}
          className="w-full h-32 sm:h-[176.86px] lg:h-[267px] object-cover rounded-[8px] bg-[#E3E6EA] hover:scale-[1.01] transition-transform duration-200"
        />

        {ad.isSponsored && (
          <span className="w-fit h-8 flex items-center justify-center gap-[10px] rounded-[8px] p-2 absolute top-[130px] lg:top-[226.49px] left-[14.03px] bg-[#131313]/80 text-[#FFCC33] text-[12px]/[16px] font-bold font-circular-std tracking-normal">
            <LightStrikeIcon /> Sponsored
          </span>
        )}

        {ad.isTopSeller && (
          <span className="w-fit h-6 py-1 px-2 flex justify-center items-center gap-[10px] absolute top-2 left-2 bg-white text-[#384853] text-[12px]/[16px] font-medium font-circular-std rounded-[8px]">
            Used
          </span>
        )}
      </div>

      {/* Content */}
      <div className="pt-1 lg:pt-2 pb-0 flex flex-col gap-[2.65px] lg:gap-1">
        <h3 className="text-[12px]/[11.92px] lg:text-[16px]/[18px] font-medium font-circular-std text-[#384853] truncate">
          {ad.name}
        </h3>
        <p className="text-secondary font-bold text-[12px]/[15.9px] lg:text-[18px]/[24px] -tracking-[1%] align-middle">
          {ad.price}
        </p>
        <div className="w-full flex justify-between gap-1">
          <div className="flex items-center gap-1.5 lg:gap-2">
            <MapPinIcon className="w-4 h-4 text-[#384853]" />
            <span className="text-[#384853] text-[12px] lg:text-[14px] leading-[1.2] font-medium font-circular-std truncate">
              {ad.campus}
            </span>
          </div>
          <div className="flex items-center justify-end gap-1.5 lg:gap-2">
            <ClockIcon className="w-4 h-4 text-[#384853]" />
            <span className="text-[#384853] text-[12px] lg:text-[14px] leading-[1.2] font-medium font-circular-std truncate">
              1 week ago
            </span>
          </div>
        </div>
        <div className="w-full py-[6.62px] lg:py-[10px] px-[10.6px] lg:px-4 bg-[#FAFAFA] rounded-[5.3px] lg:rounded-[8px] mt-1 lg:mt-4 flex flex-col gap-[2.65px] lg:gap-1.5">
          <p className="text-[#6B7B8A] text-[10px]/[10.6px] lg:text-[14px]/[16px] tracking-normal font-circular-std font-medium">
            Vendor
          </p>
          <div className="w-full h-[18px] flex items-center gap-[5px]">
            <Avatar className="w-[10.6px] h-[10.6px] lg:w-6 lg:h-6">
              <AvatarImage src={ad.vendorImage} alt="Vendor's photo" />
              <AvatarFallback>{getInitials(ad.vendor)}</AvatarFallback>
            </Avatar>
            <p className="font-bold font-circular-std text-[#384853] text-[12px]/[11.92px] lg:text-[15px]/[18px] tracking-normal truncate">
              {ad.vendor}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
