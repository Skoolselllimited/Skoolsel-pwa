"use client";

import { useSession, signOut } from "next-auth/react";
import { apiBaseUrl } from "@/config";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Stars from "@/components/Stars/Stars";
import { GoArrowRight } from "react-icons/go";

interface WriteReviewFormProps {
  username: string;
  userId: number;
  onReviewSubmit: () => void;
}

// 1. Define Zod schema
const reviewSchema = z.object({
  rating: z
    .number({ invalid_type_error: "Please select a rating" })
    .min(1, "Please select a rating"),
  reviewText: z
    .string()
    .trim()
    .min(10, "Review must be at least 10 characters"),
});

// 2. Type-safe Zod adapter for Formik
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

const WriteReviewForm = ({
  username,
  userId,
  onReviewSubmit,
}: WriteReviewFormProps) => {
  return (
    <div className="w-full bg-white pb-4 rounded-lg">
      <Formik
        initialValues={{ rating: 0, reviewText: "" }}
        validate={validateWithZod(reviewSchema)}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            console.log("Submitting review...", values);

            // Simulate API call here or place your actual review submission logic
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // ✅ Trigger parent handler to show <ReviewSuccess />
            onReviewSubmit();
          } catch (error) {
            console.error("Error submitting review", { error });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            {/* Rating Section */}
            <div className="flex flex-col">
              <Stars
                rating={values.rating}
                onChange={(value) => setFieldValue("rating", value)}
              />
              <ErrorMessage
                name="rating"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Review Text Area */}
            <div className="mt-3">
              <Field
                as="textarea"
                name="reviewText"
                className="w-full h-24 bg-[#f7f8f9] border border-gray-200 text-gray-700 text-sm placeholder:text-gray-400 p-4 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#54abdb]"
                placeholder="Share your thoughts about this seller"
              />
              <ErrorMessage
                name="reviewText"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Submit Button */}
            <div className="max-w-lg md:max-w-52 mt-4">
              <Button
                type="submit"
                className="bg-[#54abdb] hover:bg-[#3da2d3] text-white text-sm font-semibold px-6 py-5 rounded-sm inline-flex items-center gap-2"
                disabled={
                  isSubmitting ||
                  values.rating < 1 ||
                  values.reviewText.trim().length < 10
                }
              >
                Publish Review
                <GoArrowRight className="w-60 h-6 font-semibold" />
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default WriteReviewForm;
