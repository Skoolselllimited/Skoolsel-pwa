"use client";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";
import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa6";

const ForgotPassword = () => {
  const router = useRouter();

  const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your password reset logic here
    router.push("/verify-email"); // Navigate to the reset-password page
  };
  return (
    <div className="md:min-h-[calc(100vh-100px)] min-h-screen flex items-center justify-center px-3 md:px-0 bg-[#F7F8F9]">
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
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              className="w-full px-3 py-3  rounded-lg text-[13px] md:text-sm focus:outline-none  bg-[#f6f7f8] placeholder-gray-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#54abdb] hover:bg-[#429aca] flex items-center justify-center gap-2 text-white py-2.5 rounded-lg md:text-sm text-[13px] font-medium transition"
          >
            Reset Password <GoArrowRight />
          </button>
        </form>
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
