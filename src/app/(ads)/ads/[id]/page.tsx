"use client";

import { ImageGallery } from "@/app/(landing-page)/_components/image-gallery";
import BackButton from "@/components/BackButton";
import BreadcrumbNav from "@/components/breadCrumbs";
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
import { toast } from "sonner";

export default function AdsDetails() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isPhoneRevealed, setIsPhoneRevealed] = useState(false);

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

  const handleCopyPhone = () => {
    const phone = isPhoneRevealed ? "(+234) 5735 8764" : "(+234) 5•••• ••••";
    navigator.clipboard
      .writeText(phone)
      .then(() => {
        toast.success("Phone number copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy phone number");
      });
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
    <div className="w-full flex flex-col gap-4 bg-[#F4F6F8]">
      <div className="xl:hidden px-[15px]">
        <div className="h-[72px] py-4 flex items-center justify-between">
          <BackButton onClick={() => router.push("/ads")} />
          <div className="font-circular-std font-extrabold text-[#4E4E5A] text-[20px]/[32px] tracking-normal">
            Ad Details
          </div>
          <HeartIcon className="text-[#464D61]" />
        </div>
      </div>
      {/* Desktop Breadcrumb Bar */}
      <BreadcrumbNav pathname={pathname} className=" h-6" />
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
                <p className="text-[#767E94] text-[16px]/[24px] font-[450] tracking-normal">
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
                <div className="bg-[#E8F7FF] p-3 w-12 h-12 flex justify-center items-center rounded text-secondary">
                  <HeartIcon className="text-secondary" />
                </div>
              </Card>
              <Card className="hidden lg:flex flex-col gap-4 h-[202px] relative lg:py-5">
                {/* Phone */}
                <div className="w-full h-[72px] bg-[#F5F7FA] p-5 rounded-md items-center gap-2 text-[#0A243F] text-[20px]/[32px] font-[450] font-circular-std tracking-normal cursor-pointer flex justify-between">
                  <span className="flex items-center gap-3">
                    <PhoneIcon className="text-secondary" />
                    <span>
                      {isPhoneRevealed
                        ? "(+234) 5735 8764"
                        : "(+234) 5XXX XXXX"}
                    </span>
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer hover:text-primary  hover:bg-gray-200 hover:scale-95 transition-all duration-200"
                    onClick={handleCopyPhone}
                  >
                    <CopyIcon />
                  </Button>
                </div>

                <Button
                  className="h-[50px] gap-2 rounded px-5 text-white bg-[#2DD54B] hover:bg-[#2DD54B]/80 font-bold font-circular-std text-[16px]/[50px] tracking-normal capitalize hover:scale-99 transition-all duration-200"
                  onClick={() => setIsPhoneRevealed((prev) => !prev)}
                >
                  {isPhoneRevealed ? "Hide Number" : "Reveal Number"}
                </Button>
              </Card>

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

                  <Button
                    variant="link"
                    className="text-secondary font-semibold font-circular-std text-[14px]/[20px] tracking-normal p-0 h-auto"
                    onClick={() => router.push("/seller-profile")}
                  >
                    View Profile
                  </Button>
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
                <div className="flex space-x-2 text-[#767E94] text-lg">
                  <Link
                    href=""
                    className="w-10 h-10 gap-[10px] flex justify-center items-center p-3 bg-[#25D366] rounded-full"
                  >
                    <FaWhatsapp className="w-4 h-4 text-white" />
                  </Link>
                  <Link
                    href=""
                    className="w-10 h-10 gap-[10px] flex justify-center items-center p-3 bg-[#3B5998] rounded-full"
                  >
                    <FaFacebookF className="w-4 h-4 text-white" />
                  </Link>
                  <Link
                    href=""
                    className="w-10 h-10 gap-[10px] flex justify-center items-center p-3 bg-[#14171A] rounded-full"
                  >
                    <RiTwitterXLine className="w-4 h-4 text-white" />
                  </Link>

                  <Link
                    href=""
                    className="w-10 h-10 gap-[10px] flex justify-center items-center p-3 bg-[#0077B5] rounded-full"
                  >
                    <FaLinkedinIn className="w-4 h-4 text-white" />
                  </Link>
                  <Link
                    href=""
                    className="w-10 h-10 gap-[10px] bg-[#636A80] text-white flex justify-center items-center rounded-full p-3 "
                  >
                    <AnchorLink className="w-4 h-4 text-white" />
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
        {/* Related Ads Section */}
        <div className="mt-12 space-y-[50px] bg-[#F4F6F8] shadow-[0px_1px_0px_0px_#EBEEF7_inset] pt-10 pb-[150px] px-2 lg:px-4">
          <h2 className="font-circular-std font-medium text-[24px]/[32px] xl:text-[40px]/[48px] tracking-normal text-[#191F33]">
            Related Ads
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg-md:grid-cols-3 2xl:grid-cols-4 gap-1 lg:gap-6 xl:gap-4">
            {relatedAdsData.slice(0, visibleAds).map((product, idx) => (
              <Link
                key={idx}
                href={`/ads/${product.id}`}
                className="w-full max-w-[193px] lg:max-w-[311px] flex flex-col gap-[2.65px] bg-white p-1 lg:p-2.5 rounded-[10.6px] lg:rounded-[16px] hover:shadow-sm overflow-hidden border border-[#F1F2F4] cursor-pointer"
              >
                <div className="relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={292}
                    height={267}
                    className="w-full h-32 sm:h-[176.86px] lg:h-[267px] object-cover rounded-[8px] bg-[#E3E6EA] hover:scale-[1.01] transition-transform duration-200"
                  />

                  {product.isSponsored && (
                    <span className="w-fit h-8 flex items-center justify-center gap-[10px] rounded-[8px] p-2 absolute top-[130px] lg:top-[226.49px] left-[14.03px] bg-[#131313]/80 text-[#FFCC33] text-[12px]/[16px] font-bold font-circular-std tracking-normal">
                      <LightStrikeIcon /> Sponsored
                    </span>
                  )}

                  <span className="w-fit h-6 py-1 px-2 flex justify-center items-center gap-[10px] absolute top-2 left-2 bg-white text-[#384853] text-[12px]/[16px] font-medium font-circular-std rounded-[8px]">
                    {product.condition}
                  </span>
                </div>

                {/* Content */}
                <div className="pt-1 lg:pt-2 pb-0 flex flex-col gap-[2.65px] lg:gap-1">
                  <h3 className="text-[12px]/[11.92px] lg:text-[16px]/[18px] font-medium font-circular-std text-[#384853] truncate">
                    {product.name}
                  </h3>
                  <p className="text-secondary font-bold text-[12px]/[15.9px] lg:text-[18px]/[24px] -tracking-[1%] align-middle">
                    {product.price}
                  </p>
                  <div className="w-full grid grid-cols-2 gap-1">
                    <div className="flex items-center gap-1.5 lg:gap-2">
                      <MapPinIcon className="w-4 h-4 text-[#384853]" />
                      <span className="text-[#384853] text-[12px] lg:text-[14px] leading-[1.2] font-medium font-circular-std truncate">
                        {product.location}
                      </span>
                    </div>
                    <div className="hidden sm:flex items-center justify-end gap-1.5 lg:gap-2">
                      <ClockIcon className="w-4 h-4 text-[#384853]" />
                      <span className="text-[#384853] text-[12px] lg:text-[14px] leading-[1.2] font-medium font-circular-std truncate">
                        {product.timePosted}
                      </span>
                    </div>
                  </div>

                  <div className="w-full py-[6.62px] lg:py-[10px] px-[10.6px] lg:px-4 bg-[#FAFAFA] rounded-[5.3px] lg:rounded-[8px] mt-1 lg:mt-4 flex flex-col gap-[2.65px] lg:gap-1.5">
                    <p className="text-[#6B7B8A] text-[10px]/[10.6px] lg:text-[14px]/[16px] tracking-normal font-circular-std font-medium">
                      Vendor
                    </p>
                    <div className="w-full h-[18px] flex items-center gap-[5px]">
                      <Avatar className="w-[10.6px] h-[10.6px] lg:w-6 lg:h-6">
                        <AvatarImage
                          src="/images/vendor.jpg"
                          alt="Vendor's photo"
                        />
                        <AvatarFallback>
                          {getInitials(product.vendor)}
                        </AvatarFallback>
                      </Avatar>
                      <p className="font-bold font-circular-std text-[#384853] text-[12px]/[11.92px] lg:text-[15px]/[18px] tracking-normal truncate">
                        {product.vendor}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More Button with functionality */}
          {visibleAds < relatedAdsData.length && (
            <div className="w-full flex justify-center items-center">
              <Button
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="w-fit h-[50px] px-5 bg-[#E8F7FF] hover:bg-[#E8F7FF] text-secondary hover:scale-[0.98] font-circular-std font-bold text-[16px]/[50px] tracking-normal capitalize flex justify-center items-center gap-2 rounded cursor-pointer disabled:opacity-50"
              >
                {isLoadingMore ? (
                  <>
                    <Spinner />
                    Loading...
                  </>
                ) : (
                  <>
                    <SpinnerIcon /> Load More
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
        <ImageGallery
          images={images}
          initialIndex={currentImageIndex}
          isOpen={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
        />
      </div>

      {/* Sticky Call Button for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
        <div className="p-4">
          <Link
            href="tel:+23457358764"
            className="w-full h-[50px] flex items-center justify-center gap-3 rounded px-5 text-white bg-[#2DD54B] hover:bg-[#2DD54B]/90 font-bold font-circular-std text-[16px] tracking-normal transition-all duration-200 active:scale-95"
          >
            Call Seller
          </Link>
        </div>
      </div>
    </div>
  );
}
