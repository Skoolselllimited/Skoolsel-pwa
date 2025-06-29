"use client";

import React, { useState } from "react";
import Stars from "@/components/Stars/Stars";
import ReviewSuccess from "./ReviewSuccessMobile";

interface SVGProps extends React.SVGProps<SVGSVGElement> {}

const XIcon = (props: SVGProps) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const GoArrowRight = (props: SVGProps) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

function WriteReviewFormMobile({ onClose }: { onClose: () => void }) {
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Submitting review:", { rating, reviewText });
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    alert("Review published successfully!");
  };
  const handleRoute = () => {
    setIsSuccess(false); // Reset success state
    onClose(); // Call parent close logic
  };

  return (
    <div className="flex flex-col items-center justify-start bg-white h-[100vh] w-screen font-inter">
      {isSuccess ? (
        <ReviewSuccess
          handleRoute={handleRoute}
          skoolselLogoSrc="/logoForWhiteBg.svg"
        />
      ) : (
        <div className="relative bg-white rounded-lg w-full pt-12 p-4 sm:p-8 flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <button
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close"
              onClick={onClose}
            >
              <XIcon className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-semibold ml-4 text-gray-800 flex-grow text-center pr-6">
              Write A Review
            </h2>
            <div className="w-6 h-6"></div>
          </div>

          {/* Review Form */}
          <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
            {/* Star Rating */}
            <div className="flex justify-center space-x-2 mb-6">
              <Stars rating={rating} size="xl" onChange={setRating} />
            </div>

            {/* Textarea */}
            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none text-sm placeholder:text-gray-400"
              rows={6}
              placeholder="Share your thought about this seller..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            <div className="h-[35vh]" />
            {/* Button spacing and submit */}
            <div className="">
              <button
                type="submit"
                onClick={() => setIsSuccess(true)}
                disabled={
                  isSubmitting || rating === 0 || reviewText.trim() === ""
                }
                className="flex items-center justify-center w-full px-6 py-3 bg-[#54abdb] text-white font-semibold rounded-md hover:bg-[#2980b9] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Publishing...
                  </div>
                ) : (
                  <>
                    Publish Review <GoArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default WriteReviewFormMobile;
