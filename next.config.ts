// next.config.js
import { withSentryConfig } from "@sentry/nextjs"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  turbopack: {
    rules: {},
  },
  env: {
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    SENTRY_ORG: process.env.SENTRY_ORG,
    SENTRY_PROJECT: process.env.SENTRY_PROJECT,
    NEXT_PUBLIC_SITE_DESCRIPTION: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "skoolsel.vercel.app",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "skoolsel.vercel.app",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "skoolsel",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "skoolsel",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost:**",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
  // …any other Next.js options…
}

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  silent: true,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  disableLogger: true,
  automaticVercelMonitors: true,
})
