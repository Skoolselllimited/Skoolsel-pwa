"use client"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import SearchBar from "./Searchbar"

const dummySchools = [
  { id: "all", name: "All Schools" },
  { id: "unilag", name: "University of Lagos" },
  { id: "abu", name: "ABU Zaria" },
  { id: "uniben", name: "Uniben" },
]

const dummyResults = [
  "Samsung ultra 25S",
  "Samsung galaxy",
  "Samsung Note 3",
  "Samsung S25",
  "Samsung S21 Ultra",
]

export default function Hero() {
  const [selectedSchool, setSelectedSchool] = useState("all")
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<string[]>([])
  const [schoolQuery, setSchoolQuery] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (query.trim() === "") {
      setResults([])
    } else {
      const filtered = dummyResults.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filtered)
    }
  }, [query])

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 1024)
    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const filteredSchools =
    schoolQuery === ""
      ? dummySchools
      : dummySchools.filter((school) =>
          school.name.toLowerCase().includes(schoolQuery.toLowerCase())
        )

  const selectedSchoolObj =
    dummySchools.find((s) => s.id === selectedSchool) || dummySchools[0]

  return (
    <section className="w-full h-full xl:h-[524px] bg-primary flex justify-center items-center relative text-white">
      {/* Replace your old background-div with a next/image fill */}
      <div className="hidden xl:block absolute inset-0 h-full">
        <Image
          src="/images/hero-bg.webp"
          alt="Hero background"
          fill
          priority
          className="w-full h-full xl:h-[402px] object-contain"
        />
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(270.55deg, rgba(0, 54, 84, 0) 2.54%, #003654 23.42%, #003654 50.79%, #003654 76.47%, rgba(0, 54, 84, 0) 99.04%)",
        }}
      />
      {/* Content */}
      <div className="w-full flex flex-col justify-center items-center relative z-10 px-4 py-24 text-center gap-4 lg:gap-6">
        <div className="w-full xl:w-[824px] h-[184px] space-y-4">
          <span className="w-fit h-[40px] py-1 px-[4.73px] lg:px-5 inline-flex bg-secondary rounded-[5px] font-[900] font-circular-std uppercase text-white text-[12px]/[100%] lg:text-[16px]/[32px] tracking-normal text-center justify-center items-center">
            Over 95,00,000 Live Ads
          </span>
          <h1 className="font-circular-std font-bold  tracking-normal text-center text-[28px]/[120%] md:text-[32px]/[120%] xl:text-[64px]/[76px]leading-tight">
            The Number One Students
            <br />
            Market Place
          </h1>
        </div>

        {/* Search area container */}
        <div
          className="shrink-0 relative max-w-[720px] 3xl:max-w-[871px] mx-auto w-full bg-white rounded-[16px] h-[60px] lg:h-[70px] shadow-[0px_4px_19px_0px_#8E979E26] border border-[#F1F2F4]"
          ref={containerRef}
        >
          <SearchBar />
        </div>
      </div>
    </section>
  )
}
