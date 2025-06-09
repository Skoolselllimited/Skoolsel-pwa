import Hero from "@/app/(landing-page)/sections/Hero"
import HotOnCampuses from "@/app/(landing-page)/sections/HotOnCampuses"
import NewestAds from "@/app/(landing-page)/sections/NewestAds"
import PopularCategories from "@/app/(landing-page)/sections/PopularCategories"
import { products } from "@/data/hotCampus"

export default function Home() {
  return (
    <div>
      <Hero />
      <PopularCategories />
      <HotOnCampuses products={products} />
      <NewestAds />
    </div>
  )
}
