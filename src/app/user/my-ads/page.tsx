"use client";

import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AdCard from "./components/adCard";
import { filterByCatergories } from "@/data/mockdata";
import { GoArrowRight } from "react-icons/go";
import { GoArrowLeft } from "react-icons/go";

const recentAds = [
  {
    id: 1,
    name: "iPhone 13 Pro Max",
    category: "Mobile",
    subcategory: "Apple",
    price: 750000,
    abbreviation: "ABU Zaria",
    timePosted: "1 week ago",
    image: "/images/related_ad.webp",
    vendor: "Aliya Gadget Store",
    vendorImage: "/images/vendor.jpg",
    condition: "New",
    isSponsored: true,
    isTopSeller: true,
    school: "Ahmadu Bello University Zaria",
  },
  {
    id: 2,
    name: "MacBook Pro 16-inch",
    category: "Computer & Laptop",
    subcategory: "Apple",
    price: 1200000,
    abbreviation: "FUT Minna",
    timePosted: "3 days ago",
    image: "/images/image1.png",
    vendor: "Tech Hub",
    vendorImage: "/images/vendor.jpg",
    condition: "Used",
    isSponsored: false,
    isTopSeller: true,
    school: "Federal University of Science and Technology Minna",
  },
  {
    id: 3,
    name: "Samsung Galaxy S22 Ultra",
    category: "Mobile",
    subcategory: "Samsung",
    price: 650000,
    abbreviation: "UniLag",
    timePosted: "2 weeks ago",
    image: "/images/image2.png",
    vendor: "Mobile World",
    vendorImage: "/images/vendor.jpg",
    condition: "New",
    isSponsored: true,
    isTopSeller: false,
    school: "Lagos State University",
  },
  {
    id: 4,
    name: "iPhone 13 Pro Max",
    category: "Mobile",
    subcategory: "Apple",
    price: 750000,
    abbreviation: "ABU Zaria",
    timePosted: "1 week ago",
    image: "/images/related_ad.webp",
    vendor: "Aliya Gadget Store",
    vendorImage: "/images/vendor.jpg",
    condition: "New",
    isSponsored: true,
    isTopSeller: true,
    school: "Ahmadu Bello University Zaria",
  },
  {
    id: 5,
    name: "MacBook Pro 16-inch",
    category: "Computer & Laptop",
    subcategory: "Apple",
    price: 1200000,
    abbreviation: "FUT Minna",
    timePosted: "3 days ago",
    image: "/images/image1.png",
    vendor: "Tech Hub",
    vendorImage: "/images/vendor.jpg",
    condition: "Used",
    isSponsored: false,
    isTopSeller: true,
    school: "Federal University of Science and Technology Minna",
  },
  {
    id: 6,
    name: "Samsung Galaxy S22 Ultra",
    category: "Mobile",
    subcategory: "Samsung",
    price: 650000,
    abbreviation: "UniLag",
    timePosted: "2 weeks ago",
    image: "/images/image2.png",
    vendor: "Mobile World",
    vendorImage: "/images/vendor.jpg",
    condition: "New",
    isSponsored: true,
    isTopSeller: false,
    school: "Lagos State University",
  },
  {
    id: 7,
    name: "iPhone 13 Pro Max",
    category: "Mobile",
    subcategory: "Apple",
    price: 750000,
    abbreviation: "ABU Zaria",
    timePosted: "1 week ago",
    image: "/images/related_ad.webp",
    vendor: "Aliya Gadget Store",
    vendorImage: "/images/vendor.jpg",
    condition: "New",
    isSponsored: true,
    isTopSeller: true,
    school: "Ahmadu Bello University Zaria",
  },
  {
    id: 8,
    name: "MacBook Pro 16-inch",
    category: "Computer & Laptop",
    subcategory: "Apple",
    price: 1200000,
    abbreviation: "FUT Minna",
    timePosted: "3 days ago",
    image: "/images/image1.png",
    vendor: "Tech Hub",
    vendorImage: "/images/vendor.jpg",
    condition: "Used",
    isSponsored: false,
    isTopSeller: true,
    school: "Federal University of Science and Technology Minna",
  },
  {
    id: 9,
    name: "Samsung Galaxy S22 Ultra",
    category: "Mobile",
    subcategory: "Samsung",
    price: 650000,
    abbreviation: "UniLag",
    timePosted: "2 weeks ago",
    image: "/images/image2.png",
    vendor: "Mobile World",
    vendorImage: "/images/vendor.jpg",
    condition: "New",
    isSponsored: true,
    isTopSeller: false,
    school: "Lagos State University",
  },
  {
    id: 10,
    name: "iPhone 13 Pro Max",
    category: "Mobile",
    subcategory: "Apple",
    price: 750000,
    abbreviation: "ABU Zaria",
    timePosted: "1 week ago",
    image: "/images/related_ad.webp",
    vendor: "Aliya Gadget Store",
    vendorImage: "/images/vendor.jpg",
    condition: "New",
    isSponsored: true,
    isTopSeller: true,
    school: "Ahmadu Bello University Zaria",
  },
  {
    id: 11,
    name: "MacBook Pro 16-inch",
    category: "Computer & Laptop",
    subcategory: "Apple",
    price: 1200000,
    abbreviation: "FUT Minna",
    timePosted: "3 days ago",
    image: "/images/image1.png",
    vendor: "Tech Hub",
    vendorImage: "/images/vendor.jpg",
    condition: "Used",
    isSponsored: false,
    isTopSeller: true,
    school: "Federal University of Science and Technology Minna",
  },
  {
    id: 12,
    name: "Samsung Galaxy S22 Ultra",
    category: "Mobile",
    subcategory: "Samsung",
    price: 650000,
    abbreviation: "UniLag",
    timePosted: "2 weeks ago",
    image: "/images/image2.png",
    vendor: "Mobile World",
    vendorImage: "/images/vendor.jpg",
    condition: "New",
    isSponsored: true,
    isTopSeller: false,
    school: "Lagos State University",
  },
  {
    id: 13,
    name: "iPhone 13 Pro Max",
    category: "Mobile",
    subcategory: "Apple",
    price: 750000,
    abbreviation: "ABU Zaria",
    timePosted: "1 week ago",
    image: "/images/related_ad.webp",
    vendor: "Aliya Gadget Store",
    vendorImage: "/images/vendor.jpg",
    condition: "New",
    isSponsored: true,
    isTopSeller: true,
    school: "Ahmadu Bello University Zaria",
  },
  {
    id: 14,
    name: "MacBook Pro 16-inch",
    category: "Computer & Laptop",
    subcategory: "Apple",
    price: 1200000,
    abbreviation: "FUT Minna",
    timePosted: "3 days ago",
    image: "/images/image1.png",
    vendor: "Tech Hub",
    vendorImage: "/images/vendor.jpg",
    condition: "Used",
    isSponsored: false,
    isTopSeller: true,
    school: "Federal University of Science and Technology Minna",
  },
  {
    id: 15,
    name: "Samsung Galaxy S22 Ultra",
    category: "Mobile",
    subcategory: "Samsung",
    price: 650000,
    abbreviation: "UniLag",
    timePosted: "2 weeks ago",
    image: "/images/image2.png",
    vendor: "Mobile World",
    vendorImage: "/images/vendor.jpg",
    condition: "New",
    isSponsored: true,
    isTopSeller: false,
    school: "Lagos State University",
  },
  {
    id: 16,
    name: "iPhone 13 Pro Max",
    category: "Mobile",
    subcategory: "Apple",
    price: 750000,
    abbreviation: "ABU Zaria",
    timePosted: "1 week ago",
    image: "/images/related_ad.webp",
    vendor: "Aliya Gadget Store",
    vendorImage: "/images/vendor.jpg",
    condition: "New",
    isSponsored: true,
    isTopSeller: true,
    school: "Ahmadu Bello University Zaria",
  },
  {
    id: 17,
    name: "MacBook Pro 16-inch",
    category: "Computer & Laptop",
    subcategory: "Apple",
    price: 1200000,
    abbreviation: "FUT Minna",
    timePosted: "3 days ago",
    image: "/images/image1.png",
    vendor: "Tech Hub",
    vendorImage: "/images/vendor.jpg",
    condition: "Used",
    isSponsored: false,
    isTopSeller: true,
    school: "Federal University of Science and Technology Minna",
  },
  {
    id: 18,
    name: "Samsung Galaxy S22 Ultra",
    category: "Mobile",
    subcategory: "Samsung",
    price: 650000,
    abbreviation: "UniLag",
    timePosted: "2 weeks ago",
    image: "/images/image2.png",
    vendor: "Mobile World",
    vendorImage: "/images/vendor.jpg",
    condition: "New",
    isSponsored: true,
    isTopSeller: false,
    school: "Lagos State University",
  },
];

const formatPrice = (price: number) => `\u20a6${price.toLocaleString()}`;

const adsPerPage = 9;

export default function MyAds() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAds = recentAds.filter((ad) =>
    ad.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  const totalPages = Math.ceil(filteredAds.length / adsPerPage);

  const paginatedAds = filteredAds.slice(
    (currentPage - 1) * adsPerPage,
    currentPage * adsPerPage
  );

  const handlepageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className="w-full px-1 md:px-6 lg:px-8 py-6">
      <h1 className="text-xl sm:text-2xl font-bold text-[#384853] mb-4">
        My Ads
      </h1>

      <div className="flex flex-col sm:flex-row gap-2 sm:items-center justify-between mb-4">
        <Input
          type="text"
          placeholder="Ads title, keyword..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full sm:max-w-xs border bg-white border-[#DADDE1]"
        />

        <div className="sm:flex sm:gap-2">
          <select
            className="border bg-white border-[#DADDE1] bg-w 
          text-sm text-gray-700 px-3 py-3 sm:py-2 rounded-sm sm:rounded-md w-full sm:max-w-xs"
          >
            <option>All Category</option>
            <option>Electronics</option>
            <option>Books</option>
          </select>
          <select className=" hidden sm:block border-[#DADDE1] bg-white text-sm text-gray-700 px-3 py-2 rounded-md">
            <option>All</option>
            <option>Sold</option>
            <option>Active</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-2 sm:gap-4">
        {paginatedAds.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          onClick={() => handlepageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`w-8 h-8 rounded-md flex items-center justify-center text-[#54abdb] transition ${
            currentPage === 1
              ? "bg-[#E8F7FF] opacity-50 cursor-not-allowed"
              : "bg-[#E8F7FF] hover:bg-[#D4F0FF]"
          }`}
        >
          <GoArrowLeft />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlepageChange(page)}
            className={`w-8 h-8 rounded-md text-sm flex items-center justify-center transition font-medium ${
              page === currentPage
                ? "bg-[#54abdb] text-white"
                : "text-[#6B7280] hover:bg-[#F3F4F6]"
            }`}
          >
            {String(page).padStart(2, "0")}
          </button>
        ))}

        <button
          onClick={() => handlepageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`w-8 h-8 rounded-md flex items-center justify-center text-[#54abdb] transition ${
            currentPage === totalPages
              ? "bg-[#E8F7FF] opacity-50 cursor-not-allowed"
              : "bg-[#E8F7FF] hover:bg-[#D4F0FF]"
          }`}
        >
          <GoArrowRight />
        </button>
      </div>
    </section>
  );
}
