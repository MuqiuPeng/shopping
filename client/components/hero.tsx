import ThemedButton from "./theme-button";

export default function Hero() {
  return (
    <section className="relative h-[500px] md:h-[600px] bg-secondary overflow-hidden">
      <div className="absolute inset-0 opacity-70">
        <img
          src="/hero-pearl-crystal-luxury.jpg"
          alt="Pearl and crystal luxury bracelets"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-5xl md:text-6xl font-light text-balance text-foreground mb-4">
          Elegance in Every Bead
        </h2>
        <p className="text-lg md:text-xl font-light text-muted-foreground mb-8 max-w-2xl">
          Discover our exquisite collection of pearl and crystal beaded
          bracelets
        </p>
        <ThemedButton>Shop Now</ThemedButton>
      </div>
    </section>
  );
}
