"use client";
import { ClockIcon, HeartIcon, MapPinIcon } from "@/components/svgs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ads } from "@/data";
import { formatPrice, getInitials } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "./components/card";

export default function FavouriteAds() {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-[20px]/[32px] font-circular-std font-medium tracking-normal text-[#191F33]">
        Saved Ads
      </h3>

      <div className="w-full grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-3 xl:gap-4">
        {ads.map((ad, idx) => (
          <ProductCard
            key={ad.id} // ✅ Add this line
            ad={ad}
          />
        ))}
      </div>
    </div>
  );
}
