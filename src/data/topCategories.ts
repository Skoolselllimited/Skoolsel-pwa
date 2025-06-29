interface Category {
  name: string
  imageSrc: string
  imageAlt: string
}
interface Product {
  id: string
  title: string
  price: string
  location: string
  timeAgo: string
  vendor: {
    name: string
    avatar: string
  }
  image: string
  isSponsored?: boolean
  condition: "Used" | "New"
}
export const data: Category[] = [
  {
    name: "Computer & Laptop",
    imageSrc: "/images/computer.png",
    imageAlt: "Desktop computer and laptop",
  },
  {
    name: "Mobile",
    imageSrc: "/images/phone.png",
    imageAlt: "Foldable smartphone",
  },
  {
    name: "Phone Accessories",
    imageSrc: "/images/accessories.png",
    imageAlt: "Phone Accessories",
  },
  {
    name: "Computer Accessories",
    imageSrc: "/images/computer_acc.png",
    imageAlt: "Gaming keyboard and mouse",
  },
  {
    name: "Fashion & Accessories",
    imageSrc: "/images/clothes.png",
    imageAlt: "Essential items and accessories",
  },
  {
    name: "Home & Living",
    imageSrc: "/images/electronics.png",
    imageAlt: "Smart TV",
  },
  {
    name: "Food",
    imageSrc: "/images/food.png",
    imageAlt: "Home appliances",
  },
  {
    name: "Gaming",
    imageSrc: "/images/game-console.jpg",
    imageAlt: "Gaming consoles and accessories",
  },
]

export const productsData: Product[] = [
  {
    id: "1",
    title: "iPhone 12 Pro max",
    price: "₦1,277,098",
    location: "Unilag",
    timeAgo: "1 week ago",
    vendor: {
      name: "Aliyu Gadget Store",
      avatar: "/images/vendor.jpg",
    },
    image: "/images/image1.png",
    isSponsored: true,
    condition: "Used",
  },
  {
    id: "2",
    title: "iPhone 12 Pro max",
    price: "₦1,277,098",
    location: "Unilag",
    timeAgo: "1 week ago",
    vendor: {
      name: "Aliyu Gadget Store",
      avatar: "/images/vendor.jpg",
    },
    image: "/images/image2.png",
    isSponsored: true,
    condition: "Used",
  },
  {
    id: "3",
    title: "iPhone 12 Pro max",
    price: "₦1,277,098",
    location: "Unilag",
    timeAgo: "1 week ago",
    vendor: {
      name: "Aliyu Gadget Store",
      avatar: "/images/vendor.jpg",
    },
    image: "/images/image3.png",
    condition: "Used",
  },
  {
    id: "4",
    title: "iPhone 12 Pro max",
    price: "₦1,277,098",
    location: "Unilag",
    timeAgo: "1 week ago",
    vendor: {
      name: "Aliyu Gadget Store",
      avatar: "/images/vendor.jpg",
    },
    image: "/images/image4.png",
    condition: "Used",
  },
  {
    id: "5",
    title: "iPhone 12 Pro max",
    price: "₦1,277,098",
    location: "Unilag",
    timeAgo: "1 week ago",
    vendor: {
      name: "Aliyu Gadget Store",
      avatar: "/images/vendor.jpg",
    },
    image: "/images/image2.png",
    condition: "Used",
  },
  {
    id: "6",
    title: "iPhone 12 Pro max",
    price: "₦1,277,098",
    location: "Unilag",
    timeAgo: "1 week ago",
    vendor: {
      name: "Aliyu Gadget Store",
      avatar: "/images/vendor.jpg",
    },
    image: "/images/image3.png",
    condition: "Used",
  },
  {
    id: "7",
    title: "iPhone 12 Pro max",
    price: "₦1,277,098",
    location: "Unilag",
    timeAgo: "1 week ago",
    vendor: {
      name: "Aliyu Gadget Store",
      avatar: "/images/vendor.jpg",
    },
    image: "/images/image1.png",
    condition: "Used",
  },
  {
    id: "8",
    title: "iPhone 12 Pro max",
    price: "₦1,277,098",
    location: "Unilag",
    timeAgo: "1 week ago",
    vendor: {
      name: "Aliyu Gadget Store",
      avatar: "/images/vendor.jpg",
    },
    image: "/images/image4.png",
    isSponsored: true,
    condition: "Used",
  },
  {
    id: "9",
    title: "iPhone 12 Pro max",
    price: "₦1,277,098",
    location: "Unilag",
    timeAgo: "1 week ago",
    vendor: {
      name: "Aliyu Gadget Store",
      avatar: "/images/vendor.jpg",
    },
    image: "/images/image2.png",
    condition: "Used",
  },
  {
    id: "10",
    title: "iPhone 12 Pro max",
    price: "₦1,277,098",
    location: "Unilag",
    timeAgo: "1 week ago",
    vendor: {
      name: "Aliyu Gadget Store",
      avatar: "/images/vendor.jpg",
    },
    image: "/images/image1.png",
    condition: "Used",
  },
  {
    id: "11",
    title: "iPhone 12 Pro max",
    price: "₦1,277,098",
    location: "Unilag",
    timeAgo: "1 week ago",
    vendor: {
      name: "Aliyu Gadget Store",
      avatar: "/images/vendor.jpg",
    },
    image: "/images/image3.png",
    isSponsored: true,
    condition: "Used",
  },
  {
    id: "12",
    title: "iPhone 12 Pro max",
    price: "₦1,277,098",
    location: "Unilag",
    timeAgo: "1 week ago",
    vendor: {
      name: "Aliyu Gadget Store",
      avatar: "/images/vendor.jpg",
    },
    image: "/images/image4.png",
    condition: "Used",
  },
  {
    id: "13",
    title: "iPhone 12 Pro max",
    price: "₦1,277,098",
    location: "Unilag",
    timeAgo: "1 week ago",
    vendor: {
      name: "Aliyu Gadget Store",
      avatar: "/images/vendor.jpg",
    },
    image: "/images/image1.png",
    condition: "Used",
  },
  {
    id: "14",
    title: "iPhone 12 Pro max",
    price: "₦1,277,098",
    location: "Unilag",
    timeAgo: "1 week ago",
    vendor: {
      name: "Aliyu Gadget Store",
      avatar: "/images/vendor.jpg",
    },
    image: "/images/image2.png",
    condition: "Used",
  },
  {
    id: "15",
    title: "iPhone 12 Pro max",
    price: "₦1,277,098",
    location: "Unilag",
    timeAgo: "1 week ago",
    vendor: {
      name: "Aliyu Gadget Store",
      avatar: "/images/vendor.jpg",
    },
    image: "/images/image3.png",
    condition: "Used",
  },
  {
    id: "16",
    title: "iPhone 12 Pro max",
    price: "₦1,277,098",
    location: "Unilag",
    timeAgo: "1 week ago",
    vendor: {
      name: "Aliyu Gadget Store",
      avatar: "/images/vendor.jpg",
    },
    image: "/images/image4.png",
    condition: "Used",
  },
]
