import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGooglePlay,
  FaEnvelope,
  FaApple,
} from "react-icons/fa";
import Image from "next/image";

export default function FooterSection() {
  return (
    <footer className="bg-[#191f33] text-gray-300 pt-16">
      {/* ======== Mobile Layout ======== */}
      <div className="lg:hidden px-4">
        {/* Newsletter */}
        <div className="mb-6">
          {" "}
          <h2 className="text-white text-lg font-semibold mb-2">
            Subscribe to our newsletter
          </h2>
          <p className="text-sm text-gray-400 mb-3">
            Vestibulum consectetur placerat tellus. Sed faucibus fermentum
            purus, at facilisis.
          </p>
        </div>
        <div className="bg-[#2e3447] rounded-lg p-4 mb-6">
          <div className="flex items-center bg-[#191f33] rounded-lg overflow-hidden mb-2">
            <div className="px-3 text-[#54abdb]">
              <FaEnvelope />
            </div>
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 py-3 pr-2 text-sm text-black focus:outline-none"
            />
          </div>
          <button className="w-full bg-[#54abdb] hover:bg-blue-600 px-6 py-3 text-white font-medium rounded-lg">
            Subscribe
          </button>
        </div>

        {/* Logo & Socials */}
        <div className="flex flex-col items-center space-y-4 mt-3 mb-8">
          <Image
            src="/logowhite.svg"
            alt="Skoolsel Logo"
            width={120}
            height={40}
            className="object-contain"
          />
          <div className="flex space-x-4 text-white text-lg">
            <FaFacebookF className="hover:text-blue-400" />
            <FaTwitter className="hover:text-blue-400" />
            <FaInstagram className="hover:text-blue-400" />
            <FaLinkedinIn className="hover:text-blue-400" />
          </div>
        </div>

        {/* App Promotion */}
        <div className="bg-[#2e3447] p-4 rounded-xl text-white mb-6">
          <p className="font-semibold text-base mb-2">GET THE SKOOLSEL APP!</p>
          <p className="text-sm text-gray-400 mb-4">
            Buy, sell, and connect easily—right from your phone. Download now!
          </p>
          <div className="flex flex-col space-y-3">
            <button className="bg-[#54abdb] hover:bg-blue-600 flex items-center justify-center gap-2 px-4 py-3 rounded-md text-sm font-medium">
              <FaApple /> APP STORE
            </button>
            <button className="bg-[#54abdb] hover:bg-blue-600 flex items-center justify-center gap-2 px-4 py-3 rounded-md text-sm font-medium">
              <FaGooglePlay /> PLAY STORE
            </button>
          </div>
        </div>

        {/* Links */}
        <div className="flex justify-between text-sm mb-6">
          <div>
            <h4 className="text-white font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-blue-400 hover:underline">About</li>
              <li className="text-blue-400 hover:underline">Boost Ads</li>
              <li className="hover:text-blue-400 hover:underline">
                Post a Ads
              </li>
              <li className="hover:text-blue-400 hover:underline">Blog</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Supports</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-blue-400 hover:underline">Contact</li>
              <li className="hover:text-blue-400 hover:underline">FAQs</li>
              <li className="hover:text-blue-400 hover:underline">
                Pricing Plans
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-xs text-gray-500 text-center border-t border-gray-700 pt-4 pb-8">
          <p className="mb-2">Skoolsel © 2021. All rights reserved</p>
          <div className="flex justify-center space-x-4">
            <span className="hover:underline cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:underline cursor-pointer">
              Terms & Condition
            </span>
          </div>
        </div>
      </div>

      {/* ======== Large Screen Layout (Existing) ======== */}
      <div className="hidden lg:block">
        <div className="border-b border-gray-700 pb-12 mb-12">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6 px-4">
            {/* Text */}
            <div className="flex-1">
              <h2 className="text-white text-2xl font-semibold mb-2">
                Subscribe to our newsletter
              </h2>
              <p className="text-sm text-gray-400 max-w-md">
                Vestibulum consectetur placerat tellus. Sed faucibus fermentum
                purus, at facilisis.
              </p>
            </div>

            {/* Input */}
            <div className="flex items-center bg-[#2e3447] rounded-lg overflow-hidden max-w-md w-full">
              <div className="px-3 text-[#54abdb]">
                <FaEnvelope />
              </div>
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 p-3 text-black focus:outline-none"
              />
              <button className="bg-[#54abdb] hover:bg-blue-600 px-6 py-3 text-white font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Footer Content */}
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between gap-12">
          {/* Brand & Socials */}
          <div className="flex flex-col items-start">
            <div className="mb-6">
              <Image
                src="/logowhite.svg" // Update path as needed
                alt="Skoolsel Logo"
                width={140}
                height={40}
                className="object-contain"
              />
            </div>
            <div className="flex space-x-4 text-white text-lg">
              <FaFacebookF className="hover:text-blue-400" />
              <FaTwitter className="hover:text-blue-400" />
              <FaInstagram className="hover:text-blue-400" />
              <FaLinkedinIn className="hover:text-blue-400" />
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm">
                Supports
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:underline cursor-pointer hover:text-blue-400">
                  Contact
                </li>
                <li className="hover:underline cursor-pointer hover:text-blue-400">
                  FAQs
                </li>
                <li className="hover:underline cursor-pointer hover:text-blue-400">
                  Pricing Plans
                </li>
                <li className="hover:underline cursor-pointer hover:text-blue-400">
                  Safety Guidelines
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:underline cursor-pointer hover:text-blue-400">
                  About
                </li>
                <li className="text-blue-400 hover:underline cursor-pointer hover:text-blue-400">
                  Boost Ads
                </li>
                <li className="hover:underline cursor-pointer hover:text-blue-400">
                  Post a Ads
                </li>
                <li className="hover:underline cursor-pointer hover:text-blue-400">
                  Blog
                </li>
              </ul>
            </div>
          </div>

          {/* App Section */}
          <div className="bg-[#2e3447] p-6 rounded-xl text-white max-w-sm">
            <p className="font-semibold text-base mb-2">
              GET THE SKOOLSEL APP!
            </p>
            <p className="text-sm text-gray-400 mb-4">
              Buy, sell, and connect easily—right from your phone. Download now!
            </p>
            <div className="flex space-x-3">
              <button className="bg-[#54abdb] hover:bg-blue-600 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium">
                <FaApple /> <span> APP STORE</span>
              </button>
              <button className="bg-[#54abdb] hover:bg-blue-600 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium">
                <FaGooglePlay /> PLAY STORE<span></span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-[#2e3447] text-xs text-gray-500 mt-16 border-t border-gray-700 pt-6 pb-14">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-4">
            <p className="mb-2 md:mb-0">Skoolsel © 2021. All rights reserved</p>
            <div className="flex space-x-4">
              <span className="hover:underline cursor-pointer">
                Privacy Policy
              </span>
              <span className="hover:underline cursor-pointer">
                Terms & Condition
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
