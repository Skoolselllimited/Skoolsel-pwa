"use client"

import Link from "next/link"
import Image from "next/image"
import { MapPinIcon, ClockIcon } from "lucide-react"

import { formatPrice } from "@/lib/utils"
import { AdsType } from "@/types"
import { IoMdHeart } from "react-icons/io"

type Props = {
  ad: AdsType
}

export default function AdCard({ ad }: Props) {
  return (
    <Link
      href={`/user/saved-ads/${ad.id}?name=${ad.name}`}
      className="flex flex-col gap-[2.65px] bg-white p-1 lg:p-2 rounded-[10.6px] lg:rounded-[16px] hover:shadow-sm overflow-hidden border border-[#F1F2F4] cursor-pointer relative"
    >
      {/* Dropdown */}
      <div className="absolute top-4 right-4 z-10">
        <button className="w-6 h-6 bg-white rounded-xs flex justify-center items-center">
          <IoMdHeart className="text-[#54abdb] w-5 h-5" />
        </button>
      </div>

      {/* Image */}
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
              {ad.abbreviation}
            </span>
          </div>
          <div className="flex items-center justify-end gap-1.5 lg:gap-2">
            <ClockIcon className="w-5 h-5 text-[#384853]" />
            <span className="text-[#384853] text-[12px] lg:text-[16px]/[18px] font-[450] font-circular-std tracking-normal truncate">
              {ad.timePosted}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

// "use client";

// import React from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import {
//   MoreHorizontal,
//   Edit,
//   Eye,
//   CheckCircle,
//   Trash2Icon,
//   Zap,
// } from "lucide-react";
// import { GoStack } from "react-icons/go";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
// } from "@/components/ui/dropdown-menu";
// import { IoMdHeart } from "react-icons/io";

// interface ProductCardProps {
//   imageSrc: string;
//   category: string;
//   title: string;
//   price: number;
//   id: number;
//   name: string;
// }

// const ProductCard: React.FC<ProductCardProps> = ({
//   imageSrc,
//   category,
//   title,
//   price,
//   name,
//   id,
// }) => {
//   const router = useRouter();

//   const handleCardClick = () => {
//     router.push(`/my-ads/${id}?name=${encodeURIComponent(name)}`);
//   };

//   const formatPrice = (value: number) => {
//     return `₦${value.toLocaleString("en-NG")}`;
//   };

//   return (
//     <div
//       onClick={handleCardClick}
//       className="w-full max-w-[300px] rounded-sm  bg-white cursor-pointer  hover:shadow-md transition-shadow duration-200"
//     >
//       {/* Image */}
//       <div className="relative w-full aspect-[3/3] md:aspect-[4/3] ">
//         <Image
//           src={imageSrc}
//           alt={title}
//           fill
//           className="object-cover object-center rounded-t-sm"
//           sizes="100vw"
//         />
//       </div>

//       {/* Content */}
//       <div className="p-1 md:p-4 flex flex-col gap-3">
//         {/* Category */}
//         <div className="flex text-[10px] md:text-[16px] items-center gap-1 md:gap-2 text-sm text-[#6B7280] font-medium">
//           <GoStack className="w-4 h-4 text-gray-400" />
//           <span>{category}</span>
//         </div>

//         {/* Title */}
//         <h3 className="text-[13px] md:text-[16px] font-semibold text-gray-900 line-clamp-2 leading-tight">
//           {title}
//         </h3>

//         {/* Price + More */}
//         <div className="flex items-center justify-between pt-1 border-t border-[#F1F3F9]">
//           <span className="text-[13px] md:text-[14px]  text-[#FF4F4F]">
//             {formatPrice(price)}
//           </span>
//           <button
//             onClick={(e) => e.stopPropagation()}
//             className="h-[24px] w-[24px] rounded-full flex items-center justify-center hover:bg-gray-100 transition"
//           >
//             <IoMdHeart className="text-[#54abdb]" />
//           </button>

//           {/* Dropdown */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
