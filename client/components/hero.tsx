import Image from "next/image";
import ThemedButton from "./theme-button";

export default function Hero() {
  return (
    <section className="relative h-[500px] md:h-[600px] bg-secondary overflow-hidden">
      <div className="absolute inset-0 opacity-70">
        <Image
          src="https://res.cloudinary.com/dohfzcjea/image/upload/v1775954556/hero-pearl-crystal-luxury_b5m3zf.jpg"
          alt="Pearl and crystal luxury bracelets"
          fill
          className="object-cover"
          priority
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
