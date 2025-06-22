import { currencyList } from "@/config";
import { School } from "./school";
import { User } from "./user";
import { Category } from "./category";

export type AdListingImage = {
  id: string;
  image_url: string;
  sequence: number;
};

export type AdListingPriceCurrencyCode = (typeof currencyList)[number];

export type AdListingPrice = {
  amount: number;
  currencyCode: AdListingPriceCurrencyCode;
};

export type AdListingSeo = {
  title: string;
  description: string;
};

export type AdListing = {
  title: string;
  detail: string;
  expected_price: number;
  is_price_negotiable: boolean;
  isSold: boolean;
  id: number;
  state: string;
  is_promoted: boolean | null;
  views: number;
  clicks: number;
  slug: string;
  images: AdListingImage[];
  user: User;
  school: School;
  category: Category;
  attributes: Record<string, string>; // Key-value pairs for attributes
  published_at: string | null;
  created_at: string;
};

export interface AccountFavouriteProps {
  image: string;
  title: string;
  date: string;
  price: string;
  status: "Available" | "Sold";
}

export type PaginatedResponse = {
  data: AdListing[];
  total_pages: number;
  total_count: number;
  page_size: number;
};
