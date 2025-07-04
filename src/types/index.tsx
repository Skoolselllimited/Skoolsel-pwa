export type BreadcrumbItem = {
  label: string
  href?: string
  current?: boolean
}
export interface NavSubItem {
  title: string
  href: string
}

export interface NavItem {
  title: string
  href: string
  icon: React.ElementType
  badge?: string
  subItems?: NavSubItem[]
}

export interface AdsType {
  id: number
  name: string
  category: string
  subcategory: string
  price: number
  timePosted: string
  image: string
  vendor: string
  vendorImage: string
  condition: string
  isSponsored: boolean
  isTopSeller: boolean
  abbreviation: string
  school: string
}

export interface School {
  id: number
  name: string
  abbreviation: string
}
