"use client";

import React from "react";
import ProductCard from "@/components/ProductCard";
import Product from "@/types/productCardType";

type Props = {
  products: Product[];
};

const HotOnCampuses: React.FC<Props> = ({ products }) => {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto bg-white">
      <h2 className="text-2xl font-semibold text-center mb-8 text-black">
        Hot on Campuses
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product, idx) => (
          <ProductCard key={idx} product={product} />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button className="bg-white border-black border-2 text-black px-4 py-2 rounded-md text-sm font-semibold hover:bg-black hover:text-white transition">
          Explore all
        </button>
      </div>
    </section>
  );
};

export default HotOnCampuses;
