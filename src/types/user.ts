import { School } from "./school";

export type User = {
  id: number;
  full_name: string;
  username: string;
  bio: string | null;
  image_url: string | null;
  ads_count: number;
  phone: string;
  email: string;
  rating: number | null;
  school: School | null;
  account_verified: boolean;
  created_at: string; // ISO timestamp
};

export type UserRating = {
  averageRating: number | null;
  totalReviews: number | null;
};

export type UserReview = {
  id: string;
  user_id: number;
  rating: number;
  reviewer: {
    id: number;
    username: string;
    full_name: string;
    image_url: string;
  };
  comment: string;
  created_at: string;
};
