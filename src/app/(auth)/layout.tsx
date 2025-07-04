"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "../(landing-page)/_components/header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <div
      className={
        isLoginPage
          ? "h-screen overflow-hidden flex flex-col"
          : "flex flex-col min-h-[calc(100vh)]"
      }
    >
      <Header />
      <div className={isLoginPage ? "flex-1 overflow-hidden" : "flex-1"}>
        {children}
      </div>
    </div>
  );
}
