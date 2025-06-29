import React from "react";
import { SuccessfulPublish } from "../../../../../../public/svgs";
import { GoArrowRight } from "react-icons/go";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface ReviewSuccessProps {
  handleRoute: () => void;
  skoolselLogoSrc: string;
}

const ReviewSuccess = ({
  handleRoute,
  skoolselLogoSrc,
}: ReviewSuccessProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 text-gray-800">
      {/* Top Navigation/Header */}
      <div className="w-full max-w-lg px-5 pt-6 flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src={
              skoolselLogoSrc ||
              "https://placehold.co/100x30/FFFFFF/000000?text=Skoolsel"
            }
            alt="Skoolsel Logo"
            className="w-18 h-18 sm:w-20 sm:h-20 object-contain"
            width={100}
            height={70}
          />
        </div>
        {/* Dropdown - "All Schools" */}
        <div className="relative inline-block text-gray-700">
          <select className="block appearance-none w-full bg-[#f4f4f4]  hover:border-gray-400 px-2 sm:px-4 py-2 pr-8 rounded-md  leading-tight focus:outline-none focus:shadow-outline text-sm">
            <option>All Schools</option>
            {/* Add more options here if needed */}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center px-4 pb-10">
        <div className="mt-8 mb-6">
          <SuccessfulPublish />
        </div>
        <p className="text-gray-900 text-3xl md:text-4xl text-center font-bold px-4 leading-tight">
          Your review is published successfully
        </p>
        <p className="text-gray-600 mt-4 text-base text-center max-w-sm px-4">
          {" "}
          Proin placerat risus non justo faucibus commodo. Nunc non neque sit
          amet magna aliquam condimentum.
        </p>
        <div className="mt-8 mb-10 w-full max-w-sm px-2 sm:px-4 flex flex-wrap justify-between gap-1 sm:gap-2">
          {/* Back To Profile Button */}
          <Button
            className="flex-[1_1_48%] max-w-[48%] bg-white border-1 border-[#54abdb] text-[#54abdb] hover:bg-blue-50 
               px-2 py-5 text-[10px] sm:px-3 sm:py-2 sm:text-sm md:px-4 md:py-3 md:text-base text-center"
            onClick={handleRoute}
          >
            Back To Profile
          </Button>

          {/* View Seller's Ads Button */}
          <button
            className="flex-[1_1_48%] rounded-sm max-w-[48%] bg-[#54abdb] text-white hover:bg-[#4a90d2] 
               px-1 py-3 text-[8px] sm:px-3 sm:py-4 sm:text-sm md:px-4 md:py-3 md:text-base text-center flex items-center justify-center
               "
            onClick={handleRoute}
          >
            View Seller&apos;s Ads
            <GoArrowRight className="w-3 h-3 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewSuccess;
