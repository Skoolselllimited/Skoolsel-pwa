"use client"
import AdGrid from "@/components/ads/AdGrid"
import { CardPanel } from "@/components/cardPanel/cardPanel"
import { Stars } from "@/components/Stars/Stars"
import { SpinnerIcon } from "@/components/svgs"
import { Button } from "@/components/ui/button"
import { CustomButton } from "@/components/ui/button/customButton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, UserReview } from "@/types/user"
import { Clipboard } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FaLinkedinIn, FaWhatsapp } from "react-icons/fa"
import { FaChevronLeft } from "react-icons/fa6"
import { IoIosLink } from "react-icons/io"
import { RiShoppingBasketFill } from "react-icons/ri"
import { TiSocialFacebook, TiSocialTwitter } from "react-icons/ti"
import { WarningIcon } from "../../../../public/svgs/WarningIcon"
import ReviewsList from "./ReviewList"
import UserStatsCard from "./UserStatsCard"
import ReviewSuccess from "./WriteReviews/components/ReviewSuccess"
import WriteReviewForm from "./WriteReviews/components/WriteReviewForm"
import WriteReviewFormMobile from "./WriteReviews/components/WriteReviewFormMobile"

import { AdsType } from "@/types"
import { MapPin, PhoneCallIcon, Star } from "lucide-react"

interface PublicProfileProps {
  userDetails: User
  averageRating: number | null
  totalReviews: number | null
  ads: AdsType[]
  reviews: UserReview[]
  refreshProfileData: () => Promise<void>
}

export const PublicProfile = ({
  userDetails,
  averageRating,
  totalReviews,
  ads,
  reviews,
  refreshProfileData,
}: PublicProfileProps) => {
  const router = useRouter()

  const [activeTab, setActiveTab] = useState("write-review")
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false)
  const [writeReview, setWriteReview] = useState(false)
  const [showFullBio, setShowFullBio] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toggleShowBio = () => setShowFullBio((prev) => !prev)

  // Define max preview length (you can change this)

  // Dummy data to populate the UI (similar to your existing ProfileCard)
  const userData = {
    name: "Auwalmus",
    joinedDate: "11/11/2024",
    avatar: "https://placehold.co/100x100/A1C4FD/000000?text=AU", // Placeholder image
    rating: 4.5,
    reviewsCount: 644653, // Renamed to avoid conflict with `reviews` tab count
    activeAdsCount: 2345, // Renamed to avoid conflict with `adverts` tab count
    bio: "Hi there! I'm a Stanford student selling quality second-hand textbooks, electronics, and dorm essentials. All items are in great condition and priced fairly for fellow students.",
    phoneNumber: "+234 8128448575",
    location: "Federal University of Technology, Minna",
  }

  const MAX_PREVIEW_LENGTH = 150

  // Trimmed version
  const isLongBio = userData.bio.length > MAX_PREVIEW_LENGTH
  const displayedBio = showFullBio
    ? userData.bio
    : userData.bio.slice(0, MAX_PREVIEW_LENGTH)

  // Dummy data for advert listings (to match the advert tab UI)
  const advertData = [
    {
      id: 1,
      image:
        "https://placehold.co/300x200/F0F0F0/000000?text=Iphone+12+Pro+Max",
      name: "Iphone 12 Pro max",
      price: "N1,277,098",
      location: "Unilag",
      vendor: "Aliyu Gadget Store",
      vendorIcon: "https://placehold.co/16x16/F5F5F5/000000?text=V",
    },
    {
      id: 2,
      image:
        "https://placehold.co/300x200/E0E0E0/000000?text=Samsung+S23+Ultra",
      name: "Samsung S23 Ultra",
      price: "N1,277,098",
      location: "Unilag",
      vendor: "Aliyu Gadget Store",
      vendorIcon: "https://placehold.co/16x16/F5F5F5/000000?text=V",
    },
    {
      id: 3,
      image:
        "https://placehold.co/300x200/D0D0D0/000000?text=Laptop+MacBook+Pro",
      name: "Laptop MacBook Pro",
      price: "N1,277,098",
      location: "Unilag",
      vendor: "Aliyu Gadget Store",
      vendorIcon: "https://placehold.co/16x16/F5F5F5/000000?text=V",
    },
    {
      id: 4,
      image: "https://placehold.co/300x200/C0C0C0/000000?text=Travel+Backpack",
      name: "Travel Backpack",
      price: "N1,277,098",
      location: "Unilag",
      vendor: "Aliyu Gadget Store",
      vendorIcon: "https://placehold.co/16x16/F5F5F5/000000?text=V",
    },
  ]

  const handleReviewSubmit = async () => {
    setIsReviewSubmitted(true)
  }

  const cards = [
    {
      id: 1,
      label: "Posted Ads",
      count: userDetails.ads_count || 0,
      bgColor: "bg-card-blue",
      icon: <Clipboard className="w-6 h-6 text-blue-500" />,
    },
  ]

  return (
    <section aria-labelledby="related-heading font-primary">
      {/* Desktop View */}
      <main className="flex-1 md:block hidden">
        {isReviewSubmitted ? (
          <ReviewSuccess />
        ) : (
          <>
            <UserStatsCard
              rating={averageRating ?? 0}
              totalReviews={totalReviews ?? 0}
              adCount={userDetails.ads_count}
              cards={cards}
            />
            <CardPanel
              primaryText=""
              primaryTextClass="text-lg font-bold"
              containerClass="p-2 bg-white"
              state={{ showSidebarScrollbar: false }}
              dispatch={(action) => console.log(action)} // Mock dispatch function
            >
              <Tabs
                value={activeTab}
                onValueChange={(value) => {
                  setActiveTab(value)
                }}
                defaultValue="write-review"
                className="w-full h-full"
              >
                <TabsList className="bg-white border-b  border-gray-200 mb-5 text-left flex justify-start">
                  <TabsTrigger
                    value="sellers-ads"
                    className="pb-2  text-sm font-medium text-gray-500 data-[state=active]:text-[#54abdb] data-[state=active]:border-b-2 data-[state=active]:border-[#54abdb] transition-colors"
                  >
                    Seller&apos;s Ads
                  </TabsTrigger>
                  <TabsTrigger
                    value="seller-review"
                    className="pb-2 text-sm font-medium text-gray-500 data-[state=active]:text-[#54abdb] data-[state=active]:border-b-2 data-[state=active]:border-[#54abdb] transition-colors"
                  >
                    Seller Review
                  </TabsTrigger>
                  <TabsTrigger
                    value="write-review"
                    className="pb-2 text-sm font-medium text-gray-500 data-[state=active]:text-[#54abdb] data-[state=active]:border-b-2 data-[state=active]:border-[#54abdb] transition-colors"
                  >
                    Write Review
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="sellers-ads" className="px-2">
                  <AdGrid products={ads} />
                  <div className="w-full flex justify-center mt-4">
                    <Button
                      className="bg-[#eaf6fe] text-[#54abdb] hover:bg-[#d3eefc] font-medium"
                      size="default"
                      variant="ghost"
                    >
                      <SpinnerIcon />
                      Load More
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="seller-review" className="px-2">
                  <ReviewsList
                    reviews={reviews}
                    onWriteReviewClick={() => setActiveTab("write-review")}
                  />
                  <div className="w-full flex justify-center mt-4">
                    <Button
                      className="bg-[#eaf6fe] text-[#54abdb] hover:bg-[#d3eefc] font-medium"
                      size="default"
                      variant="ghost"
                    >
                      <SpinnerIcon />
                      Load More
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="write-review" className="px-2">
                  <WriteReviewForm
                    username={userDetails.username}
                    userId={userDetails.id}
                    onReviewSubmit={handleReviewSubmit}
                  />
                </TabsContent>
              </Tabs>
            </CardPanel>
          </>
        )}
      </main>

      {/* Mobile View........................................................... */}
      <div className="md:hidden flex ">
        {writeReview ? (
          <WriteReviewFormMobile onClose={() => setWriteReview(false)} />
        ) : (
          // Main container with full viewport height and light background
          <div className="relative bg-white font-sans text-gray-800 pb-20">
            <div className=" flex items-center p-4 ">
              <button
                onClick={() => router.back()}
                className=" md:hidden border text-gray-700 text-sm p-2 mr-2 rounded-full hover:bg-gray-100 transition"
              >
                <FaChevronLeft />
              </button>
              <h1 className="text-xl font-semibold">{userData.name}</h1>
            </div>
            {/* Profile Info Section */}

            <Image
              src={"/images/spb.png"}
              width={1000}
              height={1000}
              alt="Background Image"
              className="w-full h-[120px] object-cover"
            />
            <div className="-top-18 flex flex-col items-center justify-center p-6 relative ">
              {/* Adjusted margin-top */}
              <div className="relative">
                <img
                  src={"/images/profile2.jpg"}
                  alt="Profile Avatar"
                  className="w-35 h-35 rounded-full border-white  object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold mt-4 text-gray-900">
                @{userData.name.toLowerCase()}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Joined - {userData.joinedDate}
              </p>
            </div>
            {/* Tabs */}

            <Tabs
              value={activeTab}
              onValueChange={(value) => {
                setActiveTab(value)
              }}
              defaultValue="write-review"
              className="w-full h-full px-1.5"
            >
              <TabsList className="bg-white border-b  border-gray-200 mb-5 text-left flex justify-between ">
                <TabsTrigger
                  value="profile"
                  className="pb-2  text-sm font-medium text-[#384853] data-[state=active]:text-[#54abdb] data-[state=active]:border-b-2 data-[state=active]:border-[#54abdb] transition-colors"
                >
                  Profile
                </TabsTrigger>
                <TabsTrigger
                  value="seller-review"
                  className="pb-2 text-sm font-medium text-[#384853] data-[state=active]:text-[#54abdb] data-[state=active]:border-b-2 data-[state=active]:border-[#54abdb] transition-colors"
                >
                  Adverts
                  <span className="bg-[#384853] text-[10px] ml-1 text-white px-2 py-0.5 rounded-xl">
                    285
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="write-review"
                  className="pb-2 text-sm font-medium text-[#384853] data-[state=active]:text-[#54abdb] data-[state=active]:border-b-2 data-[state=active]:border-[#54abdb] transition-colors"
                >
                  Reviews
                  <span className="bg-[#384853] text-[10px] ml-1 text-white px-2 py-0.5 rounded-xl">
                    285
                  </span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="profile" className="px-2">
                {/* Fixed Bottom Call Button */}
                <div className="fixed bottom-0 left-0 right-0 p-3 bg-white shadow-lg border-t border-gray-200 z-50">
                  <button className="w-full bg-[#2dd54b] text-white py-3 px-4 rounded-sm text-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center">
                    Call Seller
                  </button>
                </div>

                {/* Main Content */}
                <div className=" w-full space-y-6 bg-white  mt-6 rounded-lg">
                  {/* Statistics */}
                  <h3 className="text-lg font-semibold mb-2">Statistics</h3>
                  <div className="grid pl-0.5 grid-cols-2 gap-2 text-center border-b pb-4 border-gray-200 font-inter">
                    {/* Left Column: Rating and Reviews */}
                    <div className="flex items-center space-x-1 sm:space-x-2 font-inter justify-center">
                      <div className="flex items-center justify-center p-1.5 sm:p-2 bg-[#fff8e0] rounded-lg">
                        <Star
                          fill="currentColor"
                          strokeWidth={0}
                          className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-0.5 sm:gap-1">
                          <span className="text-lg sm:text-2xl font-bold text-gray-900">
                            {userData.rating}
                          </span>
                          <Stars
                            rating={userData.rating}
                            color="amber"
                            size="xs" // Used 'xs' size for stars on smaller screens
                          />
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500">
                          {userData.reviewsCount.toLocaleString()} Reviews
                        </p>
                      </div>
                    </div>

                    {/* Right Column: Active Ads */}
                    <div className="flex items-center ml-3 sm:ml-0  space-x-1 sm:space-x-4 justify-center">
                      <div className="flex items-center justify-center p-1.5 sm:p-2 bg-[#e0f7fa] rounded-lg">
                        <RiShoppingBasketFill className="w-5 h-5 sm:w-6 sm:h-6 text-[#00bcd4]" />
                      </div>
                      <div className="flex flex-col items-start">
                        <div className="text-lg sm:text-2xl font-bold text-gray-900">
                          {userData.activeAdsCount.toLocaleString()}
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Active Ads
                        </p>{" "}
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="border-b pb-4 border-gray-200">
                    <h3 className="text-lg font-semibold mb-2">Bio</h3>
                    <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                      {displayedBio}
                      {isLongBio && !showFullBio && "... "}
                      {isLongBio && (
                        <button
                          onClick={toggleShowBio}
                          className="text-[#00bcd4] hover:underline ml-1"
                        >
                          {showFullBio ? "Show less" : "Show more"}
                        </button>
                      )}
                    </p>
                  </div>

                  {/* Contact Information */}
                  <div className="border-b pb-4 border-gray-200">
                    <h3 className="text-lg font-semibold mb-3">
                      Contact Information
                    </h3>
                    <div className="flex items-center text-gray-700 mb-2">
                      <PhoneCallIcon className="w-5 h-5 text-gray-500 mr-3" />
                      <span className="text-xs sm:text-sm">
                        {userData.phoneNumber}
                      </span>
                    </div>
                    <div className="flex items-start text-gray-700 mb-2">
                      <MapPin className="w-5 h-5 text-gray-500 mr-3 " />
                      <span className="text-xs sm:text-sm">
                        {userData.location}
                      </span>
                    </div>
                  </div>

                  {/* Share Profile */}
                  <div className="border-b pb-4 border-gray-200">
                    <h3 className="text-lg font-semibold mb-3">
                      Share Profile
                    </h3>
                    <div className="flex justify-start gap-2 mt-3">
                      {/* WhatsApp Icon Button */}
                      <button className="flex items-center justify-center size-10 rounded-full bg-[#25d366] text-white hover:bg-green-600 transition-colors">
                        <FaWhatsapp />
                      </button>
                      {/* Facebook Icon Button */}
                      <button className="flex items-center justify-center size-10 rounded-full bg-[#3b5998] text-white hover:bg-blue-700 transition-colors">
                        <TiSocialFacebook />
                      </button>
                      {/* Twitter Icon Button */}
                      <button className="flex items-center justify-center size-10 rounded-full bg-[#1da1f2] text-white hover:bg-blue-500 transition-colors">
                        <TiSocialTwitter />
                      </button>
                      {/* LinkedIn Icon Button */}
                      <button className="flex items-center justify-center size-10 rounded-full bg-[#0077B5] text-white hover:bg-blue-800 transition-colors">
                        <FaLinkedinIn />
                      </button>
                      {/* Copy Link Button */}
                      <button className="flex items-center justify-center size-10 rounded-full bg-[#636a80] text-white hover:bg-gray-400 transition-colors">
                        <IoIosLink />
                      </button>
                    </div>
                  </div>

                  {/* Report Seller */}
                  <button
                    title="report"
                    className="text-red-700 text-sm flex flex-row items-center hover:underline"
                  >
                    <WarningIcon className="w-4 h-4 mr-2" />
                    Report Seller
                  </button>
                </div>
              </TabsContent>
              <TabsContent value="seller-review" className="px-2">
                {" "}
                <AdGrid products={ads} />
                <div className="w-full flex justify-center mt-4">
                  <Button
                    className="bg-[#eaf6fe] text-[#54abdb] hover:bg-[#d3eefc] font-medium"
                    size="default"
                    variant="ghost"
                  >
                    <SpinnerIcon />
                    Load More
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="write-review" className="px-2">
                <div className="font-inter max-w-md mx-auto border-b px-0.5 py-4  border-gray-300">
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="flex items-center justify-center w-20 h-20 bg-[#fff8e0] rounded-lg">
                      <span className="text-3xl font-bold text-gray-900">
                        {userData.rating}
                      </span>
                    </div>

                    <div className="flex flex-col items-start">
                      <Stars
                        rating={userData.rating}
                        color="amber"
                        size="sm" // Medium size for stars to match the image better
                      />
                      <div className="flex items-center gap-1">
                        <p className="text-sm text-gray-800 font-semibold ">
                          {userData.rating} Star Average Rating
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {userData.reviewsCount.toLocaleString()} People Wrote a
                        Review
                      </p>
                    </div>
                  </div>
                  {/* Bottom Section: Write Review Button */}
                  <CustomButton onClick={() => setWriteReview(true)}>
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Submitting...
                      </div>
                    ) : (
                      <>
                        <Star
                          fill="currentColor"
                          strokeWidth={0}
                          className="w-5 h-5"
                        />
                        Write Review
                      </>
                    )}
                  </CustomButton>
                </div>
                <ReviewsList
                  reviews={reviews}
                  onWriteReviewClick={() => setActiveTab("write-review")}
                />
                <div className="w-full flex justify-center mt-4">
                  <Button
                    className="bg-[#eaf6fe] text-[#54abdb] hover:bg-[#d3eefc] font-medium"
                    size="default"
                    variant="ghost"
                  >
                    <SpinnerIcon />
                    Load More
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </section>
  )
}
