"use client";

import BreadcrumbNav from "@/components/breadCrumbs";
import {
  ClockIcon,
  LightStrikeIcon,
  MapPinIcon,
  SpinnerIcon,
} from "@/components/svgs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { generateBreadcrumbs, getInitials } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdsDetails() {
  const pathname = usePathname();
  const breadcrumbItems = generateBreadcrumbs(pathname);

  return (
    <div className="w-full flex flex-col gap-4 bg-[#F4F6F8]">
      <div className="w-full bg-[#E8EBEE] h-[43px] flex items-center">
        <div className="w-full h-full max-w-[1320px] bg-[#E8EBEE] mx-auto">
          <BreadcrumbNav items={breadcrumbItems} className="w-[498px] h-6" />
        </div>
      </div>
      <div className="max-w-[1440px] mx-auto xl:p-4 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Product Images and Details */}
          <div className="lg:space-y-4">
            <div className="w-full flex flex-col gap-[1px] border rounded px-0">
              {/* FILTERS */}

              <Card className="w-full flex flex-row justify-between">
                <h3 className="text-[28px/[40px] xl:text-[32px]/[40px] text-foreground font-bold tracking-normal">
                  Filters
                </h3>
              </Card>
            </div>
          </div>
          {/* Right Column - Price and Actions */}
          <div className="lg:col-span-2 space-y-9 rounded-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg-md:grid-cols-3 2xl:grid-cols-4 gap-1 lg:gap-6 xl:gap-4">
              {Array.from({ length: 12 }, (_, idx) => (
                <Link
                  key={idx}
                  href={`/ads/${idx}`}
                  className="w-full max-w-[193px] lg:max-w-[311px] flex flex-col gap-[2.65px] bg-white p-1 lg:p-2.5 rounded-[10.6px] lg:rounded-[16px] hover:shadow-sm overflow-hidden border border-[#F1F2F4] cursor-pointer"
                >
                  <div className="relative">
                    <Image
                      src="/images/related_ad.webp"
                      alt="iPhone 12 Pro max"
                      width={292}
                      height={267}
                      className="w-full h-32 sm:h-[176.86px] lg:h-[267px] object-cover rounded-[8px] bg-[#E3E6EA] hover:scale-[1.01] transition-transform duration-200"
                    />

                    {/* {product.isSponsored && ( */}
                    <span className="w-fit h-8 flex items-center justify-center gap-[10px] rounded-[8px] p-2 absolute top-[130px] lg:top-[226.49px] left-[14.03px] bg-[#131313]/80 text-[#FFCC33] text-[12px]/[16px] font-bold font-circular-std tracking-normal">
                      <LightStrikeIcon /> Sponsored
                    </span>
                    {/* )} */}

                    {/* {product.isTopSeller && ( */}
                    <span className="w-fit h-6 py-1 px-2 flex justify-center items-center gap-[10px] absolute top-2 left-2 bg-white text-[#384853] text-[12px]/[16px] font-medium font-circular-std rounded-[8px]">
                      New
                    </span>
                    {/* )} */}
                  </div>

                  {/* Content */}
                  <div className="pt-1 lg:pt-2 pb-0 flex flex-col gap-[2.65px] lg:gap-1">
                    <h3 className="text-[12px]/[11.92px] lg:text-[16px]/[18px] font-medium font-circular-std text-[#384853] truncate">
                      iPhone 12 Pro max
                    </h3>
                    <p className="text-secondary font-bold text-[12px]/[15.9px] lg:text-[18px]/[24px] -tracking-[1%] align-middle">
                      ₦1,277,098
                    </p>
                    <div className="w-full grid grid-cols-2 gap-1">
                      <div className="flex items-center gap-1.5 lg:gap-2">
                        <MapPinIcon className="w-4 h-4 text-[#384853]" />
                        <span className="text-[#384853] text-[12px] lg:text-[14px] leading-[1.2] font-medium font-circular-std truncate">
                          Umuahia
                        </span>
                      </div>
                      <div className="hidden sm:flex items-center justify-end gap-1.5 lg:gap-2">
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
                      {/* Adjusted font size, margin */}
                      <div className="w-full h-[18px] flex items-center gap-[5px]">
                        <Avatar className="w-[10.6px] h-[10.6px] lg:w-6 lg:h-6">
                          <AvatarImage
                            src="/images/vendor.jpg"
                            alt="Vendor's photo"
                          />

                          <AvatarFallback>
                            {getInitials("Aliya Gadget Store")}
                          </AvatarFallback>
                        </Avatar>
                        <p className="font-bold font-circular-std text-[#384853] text-[12px]/[11.92px] lg:text-[15px]/[18px] tracking-normal truncate">
                          Aliya Gadget Store
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="w-full flex justify-center items-center">
              <Button className="w-fit h-[50px] px-5 bg-[#E8F7FF] hover:bg-[#E8F7FF] text-secondary hover:scale-[0.98] font-circular-std font-bold text-[16px]/[50px] tracking-normal capitalize flex justify-center items-center gap-2 rounded cursor-pointer">
                <SpinnerIcon /> Load More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
