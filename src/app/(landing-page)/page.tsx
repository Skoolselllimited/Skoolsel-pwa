import Image from "next/image"
import Hero from "@/app/(landing-page)/sections/Hero"
import HotOnCampuses from "@/app/(landing-page)/sections/HotOnCampuses"
import PopularCategories from "@/app/(landing-page)/sections/PopularCategories"
import NewestAds from "@/app/(landing-page)/sections/NewestAds"
import FooterSection from "@/app/(landing-page)/sections/FooterSection"
import Navbar from "@/app/(landing-page)/sections/Navbar"
import { data } from "@/data/topCategories"
import { products } from "@/data/hotCampus"

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <PopularCategories categories={data} />
      <HotOnCampuses products={products} />

      <NewestAds />
      <FooterSection />
    </div>
  )
}
