"use client";

import React from "react";
import { generateBreadcrumbs, BreadcrumbItem } from "@/lib/utils";
import { PublicProfile } from "../components/PublicProfile";
import PublicProfileSidebar from "../components/PublicProfileSidebar";
import { dummyProps } from "../data";

export default function PublicProfilePage() {
  const userDetails = dummyProps.userDetails;
  const mockPath = "/ad-list/mobile/samsung/jones-profile";
  const breadcrumbs: BreadcrumbItem[] = generateBreadcrumbs(mockPath);

  return (
    <>
      {/* Breadcrumb UI */}
      <div className="px-4 py-2 bg-[#e8ebee] text-sm text-gray-500">
        <nav aria-label="Breadcrumb" className="flex space-x-1">
          {breadcrumbs.map((item, idx) => (
            <div key={item.href} className="flex items-center space-x-3">
              <a
                href={item.href}
                className={`hover:underline ${
                  item.current ? "text-[#54abdb] font-medium" : "text-gray-500"
                }`}
              >
                {item.label}
              </a>
              {idx < breadcrumbs.length - 1 && <span>{">"}</span>}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Section */}
      <section
        aria-labelledby="related-heading font-primary"
        className="flex flex-col pb-20 md:flex-row gap-x-8 lg:gap-x-12 py-10 px-4 md:px-8 lg:px-16 bg-[#f4f6f8]"
      >
        {/* Sidebar takes its intrinsic width, or a specified fixed width */}
        <div className="w-full md:w-auto md:shrink-0">
          <PublicProfileSidebar user={userDetails} />
        </div>

        {/* Main content takes the remaining space, flexing to fill */}
        <div className="w-full  mt-4 md:mt-0 md:flex-grow">
          <PublicProfile {...dummyProps} />
        </div>
      </section>
    </>
  );
}
