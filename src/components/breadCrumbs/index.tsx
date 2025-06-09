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

type Crumb = {
  label: string
  href?: string
  current?: boolean
}

interface BreadcrumbNavProps {
  items: Crumb[]
  className?: string
}

export default function BreadcrumbNav({
  items,
  className = "",
}: BreadcrumbNavProps) {
  return (
    <div className={`w-full flex gap-2 py-3.5 px-4 ${className}`}>
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
  )
}
