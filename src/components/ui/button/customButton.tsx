"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

export const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    { children, className, variant = "default", size = "default", ...props },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "w-full h-[50px] px-8 gap-3 rounded-md bg-secondary hover:bg-secondary/80 text-white font-bold md:text-[16px]/[50px] tracking-normal transition-colors",
          "border-0 shadow-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

CustomButton.displayName = "CustomButton";
