import Hero from "@/app/(landing-page)/sections/Hero"
import HotOnCampuses from "@/app/(landing-page)/sections/HotOnCampuses"
import NewestAds from "@/app/(landing-page)/sections/NewestAds"
import PopularCategories from "@/app/(landing-page)/sections/PopularCategories"

export default function Home() {
  return (
    <div>
      <Hero />
      <PopularCategories />
      <HotOnCampuses />
      <NewestAds />
    </div>
  )
}
