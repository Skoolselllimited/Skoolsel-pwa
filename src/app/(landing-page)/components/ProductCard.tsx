"use client";

import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import Product from "@/types/productCardType";
import { HiOutlineBolt } from "react-icons/hi2";
import { GoClock } from "react-icons/go";

type Props = {
  product: Product;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="bg-white p-2 rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow w-full sm:w-auto cursor-pointer">
      {/* Outer card padding adjusted here */}
      {/* Image and Tags */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-lg" // Adjusted rounding
        />

        {product.isSponsored && (
          <span className="absolute bottom-3 left-3 bg-[#2f2d2c] text-[#ffcc33] text-[12px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
            <HiOutlineBolt className="text-[#ffcc33]" /> Sponsored
          </span>
        )}

        {product.isTopSeller && (
          <span className="absolute top-2 left-2 bg-white text-gray-800 text-[10px] font-semibold px-2 py-0.5 rounded-md shadow">
            Used
          </span>
        )}
      </div>

      {/* Content */}
      <div className="pt-2 pb-0">
        <h3 className="text-[11px] font-medium text-gray-800 mb-0.5 truncate">
          {product.name}
        </h3>
        <p className="text-[#54abdb] font-bold text-base mb-0.5">
          {product.price}
        </p>
        <div className="flex items-center text-[#384853] text-xs mt-1 gap-20">
          <div className="flex items-center gap-1">
            <FaMapMarkerAlt className="text-[#384853] text-sm" />
            <span>{product.campus}</span>
          </div>
          <div className="flex items-center gap-1">
            <GoClock className="text-[#384853] text-sm" />
            <span>1 week ago</span>
          </div>
        </div>

        <div className="text-xs bg-[#fafafa] rounded-md px-2 py-1 mt-4">
          <p className="text-gray-500 text-[10px] mb-0.5">Vendor</p>{" "}
          {/* Adjusted font size, margin */}
          <div className="flex items-center gap-1">
            <img
              src={product.vendorImage || "/default-avatar.png"}
              alt={product.vendor}
              className="w-5 h-5 rounded-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = "/default-avatar.png";
              }}
            />
            <p className="font-semibold text-gray-800 text-xs truncate">
              {product.vendor}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
