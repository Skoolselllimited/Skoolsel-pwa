import BreadcrumbNav from "@/components/breadCrumbs"

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Dashbaord", href: "/" },
  { label: "Post Ads", current: true },
]

export default function PostAds() {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="max-w-[1320px] mx-auto xl:p-4 min-h-screen">
        <h1>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur,
          sapiente?
        </h1>
      </div>
    </div>
  )
}
