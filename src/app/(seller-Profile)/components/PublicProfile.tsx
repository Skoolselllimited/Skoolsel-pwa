"use client";
import { useState } from "react";
import ReviewSuccess from "./WriteReviews/components/ReviewSuccess";
import WriteReviewForm from "./WriteReviews/components/WriteReviewForm";
import { SpinnerIcon } from "@/components/svgs";
import { CustomButton } from "@/components/ui/button/customButton";
import { CardPanel } from "@/components/cardPanel/cardPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdGrid from "@/components/ads/AdGrid";
import { User } from "@/types/user";
import { Clipboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import PublicProfileSidebar from "./PublicProfileSidebar";
import ReviewsList from "./ReviewList";
import { AdListing } from "@/types/adListing";
import { UserReview } from "@/types/user";
import UserStatsCard from "./UserStatsCard";
import StatCard from "./StatCard";
import { products } from "../data";

interface PublicProfileProps {
  userDetails: User;
  averageRating: number | null;
  totalReviews: number | null;
  ads: AdListing[];
  reviews: UserReview[];
  refreshProfileData: () => Promise<void>;
}

export const PublicProfile = ({
  userDetails,
  averageRating,
  totalReviews,
  ads,
  reviews,
  refreshProfileData,
}: PublicProfileProps) => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("write-review");
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);

  const handleReviewSubmit = async () => {
    setIsReviewSubmitted(true);
    await refreshProfileData();
  };

  const cards = [
    {
      id: 1,
      label: "Posted Ads",
      count: userDetails.ads_count || 0,
      bgColor: "bg-card-blue",
      icon: <Clipboard className="w-6 h-6 text-blue-500" />,
    },
  ];

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
                  setActiveTab(value);
                  router.push(`?tab=${value}`);
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
                  <AdGrid products={products} />
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

      {/* Mobile View */}
      <div className="md:hidden flex mb-7">
        {isReviewSubmitted ? (
          <ReviewSuccess />
        ) : (
          <Tabs
            defaultValue={"sellers-ads"}
            className="w-full h-full"
            onValueChange={(value) => router.push(`?tab=${value}`)}
          >
            <TabsList className="ml-auto outline-none justify-between flex ">
              <TabsTrigger
                value="profile-details"
                className="outline-none text-body-900  data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:text-primary:"
              >
                Profile Details
              </TabsTrigger>
              <TabsTrigger
                value="sellers-ads"
                className="outline-none text-body-900 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:"
              >
                Seller&apos;s Ads
              </TabsTrigger>
              <TabsTrigger
                value="seller-review"
                className="outline-none text-body-900  data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:"
              >
                Reviews
              </TabsTrigger>
              <TabsTrigger
                value="write-review"
                className="outline-none ml-4 text-body-600 data-[state=active]:border-b-[0.0938rem] data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:text-primary"
              >
                Write Review
              </TabsTrigger>
            </TabsList>
            <TabsContent value="profile-details">
              <PublicProfileSidebar user={userDetails} />
            </TabsContent>
            <TabsContent value="sellers-ads">
              <div className="mt-8">
                <h3 className="font-primary mb-4">Seller&apos;s Ads</h3>
                <div>
                  {cards.map((card) => (
                    <StatCard key={card.id} {...card} />
                  ))}

                  <div className="mt-6">
                    <AdGrid products={products} />

                    <div className="flex justify-center items-center mt-6 ">
                      <CustomButton title="load more ads">
                        <SpinnerIcon />
                        Load More
                      </CustomButton>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="seller-review">
              <UserStatsCard
                rating={5}
                totalReviews={10}
                adCount={2}
                cards={cards}
                onWriteReview={() => console.log("zawardo")}
              />

              <div className="border-t-2 border-panel mb-5">
                <ReviewsList reviews={reviews} />
                <div className="flex justify-center items-center mt-6">
                  <CustomButton title="load more ads" color="loader">
                    <SpinnerIcon />
                    Load More
                  </CustomButton>
                </div>
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
        )}
      </div>
    </section>
  );
};
