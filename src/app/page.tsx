import Image from "next/image";
import Hero from "@/sections/Hero";
import HotOnCampuses from "@/sections/HotOnCampuses";
import PopularCategories from "@/sections/PopularCategories";
import NewestAds from "@/sections/NewestAds";
import FooterSection from "@/sections/FooterSection";
import Navbar from "@/sections/Navbar";
import { data } from "@/data/topCategories";
import { products } from "@/data/hotCampus";

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
  );
}
