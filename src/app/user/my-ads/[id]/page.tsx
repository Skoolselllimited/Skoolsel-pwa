"use client";

import { cn } from "@/lib/utils";
import { ImageGallery } from "@/app/(landing-page)/_components/image-gallery";
import BackButton from "@/components/BackButton";
import BreadcrumbNav from "@/components/breadCrumbs";
import { IoIosWarning } from "react-icons/io";

import {
  AnchorLink,
  ClockIcon,
  ExpandIcon,
  EyeIcon,
  HeartIcon,
  LightStrikeIcon,
  MapPinIcon,
  PhoneIcon,
  Spinner,
  SpinnerIcon,
  VerifiedIcon,
} from "@/components/svgs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getInitials } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  CopyIcon,
  Share2,
  TriangleAlert,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import { SuccessfulPublish } from "../../../../../public/svgs";

import { toast } from "sonner";

export default function AdsDetails() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSoldModal, setShowSoldModal] = useState(false);

  // Add load more functionality states
  const [visibleAds, setVisibleAds] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const images = [
    "/images/main_image.webp",
    "/images/thumbnail_1.webp",
    "/images/thumbnail_2.webp",
    "/images/thumbnail_3.webp",
    "/images/thumbnail_4.webp",
    "/images/thumbnail_5.webp",
  ];

  // Create related ads data
  const relatedAdsData = Array.from({ length: 24 }, (_, idx) => ({
    id: idx + 1,
    name: "iPhone 12 Pro max",
    price: "₦1,277,098",
    location: "Umuahia",
    timePosted: "1 week ago",
    image: "/images/related_ad.webp",
    vendor: "Aliya Gadget Store",
    condition: "New",
    isSponsored: idx % 3 === 0,
  }));

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleDeleteConfirm = () => {
    console.log("Ad deleted!");
    // Implement your actual delete logic here
    setShowDeleteModal(false); // Close modal after action
  };

  const handleSoldConfirm = () => {
    console.log("Marked as Sold!");
    // Implement your "mark as sold" logic here
    setShowSoldModal(false); // Close modal
  };

  interface AdDetails {
    image: string;
    name: string;
    price: string;
  }
  const currentAdDetails: AdDetails = {
    image: "/images/main_image.webp",
    name: "Bajaj Pulsar NS200 Dual Disk Fresh 2020",
    price: "₦231,500.00",
  };

  interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void; // A function that takes no arguments and returns nothing
    onConfirm: () => void; // A function that takes no arguments and returns nothing
    adDetails: AdDetails | null; // adDetails can be AdDetails type or null
  }
  const DeleteConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    adDetails,
  }: DeleteConfirmationModalProps) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.7)] p-2 md:p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto p-3 md:p-6 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-xs bg-[#ebeef7] text-gray-400 hover:text-gray-600 transition-colors"
          >
            <MdClose />
          </button>

          {/* Modal Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <IoIosWarning className="w-12 h-12 text-red-500 mb-3" />

            <h3 className="text-xl font-bold text-[#0A243F] mb-2">
              Keep Selling—Don't Delete! 🚀
            </h3>
            <p className="text-xs  leading-snug">
              Hey there! Deleting your product means losing potential buyers who
              might be interested. Instead, try updating your listing or
              adjusting the price to attract more attention. Stay visible and
              keep selling! 👋
            </p>
          </div>

          {/* Product Details */}
          {adDetails && (
            <div
              className="flex items-center gap-4 
            
           p-1  md:p-3 rounded-md mb-4"
            >
              <img
                src={adDetails.image}
                alt={adDetails.name}
                className="w-16 h-16 object-cover rounded-md flex-shrink-0"
              />
              <div className="flex flex-col">
                <span className="text-[#0A243F] text-xs md:text-sm font-semibold">
                  {adDetails.name}
                </span>
                <span className="text-red-500 text-xs md:text-sm font-bold">
                  {adDetails.price}
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <Button
              className="h-[45px] rounded-md px-5 text-white bg-red-500 hover:bg-[#E74C3C]/80 font-bold text-[14px] md:text-[15px] w-full"
              onClick={onConfirm}
            >
              Delete Ad
            </Button>
            <Button
              className="h-[45px] rounded-md px-5 text-[#54abdb] border-[0.1px] border-blue-100 bg-white hover:bg-gray-50 font-bold text-[14px] md:text-[15px] w-full"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  };
  const SellConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    adDetails,
  }: DeleteConfirmationModalProps) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.7)] p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto p-3 md:p-6 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-xs bg-[#ebeef7] text-gray-400 hover:text-gray-600 transition-colors"
          >
            <MdClose />
          </button>

          {/* Modal Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <SuccessfulPublish />

            <h3 className="text-xl font-bold text-[#0A243F] mb-2">
              Congrats on Your Sale! 🚀
            </h3>
            <p className="text-xs  leading-snug">
              Mark your products as sold to let uyers know it's no longer
              available. Keep listing and happy selling 🚀👋
            </p>
          </div>

          {/* Product Details */}
          {adDetails && (
            <div
              className="flex items-center gap-4 
            
             md:p-3 rounded-md mb-4"
            >
              <img
                src={adDetails.image}
                alt={adDetails.name}
                className="w-16 h-16 object-cover rounded-md flex-shrink-0"
              />
              <div className="flex flex-col">
                <span className="text-[#0A243F] text-xs md:text-sm font-semibold">
                  {adDetails.name}
                </span>
                <span className="text-red-500 text-xs md:text-sm font-bold">
                  {adDetails.price}
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <Button
              className="h-[45x] rounded-md px-5 text-white bg-green-500 hover:bg-green-700 font-bold text-[14px] md:text-[16px] w-full"
              onClick={onConfirm}
            >
              Mark As Sold
            </Button>
            <Button
              className="h-[45px] rounded-md px-5 text-[#54abdb] border-[0.1px] border-blue-100 bg-white hover:bg-gray-50 font-bold text-[14px] md:text-[16px] w-full"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  };
  // Add load more functionality
  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    setVisibleAds((prev) => Math.min(prev + 6, relatedAdsData.length));
    setIsLoadingMore(false);
  };

  return (
    <div className="w-full flex flex-col gap-4 pb-8 md:pb-20 bg-[#F4F6F8]">
      {/* <div className="xl:hidden px-[15px]">
        <div className="h-[72px] py-4 flex items-center justify-between">
          <BackButton onClick={() => router.back()} />

          <div className="font-circular-std font-extrabold text-[#4E4E5A] text-[20px]/[32px] tracking-normal">
            Ad Details
          </div>
          <HeartIcon className="text-[#464D61]" />
        </div>
      </div> */}
      {/* Desktop Breadcrumb Bar */}
      {/* <BreadcrumbNav pathname={pathname} className=" h-6" /> */}
      <div className="max-w-[1320px] mx-auto xl:p-4 min-h-screen">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Product Images and Details */}
          <div className="lg:col-span-2 space-y-2 xl:space-y-9 rounded-xl xl:p-8 bg-white">
            {/* Main Image */}
            <div className="bg-[#EBEEF7] flex justify-center items-center overflow-hidden">
              <div className="relative w-full">
                {/* Desktop Image */}
                <div
                  onClick={() => setIsGalleryOpen(true)}
                  className="hidden xl:flex cursor-pointer w-full xl:w-[648px] xl:h-[505px] justify-center items-center mx-auto"
                >
                  <Image
                    src={images[currentImageIndex] || "/placeholder.svg"}
                    alt="Product image"
                    width={648}
                    height={505}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Mobile Carousel */}
                <div className="block xl:hidden relative w-full h-[280px] lg:h-[520px] overflow-hidden">
                  <div
                    className="flex transition-transform duration-300 ease-in-out h-full cursor-pointer"
                    style={{
                      transform: `translateX(-${currentImageIndex * 100}%)`,
                    }}
                    onClick={() => setIsGalleryOpen(true)}
                  >
                    {images.map((image, index) => (
                      <div key={index} className="w-full h-full flex-shrink-0">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Product image ${index + 1}`}
                          width={400}
                          height={280}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Desktop Expand Button */}
                <span
                  className="hidden w-12 h-12 absolute top-4 right-4 bg-[#0A243F] hover:bg-[#0A243F]/90 hover:scale-[0.98] transition-all duration-200 cursor-pointer xl:flex justify-center items-center rounded-md z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsGalleryOpen(true);
                  }}
                >
                  <ExpandIcon />
                </span>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="relative px-1.5">
              <div className="flex xl:gap-3 overflow-hidden">
                <span
                  className="w-12 h-12 p-3 rounded absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#EBEEF7] hover:bg-[#EBEEF7]/95  hidden xl:flex justify-center items-center gap-[10px] cursor-pointer shadow-none"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </span>

                {/* Mobile: Scrollable thumbnails */}
                <div className="xl:hidden w-full overflow-x-auto scrollbar-hide">
                  <div className="flex gap-3 px-2 py-2 min-w-max">
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className={`h-[80px] w-[80px] flex-shrink-0 relative cursor-pointer border-2 rounded overflow-hidden transition-all duration-200 ${
                          index === currentImageIndex
                            ? "border-secondary shadow-md"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover object-center"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Desktop: Original layout */}
                <div className="hidden xl:block w-full xl:w-[732px] h-[86.14px] xl:h-[112px]">
                  <div className="flex justify-between items-center space-x-3 px-2 xl:px-8 opacity-70 xl:opacity-30 xl:ml-3 2xl:ml-5 h-full">
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className={`h-[80.14px] w-[80.14px] xl:w-[112px] xl:h-[112px] relative cursor-pointer border rounded overflow-hidden ${
                          index === currentImageIndex
                            ? "border-secondary"
                            : "border-white"
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover object-center"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <span
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#EBEEF7] rounded shadow-none p-3 w-12 h-12 hover:bg-[#EBEEF7]/95 hidden xl:flex justify-center items-center gap-[10px] cursor-pointer"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </span>
              </div>
            </div>

            {/* Product Info */}
            <div className="w-full p-4 xl:p-0 max-w-[849px] min-h-30 flex flex-col gap-5">
              <div className="w-full flex flex-col gap-3 border-b border-[#E4E7E9] pb-5">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="secondary"
                    className="bg-[#FFF2CC] text-[#664C00] font-circular-std font-normal text-[13px]/[14px] tracking-normal"
                  >
                    Sponsored
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-[#E4F9E0] text-[#104E00] rounded-[100px] py-1 pr-[10px] pl-1 font-circular-std font-medium text-[13px]/[14px] tracking-normal"
                  >
                    <span className="mr-[5px]">
                      <VerifiedIcon />
                    </span>
                    Verified Seller
                  </Badge>
                </div>

                <h1 className="font-bold font-circular-std text-[20px]/[100%] xl:text-[32px]/[40px] tracking-normal text-[#0A243F]">
                  Apple iPhone 7 Plus (32 GB) 🔥 Hot price (Used)
                </h1>

                <div className="w-full max-w-[665px] flex gap-4 justify-between xl:gap-8 items-center text-[14px]/[24px] tracking-normal font-[450] font-circular-std text-[#767E94]">
                  <div className="flex items-center gap-[6px]">
                    <MapPinIcon className="text-[#767E94] h-5 w-5 lg:h-6 lg:w-6" />
                    FUT Minna
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <ClockIcon className="text-[#767E94] h-5 w-5 lg:h-6 lg:w-6" />
                    29 Jun 10:21 PM
                  </div>
                  <div className="hidden xl:flex items-center gap-[6px]">
                    <EyeIcon className="h-6 w-6" />
                    69,656 Viewed
                  </div>
                </div>
              </div>

              {/* Specifications */}
              <div className="w-full flex flex-col justify-between gap-5">
                <div className="w-full grid grid-cols-2 gap-3">
                  <div className="flex flex-col h-[40px] text-[14px]/[20px] tracking-normal">
                    <h3 className="font-medium  text-[#191C1F]">Condition</h3>
                    <p className="text-[#5F6C72] font-[450]">New</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-[#191C1F]">Color</h3>
                    <p className="text-[#5F6C72]">Silver</p>
                  </div>
                </div>
                <div className="w-full grid grid-cols-2 gap-3">
                  <div className="flex flex-col h-[40px] text-[14px]/[20px] tracking-normal">
                    <h3 className="font-medium text-[#191C1F]">RAM</h3>
                    <p className="text-[#5F6C72]">256GB</p>
                  </div>
                  <div className="flex flex-col h-[40px] text-[14px]/[20px] tracking-normal">
                    <h3 className="font-medium text-[#191C1F]">
                      Operating System
                    </h3>
                    <p className="text-[#5F6C72]">Android</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="w-full flex flex-col gap-6 font-circular-std">
                <h3 className="font-medium text-[24px]/[32px] text-[#0A243F] tracking-normal">
                  Descriptions
                </h3>
                <p className="text-[#767E94] text-[16px]/[24px] font-normal tracking-normal">
                  Sed elementum pellentesque nibh, auctor varius felis ornare
                  euismod. Etiam in purus ac ipsum placerat imperdiet eu lacinia
                  quam. Aliquam vel scelerisque quam. In suscipit massa non
                  elementum commodo. Nullam id mi pellentesque, tempus mauris
                  quis, egestas arcu. In condimentum mollis purus vitae egestas.
                  Donec consectetur, felis et semper fermentum, orci orci
                  egestas mauris, at imperdiet justo erat vel quam. Aliquam at
                  risus nec augue molestie consectetur eget sit amet mauris.
                  Mauris a lectus varius, dignissim nulla quis, commodo justo.
                  Donec ornare condimentum arcu sit amet feugiat. Interdum et
                  malesuada fames ac ante ipsum primis in faucibus. Donec
                  venenatis mauris et sapien ultrices, sit amet pellentesque
                  arcu imperdiet. Nulla venenatis vel lectus interdum elementum.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Price and Actions */}
          <div className="xl:space-y-4">
            <div className="flex flex-col gap-[1px] border rounded px-0">
              {/* Price */}
              <Card className="w-full flex flex-row justify-between lg:py-5">
                <h3 className="text-[28px/[40px] xl:text-[32px]/[40px] text-foreground font-bold tracking-normal">
                  ₦230,000
                </h3>
                {/* <div className="bg-[#E8F7FF] p-3 w-12 h-12 flex justify-center items-center rounded text-secondary">
                  <HeartIcon className="text-secondary" />
                </div> */}
              </Card>
              <Card className=" lg:flex flex-col gap-4  lg:py-5">
                {/* Phone */}
                <div className="w-full h-[72px] bg-[#F5F7FA] py-5 px-1 rounded-md items-center gap-2 text-[#0A243F]  font-[450] font-circular-std tracking-normal cursor-pointer flex justify-items-start">
                  <span className="flex items-center gap-3">
                    <PhoneIcon className="text-secondary" />
                    <span className="text-md md:text-lg">
                      "(+234) 5735 8764"
                    </span>
                  </span>
                </div>

                <Button
                  className="h-[50px] gap-2 rounded px-5 text-white bg-[#2DD54B] hover:bg-[#2DD54B]/80 font-bold font-circular-std text-[16px]/[50px] tracking-normal capitalize hover:scale-99 transition-all duration-200"
                  onClick={() => setShowSoldModal(true)}
                >
                  Mark As Sold
                </Button>
                <div className="flex gap-2 md:gap-3 w-full">
                  <Button
                    className="flex-1 h-[50px] gap-2 rounded-md px-3 md:px-6 text-[#54abdb] border-2 border-[#54abdb] bg-white hover:bg-gray-50 font-bold font-circular-std text-[16px] tracking-normal capitalize"
                    // onClick handler for Edit Ad
                  >
                    Edit Ad
                  </Button>
                  <Button
                    className="flex-1 h-[50px] gap-2 rounded-md px-2 md:px-5 text-[#E74C3C] border-2 border-[#E74C3C] bg-white hover:bg-gray-50 font-bold font-circular-std text-[16px] tracking-normal capitalize"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    Delete Ad
                  </Button>
                </div>
              </Card>
              {/* The Delete Confirmation Modal */}
              <DeleteConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteConfirm}
                adDetails={currentAdDetails}
              />

              <SellConfirmationModal
                isOpen={showSoldModal}
                onClose={() => setShowSoldModal(false)}
                onConfirm={handleSoldConfirm}
                adDetails={currentAdDetails}
              />

              {/* Seller Info */}
              <Card className="w-full lg:h-[168px] flex flex-col gap-6">
                <div className="flex h-[56px] items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-[56px] h-[56px]">
                      <AvatarImage
                        src="/images/ad_poster.webp"
                        className="w-full h-full object-cover object-top"
                      />
                      <AvatarFallback>KG</AvatarFallback>
                    </Avatar>
                    <div className="flex h-[50px] flex-col gap-[6px]">
                      <span className="text-[14px]/[20px] font-[450] font-circular-std tracking-normal text-[#767E94]">
                        Add by:
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="font-medium font-circular-std text-[#0A243F] text-[16px]/[24px] tracking-normal">
                          Kevin Gilbert
                        </span>
                        <VerifiedIcon />
                      </div>
                    </div>
                  </div>

                  <Link
                    // variant="link"
                    className="text-secondary font-semibold font-circular-std text-[14px]/[20px] tracking-normal p-0 h-auto hover:underline cursor-pointer"
                    href="/seller-profile"
                  >
                    View Profile
                  </Link>
                </div>

                <div className="font-circular-std font-[450] text-[14px]/[20px] flex items-center gap-2 text-[#636A80] tracking-normal">
                  <MapPinIcon className="text-secondary w-6 h-6" />
                  <span>Federal University of Technology, Minna</span>
                </div>
              </Card>
            </div>
            <div className="w-full flex flex-col gap-[1px] border rounded px-0">
              {/* Safety Tips */}
              <Card>
                <h2 className="font-circular-std font-medium text-[24px]/[32px] tracking-normal text-[#0A243F]">
                  Safety Tip
                </h2>
                <ul className="space-y-1 text-[14px]/[24px] xl:text-[16px]/[24px] tracking-normal text-[#0A243F]">
                  <li>Meet in public place;</li>
                  <li>Bring a friend</li>
                  <li>Meet during the day</li>
                  <li>Verify identities</li>
                  <li>Inspect items carefully</li>
                </ul>
              </Card>
              <Card className="flex flex-col gap-4 h-[60px] justify-center">
                <Button
                  variant="ghost"
                  className="h-[24px] flex gap-2 rounded px-5 text-[#FF4F4F] hover:bg-transparent hover:text-[#FF4F4F]/80 font-medium font-circular-std text-[16px]/[24px] tracking-normal capitalize hover:scale-99 transition-all duration-200 justify-start"
                >
                  <TriangleAlert className="w-6 h-6 shrink-0" /> Report Abuse
                </Button>
              </Card>
              {/* Share */}
              <Card className="flex-col gap-[18px] px-6">
                <div className="flex items-center gap-3 font-medium font-circular-std text-[16px]/[24px] text-[#464D61] tracking-normal">
                  <Share2 className="h-6 w-6 shrink-0" />
                  <span>Share Ads</span>
                </div>
                <div className="flex space-x-1 md:space-x-2 text-[#767E94] text-lg">
                  <Link
                    href=""
                    className="w-9 h-9 md:w-10 md:h-10 gap-[10px] flex justify-center items-center p-3 bg-[#25D366] rounded-full"
                  >
                    <FaWhatsapp className="w-4 h-4 text-white" />
                  </Link>
                  <Link
                    href=""
                    className="w-9 h-9 md:w-10 md:h-10 gap-[10px] flex justify-center items-center p-3 bg-[#3B5998] rounded-full"
                  >
                    <FaFacebookF className="w-4 h-4 text-white" />
                  </Link>
                  <Link
                    href=""
                    className="w-9 h-9 md:w-10 md:h-10 gap-[10px] flex justify-center items-center p-3 bg-[#14171A] rounded-full"
                  >
                    <RiTwitterXLine className="w-4 h-4 text-white" />
                  </Link>

                  <Link
                    href=""
                    className="w-9 h-9 md:w-10 md:h-10 gap-[10px] flex justify-center items-center p-3 bg-[#0077B5] rounded-full"
                  >
                    <FaLinkedinIn className="w-4 h-4 text-white" />
                  </Link>
                  <Link
                    href=""
                    className="w-9 h-9 md:w-10 md:h-10 gap-[10px] bg-[#636A80] text-white flex justify-center items-center rounded-full p-3 "
                  >
                    <AnchorLink className="w-4 h-4 text-white" />
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
        {/* Related Ads Section */}

        <ImageGallery
          images={images}
          initialIndex={currentImageIndex}
          isOpen={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
        />
      </div>

      {/* Sticky Call Button for Mobile */}
      {/* <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
        <div className="p-4">
          <Link
            href="tel:+23457358764"
            className="w-full h-[50px] flex items-center justify-center gap-3 rounded px-5 text-white bg-[#2DD54B] hover:bg-[#2DD54B]/90 font-bold font-circular-std text-[16px] tracking-normal transition-all duration-200 active:scale-95"
          >
            Call Seller
          </Link>
        </div>
      </div> */}
    </div>
  );
}
