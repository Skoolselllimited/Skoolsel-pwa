"use client"
import Image from "next/image"
import { useRef } from "react"
import SearchBar from "../../(ads)/_components/Searchbar"

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section className="w-full h-full xl:h-[524px] bg-primary flex justify-center items-center relative text-white">
      {/* Replace your old background-div with a next/image fill */}
      <div className="hidden xl:block absolute inset-0 h-full">
        <Image
          src="/images/hero-bg.webp"
          alt="Hero background"
          fill
          priority
          className="w-full h-full xl:h-[402px] object-contain"
        />
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(270.55deg, rgba(0, 54, 84, 0) 2.54%, #003654 23.42%, #003654 50.79%, #003654 76.47%, rgba(0, 54, 84, 0) 99.04%)",
        }}
      />
      {/* Content */}
      <div className="w-full flex flex-col justify-center items-center relative z-10 px-4 py-24 text-center">
        <div className="w-full xl:w-[824px] h-[154px] lg:h-[184px] space-y-4  mb-4 lg:mb-6 xl:mb-14">
          <span className="w-fit h-[40px] py-1 px-3 lg:px-5 inline-flex bg-secondary rounded-[5px] font-[900] font-circular-std uppercase text-white text-[12px]/[100%] lg:text-[16px]/[32px] tracking-normal text-center justify-center items-center">
            Over 95,00,000 Live Ads
          </span>
          <h1 className="font-circular-std font-bold h-[284px] tracking-normal text-center text-[26px]/[120%] md:text-[32px]/[120%] xl:text-[64px]/[76px] leading-normal">
            The Number One Students
            <br />
            Market Place
          </h1>
        </div>

        {/* Search area container */}
        <div
          className="shrink-0 relative max-w-[720px] 3xl:max-w-[871px] mx-auto w-full bg-white rounded-[16px] h-[60px] lg:h-[70px] shadow-[0px_4px_19px_0px_#8E979E26] border border-[#F1F2F4]"
          ref={containerRef}
        >
          <SearchBar />
        </div>
      </div>
    </section>
  )
}
