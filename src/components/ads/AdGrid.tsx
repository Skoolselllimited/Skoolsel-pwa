"use client"

import ProductCard from "@/app/(landing-page)/_components/ProductCard"
import { cn } from "@/lib/utils"
import Product from "@/types/productCardType"
import { motion } from "framer-motion"
import React from "react"

type Props = {
  products: Product[]
  className?: string
}

const AdGrid: React.FC<Props> = ({ products, className }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6",
        className
      )}
    >
      {products?.map((product, index) => (
        <motion.div
          key={index} // Still ensure your key is unique here! If product.id exists, use product.id
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.05 }}
        >
          {/* REMOVED NextLink here */}
          <ProductCard ad={product} />
        </motion.div>
      ))}
    </div>
  )
}

export default AdGrid
