import { Card } from "@/components/ui/card"

interface recentActivitiesProps {
  recentActivities: {
    id: number
    type: string
    icon: any
    message: string
    action: string
    time: string
  }[]
}
export default function RecentActivities({ recentActivities }: any) {
  return (
    <Card className="w-full xl:w-[424px] gap-6 rounded-xl border border-[#F1F2F4] py-6 px-4 lg:p-6 shadow-none">
      <h3 className="font-medium font-circular-std text-[20px]/[32px] text-[#191F33] tracking-normal">
        Recent Activities
      </h3>
      <div className="space-y-4">
        {recentActivities?.map((activity: any) => {
          const IconComponent = activity.icon
          return (
            <div key={activity.id} className="flex gap-3">
              <div
                className={`w-12 h-12 rounded-md flex items-center justify-center flex-shrink-0 ${
                  activity.type === "success"
                    ? "bg-[#E4F9E0]"
                    : activity.type === "warning"
                      ? "bg-[#FFF8E0]"
                      : activity.type === "info"
                        ? "bg-[#E8F7FF]"
                        : "bg-[#FFE5E5]"
                }`}
              >
                <IconComponent
                  className={`w-6 h-6 ${
                    activity.type === "success"
                      ? "text-[#27C200]"
                      : activity.type === "warning"
                        ? "text-[#FFBF00]"
                        : activity.type === "info"
                          ? "text-[#00AAFF]"
                          : "text-[#FF4F4F]"
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#464D61] font-circular-std font-normal text-[16px]/[24px] tracking-normal">
                  {activity.message}{" "}
                  {activity.action && (
                    <button className="w-fit text-[#191F33] font-circular-std font-normal text-[16px]/[24px] tracking-normal hover:text-secondary underline cursor-pointer justify-start items-start">
                      {activity.action}
                    </button>
                  )}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
