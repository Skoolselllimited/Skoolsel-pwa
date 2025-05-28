"use client";

import React, { useRef } from "react";

type Category = {
  name: string;
  image: string;
};

type Props = {
  categories: Category[];
};

const PopularCategories: React.FC<Props> = ({ categories }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      scrollRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - clientWidth
            : scrollLeft + clientWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section>
      <section className="py-12 px-4 bg-white hidden md:block">
        <h2 className="text-2xl text-black font-semibold text-center mb-8">
          Shop with Categories
        </h2>

        <div className="relative mx-auto max-w-5xl">
          {" "}
          {/* Center and constrain width */}
          {/* Scroll Left Button */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-1 top-1/2 transform -translate-y-1/2 z-10 bg-[#54abdb] text-white rounded-full p-2 shadow-md hover:bg-blue-600 transition"
          >
            ←
          </button>
          {/* Scroll Container */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth px-6 hide-scrollbar"
          >
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-48 cursor-pointer bg-white rounded-lg border border-gray-200 p-5 text-center"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-32 mx-auto object-contain mb-4"
                />
                <p className="text-gray-800 font-semibold text-base">
                  {cat.name}
                </p>
              </div>
            ))}
          </div>
          {/* Scroll Right Button */}
          <button
            onClick={() => scroll("right")}
            className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 bg-[#54abdb] text-white rounded-full p-2 shadow-md hover:bg-blue-600 transition"
          >
            →
          </button>
        </div>
      </section>

      <section className="py-10 px-4 block md:hidden">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#0c2d48]">
          Shop with Categories
        </h2>

        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {categories.map((category, idx) => (
            <div
              key={idx}
              className="flex flex-col cursor-pointer items-center text-center bg-white p-2 sm:p-4 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-14 h-14 sm:w-20 sm:h-20 object-contain mb-2 sm:mb-3"
              />
              <p className="text-xs sm:text-sm font-medium text-gray-800">
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default PopularCategories;
