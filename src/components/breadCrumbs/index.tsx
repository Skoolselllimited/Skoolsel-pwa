"use client"

import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import React from "react"
import { generateBreadcrumbs } from "@/lib/utils"

type Crumb = {
  label: string
  href?: string
  current?: boolean
}

interface BreadcrumbNavProps {
  pathname: string
  className?: string
}

export default function BreadcrumbNav({
  pathname,
  className = "",
}: BreadcrumbNavProps) {
  const items = generateBreadcrumbs(pathname)

  return (
    <div className="hidden xl:flex w-full bg-[#E8EBEE] h-[43px] items-center">
      <div className="w-full h-full max-w-[1320px] bg-[#E8EBEE] mx-auto">
        <div
          className={`hidden w-full xl:flex gap-2 py-3.5 px-4 xl:px-6 ${className}`}
        >
          <Breadcrumb>
            <BreadcrumbList>
              {items.map((item, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbItem>
                    {item.current ? (
                      <BreadcrumbPage className="text-secondary font-medium">
                        {item.label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={item.href ?? "#"}>{item.label}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {index < items.length - 1 && <BreadcrumbSeparator />}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </div>
  )
}
