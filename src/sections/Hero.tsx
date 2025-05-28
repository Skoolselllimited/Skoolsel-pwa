"use client";
import { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const dummySchools = [
  { id: "all", name: "All Schools" },
  { id: "unilag", name: "University of Lagos" },
  { id: "abu", name: "ABU Zaria" },
  { id: "uniben", name: "Uniben" },
];

const dummyResults = [
  "Samsung ultra 25S",
  "Samsung galaxy",
  "Samsung Note 3",
  "Samsung S25",
  "Samsung S21 Ultra",
];

export default function Hero() {
  const [selectedSchool, setSelectedSchool] = useState("all");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter as user types
  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
    } else {
      const filtered = dummyResults.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    }
  }, [query]);

  return (
    <section
      className="relative bg-cover bg-center text-white"
      style={{
        backgroundImage: 'url("/hero_bg.png")',
      }}
    >
      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-black opacity-40" /> */}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="inline-block px-2 md:px-4 py-2 text-sm bg-[#54abdb] rounded-md mb-4 font-semibold">
          OVER 95,00,000 LIVE ADS
        </div>
        <h1 className="text-center text-2xl md:text-5xl font-bold mb-6 leading-tight">
          <span className="block">The Number One Students</span>
          <span className="block">Market Place</span>
        </h1>

        {/* Search area container */}
        <div className="relative mt-8 max-w-2xl mx-auto" ref={containerRef}>
          {/* Search bar */}
          <div className="flex items-center bg-white rounded-xl px-2 py-1 shadow-lg z-10 relative w-full max-w-full">
            <select
              className="min-w-[100px] w-[30%] text-gray-700 text-xs sm:text-sm rounded-md px-2 py-2 bg-[#f6f6f6] focus:outline-none"
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
            >
              {dummySchools.map((school) => (
                <option key={school.id} value={school.id}>
                  {school.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Search item here...."
              className="flex-1 px-3 py-2 text-xs sm:text-sm  text-gray-700 bg-white focus:outline-none min-w-0"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <button className="shrink-0 text-[#54abdb] p-2 rounded-full hover:bg-gray-100 transition">
              <FaSearch className="w-4 h-4" />
            </button>
          </div>

          {/* Floating Search Results */}
          {results.length > 0 && (
            <div className="absolute w-full bg-white rounded-lg shadow-md mt-2 p-4 space-y-2 text-left text-gray-700 text-sm max-h-60 overflow-y-auto z-20">
              {results.map((item, idx) => (
                <p
                  key={idx}
                  className="hover:bg-gray-100 p-2 rounded cursor-pointer"
                >
                  {item}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
