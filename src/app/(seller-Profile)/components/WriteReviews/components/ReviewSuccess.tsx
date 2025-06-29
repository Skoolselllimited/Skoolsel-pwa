"use client";
import { SuccessfulPublish } from "../../../../../../public/svgs";
import { Button } from "@/components/ui/button";
import { CardPanel } from "@/components/cardPanel/cardPanel";
import { ArrowRight } from "lucide-react";
import { GoArrowRight } from "react-icons/go";
import { useRouter } from "next/navigation";
import React from "react";
import { CustomButton } from "@/components/ui/button/customButton";

const ReviewSuccess = () => {
  const router = useRouter();
  const username = "favour";

  const handleRoute = () => {
    router.push(`/profile/${username}?tab=sellers-ads`);
  };
  return (
    <CardPanel
      primaryText=""
      primaryTextClass=""
      containerClass="p-2 bg-white font-primary"
      state={{ showSidebarScrollbar: false }}
      dispatch={(action) => console.log(action)} // Mock dispatch function
    >
      <div className="flex flex-col items-center justify-center">
        <div className="mt-12">
          <SuccessfulPublish />
        </div>
        <p className="text-body-900 text-4xl text-center mt-5">
          Your review is published successfully
        </p>
        <p className="text-body-500 mt-5  text-sm">
          Proin placerat risus non justo faucibus commodo. Nunc non neque sit
          amet magna aliquam condimentum.
        </p>
        <div className="mt-5 mb-10">
          <Button
            className="flex items-center bg-[#54abdb] py-5 text-white"
            onClick={handleRoute}
          >
            View Seller&apos;s Ads
            <span>
              <GoArrowRight />
            </span>
          </Button>
        </div>
      </div>
    </CardPanel>
  );
};

export default ReviewSuccess;
