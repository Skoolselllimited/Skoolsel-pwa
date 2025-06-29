"use client";

import React from "react";
import { generateBreadcrumbs, BreadcrumbItem } from "@/lib/utils";
import { PublicProfile } from "../components/PublicProfile";
import PublicProfileSidebar from "../components/PublicProfileSidebar";
import { dummyProps } from "../data";
import BreadcrumbNav from "@/components/breadCrumbs";
// zawardo
export default function PublicProfilePage() {
  const userDetails = dummyProps.userDetails;
  const mockPath = "/ad-list/mobile/samsung/jones-profile";
  const breadcrumbs: BreadcrumbItem[] = generateBreadcrumbs(mockPath);

  return (
    <>
      {/* Breadcrumb UI */}
      <BreadcrumbNav pathname={mockPath} />

      {/* Main Section */}
      <section className="w-full mx-auto bg-[#f4f6f8]">
        <section className="max-w-[1400px] mx-auto bg-[#f4f6f8]">
          <section
            aria-labelledby="related-heading font-primary"
            className="flex flex-col justify-center bg-[#f4f6f8] md:px-20  md:pb-20 md:pt-10 md:flex-row gap-x-8 lg:gap-x-12 lg:px-16 "
          >
            {/* Sidebar takes its intrinsic width, or a specified fixed width */}
            <div className="w-full hidden lg:flex md md:w-auto md:shrink-0">
              <PublicProfileSidebar user={userDetails} />
            </div>

            {/* Main content takes the remaining space, flexing to fill */}
            <div className="w-full   md:mt-0 md:flex-grow ">
              <PublicProfile {...dummyProps} />
            </div>
          </section>
        </section>
      </section>
    </>
  );
}
