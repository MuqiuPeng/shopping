import ProductCard from "./product-card"

const hotSellingProducts = [
  {
    id: 1,
    name: "Classic Pearl Bracelet",
    price: "$89.00",
    image: "/classic-white-pearl-beaded-bracelet.jpg",
  },
  {
    id: 2,
    name: "Crystal Sparkle",
    price: "$79.00",
    image: "/crystal-sparkle-beaded-bracelet.jpg",
  },
  {
    id: 3,
    name: "Mixed Gem Bundle",
    price: "$99.00",
    image: "/mixed-crystal-pearl-beaded-bracelet.jpg",
  },
  {
    id: 4,
    name: "Moonstone Elegance",
    price: "$85.00",
    image: "/moonstone-pearl-beaded-bracelet.jpg",
  },
]

export default function HotSelling() {
  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <h2 className="text-4xl font-light text-center text-foreground mb-12 text-balance">Hot-Selling Collection</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {hotSellingProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <button className="px-8 py-3 bg-secondary text-foreground font-light border border-border hover:bg-accent hover:text-accent-foreground transition rounded-lg">
          See More
        </button>
      </div>
    </section>
  )
}
