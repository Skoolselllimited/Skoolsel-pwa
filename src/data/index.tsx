// import {
//   EducationCap,
//   ElectronicsIcon,
//   HandShakeIcon,
//   HomeIcon,
//   MobilePhone,
//   ShopIcon,
//   Vehicle,
//   Wrench,
// } from "@/components/svgs"
import { School } from "@/types"
import { ReactNode, ComponentType } from "react"

export const schoolTypes: School[] = [
  { id: 1, name: "Abubakar Tafawa Balewa University", abbreviation: "ATBU" },
  { id: 2, name: "Ahmadu Bello University", abbreviation: "ABU" },
  {
    id: 3,
    name: "Alex Ekwueme Federal University Ndufu Alike Ikwo",
    abbreviation: "AE-FUNAI",
  },
  { id: 4, name: "Bayero University", abbreviation: "BUK" },
  {
    id: 5,
    name: "Federal University of Agriculture, Abeokuta",
    abbreviation: "FUNAAB",
  },
  {
    id: 6,
    name: "Federal University of Applied Sciences Kachia",
    abbreviation: "FUASK",
  },
  { id: 7, name: "Federal University Birnin Kebbi", abbreviation: "FUBK" },
  { id: 8, name: "Federal University Dutse", abbreviation: "FUD" },
  { id: 9, name: "Federal University Dutsin-Ma", abbreviation: "FUDM" },
  { id: 10, name: "Federal University Gashua", abbreviation: "FUGASHUA" },
  { id: 11, name: "Federal University Gusau", abbreviation: "FUGUS" },
  { id: 12, name: "Federal University Kashere", abbreviation: "FUK" },
  { id: 13, name: "Federal University Lokoja", abbreviation: "FUL" },
  { id: 14, name: "Federal University of Lafia", abbreviation: "FULAFIA" },
  {
    id: 15,
    name: "Federal University of Petroleum Resources Effurun",
    abbreviation: "FUPRE",
  },
  {
    id: 16,
    name: "Federal University of Technology Akure",
    abbreviation: "FUTA",
  },
  {
    id: 17,
    name: "Federal University of Technology Minna",
    abbreviation: "FUTMIN",
  },
  {
    id: 18,
    name: "Federal University of Technology Owerri",
    abbreviation: "FUTO",
  },
  { id: 19, name: "Federal University Otuoke", abbreviation: "FUO" },
  { id: 20, name: "Federal University Oye-Ekiti", abbreviation: "FUOYE" },
  { id: 21, name: "Federal University Wukari", abbreviation: "FUW" },
  {
    id: 22,
    name: "Michael Okpara University of Agriculture, Umudike",
    abbreviation: "MOUAU",
  },
  { id: 23, name: "Modibbo Adama University, Yola", abbreviation: "MAU" },
  { id: 24, name: "National Open University of Nigeria", abbreviation: "NOUN" },
  { id: 25, name: "Nnamdi Azikiwe University", abbreviation: "UNIZIK" },
  { id: 26, name: "Obafemi Awolowo University", abbreviation: "OAU" },
  { id: 27, name: "University of Abuja", abbreviation: "UNIABUJA" },
  { id: 28, name: "University of Agriculture, Makurdi", abbreviation: "UAM" },
  { id: 29, name: "University of Benin", abbreviation: "UNIBEN" },
  { id: 30, name: "University of Calabar", abbreviation: "UNICAL" },
  { id: 31, name: "University of Ibadan", abbreviation: "UI" },
  { id: 32, name: "University of Ilorin", abbreviation: "UNILORIN" },
  { id: 33, name: "University of Jos", abbreviation: "UNIJOS" },
  { id: 34, name: "University of Lagos", abbreviation: "UNILAG" },
  { id: 35, name: "Lagos State University", abbreviation: "LASU" },
  { id: 36, name: "University of Maiduguri", abbreviation: "UNIMAID" },
  { id: 37, name: "University of Nigeria, Nsukka", abbreviation: "UNN" },
  { id: 38, name: "University of Port Harcourt", abbreviation: "UNIPORT" },
  { id: 39, name: "University of Uyo", abbreviation: "UNIUYO" },
  { id: 40, name: "Usmanu Danfodiyo University", abbreviation: "UDUS" },
]

export const productSuggestions = [
  {
    id: 1,
    name: "iPhone 13 Pro Max",
    category: "Electronics",
    price: "₦750,000",
    image: "/images/image1.png",
  },
  {
    id: 2,
    name: "MacBook Pro 16-inch",
    category: "Computers",
    price: "₦1,200,000",
    image: "/images/image2.png",
  },
  {
    id: 3,
    name: "Samsung Galaxy S22 Ultra",
    category: "Electronics",
    price: "₦650,000",
    image: "/images/image3.png",
  },
  {
    id: 4,
    name: "Sony WH-1000XM4 Headphones",
    category: "Audio",
    price: "₦180,000",
    image: "/images/image4.png",
  },
  {
    id: 5,
    name: "iPad Air 5th Generation",
    category: "Tablets",
    price: "₦420,000",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    name: "Dell XPS 13 Laptop",
    category: "Computers",
    price: "₦890,000",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 7,
    name: "Nintendo Switch OLED",
    category: "Gaming",
    price: "₦280,000",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 8,
    name: "Apple Watch Series 8",
    category: "Wearables",
    price: "₦320,000",
    image: "/placeholder.svg?height=40&width=40",
  },
]
// Sample data for suggestions
export const recentSearches = [
  "iPhone 13 Pro",
  "MacBook Air M1",
  "Samsung Galaxy S21",
  "AirPods Pro",
]

// Sample data for recent searches
// export const recentSearches = [
//   { text: "Apple M3", category: "Laptop" },
//   { text: "Hisense", category: "TVs" },
//   { text: "Samsung", category: "Mobile Phones" },
//   { text: "Sweater", category: "Fashion" },
//   { text: "iPhone 13 Pro", category: "Mobile Phones" },
//   { text: "MacBook Air", category: "Laptop" },
// ]

// Categories mapping with products
export const categoryMapping: Record<string, string> = {
  // Mobile Phones
  "iPhone 13 Pro": "Mobile Phones",
  "iPhone 13 Pro Max": "Mobile Phones",
  "iPhone 14 Pro": "Mobile Phones",
  "Samsung Galaxy S21": "Mobile Phones",
  "Samsung Galaxy S22 Ultra": "Mobile Phones",
  "Samsung ultra 25S": "Mobile Phones",
  "Samsung Note 3": "Mobile Phones",
  "Samsung S25": "Mobile Phones",
  "Samsung S21 Ultra": "Mobile Phones",

  // Computers
  "MacBook Air M1": "Computers",
  "MacBook Pro 16-inch": "Computers",
  "MacBook Air M2": "Computers",
  "Dell XPS 13 Laptop": "Computers",

  // Audio
  "AirPods Pro": "Audio",
  "AirPods Pro 2": "Audio",
  "Sony WH-1000XM4 Headphones": "Audio",
  "Mechanical Keyboard": "Audio",

  // Gaming
  "PlayStation 5": "Gaming",
  "PlayStation 5 Console": "Gaming",
  "Nintendo Switch OLED": "Gaming",

  // Tablets
  "iPad Pro": "Tablets",
  "iPad Air 5th Generation": "Tablets",
  "iPad Pro 12.9": "Tablets",

  // Wearables
  "Apple Watch Series 8": "Wearables",

  // Electronics (general)
  "Wireless Earbuds": "Electronics",
}
export const trendingSearches = [
  "PlayStation 5",
  "Mechanical Keyboard",
  "iPad Pro",
  "Wireless Earbuds",
]

// All searchable terms for autocomplete
export const allSearchTerms = [
  ...recentSearches,
  ...trendingSearches,
  ...productSuggestions?.map((p) => p.name),
  // Additional search terms
  "Samsung ultra 25S",
  "Samsung Note 3",
  "Samsung S25",
  "Samsung S21 Ultra",
  "iPhone 14 Pro",
  "MacBook Air M2",
  "iPad Pro 12.9",
  "AirPods Pro 2",
  "PlayStation 5 Console",
  "Nintendo Switch OLED",
]
// Price ranges
export const priceRanges = [
  { label: "All Prices", value: "all" },
  { label: "Under ₦10,000", value: "0-10000" },
  { label: "₦10,000 - ₦50,000", value: "10000-50000" },
  { label: "₦50,000 - ₦100,000", value: "50000-100000" },
  { label: "₦100,000 - ₦500,000", value: "100000-500000" },
  { label: "₦500,000 - ₦1,000,000", value: "500000-1000000" },
  { label: "Above ₦1,000,000", value: "1000000-" },
]

// Category type definition
export interface Category {
  name: string
  icon: ComponentType | (() => ReactNode)
  subcategories: string[]
}

// Category data structure
// export const categories: Category[] = [
//   {
//     name: "Mobile",
//     icon: () => (
//       <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
//         📱
//       </div>
//     ),
//     subcategories: [
//       "Apple",
//       "Samsung",
//       "Xiaomi",
//       "Tecno",
//       "Infinix",
//       "Oppo",
//       "Vivo",
//       "Huawei",
//       "Nokia",
//       "Others",
//     ],
//   },
//   {
//     name: "Vehicle",
//     icon: Vehicle,
//     subcategories: [
//       "Toyota",
//       "Honda",
//       "Mercedes-Benz",
//       "BMW",
//       "Ford",
//       "Hyundai",
//       "Kia",
//       "Nissan",
//       "Lexus",
//       "Others",
//     ],
//   },
//   {
//     name: "Properties",
//     icon: ShopIcon,
//     subcategories: [
//       "Apartments",
//       "Houses",
//       "Land",
//       "Commercial",
//       "Short Lets",
//       "Event Centers",
//       "Others",
//     ],
//   },
//   {
//     name: "Essentials",
//     icon: Wrench,
//     subcategories: [
//       "Clothing",
//       "Shoes",
//       "Bags",
//       "Jewelry",
//       "Watches",
//       "Cosmetics",
//       "Others",
//     ],
//   },
//   {
//     name: "Home & Living",
//     icon: HomeIcon,
//     subcategories: [
//       "Furniture",
//       "Appliances",
//       "Kitchen",
//       "Decor",
//       "Garden",
//       "Others",
//     ],
//   },
//   {
//     name: "Business & Industry",
//     icon: HandShakeIcon,
//     subcategories: [
//       "Equipment",
//       "Tools",
//       "Office",
//       "Medical",
//       "Construction",
//       "Others",
//     ],
//   },
//   {
//     name: "Education",
//     icon: EducationCap,
//     subcategories: ["Books", "Courses", "Tutoring", "Stationery", "Others"],
//   },
//   {
//     name: "Electronis",
//     icon: ElectronicsIcon,
//     subcategories: ["Books", "Courses", "Tutoring", "Stationery", "Others"],
//   },
//   {
//     name: "Gaming",
//     icon: ElectronicsIcon,
//     subcategories: ["Nintendo Switch OLED", "Consoles"],
//   },
// ]
export const categories: Category[] = [
  {
    name: "Computer & Laptop",
    icon: () => (
      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
        💻
      </div>
    ),
    subcategories: [
      "Desktop",
      "Laptop",
      "Gaming PC",
      "Workstation",
      "Mini PC",
      "All-in-One",
      "Apple",
      "Dell",
      "HP",
      "Others",
    ],
  },
  {
    name: "Mobile",
    icon: () => (
      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
        📱
      </div>
    ),
    subcategories: [
      "iPhone",
      "Samsung",
      "Xiaomi",
      "Tecno",
      "Infinix",
      "Oppo",
      "Vivo",
      "Huawei",
      "Nokia",
      "Apple",
      "Others",
    ],
  },
  {
    name: "Phone Accessories",
    icon: () => (
      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
        🎧
      </div>
    ),
    subcategories: [
      "Cases & Covers",
      "Screen Protectors",
      "Chargers",
      "Headphones",
      "Power Banks",
      "Cables",
      "Others",
    ],
  },
  {
    name: "Computer Accessories",
    icon: () => (
      <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
        ⌨️
      </div>
    ),
    subcategories: [
      "Keyboards",
      "Mouse",
      "Monitors",
      "Speakers",
      "Webcams",
      "Storage",
      "Others",
    ],
  },
  {
    name: "Fashion & Accessories",
    icon: () => (
      <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center">
        👗
      </div>
    ),
    subcategories: [
      "Clothing",
      "Shoes",
      "Bags",
      "Jewelry",
      "Watches",
      "Sunglasses",
      "Others",
    ],
  },
  {
    name: "Home & Living",
    icon: () => (
      <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
        🏠
      </div>
    ),
    subcategories: [
      "Furniture",
      "Appliances",
      "Kitchen",
      "Decor",
      "Garden",
      "Lighting",
      "Others",
    ],
  },
  {
    name: "Food",
    icon: () => (
      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
        🍎
      </div>
    ),
    subcategories: [
      "Fresh Food",
      "Packaged Food",
      "Beverages",
      "Snacks",
      "Organic",
      "Local Delicacies",
      "Others",
    ],
  },
  {
    name: "Gaming",
    icon: () => (
      <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
        🎮
      </div>
    ),
    subcategories: [
      "PlayStation",
      "Xbox",
      "Nintendo",
      "PC Gaming",
      "Mobile Gaming",
      "Accessories",
      "Others",
    ],
  },
]
export const ads = [
  {
    id: 1,
    name: "iPhone 13 Pro Max",
    category: "Mobile",
    subcategory: "Apple",
    price: 750000,
    abbreviation: "ABU Zaria",
    timePosted: "1 week ago",
    image: "/images/related_ad.webp",
    vendor: "Aliya Gadget Store",
    vendorImage: "/images/vendor.jpg",
    condition: "New",
    isSponsored: true,
    isTopSeller: true,
    school: "Ahmadu Bello University Zaria",
  },
  {
    id: 2,
    name: "MacBook Pro 16-inch",
    category: "Computer & Laptop",
    subcategory: "Apple",
    price: 1200000,
    abbreviation: "FUT Minna",
    timePosted: "3 days ago",
    image: "/images/image1.png",
    vendor: "Tech Hub",
    vendorImage: "/images/vendor.jpg",
    condition: "Used",
    isSponsored: false,
    isTopSeller: true,
    school: "Federal University of Science and Technology Minna",
  },
  {
    id: 3,
    name: "Samsung Galaxy S22 Ultra",
    category: "Mobile",
    subcategory: "Samsung",
    price: 650000,
    abbreviation: "UniLag",
    timePosted: "2 weeks ago",
    image: "/images/image2.png",
    vendor: "Mobile World",
    vendorImage: "/images/vendor.jpg",
    condition: "New",
    isSponsored: true,
    isTopSeller: false,
    school: "Lagos State University",
  },
  {
    id: 4,
    name: "Wireless Headphones",
    category: "Phone Accessories",
    subcategory: "Headphones",
    price: 180000,
    abbreviation: "COE Zuba",
    timePosted: "5 days ago",
    image: "/images/image3.png",
    vendor: "Sound Masters",
    vendorImage: "/images/vendor.jpg",
    condition: "New",
    isSponsored: false,
    isTopSeller: false,
    school: "College of Education zuba",
  },
  {
    id: 5,
    name: "iPad Pro 12.9-inch",
    category: "Mobile",
    subcategory: "Apple",
    price: 550000,
    abbreviation: "UniAbuja",
    timePosted: "1 day ago",
    image: "/images/image4.png",
    vendor: "Apple Store Nigeria",
    vendorImage: "/images/vendor.jpg",
    condition: "New",
    isSponsored: true,
    isTopSeller: true,
    school: "Abuja University",
  },
  {
    id: 6,
    name: "PlayStation 5 Digital Edition",
    category: "Gaming",
    subcategory: "PlayStation",
    price: 420000,
    abbreviation: "ABU Zaria",
    timePosted: "4 days ago",
    image: "/images/image2.png",
    vendor: "Game World",
    vendorImage: "/images/vendor.jpg",
    condition: "New",
    isSponsored: false,
    isTopSeller: false,
    school: "Ahmadu Bello University Zaria",
  },
  {
    id: 7,
    name: "Dell XPS 15",
    category: "Computer & Laptop",
    subcategory: "Dell",
    price: 950000,
    abbreviation: "FUT Minna",
    timePosted: "1 week ago",
    image: "/images/related_ad.webp",
    vendor: "Computer Village",
    vendorImage: "/images/vendor.jpg",
    condition: "Used",
    isSponsored: false,
    isTopSeller: true,
    school: "Federal University of Science and Technology Minna",
  },
  {
    id: 8,
    name: "Designer Handbag",
    category: "Fashion & Accessories",
    subcategory: "Bags",
    price: 180000,
    abbreviation: "UniLag",
    timePosted: "2 weeks ago",
    image: "/images/image4.png",
    vendor: "Fashion Store",
    vendorImage: "/images/vendor.jpg",
    condition: "New",
    isSponsored: true,
    isTopSeller: false,
    school: "Lagos State University",
  },
  {
    id: 9,
    name: "Smart TV 55 inch",
    category: "Home & Living",
    subcategory: "Appliances",
    price: 850000,
    abbreviation: "UniLag",
    timePosted: "3 days ago",
    image: "/images/image1.png",
    vendor: "Electronics Hub",
    vendorImage: "/images/vendor.jpg",
    condition: "New",
    isSponsored: false,
    isTopSeller: true,
    school: "University of Lagos",
  },
  {
    id: 10,
    name: "Organic Rice 50kg",
    category: "Food",
    subcategory: "Organic",
    price: 45000,
    abbreviation: "ABU Zaria",
    timePosted: "1 day ago",
    image: "/images/image3.png",
    vendor: "Farm Fresh",
    vendorImage: "/images/vendor.jpg",
    condition: "New",
    isSponsored: false,
    isTopSeller: false,
    school: "Ahmadu Bello University Zaria",
  },
]
