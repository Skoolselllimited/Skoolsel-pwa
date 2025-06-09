import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name: string) {
  const words = name.trim().split(/\s+/)
  if (words.length < 2) {
    return (words[0][0] + words[1]).toUpperCase()
  }
  return (words[0][0] + words[1][0]).toUpperCase()
}

// lib/generateBreadcrumbs.ts
export type BreadcrumbItem = {
  label: string
  href: string
  current?: boolean
}

export function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  console.log("pathname", pathname)
  const segments = pathname.split("/").filter(Boolean)

  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    ...segments.map((segment, index) => {
      const href = "/" + segments.slice(0, index + 1).join("/")
      return {
        label: formatLabel(segment),
        href,
        current: index === segments.length - 1,
      }
    }),
  ]

  return breadcrumbs
}

function formatLabel(segment: string): string {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}
