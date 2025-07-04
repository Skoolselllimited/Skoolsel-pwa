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
        <div className="mt-8 mb-10 w-full max-w-sm px-2 sm:px-4 flex flex-wrap gap-3">
          {/* Back To Profile Button */}
          <Button
            className="w-full sm:flex-1 sm:max-w-[48%] bg-white border border-[#54abdb] text-[#54abdb] hover:bg-blue-50 
      px-4 py-5 text-sm sm:text-base text-center"
            onClick={handleRoute}
          >
            Back To Profile
          </Button>

          {/* View Seller's Ads Button */}
          <button
            className="w-full sm:flex-1 sm:max-w-[48%] rounded-sm bg-[#54abdb] text-white hover:bg-[#4a90d2] 
      px-4 py-3 text-sm sm:text-base text-center flex items-center justify-center"
            onClick={handleRoute}
          >
            View Seller&apos;s Ads
            <GoArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewSuccess;
