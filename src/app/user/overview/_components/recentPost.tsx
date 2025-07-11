import {
  ClockIcon,
  EditIcon,
  LightStrikeIcon,
  MapPinIcon,
} from "@/components/svgs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatPrice } from "@/lib/utils"
import { AdsType } from "@/types"
import {
  ArrowRight,
  CheckCircle,
  Eye,
  MoreHorizontal,
  Trash2Icon,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface recentPostProps {
  recentAds: AdsType[]
}

export default function RecentPost({ recentAds }: recentPostProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-[20px]/[32px] font-circular-std font-medium tracking-normal text-[#191F33]">
          Recently Posted Ads
        </h3>
        <Link
          href="/ads"
          className="h-9 focus:bg-[#E8F7FF] focus:text-secondary rounded py-2 px-3 flex items-center gap-2 cursor-pointer text-[#464D61] hover:underline text-[14px]/[20px] font-circular-std font-medium tracking-normal"
        >
          View All <ArrowRight className="w-6 h-6" />
        </Link>
      </div>

      <div className="w-full grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 xl:gap-4">
        {recentAds.map((ad, idx) => (
          <Link
            key={idx}
            href={`/ads/${ad.id}?name=${ad.name}`}
            className="flex flex-col gap-[2.65px] bg-white p-1 lg:p-2 rounded-[10.6px] lg:rounded-[16px] hover:shadow-sm overflow-hidden border border-[#F1F2F4] cursor-pointer relative"
          >
            <div className="absolute top-4 right-4 z-10">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="h-[19px] w-6 bg-white shadow-none rounded-[2px] py-2 px-1.5 flex justify-center items-center">
                    <MoreHorizontal className="w-5 h-5 text-inherit" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-white rounded-[10px] border border-[#EBEEF7] shadow-[0px_5px_24px_0px_#0022330A] text-[#464D61] font-circular-std font-[450] text-[14px]/[20px] tracking-normal p-3"
                >
                  <DropdownMenuItem className="h-9 focus:bg-[#E8F7FF] focus:text-secondary rounded py-2 px-3 flex items-center gap-3 cursor-pointer">
                    <LightStrikeIcon className="w-5 h-5 text-inherit" />
                    Boost Ad
                  </DropdownMenuItem>
                  <DropdownMenuItem className="h-9 focus:bg-[#E8F7FF] focus:text-secondary rounded py-2 px-3 flex items-center gap-3 cursor-pointer">
                    <EditIcon className="w-5 h-5 text-inherit" />
                    Edit Ads Details
                  </DropdownMenuItem>
                  <DropdownMenuItem className="h-9 focus:bg-[#E8F7FF] focus:text-secondary rounded py-2 px-3 flex items-center gap-3 cursor-pointer">
                    <Eye className="w-5 h-5 text-inherit" />
                    View Ads
                  </DropdownMenuItem>
                  <DropdownMenuItem className="h-9 focus:bg-[#E8F7FF] focus:text-secondary rounded py-2 px-3 flex items-center gap-3 cursor-pointer">
                    <CheckCircle className="w-5 h-5 text-inherit" />
                    Sold
                  </DropdownMenuItem>
                  <DropdownMenuItem className="h-9 focus:bg-[#E8F7FF] focus:text-secondary rounded py-2 px-3 flex items-center gap-2 cursor-pointer text-[#FF4F4F]">
                    <Trash2Icon className="w-5 h-5 text-inherit" />
                    Delete Ads
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="relative">
              <Image
                src={ad.image || "/placeholder.svg"}
                alt={ad.name}
                width={292}
                height={267}
                className="w-full h-32 sm:h-[176.86px] lg:h-[267px] object-cover rounded-[8px] bg-[#E3E6EA] hover:scale-[1.01] transition-transform duration-200"
              />
            </div>

            {/* Content */}
            <div className="pt-1 lg:pt-2 pb-0 flex flex-col gap-[2.65px] lg:gap-1">
              <h3 className="text-[12px]/[11.92px] lg:text-[16px]/[18px] font-medium font-circular-std text-[#384853] truncate">
                {ad.name}
              </h3>
              <p className="text-secondary font-bold text-[12px]/[15.9px] lg:text-[18px]/[24px] -tracking-[1%] align-middle">
                {formatPrice(ad.price)}
              </p>
              <div className="w-full flex justify-between gap-1 pb-4">
                <div className="flex items-center gap-1.5 lg:gap-2">
                  <MapPinIcon className="w-5 h-5 text-[#384853]" />
                  <span className="text-[#384853] text-[12px] lg:text-[16px]/[18px] font-[450] font-circular-std tracking-normal truncate">
                    {ad.abbreviation}{" "}
                  </span>
                </div>
                <div className="flex items-center justify-end gap-1.5 lg:gap-2">
                  <ClockIcon className="w-5 h-5 text-[#384853]" />
                  <span className="text-[#384853] text-[12px] lg:text-[16px]/[18px] font-[450] font-circular-std tracking-normal truncate">
                    {ad.timePosted}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
