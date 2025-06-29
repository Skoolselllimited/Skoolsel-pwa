import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { Stars } from "@/components/Stars/Stars";
import { UserReview } from "@/types/user";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface Review {
  name: string;
  review: string;
  rating: number;
  avatarUrl?: string;
}

const ReviewCard: React.FC<Review> = ({ name, review, rating, avatarUrl }) => (
  <div className="md:flex gap-0 md:gap-5 md:my-4 mt-4">
    {avatarUrl && (
      <Avatar className="w-[40.6px] h-[40.6px] lg:w-14 lg:h-14">
        <AvatarImage
          src={avatarUrl ?? "/default-avatar.png"}
          alt="Vendor's photo"
        />

        <AvatarFallback>{name}</AvatarFallback>
      </Avatar>
    )}
    <div className="md:max-w-3xl mt-4 md:mt-0 ">
      <div className="flex gap-1">
        <Stars rating={rating} color="amber" />
        <p className="text-body-900 font-semibold text-sm">
          {rating.toFixed(1)} Star Ratings
        </p>
      </div>
      <div className="flex items-center my-2 md:gap-2 gap-1">
        <p className="font-semibold text-body-900 text-sm">{name}</p>
        <p className="bg-body-400 h-1 w-1 rounded-full"></p>
      </div>
      <p className="text-[#464d61] text-sm">{review}</p>
    </div>
  </div>
);

interface ReviewsListProps {
  reviews: UserReview[];
  onWriteReviewClick?: () => void;
}

const ReviewsList: React.FC<ReviewsListProps> = ({
  reviews,
  onWriteReviewClick,
}) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-semibold text-gray-900">No Reviews Yet</h2>
        <p className="text-gray-500 mt-2">
          Be the first to share your experience and help other buyers make
          informed decisions!
        </p>
        <div className="my-6 flex justify-center">
          <Button
            type="submit"
            color="primary"
            className=" flex"
            onClick={onWriteReviewClick}
          >
            Write a Review <ArrowRight />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto">
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          name={review.reviewer.full_name}
          review={review.comment}
          rating={review.rating}
          avatarUrl={review.reviewer.image_url || "/images/default-avatar.jpg"}
        />
      ))}
    </div>
  );
};

export default ReviewsList;
