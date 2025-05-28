"use client";

import React from "react";

const NewestAds: React.FC = () => {
  return (
    <section className="bg-white py-14 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="w-full h-48 md:h-64 overflow-hidden rounded-lg shadow border">
            <img
              src="/ad1.png"
              alt="Ad 1"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-full h-48 md:h-64 overflow-hidden rounded-lg shadow border">
            <img
              src="/ad2.png"
              alt="Ad 2"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewestAds;
