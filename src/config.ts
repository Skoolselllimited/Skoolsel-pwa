// import { assertEnv } from '@/lib/utils/env';

// Dev Flags
export const env = process.env.ENV ?? "development"
export const isDevelopment = env === "development"
export const isProduction = env === "production"
export const isTest = process.env.NODE_ENV === "test"
export const isSsr = typeof window === "undefined"
export const logLevel = process.env.NEXT_PUBLIC_LOG_LEVEL ?? "info"
export const commitSha = process.env.GITHUB_COMMIT_SHA ?? ""

// Site Details

export const locale = process.env.NEXT_PUBLIC_LOCALE ?? "en-US"
export const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "SkoolSel"
export const siteTitle =
  process.env.NEXT_PUBLIC_SITE_TITLE ??
  "SkoolSel - Affordable Deals for Students in Nigeria"
export const siteDescription =
  process.env.NEXT_PUBLIC_SITE_DESCRIPTION ??
  "SkoolSel is the ultimate student marketplace in Nigeria. Find accommodation, hostels, past question, projects, books, and more tailored to student needs"
export const siteLogoForBlueBackground =
  process.env.NEXT_PUBLIC_SITE_LOGO_URL ?? "/logoForBlueBg.svg"
export const siteLogoForWhiteBackground =
  process.env.NEXT_PUBLIC_SITE_LOGO_WHITE_URL ?? "/logoForWhiteBg.svg"
export const siteLogoWhite =
  process.env.NEXT_PUBLIC_SITE_LOGO_WHITE_URL ?? "/logowhite.svg"
export const siteUrl =
  isProduction && process.env.NEXT_PUBLIC_CANONICAL_URL
    ? process.env.NEXT_PUBLIC_CANONICAL_URL
    : "https://dev.skoolsel.com"
export const siteContactEmail = process.env.NEXT_PUBLIC_SITE_CONTACT_EMAIL ?? ""
export const siteCopyrightText = "SkoolSel, We sell stuffs."

// Auth
export const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
export const authSecret = process.env.AUTH_SECRET ?? ""

/**
 * 0 = no refetch
 */
export const sessionRefetchInterval = 0
/**
 * Must be shorter than the 60 day user access token
 */
export const sessionMaxAge = 14 * 24 * 60 * 60 // 14 days
export const googleClientId = process.env.GOOGLE_CLIENT_ID ?? ""
export const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET ?? ""

/* Ads */
export const showCurrencySelector = true
export const currencyList = ["NGN"] as const
export const defaultCurrency = "NGN"

export const defaultAdImage = {
  height: 480,
  url: "/images/default-ad-image.webp",
  width: 480,
  altText: "Default Ad image",
}

// Sentry
export const sentryDsn = process.env.SENTRY_DSN ?? ""

// Authentication
export const useMultipass = process.env.NEXT_PUBLIC_USE_MULTIPASS === "true"
export const cryptoJSSecret = process.env.NEXT_PUBLIC_CRYPTOJS_SECRET
