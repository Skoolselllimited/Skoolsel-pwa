"use client";
import { useState } from "react";
import Image from "next/image";
import { PiEyeClosedBold, PiEye } from "react-icons/pi";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaChevronLeft } from "react-icons/fa6";
import { GoArrowRight } from "react-icons/go";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    if (email !== "test@example.com" || password !== "password123") {
      setErrorMessage("Email or password is invalid");
    } else {
      setErrorMessage("");
      // Handle successful login logic
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F7F8F9] font-inter">
      {/* Left Section - Login Form */}
      <div className="w-full md:w-2/3 lg:w-1/2 hidden md:flex items-center justify-center px-4 py-8 md:py-16">
        <div className="w-full max-w-md bg-white rounded-xl border p-8">
          <h1 className="text-2xl font-bold text-center text-[#003553] mb-2">
            Welcome Back! 👋
          </h1>
          <p className="text-sm text-center text-gray-600 mb-6">
            Log in to find great deals, post your ads, and stay in full control
            of your marketplace experience.
          </p>
          <form className="space-y-4">
            <div>
              <input
                type="text"
                id="email"
                className="w-full px-3 py-2 rounded-lg text-[12px] bg-[#f6f7f8] placeholder-gray-400"
                placeholder="Username or email address"
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full px-3 py-2  rounded-lg text-[12px] bg-[#f6f7f8] placeholder-gray-400"
                placeholder="Enter your password"
              />
              <span
                className="absolute right-3 top-1/2  transform -translate-y-1/2 text-gray-500 cursor-pointer text-sm"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <PiEye /> : <PiEyeClosedBold />}
              </span>
            </div>
            <div className="flex justify-end pt-1">
              {" "}
              {/* Added top padding for spacing */}
              <Link
                href="/forgot-password"
                className="text-xs text-[#54abdb] hover:underline hover:text-[#429aca]"
              >
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-[#54abdb] hover:bg-[#429aca] flex items-center justify-center gap-2 text-white py-2 rounded text-sm font-medium transition"
            >
              Log In <GoArrowRight className="text-base" />
            </button>
          </form>

          <div className="flex items-center justify-between my-4">
            <hr className="flex-grow border-t border-gray-200" />{" "}
            <span className="mx-2 text-xs text-gray-500 whitespace-nowrap">
              or
            </span>
            <hr className="flex-grow border-t border-gray-200" />
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition text-sm text-gray-700 font-medium"
          >
            <FcGoogle className="text-lg" />
            Sign in with Google
          </button>

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

      <div className="hidden md:flex flex-col justify-center items-center w-full md:w-1/3 lg:w-1/2 pl-8 p-2">
        <div className="w-full max-w-xl ">
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
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 rounded-lg text-[11px] bg-[#f6f7f8]  placeholder-gray-400"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-3  rounded-lg text-[11px] bg-[#f6f7f8] placeholder-gray-400"
              />
              <span
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer text-sm"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <PiEye /> : <PiEyeClosedBold />}
              </span>
            </div>

            <label className="flex justify-center items-center text-sm text-gray-700">
              <span className="text-[12px] text-justify">
                <Link
                  href="/forgot-password"
                  className="text-[#54abdb] hover:text-[#429aca]"
                >
                  Forgot password?
                </Link>{" "}
              </span>
            </label>

            <button
              type="submit"
              className="w-full bg-[#54abdb] hover:bg-[#429aca] flex items-center justify-center gap-2 text-white py-2 rounded text-[13px] font-medium transition"
            >
              Login <GoArrowRight className="text-base" />
            </button>
          </form>

          <div className="flex items-center justify-between my-3">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-3 text-[12px] text-gray-500 whitespace-nowrap">
              or
            </span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <button className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition text-[12px] text-gray-700 font-medium">
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
