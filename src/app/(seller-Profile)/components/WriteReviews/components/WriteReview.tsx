"use client"
import AdGrid from "@/components/ads/AdGrid"
import { CardPanel } from "@/components/cardPanel/cardPanel"
import { SpinnerIcon } from "@/components/svgs"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ads } from "@/data"
import { User } from "@/types/user"
import { Clipboard } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import UserStatsCard from "../../UserStatsCard"
import ReviewSuccess from "./ReviewSuccess"
import WriteReviewForm from "./WriteReviewForm"

interface WriteReviewProps {
  userDetails: User
  rating: number
  totalReviews: number
}

const WriteReview = ({
  userDetails,
  rating,
  totalReviews,
}: WriteReviewProps) => {
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false)
  const router = useRouter()
  const username = userDetails.username
  const userId = userDetails.id

  const handleTabChange = (route: string) => {
    router.push(route)
  }

  const handleReviewSubmit = () => {
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
              rating={rating ?? 0}
              totalReviews={totalReviews ?? 0}
              adCount={userDetails.ads_count}
              cards={cards}
            />
            <CardPanel
              primaryText=""
              primaryTextClass=""
              containerClass="p-2 bg-white"
              state={{ showSidebarScrollbar: false }}
              dispatch={(action) => console.log(action)}
            >
              <Tabs
                defaultValue={"write-review"}
                className="w-full h-full"
                onValueChange={(value) => router.push(`?tab=${value}`)}
              >
                <TabsList className="bg-white border-gray-200 mb-5 text-left flex justify-start">
                  <TabsTrigger
                    value="sellers-ads"
                    className="outline-none text-body-600 data-[state=active]:border-b-[0.0938rem] data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:text-primary"
                  >
                    Seller&apos;s Ads
                  </TabsTrigger>
                  <TabsTrigger
                    value="seller-review"
                    className="outline-none ml-4 text-body-600 data-[state=active]:border-b-[0.0938rem] data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:text-primary"
                  >
                    Seller Review
                  </TabsTrigger>
                  <TabsTrigger
                    value="write-review"
                    className="outline-none ml-4 text-body-600 data-[state=active]:border-b-[0.0938rem] data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:text-primary"
                  >
                    Write Review
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="sellers-ads" className="px-2">
                  <AdGrid products={ads} />

                  <div className="flex justify-center items-center py-6">
                    <Button title="load more ads" color="loader">
                      <SpinnerIcon />
                      Load More
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="seller-review" className="px-2">
                  <div className="flex justify-center items-center pb-6">
                    <Button
                      title="load more ads"
                      color="loader"
                      className="flex justify-center items-center mt-12"
                    >
                      <SpinnerIcon />
                      Load More
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="write-review" className="px-2">
                  <WriteReviewForm
                    username={username}
                    userId={userId}
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
          <Tabs defaultValue="seller-review" className="w-full h-full">
            <TabsList className="bg-white ml-auto outline-none justify-between flex">
              <TabsTrigger
                value="profile-details"
                className="outline-none text-body-900 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:text-primary"
                onClick={() =>
                  handleTabChange(`/profile/${username}?tab=profile-details`)
                }
              >
                Profile Details
              </TabsTrigger>
              <TabsTrigger
                value="sellers-ads"
                className="outline-none text-body-900 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
                onClick={() =>
                  handleTabChange(`/profile/${username}?tab=sellers-ads`)
                }
              >
                Seller&apos;s Ads
              </TabsTrigger>
              <TabsTrigger
                value="seller-review"
                className="outline-none text-body-900 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
              >
                Reviews
              </TabsTrigger>
            </TabsList>
            <TabsContent value="seller-review">
              <WriteReviewForm
                username={username}
                userId={userId}
                onReviewSubmit={handleReviewSubmit}
              />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </section>
  )
}

export default WriteReview
