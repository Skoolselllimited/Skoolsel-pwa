import { AdListing, AccountFavouriteProps } from "@/types/adListing";
import { BlogPost } from "@/types/blogpost";

const ads: AdListing[] = [
  {
    id: 1,
    title: "Simple Mobile 4G LTE Prepaid...",
    detail: "Brand new mobile phone with excellent features.",
    expected_price: 234000,
    is_price_negotiable: true,
    state: "Futminna",
    is_promoted: true,
    views: 100,
    clicks: 50,
    slug: "simple-mobile-4g-lte",
    images: [
      {
        image_url: "/images/car.jpg",
        id: "1",
        sequence: 0,
      },
    ],
    user: {
      id: 1,
      full_name: "John Doe",
      email: "john.doe@example.com",
      username: "johndoe",
      bio: "Tech enthusiast",
      image_url: null,
      phone: "08012345678",
      school: {
        id: 1,
        name: "Futminna",
        abbrv: "FMN",
      },
      account_verified: true,
      created_at: "2025-01-01T10:00:00Z",
      ads_count: 0,
      rating: 0,
    },
    school: {
      id: 1,
      name: "Futminna",
      abbrv: "FMN",
    },
    category: {
      id: 1,
      name: "Essentials",
      parent_id: 0,
      slug: "essentials",
    },
    attributes: { condition: "new", warranty: "1 year" },
    published_at: "2025-01-02T10:00:00Z",
    created_at: "2025-01-01T12:00:00Z",
    isSold: false,
  },
  {
    id: 2,
    title: "Canon EOS Rebel SL3 / EOS 250D",
    detail: "High-quality DSLR camera perfect for photography.",
    expected_price: 850000,
    is_price_negotiable: false,
    state: "Abuja",
    is_promoted: false,
    views: 200,
    clicks: 80,
    slug: "canon-eos-rebel-sl3",
    images: [
      {
        image_url: "/images/car.jpg",
        id: "2",
        sequence: 0,
      },
    ],
    user: {
      id: 2,
      full_name: "Jane Smith",
      email: "jane.smith@example.com",
      username: "janesmith",
      bio: "Professional photographer",
      image_url: null,
      phone: "08098765432",
      school: {
        id: 2,
        name: "UniAbuja",
        abbrv: "UA",
      },
      account_verified: true,
      created_at: "2024-12-30T08:00:00Z",
      ads_count: 0,
      rating: 0,
    },
    school: {
      id: 2,
      name: "UniAbuja",
      abbrv: "UA",
    },
    category: {
      id: 2,
      name: "Electronics",
      parent_id: 0,
      slug: "electronics",
    },
    attributes: { condition: "used", warranty: "6 months" },
    published_at: "2025-01-02T14:00:00Z",
    created_at: "2025-01-01T10:00:00Z",
    isSold: false,
  },
  {
    id: 3,
    title: "Apple iPhone 13 Pro Max (128GB)",
    detail: "Latest iPhone with advanced features and sleek design.",
    expected_price: 1100000,
    is_price_negotiable: true,
    state: "Lagos",
    is_promoted: true,
    views: 500,
    clicks: 150,
    slug: "iphone-13-pro-max",
    images: [
      {
        image_url: "/images/car.jpg",
        id: "3",
        sequence: 0,
      },
    ],
    user: {
      id: 3,
      full_name: "Michael Johnson",
      email: "michael.johnson@example.com",
      username: "mjohnson",
      bio: "Gadget collector",
      image_url: null,
      phone: "07012345678",
      school: {
        id: 3,
        name: "UniLag",
        abbrv: "UL",
      },
      account_verified: false,
      created_at: "2025-01-01T11:00:00Z",
      ads_count: 0,
      rating: 0,
    },
    school: {
      id: 3,
      name: "UniLag",
      abbrv: "UL",
    },
    category: {
      id: 3,
      name: "Phones",
      parent_id: 2,
      slug: "phones",
    },
    attributes: { condition: "new", warranty: "2 years" },
    published_at: "2025-01-03T09:00:00Z",
    created_at: "2025-01-02T09:00:00Z",
    isSold: false,
  },
  {
    id: 4,
    title: "Toyota Corolla 2019 Model",
    detail: "Reliable and fuel-efficient car in excellent condition.",
    expected_price: 4500000,
    is_price_negotiable: true,
    state: "Kano",
    is_promoted: false,
    views: 300,
    clicks: 120,
    slug: "toyota-corolla-2019",
    images: [
      {
        image_url: "/images/car.jpg",
        id: "4",
        sequence: 0,
      },
    ],
    user: {
      id: 4,
      full_name: "Sarah Connor",
      email: "sarah.connor@example.com",
      username: "sconnor",
      bio: "Automobile dealer",
      image_url: null,
      phone: "09012345678",
      school: {
        id: 4,
        name: "BUK",
        abbrv: "BU",
      },
      account_verified: true,
      created_at: "2025-01-02T08:00:00Z",
      ads_count: 0,
      rating: 0,
    },
    school: {
      id: 4,
      name: "BUK",
      abbrv: "BU",
    },
    category: {
      id: 4,
      name: "Vehicles",
      parent_id: 0,
      slug: "vehicles",
    },
    attributes: { condition: "used", mileage: "30,000 km" },
    published_at: "2025-01-04T12:00:00Z",
    created_at: "2025-01-02T08:00:00Z",
    isSold: false,
  },
  {
    id: 5,
    title: "Dell XPS 15 Laptop (16GB RAM)",
    detail: "Powerful laptop for professionals and gamers.",
    expected_price: 900000,
    is_price_negotiable: true,
    state: "Port Harcourt",
    is_promoted: true,
    views: 250,
    clicks: 90,
    slug: "dell-xps-15",
    images: [
      {
        image_url: "/images/car.jpg",
        id: "5",
        sequence: 0,
      },
    ],
    user: {
      id: 5,
      full_name: "Henry Adams",
      email: "henry.adams@example.com",
      username: "hadams",
      bio: "Tech enthusiast",
      image_url: null,
      phone: "08123456789",
      school: {
        id: 5,
        name: "UniPort",
        abbrv: "UP",
      },
      account_verified: false,
      created_at: "2025-01-01T09:00:00Z",
      ads_count: 0,
      rating: 0,
    },
    school: {
      id: 5,
      name: "UniPort",
      abbrv: "UP",
    },
    category: {
      id: 5,
      name: "Computers",
      parent_id: 0,
      slug: "computers",
    },
    attributes: { condition: "new", warranty: "1 year" },
    published_at: "2025-01-03T10:00:00Z",
    created_at: "2025-01-01T09:00:00Z",
    isSold: false,
  },
  {
    id: 6,
    title: "LG 55-inch OLED TV",
    detail: "Stunning OLED TV with 4K Ultra HD resolution.",
    expected_price: 750000,
    is_price_negotiable: false,
    state: "Ibadan",
    is_promoted: false,
    views: 180,
    clicks: 60,
    slug: "lg-55-oled-tv",
    images: [
      {
        image_url: "/images/car.jpg",
        id: "6",
        sequence: 0,
      },
    ],
    user: {
      id: 6,
      full_name: "Emily Brown",
      email: "emily.brown@example.com",
      username: "ebrown",
      bio: "Home appliance dealer",
      image_url: null,
      phone: "08011223344",
      school: {
        id: 6,
        name: "UI",
        abbrv: "UI",
      },
      account_verified: true,
      created_at: "2025-01-01T08:00:00Z",
      ads_count: 0,
      rating: 0,
    },
    school: {
      id: 6,
      name: "UI",
      abbrv: "UI",
    },
    category: {
      id: 6,
      name: "Home Appliances",
      parent_id: 0,
      slug: "home-appliances",
    },
    attributes: { condition: "new", warranty: "3 years" },
    published_at: "2025-01-02T11:00:00Z",
    created_at: "2025-01-01T08:00:00Z",
    isSold: false,
  },
  {
    id: 7,
    title: "LG 55-inch OLED TV",
    detail: "Stunning OLED TV with 4K Ultra HD resolution.",
    expected_price: 750000,
    is_price_negotiable: false,
    state: "Ibadan",
    is_promoted: false,
    views: 180,
    clicks: 60,
    slug: "lg-55-oled-tv",
    images: [
      {
        image_url: "/images/car.jpg",
        id: "6",
        sequence: 0,
      },
    ],
    user: {
      id: 7,
      full_name: "Emily Brown",
      email: "emily.brown@example.com",
      username: "ebrown",
      bio: "Home appliance dealer",
      image_url: null,
      phone: "08011223344",
      school: {
        id: 7,
        name: "UI",
        abbrv: "UI",
      },
      account_verified: true,
      created_at: "2025-01-01T08:00:00Z",
      ads_count: 0,
      rating: 0,
    },
    school: {
      id: 7,
      name: "UI",
      abbrv: "UI",
    },
    category: {
      id: 7,
      name: "Home Appliances",
      parent_id: 0,
      slug: "home-appliances",
    },
    attributes: { condition: "new", warranty: "3 years" },
    published_at: "2025-01-02T11:00:00Z",
    created_at: "2025-01-01T08:00:00Z",
    isSold: false,
  },
];

export default ads;

export const reviews = [
  {
    name: "Miles, Esther",
    ad: "4K UHD LED Smart TV with Chromecast Built-in",
    review:
      "The Dropbox HQ in San Francisco is one of the best designed & most comfortable offices I have ever witnessed. Great stuff! If you happen to visit SanFran, don't miss the chance to witness it yourself.",
    rating: 5.0,
    avatarUrl: "/images/profile.jpg",
  },
  {
    name: "Henry, Arthur",
    ad: "Simple Mobile 4G LTE Prepaid Smartphone",
    review:
      "The Dropbox HQ in San Francisco is one of the best designed & most comfortable offices I have ever witnessed. Great stuff! If you happen to visit SanFran, don't miss the chance to witness it yourself.",
    rating: 5.0,
    avatarUrl: "/images/profile.jpg",
  },
  {
    name: "Black, Marvin",
    ad: "Wired Over-Ear Gaming Headphones with USB",
    review:
      "Love their drink specials. Bartenders super nice. Spent a week at UCSF and this was a very nice break for the parental unit.",
    rating: 5.0,
    avatarUrl: "/images/profile.jpg",
  },
  {
    name: "Nguyen, Shane",
    ad: "Samsung Electronics Samsung Galaxy S21 5G",
    review:
      "I had I was very sad this day. There were friendly people at the bar that engaged with me. Interactions with people was very well needed. I enjoyed a great Long Island ice tea, some tasty vegetarian nachos, and sat by the water.",
    rating: 5.0,
    avatarUrl: "/images/profile.jpg",
  },
  {
    name: "Cooper, Kristin",
    ad: "Sony DSCHX8 High Zoom Point & Shoot Camera",
    review:
      "Love their drink specials. Bartenders super nice. Spent a week at UCSF and this was a very nice break for the parental unit.",
    rating: 5.0,
    avatarUrl: "/images/profile.jpg",
  },
];

export const favouriteAdsData: AccountFavouriteProps[] = [
  {
    image: "/images/car.jpg",
    title: "Bajaj Pulsar NS.DUAL.DISK.FRESH 2020",
    date: "Jul 13, 2021",
    price: "$1,500.00",
    status: "Available",
  },
  {
    image: "/images/car.jpg",
    title: "Xiaomi Poco X2 (8/256) Hot Offer (Used)",
    date: "Jul 13, 2021",
    price: "N123,004",
    status: "Available",
  },
  {
    image: "/images/car.jpg",
    title: "Samsung Galaxy A22 2021",
    date: "Jul 13, 2021",
    price: "$220.00",
    status: "Sold",
  },
  {
    image: "/images/car.jpg",
    title: "DORMAK Lift, 06 Person 07 Stops",
    date: "Jul 13, 2021",
    price: "N123,004",
    status: "Available",
  },
  {
    image: "/images/car.jpg",
    title: "Toyota Fielder G HYBRID WXB PEARL 2017",
    date: "Jul 13, 2021",
    price: "N123,004",
    status: "Sold",
  },
];

export const filterByCatergories = {
  title: "Category",
  data: [
    {
      name: "Beauty",
      slug: "beauty",
      children: [
        {
          name: "Fragrance",
          slug: "fragrance",
        },
        {
          name: "Hair Care",
          slug: "hair-care",
        },
        {
          name: "Makeup",
          slug: "makeup",
        },
      ],
    },

    {
      name: "Electronics",
      slug: "electronics",
      children: [
        {
          name: "Electronic Accessories",
          slug: "electronic-accessories",
        },
        {
          name: "TVs & DVDs",
          slug: "tvs-dvds",
        },
        {
          name: "Sound Systems",
          slug: "sound-systems",
        },
        {
          name: "Cameras",
          slug: "cameras",
        },
        {
          name: "Printers & Scanners",
          slug: "printers-scanners",
        },

        {
          name: "Video Games",
          slug: "video-games",
        },
        {
          name: "Video Game Consoles",
          slug: "video-game-consoles",
        },
        {
          name: "Audio Players",
          slug: "audio-players",
        },
      ],
    },

    {
      name: "Fashion",
      slug: "fashion",
      children: [
        {
          name: "Fashion Accessories",
          slug: "fashion-accessories",
        },
        {
          name: "Bags",
          slug: "bags",
        },

        {
          name: "Clothes",
          slug: "clothes",
        },

        {
          name: "Jewelries",
          slug: "jewelries",
        },

        {
          name: "Shoes",
          slug: "shoes",
        },
      ],
    },
    {
      name: "Housing",
      slug: "housing",

      children: [
        {
          name: "Apartments",
          slug: "apartments",
        },
        {
          name: "House Accessories",
          slug: "house-accessories",
        },
        {
          name: "Furniture",
          slug: "furniture",
        },
        {
          name: "Kitchen",
          slug: "kitchen",
        },
      ],
    },

    {
      name: "Laptops & Computers",
      slug: "laptops-computers",

      children: [
        {
          name: "Desktop Computer",
          slug: "desktop-computer",
        },
        {
          name: "Laptop",
          slug: "laptop",
        },
        {
          name: "Laptops & Computer Accessories",
          slug: "laptops-computer-accessories",
        },
      ],
    },

    {
      name: "Phones & Tablets",
      slug: "phones-tablets",

      children: [
        {
          name: "Mobile Phones",
          slug: "mobile-phones",
        },
        {
          name: "Smart Watches & Trackers",
          slug: "smart-watches-trackers",
        },
        {
          name: "Tablets",
          slug: "tablets",
        },
        {
          name: "Phone Accessories",
          slug: "phone-accessories",
        },
      ],
    },
  ],
};

export const filterByConditions = {
  title: "Conditions",
  children: ["Any", "New", "Used"],
};

export const filterBySchools = {
  title: "Top Schools",
  children: [
    "Futminna, Minna",
    "ABU, Zaria",
    "UniAbuja, Abuja",
    "KSU, Kaduna",
    "IMSU, Kaduna",
    "KSU, Kaduna",
    "IMSU, Imo",
    "UI, Ilorin",
    "UniLag, Lagos",
    "BUK, Kano",
  ],
};

export const filterByPrice = {
  title: "Prices",

  children: [
    {
      title: "All Prices",
    },
    {
      title: "Under N20",
      minPrice: 1,
      maxPrice: 19.99,
    },
    {
      title: "N25 to N100",
      minPrice: 25,
      maxPrice: 100,
    },

    {
      title: "N100 to N300",
      minPrice: 100,
      maxPrice: 300,
    },

    {
      title: "N300 to N500",
      minPrice: 300,
      maxPrice: 500,
    },

    {
      title: "N500 to N1,000",
      minPrice: 500,
      maxPrice: 1000,
    },

    {
      title: "N1,000 to N10,000",
      minPrice: 1000,
      maxPrice: 10000,
    },
  ],
};

export const FilterSidebarParamaters = [];

export const billingSubscriptions = [
  {
    date: "Jul 16, 2021 at 11:34 PM",
    type: "Standard subscription (monthly)",
    amount: "$20.00",
  },
  {
    date: "Jun 16, 2021 at 05:19 PM",
    type: "Standard subscription (monthly)",
    amount: "$20.00",
  },
  {
    date: "May 16, 2021 at 01:57 AM",
    type: "Standard subscription (monthly)",
    amount: "$20.00",
  },
  {
    date: "Apr 16, 2021 at 09:01 PM",
    type: "Standard subscription (monthly)",
    amount: "$20.00",
  },
];

export const faqDataGeneral = [
  {
    question: "What is Skoolsel?",
    answer:
      "Skoolsel is a marketplace connecting students and nearby businesses to buy and sell products easily. Whether you're a student looking for deals or a business catering to campus life, Skoolsel helps you reach the right audience.",
  },
  {
    question: "How does Skoolsel work?",
    answer:
      "Simply sign up, list your items (for free or with a sponsored boost), and connect with buyers and sellers on your campus. You can negotiate deals via phone call and complete the transaction in person for a smooth exchange.",
  },
  {
    question: "Is Skoolsel only for students?",
    answer:
      "No! While Skoolsel is designed with students in mind, businesses near schools can also sell on the platform. This makes it easier for students to find essential products from trusted local sellers.",
  },
  {
    question: "Can I use Skoolsel outside my school?",
    answer:
      "Yes! You can browse and buy items from any school listed on Skoolsel. However, listings are grouped by school, so choosing the right one helps you connect with nearby buyers and sellers.",
  },
  {
    question: "What happens if I don't want my item anymore?",
    answer:
      "If your item is no longer available, you can mark it as sold or delete the listing from your account. This keeps the marketplace up-to-date and helps buyers find active listings faster.",
  },
  {
    question: "How do I contact support?",
    answer:
      "If you need help, visit the Help & Support section in the app or email us at support@example.com.",
  },
];

export const featuredPost: BlogPost = {
  title:
    "Eu massa sit ac, mauris quam convallis enim senectus cursus adipiscing varius",
  description:
    "Vel scelerisque lacus suspendisse volutpat. Morbi commodo nulla leo magna platea nec. Dignissim facilisis lacus morbi fermentum commodo, ultricies. Luctus arcu, commodo hendrerit ut in vehicula malesuada quis.",
  image: "/images/car.jpg",
  category: "Hiring",
  timeAgo: "1 Month Ago",
  readTime: "12 Min Read",
};

export const recentPosts: BlogPost[] = new Array(12).fill({
  title: "Sodales ipsum non venenatis sit ac enim",
  description:
    "Mauris congue cras lorem iaculis turpis. Nunc quam tortor mi blandit ut et. Consectetur quis duiis morbi congue montes, venenatis. Tellus tellus arcu volutpat.",
  image: "/images/car.jpg",
  category: "Hiring",
  timeAgo: "1 Month Ago",
  readTime: "12 Min Read",
});
