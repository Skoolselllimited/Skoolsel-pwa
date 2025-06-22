import React from "react";
import { Paragraph, Title } from "@/lib/typography";
import { PiClipboardTextLight } from "react-icons/pi";

interface StatCardProps {
  id: number;
  label: string;
  count: number;
  bgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ id, label, count }) => {
  return (
    <div
      key={id}
      className={`flex items-center lg:w-52 justify-between p-4 rounded-md bg-[#e8f7ff]`}
    >
      <div>
        <Title>{count}</Title>
        <Paragraph>{label}</Paragraph>
      </div>
      <div
        className="flex items-center justify-center w-12 h-12 bg-white rounded-md text-[#00aaff]"
        aria-hidden="true"
      >
        <PiClipboardTextLight className="w-6 h-6" />
      </div>
    </div>
  );
};

export default StatCard;
