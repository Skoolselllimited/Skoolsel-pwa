"use client";

import React, { useRef, useEffect, useState } from "react"; // Ensure useRef, useEffect, useState are imported

import { MapPinLineIcon } from "../../../../public/svgs/MapPinLineIcon";
import { ShareNetworkIcon } from "../../../../public/svgs/ShareNetworkIcon";
import { WarningIcon } from "../../../../public/svgs/WarningIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle2, PhoneCallIcon } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";
import { TiSocialTwitter } from "react-icons/ti";
import { FaLinkedinIn } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";

function cn(...inputs: (string | undefined | null | boolean)[]) {
  return inputs.filter(Boolean).join(" ");
}

const formatRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays < 1) return "today";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`;
  return `${Math.ceil(diffDays / 365)} years ago`;
};

const PUBLIC_PROFILE_SIDEBAR = "PUBLIC_PROFILE_SIDEBAR";
const ACCOUNT_NAVIGATION = "ACCOUNT_NAVIGATION"; // Needed for CardPanel mock

// --- Type Definitions (inlined, ensuring no duplicates) ---
export type User = {
  id: number;
  full_name: string;
  username: string;
  bio: string | null; // Corrected: bio can be string or null
  image_url: string | null;
  ads_count: number;
  phone: string | null;
  email: string;
  rating: number | null;
  school: { name: string } | null;
  account_verified: boolean;
  created_at: string;
};

interface AvatarProps {
  className?: string;
  size?: number;
  src?: string;
  alt?: string;
  fallback?: React.ReactNode; // Can be string or JSX
}

// --- Mock CardPanel Component (adapted from previous context) ---
type CardPanelProps = React.PropsWithChildren<{
  primaryText?: string;
  secondaryText?: string;
  primaryTextClass?: string;
  containerClass?: string;
  includeScrollbar?: boolean;
  childType?: string;
  // Mock ThemeContext properties for local CardPanel functionality
  state?: {
    showSidebarScrollbar?: boolean;
    showPublicProfileSidebarScrollbar?: boolean;
  };
  dispatch?: (action: any) => void;
}>;

const CardPanel = ({
  primaryText,
  secondaryText,
  children,
  primaryTextClass,
  containerClass,
  includeScrollbar = false,
  childType,
  state,
  dispatch,
}: CardPanelProps) => {
  const fixedElementRef = useRef<HTMLDivElement>(null);
  const [isCutOff, setIsCutOff] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (fixedElementRef.current) {
        const { scrollHeight, clientHeight } = fixedElementRef.current;
        setIsCutOff(scrollHeight > clientHeight);
      }
    };

    const resizeObserver = new ResizeObserver(checkScroll);
    if (fixedElementRef.current) {
      resizeObserver.observe(fixedElementRef.current);
    }
    checkScroll();

    return () => {
      if (fixedElementRef.current) {
        resizeObserver.unobserve(fixedElementRef.current);
      }
    };
  }, []);

  const showScrollbarValue = () => {
    if (!state) return false;
    switch (childType) {
      case ACCOUNT_NAVIGATION:
        return state.showSidebarScrollbar;
      case PUBLIC_PROFILE_SIDEBAR:
        return state.showPublicProfileSidebarScrollbar;
      default:
        return false;
    }
  };

  const showScrollbar = includeScrollbar ? showScrollbarValue() : false;

  const handleOnMouseEnter = () => {
    if (!includeScrollbar || !dispatch) return;
    if (childType === ACCOUNT_NAVIGATION) {
      dispatch({ type: "SET_SIDEBAR_SCROLLBAR_STATE", payload: true });
    } else if (childType === PUBLIC_PROFILE_SIDEBAR) {
      dispatch({ type: "SET_PUBLIC_PROFILE_SIDEBAR_STATE", payload: true });
    }
  };

  const handleOnMouseLeave = () => {
    if (!includeScrollbar || !dispatch) return;
    if (childType === ACCOUNT_NAVIGATION) {
      dispatch({ type: "SET_SIDEBAR_SCROLLBAR_STATE", payload: false });
    } else if (childType === PUBLIC_PROFILE_SIDEBAR) {
      dispatch({ type: "SET_PUBLIC_PROFILE_SIDEBAR_STATE", payload: false });
    }
  };

  return (
    <div
      className={cn(
        `flex flex-col border-[1.5px] border-gray-200 rounded-md gap-y-1`,
        containerClass,
        includeScrollbar && isCutOff ? "md:max-h-[70vh]" : "",
        showScrollbar ? "overflow-y-auto" : ""
      )}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      ref={fixedElementRef}
    >
      {primaryText && (
        <h3
          className={cn("font-semibold text-2xl text-center", primaryTextClass)}
        >
          {primaryText}
        </h3>
      )}
      {secondaryText && (
        <p className="mt-1 text-sm text-gray-600">{secondaryText}</p>
      )}

      {children}
    </div>
  );
};

// --- PublicProfileSidebar Component (Rewritten) ---
type PublicProfileSidebarProps = {
  user: User;
};

const PublicProfileSidebar = ({ user }: PublicProfileSidebarProps) => {
  // A simplified getInitials function for the Avatar fallback
  const getInitials = (user: User) => {
    if (user && user.full_name) {
      const parts = user.full_name.split(" ");
      if (parts.length > 1) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return parts[0][0].toUpperCase();
    }
    return "";
  };

  return (
    <CardPanel
      primaryText=""
      primaryTextClass=""
      includeScrollbar={true}
      childType={PUBLIC_PROFILE_SIDEBAR}
      containerClass="w-full sm:max-w-[250px] bg-white rounded-lg px-6 overflow-hidden"
      state={{
        showSidebarScrollbar: false,
        showPublicProfileSidebarScrollbar: false,
      }}
      dispatch={() => {}}
    >
      {/* Profile Image, Username, and Joined Date Section */}
      <div className="flex flex-col items-center py-6 px-4">
        <Avatar className="w-[180px] h-[180px]">
          <AvatarImage
            src={`${user.image_url}`}
            className="w-full h-full object-cover object-top"
          />
          <AvatarFallback>{user.username}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-1 items-center mt-4">
          <h2 className="text-gray-800 text-lg font-bold flex gap-1 items-center">
            @{user.username}
            {user.account_verified && (
              <CheckCircle2 className="h-8 w-8 fill-[#27C200] text-white" />
            )}
          </h2>
          <p className="text-xs text-gray-400">Joined - 1/11/2024</p>
        </div>
      </div>
      {/* Contact Information Section */}
      <div className="border-t border-gray-200 w-full"></div>
      <div className="px-2 py-3 flex flex-col gap-2">
        <p className="text-gray-700 text-sm font-bold">Contact Information</p>
        <div className="flex gap-2 items-center text-gray-600 text-sm">
          <PhoneCallIcon className="text-[#54ABDB] h-5 w-5" />
          <p className="">{user.phone || "No phone number"}</p>
        </div>
        <div className="flex gap-2 items-center text-gray-600 text-sm">
          <MapPinLineIcon />
          <p className="">{user.school?.name || "No school info"}</p>
        </div>
      </div>

      {/* Seller Biography Section */}
      <div className="border-t border-gray-200 w-full"></div>
      <div className="px-2 py-3 flex flex-col gap-2">
        <p className="text-gray-700 text-sm font-bold">Bio</p>
        <p className="text-sm  text-gray-600">
          {user.bio || "No biography provided"}
        </p>
      </div>
      <div className="border-t border-gray-200 w-full my-2"></div>
      <div className="px-2 py-3">
        <div className="flex items-center gap-3">
          <ShareNetworkIcon />
          <span className="text-gray-800 text-md font-bold">Share Profile</span>
        </div>
        <div className="flex justify-start gap-2 mt-3">
          {/* WhatsApp Icon Button */}
          <button className="flex items-center justify-center size-8 rounded-full bg-[#25d366] text-white hover:bg-green-600 transition-colors">
            <FaWhatsapp />
          </button>
          {/* Facebook Icon Button */}
          <button className="flex items-center justify-center size-8 rounded-full bg-[#3b5998] text-white hover:bg-blue-700 transition-colors">
            <TiSocialFacebook />
          </button>
          {/* Twitter Icon Button */}
          <button className="flex items-center justify-center size-8 rounded-full bg-[#1da1f2] text-white hover:bg-blue-500 transition-colors">
            <TiSocialTwitter />
          </button>
          {/* LinkedIn Icon Button */}
          <button className="flex items-center justify-center size-8 rounded-full bg-[#0077B5] text-white hover:bg-blue-800 transition-colors">
            <FaLinkedinIn />
          </button>
          {/* Copy Link Button */}
          <button className="flex items-center justify-center size-8 rounded-full bg-[#636a80] text-white hover:bg-gray-400 transition-colors">
            <IoIosLink />
          </button>
        </div>
      </div>

      {/* Report Seller Section */}
      <div className="border-t border-gray-200 w-full my-2"></div>
      <div className="px-2 py-3">
        <div className="flex items-center gap-2">
          <button
            title="report"
            className="text-red-700 text-sm flex flex-row items-center hover:underline"
          >
            <WarningIcon className="w-4 h-4 mr-2" />
            Report Seller
          </button>
        </div>
      </div>
    </CardPanel>
  );
};

export default PublicProfileSidebar;
