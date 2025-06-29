import { formatViews } from "@/lib/utils"
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts"

interface ChartProps {
  chartData: { day: string; views: number; date?: string }[]
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    // Get the full data item to access the date
    const dataItem = payload[0].payload
    const displayDate = dataItem.date || "June 15, 2021" // fallback date

    return (
      <div className="relative">
        {/* Tooltip box */}
        <div className="bg-white border border-[#E5E7EB] rounded-[8px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)] px-3 py-2 text-center">
          <p className="text-[#374151] font-semibold font-circular-std text-[16px]/[20px] tracking-normal">
            {formatViews(payload[0].value)} View
          </p>
          <p className="text-[#9CA3AF] font-normal font-circular-std text-[12px]/[16px] tracking-normal mt-1">
            {displayDate}
          </p>
        </div>

        {/* Arrow - proper triangle pointing down */}
        <div className="absolute left-1/2 -translate-x-1/2 top-full">
          <div
            className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-white"
            style={{
              filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))",
            }}
          />
        </div>
      </div>
    )
  }

  return null
}

export default function AdsViews({ chartData }: ChartProps) {
  return (
    <div className="w-full h-[305px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            className="text-[#767E94] text-[14px]/[20px] tracking-normal font-normal font-circular-std"
          />
          <CartesianGrid
            strokeDasharray="10 10"
            stroke="#EBEEF7"
            horizontal={true}
            vertical={false}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={false}
            position={{ y: 0 }}
          />
          <Bar
            barSize={28}
            dataKey="views"
            fill="#00AAFF"
            radius={[30, 30, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
