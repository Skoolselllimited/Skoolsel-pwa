import React from "react";
import { CardPanel } from "@/components/cardPanel/cardPanel";
import { Stars } from "@/components/Stars/Stars";
import { Clipboard } from "lucide-react";
import StatCard from "./StatCard";

interface CardItem {
  id: number;
  label: string;
  count: number;
  bgColor: string;
  icon: React.ReactNode;
}

interface UserStatsCardProps {
  rating: number;
  totalReviews: number;
  adCount: number;
  cards?: CardItem[];

  onWriteReview?: () => void;
}

const RatingDisplay = ({
  rating,
  totalReviews,
}: {
  rating: number;
  totalReviews: number;
}) => {
  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center justify-center px-6 py-6 bg-[#fff8e0] rounded-md text-2xl font-bold">
        {rating ? rating.toFixed(1) : "N/A"}
      </div>
      <div className="space-y-1">
        <Stars rating={rating} color="amber" />
        <p className="text-sm font-bold text-gray-900">
          {rating
            ? `${rating.toFixed(1)} Star Average Rating`
            : "No Reviews Yet"}
        </p>

        <p className="text-sm text-gray-500">
          {totalReviews
            ? `${totalReviews.toLocaleString()} People Wrote a Review`
            : "Be the first to leave a review"}
        </p>
      </div>
    </div>
  );
};

const UserStatsCard = ({
  rating,
  totalReviews,
  adCount,
}: UserStatsCardProps) => {
  return (
    <>
      {/* Desktop View */}
      <CardPanel
        primaryText=""
        primaryTextClass=""
        containerClass="flex flex-row items-center justify-between bg-white p-5 mb-4 hidden md:flex"
        state={{ showSidebarScrollbar: false }}
        dispatch={(action) => console.log(action)} // Mock dispatch function
      >
        <RatingDisplay rating={rating} totalReviews={totalReviews} />
        <div className="flex items-center gap-6">
          <StatCard
            id={1}
            label="Active Ads"
            count={adCount}
            bgColor="#e8f7ff"
          />
        </div>
      </CardPanel>

      {/* Mobile View */}
      <CardPanel
        primaryText=""
        primaryTextClass=""
        containerClass="flex flex-col items-center bg-white p-4 md:hidden"
        state={{ showSidebarScrollbar: false }}
        dispatch={(action) => console.log(action)} // Mock dispatch function
      >
        <RatingDisplay rating={rating} totalReviews={totalReviews} />
        <StatCard
          id={1}
          label="Active Ads"
          count={adCount}
          bgColor="bg-card-blue"
        />
      </CardPanel>
    </>
  );
};

export default UserStatsCard;
