"use client";

import { useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { GoArrowRight } from "react-icons/go";
import { FaChevronLeft } from "react-icons/fa6";
import { Card, CardContent } from "@/components/ui/card";
import { FormInput, PasswordInput } from "@/components/ui/form";
import { CustomButton } from "@/components/ui/button/customButton";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;
type LoginFormErrors = Partial<Record<keyof LoginFormData, string>>;

export default function Login() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    try {
      loginSchema.shape[field].parse(value);
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({
          ...prev,
          [field]: error.errors[0]?.message,
        }));
      }
    }
  };

  const validateForm = (): boolean => {
    try {
      loginSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: LoginFormErrors = {};
        for (const issue of error.errors) {
          newErrors[issue.path[0] as keyof LoginFormData] = issue.message;
        }
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      await new Promise((res) => setTimeout(res, 1000));

      if (
        formData.email !== "test@example.com" ||
        formData.password !== "password123"
      ) {
        setErrors({ password: "Email or password is invalid" });
      } else {
        alert("Login successful");
        // Redirect or proceed with login flow
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="md:min-h-[calc(100vh-100px)]  flex flex-col md:flex-row bg-[#F7F8F9] font-inter">
      {/* Left Section - Login Form */}
      <div className="w-full lg:w-1/2 hidden md:flex items-center justify-center px-4 py-8 md:py-16">
        <div className="w-full max-w-xl bg-white rounded-xl border p-8">
          <h1 className="text-2xl font-bold text-center text-[#003553] mb-2">
            Welcome Back! 👋
          </h1>
          <p className="text-sm text-center text-gray-600 mb-6">
            Log in to find great deals, post your ads, and stay in full control
            of your marketplace experience.
          </p>
          <form className="space-y-4">
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
            <div className="relative">
              <PasswordInput
                label="Password"
                value={formData.password}
                onChange={(value) => handleInputChange("password", value)}
                error={errors.password}
                hasError={!!errors.password}
              />
            </div>
            <div className="flex justify-end pt-1">
              <Link
                href="/forgot-password"
                className="text-sm font-bold text-[#54abdb] hover:underline hover:text-[#429aca]"
              >
                Forgot password?
              </Link>
            </div>
            <CustomButton onClick={handleLogin} disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Logging in...
                </div>
              ) : (
                <>
                  Log In <GoArrowRight className="text-base" />
                </>
              )}
            </CustomButton>
          </form>

          <div className="flex items-center justify-between my-4">
            <hr className="flex-grow border-t border-gray-200" />{" "}
            <span className="mx-2 text-xs text-gray-500 whitespace-nowrap">
              or
            </span>
            <hr className="flex-grow border-t border-gray-200" />
          </div>

          <div className="w-full flex items-center justify-center gap-2 bg-[#f7f8f9] py-3 rounded hover:bg-gray-50 transition text-sm">
            <FcGoogle />
            Sign up with Google
          </div>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="text-[#54abdb] font-bold hover:underline hover:text-[#429aca]"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex flex-col justify-center items-center w-full md:w-1/3 lg:w-1/2 pl-8 p-2">
        <div className="w-full max-w-xl">
          <Image
            src="/login.png"
            alt="User grid collage"
            width={500}
            height={500}
            className="w-full h-auto object-contain rounded-xl"
          />
        </div>
      </div>
      {/*------------------------------------------ mobile version----------------------------------------------------*/}
      <div className="w-full md:w-1/2 flex md:hidden items-center justify-center px-6 pb-22 pt-20 md:py-24 relative">
        <Link
          href="/"
          className="absolute top-4 left-4 md:hidden border text-gray-700 text-sm p-2 rounded-full hover:bg-gray-100 transition"
        >
          <FaChevronLeft />
        </Link>
        <div className="w-full max-w-md border-1 mt-6 bg-white rounded-xl py-4 px-2">
          <h1 className="text-xl font-bold text-center mb-2">
            Welcome Back! 👋
          </h1>
          <p className="text-[11px] text-center text-gray-600 mb-6">
            Log in to find great deals, post your ads, and stay in full control
            of your marketplace experience.
          </p>

          <form className="space-y-5">
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
            <div className="relative">
              <PasswordInput
                label="Password"
                value={formData.password}
                onChange={(value) => handleInputChange("password", value)}
                error={errors.password}
                hasError={!!errors.password}
              />
            </div>
            <div className="flex justify-end pt-1">
              <Link
                href="/forgot-password"
                className="text-xs text-[#54abdb] hover:underline hover:text-[#429aca]"
              >
                Forgot password?
              </Link>
            </div>

            <CustomButton onClick={handleLogin} disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Logging in...
                </div>
              ) : (
                <>
                  Log In <GoArrowRight className="text-base" />
                </>
              )}
            </CustomButton>
          </form>

          <div className="flex items-center justify-between my-3">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-3 text-[12px] text-gray-500 whitespace-nowrap">
              or
            </span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <button className="w-full flex items-center justify-center gap-3 py-3 rounded-lg hover:bg-gray-50 transition text-[12px] text-gray-700 font-medium">
            <FcGoogle className="text-xl" />
            Sign in with Google
          </button>

          <div className="text-[11px] text-center text-gray-600 mt-3">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="text-[#54abdb] font-bold hover:underline hover:text-[#429aca]"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
