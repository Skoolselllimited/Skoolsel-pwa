"use client";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";
import { FaCheckCircle } from "react-icons/fa";
import { SuccessfulPublish } from "../../../../public/svgs";
export default function PasswordResetSuccessful() {
  return (
    <div className="md:min-h-[calc(100vh-100px)] min-h-screen flex items-center justify-center bg-[#F7F8F9] font-inter p-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 md:p-9 border border-gray-100 text-center">
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <SuccessfulPublish />
        </div>

        <div className="w-full">
          <h1 className="text-2xl font-bold text-[#003553] mb-2">
            Password Reset Successful
          </h1>

          <p className="text-sm text-gray-600 mb-8">
            Your password has been updated. You can now log in with your new
            credentials.
          </p>

          <Link href="/login">
            <button
              type="button"
              className="w-full bg-[#54abdb] hover:bg-[#429aca] flex items-center justify-center gap-2 text-white py-3 rounded-lg text-[13px] font-semibold transition transform hover:scale-105 duration-200"
            >
              Continue To Login <GoArrowRight className="text-base" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
