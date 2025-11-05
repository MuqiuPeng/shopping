import ProductCard from "./product-card"

const recommendedProducts = [
  {
    id: 5,
    name: "Rose Quartz Harmony",
    price: "$95.00",
    image: "/rose-quartz-crystal-beaded-bracelet.jpg",
  },
  {
    id: 6,
    name: "Golden Pearl Luxe",
    price: "$105.00",
    image: "/golden-pearl-beaded-bracelet-luxury.jpg",
  },
  {
    id: 7,
    name: "Amethyst Dreams",
    price: "$88.00",
    image: "/amethyst-crystal-beaded-bracelet.jpg",
  },
  {
    id: 8,
    name: "Aqua Mist Collection",
    price: "$92.00",
    image: "/aquamarine-crystal-pearl-beaded-bracelet.jpg",
  },
]

export default function Recommended() {
  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto bg-secondary rounded-2xl">
      <h2 className="text-4xl font-light text-center text-foreground mb-12 text-balance">Recommended For You</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <button className="px-8 py-3 bg-primary text-primary-foreground font-light hover:opacity-90 transition rounded-lg">
          Explore All
        </button>
      </div>
    </section>
  )
}
