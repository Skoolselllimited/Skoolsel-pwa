"use client"

import { ClockIcon, LightStrikeIcon, MapPinIcon } from "@/components/svgs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitials } from "@/lib/utils"
import Product from "@/types/productCardType"
import Image from "next/image"
import Link from "next/link"
import React from "react"

type Props = {
  product: Product
}

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <Link
      href={`/ads/${product.id}`}
      className="bg-white p-1 lg:p-2 rounded-[10.6px] lg:rounded-[16px] hover:shadow-sm overflow-hidden border border-[#F1F2F4] w-[193.41px] h-[298.07px] lg:w-[311px] lg:h-[450px] cursor-pointer mx-auto flex flex-col gap-[2.65px]"
    >
      <div className="relative">
        <Image
          src={product.image}
          alt={product.name}
          width={192}
          height={128}
          className="w-full h-32 sm:h-[176.86px] sm:w-[193.75px] lg:h-[267px] lg:w-[292.5px] object-cover rounded-[8px] bg-[#E3E6EA] hover:scale-[1.01] transition-transform duration-200"
        />

        {product.isSponsored && (
          <span className="w-fit h-8 flex items-center justify-center gap-[10px] rounded-[8px] p-2 absolute top-[130px] lg:top-[226.49px] left-[14.03px] bg-[#131313]/80 text-[#FFCC33] text-[12px]/[16px] font-bold font-circular-std tracking-normal">
            <LightStrikeIcon /> Sponsored
          </span>
        )}

        {product.isTopSeller && (
          <span className="w-fit h-6 py-1 px-2 flex justify-center items-center gap-[10px] absolute top-2 left-2 bg-white text-[#384853] text-[12px]/[16px] font-medium font-circular-std rounded-[8px]">
            Used
          </span>
        )}
      </div>

      {/* Content */}
      <div className="pt-1 lg:pt-2 pb-0 flex flex-col gap-[2.65px] lg:gap-1">
        <h3 className="text-[12px]/[11.92px] lg:text-[16px]/[18px] font-[450px] font-circular-std text-[#384853] truncate">
          {product.name}
        </h3>
        <p className="text-secondary font-bold text-[12px]/[15.9px]  lg:text-[18px]/[24px] -tracking-[1%] align-middle">
          {product.price}
        </p>
        <div className="w-[193.41px] lg:w-[292px] h-[18px] lg:h-[26px] grid grid-cols-2 gap-1">
          <div className="h-full flex items-center  gap-[2px] lg:gap-[10px] py-1 pr-[10px]">
            <MapPinIcon className="text-[#384853]" />
            <span className="text-[#384853] text-[12px]/[18px] lg:text-[14px]/[18px] -tracking-[1%] font-[450] font-circular-std">
              {product.campus}
            </span>
          </div>
          <div className="h-full flex items-center gap-[2px] lg:gap-[10px] py-1 pr-[10px]">
            <ClockIcon className="text-[#384853]" />
            <span className="text-[#384853] text-[12px]/[18px] lg:text-[14px]/[18px] -tracking-[1%] font-[450] font-circular-std">
              1 week ago
            </span>
          </div>
        </div>

        <div className="w-[193.4px] h-[37.17px] lg:w-[292px] lg:h-[56px] py-[6.62px] lg:py-[10px] px-[10.6px] lg:px-4 bg-[#FAFAFA] rounded-[5.3px] lg:rounded-[8px] mt-1 lg:mt-4 flex flex-col gap-[2.65px] lg:gap-1.5">
          <p className="text-[#6B7B8A] text-[10px]/[10.6px] lg:text-[14px]/[16px] tracking-normal font-circular-std font-[450]">
            Vendor
          </p>{" "}
          {/* Adjusted font size, margin */}
          <div className="w-full h-[18px] flex items-center gap-[5px]">
            <Avatar className="w-6 h-6">
              <AvatarImage src={product.vendorImage} alt="Vendor's photo" />
              <AvatarFallback>{getInitials(product.vendor)}</AvatarFallback>
            </Avatar>
            <p className="font-bold font-circular-std text-[#384853] text-[12px]/[11.92px] text-lg:[15px]/[18px] tracking-normal truncate">
              {product.vendor}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
