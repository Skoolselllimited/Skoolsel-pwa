"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { z } from "zod";
import Stars from "@/components/Stars/Stars";
import ReviewSuccess from "./ReviewSuccessMobile";

// Icons
const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
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

const GoArrowRight = (props: React.SVGProps<SVGSVGElement>) => (
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

// Zod validation schema
const reviewSchema = z.object({
  rating: z.number().min(1, "Please select a rating"),
  reviewText: z
    .string()
    .trim()
    .min(10, "Review must be at least 10 characters"),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

const validateWithZod =
  (schema: typeof reviewSchema) => (values: ReviewFormValues) => {
    const result = schema.safeParse(values);
    if (result.success) return {};
    const errors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const path = issue.path[0];
      if (typeof path === "string") {
        errors[path] = issue.message;
      }
    }
    return errors;
  };

function WriteReviewFormMobile({ onClose }: { onClose: () => void }) {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleRoute = () => {
    setIsSuccess(false);
    onClose();
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
              onClick={onClose}
            >
              <XIcon className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-semibold ml-4 text-gray-800 flex-grow text-center pr-6">
              Write A Review
            </h2>
            <div className="w-6 h-6" />
          </div>

          {/* Formik Form */}
          <Formik
            initialValues={{ rating: 0, reviewText: "" }}
            validate={validateWithZod(reviewSchema)}
            onSubmit={async (values, { setSubmitting }) => {
              console.log("Submitting review:", values);
              await new Promise((resolve) => setTimeout(resolve, 1500));
              setSubmitting(false);
              setIsSuccess(true);
            }}
          >
            {({ values, setFieldValue, isSubmitting }) => (
              <Form className="flex flex-col flex-grow">
                {/* Star Rating */}
                <div className="flex justify-center space-x-2 mb-4">
                  <Stars
                    rating={values.rating}
                    size="xl"
                    onChange={(val) => setFieldValue("rating", val)}
                  />
                </div>
                <ErrorMessage
                  name="rating"
                  component="p"
                  className="text-red-500 text-sm text-center mb-3"
                />

                {/* Textarea */}
                <Field
                  as="textarea"
                  name="reviewText"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none text-sm placeholder:text-gray-400"
                  rows={6}
                  placeholder="Share your thoughts about this seller..."
                />
                <ErrorMessage
                  name="reviewText"
                  component="p"
                  className="text-red-500 text-sm mt-2"
                />

                {/* Spacer */}
                <div className="h-[10vh]" />

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={
                      isSubmitting ||
                      values.rating < 1 ||
                      values.reviewText.trim().length < 10
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
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}

export default WriteReviewFormMobile;
