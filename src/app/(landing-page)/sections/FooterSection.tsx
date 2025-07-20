"use client"

import { EnvelopeIcon } from "@/components/svgs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {
  FaApple,
  FaFacebookF,
  FaGooglePlay,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa"
import { RiTwitterXLine } from "react-icons/ri"

export default function FooterSection() {
  return (
    <footer className="w-full min-h-[726px] flex flex-col xl:gap-[100px] mx-auto bg-[#191F33]">
      {/* //NEWSLETTER */}
      <div className="w-full mx-auto flex flex-col xl:flex-row justify-between py-[50px] shadow-[0px_-1px_0px_0px_#2E3447_inset] px-2 md:px-4 lg:px-6 xl:px-8 3xl:px-0">
        <div className="w-full max-w-[1320px] mx-auto h-full flex flex-col xl:flex-row justify-between gap-4">
          <div className="w-full md:w-[424px] h-[108px] flex flex-col gap-[20px]">
            <h4 className="font-circular-std font-semibold text-[24px]/[40px] lg:text-[32px]/[40px] tracking-normal text-white">
              Subscribe to our newsletter
            </h4>
            <p className="font-circular-std font-[450] text-[16px]/[24px] tracking-normal text-[#636A80]">
              Vestibulum consectetur placerat tellus. Sed faucibus fermentum
              purus, at facilisis.
            </p>
          </div>
          <div className="w-full lg:max-w-[635px] h-[126px] lg:h-[68px] rounded-[7px] flex flex-col xl:flex-row items-center gap-4 lg:gap-2 bg-[#2E3447] overflow-hidden py-[9px] px-3">
            <div className="w-full flex items-center gap-2">
              <div className="shrink-0">
                <EnvelopeIcon />
              </div>
              <Input
                type="email"
                placeholder="Email address"
                className="!ring-0 !border-0 !shadow-none focus:!ring-0 focus:!border-0 focus:!shadow-none hover:!ring-0 hover:!border-0 hover:!shadow-none outline-none placeholder:text-white/50 text-white bg-transparent tracking-normal"
              />
            </div>
            <Button className="w-full lg:w-fit h-[50px] bg-secondary rounded px-5 hover:bg-secondary/80 py-3 text-white font-bold font-circular-std text-[16px]/[50px] tracking-normal text-center capitalize cursor-pointer">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
      {/* //FOOTER */}
      <div className="w-full mx-auto flex flex-col xl:flex-row justify-between py-[50px]  px-2 md:px-4 lg:px-6 xl:px-8 3xl:px-0">
        <div className="w-full max-w-[1320px] mx-auto h-full flex  flex-col  2xl:flex-row justify-between gap-8 xl:gap-12">
          <div className="w-full lg:w-[424px] h-[108px] flex flex-col justify-center items-center lg:justify-start lg:items-start gap-[32px]">
            <Link href="/" className="flex-shrink-0 w-[182px] h-[42px]">
              <Image
                src="/logowhite.svg"
                alt="Skoolsel Logo"
                width={182}
                height={42}
                priority
                className="w-auto h-auto object-contain"
              />
            </Link>
            <div className="flex space-x-4 text-[#767E94] text-lg">
              <Link
                href=""
                className="w-10 h-10 gap-[10px] flex justify-center items-center p-3"
              >
                <FaFacebookF className="w-4 h-4 hover:text-secondary" />
              </Link>
              <Link
                href=""
                className="w-10 h-10 gap-[10px] flex justify-center items-center p-3"
              >
                <RiTwitterXLine className="w-4 h-4 hover:text-secondary" />
              </Link>
              <Link
                href=""
                className="w-10 h-10 gap-[10px] bg-secondary text-white flex justify-center items-center rounded-full p-3 "
              >
                <FaInstagram className="w-4 h-4 hover:text-secondary" />
              </Link>
              <Link
                href=""
                className="w-10 h-10 gap-[10px] flex justify-center items-center p-3"
              >
                <FaLinkedinIn className="w-4 h-4 hover:text-secondary" />
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-[850px] flex flex-col xl:flex-row items-center justify-center lg:items-start lg:justify-start  gap-12 xl:gap-4 px-2">
            <div className="flex w-full lg:w-[482px] xl:hidden flex-col gap-3 rounded-[20px] bg-[#2E3447] p-[31px]">
              <div className="w-full flex flex-col gap-2">
                <h4 className="font-circular-std font-extrabold text-[18px]/[25.99px] uppercase tracking-[0.9px] text-white">
                  Get the Skoolsel App!
                </h4>
                <p className="font-circular-std font-normal text-[18px]/[24px] tracking-normal text-white">
                  Buy, sell, and connect easily—right from your phone. Download
                  now!
                </p>
              </div>
              <div className="w-full flex flex-col xl:flex-row gap-4 mt-5">
                <Link
                  href="#"
                  className="h-[70px] py-[27px] px-[16px] bg-secondary hover:bg-secondary/80 cursor-pointer flex gap-2 items-center justify-center rounded-[10px] font-extrabold font-circular-std text-[14px]/[16px] tracking-[1.6px] text-white"
                >
                  <FaApple className="w-8 h-8 shrink-0" />{" "}
                  <span> APP STORE</span>
                </Link>
                <Link
                  href="#"
                  className="h-[70px] py-[27px] px-[16px] bg-secondary hover:bg-secondary/80 cursor-pointer flex gap-2 items-center justify-center rounded-[10px] font-extrabold font-circular-std text-[14px]/[16px] tracking-[1.6px] text-white"
                >
                  <FaGooglePlay className="w-8 h-8 shrink-0" /> PLAY STORE
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-[400px] flex gap-2 justify-between">
              <div className="w-[175px] flex flex-col gap-[32px]">
                <h4 className="font-circular-std font-medium text-[20px]/[32px] tracking-normal text-white">
                  Supports
                </h4>
                <div className="flex flex-col gap-2">
                  <Link
                    href="/contact"
                    className="font-circular-std font-[450] text-[16px]/[24px] tracking-normal text-[#767E94] hover:underline underline-offset-4 decoration-secondary"
                  >
                    Contact
                  </Link>
                  <Link
                    href="/faqs"
                    className="font-circular-std font-[450] text-[16px]/[24px] tracking-normal text-[#767E94] hover:underline underline-offset-4 decoration-secondary"
                  >
                    FAQs
                  </Link>
                  <Link
                    href="/pricing"
                    className="font-circular-std font-[450] text-[16px]/[24px] tracking-normal text-[#767E94] hover:underline underline-offset-4 decoration-secondary"
                  >
                    Pricing
                  </Link>
                  <Link
                    href="/safety-guide"
                    className="font-circular-std font-[450] text-[16px]/[24px] tracking-normal text-[#767E94] hover:underline underline-offset-4 decoration-secondary"
                  >
                    Safety Guide
                  </Link>
                </div>
              </div>{" "}
              <div className="w-[175px] flex flex-col gap-[32px]">
                <h4 className="font-circular-std font-medium text-[20px]/[32px] tracking-normal text-white">
                  Quick Links
                </h4>
                <div className="flex flex-col gap-2">
                  <Link
                    href="/about"
                    className="font-circular-std font-[450] text-[16px]/[24px] tracking-normal text-[#767E94] hover:underline underline-offset-4 decoration-secondary"
                  >
                    About
                  </Link>
                  <Link
                    href="/boost-ads"
                    className="font-circular-std font-[450] text-[16px]/[24px] tracking-normal text-[#767E94] hover:underline underline-offset-4 decoration-secondary"
                  >
                    Boost Ads
                  </Link>
                  <Link
                    href="/user/post-ads"
                    className="font-circular-std font-[450] text-[16px]/[24px] tracking-normal text-[#767E94] hover:underline underline-offset-4 decoration-secondary"
                  >
                    Post Ads
                  </Link>
                  <Link
                    href="/blog"
                    className="font-circular-std font-[450] text-[16px]/[24px] tracking-normal text-[#767E94] hover:underline underline-offset-4 decoration-secondary"
                  >
                    Blog
                  </Link>
                </div>
              </div>
            </div>
            <div className="hidden w-full lg:w-[482px] xl:flex flex-col gap-3 rounded-[20px] bg-[#2E3447] p-[31px]">
              <div className="w-full flex flex-col gap-2">
                <h4 className="font-circular-std font-extrabold text-[18px]/[25.99px] uppercase tracking-[0.9px] text-white">
                  Get the Skoolsel App!
                </h4>
                <p className="font-circular-std font-normal text-[18px]/[24px] tracking-normal text-white">
                  Buy, sell, and connect easily—right from your phone. Download
                  now!
                </p>
              </div>
              <div className="w-full flex flex-col xl:flex-row gap-4 mt-5">
                <Link
                  href="#"
                  className="h-[70px] py-[27px] px-[16px] bg-secondary hover:bg-secondary/80 cursor-pointer flex gap-2 items-center justify-center rounded-[10px] font-extrabold font-circular-std text-[14px]/[16px] tracking-[1.6px] text-white"
                >
                  <FaApple className="w-8 h-8 shrink-0" />{" "}
                  <span> APP STORE</span>
                </Link>
                <Link
                  href="#"
                  className="h-[70px] py-[27px] px-[16px] bg-secondary hover:bg-secondary/80 cursor-pointer flex gap-2 items-center justify-center rounded-[10px] font-extrabold font-circular-std text-[14px]/[16px] tracking-[1.6px] text-white"
                >
                  <FaGooglePlay className="w-8 h-8 shrink-0" /> PLAY STORE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-between mx-auto h-[157px] lg:h-[72px] px-2 md:px-4 lg:px-6 xl:px-8 3xl:px-0 bg-[#2E3447] relative">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="absolute -top-6 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-8 w-[56px] h-[56px] rounded-full border-[6px] border-[#0A243F] p-4 flex justify-center items-center bg-[#2E3447] text-white cursor-pointer"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
        <div className="w-full max-w-[1320px] mx-auto flex flex-col xl:flex-row justify-center items-center gap-3 lg:gap-4">
          <p className="hidden xl:flex font-[450] font-circular-std text-[16px]/[24px] tracking-normal text-[#767E94]">
            Skoolsel © {new Date().getFullYear()}. All rights reserved
          </p>
          <div className="w-fit h-[24px] text-[14px] tracking-normal gap-3 flex items-center py-4">
            <Link
              href="/privacy-policy"
              className="font-[450] font-circular-std text-[14px]/[24px] lg:text-[16px]/[24px] tracking-normal text-[#767E94] pr-4 lg:border-r lg:border-[#767E94] hover:underline underline-offset-4 decoration-secondary"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="font-[450] font-circular-std text-[14px]/[24px] lg:text-[16px]/[24px] tracking-normal text-[#767E94] pl-4 hover:underline underline-offset-4 decoration-secondary"
            >
              Terms & Condition
            </Link>
          </div>

          <p className="flex xl:hidden font-[450] font-circular-std text-[16px]/[24px] tracking-normal text-[#767E94]">
            Skoolsel © {new Date().getFullYear()}. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
