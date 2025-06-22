"use client";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { ACCOUNT_NAVIGATION, PUBLIC_PROFILE_SIDEBAR } from "@/lib/constants";
import { ThemeContextActions } from "@/lib/context/constants";
import { useThemeProvider } from "@/lib/context/hooks";
import { cn } from "@/lib/utils";

export type CardPanelProps = PropsWithChildren<{
  primaryText: string;
  secondaryText?: string;
  primaryTextClass: string;
  containerClass: string;
  includeScrollbar?: boolean;
  childType?: string;
  state: { showSidebarScrollbar: boolean }; // Add state as a prop
  dispatch: (action: any) => void; // Add dispatch as a prop
}>;

export const CardPanel = ({
  primaryText,
  secondaryText,
  children,
  primaryTextClass,
  containerClass,
  includeScrollbar,
  childType,
  state,
  dispatch,
}: CardPanelProps) => {
  const fixedElementRef = useRef<HTMLDivElement>(null);
  const [isCutOff, setIsCutOff] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) {
          setIsCutOff(true);
        }
      },
      { threshold: 1.0 }
    );

    if (fixedElementRef.current) {
      observer.observe(fixedElementRef.current);
    }

    return () => {
      if (fixedElementRef.current) {
        observer.unobserve(fixedElementRef.current);
      }
    };
  }, []);

  const handleOnMouseEnter = () => {
    if (childType === "ACCOUNT_NAVIGATION") {
      dispatch({ type: "SET_SIDEBAR_SCROLLBAR_STATE", payload: true });
    }
  };

  const handleOnMouseLeave = () => {
    if (childType === "ACCOUNT_NAVIGATION") {
      dispatch({ type: "SET_SIDEBAR_SCROLLBAR_STATE", payload: false });
    }
  };

  const showScrollbar = state.showSidebarScrollbar;

  return (
    <div
      className={cn(
        `flex flex-col border-[1.5px] border-panel rounded-md item-center gap-y-6`,
        includeScrollbar
          ? showScrollbar
            ? "sidebar-container sidebar-styled-scrollbar"
            : "sidebar-container no-sidebar-styled-scrollbar"
          : "",
        containerClass,
        `${isCutOff && childType === "ACCOUNT_NAVIGATION" ? "md:max-h-[70vh]" : ""}`
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
        <p className="mt-1 text-sm text-body-500">{secondaryText}</p>
      )}
      {children}
    </div>
  );
};
