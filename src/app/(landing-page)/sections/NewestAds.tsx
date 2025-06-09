"use client"

import Image from "next/image"
import React from "react"

const NewestAds: React.FC = () => {
  return (
    <section className="w-full  min-h-[336px] bg-white py-14 px-4">
      <div className="max-w-[1320px] mx-auto">
        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
          <div className="w-full 2xl:w-[600px] 3xl:w-[648px] 2xl:h-[336px] overflow-hidden rounded">
            <Image
              src="/images/ad1.png"
              alt="Ad 1"
              width={648}
              height={336}
              className="w-full h-full object-cover rounded"
            />
          </div>

          <div className="w-full 2xl:w-[600px] 3xl:w-[648px] 2xl:h-[336px] overflow-hidden rounded">
            <Image
              src="/images/ad2.png"
              alt="Ad 2"
              width={648}
              height={336}
              className="w-full h-full object-cover rounded"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewestAds
