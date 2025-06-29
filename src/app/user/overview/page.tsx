"use client"

import { ClipboardText, EyeIcon } from "@/components/svgs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AlertTriangle, Check, HeartPulseIcon } from "lucide-react"
import { PiWarningCircle } from "react-icons/pi"
import AdsViews from "./_components/chart"
import RecentActivities from "./_components/recentActivities"
import RecentPost from "./_components/recentPost"
import SavedAds from "./_components/savedAds"
import ProfileCompletionDialog from "./_components/welcomeDialog"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

// Sample data for the chart
const chartData = [
  { day: "Su", views: 25000 },
  { day: "Mo", views: 35000 },
  { day: "Tu", views: 30000 },
  { day: "We", views: 52441 },
  { day: "Th", views: 45000 },
  { day: "Fr", views: 35000 },
  { day: "Sa", views: 40000 },
]
const formatPrice = (price: number) => {
  return `₦${price.toLocaleString()}`
}

// Sample recent activities
const recentActivities = [
  {
    id: 1,
    type: "success",
    icon: Check,
    message: 'Your ad "v21 48mp qls stefar" is successful published.',
    action: "View ad",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "info",
    icon: ClipboardText,
    message: "John Wick saved your ad to his favourite collection.",
    time: "4 hours ago",
  },
  {
    id: 3,
    type: "warning",
    icon: PiWarningCircle,
    message: "Please complete your profile editing to post a ads.",
    time: "6 hours ago",
  },
  {
    id: 4,
    type: "success",
    icon: Check,
    message: 'Your ad "converse blue training shoes" is successful published.',
    action: "View ad",
    time: "1 day ago",
  },
  {
    id: 5,
    type: "danger",
    icon: AlertTriangle,
    message:
      "Sir, You have 5 ads published that need boosting to get more visibility!.",
    action: "Boost Ads",
    time: "2 days ago",
  },
]

// Sample ads data
const recentAds = [
  {
    id: 1,
    name: "Graphing Calculator - TI-84 Plus",
    price: 1277098,
    location: "Unilag",
    image: "/images/related_ad.webp",
    vendor: "Aliya Gadget Store",
    vendorImage: "/images/vendor.jpg",
    timePosted: "1 week ago",
  },
  {
    id: 2,
    name: "Graphing Calculator - TI-84 Plus",
    price: 1277098,
    location: "Unilag",
    image: "/images/image1.png",
    vendor: "Aliya Gadget Store",
    vendorImage: "/images/vendor.jpg",
    timePosted: "1 week ago",
  },
  {
    id: 3,
    name: "Graphing Calculator - TI-84 Plus",
    price: 1277098,
    location: "Unilag",
    image: "/images/image2.png",
    vendor: "Aliya Gadget Store",
    vendorImage: "/images/vendor.jpg",
    timePosted: "1 week ago",
  },
]

const savedAds = [
  {
    id: 4,
    name: "Graphing Calculator - TI-84 Plus",
    price: 1277098,
    location: "Unilag",
    image: "/images/image3.png",
    vendor: "Aliya Gadget Store",
    vendorImage: "/images/vendor.jpg",
    timePosted: "1 week ago",
  },
  {
    id: 5,
    name: "Graphing Calculator - TI-84 Plus",
    price: 1277098,
    location: "Unilag",
    image: "/images/image4.png",
    vendor: "Aliya Gadget Store",
    vendorImage: "/images/vendor.jpg",
    timePosted: "1 week ago",
  },
  {
    id: 6,
    name: "Graphing Calculator - TI-84 Plus",
    price: 1277098,
    location: "Unilag",
    image: "/images/related_ad.webp",
    vendor: "Aliya Gadget Store",
    vendorImage: "/images/vendor.jpg",
    timePosted: "1 week ago",
  },
]

export default function OverviewPage() {
  const router = useRouter()
  // State for the dialog
  const [showCompletionDialog, setShowCompletionDialog] = useState(false)

  // useEffect(() => {
  //   // Check if profile is 100% complete and show dialog
  //   const profileComplete = 100 // This would come from your profile completion logic
  //   if (profileComplete === 100) {
  //     setShowCompletionDialog(true)
  //   }
  // }, [])
  return (
    <div className="w-full min-h-screen bg-[#F4F6F8]">
      {showCompletionDialog ? (
        <ProfileCompletionDialog
          open={showCompletionDialog}
          onOpenChange={setShowCompletionDialog}
          onContinueToDashboard={() => {
            setShowCompletionDialog(false)
            // Already on dashboard, just close dialog
          }}
          onPostFirstAd={() => {
            setShowCompletionDialog(false)
            router.push("/user/post-ads")
          }}
        />
      ) : (
        <div className="w-full space-y-6">
          {/* Header Section */}
          <div className="flex flex-col lg-md:flex-row md:items-center md:justify-between gap-4">
            <div className="w-full bg-white flex flex-col gap-3 p-4 rounded-md">
              <div className="w-full flex justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <h1 className="font-circular-std font-[900] text-2xl md:text-[28px]/[100%] text-[#212B36] tracking-normal flex items-center gap-[10px]">
                    Hi Auwal! 👋
                    <Badge
                      variant="secondary"
                      className="bg-[#FEF9C3] text-[#A16207] hover:bg-[#FEF9C3] font-circular-std font-medium text-[16px]/[100%] text-center tracking-normal"
                    >
                      Futminna
                    </Badge>
                  </h1>
                  <p className="text-[#637381] text-[14px]/[22px] font-[450] font-circular-std tracking-normal">
                    Let's make some great deals today
                  </p>
                </div>
                <div className="hidden xl:flex flex-col items-end">
                  <Button className="bg-[#0088CC14] hover:bg-[#0088CC14] text-secondary font-bold font-circular-std text-[15px]/[26px] tracking-normal">
                    Complete Profile
                  </Button>
                </div>
              </div>

              <div className="w-full flex items-center gap-2">
                <Progress
                  value={65}
                  className="w-full max-w-[90vw] h-[6px] text-secondary"
                />
                <span className="w-[120px] font-circular-std font-[450] text-[12.5px]/[18px] xl:text-[14px]/[18px] text-[#637381] tracking-normal">
                  65% Complete
                </span>
              </div>
              <div className="flex xl:hidden">
                <Button className="bg-[#0088CC14] hover:bg-[#0088CC14] text-secondary font-bold font-circular-std text-[15px]/[26px] tracking-normal">
                  Complete Profile
                </Button>
              </div>
            </div>
          </div>
          {/* Stats Cards */}
          <div className="w-full max-w-[95vw]">
            <div className="overflow-x-auto pb-3 scrollbar-thin scrollbar-track-blue-50 scrollbar-thumb-blue-300 hover:scrollbar-thumb-blue-400">
              <div className="flex gap-4 md:gap-6">
                <Card className="bg-[#E8F7FF] rounded-[12px] flex flex-row justify-between p-6 min-w-[250px] flex-shrink-0">
                  <div className="flex flex-col gap-2">
                    <p className="text-[32px]/[40px] font-semibold font-circular-std text-[#191F33] tracking-normal">
                      27
                    </p>
                    <p className="text-[#464D61] text-[16px]/[24px] tracking-normal font-[450] font-circular-std">
                      Posted Ads
                    </p>
                  </div>
                  <div className="w-[72px] h-[72px] rounded-md bg-white flex items-center justify-center gap-[10px]">
                    <ClipboardText className="w-10 h-10 text-[#00AAFF]" />
                  </div>
                </Card>

                <Card className="bg-[#E4F9E0] rounded-[12px] flex flex-row justify-between p-6 min-w-[250px] flex-shrink-0">
                  <div className="flex flex-col gap-2">
                    <p className="text-[32px]/[40px] font-semibold font-circular-std text-[#191F33] tracking-normal">
                      43
                    </p>
                    <p className="text-[#464D61] text-[16px]/[24px] tracking-normal font-[450] font-circular-std">
                      Saved Ads
                    </p>
                  </div>
                  <div className="w-[72px] h-[72px] rounded-md bg-white flex items-center justify-center gap-[10px]">
                    <HeartPulseIcon className="w-10 h-10 text-green-600" />
                  </div>
                </Card>

                <Card className="bg-[#F5ECFF] rounded-[12px] flex flex-row justify-between p-6 min-w-[250px] flex-shrink-0">
                  <div className="flex flex-col gap-2">
                    <p className="text-[32px]/[40px] font-semibold font-circular-std text-[#191F33] tracking-normal">
                      14
                    </p>
                    <p className="text-[#464D61] text-[16px]/[24px] tracking-normal font-[450] font-circular-std">
                      Total Views
                    </p>
                  </div>
                  <div className="w-[72px] h-[72px] rounded-md bg-white flex items-center justify-center gap-[10px]">
                    <EyeIcon className="w-10 h-10 text-[#A855F7]" />
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="flex flex-col xl:flex-row gap-6">
            {/* Ads View Chart */}
            <Card className="xl:flex-1 rounded-[12px] border border-[#F1F2F4]">
              <div className="flex flex-row items-center justify-between">
                <h3 className="text-[20px]/[32px] tracking-normal font-semibold font-circular-std">
                  Ads View
                </h3>
                <Select defaultValue="week">
                  <SelectTrigger className="w-32 bg-transparent text-[#212B36]border-0 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <AdsViews chartData={chartData} />
            </Card>

            {/* Recent Activities */}
            <RecentActivities recentActivities={recentActivities} />
          </div>

          {/* Recently Posted Ads */}
          <RecentPost recentAds={recentAds} />
          {/* Saved Ads */}
          <SavedAds savedAds={savedAds} />
        </div>
      )}
    </div>
  )
}
