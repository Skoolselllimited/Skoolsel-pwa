"use client"

import { useState, useEffect } from "react"

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query)

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Initial check
    setMatches(mediaQueryList.matches)

    mediaQueryList.addEventListener("change", handleChange)

    return () => {
      mediaQueryList.removeEventListener("change", handleChange)
    }
  }, [query])

  return matches
}

export { useMediaQuery }
