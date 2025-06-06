"use client";
import { useState } from "react";
import { FaPhoneAlt, FaClipboardList, FaShieldAlt } from "react-icons/fa";
import { PiEyeClosedBold, PiEye } from "react-icons/pi";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaChevronCircleDown } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { GoArrowRight } from "react-icons/go";
import { MdPhoneCallback } from "react-icons/md";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import Image from "next/image";

const features = [
  {
    icon: <FaClipboardList className="text-8xl text-[#54abdb]" />,
    title: "Manage Your Ads",
    description:
      "Easily edit, update, or remove your listings anytime. Keep your ads fresh and make sure your items get the attention they deserve!",
  },
  {
    icon: <MdPhoneCallback className="text-7xl text-[#54abdb]" />,
    title: "Connect with Buyers & Sellers",
    description:
      "Reach out with a quick call to chat, negotiate, and seal the deal!",
  },
  {
    icon: <IoShieldCheckmarkOutline className="text-8xl text-[#54abdb]" />,
    title: "Safe & Convenient",
    description:
      "Trade confidently with fellow students knowing you're dealing with people in your school.",
  },
];

const countries = [{ code: "+234", flag: "/flag.png", label: "Nigeria" }];

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selected, setSelected] = useState(countries[0]);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  return (
    <div className="h-screen flex flex-col md:flex-row bg-[#f9fbfc]">
      {/* Left Feature Panel */}
      <div className="hidden md:flex flex-col justify-center items-end w-1/2 p-12 pr-8 space-y-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-start text-justify gap-5 max-w-md"
          >
            {feature.icon}
            <div>
              <h3 className="text-xl font-bold text-[#003553] mb-1">
                {feature.title}
              </h3>
              <p className="text-base text-gray-700 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/*------------------------------------------ web version----------------------------------------------------*/}
      <div className="w-full md:w-1/2 hidden md:flex  items-center justify-center pr-28 px-6 py-12">
        <div className="w-full max-w-md border bg-white rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center text-[#003553] mb-1">
            Let’s Get You Started 🚀
          </h2>
          <p className="text-sm text-center  mb-6">
            Join Skoolsel to buy, sell, and explore what’s trending around your
            campus. It's fast easy and free!
          </p>

          <form className="space-y-4">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Full Name"
                className="w-1/2 px-4 py-2 border bg-[#f6f7f8] border-gray-300 rounded text-sm"
              />
              <input
                type="text"
                placeholder="Username"
                className="w-1/2 px-4 py-2 border bg-[#f6f7f8] border-gray-300 rounded text-sm"
              />
            </div>

            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-2 bg-[#f6f7f8] border border-gray-300 rounded text-sm"
            />

            <div className="flex gap-2">
              {/* Dropdown Selector */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-2 px-4 py-2 border bg-[#f6f7f8] border-gray-300 rounded text-sm"
                >
                  <Image src={selected.flag} alt="" width={20} height={15} />
                  {selected.code}
                  <FaChevronCircleDown className="text-gray-500" />
                </button>

                {open && (
                  <div className="absolute left-0 bg-white border rounded shadow-md mt-1 z-10 w-full">
                    {countries.map((country) => (
                      <div
                        key={country.code}
                        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSelected(country);
                          setOpen(false);
                        }}
                      >
                        <Image
                          src={country.flag}
                          alt=""
                          width={20}
                          height={15}
                        />
                        {country.code}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-2 border border-gray-300 rounded text-sm bg-[#f6f7f8]"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded text-sm bg-[#f6f7f8]"
              />
              <span
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer text-sm" // Adjusted icon size
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <PiEye /> : <PiEyeClosedBold />}
              </span>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border border-gray-300 rounded text-sm bg-[#f6f7f8]"
              />
              <span
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer text-xs "
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <PiEye /> : <PiEyeClosedBold />}
              </span>
            </div>

            <label className="flex items-start text-sm text-gray-700">
              <input
                type="checkbox"
                className=" mr-2 rounded text-[#54abdb] focus:ring-[#54abdb]"
              />
              {/* NEW: Wrap the entire text content in a span with whitespace-nowrap */}
              <span className="text-[11.5px]">
                I’ve read and agree with your{" "}
                <Link href="#" className="text-[#54abdb] hover:text-[#429aca]">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-[#54abdb] hover:text-[#429aca]">
                  Terms & Conditions
                </Link>
              </span>
            </label>

            <button
              type="submit"
              className="w-full bg-[#54abdb] hover:bg-[#429aca] flex items-center justify-center gap-2 text-white py-2 rounded text-sm font-medium transition"
            >
              Create Account <GoArrowRight className="text-base" />
            </button>
          </form>

          <div className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <a
              href="#"
              className="text-[#54abdb] font-semibold hover:underline"
            >
              Sign In
            </a>
          </div>

          <div className="flex items-center justify-between my-5">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-3 text-sm text-gray-500">
              or sign up with email
            </span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <div className="w-full flex items-center justify-center gap-2 bg-[#f7f8f9] py-2 rounded hover:bg-gray-50 transition text-sm">
            <FcGoogle />
            Sign up with Google
          </div>
        </div>
      </div>
      {/*------------------------------------------ mobile version----------------------------------------------------*/}
      <div className="w-full md:w-1/2 flex md:hidden items-center justify-center px-6 pb-22 pt-20 md:py-24 relative">
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 md:hidden border text-gray-700 text-sm p-2 rounded-full hover:bg-gray-100 transition"
        >
          <FaChevronLeft />
        </button>
        <div className="w-full max-w-md border-1 bg-white rounded-xl p-4 ">
          <h2 className="text-[19px] font-bold text-center mb-2">
            Let’s Get You Started 🚀
          </h2>
          <p className="text-[10px] text-center text-gray-600 mb-8">
            Join Skoolsel to buy, sell, and explore what’s trending around your
            campus. It's fast, easy, and free!
          </p>

          <form className="space-y-5">
            <div className="flex flex-col gap-4">
              {" "}
              {/* Ensured stacking on all mobile views */}
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 rounded-lg text-[11px] bg-[#f6f7f8] placeholder-gray-400"
              />
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-3 rounded-lg text-[11px] bg-[#f6f7f8] placeholder-gray-400"
              />
            </div>

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

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full px-4 py-3 rounded-lg text-[11px] bg-[#f6f7f8] placeholder-gray-400"
              />
              <span
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer text-sm"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <PiEye /> : <PiEyeClosedBold />}
              </span>
            </div>

            <label className="flex items-start text-sm text-gray-700">
              <input
                type="checkbox"
                className="mt-1 mr-2 rounded text-[#54abdb] focus:ring-[#54abdb]"
              />
              <span className="text-[10px] text-justify">
                I’ve read and agree with your{" "}
                <Link href="#" className="text-[#54abdb] hover:text-[#429aca]">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-[#54abdb] hover:text-[#429aca]">
                  Terms & Conditions
                </Link>
              </span>
            </label>

            <button
              type="submit"
              className="w-full bg-[#54abdb] hover:bg-[#429aca] flex items-center justify-center gap-2 text-white py-2 rounded text-[13px] font-medium transition"
            >
              Create Account <GoArrowRight className="text-base" />
            </button>
          </form>

          <div className="text-[12px] text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#54abdb] font-bold hover:underline hover:text-[#429aca]"
            >
              Sign In
            </Link>
          </div>

          <div className="flex items-center justify-between my-6">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-3 text-[12px] text-gray-500 whitespace-nowrap">
              or sign up with email
            </span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <button className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition text-[12px] text-gray-700 font-medium">
            <FcGoogle className="text-xl" />
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
}
