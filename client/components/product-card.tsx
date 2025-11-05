"use client"

import { useState } from "react"
import { Heart } from "lucide-react"

interface ProductCardProps {
  product: {
    id: number
    name: string
    price: string
    image: string
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <div className="group cursor-pointer">
      <div className="relative mb-4 overflow-hidden rounded-lg bg-secondary aspect-square">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? "fill-accent text-accent" : "text-foreground"}`} />
        </button>
      </div>
      <h3 className="text-lg font-light text-foreground text-balance">{product.name}</h3>
      <p className="text-accent font-light mt-2">{product.price}</p>
    </div>
  )
}
