"use client"

import { trendingAds } from "@/data/hotCampus"
import Link from "next/link"
import ProductCard from "../_components/ProductCard"

const HotOnCampuses = () => {
  return (
    <section className="lg:pt-10 pb-10 lg:pb-[92px] px-1 max-w-[1320px] mx-auto flex flex-col gap-[40px]">
      <div className="w-full flex flex-col gap-[31px]">
        <h2 className="text-[20px] sm:text-[28px]/[28.52px] lg:text-[36px]/[45.52px] tracking-normal font-bold font-circular-std text-center text-[#052332]">
          Hot on Campuses
        </h2>
        {/* <Title text=" Hot on Campuses" /> */}
        <div className="grid grid-cols-2 lg-md:grid-cols-3 2xl:grid-cols-4 gap-3 lg:gap-6 xl:gap-[25px] px-2 lg:px-0">
          {trendingAds?.map((ad, idx) => <ProductCard key={idx} ad={ad} />)}
        </div>
      </div>
      <div className="flex justify-center">
        <Link
          href="/ads"
          className="w-fit h-[46px] py-[10px] px-[13px] bg-white hover:bg-white/80 border-[#05051B] border text-[#05051B] hover:text-[#05051B] rounded-md text-[16px]/[18px] tracking-normal font-semibold transition flex justify-center items-center cursor-pointer"
        >
          Explore all
        </Link>
      </div>
    </section>
  )
}

export default HotOnCampuses
