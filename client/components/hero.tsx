export default function Hero() {
  return (
    <section className="relative h-[500px] md:h-[600px] bg-secondary overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/hero-pearl-crystal-luxury.jpg)",
          opacity: 0.7,
        }}
      />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-5xl md:text-6xl font-light text-balance text-foreground mb-4">Elegance in Every Bead</h2>
        <p className="text-lg md:text-xl font-light text-muted-foreground mb-8 max-w-2xl">
          Discover our exquisite collection of pearl and crystal beaded bracelets
        </p>
        <button className="px-8 py-3 bg-primary text-primary-foreground font-light rounded-lg hover:opacity-90 transition">
          Shop Now
        </button>
      </div>
    </section>
  )
}
