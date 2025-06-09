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
