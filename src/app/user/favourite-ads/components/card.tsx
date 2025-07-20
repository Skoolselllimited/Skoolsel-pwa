"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  MoreHorizontal,
  Edit,
  Eye,
  CheckCircle,
  Trash2Icon,
  Zap,
} from "lucide-react";
import { GoStack } from "react-icons/go";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { IoMdHeart } from "react-icons/io";

interface ProductCardProps {
  imageSrc: string;
  category: string;
  title: string;
  price: number;
  id: number;
  name: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageSrc,
  category,
  title,
  price,
  name,
  id,
}) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/my-ads/${id}?name=${encodeURIComponent(name)}`);
  };

  const formatPrice = (value: number) => {
    return `₦${value.toLocaleString("en-NG")}`;
  };

  return (
    <div
      onClick={handleCardClick}
      className="w-full max-w-[300px] rounded-sm  bg-white cursor-pointer  hover:shadow-md transition-shadow duration-200"
    >
      {/* Image */}
      <div className="relative w-full aspect-[3/3] md:aspect-[4/3] ">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover object-center rounded-t-sm"
          sizes="100vw"
        />
      </div>

      {/* Content */}
      <div className="p-1 md:p-4 flex flex-col gap-3">
        {/* Category */}
        <div className="flex text-[10px] md:text-[16px] items-center gap-1 md:gap-2 text-sm text-[#6B7280] font-medium">
          <GoStack className="w-4 h-4 text-gray-400" />
          <span>{category}</span>
        </div>

        {/* Title */}
        <h3 className="text-[13px] md:text-[16px] font-semibold text-gray-900 line-clamp-2 leading-tight">
          {title}
        </h3>

        {/* Price + More */}
        <div className="flex items-center justify-between pt-1 border-t border-[#F1F3F9]">
          <span className="text-[13px] md:text-[14px]  text-[#FF4F4F]">
            {formatPrice(price)}
          </span>
          <button
            onClick={(e) => e.stopPropagation()}
            className="h-[24px] w-[24px] rounded-full flex items-center justify-center hover:bg-gray-100 transition"
          >
            <IoMdHeart className="text-[#54abdb]" />
          </button>

          {/* Dropdown */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
