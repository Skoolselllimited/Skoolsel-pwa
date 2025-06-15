"use client";

import * as React from "react";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";
import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa6";
import { z } from "zod";
import { FormInput } from "@/components/ui/form";
import { useState } from "react";
import { CustomButton } from "@/components/ui/button/customButton";

// Define the Zod schema for forgot password
const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

type ForgotPasswordFormErrors = Partial<
  Record<keyof ForgotPasswordFormData, string>
> & {
  general?: string;
};

const ForgotPassword = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: "",
  });

  const [errors, setErrors] = useState<ForgotPasswordFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    field: keyof ForgotPasswordFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    try {
      const fieldSchema = forgotPasswordSchema.shape[field];
      fieldSchema.parse(value);
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({
          ...prev,
          [field]: error.errors[0]?.message,
        }));
      }
    }

    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: undefined }));
    }
  };

  const validateForm = (): boolean => {
    try {
      forgotPasswordSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: ForgotPasswordFormErrors = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ForgotPasswordFormData] =
              err.message;
          }
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleResetPassword = async () => {
    if (!validateForm()) {
    }

    setIsSubmitting(true);

    setErrors((prev) => ({ ...prev, general: undefined }));

    console.log("Form submitted successfully:", formData);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      router.push("/verify-email");
    } catch (apiError) {
      console.error("Password reset API call failed:", apiError);
      setErrors({ general: "Failed to reset password. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="md:min-h-[calc(100vh-75px)] min-h-screen flex items-center justify-center px-3 md:px-0 bg-[#F7F8F9]">
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 md:hidden border text-gray-700 text-sm p-2 rounded-full hover:bg-gray-100 transition"
      >
        <FaChevronLeft />
      </button>
      <div className="bg-white w-full max-w-lg rounded-lg border py-6 px-4 md:p-8">
        <h1 className="md:text-2xl text-xl font-bold text-center text-gray-800 mb-2">
          Forgot Password
        </h1>
        <p className="md:text-sm text-[13px] text-center text-gray-600 mb-6">
          Enter the email you used to register
        </p>
        {/* REPLACED <form> WITH <div> TO REPLICATE FORMDEMO'S APPROACH */}
        <div className="space-y-4">
          <div>
            <FormInput
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(value) => handleInputChange("email", value)}
              error={errors.email}
              hasError={!!errors.email}
            />
          </div>

          {errors.general && (
            <div className="text-red-500 text-sm text-center">
              {errors.general}
            </div>
          )}

          <CustomButton
            onClick={handleResetPassword} // Direct call
            disabled={isSubmitting}
            type="button"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending...
              </div>
            ) : (
              <>
                Reset Password <GoArrowRight className="text-base" />
              </>
            )}
          </CustomButton>
        </div>{" "}
        <div className="mt-4 text-center">
          <Link
            href="/login"
            className="md:text-md text-[13px] text-[#54abdb] hover:text-[#429aca] hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
