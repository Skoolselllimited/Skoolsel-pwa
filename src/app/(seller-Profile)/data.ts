import { ads } from "@/data"
import { User, UserReview } from "@/types/user"
// import ads from "@/data/mockdata"

export const products = [
  {
    id: 1,
    name: "Iphone 12 Pro max",
    price: "₦1,277,098",
    image: "/images/image1.png",
    campus: "Unilag",
    vendor: "Aliyu Gadget Store",
    vendorImage: "/images/vendor.jpg",
    isTopSeller: true,
  },
  {
    id: 2,
    name: "Laptop Desk Set",
    price: "₦1,277,098",
    image: "/images/image2.png",
    campus: "Unilag",
    vendor: "Aliyu Gadget Store",
    isTopSeller: true,
    vendorImage: "/images/vendor.jpg",
  },
  {
    id: 3,
    name: "Leather Backpack",
    price: "₦1,277,098",
    image: "/images/image3.png",
    campus: "Unilag",
    vendor: "Aliyu Gadget Store",
    isTopSeller: true,
    vendorImage: "/images/vendor.jpg",
  },
  {
    id: 4,
    name: "Samsung Note 20 Ultra",
    price: "₦1,277,098",
    image: "/images/image4.png",
    campus: "Unilag",
    vendor: "Aliyu Gadget Store",
    isTopSeller: true,
    vendorImage: "/images/vendor.jpg",
  },
  {
    id: 5,
    name: "Smartwatch Classic",
    price: "₦1,277,098",
    image: "/images/image1.png",
    campus: "Unilag",
    vendor: "Aliyu Gadget Store",
    isTopSeller: true,
    vendorImage: "/images/vendor.jpg",
  },
  {
    id: 6,
    name: "Fashion Handbag",
    price: "₦1,277,098",
    image: "/images/image2.png",
    campus: "Unilag",
    vendor: "Aliyu Gadget Store",
    isTopSeller: true,
    vendorImage: "/images/vendor.jpg",
  },
  {
    id: 7,
    name: "Samsung Galaxy A70",
    price: "₦1,277,098",
    image: "/images/image3.png",
    campus: "Unilag",
    vendor: "Aliyu Gadget Store",
    isTopSeller: true,
    vendorImage: "/images/vendor.jpg",
  },
  {
    id: 8,
    name: "Leather Backpack",
    price: "₦1,277,098",
    image: "/images/image3.png",
    campus: "Unilag",
    vendor: "Aliyu Gadget Store",
    isTopSeller: true,
    vendorImage: "/images/vendor.jpg",
  },
  {
    id: 9,
    name: "Samsung Note 20 Ultra",
    price: "₦1,277,098",
    image: "/images/image4.png",
    campus: "Unilag",
    vendor: "Aliyu Gadget Store",
    isTopSeller: true,
    vendorImage: "/images/vendor.jpg",
  },
  // {
  //   id: 10,
  //   name: "Smartwatch Classic",
  //   price: "₦1,277,098",
  //   image: "/images/image1.png",
  //   campus: "Unilag",
  //   vendor: "Aliyu Gadget Store",
  //   isTopSeller: true,
  //   vendorImage: "/images/vendor.jpg",
  // },
  // {
  //   id: 11,
  //   name: "Fashion Handbag",
  //   price: "₦1,277,098",
  //   image: "/images/image2.png",
  //   campus: "Unilag",
  //   vendor: "Aliyu Gadget Store",
  //   isTopSeller: true,

  //   vendorImage: "/images/vendor.jpg",
  // },
  // {
  //   id: 12,
  //   name: "Samsung Galaxy A70",
  //   price: "₦1,277,098",
  //   image: "/images/image3.png",
  //   campus: "Unilag",
  //   vendor: "Aliyu Gadget Store",
  //   isSponsored: true,
  //   isTopSeller: true,
  //   vendorImage: "/images/vendor.jpg",
  // },
]

const userDetails: User = {
  id: 1,
  full_name: "John Doe",
  username: "john_doe",
  bio: "Hello! I love buying and selling items online.",
  image_url: "/images/profile2.jpg",
  ads_count: 5,
  phone: "+1234567890",
  email: "john.doe@example.com",
  rating: 4.5,
  school: null,
  account_verified: true,
  created_at: "2025-06-01T12:00:00Z",
}

const averageRating: number | null = 4.5

const totalReviews: number | null = 644300

// const ads: AdListing[] = [
//   {
//     id: 101,
//     title: "iPhone 13 for Sale",
//     description: "Brand new iPhone 13 with 128GB storage. Available in black.",
//     price: 1000,
//     imageUrl: "/path/to/iphone13.jpg",
//     createdAt: "2025-06-01",
//   },
//   {
//     id: 102,
//     title: "Gaming Laptop",
//     description: "High-performance gaming laptop with RTX 3070 GPU.",
//     price: 1500,
//     imageUrl: "/path/to/laptop.jpg",
//     createdAt: "2025-05-20",
//   },
// ];

const reviews: UserReview[] = [
  {
    id: "201",
    user_id: 1,
    rating: 5,
    reviewer: {
      id: 2,
      username: "reviewer1",
      full_name: "Miles, Esther", // Added a placeholder for full_name
      image_url: "/images/profile2.jpg",
    },
    comment:
      "Great seller! Highly recommended. The entire process was seamless from start to finish. I felt confident throughout the transaction and received my order without any issues.",
    created_at: "2025-05-25",
  },
  {
    id: "202",
    user_id: 1,
    rating: 4,
    reviewer: {
      id: 3,
      username: "reviewer2",
      full_name: "Henry Arthur", // Added a placeholder for full_name
      image_url: "/images/profile2.jpg",
    },
    comment:
      "Smooth transaction, but the delivery was slightly delayed. While the delay was a minor inconvenience, the itemarrived in perfect condition and the overall communication was good. I understand that sometimes delays happen, and I appreciate the quality of the product.",
    created_at: "2025-06-10",
  },
  {
    id: "203",
    user_id: 1,
    rating: 5,
    reviewer: {
      id: 2,
      username: "reviewer1",
      full_name: "Miles, Esther", // Added a placeholder for full_name
      image_url: "/images/profile2.jpg",
    },
    comment:
      "Great seller! Highly recommended. The entire process was seamless from start to finish. I felt confident throughout the transaction and received my order without any issues.",
    created_at: "2025-05-25",
  },
  {
    id: "204",
    user_id: 1,
    rating: 4,
    reviewer: {
      id: 3,
      username: "reviewer2",
      full_name: "Henry Arthur", // Added a placeholder for full_name
      image_url: "/images/profile2.jpg",
    },
    comment:
      "Smooth transaction, but the delivery was slightly delayed. While the delay was a minor inconvenience, the itemarrived in perfect condition and the overall communication was good. I understand that sometimes delays happen, and I appreciate the quality of the product.",
    created_at: "2025-06-10",
  },
]

// --- Corrected refreshProfileData function type ---
const refreshProfileData = async (): Promise<void> => {
  console.log("Refreshing profile data...")
  // Simulate an API call delay
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve() // Explicitly resolve with no value (void)
    }, 1000)
  )
}

export const dummyProps = {
  userDetails,
  averageRating,
  totalReviews,
  ads,
  reviews,
  refreshProfileData,
}
